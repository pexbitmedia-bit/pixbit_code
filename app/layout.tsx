import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Poppins } from 'next/font/google';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/sections/Navbar';
import { organizationJsonLd, siteDescription, siteName, siteUrl } from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const viewport: Viewport = {
  themeColor: '#FAFAFA',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Pexbit Media — Personal Branding for Founders & Leaders',
    template: '%s | Pexbit Media',
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Pexbit Media — Personal Branding for Founders & Leaders',
    description: siteDescription,
    siteName,
    images: [
      {
        url: '/images/logo.jpg',
        width: 1024,
        height: 1024,
        alt: 'Pexbit Media',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pexbit Media — Personal Branding for Founders & Leaders',
    description: siteDescription,
    images: ['/images/logo.jpg'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = JSON.stringify(organizationJsonLd()).replace(/</g, '\\u003c');

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
