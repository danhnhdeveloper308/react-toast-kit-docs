'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { toast } from 'react-toast-kit';
import CodeBlock from '../../../components/CodeBlock';

const DevToolsEmbed = dynamic(() => import('../../../components/DevToolsEmbed'), { ssr: false });

const setupCode = `// app/layout.tsx — Next.js App Router
'use client';
import { ToastProvider } from 'react-toast-kit';
import { ToastDevTools } from 'react-toast-kit/devtools';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
          {/* DevTools auto-hides in production */}
          <ToastDevTools />
        </ToastProvider>
      </body>
    </html>
  );
}`;

const conditionalCode = `// Only mount DevTools in development — explicit guard
import { ToastDevTools } from 'react-toast-kit/devtools';

export default function RootLayout({ children }) {
  return (
    <ToastProvider>
      {children}
      {process.env.NODE_ENV === 'development' && <ToastDevTools />}
    </ToastProvider>
  );
}`;

const imperativeCode = `import { toastDevTools } from 'react-toast-kit';

// Open the panel programmatically
toastDevTools.show();

// Hide the panel
toastDevTools.hide();

// Toggle open/closed
toastDevTools.toggle();

// Access the current toast list (useful in tests)
const toasts = toastDevTools.getToasts();

// Debug helpers (development only)
toastDevTools.debugInfo();          // console.group with full state
toastDevTools.simulateError();      // fire a test error toast
toastDevTools.simulateSuccess();    // fire a test success toast
const store = toastDevTools.getStore(); // raw Zustand state`;

const stressTestCode = `import { toast } from 'react-toast-kit';

// Stress-test the queue with mixed variants
function stressTest() {
  const variants = ['success', 'error', 'warning', 'info'] as const;
  const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      toast({
        title: \`Stress test #\${i + 1}\`,
        description: 'Testing multiple toasts at once',
        variant: variants[i % variants.length],
        position: positions[i % positions.length],
        duration: 2000,
      });
    }, i * 200);
  }
}`;

const promiseTestCode = `import { toast } from 'react-toast-kit';

// Test promise flow (50% fail rate)
function testPromise() {
  const promise = new Promise((resolve, reject) =>
    setTimeout(
      () => Math.random() > 0.5 ? resolve('Done!') : reject('Failed!'),
      2000
    )
  );

  toast.promise(promise, {
    loading: 'Processing request...',
    success: (msg) => ({ title: 'Success', description: String(msg) }),
    error: (err) => ({ title: 'Failed', description: String(err) }),
  });
}`;

const pluginCode = `import { registerPlugin } from 'react-toast-kit';

// Example plugin visible in DevTools → Settings → Plugins
registerPlugin({
  name: 'analytics',
  description: 'Tracks toast impressions for analytics',
  afterCreate: (toast) => {
    console.log('[Analytics] Toast shown:', toast.variant, toast.title);
  },
  afterRemove: (toast) => {
    console.log('[Analytics] Toast dismissed:', toast.id);
  },
});`;

interface Section {
  id: string;
  label: string;
}

const toc: Section[] = [
  { id: 'overview',   label: 'Overview' },
  { id: 'setup',      label: 'Setup' },
  { id: 'open',       label: 'Opening DevTools' },
  { id: 'playground', label: 'Live Playground' },
  { id: 'monitor',    label: 'Monitor Tab' },
  { id: 'create',     label: 'Create Tab' },
  { id: 'settings',   label: 'Settings Tab' },
  { id: 'shortcuts',  label: 'Keyboard Shortcuts' },
  { id: 'imperative', label: 'Imperative API' },
  { id: 'production', label: 'Production Safety' },
  { id: 'patterns',   label: 'Advanced Patterns' },
];

