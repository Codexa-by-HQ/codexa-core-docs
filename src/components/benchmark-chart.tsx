'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import resultsData from '@/data/benchmark-results.json';
import { cn } from '@/lib/cn';

interface EndpointStat {
  requestsPerSecAvg?: number;
  latencyAvgMs?: number;
  latencyP99Ms?: number;
  requestsPerSecMin?: number;
  requestsPerSecMax?: number;
  cvPercent?: number;
  clientWarningRuns?: number;
  error?: string;
}

interface FrameworkResult {
  key: string;
  label: string;
  version: string | Record<string, string | undefined>;
  endpoints?: Record<string, EndpointStat>;
  error?: string;
}

const data = resultsData as {
  generatedAt: string;
  env: { os: string; cpu: string; cores: number };
  config: { connections: number; duration: number; warmup: number; rounds?: number };
  artifact?: string;
  provenance?: { frameworks: Record<string, string>; thunder: { revision: string } };
  audit?: { clientWarningSamples: number; samples: number; totalRequests: number };
  controls?: { workload: string; driftPercent: number; divergedOver10Percent: boolean }[];
  endpoints: string[];
  endpointKeys: string[];
  results: FrameworkResult[];
};

export function BenchmarkChart({
  excludeKeys = ['deno-control'],
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
      p99: fw.endpoints?.[current.key]?.latencyP99Ms,
      min: fw.endpoints?.[current.key]?.requestsPerSecMin,
      max: fw.endpoints?.[current.key]?.requestsPerSecMax,
      cv: fw.endpoints?.[current.key]?.cvPercent,
    }))
    .sort((a, b) => b.value - a.value);
  const max = Math.max(...rows.map((r) => r.value), 1);

  return (
    <div className="not-prose">
      {data.audit && data.audit.clientWarningSamples > 0 && (
        <p className="mb-4 rounded-lg border border-fd-border bg-fd-card p-3 text-xs text-fd-muted-foreground">
          Client CPU crossed the warning threshold in {data.audit.clientWarningSamples}/{data.audit.samples} samples.
          Treat these as local stack measurements; close differences may be noise.
        </p>
      )}
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

      <p className="mb-4 text-xs text-fd-muted-foreground">
        Median completed responses per second across {data.config.rounds ?? 3} rounds.
        Each row includes the run range, median per-run p99, and throughput variation (CV).
        Rates include framework and runtime overhead.
      </p>
      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center gap-3">
            <span className="flex w-36 shrink-0 sm:w-44 flex-wrap items-center gap-1.5 text-sm font-medium text-fd-foreground">
              {row.label}
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
            <span className="w-24 shrink-0 text-right font-mono text-sm text-fd-foreground">
              {Math.round(row.value).toLocaleString('en-US')} req/s
              {row.p99 !== undefined && (
                <span className="block text-[11px] text-fd-muted-foreground">
                  p99 {row.p99.toFixed(1)} ms · CV {row.cv?.toFixed(1)}%
                </span>
              )}
              {row.min !== undefined && row.max !== undefined && (
                <span className="block text-[10px] text-fd-muted-foreground">
                  {Math.round(row.min).toLocaleString('en-US')}–{Math.round(row.max).toLocaleString('en-US')}
                </span>
              )}
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
    { label: 'Generated', value: new Date(data.generatedAt).toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' }) },
    { label: 'CPU', value: cleanCpuName(data.env.cpu) },
    { label: 'Cores', value: String(data.env.cores) },
    { label: 'Connections', value: String(data.config.connections) },
    { label: 'Duration', value: `${data.config.duration}s per endpoint` },
    { label: 'Warmup', value: `${data.config.warmup}s (discarded)` },
    { label: 'Rounds', value: String(data.config.rounds ?? 3) },
    { label: 'Artifact', value: data.artifact ?? 'Historical published package' },
    ...data.results.filter((result) => !['deno', 'deno-control'].includes(result.key)).map((result) => ({ label: result.label, value: result.key === 'thunder' ? `commit ${data.provenance?.thunder.revision}` : result.key === 'hono' ? `hono@${data.provenance?.frameworks.hono}` : typeof result.version === 'string' ? result.version : Object.entries(result.version).map(([name, version]) => `${name}: ${version}`).join(', ') })),
    ...(data.audit ? [{ label: 'Validated responses', value: data.audit.totalRequests.toLocaleString('en-US') }, { label: 'Client CPU warning samples', value: `${data.audit.clientWarningSamples}/${data.audit.samples}` }] : []),
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
