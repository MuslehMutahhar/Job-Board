import Link from 'next/link';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/about" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              About
            </Link>
            <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Terms
            </Link>
            <Link href="/contact" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Contact
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1 flex items-center justify-center md:justify-start">
            <div className="flex items-center">
              <BriefcaseIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-gray-500 dark:text-gray-400">JobBoard</span>
            </div>
            <p className="ml-4 text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} JobBoard. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 