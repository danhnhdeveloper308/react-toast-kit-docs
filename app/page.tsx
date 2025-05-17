'use client';

import Link from 'next/link';
import { toast } from 'react-toast-kit';
import { ToastPosition } from 'react-toast-kit';
import { useState } from 'react';
import ToastDemo from '../components/ToastDemo';

export default function Home() {
  const [code, setCode] = useState(`import { ToastProvider, toast } from 'react-toast-kit';

// Wrap your app with the ToastProvider
function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

// Use in any component
function YourComponent() {
  return (
    <button onClick={() => toast.success('Successfully saved!')}>
      Save
    </button>
  );
}`);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  // Quick toast functions for demos
  const showSuccessToast = () => toast.success('Operation completed successfully!');
  const showErrorToast = () => toast.error('Something went wrong. Please try again.');
  const showInfoToast = () => toast.info('New version available. Please update.');
  const showWarningToast = () => toast.warning('Your session will expire in 5 minutes.');
  
  // Toast with promise example
  const showPromiseToast = () => {
    const promise = new Promise((resolve, reject) => {
      // Simulate async operation
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve({ name: 'John Doe', data: [1, 2, 3, 4, 5] });
        } else {
          reject(new Error('Network request failed'));
        }
      }, 2000);
    });
    
    toast.promise(promise, {
      loading: 'Loading data...',
      success: (data: any) => `Successfully loaded ${data.data.length} items!`,
      error: (err) => `Error: ${err.message}`
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
              <span className="block">Modern Toast Notifications</span>
              <span className="block text-blue-600 dark:text-blue-400 mt-2">for React Applications</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A lightweight, highly customizable, and performant toast notification system with accessibility built-in.
            </p>
            
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link 
                href="/docs" 
                className="px-8 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium transition shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <a 
                href="https://github.com/danhnhdeveloper308/react-toast-kit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition"
              >
                View on GitHub
              </a>
            </div>
            
            {/* Quick toast demo */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              <button
                onClick={showSuccessToast}
                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
              >
                Success
              </button>
              <button
                onClick={showErrorToast}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              >
                Error
              </button>
              <button
                onClick={showWarningToast}
                className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition"
              >
                Warning
              </button>
              <button
                onClick={showInfoToast}
                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
              >
                Info
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Key Features
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Why choose React Toast Kit for your next project?
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 shadow-md">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">High Performance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built for speed using React, Framer Motion, and Zustand for state management. Optimized for minimal re-renders.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 shadow-md">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Fully Customizable</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Customize every aspect of your toasts, from position and animation to themes and styles.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 shadow-md">
              <div className="text-3xl mb-4">♿</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Accessibility First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built with ARIA attributes, keyboard navigation, and screen reader announcements for all users.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-700 dark:to-gray-800 shadow-md">
              <div className="text-3xl mb-4">🧩</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Rich API</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Intuitive API with helper methods like toast.success(), toast.promise(), and update/dismiss functions.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-gray-700 dark:to-gray-800 shadow-md">
              <div className="text-3xl mb-4">🖥️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Framework Agnostic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Works with Next.js (App Router & Pages Router), Create React App, Vite, Remix and more!
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-700 dark:to-gray-800 shadow-md">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">TypeScript Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built with TypeScript for better developer experience and type safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code example section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Simple to Use
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Just a few lines of code to get started
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="relative rounded-lg bg-gray-900 overflow-hidden shadow-xl">
                <div className="absolute top-3 left-3 flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="pt-10 pb-4 px-4 overflow-auto">
                  <pre className="text-gray-300 text-sm">
                    <code>{code}</code>
                  </pre>
                </div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={copyCode}
                    className="p-2 text-gray-400 hover:text-white transition"
                    title="Copy code"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                More Than Just Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700 dark:text-gray-300">Automatic positioning with support for sticky headers/footers</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700 dark:text-gray-300">Promise integration for async operations</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700 dark:text-gray-300">Themeable with light, dark, and system preference modes</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700 dark:text-gray-300">Supports custom components for unlimited creativity</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={showPromiseToast}
                    className="px-6 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Try Promise Toast
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Full demos section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Interactive Demo
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Try out all the features with this live playground
            </p>
          </div>
          
          <ToastDemo />
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            Install and integrate React Toast Kit in your project in minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs"
              className="px-8 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition shadow-md"
            >
              Read the Docs
            </Link>
            <a
              href="https://github.com/danhnhdeveloper308/react-toast-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-800 text-white font-medium rounded-lg border border-blue-400 hover:bg-blue-700 transition"
            >
              Star on GitHub
            </a>
          </div>
          <div className="mt-6">
            <code className="bg-blue-800 px-4 py-2 rounded-lg text-blue-100">
              npm install react-toast-kit
            </code>
          </div>
        </div>
      </section>
    </div>
  );
}