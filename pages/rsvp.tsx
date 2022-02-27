import { RadioGroup } from '@headlessui/react';
import { useMachine } from '@xstate/react';
import axiosBase from 'axios';
import qs from 'qs';
import React from 'react';
import { createModel } from 'xstate/lib/model';
import CeremonyDateTime from '../components/CeremonyDateTime';
import CeremonyDetails from '../components/CeremonyDetails';
import ErrorNotification from '../components/ErrorNotification';
import ReceptionDateTime from '../components/ReceptionDateTime';
import ReceptionDetails from '../components/ReceptionDetails';
import SuccessDialog from '../components/SuccessDialog';
import InfoLayout from '../layouts/InfoLayout';
import { AllowedEvents, Answers, RsvpContext } from '../utils/types';
import { classNames } from '../utils/utils';

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
                    ...ctx.attendanceAnswers[event.partyMember][
                      event.weddingEvent
                    ],
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

            <div className="hidden md:flex items-center justify-between divide-x divide-black mt-8">
              <div className="w-1/2 py-16 pr-8">
                <CeremonyDateTime />
                <CeremonyDetails />
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

            <div className="hidden md:flex items-center justify-between divide-x divide-black mt-8">
              <div className="w-1/2 py-16 pr-8">
                <ReceptionDateTime />
                <ReceptionDetails />
              </div>

              <div className="w-1/2 py-16 pl-16 font-cardo text-center">
                {Array.from(partyMembers).map((name) => (
                  <div key={name} className="mb-16">
                    <p className="italic mb-4">{name}</p>

                    <RadioGroup
                      value={
                        attendanceAnswers[name]?.reception.willAttend ?? true
                      }
                      onChange={(willAttend) => {
                        send(
                          rsvpModel.events.attendanceAnswerChanged(
                            name,
                            'reception',
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

                    <div className="text-left mt-12">
                      <div>
                        <label htmlFor="email" className="block">
                          Any dietary restrictions we should know of?
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="dietaryRestrictions"
                            id="dietaryRestrictions"
                            value={
                              attendanceAnswers[name]?.reception
                                .dietaryRestrictions ?? ''
                            }
                            onChange={(event) => {
                              send(
                                rsvpModel.events.attendanceAnswerChanged(
                                  name,
                                  'reception',
                                  {
                                    dietaryRestrictions: event.target.value,
                                  }
                                )
                              );
                            }}
                          />
                        </div>
                      </div>

                      {/* todo: fix broken line between sections */}

                      <div className="mt-6">
                        <label htmlFor="email" className="block">
                          Name a tune that will make you boogie
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="tuneThatWillMakeYouBoogie"
                            id="tuneThatWillMakeYouBoogie"
                            value={
                              attendanceAnswers[name]?.reception
                                .tuneThatWillMakeYouBoogie ?? ''
                            }
                            onChange={(event) => {
                              send(
                                rsvpModel.events.attendanceAnswerChanged(
                                  name,
                                  'reception',
                                  {
                                    tuneThatWillMakeYouBoogie:
                                      event.target.value,
                                  }
                                )
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
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
