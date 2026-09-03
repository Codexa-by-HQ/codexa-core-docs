# Codexa Core Docs

The official documentation site for [Codexa Core](https://github.com/Codexa-by-HQ/codexa-core), a modular, plugin-first toolkit for building Deno backends.

Live at: [https://codexa-docs.vercel.app](https://codexa-docs.vercel.app)

Built with [Next.js](https://nextjs.org) and [Fumadocs](https://fumadocs.dev), content is written in MDX under `content/docs/`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Purpose                                      |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Start the local dev server (Turbopack)       |
| `npm run build`      | Production build                             |
| `npm run start`      | Serve a production build                     |
| `npm run types:check`| Generate route types, then type-check        |
| `npm run lint`       | Lint with Biome                              |
| `npm run format`     | Format with Biome                            |

## Project structure

```
content/docs/en/        MDX documentation pages, grouped by module
src/app/[lang]/         Localized routes: landing page, docs layout, OG/sitemap/robots
src/components/home/    Landing page sections (hero, install tabs, code showcase, features)
src/lib/                Shared config: i18n, source loader, layout options, app metadata
public/                 Static assets: logo, favicons
```

## Content

Each page lives at `content/docs/en/<path>.mdx` with frontmatter (`title`, `description`, optional `icon`). Sidebar grouping and ordering come from the `meta.json` file in each folder, top-level sections use the `---Label---` separator syntax.

Only `en` has real content today. `ar`, `ur`, `fr`, and `nl` are wired up through `fumadocs-core/i18n` but not yet translated.

## Deployment

Deployed on Vercel. No custom Build/Output Directory overrides are needed, Vercel's Next.js framework preset handles this project as-is. Set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, the sitemap, and OG images resolve correctly instead of falling back to `localhost:3000`.

## License

MIT © Codexa-by-HQ
