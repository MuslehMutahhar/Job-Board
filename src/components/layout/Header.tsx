'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: 'Home', href: '/', current: pathname === '/' },
    { name: 'Jobs', href: '/jobs', current: pathname === '/jobs' || pathname.startsWith('/jobs/') },
    { name: 'Companies', href: '/companies', current: pathname === '/companies' || pathname.startsWith('/companies/') },
  ];

  // User-specific navigation based on role
  const userNavigation = user ? (
    user.role === 'COMPANY' ? [
      { name: 'Dashboard', href: '/dashboard', current: pathname === '/dashboard' },
      { name: 'My Jobs', href: '/dashboard/jobs', current: pathname === '/dashboard/jobs' },
      { name: 'Profile', href: '/dashboard/profile', current: pathname === '/dashboard/profile' },
    ] : user.role === 'ADMIN' ? [
      { name: 'Admin', href: '/admin', current: pathname === '/admin' },
      { name: 'Users', href: '/admin/users', current: pathname === '/admin/users' },
      { name: 'Profile', href: '/profile', current: pathname === '/profile' },
    ] : [
      { name: 'My Applications', href: '/applications', current: pathname === '/applications' },
      { name: 'Profile', href: '/profile', current: pathname === '/profile' },
    ]
  ) : [
    { name: 'Sign In', href: '/auth/login', current: pathname === '/auth/login' },
    { name: 'Register', href: '/auth/register', current: pathname === '/auth/register' },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="flex items-center space-x-2">
                <BriefcaseIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">JobBoard</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    item.current
                      ? 'border-b-2 border-blue-500 text-gray-900 dark:text-white'
                      : 'border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative ml-3">
                  <div className="flex">
                    <button
                      type="button"
                      className="flex items-center space-x-2 rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      {user.image ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.image}
                          alt={user.name || 'User'}
                        />
                      ) : (
                        <UserCircleIcon className="h-8 w-8 text-gray-400" />
                      )}
                      <span className="hidden md:inline text-gray-700 dark:text-gray-300">
                        {user.name}
                      </span>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        item.current
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={logout}
                    className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white rounded-md"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      item.current
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                  item.current
                    ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white'
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pb-3 pt-4">
            {user ? (
              <>
                <div className="flex items-center px-4">
                  {user.image ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.image}
                      alt={user.name || 'User'}
                    />
                  ) : (
                    <UserCircleIcon className="h-10 w-10 text-gray-400" />
                  )}
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 