import Link from 'next/link';
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';

const navigation = [
  { name: "หน้าแรก", href: ["/", "/", "/"], current: true },
  { name: "ค้นหาแมว", href: ["/all-cat", "/all-cat", "/all-cat"], current: false },
  { name: "แมวของฉัน", href: ["/signin/login", "/user/my-cat", "/shelter/my-cat"], current: false },
  { name: "ลิ้งค์ในเว็บ", href: ["/list", "/list", "/list"], current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [id, setId] = useState(0);
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (session) {
      console.log("role : " + session.user.user_metadata.role);
      setId(session.user.user_metadata.role);
      if (id == 1) {
        console.log("role user");
      } else if (id == 2) {
        console.log("role shelter");
      }
    }
    checkPath();
  }, [session])

  const checkPath = () => {
    for (var i = 0; i < navigation.length; i++) {
      if (pathname == navigation[i].href[id]) {
        navigation[i].current = true;
      } else {
        navigation[i].current = false;
      }
    }
  }

  const logOut = () => {
    router.push('/');
    setId(0);
    supabase.auth.signOut();
  }

  return (
    <Disclosure as="nav" class=" bg-white">
      {({ open }) => (
        <>
          <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
              <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span class="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon class="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon class="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex flex-shrink-0 items-center">
                  <img
                    class="block h-8 w-auto lg:hidden"
                    src="https://cdn-icons-png.flaticon.com/512/763/763704.png"
                    alt="Your Company"
                  />
                  <img
                    class="hidden h-8 w-auto lg:block"
                    src="https://cdn-icons-png.flaticon.com/512/763/763704.png"
                    alt="Your Company"
                  />
                </div>
                <div class="hidden sm:ml-6 sm:block">
                  <div class="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href[id]}
                        class={classNames(
                          item.current
                            ? "bg-salmon text-white"
                            : "text-zinc-400 hover:bg-light-salmon hover:text-zinc-800",
                          "px-3 py-2 rounded-md text-sm font-extralight"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div class="hidden sm:ml-6 sm:block">
                  <button class="flex space-x-4" type="button">
                    <a
                      key="สำหรับมูลนิธิ"
                      href="/signin/shelter"
                      class={classNames(
                        false
                          ? "bg-salmon text-white"
                          : "text-iris hover:bg-light-salmon hover:text-zinc-800",
                        "px-3 py-2 rounded-md text-sm font-extralight"
                      )}
                      aria-current={false ? "page" : undefined}
                    >
                      สำหรับมูลนิธิ
                    </a>
                  </button>
                </div>
              </div>

              <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  class="rounded-full  p-1 text-gray-400 hover:text-salmon focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-light-salmon"
                >
                  <span class="sr-only">View notifications</span>
                  <BellIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" class="relative ml-3">
                  <div>
                    <Menu.Button class="flex rounded-full bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-salmon">
                      <span class="sr-only">Open user menu</span>
                      <img
                        class="h-8 w-8 rounded-full"
                        src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/signin/login"
                            class={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Log in
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            class={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item type="button" onClick={() => logOut()}>
                        {({ active }) => (
                          <a
                            class={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel class="sm:hidden">
            <div class="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  class={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}