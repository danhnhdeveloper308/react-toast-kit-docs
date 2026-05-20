'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ToastProvider } from 'react-toast-kit';

const navItems = [
  { title: 'Home', path: '/' },
  { title: 'Docs', path: '/docs' },
  { title: 'Features', path: '/docs/features' },
  { title: 'DevTools', path: '/docs/devtools' },
  { title: 'Next.js', path: '/docs/nextjs' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'system';
    const isDark =
      saved === 'dark' ||
      (saved === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <ToastProvider theme="system" position="top-right">
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-200">

        {/* ─── Header ─────────────────────────────────────────────────── */}
        <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm'
            : 'border-b border-transparent bg-white/80 dark:bg-transparent backdrop-blur-sm'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-4">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
                  <svg className="w-4.5 h-4.5 text-white" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[15px] font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-transparent bg-clip-text tracking-tight">
                    React Toast Kit
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wider">v1.0.8</span>
                </div>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-0.5">
                {navItems.map((item) => {
                  const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {active && (
                        <span className="absolute inset-0 rounded-lg bg-blue-50 dark:bg-blue-900/25" />
                      )}
                      <span className="relative">{item.title}</span>
                      {item.title === 'DevTools' && (
                        <span className="relative ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 leading-none">
                          DEV
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-1.5">
                {/* GitHub */}
                <a
                  href="https://github.com/danhnhdeveloper308/react-toast-kit"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                {/* npm */}
                <a
                  href="https://www.npmjs.com/package/react-toast-kit"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors border border-red-100 dark:border-red-900/30"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 0v24h24v-24h-24zm6.89 6.89h10.22v10.22h-3.33v-6.89h-3.33v6.89h-3.56v-10.22zm13.78 13.78h-20.45v-20.45h20.45v20.45z" />
                  </svg>
                  npm
                </a>

                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle menu"
                  aria-expanded={menuOpen}
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Mobile nav dropdown */}
          {menuOpen && (
            <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
              <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-0.5">
                {navItems.map((item) => {
                  const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {item.title}
                      {item.title === 'DevTools' && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300">
                          DEV
                        </span>
                      )}
                    </Link>
                  );
                })}
                <div className="flex items-center gap-3 px-3 pt-3 pb-1 border-t border-slate-100 dark:border-slate-800 mt-1">
                  <a href="https://github.com/danhnhdeveloper308/react-toast-kit" target="_blank" rel="noreferrer" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a href="https://www.npmjs.com/package/react-toast-kit" target="_blank" rel="noreferrer" className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-500">
                    npm
                  </a>
                </div>
              </nav>
            </div>
          )}
        </header>

        {/* ─── Main ───────────────────────────────────────────────────── */}
        <main className="flex-1">{children}</main>

        {/* ─── Footer ─────────────────────────────────────────────────── */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-14 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">React Toast Kit</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  A modern, performant, and accessible toast notification library for React applications.
                </p>
                <div className="flex gap-3 mt-4">
                  <a href="https://github.com/danhnhdeveloper308/react-toast-kit" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href="https://www.npmjs.com/package/react-toast-kit" target="_blank" rel="noreferrer" aria-label="npm" className="text-slate-400 hover:text-red-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M0 0v24h24v-24h-24zm6.89 6.89h10.22v10.22h-3.33v-6.89h-3.33v6.89h-3.56v-10.22zm13.78 13.78h-20.45v-20.45h20.45v20.45z"/></svg>
                  </a>
                </div>
              </div>

              {/* Docs links */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">Documentation</h3>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Getting Started', href: '/docs' },
                    { label: 'Features & Options', href: '/docs/features' },
                    { label: 'Theming', href: '/docs/theming' },
                    { label: 'Next.js Integration', href: '/docs/nextjs' },
                    { label: 'Accessibility', href: '/docs/accessibility' },
                    { label: 'Patterns', href: '/docs/patterns' },
                    { label: 'DevTools', href: '/docs/devtools' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">Resources</h3>
                <ul className="space-y-2.5">
                  {[
                    { label: 'GitHub Repository', href: 'https://github.com/danhnhdeveloper308/react-toast-kit' },
                    { label: 'NPM Package', href: 'https://www.npmjs.com/package/react-toast-kit' },
                    { label: 'Report Issues', href: 'https://github.com/danhnhdeveloper308/react-toast-kit/issues' },
                    { label: 'Changelog', href: 'https://github.com/danhnhdeveloper308/react-toast-kit/releases' },
                    { label: 'MIT License', href: 'https://github.com/danhnhdeveloper308/react-toast-kit/blob/main/LICENSE' },
                  ].map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noreferrer" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                &copy; {new Date().getFullYear()} React Toast Kit. Released under the MIT License.
              </p>
              <div className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
                <span>Built with</span>
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>Next.js &amp; Tailwind CSS</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}
