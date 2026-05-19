import type { Metadata } from 'next';
import './globals.css';
import AppShell from '../components/AppShell';

export const metadata: Metadata = {
  title: 'React Toast Kit — Modern Toast Notifications for React',
  description: 'A lightweight, highly customizable, and accessible toast notification system for React applications. Supports Next.js, SSR, dark mode, custom animations, and more.',
  keywords: ['react', 'toast', 'notification', 'nextjs', 'accessible', 'typescript'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
