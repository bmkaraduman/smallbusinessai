import { Icon } from "../icons";

export function PageHeading({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-white">
          {title}
        </h1>
        {subtitle && <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function StatTile({
  label,
  value,
  delta,
  trend,
  good,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  /** Whether the movement is a good thing — decides the colour, not the arrow. */
  good?: boolean;
}) {
  const TrendIcon = trend === "down" ? Icon.trendDown : Icon.trendUp;
  return (
    <div className="card p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-bold tabular-nums text-white">
        {value}
      </p>
      {delta && (
        <p
          className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${
            good === false ? "text-red-400" : "text-wa-400"
          }`}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          {delta}
        </p>
      )}
    </div>
  );
}

export function Panel({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`card p-5 ${className}`}>
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-sm font-semibold text-white">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon.star
          key={n}
          className={`h-3.5 w-3.5 ${
            n <= rating ? "text-amber-400" : "text-ink-600"
          }`}
        />
      ))}
    </span>
  );
}

export function Avatar({ initials }: { initials: string }) {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-700 text-xs font-bold text-slate-300">
      {initials}
    </span>
  );
}

/** Simple SVG sparkline — no chart library needed. */
export function Sparkline({ data }: { data: number[] }) {
  const width = 100;
  const height = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / span) * (height - 4) - 2;
    return `${x},${y}`;
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-16 w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label={`${data[0]} → ${data[data.length - 1]}`}
    >
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF7A2F" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF7A2F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points.join(" ")} ${width},${height}`}
        fill="url(#spark)"
      />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="#FF7A2F"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Stacked bar chart: direct orders versus platform orders. */
export function OrdersChart({
  data,
  directLabel,
  platformLabel,
}: {
  data: { day: string; direct: number; platform: number }[];
  directLabel: string;
  platformLabel: string;
}) {
  const max = Math.max(...data.map((d) => d.direct + d.platform));
  // Fixed pixel track: percentage heights need a definite parent height, which
  // a flex-1 column inside an items-end row does not provide.
  const TRACK = 132;

  return (
    <div>
      <div className="flex items-end gap-2">
        {data.map((entry) => {
          const directPx = Math.round((entry.direct / max) * TRACK);
          const platformPx = Math.round((entry.platform / max) * TRACK);
          return (
            <div key={entry.day} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="flex w-full flex-col justify-end gap-0.5"
                style={{ height: TRACK }}
              >
                <div
                  className="w-full rounded-t bg-ink-600"
                  style={{ height: platformPx }}
                  title={`${platformLabel}: ${entry.platform}`}
                />
                <div
                  className="w-full rounded-b bg-brand-400"
                  style={{ height: directPx }}
                  title={`${directLabel}: ${entry.direct}`}
                />
              </div>
              <span className="text-[11px] text-slate-500">{entry.day}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex gap-5 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-400" />
          {directLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-ink-600" />
          {platformLabel}
        </span>
      </div>
    </div>
  );
}
