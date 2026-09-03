import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Merriweather } from 'next/font/google';
import { appName, gitConfig } from './shared';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['700'],
});

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n: true,
    nav: {
      title: (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={appName}
            width={24}
            height={24}
            className="size-6"
          />
          <span className={merriweather.className}>{appName}</span>
        </>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
