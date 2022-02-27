import { Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';

export default function ErrorNotification() {
  const [show, setShow] = useState(true);

  return (
    // Notification panel, dynamically insert this into the live region when it needs to be displayed
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ExclamationIcon
                className="h-6 w-6 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <div className="mb-4 font-medium -mt-1">Oops!</div>
              <p>
                Something went wrong. Please try submitting again. If the
                problem persists, let us know.
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="button--small p-2"
                onClick={() => {
                  setShow(false);
                }}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