export default function DevToolsPage() {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/docs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Docs</Link>
        <span>/</span>
        <span className="text-slate-700 dark:text-slate-200">DevTools</span>
      </div>

      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">DevTools</h1>
          <span className="badge badge-violet">Dev Only</span>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          A built-in developer panel for monitoring, testing, and debugging toast notifications in real time.
          Automatically excluded from production builds.
        </p>

        {/* Quick links */}
        <div className="mt-5 flex flex-wrap gap-2">
          {toc.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* ─── Overview ────────────────────────────────────────────────── */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Overview</h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          React Toast Kit ships with <code className="code-inline">ToastDevTools</code> — a floating panel
          that gives you full visibility into the toast system during development. It reads directly from
          the Zustand store, so the state you see is always the ground truth.
        </p>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: '📊', title: 'Live Monitor', desc: 'See all active toasts with variant, position, duration, animation, and pause state in real time.' },
            { icon: '⚡', title: 'Quick Tests', desc: 'One-click buttons for success, error, warning, info, loading, custom, promise, and stress tests.' },
            { icon: '🔧', title: 'Toast Builder', desc: 'Build any toast configuration with a form — variant, position, animation, style, duration — and fire it instantly.' },
            { icon: '⚙️', title: 'Global Settings', desc: 'Change theme, max toasts, and view registered plugins without touching your source code.' },
            { icon: '🔑', title: 'Keyboard Shortcut', desc: 'Alt+Shift+D toggles the panel from any screen in your app, no button click needed.' },
            { icon: '🛡️', title: 'Zero Production Impact', desc: 'The panel returns null in production. The component weighs nothing when not rendered.' },
          ].map((f) => (
            <div key={f.title} className="flex gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
              <span className="text-2xl flex-shrink-0 leading-none mt-0.5">{f.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Setup ───────────────────────────────────────────────────── */}
      <section id="setup" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Setup</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-5">
          Import <code className="code-inline">ToastDevTools</code> from{' '}
          <code className="code-inline">react-toast-kit/devtools</code> and place it anywhere inside{' '}
          <code className="code-inline">ToastProvider</code>. The panel must be a child of{' '}
          <code className="code-inline">ToastProvider</code> to access the shared Zustand store.
        </p>

        <CodeBlock code={setupCode} language="tsx" filename="app/layout.tsx" showCopy />

        <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
          <div className="flex items-start gap-2.5">
            <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠️</span>
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Next.js App Router:</strong> Layouts that contain client hooks must be marked{' '}
              <code className="code-inline">'use client'</code>. If your root layout is a server component,
              create a separate <code className="code-inline">ClientProviders</code> wrapper and import it there.
            </div>
          </div>
        </div>
      </section>

      {/* ─── Opening ─────────────────────────────────────────────────── */}
      <section id="open" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Opening DevTools</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-5">
          Three ways to open the DevTools panel:
        </p>

        <div className="space-y-3">
          {[
            {
              step: '1',
              title: 'Floating button',
              desc: 'A gradient button appears in the bottom-right corner of every page. Click it to open the panel.',
              badge: 'Default',
              badgeColor: 'badge-blue',
            },
            {
              step: '2',
              title: 'Keyboard shortcut',
              desc: 'Press Alt + Shift + D from anywhere in your app. This works even when the button is hidden.',
              badge: 'Recommended',
              badgeColor: 'badge-green',
            },
            {
              step: '3',
              title: 'Imperative API',
              desc: 'Call toastDevTools.show() or toastDevTools.toggle() from your own code (e.g. dev toolbar, console).',
              badge: 'Programmatic',
              badgeColor: 'badge-violet',
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="step-number flex-shrink-0">{item.step}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">{item.title}</span>
                  <span className={`badge ${item.badgeColor}`}>{item.badge}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Live demo */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Try it now — fire a toast and watch it appear in DevTools:</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => toast.success({ title: 'Success', description: 'Watch me in DevTools!' })} className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition">Success</button>
            <button onClick={() => toast.error({ title: 'Error', description: 'Something failed.' })} className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition">Error</button>
            <button onClick={() => toast.loading({ title: 'Loading', description: 'Long running task...' })} className="px-3 py-1.5 bg-slate-500 hover:bg-slate-600 text-white text-sm rounded-lg transition">Loading</button>
            <button
              onClick={() => {
                const p = new Promise<string>((res, rej) => setTimeout(() => Math.random() > 0.4 ? res('Done!') : rej('Failed!'), 2000));
                toast.promise(p, { loading: 'Running...', success: (d) => d, error: (e) => String(e) });
              }}
              className="px-3 py-1.5 bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-lg transition"
            >
              Promise
            </button>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Then press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[11px]">Alt+Shift+D</kbd> to open DevTools</p>
        </div>
      </section>

      {/* ─── Live Playground ─────────────────────────────────────────── */}
      <section id="playground" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Live Playground</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-5">
          The embedded DevTools panel below is connected to the real toast store on this page.
          Fire toasts, inspect their state, and tweak settings — exactly as you would in your own app.
        </p>
        <DevToolsEmbed />
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
          Toasts fired here appear on this page. The panel reads directly from the Zustand store — no mocking.
        </p>
      </section>

      {/* ─── Monitor Tab ─────────────────────────────────────────────── */}
      <section id="monitor" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Monitor Tab</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-5">
          The default tab. Shows real-time statistics and a list of every active toast.
        </p>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Stats Overview</span>
            </div>
            <div className="p-4 grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Total active', desc: 'Number of toasts currently visible on screen.' },
                { label: 'Paused', desc: 'Toasts with their countdown timer stopped (hover or programmatic).' },
              ].map((row) => (
                <div key={row.label} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                  <div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{row.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{row.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quick Tests</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">Eight one-click test buttons inside the panel:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Success', 'Error', 'Warning', 'Info', 'Loading', 'Custom', 'Promise', 'Stress'].map((b) => (
                  <div key={b} className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-xs text-center text-slate-600 dark:text-slate-300 font-medium">
                    {b}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                <strong>Stress test</strong> fires 5 toasts in rapid succession across 4 positions to verify queue behavior.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Toasts List</span>
            </div>
            <div className="p-4 space-y-2">
              {[
                { label: 'Variant badge', desc: 'Color-coded chip showing success / error / warning / info / loading / custom.' },
                { label: '⏸ Pause / ▶ Resume', desc: 'Toggle the countdown timer for a specific toast without hovering over it.' },
                { label: '❌ Dismiss', desc: 'Remove a toast instantly. Triggers its onDismiss callback.' },
                { label: 'Metadata row', desc: 'Shows position, animation type, and remaining duration in milliseconds.' },
                { label: 'Clear All', desc: 'Header button that calls toast.clearAll() immediately.' },
              ].map((row) => (
                <div key={row.label} className="flex gap-3">
                  <code className="text-xs font-mono text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5 min-w-[120px]">{row.label}</code>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{row.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Create Tab ──────────────────────────────────────────────── */}
      <section id="create" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Create Tab</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-5">
          A form-based toast builder. Configure every option and fire the toast with one click.
        </p>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="prose-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Options</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Title', 'Free text', 'Optional — falls back to description only'],
                ['Description', 'Free text', 'Supports multi-line via textarea'],
                ['Variant', 'default / success / error / warning / info / loading', 'Controls icon and color scheme'],
                ['Position', '6 positions', 'top-left, top-center, top-right, bottom-*'],
                ['Animation', 'slide / fade / bounce / flip / zoom / elastic / none', 'Elastic uses a spring overshoot'],
                ['Visual Style', 'solid / minimal / outlined / glass / gradient / shimmer / neon / pill / retro / confetti', 'Applies CSS data-style attribute'],
                ['Duration (ms)', 'Number input', 'Set 0 for persistent (no auto-dismiss)'],
              ].map(([field, opts, notes]) => (
                <tr key={field}>
                  <td className="font-mono text-xs text-slate-700 dark:text-slate-300 font-medium">{field}</td>
                  <td className="text-xs text-slate-600 dark:text-slate-400">{opts}</td>
                  <td className="text-xs text-slate-500 dark:text-slate-500">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Settings Tab ────────────────────────────────────────────── */}
      <section id="settings" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Settings Tab</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-5">
          Modify global store configuration live — changes propagate instantly to all toasts.
        </p>

        <div className="space-y-3">
          {[
            {
              label: 'Theme',
              desc: 'Switch between light, dark, and system. Instantly re-themes every active toast without a page reload.',
              badge: 'Live',
            },
            {
              label: 'Max Toasts',
              desc: 'Change the maximum concurrent toasts (1–10). The queue respects priority order when trimming.',
              badge: 'Live',
            },
            {
              label: 'Keyboard Shortcuts',
              desc: 'Reference section showing Alt+Shift+D shortcut. Non-configurable, always active in development.',
              badge: 'Info',
            },
            {
              label: 'Plugin Registry',
              desc: 'Lists all plugins registered via registerPlugin(). Shows plugin name and description. Empty state shown when none are registered.',
              badge: 'Read-only',
            },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">{item.label}</span>
                  <span className={`badge ${item.badge === 'Live' ? 'badge-green' : item.badge === 'Info' ? 'badge-blue' : 'badge-amber'}`}>
                    {item.badge}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <CodeBlock code={pluginCode} language="tsx" filename="plugins/analytics.ts" showCopy />
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Registered plugins appear in DevTools → Settings → Plugin Info with their name and description.
          </p>
        </div>
      </section>

      {/* ─── Keyboard Shortcuts ──────────────────────────────────────── */}
      <section id="shortcuts" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Keyboard Shortcuts</h2>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="prose-table">
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Action</th>
                <th>Context</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  <span key="k1" className="flex items-center gap-1">
                    <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-mono text-xs border border-slate-300 dark:border-slate-600">Alt</kbd>
                    <span className="text-slate-400">+</span>
                    <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-mono text-xs border border-slate-300 dark:border-slate-600">Shift</kbd>
                    <span className="text-slate-400">+</span>
                    <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-mono text-xs border border-slate-300 dark:border-slate-600">D</kbd>
                  </span>,
                  'Toggle DevTools panel open/closed',
                  'Global — works anywhere in the app'
                ],
              ].map((row, i) => (
                <tr key={i}>
                  <td>{row[0]}</td>
                  <td className="text-sm text-slate-600 dark:text-slate-300">{row[1]}</td>
                  <td className="text-xs text-slate-500 dark:text-slate-400">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Tip:</strong> The keyboard shortcut is registered globally via{' '}
            <code className="code-inline">window.addEventListener('keydown', ...)</code> and works
            inside modals, drawers, and iframes. It does not interfere with browser shortcuts.
          </p>
        </div>
      </section>

      {/* ─── Imperative API ──────────────────────────────────────────── */}
      <section id="imperative" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Imperative API</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-5">
          <code className="code-inline">toastDevTools</code> exposes a programmatic interface for
          controlling the panel and accessing store state from outside of React — useful in e2e tests,
          dev toolbars, or the browser console.
        </p>

        <CodeBlock code={imperativeCode} language="tsx" showCopy />

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Development-only methods</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <code className="code-inline">debugInfo()</code>, <code className="code-inline">simulateError()</code>,{' '}
            <code className="code-inline">simulateSuccess()</code>, and{' '}
            <code className="code-inline">getStore()</code> are only available when{' '}
            <code className="code-inline">NODE_ENV === 'development'</code>. They are tree-shaken in
            production bundles.
          </p>
        </div>
      </section>

      {/* ─── Production Safety ───────────────────────────────────────── */}
      <section id="production" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Production Safety</h2>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-green-50 dark:bg-green-900/15 border border-green-200 dark:border-green-800/40">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Auto-excluded in production</h3>
                <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
                  <code className="code-inline">ToastDevTools</code> checks{' '}
                  <code className="code-inline">process.env.NODE_ENV</code> and returns{' '}
                  <code className="code-inline">null</code> before rendering anything when not in development.
                  No DOM nodes, no event listeners, no bundle cost in production.
                </p>
              </div>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            If you want an explicit guard for extra safety, use the conditional pattern:
          </p>

          <CodeBlock code={conditionalCode} language="tsx" showCopy />
        </div>
      </section>

      {/* ─── Advanced Patterns ───────────────────────────────────────── */}
      <section id="patterns" className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Advanced Patterns</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Stress testing the queue</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Use the built-in Stress quick test or write your own to verify how the library handles
              rapid bursts of toasts, priority ordering, and queue trimming.
            </p>
            <CodeBlock code={stressTestCode} language="tsx" showCopy />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Testing promise flows</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              The promise quick test uses a 50% random failure rate. Use the Create tab or write your
              own to test specific error messages, loading durations, and success payloads.
            </p>
            <CodeBlock code={promiseTestCode} language="tsx" showCopy />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Inspecting toast state in Playwright / Cypress</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Access the Zustand store from your test runner by calling <code className="code-inline">toastDevTools.getToasts()</code> via page.evaluate:
            </p>
            <CodeBlock
              code={`// playwright
const toasts = await page.evaluate(() => {
  // toastDevTools is globally exported
  return window.__REACT_TOAST_KIT_DEVTOOLS__?.getToasts() ?? [];
});
expect(toasts).toHaveLength(1);
expect(toasts[0].variant).toBe('success');`}
              language="tsx"
              showCopy
            />
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex items-center justify-between">
        <Link href="/docs/patterns" className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Patterns
        </Link>
        <Link href="/docs" className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
          Back to Docs
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
