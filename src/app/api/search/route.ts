import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// `localeMap` forces a separate search index per locale instead of one
// shared index keyed by URL. With `hideLocale: 'always'` every locale
// shares the same URL, so a single shared index throws a duplicate id
// error the moment more than one locale is declared.
export const { GET } = createFromSource(source, {
  localeMap: {},
});
