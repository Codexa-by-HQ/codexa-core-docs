import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Blocks,
  Braces,
  Cable,
  HardDrive,
  Radio,
  Route,
  Terminal,
  Waypoints,
} from 'lucide-react';
import { InstallTabs } from '@/components/home/install-tabs';
import { CodeWindow, kw, str, cm } from '@/components/home/code-window';
import { Footer } from '@/components/footer';
import { docsRoute, gitConfig } from '@/lib/shared';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

const runtimes = ['Deno', 'Bun', 'Cloudflare Workers', 'Node.js'];

const subpaths = [
  'http',
  'openapi',
  'config',
  'bus',
  'store',
  'cache',
  'storage',
  'providers',
  'logger',
  'crypto',
  'hash',
  'device',
  'ttl',
  'response',
  'query',
  'cli',
];

const features = [
  {
    icon: Blocks,
    title: 'Plugin-first architecture',
    description:
      'Every route, middleware, and background job is owned by a plugin with its own name, lifecycle hooks, and metadata.',
  },
  {
    icon: Cable,
    title: 'Typed service exposure',
    description:
      'A plugin only reaches another through dependsOn and exposeService, so a growing app stays predictable instead of tangled.',
  },
  {
    icon: Waypoints,
    title: 'Runtime-neutral dispatch',
    description:
      'app.dispatch is a plain (Request) => Promise<Response> function. The same app runs on Deno, Bun, Cloudflare Workers, and Node.js.',
  },
  {
    icon: Braces,
    title: 'Real OpenAPI 3.1 documents',
    description:
      'Generate a spec straight from your route metadata, no separate annotation layer or schema duplication.',
  },
  {
    icon: HardDrive,
    title: 'One storage interface, four providers',
    description:
      'Local disk, S3, Cloudinary, and ImageKit behind the same upload, delete, and signed-URL API.',
  },
  {
    icon: Radio,
    title: 'Local or distributed event bus',
    description:
      'Start in-process with zero setup, then hand it a Redis client to make emit cross-process without changing call sites.',
  },
  {
    icon: Route,
    title: 'Radix tree router',
    description:
      'Static, param, and wildcard routes resolve through a radix tree, with versioned routes and per-route middleware built in.',
  },
  {
    icon: Terminal,
    title: 'A CLI for plugin distribution',
    description:
      'Pull a plugin’s source from a pinned Git ref into your project, with full rollback if any step fails.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Define a plugin',
    body: 'A plugin registers everything it owns, routes, middleware, services, in one setup function.',
    code: 'definePlugin',
  },
  {
    n: '02',
    title: 'Install it into an app',
    body: 'createApp takes as many plugins as your app needs, each isolated behind its own name.',
    code: 'createApp().install(plugin)',
  },
  {
    n: '03',
    title: 'Ship app.dispatch anywhere',
    body: 'Hand dispatch to Deno.serve, Bun.serve, a Cloudflare Worker, or call it directly in a test.',
    code: 'Deno.serve(app.dispatch)',
  },
];

