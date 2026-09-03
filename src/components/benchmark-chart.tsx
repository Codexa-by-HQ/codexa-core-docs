'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import resultsData from '@/data/benchmark-results.json';
import { cn } from '@/lib/cn';

interface EndpointStat {
  requestsPerSecAvg?: number;
  latencyAvgMs?: number;
  error?: string;
}

interface FrameworkResult {
  key: string;
  label: string;
  version: string;
  endpoints?: Record<string, EndpointStat>;
  error?: string;
}

const data = resultsData as {
  generatedAt: string;
  env: { os: string; cpu: string; cores: number };
  config: { connections: number; duration: number; warmup: number };
  endpoints: string[];
  endpointKeys: string[];
  results: FrameworkResult[];
};

export function BenchmarkChart({
  excludeKeys = [],
  onlyEndpoint,
}: {
  excludeKeys?: string[];
  onlyEndpoint?: string;
} = {}) {
  const results = data.results.filter((fw) => !excludeKeys.includes(fw.key));
  const endpointEntries = data.endpoints
    .map((label, idx) => ({ label, key: data.endpointKeys[idx] }))
    .filter((e) => !onlyEndpoint || e.key === onlyEndpoint);

  const [active, setActive] = useState(0);
  const showTabs = endpointEntries.length > 1;
  const current = endpointEntries[showTabs ? active : 0];

  const rows = results
    .map((fw) => ({
      key: fw.key,
      label: fw.label,
      value: fw.endpoints?.[current.key]?.requestsPerSecAvg ?? 0,
      latency: fw.endpoints?.[current.key]?.latencyAvgMs,
    }))
    .sort((a, b) => b.value - a.value);
  const max = Math.max(...rows.map((r) => r.value), 1);

  return (
    <div className="not-prose">
      {showTabs && (
        <div className="mb-6 flex flex-wrap gap-1 rounded-lg border border-fd-border bg-fd-card p-1">
          {endpointEntries.map((e, idx) => (
            <button
              key={e.key}
              type="button"
              onClick={() => setActive(idx)}
              className={cn(
                'rounded-md px-3 py-1.5 font-mono text-xs transition-colors',
                idx === active
                  ? 'bg-fd-primary text-fd-primary-foreground'
                  : 'text-fd-muted-foreground hover:text-fd-foreground',
              )}
            >
              {e.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {rows.map((row, idx) => (
          <div key={row.key} className="flex items-center gap-3">
            <span className="flex w-44 shrink-0 flex-wrap items-center gap-1.5 text-sm font-medium text-fd-foreground">
              {row.label}
              {idx === 0 && (
                <span className="shrink-0 rounded-full bg-fd-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fd-primary">
                  fastest
                </span>
              )}
            </span>
            <div className="h-7 flex-1 overflow-hidden rounded bg-fd-muted">
              <div
                className={cn(
                  'h-full rounded transition-[width] duration-500 ease-out',
                  row.key === 'codexa'
                    ? 'bg-gradient-to-r from-fd-primary to-emerald-400'
                    : 'bg-fd-muted-foreground/40',
                )}
                style={{ width: `${(row.value / max) * 100}%` }}
              />
            </div>
            <span className="w-28 shrink-0 text-right font-mono text-sm text-fd-foreground">
              {Math.round(row.value).toLocaleString()} req/s
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function cleanCpuName(cpu: string) {
  return cpu.replace(/\((R|TM)\)/g, '').replace(/\s+/g, ' ').trim();
}

export function BenchmarkMeta() {
  const [open, setOpen] = useState(false);

  const items = [
    { label: 'Generated', value: new Date(data.generatedAt).toLocaleDateString() },
    { label: 'CPU', value: cleanCpuName(data.env.cpu) },
    { label: 'Cores', value: String(data.env.cores) },
    { label: 'Connections', value: String(data.config.connections) },
    { label: 'Duration', value: `${data.config.duration}s per endpoint` },
    { label: 'Warmup', value: `${data.config.warmup}s (discarded)` },
  ];

  return (
    <div className="not-prose mt-8 border-t border-fd-border pt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground"
      >
        <ChevronDown
          className={cn('size-4 transition-transform', open && 'rotate-180')}
        />
        Environment details
      </button>

      {open && (
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.label}>
              <dt className="text-xs uppercase tracking-wide text-fd-muted-foreground">
                {item.label}
              </dt>
              <dd className="text-fd-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
