'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toast-kit';

export default function PatternsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Simple form submit handler with toast notification
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email) {
      toast.error({
        title: 'Validation Error',
        description: 'Please fill in all fields'
      });
      return;
    }
    
    // Show loading toast
    const loadingId = toast.loading({
      title: 'Submitting',
      description: 'Processing your information...'
    });
    
    // Simulate API call
    setTimeout(() => {
      // Success case
      toast.update(loadingId, {
        variant: 'success',
        title: 'Success',
        description: 'Your information has been submitted',
        duration: 3000
      });
      
      // Reset form
      setFormData({ name: '', email: '' });
    }, 2000);
  };
  
  // Async/await with toast.promise
  const handleAsyncAction = async () => {
    // Create a promise that resolves after a delay
    const asyncOperation = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = Math.random() > 0.3;
          if (success) {
            resolve({ status: 'success', message: 'Operation completed successfully' });
          } else {
            reject(new Error('Operation failed'));
          }
        }, 2000);
      });
    };
    
    // Use toast.promise to handle the promise lifecycle
    try {
      const result = await toast.promise(asyncOperation(), {
        loading: {
          title: 'Processing',
          description: 'Your request is being processed...'
        },
        success: (data) => ({
          title: 'Success',
          description: data.message
        }),
        error: (err) => ({
          title: 'Error',
          description: err.message
        })
      });
      
      console.log('Operation result:', result);
    } catch (error) {
      console.error('Error caught:', error);
    }
  };
  
  // Multi-step process with toast updates
  const startMultiStepProcess = () => {
    const totalSteps = 4;
    
    // Create initial toast
    const id = toast.loading({
      title: 'Starting Process',
      description: 'Step 1 of 4: Initializing...'
    });
    
    // Step 2 after delay
    setTimeout(() => {
      toast.update(id, {
        title: 'Processing',
        description: 'Step 2 of 4: Processing data...'
      });
    }, 2000);
    
    // Step 3 after another delay
    setTimeout(() => {
      toast.update(id, {
        title: 'Almost Done',
        description: 'Step 3 of 4: Finalizing...'
      });
    }, 4000);
    
    // Final step
    setTimeout(() => {
      toast.update(id, {
        variant: 'success',
        title: 'Complete',
        description: 'Step 4 of 4: Process completed successfully!',
        duration: 3000
      });
    }, 6000);
  };
  
  // Sequential toasts pattern
  const showSequentialToasts = () => {
    // First toast
    toast.info({
      title: 'Sequential Toast 1',
      description: 'This is the first toast',
      duration: 3000
    });
    
    // Second toast after delay
    setTimeout(() => {
      toast.info({
        title: 'Sequential Toast 2',
        description: 'This is the second toast',
        duration: 3000
      });
    }, 1000);
    
    // Third toast after another delay
    setTimeout(() => {
      toast.success({
        title: 'Sequential Toast 3',
        description: 'All toasts have been displayed!',
        duration: 3000
      });
    }, 2000);
  };
  
  // Conditional toast variations pattern
  const conditionalToast = (type: 'success' | 'warning' | 'error') => {
    const config = {
      success: {
        variant: 'success' as const,
        title: 'Success',
        description: 'Operation completed successfully',
        icon: '✓'
      },
      warning: {
        variant: 'warning' as const,
        title: 'Warning',
        description: 'Proceed with caution',
        icon: '⚠️'
      },
      error: {
        variant: 'error' as const,
        title: 'Error',
        description: 'Something went wrong',
        icon: '✗'
      }
    };
    
    toast(config[type]);
  };
  
  // System notification pattern (e.g. for new messages, updates)
  const simulateSystemNotification = () => {
    toast.custom(
      <div className="p-4 bg-indigo-600 rounded-lg">
        <div className="flex items-center">
          <div className="mr-3 text-white text-xl font-bold">📨</div>
          <div>
            <h3 className="font-medium text-white">New Message</h3>
            <p className="text-indigo-100 text-sm">You have a new message from John</p>
          </div>
        </div>
        <div className="mt-3 flex space-x-2">
          <button 
            className="px-3 py-1 bg-white text-indigo-600 rounded hover:bg-indigo-50 text-sm"
            onClick={() => {
              toast.dismiss();
              toast.info('Opening messages...');
            }}
          >
            Read now
          </button>
          <button 
            className="px-3 py-1 bg-transparent border border-white text-white rounded hover:bg-indigo-500 text-sm"
            onClick={() => toast.dismiss()}
          >
            Later
          </button>
        </div>
      </div>,
      {
        duration: 0, // stay until dismissed
        position: 'bottom-right'
      }
    );
  };

  // Example code snippets
  const formToastCode = `// Form submission pattern with toast
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate form
  if (!isValid) {
    toast.error({
      title: 'Validation Error',
      description: 'Please check your inputs'
    });
    return;
  }
  
  // Show loading state
  const loadingId = toast.loading({
    title: 'Submitting',
    description: 'Processing your request...'
  });
  
  try {
    // Call API
    const response = await submitFormData(formData);
    
    // Update toast on success
    toast.update(loadingId, {
      variant: 'success',
      title: 'Success',
      description: 'Your form was submitted successfully',
      duration: 3000
    });
    
    // Reset form
    resetForm();
  } catch (error) {
    // Update toast on error
    toast.update(loadingId, {
      variant: 'error',
      title: 'Error',
      description: error.message || 'Something went wrong',
      duration: 5000
    });
  }
};`;

  const promiseToastCode = `// Promise-based toast pattern
const fetchData = async () => {
  try {
    const result = await toast.promise(
      // Your async operation
      api.fetchUserData(userId),
      // Toast configurations for each state
      {
        loading: {
          title: 'Loading',
          description: 'Fetching user data...'
        },
        success: (data) => ({
          title: 'Success',
          description: \`Loaded profile for \${data.name}\`
        }),
        error: (err) => ({
          title: 'Error',
          description: err.message
        })
      }
    );
    
    // Work with the result
    setUserData(result);
  } catch (error) {
    // Additional error handling if needed
    console.error(error);
  }
};`;

  const multiStepToastCode = `// Multi-step toast pattern
const startProcess = () => {
  // Create initial toast
  const id = toast.loading({
    title: 'Step 1/3',
    description: 'Initializing process...'
  });
  
  // Update for each step
  processStep1()
    .then(() => {
      toast.update(id, {
        title: 'Step 2/3',
        description: 'Processing data...'
      });
      return processStep2();
    })
    .then(() => {
      toast.update(id, {
        title: 'Step 3/3',
        description: 'Finalizing...'
      });
      return processStep3();
    })
    .then(() => {
      toast.update(id, {
        variant: 'success',
        title: 'Complete',
        description: 'All steps completed successfully',
        duration: 3000
      });
    })
    .catch((error) => {
      toast.update(id, {
        variant: 'error',
        title: 'Process Failed',
        description: error.message,
        duration: 3000
      });
    });
};`;

  const customComponentCode = `// Custom interactive component pattern
const notifyUser = (userId, message) => {
  toast.custom(
    <div className="p-4 bg-blue-600 rounded-lg">
      <h3 className="font-medium text-white">{message.title}</h3>
      <p className="text-blue-100 text-sm">{message.content}</p>
      <div className="mt-3 flex space-x-2">
        <button 
          className="px-3 py-1 bg-white text-blue-600 rounded"
          onClick={() => {
            toast.dismiss();
            navigateToChat(userId);
          }}
        >
          Reply
        </button>
        <button 
          className="px-3 py-1 bg-transparent border border-white text-white rounded"
          onClick={() => toast.dismiss()}
        >
          Dismiss
        </button>
      </div>
    </div>,
    {
      duration: 0, // No auto-dismiss
      position: 'bottom-right'
    }
  );
};`;

  return (
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
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Common Usage Patterns</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore common patterns and best practices for using toast notifications effectively in your React applications.
          </p>
        </div>
        
        {/* Form submission pattern */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
          <h2 className="text-xl font-bold mb-4">Form Submission Pattern</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Using toast notifications to provide feedback during form submissions is one of the most common patterns.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Live Example</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  Submit Form
                </button>
              </form>
              
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>Try submitting the form with empty fields to see validation toast.</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Implementation</h3>
              <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto h-64">
                <code className="text-xs">{formToastCode}</code>
              </pre>
            </div>
          </div>
        </div>
        
        {/* Promise pattern */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
          <h2 className="text-xl font-bold mb-4">Promise-based Pattern</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Using <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">toast.promise()</code> to handle async operations elegantly.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Live Example</h3>
              <div className="mb-4">
                <button
                  onClick={handleAsyncAction}
                  className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
                >
                  Start Async Operation
                </button>
              </div>
              
              <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <h4 className="font-medium mb-2">How it works:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>Click the button to start an async operation</li>
                  <li>A loading toast appears immediately</li>
                  <li>When the promise resolves or rejects (randomly in this demo), the toast updates accordingly</li>
                  <li>The promise result is still available to use in your code</li>
                </ol>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Implementation</h3>
              <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto h-64">
                <code className="text-xs">{promiseToastCode}</code>
              </pre>
            </div>
          </div>
        </div>
        
        {/* Multi-step process pattern */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
          <h2 className="text-xl font-bold mb-4">Multi-step Process Pattern</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Using toast updates to show progress through a multi-step operation.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Live Example</h3>
              <div className="mb-4">
                <button
                  onClick={startMultiStepProcess}
                  className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded transition"
                >
                  Start Multi-step Process
                </button>
              </div>
              
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">Tip:</h4>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  This pattern is great for complex operations like file uploads, multi-stage form submissions, or wizard-like processes where you want to keep the user informed without blocking the UI.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Implementation</h3>
              <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto h-64">
                <code className="text-xs">{multiStepToastCode}</code>
              </pre>
            </div>
          </div>
        </div>
        
        {/* Additional patterns */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
          <h2 className="text-xl font-bold mb-4">More Usage Patterns</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Sequential Toasts</h3>
              <p className="mb-3 text-gray-600 dark:text-gray-300">
                Show multiple toasts in sequence to guide users through a process.
              </p>
              <button
                onClick={showSequentialToasts}
                className="w-full p-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition"
              >
                Show Sequential Toasts
              </button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Conditional Toast Variations</h3>
              <p className="mb-3 text-gray-600 dark:text-gray-300">
                Use different toast types based on conditions.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => conditionalToast('success')}
                  className="flex-1 p-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
                >
                  Success
                </button>
                <button
                  onClick={() => conditionalToast('warning')}
                  className="flex-1 p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition"
                >
                  Warning
                </button>
                <button
                  onClick={() => conditionalToast('error')}
                  className="flex-1 p-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                >
                  Error
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Interactive Component Pattern</h3>
            <p className="mb-3 text-gray-600 dark:text-gray-300">
              Create rich, interactive notifications with custom components.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <button
                  onClick={simulateSystemNotification}
                  className="w-full p-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded transition"
                >
                  Show Interactive Notification
                </button>
              </div>
              
              <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto">
                <code className="text-xs">{customComponentCode}</code>
              </pre>
            </div>
          </div>
        </div>
        
        {/* Best practices */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
          <h2 className="text-xl font-bold mb-4">Toast Notification Best Practices</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Keep It Brief</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Toast notifications should be concise and focused on a single piece of information. Use clear, actionable language.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Use Appropriate Variants</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Match the toast variant to the message type: success for confirmations, error for problems, warning for cautions, and info for general updates.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Consider Duration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Adjust duration based on importance and content length. Critical errors might need longer display times, while simple confirmations can be brief.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Avoid Toast Overload</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Don't spam users with too many notifications. Group related messages when possible and prioritize important information.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Accessible Notifications</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ensure your toasts are accessible to all users, including those using screen readers. React Toast Kit handles this automatically with proper ARIA attributes.
              </p>
            </div>
          </div>
        </div>
        
        {/* Next steps */}
        <div className="text-center mt-12 mb-8">
          <h2 className="text-xl font-bold mb-4">Next Steps</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs/accessibility"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <span>Accessibility Features</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            
            <Link
              href="/docs/nextjs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <span>Next.js Integration</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}