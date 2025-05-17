'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6 text-gray-800 dark:text-white">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}