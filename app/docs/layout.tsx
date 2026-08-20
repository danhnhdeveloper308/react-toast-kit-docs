'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { siteConfig } from '../../lib/site';

const sidebarSections = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Overview', href: '/docs' },
      { label: 'Installation', href: '/docs#installation' },
      { label: 'Quick Start', href: '/docs#quick-start' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { label: 'Features & Options', href: '/docs/features' },
      { label: 'Theming', href: '/docs/theming' },
      { label: 'Next.js Integration', href: '/docs/nextjs' },
      { label: 'Accessibility', href: '/docs/accessibility' },
      { label: 'Patterns', href: '/docs/patterns' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { label: 'toast()', href: '/docs#api-toast' },
      { label: 'ToastProvider', href: '/docs#api-provider' },
      { label: 'useToast', href: '/docs#api-usehook' },
      { label: 'TypeScript Types', href: '/docs#api-types' },
    ],
  },
];

function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <nav className="space-y-7">
      {sidebarSections.map((section) => (
        <div key={section.title}>
          <h5 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5 px-2">
            {section.title}
          </h5>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href.includes('#') && pathname === item.href.split('#')[0]);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Version badge */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 px-2">
        <div className="flex items-center gap-2">
          <span className="badge badge-green">Stable</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">v{siteConfig.version}</span>
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href={siteConfig.npmUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 0v24h24v-24h-24zm6.89 6.89h10.22v10.22h-3.33v-6.89h-3.33v6.89h-3.56v-10.22zm13.78 13.78h-20.45v-20.45h20.45v20.45z" />
            </svg>
            NPM Package
          </a>
        </div>
      </div>
    </nav>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
          Navigation
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="sidebar-overlay"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="sidebar-drawer bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                Documentation
              </span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close navigation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <SidebarContent pathname={pathname} onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </>
      )}

      <div className="flex gap-6 xl:gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/65 dark:bg-slate-900/55 backdrop-blur-xl p-4 shadow-sm">
            <SidebarContent pathname={pathname} />
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 docs-content">{children}</div>
      </div>
    </div>
  );
}
