import type { ReactNode } from 'react';

export function CodeWindow({
  filename,
  children,
}: {
  filename: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-fd-border px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-fd-muted" />
        <span className="size-2.5 rounded-full bg-fd-muted" />
        <span className="size-2.5 rounded-full bg-fd-muted" />
        <span className="ml-2 font-mono text-xs text-fd-muted-foreground">
          {filename}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono">{children}</code>
      </pre>
    </div>
  );
}

export function kw(text: string) {
  return <span className="text-fd-primary">{text}</span>;
}

export function str(text: string) {
  return <span className="text-emerald-500 dark:text-emerald-400">{text}</span>;
}

export function cm(text: string) {
  return <span className="text-fd-muted-foreground">{text}</span>;
}
