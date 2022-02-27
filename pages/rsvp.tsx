import { RadioGroup } from '@headlessui/react';
import { useMachine } from '@xstate/react';
import axiosBase from 'axios';
import Image from 'next/image';
import qs from 'qs';
import React from 'react';
import { createModel } from 'xstate/lib/model';
import ErrorNotification from '../components/ErrorNotification';
import SuccessDialog from '../components/SuccessDialog';
import InfoLayout from '../layouts/InfoLayout';
import { AllowedEvents, Answers, RsvpContext } from '../utils/types';
import { classNames } from '../utils/utils';

// todo: add "a tune that will make you boogie"

const axios = axiosBase.create({
  baseURL: '/api/',
  timeout: 5_000,
});

const rsvpModel = createModel(
  {
    name: '',
    allowedEvents: new Set(),
    partyMembers: [],
    attendanceAnswers: {},
  } as RsvpContext,
  {
    events: {
      nameFocused: () => ({}),
      nameChanged: (name: string) => ({ name }),
      nameSubmitted: () => ({}),
      attendanceAnswerChanged: (
        partyMember: RsvpContext['partyMembers'][number],
        weddingEvent: AllowedEvents,
        answers: Answers[typeof weddingEvent]
      ) => ({
        partyMember,
        weddingEvent,
        answers,
      }),
      attendanceAnswersSubmitted: () => ({}),
      successDialogClosed: () => ({}),
    },
  }
);

const rsvpMachine = rsvpModel.createMachine({
  id: 'rsvp',
  strict: true,

  context: rsvpModel.initialContext,

  initial: 'fillingInName',
  states: {
    fillingInName: {
      type: 'parallel',
      states: {
        validity: {
          initial: 'canNotBeValidated',
          states: {
            canNotBeValidated: {},

            canBeValidated: {
              initial: 'unknown',
              states: {
                unknown: {
                  always: [
                    {
                      target: 'valid',
                      cond: (ctx) => ctx.name.length > 0,
                    },
                    {
                      target: 'invalid',
                    },
                  ],
                },

                valid: {
                  on: {
                    nameSubmitted: '#fetchingRsvp',
                  },
                },

                invalid: {},
              },
            },
          },
        },

        namePresence: {
          initial: 'notSearched',
          states: {
            notSearched: {},

            fetchingRsvp: {
              id: 'fetchingRsvp',
              // @ts-expect-error
              invoke: {
                src: (ctx) =>
                  axios.post(
                    '/get-rsvp',
                    qs.stringify({
                      'form-name': 'find-rsvp',
                      name: ctx.name,
                    }),
                    {
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                      },
                    }
                  ),
                onDone: {
                  target: '#respondingToWeddingEvents',
                  actions: rsvpModel.assign((_, event) => {
                    return {
                      // @ts-expect-error
                      allowedEvents: new Set(event.data.data.allowedEvents),
                      // @ts-expect-error
                      partyMembers: event.data.data.partyMembers,
                      // @ts-expect-error
                      attendanceAnswers: event.data.data.attendanceAnswers,
                    };
                  }),
                },
                onError: 'nameNotFound',
              },
            },

            nameNotFound: {},
          },
        },
      },

      on: {
        nameChanged: {
          target: '.validity.canBeValidated.unknown',
          actions: rsvpModel.assign((_, event) => {
            return {
              name: event.name,
            };
          }),
        },
      },
    },

    respondingToWeddingEvents: {
      id: 'respondingToWeddingEvents',
      initial: 'answering',
      states: {
        answering: {
          on: {
            attendanceAnswersSubmitted: 'submitting',
          },
        },

        submitting: {
          invoke: {
            src: (ctx) =>
              axios.post(
                '/submit-rsvp',
                qs.stringify({
                  'form-name': 'rsvp',
                  attendanceAnswers: ctx.attendanceAnswers,
                }),
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                }
              ),
            onDone: 'successSubmitting',
            onError: 'errorSubmitting',
          },
        },

        successSubmitting: {
          on: {
            successDialogClosed: 'answering',
            attendanceAnswersSubmitted: 'submitting',
          },
        },

        errorSubmitting: {
          on: {
            attendanceAnswersSubmitted: 'submitting',
          },
        },
      },

      on: {
        attendanceAnswerChanged: {
          actions: rsvpModel.assign((ctx, event) => {
            return {
              attendanceAnswers: {
                ...ctx.attendanceAnswers,
                [event.partyMember]: {
                  ...ctx.attendanceAnswers[event.partyMember],
                  [event.weddingEvent]: {
                    ...event.answers,
                  },
                },
              },
            };
          }),
        },
      },
    },
  },
});

