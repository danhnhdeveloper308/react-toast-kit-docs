'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toast-kit';
import CodeBlock from '../../../components/CodeBlock';

const appRouterLayoutCode = `// app/layout.tsx
'use client'; // Required when using hooks inside the layout

import { ToastProvider } from 'react-toast-kit';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

const serverSafeLayoutCode = `// app/layout.tsx  (Server Component — recommended pattern)
import type { Metadata } from 'next';
import './globals.css';
import ToastWrapper from './ToastWrapper'; // client component

export const metadata: Metadata = { title: 'My App' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastWrapper>{children}</ToastWrapper>
      </body>
    </html>
  );
}

// app/ToastWrapper.tsx
'use client';
import { ToastProvider } from 'react-toast-kit';

export default function ToastWrapper({ children }: { children: React.ReactNode }) {
  return <ToastProvider theme="system">{children}</ToastProvider>;
}`;

const pagesRouterCode = `// pages/_app.tsx  (Pages Router)
import type { AppProps } from 'next/app';
import { ToastProvider } from 'react-toast-kit';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider theme="system" position="top-right">
      <Component {...pageProps} />
    </ToastProvider>
  );
}`;

const clientComponentCode = `'use client'; // Required — toast() cannot be called in Server Components

import { toast } from 'react-toast-kit';

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      await signIn(credentials);
      toast.success({ title: 'Welcome back!', description: 'You are now signed in.' });
    } catch (err) {
      toast.error({ title: 'Login failed', description: err.message });
    }
  };

  return <button onClick={handleLogin}>Sign in</button>;
}`;

const serverActionCode = `// app/actions.ts  (Server Action)
'use server';

export async function saveData(formData: FormData) {
  await db.save(formData);
  // ✗ Cannot call toast() here — Server Action runs on the server
  return { success: true };
}

// app/SaveForm.tsx  (Client Component)
'use client';
import { toast } from 'react-toast-kit';
import { saveData } from './actions';

export default function SaveForm() {
  const handleSubmit = async (formData: FormData) => {
    const result = await saveData(formData);
    if (result.success) {
      toast.success('Saved!'); // ✓ Called in client component
    }
  };

  return <form action={handleSubmit}>...</form>;
}`;

const offsetCode = `// Account for a fixed 64px header
<ToastProvider topOffset={80}>
  {children}
</ToastProvider>`;

export default function NextJSPage() {
  const [position, setPosition] = useState<'top-right' | 'top-center' | 'bottom-right'>(
    'top-right'
  );

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
        <span>Next.js</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Next.js Integration</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
        React Toast Kit works with both the Next.js App Router and Pages Router. Below are setup
        guides, patterns, and things to avoid.
      </p>

      {/* Live demo */}
      <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 mb-10">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Live Demo</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          This page runs inside a Next.js App Router app — try it:
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              toast.success({
                title: 'Next.js works!',
                description: 'App Router integration confirmed.',
                position,
              })
            }
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
          >
            App Router toast
          </button>
          <button
            onClick={() =>
              toast.info({
                title: 'Client component',
                description: "toast() must be called in 'use client' components.",
                position,
              })
            }
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition"
          >
            Client Component
          </button>
          <button
            onClick={() =>
              toast.warning({
                title: 'Server Components',
                description: 'Cannot import toast() in RSC — use client components.',
                position,
              })
            }
            className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded-lg transition"
          >
            RSC note
          </button>
        </div>
      </div>

      {/* App Router */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">App Router Setup</h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The simplest approach: add <code className="code-inline">&apos;use client&apos;</code> to
          your root layout and wrap the body with <code className="code-inline">ToastProvider</code>
          .
        </p>
        <CodeBlock code={appRouterLayoutCode} language="tsx" filename="app/layout.tsx" />

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Recommended:</strong> To preserve Server Component benefits on the root layout,
            extract <code className="code-inline">ToastProvider</code> into a separate client
            wrapper component.
          </p>
        </div>

        <div className="mt-4">
          <CodeBlock code={serverSafeLayoutCode} language="tsx" filename="app/layout.tsx" />
        </div>
      </section>

      {/* Pages Router */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Pages Router Setup
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Add <code className="code-inline">ToastProvider</code> to your{' '}
          <code className="code-inline">_app.tsx</code> file:
        </p>
        <CodeBlock code={pagesRouterCode} language="tsx" filename="pages/_app.tsx" />
      </section>

      {/* Client components */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Using in Client Components
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          <code className="code-inline">toast()</code> calls the Zustand store — it only runs in the
          browser. Always import and call it inside{' '}
          <code className="code-inline">&apos;use client&apos;</code> components.
        </p>
        <CodeBlock code={clientComponentCode} language="tsx" filename="LoginButton.tsx" />
      </section>

      {/* Server Actions */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Server Actions Pattern
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Server Actions run on the server — you cannot call{' '}
          <code className="code-inline">toast()</code> inside them. Instead, return the result to
          the client and toast from there.
        </p>
        <CodeBlock code={serverActionCode} language="tsx" />
      </section>

      {/* Header offset */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Fixed Header Offset
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          If your app has a fixed header, use <code className="code-inline">topOffset</code> to push
          toasts below it:
        </p>
        <CodeBlock code={offsetCode} language="tsx" />
      </section>

      {/* Checklist */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Integration Checklist
        </h2>
        <div className="space-y-2">
          {[
            ['ToastProvider is mounted once at the app root', true],
            ['toast() is only called inside client components', true],
            ['CSS is auto-injected — no import needed', true],
            ['ToastProvider receives topOffset if you have a fixed navbar', null],
            ['Accessibility announcements enabled for important alerts', null],
          ].map(([item, done]) => (
            <div
              key={item as string}
              className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${done ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}
              >
                {done ? (
                  <svg
                    className="w-3 h-3 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                )}
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{item as string}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/docs/theming"
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
          Theming
        </Link>
        <Link
          href="/docs/accessibility"
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Accessibility
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
