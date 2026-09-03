'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/cn';

const commands = [
  { label: 'Deno', command: 'deno add jsr:@codexa/core' },
  { label: 'npm', command: 'npx jsr add @codexa/core' },
  { label: 'pnpm', command: 'pnpm dlx jsr add @codexa/core' },
  { label: 'Yarn', command: 'yarn dlx jsr add @codexa/core' },
  { label: 'Bun', command: 'bunx jsr add @codexa/core' },
] as const;

export function InstallTabs() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = commands[active];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(current.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard access denied, ignore
    }
  }

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl border border-fd-border bg-fd-card">
      <div className="flex items-center gap-1 border-b border-fd-border px-2 pt-2">
        {commands.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              'rounded-t-md px-3 py-1.5 text-sm font-medium transition-colors',
              index === active
                ? 'bg-fd-background text-fd-primary'
                : 'text-fd-muted-foreground hover:text-fd-foreground',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <code className="overflow-x-auto whitespace-nowrap font-mono text-sm text-fd-foreground">
          <span className="select-none text-fd-primary">$ </span>
          {current.command}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy install command"
          className="shrink-0 rounded-md border border-fd-border p-1.5 text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          {copied ? (
            <Check className="size-4 text-fd-primary" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
