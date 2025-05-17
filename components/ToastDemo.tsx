'use client';

import React, { useState } from 'react';
import { toast, useToast, ToastPosition } from 'react-toast-kit';

export default function ToastDemo() {
  const { theme, setTheme } = useToast();
  const [position, setPosition] = useState<ToastPosition>('top-right');
  const [duration, setDuration] = useState<number>(4000);
  const [pauseOnHover, setPauseOnHover] = useState<boolean>(true);
  const [dismissible, setDismissible] = useState<boolean>(true);
  const [animation, setAnimation] = useState<'slide' | 'fade' | 'bounce' | 'none'>('slide');
  
  // Basic toasts
  const showBasicToast = () => {
    toast({
      title: 'Basic Toast',
      description: 'This is a basic toast with title and description',
      position,
      duration,
      pauseOnHover,
      dismissible,
      animation,
    });
  };
  
  const showSimpleToast = () => {
    toast('This is a simple toast message without any configuration');
  };
  
  // Variant toasts
  const showSuccessToast = () => {
    toast.success({
      title: 'Success!',
      description: 'Your operation completed successfully',
      position,
      duration,
      pauseOnHover,
      dismissible,
      animation,
    });
  };
  
  const showErrorToast = () => {
    toast.error({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      position,
      duration,
      pauseOnHover,
      dismissible,
      animation,
    });
  };
  
  const showWarningToast = () => {
    toast.warning({
      title: 'Warning',
      description: 'Your session will expire in 5 minutes',
      position,
      duration,
      pauseOnHover,
      dismissible,
      animation,
    });
  };
  
  const showInfoToast = () => {
    toast.info({
      title: 'Information',
      description: 'A new version is available',
      position,
      duration,
      pauseOnHover,
      dismissible,
      animation,
    });
  };
  
  // Advanced examples
  const showCustomToast = () => {
    toast.custom(
      <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white">
        <div className="flex items-center">
          <div className="text-xl mr-2">🚀</div>
          <div>
            <div className="font-bold">Custom Toast</div>
            <div className="text-sm opacity-90">This is a fully custom toast component!</div>
          </div>
        </div>
        <div className="mt-2 text-xs">
          <button 
            className="bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded mr-2"
            onClick={() => toast('Action performed!')}
          >
            Action
          </button>
          <button 
            className="bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded"
            onClick={() => toast.dismiss()}
          >
            Dismiss
          </button>
        </div>
      </div>,
      { 
        position, 
        duration: 0, // No auto-dismiss
        dismissible,
      }
    );
  };
  
  const showLoadingToast = () => {
    const id = toast.loading({
      title: 'Loading',
      description: 'Please wait while we process your request...',
      position,
    });
    
    // Simulate a delay and then update the toast
    setTimeout(() => {
      toast.update(id, {
        title: 'Completed',
        description: 'Your request has been processed successfully',
        variant: 'success',
        duration: 2000,
      });
    }, 3000);
  };
  
  const showPromiseToast = () => {
    const promise = new Promise((resolve, reject) => {
      // Simulate async operation
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve({ name: 'John Doe', status: 'active' });
        } else {
          reject(new Error('Network error occurred'));
        }
      }, 3000);
    });
    
    toast.promise(promise, {
      loading: 'Fetching user data...',
      success: (data: any) => `Successfully loaded ${data.name}`,
      error: (err) => `Error: ${err.message}`,
    }, {
      position,
    });
  };
  
  // Multiple toasts
  const showMultipleToasts = () => {
    toast.info('First toast message');
    setTimeout(() => toast.success('Second toast message'), 500);
    setTimeout(() => toast.warning('Third toast message'), 1000);
    setTimeout(() => toast.error('Fourth toast message'), 1500);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden my-6">
      {/* Configuration Panel */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Toast Configuration</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Position</label>
            <select 
              value={position} 
              onChange={(e) => setPosition(e.target.value as ToastPosition)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="top-right">Top Right</option>
              <option value="top-center">Top Center</option>
              <option value="top-left">Top Left</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-left">Bottom Left</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium">Duration (ms)</label>
            <input 
              type="number" 
              value={duration} 
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium">Theme</label>
            <div className="flex space-x-3">
              <button 
                onClick={() => setTheme('light')} 
                className={`px-3 py-1.5 rounded text-sm ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Light
              </button>
              <button 
                onClick={() => setTheme('dark')} 
                className={`px-3 py-1.5 rounded text-sm ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Dark
              </button>
              <button 
                onClick={() => setTheme('system')} 
                className={`px-3 py-1.5 rounded text-sm ${theme === 'system' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                System
              </button>
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium">Animation</label>
            <select 
              value={animation} 
              onChange={(e) => setAnimation(e.target.value as 'slide' | 'fade' | 'bounce' | 'none')}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="slide">Slide</option>
              <option value="fade">Fade</option>
              <option value="bounce">Bounce</option>
              <option value="none">None</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="pauseOnHover" 
              checked={pauseOnHover}
              onChange={() => setPauseOnHover(!pauseOnHover)}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor="pauseOnHover" className="text-sm">Pause on hover</label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="dismissible" 
              checked={dismissible}
              onChange={() => setDismissible(!dismissible)}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor="dismissible" className="text-sm">Dismissible</label>
          </div>
        </div>
      </div>
      
      {/* Basic Examples */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Basic Examples</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={showBasicToast}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 py-2 rounded"
          >
            Standard Toast
          </button>
          <button
            onClick={showSimpleToast}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 py-2 rounded"
          >
            Simple String Toast
          </button>
        </div>
      </div>
      
      {/* Variant Examples */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Toast Variants</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={showSuccessToast}
            className="bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            Success
          </button>
          <button
            onClick={showErrorToast}
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          >
            Error
          </button>
          <button
            onClick={showWarningToast}
            className="bg-amber-500 hover:bg-amber-600 text-white py-2 rounded"
          >
            Warning
          </button>
          <button
            onClick={showInfoToast}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Info
          </button>
        </div>
      </div>
      
      {/* Advanced Examples */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Advanced Features</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={showCustomToast}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded"
          >
            Custom Component
          </button>
          <button
            onClick={showLoadingToast}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded"
          >
            Loading → Success
          </button>
          <button
            onClick={showPromiseToast}
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded"
          >
            Promise Toast
          </button>
          <button
            onClick={showMultipleToasts}
            className="bg-violet-500 hover:bg-violet-600 text-white py-2 rounded"
          >
            Multiple Toasts
          </button>
        </div>
      </div>
      
      {/* Code Example */}
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Usage Example</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto text-xs">
          {`
// Import the toast function
import { toast } from 'react-toast-kit';

// Basic usage
toast('Simple message');

// With options
toast.success({
  title: 'Success!',
  description: 'Operation completed successfully',
  position: '${position}',
  duration: ${duration},
  pauseOnHover: ${pauseOnHover},
  dismissible: ${dismissible},
  animation: '${animation}'
});

// With custom component
toast.custom(
  <div className="custom-toast">
    <h4>Custom Component</h4>
    <p>This is fully customizable!</p>
  </div>
);

// Promise handling
toast.promise(fetchData(), {
  loading: 'Loading data...',
  success: (data) => \`Got \${data.length} items\`,
  error: (err) => \`Error: \${err.message}\`
});
          `}
        </pre>
      </div>
    </div>
  );
}