export default function Rsvp() {
  return (
    <InfoLayout
      title="RSVP"
      description="Please let us know your plans by July 30, 2022. We hope we get to celebrate together!"
    >
      <Wizard />
    </InfoLayout>
  );
}

function Wizard() {
  const [state, send] = useMachine(rsvpMachine, {
    devTools: process.env.NODE_ENV === 'development',
  });

  const { name, allowedEvents, partyMembers, attendanceAnswers } =
    state.context;

  return (
    <>
      {state.matches('fillingInName') ? (
        <form
          className="mt-8 mx-4 text-center"
          onSubmit={(event) => {
            event.preventDefault();
            send(rsvpModel.events.nameSubmitted());
          }}
          data-netlify="true"
          data-netlify-recaptcha="true"
          data-netlify-honeypot="find-rsvp"
        >
          <label htmlFor="rsvp-name-lookup" className="block font-cardo mb-8">
            Please enter your first and last name to unlock your RSVP form. If
            you're responding for you and a guest (or your family), you'll be
            able to RSVP for your entire group.
          </label>
          <div className="my-4 text-left">
            <input
              name="name"
              className={
                // Make the placeholder smaller than the filled text, and adjust
                // padding to avoid a visual jump
                name.length === 0 ? 'text-sm px-3 py-3' : 'text-lg px-3 py-2'
              }
              type="text"
              id="rsvp-name-lookup"
              placeholder="Ex. Sarah Fortune (not The Fortune Family or Dr. &amp; Mr. Fortune)"
              required
              value={name}
              onChange={(event) => {
                send(rsvpModel.events.nameChanged(event.target.value));
              }}
            />

            <span className="text-red-700 text-lg font-normal">
              {state.matches(
                'fillingInName.validity.canBeValidated.invalid'
              ) ? (
                'Required'
              ) : // @ts-expect-error
              state.matches('fillingInName.namePresence.nameNotFound') ? (
                `Hmm, we can't seem to find that name! Type it in right next time (spelling it how we spelled it on your envelope is a good bet).`
              ) : (
                <span>&nbsp;</span>
              )}
            </span>
          </div>

          <div data-netlify-recaptcha="true"></div>

          <button type="submit" className="mx-auto">
            {state.matches('fillingInName.namePresence.fetchingRsvp') ? (
              <React.Fragment>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Fetching your RSVP…
              </React.Fragment>
            ) : (
              <span>Continue</span>
            )}
          </button>
        </form>
      ) : state.matches('respondingToWeddingEvents') ? (
        <>
          <form
            className="mt-8 mx-4 text-center"
            onSubmit={(event) => {
              event.preventDefault();
              send(rsvpModel.events.attendanceAnswersSubmitted());
            }}
            data-netlify="true"
            data-netlify-recaptcha="true"
            data-netlify-honeypot="rsvp"
          >
            {allowedEvents.size === 1 ? (
              <p>
                We have invited you to 1 wedding event, 1 of which requires your
                RSVP.
              </p>
            ) : (
              <p>
                We have invited you to {allowedEvents.size} wedding events,{' '}
                {allowedEvents.size} of which require your RSVP.
              </p>
            )}

            <div
              key={Math.random()}
              className="hidden md:flex items-center justify-between divide-x divide-black mt-8"
            >
              <div className="w-1/2 py-16 pr-8">
                <h3 className="text-5xl text-gray text-center uppercase mx-auto p-8">
                  Ceremony
                </h3>

                <div className="italic text-center">
                  <p className="mb-6">Saturday, October 15, 2022</p>
                  <p>4:00 pm — 4:30 pm</p>
                </div>

                <Image
                  src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6bm9uZTt9Cgkuc3Qxe2ZpbGw6IzAwMDAwMDt9Cjwvc3R5bGU+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIzNy41LDI1LjUgNDIsMTkgMzguOSwxOSAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM1LjMsMTQuOSAzMS45LDE0LjkgMzMuMywxNyAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjMzLjgsMTggMzcuNiwxOCAzNS44LDE1LjggMzMuOCwxOCAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM5LjEsMTggMzkuMSwxOCA0Mi4xLDE4IDQwLjcsMTUuNiAzOC43LDE3LjkgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI0MC4xLDE0LjkgMzYuNCwxNC45IDM4LjEsMTcuMSAiPjwvcG9seWdvbj48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDYuMyw2Ni4zYzAuOSwzLjQsMyw2LjQsNi4xLDguNmM3LjEsNSwxNywzLjMsMjItMy44czMuMy0xNy0zLjgtMjJjLTQtMi44LTguOS0zLjUtMTMuMy0yLjMgIGMwLDAuMiwwLDAuNSwwLDAuN0M1Ny4zLDU1LjYsNTIuOCw2Mi42LDQ2LjMsNjYuM3oiPjwvcGF0aD48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTEuNSw0OS44Yy0xLjEsMC45LTIuMSwxLjktMywzLjJjLTEuNSwyLjEtMi40LDQuNS0yLjcsNi45QzQ4LjgsNTcuMyw1MC45LDUzLjgsNTEuNSw0OS44eiI+PC9wYXRoPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My43LDQ5LjVjMi0yLjgsNC41LTUsNy4zLTYuNWMtMi02LjUtOC0xMS4yLTE1LjEtMTEuMmMtOC43LDAtMTUuOCw3LjEtMTUuOCwxNS44czcuMSwxNS44LDE1LjgsMTUuOCAgYzEuMywwLDIuNi0wLjIsMy45LTAuNUMzOS42LDU4LjIsNDAuOSw1My41LDQzLjcsNDkuNXoiPjwvcGF0aD48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM0LDE5IDM1LjQsMjUuNSAzNi41LDI1LjUgMzcuOCwxOSAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjcyLjgsMzUuMiA3Mi43LDQzLjEgNzIuOCw0My4xIDc1LjUsMzcgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI3NiwzMy4yIDczLjMsMzQuMyA3NS45LDM2LjEgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI3OS42LDM2IDc2LjcsMzYuNyA3Ni43LDM2LjcgNzkuOCwzOC45ICI+PC9wb2x5Z29uPjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iNzYuMywzNy42IDczLjYsNDMuNyA3NC42LDQ0LjQgNzkuNCwzOS44ICI+PC9wb2x5Z29uPjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iNzUuNCw0NC45IDgyLjgsNDIuMiA4MC4yLDQwLjQgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI3NywzMyA3Ni45LDM1LjYgNzkuOCwzNSAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjgxLDM5LjcgODEsMzkuNyA4My41LDQxLjUgODMuNywzOC43IDgwLjgsMzkuNCAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjMxLjIsMTUuNiAyOS43LDE4IDMyLjgsMTggIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIzNC4zLDI1LjUgMzMsMTkgMjkuNywxOSAzNC4yLDI1LjUgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI4My43LDM3LjcgODAuNiwzNS42IDgwLjgsMzguNCAiPjwvcG9seWdvbj48cGF0aCBjbGFzcz0ic3QxIiBkPSJNODQuOSwzNy40bC03LjktNS42bC01LjEsMi4xbC0wLjEsOS4yYy00LjgtMi43LTEwLjMtMy4zLTE1LjQtMi4xYy0yLjUtNy45LTkuNS0xMy44LTE4LTE0LjhsNS4yLTcuNmwtMi42LTQuNyAgaC05LjdsLTMsNC43bDUuMiw3LjZjLTEwLjgsMS4yLTE5LjIsMTAuMy0xOS4yLDIxLjRjMCwxMS45LDkuNywyMS41LDIxLjUsMjEuNWMxLjcsMCwzLjQtMC4yLDUtMC42YzEuNCw0LjMsNC4xLDguMyw4LjEsMTEuMSAgYzkuNyw2LjgsMjMuMSw0LjUsMzAtNS4yYzYuMy05LDQuOC0yMS4yLTMuMi0yOC40bDguNy0zLjJMODQuOSwzNy40eiBNODMuNywzNy43bC0yLjksMC43bC0wLjItMi44TDgzLjcsMzcuN3ogTTc3LDMzbDIuOCwyICBsLTIuOSwwLjZMNzcsMzN6IE03Ni43LDM2LjdsMi45LTAuNmwwLjIsMi44TDc2LjcsMzYuN0w3Ni43LDM2Ljd6IE03OS40LDM5LjhsLTQuOCw0LjVsLTAuOS0wLjdsMi43LTYuMUw3OS40LDM5Ljh6IE03NiwzMy4yICBsLTAuMSwyLjlsLTIuNS0xLjhMNzYsMzMuMnogTTcyLjgsMzUuMmwyLjcsMS45bC0yLjcsNi4xbC0wLjEtMC4xTDcyLjgsMzUuMnogTTM3LjUsMjUuNWwxLjMtNi41SDQyTDM3LjUsMjUuNXogTTM2LjUsMjUuNWgtMS4yICBMMzQsMTloMy44TDM2LjUsMjUuNXogTTQyLjEsMThoLTNsMC0wLjFsLTAuMy0wLjFsMi0yLjNMNDIuMSwxOHogTTQwLjEsMTQuOWwtMiwyLjJsLTEuOC0yLjJINDAuMXogTTM3LjYsMThoLTMuOGwwLDBsMi0yLjIgIEwzNy42LDE4eiBNMzUuMywxNC45bC0yLDIuMmwtMS40LTIuMkgzNS4zeiBNMzEuMiwxNS42bDEuNiwyLjRoLTMuMUwzMS4yLDE1LjZ6IE0yOS43LDE5SDMzbDEuMyw2LjVoLTAuMUwyOS43LDE5eiBNNDAuNSw2Ny41ICBDMzksNjcuOCwzNy40LDY4LDM1LjgsNjhjLTExLjMsMC0yMC41LTkuMi0yMC41LTIwLjVTMjQuNCwyNywzNS44LDI3YzkuMSwwLDE2LjksNiwxOS41LDE0LjNjLTEuMiwwLjMtMi4zLDAuOC0zLjQsMS4zICBjLTIuMS02LjgtOC41LTExLjgtMTYtMTEuOGMtOS4yLDAtMTYuOCw3LjUtMTYuOCwxNi44YzAsOS4yLDcuNSwxNi44LDE2LjgsMTYuOGMxLjQsMCwyLjctMC4yLDMuOS0wLjVjMC4zLTAuMSwwLjctMC4yLDEtMC4zICBjMS40LTAuNCwyLjYtMSwzLjgtMS43YzAuNC0wLjIsMC43LTAuNCwxLTAuN2MzLjktMi44LDYuNS03LjIsNi45LTEyLjJjMS4xLTAuOCwyLjQtMS40LDMuNi0xLjhjMCwwLjEsMCwwLjIsMCwwLjQgIGMwLDcuNi00LjEsMTQuMi0xMC4zLDE3LjdjLTAuMywwLjItMC42LDAuMy0wLjksMC41Yy0xLjIsMC42LTIuNCwxLjEtMy42LDEuNEM0MS4yLDY3LjMsNDAuOCw2Ny40LDQwLjUsNjcuNXogTTM5LjgsNjIuOCAgYy0xLjIsMC4zLTIuNSwwLjUtMy45LDAuNWMtOC43LDAtMTUuOC03LjEtMTUuOC0xNS44czcuMS0xNS44LDE1LjgtMTUuOEM0MywzMS44LDQ5LjEsMzYuNSw1MSw0M2MtMi44LDEuNS01LjMsMy43LTcuMyw2LjUgIEM0MC45LDUzLjUsMzkuNiw1OC4yLDM5LjgsNjIuOHogTTQ1LjgsNTkuOGMwLjMtMi40LDEuMi00LjgsMi43LTYuOWMwLjktMS4yLDEuOS0yLjMsMy0zLjJDNTAuOSw1My44LDQ4LjgsNTcuMyw0NS44LDU5Ljh6ICAgTTU3LjIsNDYuOGM0LjQtMS4yLDkuMy0wLjUsMTMuMywyLjNjNy4xLDUsOC44LDE0LjksMy44LDIycy0xNC45LDguOC0yMiwzLjhjLTMuMS0yLjItNS4xLTUuMi02LjEtOC42YzYuNi0zLjcsMTEtMTAuNywxMS0xOC44ICBDNTcuMyw0Ny4zLDU3LjMsNDcuMSw1Ny4yLDQ2Ljh6IE03OCw3My43Yy02LjUsOS4yLTE5LjQsMTEuNC0yOC42LDQuOWMtMy44LTIuNy02LjQtNi40LTcuNy0xMC41YzEuMi0wLjQsMi40LTAuOCwzLjYtMS40ICBjMSwzLjUsMy4yLDYuNyw2LjQsOWM3LjUsNS4zLDE4LDMuNSwyMy40LTRjNS4zLTcuNSwzLjUtMTgtNC0yMy40Yy00LjItMy05LjMtMy43LTEzLjktMi41Yy0wLjMsMC4xLTAuNywwLjItMSwwLjMgIGMtMS4yLDAuNC0yLjQsMC45LTMuNSwxLjZjLTAuNCwwLjItMC43LDAuNS0xLDAuN2MtMS41LDEuMS0yLjgsMi40LTMuOSwzLjljLTEuOCwyLjUtMi44LDUuNC0zLDguM2MtMS4yLDAuOC0yLjUsMS41LTMuOSwxLjkgIGMtMC4xLTQuMywxLjEtOC43LDMuNy0xMi41YzEuOC0yLjYsNC4yLTQuNiw2LjgtNi4xYzAuMy0wLjIsMC42LTAuMywwLjktMC41YzEuMS0wLjUsMi4yLTEsMy40LTEuM2MwLjMtMC4xLDAuNy0wLjIsMS0wLjIgIGM1LjUtMS4zLDExLjYtMC40LDE2LjYsMy4yQzgyLjQsNTEuNyw4NC42LDY0LjUsNzgsNzMuN3ogTTc1LjQsNDQuOWw0LjgtNC41bDIuNiwxLjhMNzUuNCw0NC45eiBNODMuNSw0MS41TDgxLDM5LjdsMCwwbC0wLjItMC4yICBsMi45LTAuN0w4My41LDQxLjV6Ij48L3BhdGg+PC9zdmc+"
                  width={100}
                  height={100}
                  alt=""
                  aria-hidden="true"
                />

                <address className="font-semibold not-italic mb-8">
                  Seguin Valley Golf Club
                  <br />
                  144 Badger Road
                  <br />
                  Parry Sound, ON P2A 2W8
                  <br />
                  Canada
                </address>

                <div>
                  <p className="mb-6">
                    This event is black-tie optional. The grass can be soft, so
                    maybe rethink stilettos.
                  </p>

                  <p className="mb-12">
                    There will be a few light bites along with non-alcoholic
                    punch afterwards.
                  </p>
                </div>
              </div>

              <div className="w-1/2 py-16 pl-16 font-cardo text-center">
                {Array.from(partyMembers).map((name) => (
                  <div key={name} className="mb-16">
                    <p className="italic mb-4">{name}</p>

                    <RadioGroup
                      value={
                        attendanceAnswers[name]?.ceremony.willAttend ?? true
                      }
                      onChange={(willAttend) => {
                        send(
                          rsvpModel.events.attendanceAnswerChanged(
                            name,
                            'ceremony',
                            {
                              willAttend,
                            }
                          )
                        );
                      }}
                    >
                      <RadioGroup.Label className="sr-only">
                        {name}'s RSVP
                      </RadioGroup.Label>

                      <div className="flex flex-row items-center justify-between space-x-4">
                        {[true, false].map((willAttend) => (
                          <RadioGroup.Option
                            key={String(willAttend)}
                            value={willAttend}
                            className={({ active }) =>
                              classNames(
                                active ? 'focus-gold' : '',
                                'flex-grow relative shadow-sm cursor-pointer sm:flex sm:justify-between focus:outline-none'
                              )
                            }
                          >
                            {({ checked }) => (
                              <React.Fragment>
                                <div className="flex items-center flex-grow">
                                  <RadioGroup.Label
                                    as="span"
                                    className="button button--small m-0 flex-grow"
                                  >
                                    {willAttend
                                      ? 'Will attend'
                                      : 'Will not attend'}
                                  </RadioGroup.Label>
                                </div>

                                <div
                                  className={classNames(
                                    checked
                                      ? 'border-gold'
                                      : 'border-transparent',
                                    'absolute -inset-px border-4 pointer-events-none'
                                  )}
                                  aria-hidden="true"
                                />
                              </React.Fragment>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </div>

            <div data-netlify-recaptcha="true"></div>

            <button type="submit" className="mx-auto">
              {state.matches('respondingToWeddingEvents.submitting') ? (
                <React.Fragment>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-black group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting your RSVP…
                </React.Fragment>
              ) : (
                <span>Submit RSVP</span>
              )}
            </button>

            {state.matches({
              respondingToWeddingEvents: 'successSubmitting',
            }) && (
              <SuccessDialog
                onCloseDialog={() => {
                  send(rsvpModel.events.successDialogClosed());
                }}
              />
            )}
          </form>

          {/* Global notification live region. Render this permanently at the end of the document */}
          <div
            aria-live="assertive"
            className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
          >
            <div className="w-full flex flex-col items-center space-y-4">
              {state.matches({
                respondingToWeddingEvents: 'errorSubmitting',
              }) && <ErrorNotification />}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
