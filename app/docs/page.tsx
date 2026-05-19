'use client';

import Link from 'next/link';
import { toast } from 'react-toast-kit';
import CodeBlock from '../../components/CodeBlock';

const installCode = `npm install react-toast-kit
# or
pnpm add react-toast-kit`;

const providerCode = `// app/layout.tsx  (Next.js App Router)
import { ToastProvider } from 'react-toast-kit';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider theme="system" position="top-right">
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}`;

const usageCode = `import { toast } from 'react-toast-kit';

// Simple string
toast('Hello world!');

// With options
toast.success({
  title: 'Saved!',
  description: 'Your changes have been saved.',
  duration: 4000,
  position: 'top-right',
  animation: 'slide',
});

// Promise
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: (data) => \`Got \${data.length} items\`,
  error: (err) => \`Error: \${err.message}\`,
});

// Update an existing toast
const id = toast.loading('Processing...');
toast.update(id, { variant: 'success', title: 'Done!' });`;

const providerPropsCode = `<ToastProvider
  theme="system"           // 'light' | 'dark' | 'system'
  position="top-right"    // 6 positions available
  maxToasts={5}
  defaultDuration={4000}
  defaultAnimation="slide"
  defaultDismissible={true}
  defaultPauseOnHover={true}
  enableAccessibleAnnouncements={true}
  topOffset={80}           // account for fixed header
>
  {children}
</ToastProvider>`;

const hooksCode = `import { useToast, useToastConfig, useToastStats } from 'react-toast-kit';

// Full access
const { toasts, theme, setTheme, addToast, removeToast } = useToast();

// Lightweight — theme only
const { theme, setTheme } = useToastConfig();

// Analytics
const { total, byVariant, byPosition } = useToastStats();`;

const guides = [
  { title: 'Features', description: 'All toast types, animations, updates, and advanced patterns with live examples.', href: '/docs/features', icon: '🚀', badge: 'Interactive' },
  { title: 'Theming', description: 'Light, dark, system themes. CSS custom properties, className, and inline styles.', href: '/docs/theming', icon: '🎨' },
  { title: 'Next.js', description: 'App Router & Pages Router setup. SSR safety and best practices for production.', href: '/docs/nextjs', icon: '⚡', badge: 'Popular' },
  { title: 'Accessibility', description: 'ARIA roles, keyboard navigation, screen reader support, and reduced motion.', href: '/docs/accessibility', icon: '♿' },
  { title: 'Patterns', description: 'Form validation, optimistic updates, undo actions, and real-world usage patterns.', href: '/docs/patterns', icon: '📐' },
  { title: 'DevTools', description: 'Built-in developer panel for monitoring, testing, and debugging toasts live. Keyboard shortcut: Alt+Shift+D.', href: '/docs/devtools', icon: '🔧', badge: 'Dev Only' },
];

export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span>Documentation</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Getting Started</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          React Toast Kit is a performant, accessible, and fully typed toast notification library.
          Install in seconds, configure once, call from anywhere.
        </p>
      </div>

      {/* Quick test */}
      <div className="flex flex-wrap gap-2 mb-10 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400 self-center mr-2">Try it now:</span>
        <button onClick={() => toast.success('It works!')} className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition">Success</button>
        <button onClick={() => toast.error('Something failed.')} className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition">Error</button>
        <button onClick={() => toast.warning('Session expiring.')} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm rounded-lg transition">Warning</button>
        <button onClick={() => toast.info('Just an FYI.')} className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition">Info</button>
        <button
          onClick={() => {
            const id = toast.loading('Loading...');
            setTimeout(() => toast.update(id, { variant: 'success', title: 'Complete!', duration: 2500 }), 2000);
          }}
          className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition"
        >
          Loading
        </button>
      </div>

      {/* Installation */}
      <section id="installation" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Installation</h2>
        <CodeBlock code={installCode} language="bash" />
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          CSS is auto-injected at runtime — no stylesheet import required.
        </p>
      </section>

      {/* Quick start */}
      <section id="quick-start" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Start</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Wrap your app once with <code className="code-inline">ToastProvider</code>, then call <code className="code-inline">toast()</code> from any component.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">1. Add the provider</p>
            <CodeBlock code={providerCode} language="tsx" filename="layout.tsx" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">2. Call toast() anywhere</p>
            <CodeBlock code={usageCode} language="tsx" />
          </div>
        </div>
      </section>

      {/* API reference */}
      <section id="api-provider" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ToastProvider Props</h2>
        <CodeBlock code={providerPropsCode} language="tsx" />

        <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Prop</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {[
                ['theme', '"light" | "dark" | "system"', '"system"'],
                ['position', 'ToastPosition', '"top-right"'],
                ['maxToasts', 'number', '5'],
                ['defaultDuration', 'number (ms)', '4000'],
                ['defaultAnimation', 'ToastAnimation', '"slide"'],
                ['defaultDismissible', 'boolean', 'true'],
                ['defaultPauseOnHover', 'boolean', 'true'],
                ['topOffset', 'number', '16'],
                ['bottomOffset', 'number', '16'],
                ['enableAccessibleAnnouncements', 'boolean', 'true'],
              ].map(([prop, type, def]) => (
                <tr key={prop} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-blue-600 dark:text-blue-400 text-xs">{prop}</td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 font-mono text-xs">{type}</td>
                  <td className="px-4 py-2.5 text-gray-500 dark:text-gray-500 font-mono text-xs">{def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Hooks */}
      <section id="api-usehook" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hooks</h2>
        <CodeBlock code={hooksCode} language="tsx" />
      </section>

      {/* Guides */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Explore the Guides</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{g.icon}</span>
                {g.badge && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    {g.badge}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {g.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">FAQ</h2>
        <div className="space-y-4">
          {[
            {
              q: 'Does it work with Next.js App Router?',
              a: 'Yes. Wrap your root layout with ToastProvider and mark it as a client component, or create a separate client wrapper. See the Next.js guide.',
            },
            {
              q: 'Do I need to import a CSS file?',
              a: "No. CSS is automatically injected into the document <head> when the library loads. You can optionally import 'react-toast-kit/styles.css' for SSR edge cases.",
            },
            {
              q: 'Can I use custom components inside toasts?',
              a: 'Yes. Use toast.custom(<YourComponent />) to render any JSX inside the toast container with full styling control.',
            },
            {
              q: 'Is it accessible?',
              a: 'Yes. Toasts include ARIA roles (status / alert), aria-live regions, keyboard navigation, and respect prefers-reduced-motion.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1.5">{q}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .code-inline {
          background: rgb(239 246 255 / 1);
          color: rgb(37 99 235 / 1);
          padding: 0.1rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-family: ui-monospace, monospace;
        }
        :global(.dark) .code-inline {
          background: rgb(30 58 138 / 0.2);
          color: rgb(147 197 253 / 1);
        }
      `}</style>
    </div>
  );
}
