'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast, ToastPosition } from 'react-toast-kit';

export default function NextJSPage() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState<ToastPosition>('top-right');
  
  // Load markdown content from file
  useEffect(() => {
    async function loadMarkdown() {
      try {
        const response = await fetch('/docs/NEXTJS.md');
        const text = await response.text();
        setMarkdownContent(text);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load markdown:', error);
        setIsLoading(false);
        toast.error({
          title: 'Error',
          description: 'Failed to load documentation content',
          position
        });
      }
    }
    
    loadMarkdown();
  }, [position]);
  
  // Demo function to show toast in Next.js context
  const showNextJSToast = () => {
    toast.success({
      title: 'Next.js Integration',
      description: 'This toast works perfectly in Next.js!',
      position
    });
  };
  
  // Convert markdown to HTML (very simple version)
  const renderMarkdown = (md: string) => {
    // This is a very basic markdown renderer
    // In a real app, use a proper markdown library
    
    const html = md
      // Headers
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 mt-8">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-2 mt-5">$1</h3>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
      // Bold
      .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      // Lists
      .replace(/^\s*-\s*(.*)/gm, '<li class="ml-4">$1</li>')
      // Paragraphs
      .replace(/^(?!<[hla]|\s*$)(.*)/gm, '<p class="mb-4 text-gray-700 dark:text-gray-300">$1</p>');
    
    return { __html: html };
  };

  // Demo showing different Next.js-specific features
  const showAppRouterToast = () => {
    toast.info({
      title: 'App Router Support',
      description: 'Using ClientToastProvider in root layout',
      position
    });
  };
  
  const showPagesRouterToast = () => {
    toast.info({
      title: 'Pages Router Support',
      description: 'Using ToastProvider in _app.js',
      position
    });
  };
  
  const showRSCToast = () => {
    toast({
      title: 'Server Components',
      description: 'Import toast functions only in Client Components',
      variant: 'warning',
      position
    });
  };

  const positions: ToastPosition[] = [
    'top-right',
    'top-center',
    'top-left',
    'bottom-right',
    'bottom-center',
    'bottom-left'
  ];

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
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2">Next.js Integration</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn how to use React Toast Kit with Next.js applications, supporting both the App Router and Pages Router.
          </p>
        </div>
        
        {/* Demo section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
          <h2 className="text-xl font-bold mb-4">Next.js Demos</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Try these examples to see React Toast Kit working with Next.js specific features.
          </p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Toast Position:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {positions.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosition(pos)}
                  className={`px-3 py-2 rounded text-sm transition ${
                    position === pos
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={showNextJSToast}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
            >
              General Next.js Toast
            </button>
            <button
              onClick={showAppRouterToast}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
            >
              App Router
            </button>
            <button
              onClick={showPagesRouterToast}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition"
            >
              Pages Router
            </button>
            <button
              onClick={showRSCToast}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded transition"
            >
              Server Components
            </button>
          </div>
        </div>
        
        {/* Documentation content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div
              className="prose prose-blue max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={renderMarkdown(markdownContent)}
            />
          )}
        </div>
        
        {/* Code examples */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Implementation Examples</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">App Router Setup (layout.js or layout.tsx)</h3>
              <pre className="text-sm overflow-x-auto p-3 rounded bg-gray-100 dark:bg-gray-900">
{`'use client';

import { ClientToastProvider } from 'react-toast-kit';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientToastProvider
          defaultPosition="top-right"
          defaultTheme="system"
        >
          {children}
        </ClientToastProvider>
      </body>
    </html>
  );
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Using in a Client Component</h3>
              <pre className="text-sm overflow-x-auto p-3 rounded bg-gray-100 dark:bg-gray-900">
{`'use client';

import { toast } from 'react-toast-kit';

export default function LoginForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Login logic here
      await loginUser();
      toast.success('Login successful!');
    } catch (error) {
      toast.error({
        title: 'Login Failed',
        description: error.message,
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  );
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Pages Router Setup (_app.js or _app.tsx)</h3>
              <pre className="text-sm overflow-x-auto p-3 rounded bg-gray-100 dark:bg-gray-900">
{`import { ToastProvider } from 'react-toast-kit';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;`}
              </pre>
            </div>
          </div>
        </div>
        
        {/* Additional resources */}
        <div className="text-center mt-12 mb-8">
          <h2 className="text-xl font-bold mb-4">Additional Resources</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://nextjs.org/docs/app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <span>Next.js App Router Docs</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <Link
              href="/docs/patterns"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <span>Usage Patterns</span>
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