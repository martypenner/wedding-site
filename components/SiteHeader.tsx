import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ReactDOM from 'react-dom';

const navigationItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Schedule',
    href: '/schedule',
  },
  // {
  //   name: 'Travel',
  //   href: '/travel',
  // },
  // {
  //   name: 'Photos',
  //   href: '/photos',
  // },
  {
    name: 'Faqs',
    href: '/faqs',
  },
  {
    name: 'RSVP',
    href: '/rsvp',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SiteHeader() {
  const router = useRouter();
  const [menuIsVisible, setMenuIsVisible] = React.useState(false);

  return (
    <header className="m-2 md:m-0 p-0 md:p-5 pb-0">
      <div className="flex items-center md:hidden">
        <button
          type="button"
          onClick={() => {
            setMenuIsVisible(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {menuIsVisible &&
          ReactDOM.createPortal(
            <Transition.Root show={menuIsVisible} as={React.Fragment}>
              <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto h-screen text-center"
                onClose={setMenuIsVisible}
              >
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-white bg-opacity-95 transition-opacity" />
                </Transition.Child>

                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="h-screen p-8 text-left overflow-hidden transform transition-all">
                    <div className="absolute top-0 left-0 pt-14 pl-4">
                      <button
                        type="button"
                        className="hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        onClick={() => setMenuIsVisible(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <nav className="mt-3 mx-8" aria-label="Site menu">
                      {navigationItems.map((item) => {
                        const isCurrent = router.pathname === item.href;

                        return (
                          <Link key={item.name} href={item.href}>
                            <a
                              className={classNames(
                                isCurrent ? 'text-gold' : '',
                                'flex items-center justify-center px-3 py-2 text-3xl font-medium uppercase hover:underline'
                              )}
                              aria-current={isCurrent ? 'page' : undefined}
                            >
                              <span className="truncate">{item.name}</span>
                            </a>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </Transition.Child>
              </Dialog>
            </Transition.Root>,
            document.body
          )}

        <h1 className="flex-1 text-2xl text-center uppercase m-0">
          <Link href="/">
            <a>Marty & Meaghan</a>
          </Link>
        </h1>
      </div>

      <div className="hidden md:flex mb-6">
        <h2 className="font-cardo text-sm italic ml-8 lg:ml-0 mr-10">
          October 15, 2022
        </h2>
        <h3 className="font-cardo text-sm italic">Parry Sound, Ontario</h3>
      </div>

      <div className="hidden md:block">
        <h1 className="text-5xl text-center uppercase mb-4">
          <Link href="/">
            <a>Marty & Meaghan</a>
          </Link>
        </h1>

        <nav
          className="mx-8 flex justify-center items-center gap-10 text-xs font-normal tracking-wider uppercase"
          aria-label="Site menu"
        >
          {navigationItems.map((item) => {
            const isCurrent = router.pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <a
                  className={classNames(
                    isCurrent ? 'text-gold' : '',
                    'flex items-center justify-center hover:underline'
                  )}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
