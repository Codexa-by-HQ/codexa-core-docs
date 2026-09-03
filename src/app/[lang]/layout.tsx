import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Figtree, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { i18nUI, rtlLanguages } from '@/lib/i18n';
import type { ReactNode } from 'react';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
});

// Also covers Urdu's Arabic-script glyphs until a dedicated Urdu
// font is picked when real Urdu content is added.
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
});

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  const resolvedLang = lang ?? 'en';
  const isRtl = rtlLanguages.includes(resolvedLang);

  return (
    <html
      lang={resolvedLang}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${figtree.variable} ${arabic.variable} ${isRtl ? arabic.className : figtree.className}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider i18n={i18nUI.provider(resolvedLang)}>{children}</RootProvider>
      </body>
    </html>
  );
}
