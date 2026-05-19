'use client';

import Link from 'next/link';
import { toast } from 'react-toast-kit';
import { useState } from 'react';
import CodeBlock from '../components/CodeBlock';
import ToastDemo from '../components/ToastDemo';

const installCode = `npm install react-toast-kit
# or
pnpm add react-toast-kit
# or
yarn add react-toast-kit`;

const quickStartCode = `import { ToastProvider, toast } from 'react-toast-kit';

// 1. Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

// 2. Call toast() from anywhere
toast.success('Saved successfully!');
toast.error({ title: 'Error', description: 'Something went wrong.' });
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: (data) => \`Got \${data.length} items\`,
  error: (err) => \`Error: \${err.message}\`,
});`;

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'blue',
    title: 'High Performance',
    description: 'Zustand-powered state management with surgical re-renders. Only the component that changed updates.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    color: 'purple',
    title: 'Fully Customizable',
    description: 'Themes, animations, positions, styles, custom components — every pixel is configurable.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    color: 'green',
    title: 'Accessibility First',
    description: 'ARIA roles, live regions, keyboard navigation, and screen reader support built in by default.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'amber',
    title: 'TypeScript Native',
    description: 'Full type safety with auto-complete. Written entirely in TypeScript with exported types for every API.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    color: 'cyan',
    title: 'SSR & Next.js Ready',
    description: 'Works with Next.js 14 App Router, Pages Router, Remix, and any SSR framework out of the box.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    color: 'pink',
    title: 'Plugin System',
    description: 'Extend with custom plugins. Hook into create, update, and dismiss lifecycle events.',
  },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  cyan: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
  pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
};

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<'success' | 'error' | 'warning' | 'info' | 'promise'>('success');

  const demos = {
    success: () => toast.success({ title: 'Saved!', description: 'Your changes have been saved successfully.' }),
    error: () => toast.error({ title: 'Error', description: 'Failed to connect. Please try again.' }),
    warning: () => toast.warning({ title: 'Warning', description: 'Session expires in 5 minutes.' }),
    info: () => toast.info({ title: 'Update available', description: 'Version 2.0 is ready to install.' }),
    promise: () => {
      const p = new Promise<{ count: number }>((res, rej) =>
        setTimeout(() => (Math.random() > 0.3 ? res({ count: 42 }) : rej(new Error('Network timeout'))), 2000)
      );
      toast.promise(p, {
        loading: 'Fetching data...',
        success: (d) => `Loaded ${d.count} records`,
        error: (e: unknown) => `Error: ${e instanceof Error ? e.message : 'Unknown error'}`,
      });
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
            </svg>
            Version 1.0.6 — now available
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Toast notifications
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">done right</span>
          </h1>

          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A performant, accessible, and fully typed toast library for React.
            Six positions, five variants, smooth animations, dark mode — zero configuration.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/danhnhdeveloper308/react-toast-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>

          {/* Quick demo buttons */}
          <div className="mt-12 inline-flex flex-wrap gap-2 justify-center p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            {(Object.keys(demos) as Array<keyof typeof demos>).map((type) => (
              <button
                key={type}
                onClick={() => { setActiveDemo(type); demos[type](); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  activeDemo === type
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">Click to try live</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '~8KB', label: 'Gzipped size' },
              { value: '6', label: 'Toast positions' },
              { value: '5+', label: 'Animation types' },
              { value: '100%', label: 'TypeScript' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Everything you need</h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Built for developers who care about user experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                <div className={`w-10 h-10 rounded-lg ${colorMap[f.color]} flex items-center justify-center mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code example */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Up and running in minutes</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Install, wrap your app with <code className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded text-sm">ToastProvider</code>, and call <code className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded text-sm">toast()</code> from anywhere in your application.
              </p>

              <div className="space-y-3">
                {[
                  'No boilerplate — just import and call',
                  'Works with React 17+, Next.js, Remix, Vite',
                  'Auto-injects CSS — no stylesheet import needed',
                  'Tree-shakeable — only pay for what you use',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/docs" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm hover:gap-3 transition-all">
                  Read the full docs
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Install</p>
                <CodeBlock code={installCode} language="bash" showCopy />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Usage</p>
                <CodeBlock code={quickStartCode} language="tsx" filename="app.tsx" showCopy />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive playground */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Interactive Playground</h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Configure and test every feature live
            </p>
          </div>

          <ToastDemo />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to add great toasts to your app?</h2>
          <p className="mt-4 text-lg text-blue-100">
            Join developers who choose React Toast Kit for its performance, accessibility, and developer experience.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs" className="px-7 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition shadow-md">
              Read the Docs
            </Link>
            <a
              href="https://github.com/danhnhdeveloper308/react-toast-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg border border-blue-400 transition"
            >
              Star on GitHub
            </a>
          </div>
          <div className="mt-8">
            <code className="inline-block bg-blue-800/50 text-blue-100 px-5 py-2.5 rounded-lg text-sm font-mono border border-blue-500/30">
              npm install react-toast-kit
            </code>
          </div>
        </div>
      </section>
    </div>
  );
}
