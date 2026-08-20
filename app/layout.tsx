import type { Metadata } from 'next';
import './globals.css';
import AppShell from '../components/AppShell';
import { siteConfig } from '../lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'React Toast Kit — Lightweight Toast Notifications for React',
    template: '%s | React Toast Kit',
  },
  description: siteConfig.description,
  keywords: [
    'react',
    'toast',
    'notification',
    'nextjs',
    'remix',
    'vite',
    'accessible',
    'typescript',
    'react 19',
    'dark mode',
    'RTL',
    'react-hot-toast alternative',
    'react-toastify alternative',
    'sonner alternative',
  ],
  authors: [{ name: 'DanhDeveloper', url: 'https://github.com/danhnhdeveloper308' }],
  creator: 'DanhDeveloper',
  publisher: 'DanhDeveloper',
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'React Toast Kit — Modern Toast Notifications',
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React Toast Kit — Modern Toast Notifications',
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  category: 'technology',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: siteConfig.name,
    description: siteConfig.description,
    codeRepository: siteConfig.githubUrl,
    programmingLanguage: ['TypeScript', 'React'],
    license: 'https://opensource.org/licenses/MIT',
    version: siteConfig.version,
    url: siteConfig.url,
  };

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{const t=localStorage.getItem('theme')||'system';document.documentElement.classList.toggle('dark',t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches))}catch{}",
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
