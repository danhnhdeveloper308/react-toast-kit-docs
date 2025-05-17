'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ClientToastProvider } from 'react-toast-kit';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle theme toggle
  useEffect(() => {
    setMounted(true);
    // Check for system preference or saved preference
    const savedTheme = localStorage.getItem('theme') || 'system';
    
    if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Navigation items
  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Documentation', path: '/docs' },
    { title: 'Features', path: '/docs/features' },
    { title: 'Theming', path: '/docs/theming' },
    { title: 'Next.js', path: '/docs/nextjs' },
    { title: 'Accessibility', path: '/docs/accessibility' },
    { title: 'GitHub', path: 'https://github.com/danhnhdeveloper308/react-toast-kit', external: true },
  ];

  return (
    <html lang="en" className={theme}>
      <head>
        <title>React Toast Kit - Modern Toast Notifications for React</title>
        <meta name="description" content="A modern, performant, and theme-aware toast notification library for React applications." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
        <ClientToastProvider>
          <header className="sticky top-0 z-30 w-full border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                      React Toast Kit
                    </span>
                  </Link>
                </div>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer noopener' : undefined}
                      className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                        isActive(item.path) && !item.external
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {item.title}
                      {item.external && (
                        <svg className="inline-block ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </Link>
                  ))}
                </nav>

                {/* Mobile menu button and Theme toggle */}
                <div className="flex items-center">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                    aria-label="Toggle theme"
                  >
                    {theme === 'light' ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </button>
                  
                  <div className="ml-2 md:hidden">
                    <button 
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                      aria-label="Toggle menu"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {menuOpen ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Mobile Navigation */}
              {menuOpen && (
                <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noreferrer noopener' : undefined}
                        className={`px-3 py-2 rounded-md text-base font-medium ${
                          isActive(item.path) && !item.external
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.title}
                        {item.external && (
                          <svg className="inline-block ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        )}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </header>

          <main className="min-h-screen">
            {children}
          </main>

          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">React Toast Kit</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    A modern, performant, and theme-aware toast notification library for React applications.
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <a href="https://github.com/danhnhdeveloper308/react-toast-kit" target="_blank" rel="noreferrer" aria-label="GitHub">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a href="https://www.npmjs.com/package/react-toast-kit" target="_blank" rel="noreferrer" aria-label="NPM">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0v24h24v-24h-24zm6.89 6.89h10.22v10.22h-3.33v-6.89h-3.33v6.89h-3.56v-10.22zm13.78 13.78h-20.45v-20.45h20.45v20.45z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Documentation</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/docs/features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Features</Link>
                    </li>
                    <li>
                      <Link href="/docs/patterns" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Patterns & Best Practices</Link>
                    </li>
                    <li>
                      <Link href="/docs/theming" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Theming</Link>
                    </li>
                    <li>
                      <Link href="/docs/nextjs" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Next.js Integration</Link>
                    </li>
                    <li>
                      <Link href="/docs/accessibility" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Accessibility</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="https://github.com/danhnhdeveloper308/react-toast-kit" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">GitHub Repository</a>
                    </li>
                    <li>
                      <a href="https://www.npmjs.com/package/react-toast-kit" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">NPM Package</a>
                    </li>
                    <li>
                      <a href="https://github.com/danhnhdeveloper308/react-toast-kit/issues" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Report Issues</a>
                    </li>
                    <li>
                      <a href="https://github.com/danhnhdeveloper308/react-toast-kit/blob/main/LICENSE" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">License</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} React Toast Kit. Released under the MIT License.
                </p>
              </div>
            </div>
          </footer>
        </ClientToastProvider>
      </body>
    </html>
  );
}