export default function HomePage() {
  const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

  return (
    <>
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-fd-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-10%,var(--color-fd-primary)/12%,transparent_60%)]"
        />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center sm:py-28">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-xs font-medium text-fd-muted-foreground">
            <span className="size-1.5 rounded-full bg-fd-primary" />
            Published on JSR &middot; @codexa/core
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-fd-foreground sm:text-6xl">
            The <span className="text-fd-primary">plugin-first</span> way to
            build Deno APIs
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-lg text-fd-muted-foreground">
            Codexa Core is a modular HTTP toolkit where routes, middleware,
            and services are all plugins with their own lifecycle. The same
            app runs unchanged on Bun, Cloudflare Workers, and Node.js.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`${docsRoute}/quick-start`}
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={githubUrl}
              className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-5 py-2.5 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
            >
              View on GitHub
            </Link>
          </div>

          <div className="mt-10 flex justify-center">
            <InstallTabs />
          </div>

          <div className="mt-12 flex flex-col items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
              Runs wherever the Fetch API runs
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-base font-medium text-fd-foreground">
              {runtimes.map((runtime, index) => (
                <span key={runtime} className="flex items-center gap-2">
                  {index > 0 && (
                    <span
                      aria-hidden
                      className="size-1 rounded-full bg-fd-muted-foreground/40"
                    />
                  )}
                  {runtime}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Code showcase */}
      <section className="border-b border-fd-border bg-fd-card/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-fd-foreground sm:text-3xl">
              A plugin owns everything it needs
            </h2>
            <p className="mt-4 text-fd-muted-foreground">
              A route, a middleware, a background job, all of it lives inside{' '}
              <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-sm">
                setup(scope)
              </code>
              . Another plugin can only reach it through{' '}
              <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-sm">
                dependsOn
              </code>{' '}
              and{' '}
              <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-sm">
                exposeService
              </code>
              , so a large application stays predictable as more plugins are
              added.
            </p>
            <Link
              href={`${docsRoute}/http/plugins`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fd-primary hover:underline"
            >
              Read about plugins
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <CodeWindow filename="main.ts">
            {kw('import')} {'{ createApp, definePlugin }'} {kw('from')}{' '}
            {str("'@codexa/core/http'")}
            {'\n\n'}
            {kw('const')} healthPlugin = {kw('definePlugin')}({'{'}
            {'\n'}
            {'  name: '}
            {str("'health'")}
            {','}
            {'\n'}
            {'  setup(scope) {'}
            {'\n'}
            {'    scope.route({'}
            {'\n'}
            {"      method: 'GET',"}
            {'\n'}
            {"      path: '/health',"}
            {'\n'}
            {'      handler: (ctx) => ctx.json({ ok: true }),'}
            {'\n'}
            {'    });'}
            {'\n'}
            {'  },'}
            {'\n'}
            {'});'}
            {'\n\n'}
            {kw('const')} app = {kw('createApp')}({str("'api'")}
            ).install(healthPlugin);
            {'\n\n'}
            {cm('// runs the same way on Deno, Bun, and Workers')}
            {'\n'}
            Deno.serve(app.dispatch);
          </CodeWindow>
        </div>
      </section>

      {/* Subpaths */}
      <section className="border-b border-fd-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-center text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
            One package, sixteen focused subpaths
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {subpaths.map((path) => (
              <span
                key={path}
                className="rounded-full border border-fd-border bg-fd-card px-3 py-1.5 font-mono text-xs text-fd-foreground"
              >
                @codexa/core/{path}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-fd-muted-foreground">
            Import only what a project uses. A route-only service never loads
            the MongoDB driver or the Redis client.
          </p>
        </div>
      </section>

      {/* Feature grid */}
      <section className="border-b border-fd-border bg-fd-card/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-fd-foreground sm:text-3xl">
              Built as small, composable pieces
            </h2>
            <p className="mt-4 text-fd-muted-foreground">
              Every part of the framework is designed to be used on its own
              or combined into a full backend.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-fd-border bg-fd-card p-5"
              >
                <feature.icon className="size-5 text-fd-primary" />
                <h3 className="mt-3 font-semibold text-fd-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-fd-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-b border-fd-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold text-fd-foreground sm:text-3xl">
            Three steps to a running server
          </h2>

          <div className="mt-12 space-y-6">
            {steps.map((step) => (
              <div
                key={step.n}
                className="flex flex-col gap-4 rounded-xl border border-fd-border bg-fd-card p-5 sm:flex-row sm:items-center"
              >
                <span className="font-mono text-2xl font-bold text-fd-primary/40">
                  {step.n}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-fd-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-fd-muted-foreground">
                    {step.body}
                  </p>
                </div>
                <code className="shrink-0 rounded-lg bg-fd-muted px-3 py-2 font-mono text-xs text-fd-foreground">
                  {step.code}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section>
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
          <h2 className="text-3xl font-bold text-fd-foreground sm:text-4xl">
            Build your first plugin in three minutes
          </h2>
          <p className="mt-4 max-w-xl text-fd-muted-foreground">
            Published on JSR at{' '}
            <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-sm">
              @codexa/core
            </code>
            , with a JSR score of 100 percent and support confirmed for
            Deno, Node.js, Bun, and browsers.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`${docsRoute}/quick-start`}
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={docsRoute}
              className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-5 py-2.5 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
            >
              Browse the docs
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
