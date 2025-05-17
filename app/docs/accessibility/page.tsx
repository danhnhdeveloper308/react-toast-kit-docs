'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast, ToastProvider } from 'react-toast-kit';

export default function AccessibilityPage() {
  const [enableAnnouncements, setEnableAnnouncements] = useState(true);
  const [pauseOnFocus, setPauseOnFocus] = useState(true);
  const [dismissible, setDismissible] = useState(true);
  const [announcement, setAnnouncement] = useState<string | null>(null);

  // Standard screen reader accessible toast
  const showAccessibleToast = () => {
    toast.info({
      title: 'Notification',
      description: 'This toast is announced to screen readers',
      dismissible,
    });
  };

  // Toast with focus management
  // const showFocusableToast = () => {
  //   const id = toast.info({
  //     title: 'Keyboard Focus',
  //     description: 'Press Tab to focus on this toast and Enter/Space to dismiss',
  //     dismissible: true,
  //     pauseOnHover: pauseOnFocus,
  //     // Add onDismiss callback as an example
  //     onDismiss: () => {
  //       console.log('Toast dismissed via keyboard or click');
  //     },
  //   });
  // };

  // Sequential toasts to demonstrate screen reader behavior
  const showSequentialToasts = () => {
    toast.info({
      title: 'First Toast',
      description: 'This is announced first',
      duration: 3000,
    });

    setTimeout(() => {
      toast.warning({
        title: 'Second Toast',
        description: 'This is announced after the first toast',
        duration: 3000,
      });
    }, 1000);

    setTimeout(() => {
      toast.success({
        title: 'Third Toast',
        description: 'This is announced after the second toast',
        duration: 3000,
      });
    }, 2000);
  };

  // Long content toast example
  const showLongContentToast = () => {
    toast({
      title: 'Detailed Information',
      description: 'This toast contains longer content to demonstrate how screen readers interpret more detailed notifications. The content is structured to be meaningful when read aloud.',
      duration: 8000,
      dismissible: true,
    });
  };

  // Toast with action example (more complex)
  const showActionToast = () => {
    toast.custom(
      <div className="p-4 bg-blue-600 rounded-lg">
        <h3 className="text-white font-medium mb-1">Confirm your choice</h3>
        <p className="text-white/80 mb-3 text-sm">
          Would you like to proceed with this action?
        </p>
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-blue-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 focus:outline-none"
            onClick={() => {
              toast.success('Action confirmed!');
              toast.dismiss();
            }}
            aria-label="Confirm action"
          >
            Confirm
          </button>
          <button 
            className="px-3 py-1 bg-transparent border border-white text-white rounded hover:bg-blue-700 focus:ring-2 focus:ring-white focus:outline-none"
            onClick={() => toast.dismiss()}
            aria-label="Cancel action"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        duration: 0, // No auto-dismiss
        dismissible: true,
      }
    );
  };

  // Show announcement example
  const showAccessibleAnnouncement = (message: string) => {
    setAnnouncement(message);
    
    // Clear after 3 seconds
    setTimeout(() => {
      setAnnouncement(null);
    }, 3000);
  };
  
  // Examples of different toast variants with accessibility features
  const showAccessibleSuccess = () => {
    toast.success({
      title: 'Success',
      description: 'Your profile has been updated successfully',
      // Adds appropriate ARIA attributes in the ToastProvider component
    });
    
    showAccessibleAnnouncement("Success: Your profile has been updated successfully");
  };
  
  const showAccessibleError = () => {
    toast.error({
      title: 'Error',
      description: 'There was a problem updating your profile',
      // Error toasts use role="alert" for immediate attention
    });
    
    showAccessibleAnnouncement("Error: There was a problem updating your profile");
  };
  
  const showAccessibleWarning = () => {
    toast.warning({
      title: 'Warning',
      description: 'Your session will expire in 5 minutes',
    });
    
    showAccessibleAnnouncement("Warning: Your session will expire in 5 minutes");
  };
  
  const showAccessibleInfo = () => {
    toast.info({
      title: 'Information',
      description: 'A new version is available',
    });
    
    showAccessibleAnnouncement("Information: A new version is available");
  };
  
  // Focus trap example
  const showFocusableToast = () => {
    toast.custom(
      <div className="p-4 focus-within:ring-2 focus-within:ring-blue-400">
        <h4 className="font-medium mb-2">Interactive Toast</h4>
        <p className="text-sm mb-3">This toast contains interactive elements with proper focus management.</p>
        <div className="flex flex-wrap gap-2">
          <button 
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            onClick={() => toast.success('First action completed!')}
          >
            Action 1
          </button>
          <button 
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            onClick={() => toast.success('Second action completed!')}
          >
            Action 2
          </button>
          <button 
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            onClick={() => toast.dismiss()}
          >
            Dismiss
          </button>
        </div>
      </div>,
      {
        duration: 0, // Don't auto-dismiss
      }
    );
    
    showAccessibleAnnouncement("Interactive toast with multiple action buttons is displayed");
  };
  
  // Keyboard dismissible example
  const showKeyboardDismissible = () => {
    toast({
      title: 'Keyboard Dismissible',
      description: 'Press Escape key to dismiss this toast or Tab to focus the dismiss button',
      dismissible: true,
      duration: 0, // Don't auto-dismiss
    });
    
    showAccessibleAnnouncement("Keyboard dismissible toast displayed. Press Escape to dismiss.");
  };

  // Demo with a wrapper ToastProvider to demonstrate configuration options
  return (
    <ToastProvider enableAccessibleAnnouncements={enableAnnouncements}>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link href="/docs" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Documentation
            </Link>
          </div>
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">Accessibility Features</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              React Toast Kit is built with accessibility in mind, ensuring notifications are usable by everyone, including people using screen readers and keyboard navigation.
            </p>
          </div>
          
          {/* Configuration panel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
            <h2 className="text-xl font-bold mb-4">Accessibility Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={enableAnnouncements}
                      onChange={() => setEnableAnnouncements(!enableAnnouncements)}
                      className="mr-2 h-4 w-4 rounded"
                    />
                    <span>Screen reader announcements</span>
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-6">
                    Announces toast messages to screen readers
                  </p>
                </div>
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  {enableAnnouncements ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={pauseOnFocus}
                      onChange={() => setPauseOnFocus(!pauseOnFocus)}
                      className="mr-2 h-4 w-4 rounded"
                    />
                    <span>Pause on focus</span>
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-6">
                    Pauses auto-dismiss when toast is focused
                  </p>
                </div>
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  {pauseOnFocus ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={dismissible}
                      onChange={() => setDismissible(!dismissible)}
                      className="mr-2 h-4 w-4 rounded"
                    />
                    <span>Close button</span>
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-6">
                    Shows a dismiss button that can be activated via keyboard
                  </p>
                </div>
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  {dismissible ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium mb-2">Implementation Code:</h3>
              <pre className="text-xs overflow-x-auto p-2 rounded bg-gray-100 dark:bg-gray-800">
                <code>{`<ToastProvider
  enableAccessibleAnnouncements={${enableAnnouncements}}
>
  <YourApp />
</ToastProvider>`}</code>
              </pre>
            </div>
          </div>
          
          {/* Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
            <h2 className="text-xl font-bold mb-4">Accessibility Examples</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Try these examples with a screen reader enabled or navigate with your keyboard to experience the accessibility features.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={showAccessibleToast}
                className="flex items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Standard Accessible Toast
              </button>
              
              <button
                onClick={showFocusableToast}
                className="flex items-center justify-center p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800"
              >
                Keyboard Focusable Toast
              </button>
              
              <button
                onClick={showSequentialToasts}
                className="flex items-center justify-center p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800"
              >
                Sequential Announcements
              </button>
              
              <button
                onClick={showLongContentToast}
                className="flex items-center justify-center p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-800"
              >
                Long Content Toast
              </button>
            </div>
            
            <div className="mt-6">
              <button
                onClick={showActionToast}
                className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Interactive Toast with Actions
              </button>
            </div>
          </div>
          
          {/* Accessibility information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
            <h2 className="text-xl font-bold mb-4">About Accessibility in React Toast Kit</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">ARIA Attributes</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Toast notifications include appropriate ARIA roles and attributes:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300 space-y-1">
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">role="status"</code> for standard toasts</li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">role="alert"</code> for error toasts</li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">aria-live="polite"</code> for non-critical notifications</li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">aria-live="assertive"</code> for important alerts</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Keyboard Navigation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All toast notifications can be navigated to and dismissed with a keyboard:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300 space-y-1">
                  <li><strong>Tab</strong>: Move focus to the toast</li>
                  <li><strong>Enter/Space</strong>: Dismiss the toast when focused (if dismissible)</li>
                  <li><strong>Escape</strong>: Dismiss all toasts</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Screen Reader Announcements</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  React Toast Kit uses a visually hidden ARIA live region to announce toast messages to screen readers without interrupting focus.
                  This ensures that users are notified of important information regardless of their current focus position.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Reduced Motion Support</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  For users who prefer reduced motion, the toast animations automatically respect the
                  <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded mx-1">prefers-reduced-motion</code>
                  media query, using more subtle animations or no animations at all.
                </p>
              </div>
            </div>
          </div>
          
          {/* Implementation guide */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
            <h2 className="text-xl font-bold mb-4">Accessibility Implementation Guide</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Best Practices</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Use meaningful titles and descriptions that provide context when read by screen readers</li>
                  <li>Keep toast messages concise and focused on a single piece of information</li>
                  <li>Use appropriate toast variants (success, error, etc.) to convey the right semantic meaning</li>
                  <li>Consider using longer durations for toasts with more content</li>
                  <li>Ensure custom toast components include proper keyboard navigation and focus management</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Implementation Example</h3>
                <pre className="text-xs overflow-x-auto p-3 rounded bg-gray-100 dark:bg-gray-800">
                  <code>{`// Setup with accessibility features enabled
<ToastProvider
  enableAccessibleAnnouncements={true} // Enable screen reader announcements
  defaultDuration={5000} // Give users enough time to read notifications
>
  <YourApp />
</ToastProvider>

// Accessible toast example
const showAccessibleAlert = () => {
  toast.error({
    title: 'Connection Error',
    description: 'Unable to connect to the server. Please check your internet connection.',
    // Proper accessibility settings
    dismissible: true,
    pauseOnHover: true,
    duration: 8000, // Longer duration for important messages
    // Optional callback when dismissed
    onDismiss: () => {
      console.log('User acknowledged the error');
      // Focus can be returned to a specific element if needed
      document.getElementById('retry-button')?.focus();
    },
  });
};`}</code>
                </pre>
              </div>
            </div>
          </div>
          
          {/* Resources and links */}
          <div className="text-center mt-12 mb-8">
            <h2 className="text-xl font-bold mb-4">Additional Resources</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.w3.org/WAI/ARIA/apg/patterns/alert/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <span>ARIA Alert Pattern</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <span>Full API Documentation</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>
    </ToastProvider>
  );
}