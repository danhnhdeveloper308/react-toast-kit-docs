'use client';

import { useState } from 'react';
import { toast, useToast } from 'react-toast-kit';
import type { ToastPosition, ToastAnimation, ToastStyle } from 'react-toast-kit';

type TabId = 'variants' | 'styles' | 'advanced' | 'config';

const positions: ToastPosition[] = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right',
];

const animations: ToastAnimation[] = ['slide', 'fade', 'bounce', 'flip', 'zoom', 'elastic', 'none'];

const visualStyles: { style: ToastStyle; label: string; emoji: string }[] = [
  { style: 'solid',    label: 'Solid',    emoji: '■' },
  { style: 'minimal',  label: 'Minimal',  emoji: '▏' },
  { style: 'outlined', label: 'Outlined', emoji: '□' },
  { style: 'gradient', label: 'Gradient', emoji: '◈' },
  { style: 'glass',    label: 'Glass',    emoji: '◻' },
  { style: 'shimmer',  label: 'Shimmer',  emoji: '✦' },
  { style: 'neon',     label: 'Neon',     emoji: '◉' },
  { style: 'pill',     label: 'Pill',     emoji: '⬭' },
  { style: 'retro',    label: 'Retro',    emoji: '▣' },
];

export default function ToastDemo() {
  const { theme, setTheme } = useToast();
  const [tab, setTab] = useState<TabId>('variants');
  const [position, setPosition] = useState<ToastPosition>('top-right');
  const [duration, setDuration] = useState(4000);
  const [animation, setAnimation] = useState<ToastAnimation>('slide');
  const [visualStyle, setVisualStyle] = useState<ToastStyle>('solid');
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [dismissible, setDismissible] = useState(true);

  // --- Helpers ---
  const opts = () => ({ position, duration, animation, pauseOnHover, dismissible });

  // --- Variant demos ---
  const showBasic = () => toast({ title: 'Default Toast', description: 'A basic toast notification.', ...opts() });
  const showSuccess = () => toast.success({ title: 'Success!', description: 'Operation completed successfully.', ...opts() });
  const showError = () => toast.error({ title: 'Error', description: 'Something went wrong. Please try again.', ...opts() });
  const showWarning = () => toast.warning({ title: 'Warning', description: 'Your session expires in 5 minutes.', ...opts() });
  const showInfo = () => toast.info({ title: 'Info', description: 'A new version is available.', ...opts() });
  const showLoading = () => {
    const id = toast.loading({ title: 'Loading', description: 'Processing your request...', position });
    setTimeout(() => {
      toast.update(id, { variant: 'success', title: 'Done!', description: 'Request completed.', duration: 2500 });
    }, 2500);
  };

  // --- Advanced demos ---
  const showCustom = () =>
    toast.custom(
      <div className="px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg text-white shadow-lg">
        <div className="flex items-start gap-3">
          <div className="text-xl mt-0.5">🚀</div>
          <div>
            <p className="font-semibold text-sm">Custom Component</p>
            <p className="text-xs text-white/80 mt-0.5">Fully custom JSX rendered inside the toast.</p>
            <div className="flex gap-2 mt-2">
              <button
                className="text-xs bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded transition"
                onClick={() => toast.success('Action executed!')}
              >
                Do it
              </button>
              <button
                className="text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded transition"
                onClick={() => toast.dismiss()}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>,
      { position, duration: 0, dismissible }
    );

  const showPromise = () => {
    const p = new Promise<{ records: number }>((res, rej) =>
      setTimeout(
        () => (Math.random() > 0.3 ? res({ records: 42 }) : rej(new Error('Network timeout'))),
        2000
      )
    );
    toast.promise(p, {
      loading: { title: 'Fetching data', description: 'Please wait...', position },
      success: (d) => ({ title: 'Loaded!', description: `Got ${d.records} records.`, position }),
      error: (e: unknown) => ({ title: 'Failed', description: e instanceof Error ? e.message : 'Something went wrong', position }),
    });
  };

  const showUpdate = () => {
    const id = toast.info({ title: 'Downloading', description: 'Starting...', position, duration: 0 });
    const steps = ['25% complete', '50% complete', '75% complete'];
    steps.forEach((step, i) => {
      setTimeout(() => toast.update(id, { description: step }), (i + 1) * 1200);
    });
    setTimeout(() => {
      toast.update(id, { variant: 'success', title: 'Download complete', description: 'File saved!', duration: 2000 });
    }, steps.length * 1200 + 1200);
  };

  const showMultiple = () => {
    ['info', 'success', 'warning', 'error'].forEach((v, i) => {
      setTimeout(() => {
        (toast as any)[v]({ title: `${v.charAt(0).toUpperCase() + v.slice(1)}`, description: `Toast #${i + 1}`, position });
      }, i * 400);
    });
  };

  const showAllAnimations = () => {
    const corners: ToastPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    animations.forEach((anim, i) => {
      setTimeout(() => {
        toast.info({
          title: `"${anim}" animation`,
          description: 'Try each corner position.',
          animation: anim,
          position: corners[i % corners.length],
          duration: 3500,
        });
      }, i * 600);
    });
  };

  // --- Actions demo ---
  const showActions = () =>
    toast.info({
      title: 'Delete file?',
      description: 'This action cannot be undone.',
      position,
      duration: 0,
      actions: [
        { label: 'Delete', variant: 'danger', onClick: () => toast.error({ title: 'Deleted', description: 'File removed.' }) },
        { label: 'Cancel', variant: 'secondary', onClick: () => {}, closeOnClick: true },
      ],
    });

  const showActionsSuccess = () =>
    toast.success({
      title: 'File uploaded',
      description: 'Your file is ready to share.',
      position,
      duration: 6000,
      actions: [
        { label: 'View', onClick: () => toast.info({ title: 'Navigating…' }) },
        { label: 'Copy link', variant: 'secondary', onClick: () => toast.success({ title: 'Link copied!' }), closeOnClick: false },
      ],
    });

  // --- Config tab ---
  const showConfigured = () =>
    toast.success({ title: 'Custom config', description: 'Using your settings above.', ...opts(), visualStyle });

  const tabs: { id: TabId; label: string }[] = [
    { id: 'variants', label: 'Variants' },
    { id: 'styles',   label: 'Styles' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'config',   label: 'Config' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === t.id
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Variants tab */}
      {tab === 'variants' && (
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Basic Variants</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button onClick={showBasic} className="btn-demo bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">Default</button>
              <button onClick={showSuccess} className="btn-demo bg-green-500 hover:bg-green-600 text-white">Success</button>
              <button onClick={showError} className="btn-demo bg-red-500 hover:bg-red-600 text-white">Error</button>
              <button onClick={showWarning} className="btn-demo bg-amber-500 hover:bg-amber-600 text-white">Warning</button>
              <button onClick={showInfo} className="btn-demo bg-blue-500 hover:bg-blue-600 text-white">Info</button>
              <button onClick={showLoading} className="btn-demo bg-gray-500 hover:bg-gray-600 text-white">Loading → Done</button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Position</h4>
            <div className="grid grid-cols-3 gap-1.5">
              {positions.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    toast.info({ title: p, description: 'Positioned here.', position: p, duration: 2500 });
                  }}
                  className="py-1.5 px-2 rounded text-xs font-medium border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 text-gray-600 dark:text-gray-400 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Theme</h4>
            <div className="flex gap-2">
              {(['light', 'dark', 'system'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTheme(t); toast.info({ title: `${t.charAt(0).toUpperCase() + t.slice(1)} theme`, description: 'Toast theme updated.' }); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    theme === t
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Styles tab */}
      {tab === 'styles' && (
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Visual Styles</h4>
            <div className="grid grid-cols-3 gap-2">
              {visualStyles.map(({ style, label, emoji }) => (
                <button
                  key={style}
                  onClick={() =>
                    toast.success({
                      title: label,
                      description: `"${style}" style applied.`,
                      position,
                      duration: 3500,
                      visualStyle: style,
                    })
                  }
                  className="btn-demo bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 text-left flex items-center gap-2"
                >
                  <span className="text-base opacity-70">{emoji}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Action Buttons</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={showActions} className="btn-demo bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                Confirm / Cancel
              </button>
              <button onClick={showActionsSuccess} className="btn-demo bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
                View / Copy link
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">Action buttons call custom handlers and optionally close the toast.</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">All Animations</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {animations.map((anim) => (
                <button
                  key={anim}
                  onClick={() => toast.info({ title: anim, description: 'Watch the entrance.', animation: anim, position, duration: 3000 })}
                  className="btn-demo bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                >
                  {anim}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Advanced tab */}
      {tab === 'advanced' && (
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Advanced Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={showCustom} className="btn-demo bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white">
                Custom Component
              </button>
              <button onClick={showPromise} className="btn-demo bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                Promise Toast
              </button>
              <button onClick={showUpdate} className="btn-demo bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white">
                Updating Toast
              </button>
              <button onClick={showMultiple} className="btn-demo bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                Multiple Toasts
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Management</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  for (let i = 0; i < 3; i++) setTimeout(() => toast.info({ title: `Toast ${i + 1}`, description: 'Stacked', position }), i * 200);
                }}
                className="btn-demo bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                Show 3 toasts
              </button>
              <button
                onClick={() => toast.dismiss()}
                className="btn-demo bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
              >
                Dismiss all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Config tab */}
      {tab === 'config' && (
        <div className="p-6 space-y-5">
          <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Customize Options</h4>

          {/* Position */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Position</label>
            <div className="grid grid-cols-3 gap-1.5">
              {positions.map((p) => (
                <button
                  key={p}
                  onClick={() => setPosition(p)}
                  className={`py-1.5 rounded text-xs font-medium border transition-colors ${
                    position === p
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex justify-between">
              <span>Duration</span>
              <span className="text-blue-600 dark:text-blue-400 font-mono">{duration}ms</span>
            </label>
            <input
              type="range"
              min={1000}
              max={10000}
              step={500}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1s</span><span>5s</span><span>10s</span>
            </div>
          </div>

          {/* Animation */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Animation</label>
            <div className="grid grid-cols-4 gap-1.5">
              {animations.map((a) => (
                <button
                  key={a}
                  onClick={() => setAnimation(a)}
                  className={`py-1.5 rounded text-xs font-medium border transition-colors ${
                    animation === a
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Style */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Visual Style</label>
            <div className="grid grid-cols-3 gap-1.5">
              {visualStyles.map(({ style, label }) => (
                <button
                  key={style}
                  onClick={() => setVisualStyle(style)}
                  className={`py-1.5 rounded text-xs font-medium border transition-colors ${
                    visualStyle === style
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3">
            {[
              { id: 'pauseOnHover', label: 'Pause on hover', value: pauseOnHover, set: setPauseOnHover },
              { id: 'dismissible', label: 'Show dismiss button', value: dismissible, set: setDismissible },
            ].map((toggle) => (
              <label key={toggle.id} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700 dark:text-gray-300">{toggle.label}</span>
                <button
                  role="switch"
                  aria-checked={toggle.value}
                  onClick={() => toggle.set(!toggle.value)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    toggle.value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      toggle.value ? 'translate-x-4.5' : 'translate-x-0.5'
                    }`}
                    style={{ transform: toggle.value ? 'translateX(20px)' : 'translateX(2px)' }}
                  />
                </button>
              </label>
            ))}
          </div>

          {/* Preview code */}
          <div className="mt-2 p-3 bg-gray-900 rounded-lg text-xs font-mono text-gray-300 overflow-x-auto">
            <pre>{`toast.success({
  title: 'Hello!',
  description: 'Configured toast.',
  position: '${position}',
  duration: ${duration},
  animation: '${animation}',
  visualStyle: '${visualStyle}',
  pauseOnHover: ${pauseOnHover},
  dismissible: ${dismissible},
});`}</pre>
          </div>

          <button onClick={showConfigured} className="w-full btn-demo bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            Fire configured toast
          </button>
        </div>
      )}

      <style jsx>{`
        .btn-demo {
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 500;
          transition: all 0.15s;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
