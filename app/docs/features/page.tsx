'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toast-kit';
import type { ToastPosition } from 'react-toast-kit';

export default function FeaturesPage() {
  const [duration, setDuration] = useState<number>(4000);
  const [position, setPosition] = useState<ToastPosition>('top-right');
  const [pauseOnHover, setPauseOnHover] = useState<boolean>(true);
  const [dismissible, setDismissible] = useState<boolean>(true);
  const [dismissOnClick, setDismissOnClick] = useState<boolean>(false);

  // Basic examples
  const showStandardToast = () => {
    toast({
      title: 'Standard Toast',
      description: 'This is a standard toast with title and description',
      position,
      duration,
      pauseOnHover,
      dismissible,
      dismissOnClick,
    });
  };

  const showSimpleToast = () => {
    toast('This is a simple toast message without a title');
  };

  // Variant examples
  const showSuccessToast = () => {
    toast.success({
      title: 'Success',
      description: 'Your operation completed successfully',
      position,
      duration,
      pauseOnHover,
      dismissible,
      dismissOnClick,
    });
  };

  const showErrorToast = () => {
    toast.error({
      title: 'Error',
      description: 'Something went wrong. Please try again',
      position,
      duration,
      pauseOnHover,
      dismissible,
      dismissOnClick,
    });
  };

  const showWarningToast = () => {
    toast.warning({
      title: 'Warning',
      description: 'This action may have unintended consequences',
      position,
      duration,
      pauseOnHover,
      dismissible,
      dismissOnClick,
    });
  };

  const showInfoToast = () => {
    toast.info({
      title: 'Information',
      description: 'Your session will expire in 5 minutes',
      position,
      duration,
      pauseOnHover,
      dismissible,
      dismissOnClick,
    });
  };

  // Advanced examples
  const showCustomToast = () => {
    toast.custom(
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-lg shadow-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-semibold">Custom Component</h4>
            <p className="text-white/80 text-sm">
              This is a fully customized toast with gradients and custom styling
            </p>
          </div>
        </div>
      </div>,
      {
        position,
        duration,
        pauseOnHover,
        dismissible,
        dismissOnClick,
      }
    );
  };

  const showLoadingToast = () => {
    const id = toast.loading({
      title: 'Processing',
      description: 'Please wait while we process your request...',
      position,
      duration: 0, // Infinite duration
    });

    // Simulate a process completion after 3 seconds
    setTimeout(() => {
      toast.update(id, {
        variant: 'success',
        title: 'Completed',
        description: 'Your request has been processed successfully!',
        duration: 2000, // Auto-dismiss after 2 seconds
      });
    }, 3000);
  };

  const showPromiseToast = () => {
    // Create a promise that resolves or rejects randomly after 2 seconds
    const promise = new Promise<{ name: string; status: string }>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve({ name: 'John', status: 'success' });
        } else {
          reject(new Error('Failed to fetch user data'));
        }
      }, 2000);
    });

    void toast
      .promise(promise, {
        loading: {
          title: 'Fetching Data',
          description: 'Please wait while we retrieve your information...',
          position,
        },
        success: (data) => ({
          title: 'Data Loaded',
          description: `Successfully loaded user: ${data.name}`,
          position,
          duration,
        }),
        error: (err: unknown) => ({
          title: 'Error',
          description: err instanceof Error ? err.message : 'Something went wrong',
          position,
          duration,
        }),
      })
      .catch(() => undefined);
  };

  const showUpdateToast = () => {
    const id = toast.info({
      title: 'Downloading',
      description: 'Starting download...',
      position,
      duration: 0, // No auto-dismiss
    });

    // Update multiple times to show progress
    setTimeout(() => {
      toast.update(id, { description: 'Downloading: 25% complete' });
    }, 1000);

    setTimeout(() => {
      toast.update(id, { description: 'Downloading: 50% complete' });
    }, 2000);

    setTimeout(() => {
      toast.update(id, { description: 'Downloading: 75% complete' });
    }, 3000);

    setTimeout(() => {
      toast.update(id, {
        variant: 'success',
        title: 'Download Complete',
        description: 'Your file has been downloaded successfully!',
        duration: 2000,
      });
    }, 4000);
  };

  // Animation examples
  const showAnimations = () => {
    const animations = ['slide', 'fade', 'bounce', 'zoom'] as const;
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;

    // Show toasts with different animations
    animations.forEach((animation, index) => {
      setTimeout(() => {
        toast.info({
          title: `${animation} Animation`,
          description: `This toast uses the "${animation}" animation style`,
          position: positions[index % positions.length] as ToastPosition,
          animation: animation,
          duration: 4000,
        });
      }, index * 800);
    });
  };

  // Code snippet for the current configuration
  const getConfigCode = () => {
    return `toast({
  title: 'Toast Title',
  description: 'Toast description message',
  position: '${position}',
  duration: ${duration},
  pauseOnHover: ${pauseOnHover},
  dismissible: ${dismissible},
  dismissOnClick: ${dismissOnClick}
});`;
  };

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/docs"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Docs
        </Link>
        <span>/</span>
        <span>Features</span>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Features</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Interactive examples of all toast variants, animations, and advanced behaviors.
        </p>
      </div>

      {/* Configuration panel */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Toast Configuration</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as ToastPosition)}
              className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            >
              <option value="top-left">Top Left</option>
              <option value="top-center">Top Center</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Duration (ms)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full"
              />
              <span className="w-16 text-center">{duration}ms</span>
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={pauseOnHover}
                onChange={() => setPauseOnHover(!pauseOnHover)}
                className="mr-2 h-4 w-4 rounded"
              />
              <span>Pause on hover</span>
            </label>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={dismissible}
                onChange={() => setDismissible(!dismissible)}
                className="mr-2 h-4 w-4 rounded"
              />
              <span>Show dismiss button</span>
            </label>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={dismissOnClick}
                onChange={() => setDismissOnClick(!dismissOnClick)}
                className="mr-2 h-4 w-4 rounded"
              />
              <span>Dismiss on click</span>
            </label>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium mb-2">Current Configuration:</h3>
          <pre className="text-xs overflow-x-auto p-2 rounded bg-gray-100 dark:bg-gray-800">
            <code>{getConfigCode()}</code>
          </pre>
        </div>
      </div>

      {/* Basic examples */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Basic Examples</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Simple toast notifications with different styles
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={showStandardToast}
            className="flex items-center justify-center p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition"
          >
            Standard Toast (with title)
          </button>

          <button
            onClick={showSimpleToast}
            className="flex items-center justify-center p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition"
          >
            Simple Toast (no title)
          </button>
        </div>
      </div>

      {/* Toast variants */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Toast Variants</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Different toast variants for various use cases
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={showSuccessToast}
            className="flex items-center justify-center p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            Success Toast
          </button>

          <button
            onClick={showErrorToast}
            className="flex items-center justify-center p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            Error Toast
          </button>

          <button
            onClick={showWarningToast}
            className="flex items-center justify-center p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition"
          >
            Warning Toast
          </button>

          <button
            onClick={showInfoToast}
            className="flex items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            Info Toast
          </button>
        </div>
      </div>

      {/* Advanced examples */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Advanced Examples</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          More sophisticated toast notifications with dynamic content and behavior
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={showCustomToast}
            className="flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg transition"
          >
            Custom Component Toast
          </button>

          <button
            onClick={showLoadingToast}
            className="flex items-center justify-center p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
          >
            Loading → Success Toast
          </button>

          <button
            onClick={showPromiseToast}
            className="flex items-center justify-center p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
          >
            Promise Toast
          </button>

          <button
            onClick={showUpdateToast}
            className="flex items-center justify-center p-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition"
          >
            Updating Toast
          </button>
        </div>
      </div>

      {/* Animation examples */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Animation Examples</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Different animation styles for toast notifications
        </p>

        <button
          onClick={showAnimations}
          className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition"
        >
          Show Animation Examples
        </button>

        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Available animations:{' '}
            <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">slide</code>,{' '}
            <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">fade</code>,{' '}
            <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">bounce</code>,{' '}
            <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">flip</code>,{' '}
            <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">zoom</code>,{' '}
            <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">elastic</code>,{' '}
            <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">none</code>
          </p>
        </div>
      </div>

      {/* Dismissing toasts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Management Controls</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Programmatically control toast notifications
        </p>

        <button
          onClick={() => toast.dismiss()}
          className="w-full flex items-center justify-center p-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition"
        >
          Dismiss All Toasts
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-800 mt-8">
        <Link
          href="/docs"
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Getting Started
        </Link>
        <Link
          href="/docs/theming"
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Theming
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
