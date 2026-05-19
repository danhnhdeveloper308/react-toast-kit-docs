'use client';

import { useState, useCallback } from 'react';
import { useToastStore, toast } from 'react-toast-kit';
import type { ToastPosition, ToastVariant, ToastAnimation, ToastStyle, ToastTheme } from 'react-toast-kit';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'monitor' | 'create' | 'settings';

interface CreateConfig {
  title: string;
  description: string;
  variant: ToastVariant;
  position: ToastPosition;
  animation: ToastAnimation;
  visualStyle: ToastStyle;
  duration: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const VARIANT_COLORS: Record<string, { bg: string; text: string }> = {
  success: { bg: '#dcfce7', text: '#166534' },
  error:   { bg: '#fee2e2', text: '#b91c1c' },
  warning: { bg: '#fef3c7', text: '#92400e' },
  info:    { bg: '#dbeafe', text: '#1e40af' },
  loading: { bg: '#f3f4f6', text: '#4b5563' },
  custom:  { bg: '#ede9fe', text: '#6d28d9' },
  default: { bg: '#f1f5f9', text: '#334155' },
};

const QUICK_TESTS = [
  { key: 'success', label: '✅ Success',  fn: () => toast.success({ title: 'Success', description: 'Operation completed successfully.' }) },
  { key: 'error',   label: '❌ Error',    fn: () => toast.error({ title: 'Error', description: 'Something went wrong. Please try again.' }) },
  { key: 'warning', label: '⚠️ Warning',  fn: () => toast.warning({ title: 'Warning', description: 'Session expires in 5 minutes.' }) },
  { key: 'info',    label: 'ℹ️ Info',     fn: () => toast.info({ title: 'Info', description: 'A new version is available.' }) },
  {
    key: 'loading',
    label: '⏳ Loading',
    fn: () => {
      const id = toast.loading({ title: 'Loading…', description: 'Processing your request.' });
      setTimeout(() => toast.update(id, { variant: 'success', title: 'Done!', description: 'Task completed.', duration: 2500 }), 2500);
    },
  },
  {
    key: 'promise',
    label: '🔄 Promise',
    fn: () => {
      const p = new Promise<string>((res, rej) =>
        setTimeout(() => (Math.random() > 0.4 ? res('Loaded 42 records') : rej(new Error('Network timeout'))), 2000)
      );
      toast.promise(p, {
        loading: 'Fetching data…',
        success: (d) => ({ title: 'Success', description: d }),
        error: (e: unknown) => ({ title: 'Failed', description: e instanceof Error ? e.message : 'Unknown error' }),
      });
    },
  },
  {
    key: 'actions',
    label: '🎬 Actions',
    fn: () =>
      toast.info({
        title: 'File uploaded',
        description: 'Ready to share.',
        duration: 0,
        actions: [
          { label: 'View', onClick: () => toast.success({ title: 'Navigating…' }) },
          { label: 'Copy link', variant: 'secondary', onClick: () => toast.success({ title: 'Link copied!' }), closeOnClick: false },
        ],
      }),
  },
  {
    key: 'stress',
    label: '💥 Stress',
    fn: () => {
      const variants: ToastVariant[] = ['success', 'error', 'warning', 'info'];
      const positions: ToastPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
      for (let i = 0; i < 5; i++) {
        setTimeout(() => toast({ title: `Stress #${i + 1}`, description: 'Multiple at once', variant: variants[i % 4], position: positions[i % 4], duration: 2500 }), i * 250);
      }
    },
  },
] as const;

// ─── SelectField ─────────────────────────────────────────────────────────────

function SelectField<T extends string>({
  label, value, options, onChange, dark,
}: { label: string; value: T; options: readonly T[]; onChange: (v: T) => void; dark: boolean }) {
  const baseStyle: React.CSSProperties = {
    width: '100%', padding: '6px 8px',
    border: `1px solid ${dark ? '#374151' : '#d1d5db'}`,
    borderRadius: '6px', fontSize: '12px',
    background: dark ? '#1f2937' : '#fff',
    color: dark ? '#f1f5f9' : '#111827',
    outline: 'none', cursor: 'pointer',
  };
  return (
    <div>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, marginBottom: '4px', color: dark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value as T)} style={baseStyle}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── DevToolsEmbed ────────────────────────────────────────────────────────────

export default function DevToolsEmbed() {
  const [tab, setTab] = useState<Tab>('monitor');
  const [create, setCreate] = useState<CreateConfig>({
    title: 'Test Toast',
    description: 'This is a DevTools test toast.',
    variant: 'info',
    position: 'top-right',
    animation: 'slide',
    visualStyle: 'solid',
    duration: 4000,
  });

  const {
    toasts, theme, effectiveTheme, maxToasts, pausedToasts,
    clearAllToasts, removeToast, pauseToast, resumeToast,
    setTheme, setMaxToasts, plugins,
  } = useToastStore();

  const dark = effectiveTheme === 'dark';

  const fireCreate = useCallback(() => {
    toast({ ...create, pauseOnHover: true, dismissible: true });
  }, [create]);

  // ── Style tokens ────────────────────────────────────────────────────────────
  const S = {
    panel: {
      background: dark ? '#111827' : '#ffffff',
      border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`,
      borderRadius: '14px',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxShadow: dark
        ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)'
        : '0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
    } as React.CSSProperties,

    header: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 18px',
      background: dark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
        : 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)',
      borderBottom: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`,
    } as React.CSSProperties,

    tabBar: {
      display: 'flex',
      borderBottom: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`,
      background: dark ? '#0f172a' : '#f8fafc',
    } as React.CSSProperties,

    tab: (active: boolean): React.CSSProperties => ({
      flex: 1, padding: '10px 4px', fontSize: '12px', fontWeight: 600,
      textAlign: 'center', cursor: 'pointer', border: 'none', background: 'transparent',
      color: active
        ? (dark ? '#818cf8' : '#4f46e5')
        : (dark ? '#64748b' : '#94a3b8'),
      borderBottom: `2px solid ${active ? (dark ? '#818cf8' : '#4f46e5') : 'transparent'}`,
      transition: 'color 0.15s, border-color 0.15s',
    }),

    body: {
      padding: '16px 18px',
      maxHeight: '480px',
      overflowY: 'auto' as const,
      background: dark ? '#111827' : '#ffffff',
    } as React.CSSProperties,

    sectionLabel: {
      fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      color: dark ? '#475569' : '#94a3b8',
      marginBottom: '8px', marginTop: '4px',
    } as React.CSSProperties,

    statCard: (warn = false): React.CSSProperties => ({
      flex: 1, padding: '12px 14px', borderRadius: '10px',
      background: warn
        ? (dark ? 'rgba(251,191,36,0.08)' : 'rgba(254,243,199,0.8)')
        : (dark ? 'rgba(99,102,241,0.1)' : 'rgba(238,242,255,0.8)'),
      border: `1px solid ${warn ? (dark ? 'rgba(251,191,36,0.2)' : '#fde68a') : (dark ? 'rgba(99,102,241,0.2)' : '#c7d2fe')}`,
    }),

    statNum: (warn = false): React.CSSProperties => ({
      fontSize: '26px', fontWeight: 800, lineHeight: 1,
      color: warn ? (dark ? '#fbbf24' : '#d97706') : (dark ? '#818cf8' : '#4f46e5'),
    }),

    statLbl: (warn = false): React.CSSProperties => ({
      fontSize: '11px', fontWeight: 500, marginTop: '3px',
      color: warn ? (dark ? '#f59e0b' : '#92400e') : (dark ? '#6366f1' : '#4338ca'),
    }),

    quickBtn: {
      padding: '7px 6px', borderRadius: '8px', fontSize: '11px', fontWeight: 600,
      border: 'none', cursor: 'pointer', textAlign: 'center' as const,
      background: dark ? '#1e293b' : '#f1f5f9',
      color: dark ? '#cbd5e1' : '#334155',
      transition: 'background 0.12s',
    } as React.CSSProperties,

    input: {
      width: '100%', padding: '7px 9px',
      border: `1px solid ${dark ? '#374151' : '#d1d5db'}`,
      borderRadius: '7px', fontSize: '12px',
      background: dark ? '#1f2937' : '#fff',
      color: dark ? '#f1f5f9' : '#111827',
      outline: 'none', boxSizing: 'border-box' as const,
    } as React.CSSProperties,

    fieldLabel: {
      display: 'block', fontSize: '11px', fontWeight: 600, marginBottom: '5px',
      color: dark ? '#94a3b8' : '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.05em',
    } as React.CSSProperties,

    fireBtn: {
      width: '100%', padding: '10px', borderRadius: '8px', border: 'none',
      background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
      color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
      marginTop: '4px', transition: 'opacity 0.15s',
    } as React.CSSProperties,

    toastRow: {
      padding: '10px 12px', borderRadius: '10px', marginBottom: '8px',
      background: dark ? '#1e293b' : '#f8fafc',
      border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`,
    } as React.CSSProperties,

    iconBtn: (color: string): React.CSSProperties => ({
      padding: '3px 7px', borderRadius: '6px', fontSize: '14px',
      border: 'none', background: 'transparent', cursor: 'pointer', color,
    }),

    settingRow: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 12px', borderRadius: '10px', marginBottom: '6px',
      background: dark ? '#1e293b' : '#f8fafc',
      border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`,
    } as React.CSSProperties,
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'monitor',  label: 'Monitor',  icon: '📊' },
    { id: 'create',   label: 'Create',   icon: '⚡' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div style={S.panel}>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(79,70,229,0.4)',
          }}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: dark ? '#f1f5f9' : '#1e293b' }}>
              React Toast Kit — DevTools
            </div>
            <div style={{ fontSize: '10px', color: dark ? '#64748b' : '#94a3b8', marginTop: '1px' }}>
              Live embedded panel · Real store state
            </div>
          </div>
        </div>

        {/* Stats chips */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{
            padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
            background: toasts.length > 0 ? 'rgba(99,102,241,0.15)' : (dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
            color: toasts.length > 0 ? (dark ? '#818cf8' : '#4f46e5') : (dark ? '#475569' : '#94a3b8'),
            border: `1px solid ${toasts.length > 0 ? 'rgba(99,102,241,0.25)' : 'transparent'}`,
          }}>
            {toasts.length} active
          </div>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%', alignSelf: 'center',
            background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
          }} />
        </div>
      </div>

      {/* ── Tab bar ─────────────────────────────────────────────────── */}
      <div style={S.tabBar}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={S.tab(tab === t.id)}>
            <span style={{ marginRight: '4px' }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div style={S.body}>

        {/* ── Monitor ─────────────────────────────────────────────── */}
        {tab === 'monitor' && (
          <div>
            {/* Stat cards */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <div style={S.statCard()}>
                <div style={S.statNum()}>{toasts.length}</div>
                <div style={S.statLbl()}>Active toasts</div>
              </div>
              <div style={S.statCard(true)}>
                <div style={S.statNum(true)}>{pausedToasts.size}</div>
                <div style={S.statLbl(true)}>Paused</div>
              </div>
            </div>

            {/* Quick tests */}
            <div style={S.sectionLabel}>Quick Tests</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '16px' }}>
              {QUICK_TESTS.map((t) => (
                <button key={t.key} onClick={t.fn} style={S.quickBtn}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Active toasts list */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={S.sectionLabel}>Active Toasts</div>
              {toasts.length > 0 && (
                <button
                  onClick={clearAllToasts}
                  style={{ fontSize: '11px', fontWeight: 600, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Clear all
                </button>
              )}
            </div>

            {toasts.length === 0 ? (
              <div style={{
                padding: '28px 16px', textAlign: 'center', borderRadius: '10px',
                background: dark ? '#1e293b' : '#f8fafc',
                border: `2px dashed ${dark ? '#334155' : '#e2e8f0'}`,
                color: dark ? '#475569' : '#94a3b8', fontSize: '13px',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>📭</div>
                No active toasts — try a quick test above
              </div>
            ) : (
              toasts.map((t) => {
                const vc = VARIANT_COLORS[t.variant] ?? VARIANT_COLORS.default;
                const isPaused = pausedToasts.has(t.id);
                return (
                  <div key={t.id} style={S.toastRow}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{
                        padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700,
                        background: vc.bg, color: vc.text,
                      }}>
                        {t.variant}
                      </span>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        <button
                          onClick={() => isPaused ? resumeToast(t.id) : pauseToast(t.id)}
                          style={S.iconBtn('#3b82f6')}
                          title={isPaused ? 'Resume' : 'Pause'}
                        >
                          {isPaused ? '▶' : '⏸'}
                        </button>
                        <button
                          onClick={() => removeToast(t.id)}
                          style={S.iconBtn('#ef4444')}
                          title="Dismiss"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: dark ? '#e2e8f0' : '#1e293b', marginBottom: '2px' }}>
                      {t.title || '(no title)'}
                    </div>
                    {t.description && (
                      <div style={{ fontSize: '11px', color: dark ? '#64748b' : '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t.description}
                      </div>
                    )}
                    <div style={{ marginTop: '6px', fontSize: '10px', color: dark ? '#334155' : '#cbd5e1', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ padding: '1px 6px', borderRadius: '4px', background: dark ? '#0f172a' : '#f1f5f9' }}>{t.position}</span>
                      <span style={{ padding: '1px 6px', borderRadius: '4px', background: dark ? '#0f172a' : '#f1f5f9' }}>{t.animation ?? 'slide'}</span>
                      <span style={{ padding: '1px 6px', borderRadius: '4px', background: dark ? '#0f172a' : '#f1f5f9' }}>{t.duration}ms</span>
                      {isPaused && <span style={{ padding: '1px 6px', borderRadius: '4px', background: '#fef3c7', color: '#92400e' }}>paused</span>}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── Create ──────────────────────────────────────────────── */}
        {tab === 'create' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={S.sectionLabel}>Build a Toast</div>

            {/* Title + Description */}
            <div>
              <label style={S.fieldLabel}>Title</label>
              <input
                style={S.input}
                value={create.title}
                onChange={(e) => setCreate((p) => ({ ...p, title: e.target.value }))}
                placeholder="Toast title…"
              />
            </div>
            <div>
              <label style={S.fieldLabel}>Description</label>
              <textarea
                style={{ ...S.input, minHeight: '56px', resize: 'vertical', fontFamily: 'inherit' }}
                value={create.description}
                onChange={(e) => setCreate((p) => ({ ...p, description: e.target.value }))}
                placeholder="Toast description…"
                rows={2}
              />
            </div>

            {/* Row: Variant + Position */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <SelectField
                label="Variant" value={create.variant} dark={dark}
                options={['default', 'success', 'error', 'warning', 'info', 'loading'] as const}
                onChange={(v) => setCreate((p) => ({ ...p, variant: v }))}
              />
              <SelectField
                label="Position" value={create.position} dark={dark}
                options={['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'] as const}
                onChange={(v) => setCreate((p) => ({ ...p, position: v }))}
              />
            </div>

            {/* Row: Animation + Style */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <SelectField
                label="Animation" value={create.animation} dark={dark}
                options={['slide', 'fade', 'bounce', 'flip', 'zoom', 'elastic', 'none'] as const}
                onChange={(v) => setCreate((p) => ({ ...p, animation: v }))}
              />
              <SelectField
                label="Visual Style" value={create.visualStyle} dark={dark}
                options={['solid', 'minimal', 'outlined', 'glass', 'gradient', 'shimmer', 'pill', 'neon', 'retro', 'confetti'] as const}
                onChange={(v) => setCreate((p) => ({ ...p, visualStyle: v }))}
              />
            </div>

            {/* Duration */}
            <div>
              <label style={S.fieldLabel}>
                Duration — <span style={{ color: dark ? '#818cf8' : '#4f46e5', fontWeight: 700 }}>{create.duration === 0 ? 'Persistent' : `${create.duration}ms`}</span>
              </label>
              <input
                type="range" min={0} max={10000} step={500}
                value={create.duration}
                onChange={(e) => setCreate((p) => ({ ...p, duration: Number(e.target.value) }))}
                style={{ width: '100%', accentColor: '#4f46e5' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: dark ? '#475569' : '#94a3b8', marginTop: '2px' }}>
                <span>Persistent</span><span>5s</span><span>10s</span>
              </div>
            </div>

            {/* Code preview */}
            <div style={{
              padding: '12px', borderRadius: '8px',
              background: dark ? '#0f172a' : '#1e293b',
              fontSize: '11px', fontFamily: 'ui-monospace, monospace',
              color: '#94a3b8', lineHeight: 1.6, overflowX: 'auto',
            }}>
              <span style={{ color: '#818cf8' }}>toast</span>
              <span style={{ color: '#f8fafc' }}>{'({'}</span>
              {'\n  '}
              <span style={{ color: '#7dd3fc' }}>variant</span>
              <span style={{ color: '#f8fafc' }}>: </span>
              <span style={{ color: '#86efac' }}>'{create.variant}'</span>
              {',\n  '}
              <span style={{ color: '#7dd3fc' }}>position</span>
              <span style={{ color: '#f8fafc' }}>: </span>
              <span style={{ color: '#86efac' }}>'{create.position}'</span>
              {',\n  '}
              <span style={{ color: '#7dd3fc' }}>animation</span>
              <span style={{ color: '#f8fafc' }}>: </span>
              <span style={{ color: '#86efac' }}>'{create.animation}'</span>
              {',\n  '}
              <span style={{ color: '#7dd3fc' }}>visualStyle</span>
              <span style={{ color: '#f8fafc' }}>: </span>
              <span style={{ color: '#86efac' }}>'{create.visualStyle}'</span>
              {',\n  '}
              <span style={{ color: '#7dd3fc' }}>duration</span>
              <span style={{ color: '#f8fafc' }}>: </span>
              <span style={{ color: '#fbbf24' }}>{create.duration}</span>
              {',\n'}
              <span style={{ color: '#f8fafc' }}>{'})'}</span>
            </div>

            <button onClick={fireCreate} style={S.fireBtn}>
              🚀 Fire Toast
            </button>
          </div>
        )}

        {/* ── Settings ────────────────────────────────────────────── */}
        {tab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={S.sectionLabel}>Global Settings</div>

            {/* Theme */}
            <div style={S.settingRow}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: dark ? '#e2e8f0' : '#1e293b', marginBottom: '2px' }}>Theme</div>
                <div style={{ fontSize: '11px', color: dark ? '#64748b' : '#94a3b8' }}>Current: <strong>{effectiveTheme}</strong></div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {(['light', 'dark', 'system'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t as ToastTheme)}
                    style={{
                      padding: '5px 9px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      border: `1.5px solid ${theme === t ? '#4f46e5' : (dark ? '#334155' : '#e2e8f0')}`,
                      background: theme === t ? 'rgba(79,70,229,0.1)' : 'transparent',
                      color: theme === t ? '#4f46e5' : (dark ? '#94a3b8' : '#64748b'),
                      cursor: 'pointer',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Max toasts */}
            <div style={S.settingRow}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: dark ? '#e2e8f0' : '#1e293b', marginBottom: '2px' }}>Max Toasts</div>
                <div style={{ fontSize: '11px', color: dark ? '#64748b' : '#94a3b8' }}>Queue trimming threshold</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={() => setMaxToasts(Math.max(1, maxToasts - 1))}
                  style={{ width: '26px', height: '26px', borderRadius: '6px', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`, background: 'transparent', cursor: 'pointer', fontSize: '16px', color: dark ? '#94a3b8' : '#64748b' }}
                >−</button>
                <span style={{ fontSize: '16px', fontWeight: 700, minWidth: '24px', textAlign: 'center', color: dark ? '#e2e8f0' : '#1e293b' }}>{maxToasts}</span>
                <button
                  onClick={() => setMaxToasts(Math.min(10, maxToasts + 1))}
                  style={{ width: '26px', height: '26px', borderRadius: '6px', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`, background: 'transparent', cursor: 'pointer', fontSize: '16px', color: dark ? '#94a3b8' : '#64748b' }}
                >+</button>
              </div>
            </div>

            {/* Keyboard shortcut info */}
            <div style={S.sectionLabel}>Keyboard Shortcut</div>
            <div style={{
              padding: '12px', borderRadius: '10px',
              background: dark ? '#1e293b' : '#f8fafc',
              border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`,
              fontSize: '12px', color: dark ? '#94a3b8' : '#64748b',
            }}>
              Press <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: dark ? '#0f172a' : '#e2e8f0', fontSize: '11px', fontFamily: 'monospace', border: `1px solid ${dark ? '#334155' : '#cbd5e1'}` }}>Alt</kbd>
              {' + '}
              <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: dark ? '#0f172a' : '#e2e8f0', fontSize: '11px', fontFamily: 'monospace', border: `1px solid ${dark ? '#334155' : '#cbd5e1'}` }}>Shift</kbd>
              {' + '}
              <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: dark ? '#0f172a' : '#e2e8f0', fontSize: '11px', fontFamily: 'monospace', border: `1px solid ${dark ? '#334155' : '#cbd5e1'}` }}>D</kbd>
              {' to toggle the floating DevTools panel anywhere in your app.'}
            </div>

            {/* Plugins */}
            <div style={S.sectionLabel}>Registered Plugins ({plugins.length})</div>
            {plugins.length === 0 ? (
              <div style={{
                padding: '16px', borderRadius: '10px', textAlign: 'center',
                background: dark ? '#1e293b' : '#f8fafc',
                border: `2px dashed ${dark ? '#334155' : '#e2e8f0'}`,
                fontSize: '12px', color: dark ? '#475569' : '#94a3b8',
              }}>
                No plugins registered. Use <code style={{ fontFamily: 'monospace', fontSize: '11px' }}>registerPlugin()</code> to add one.
              </div>
            ) : (
              plugins.map((p) => (
                <div key={p.name} style={{ ...S.settingRow, flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: dark ? '#e2e8f0' : '#1e293b' }}>{p.name}</div>
                  {p.description && <div style={{ fontSize: '11px', color: dark ? '#64748b' : '#94a3b8' }}>{p.description}</div>}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
