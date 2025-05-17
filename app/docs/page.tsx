'use client';

import Link from 'next/link';
import { toast } from 'react-toast-kit';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Feature card component
const FeatureCard = ({ 
  title, 
  description, 
  icon,
  link
}: {
  title: string;
  description: string;
  icon: string;
  link: string;
}) => {
  const router = useRouter();
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => router.push(link)}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
      <div className="mt-4">
        <Link
          href={link}
          className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Learn more
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

// Code snippet component
const CodeSnippet = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded hover:bg-gray-700 text-gray-400 hover:text-white"
      >
        {copied ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
      <pre className="p-4 text-sm overflow-x-auto text-gray-300">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">React Toast Kit Documentation</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A modern, performant, and theme-aware toast notification library for React applications.
          </p>
        </div>
        
        {/* Quick Start */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Installation</h3>
              <CodeSnippet code={`npm install react-toast-kit\n# or\nyarn add react-toast-kit\n# or\npnpm add react-toast-kit`} />
              
              <h3 className="text-lg font-medium mb-3 mt-6">Basic Usage</h3>
              <CodeSnippet code={`import { ToastProvider, toast } from 'react-toast-kit';

// Wrap your app with the ToastProvider
function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );
}

// Use the toast function anywhere in your components
function MyComponent() {
  const showToast = () => {
    toast.success('Successfully saved!');
  };

  return <button onClick={showToast}>Save</button>;
}`} />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Show Different Toast Types</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <button 
                  onClick={() => toast('Default toast message')} 
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Default
                </button>
                <button 
                  onClick={() => toast.success('Successfully saved!')} 
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Success
                </button>
                <button 
                  onClick={() => toast.error('Something went wrong!')} 
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Error
                </button>
                <button 
                  onClick={() => toast.warning('Please be careful!')} 
                  className="px-3 py-1 bg-amber-500 text-white rounded hover:bg-amber-600"
                >
                  Warning
                </button>
                <button 
                  onClick={() => toast.info('Here is some information.')} 
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Info
                </button>
                <button 
                  onClick={() => {
                    const id = toast.loading('Processing your request...');
                    setTimeout(() => {
                      toast.update(id, { 
                        variant: 'success',
                        title: 'Completed',
                        description: 'Your request has been processed',
                        duration: 3000
                      });
                    }, 2000);
                  }} 
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Loading
                </button>
              </div>
              
              <h3 className="text-lg font-medium mb-3 mt-6">Toast with Options</h3>
              <CodeSnippet code={`// With more options
toast.success({
  title: 'Success!',
  description: 'Data has been saved successfully.',
  duration: 5000,
  position: 'top-right',
  pauseOnHover: true,
  dismissible: true,
  animation: 'slide'
});`} />

              <h3 className="text-lg font-medium mb-3 mt-6">Promise Support</h3>
              <button 
                onClick={() => {
                  const promise = new Promise((resolve, reject) => {
                    // Simulate api call
                    setTimeout(() => {
                      if (Math.random() > 0.3) {
                        resolve({ items: [1, 2, 3, 4, 5] });
                      } else {
                        reject(new Error("Failed to fetch data"));
                      }
                    }, 2000);
                  });
                  
                  toast.promise(promise, {
                    loading: 'Fetching your data...',
                    success: (data: any) => `Successfully loaded ${data.items.length} items!`,
                    error: (err: Error) => `Error: ${err.message}`
                  });
                }} 
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mb-3"
              >
                Try Promise Toast
              </button>
            </div>
          </div>
        </div>
        
        {/* Documentation Sections */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              title="Features"
              description="Explore all the features included in React Toast Kit."
              icon="🚀"
              link="/docs/features"
            />
            <FeatureCard 
              title="Patterns & Best Practices"
              description="Learn patterns and best practices for using toast notifications."
              icon="📚"
              link="/docs/patterns"
            />
            <FeatureCard 
              title="Theme Customization"
              description="Customize the appearance of your toast notifications."
              icon="🎨"
              link="/docs/theming"
            />
            <FeatureCard 
              title="Next.js Integration"
              description="Learn how to use React Toast Kit with Next.js."
              icon="⚡"
              link="/docs/nextjs"
            />
            <FeatureCard 
              title="Accessibility"
              description="Make your toasts accessible to all users."
              icon="♿"
              link="/docs/accessibility"
            />
            <FeatureCard 
              title="API Reference"
              description="Complete API documentation for React Toast Kit."
              icon="📖"
              link="/docs/api"
            />
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Can I use this with SSR frameworks?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, React Toast Kit is designed to work seamlessly with server-side rendering frameworks like Next.js. See our <Link href="/docs/nextjs" className="text-blue-600 dark:text-blue-400 hover:underline">Next.js Integration</Link> guide for details.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">How do I customize the appearance of toasts?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                React Toast Kit provides several ways to customize toasts, from simple options to completely custom components. Check the <Link href="/docs/theming" className="text-blue-600 dark:text-blue-400 hover:underline">Theme Customization</Link> guide.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Is this library accessible?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, accessibility is a core focus of React Toast Kit. Toasts include proper ARIA attributes, support keyboard navigation, and include screen reader announcements. See the <Link href="/docs/accessibility" className="text-blue-600 dark:text-blue-400 hover:underline">Accessibility</Link> documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}