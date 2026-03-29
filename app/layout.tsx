import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default: 'Lokesh Ahirwar | Native Android Developer',
    template: '%s | Lokesh Ahirwar',
  },
  description:
    'Lokesh Ahirwar — Native Android Developer, B.Tech CSE student, and GDG Android Lead from Bhopal. Building high-performance Android apps with Kotlin & Jetpack Compose.',
  keywords: [
    'Lokesh Ahirwar',
    'Android Developer',
    'Native Android',
    'Kotlin',
    'Jetpack Compose',
    'Android Portfolio',
    'GDG Android',
    'SIST Bhopal',
    'Mobile Developer',
  ],
  authors: [{ name: 'Lokesh Ahirwar', url: 'https://lokeshahirwar.dev' }],
  creator: 'Lokesh Ahirwar',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Lokesh Ahirwar | Native Android Developer',
    description:
      'Native Android Developer crafting high-quality mobile experiences. B.Tech CSE at SIST Bhopal & GDG Android Lead.',
    siteName: 'Lokesh Ahirwar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lokesh Ahirwar | Native Android Developer',
    description:
      'Native Android Developer crafting high-quality mobile experiences.',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#3DDC84',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var saved = localStorage.getItem('theme');
                document.documentElement.setAttribute('data-theme', saved || 'dark');
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main style={{ paddingTop: 'var(--navbar-height)' }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
