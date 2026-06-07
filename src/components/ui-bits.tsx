import { type ReactNode } from "react";

export function KPITile({
  label,
  value,
  delta,
  emphasis = false,
  icon,
  gradient = false,
}: {
  label: string;
  value: string;
  delta?: string;
  emphasis?: boolean;
  icon?: ReactNode;
  gradient?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[10px] border border-border p-5 shadow-card ${
        gradient ? "grad-orange text-white" : "bg-card"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={`text-[12px] font-600 uppercase tracking-wide ${gradient ? "text-white/90" : "text-muted-foreground"}`}>
          {label}
        </div>
        {icon && (
          <span className={`flex h-8 w-8 items-center justify-center rounded-[8px] ${gradient ? "bg-white/15 text-white" : emphasis ? "bg-emphasis-soft text-emphasis" : "bg-primary-soft text-primary"}`}>
            {icon}
          </span>
        )}
      </div>
      <div
        className={`num mt-3 text-[34px] font-600 leading-none ${
          gradient ? "text-white" : emphasis ? "text-emphasis" : "text-foreground"
        }`}
      >
        {value}
      </div>
      {delta && (
        <div className={`mt-2 text-[12px] ${gradient ? "text-white/90" : "text-muted-foreground"}`}>{delta}</div>
      )}
    </div>
  );
}

export function ScoreCard({
  value,
  band,
  max = 100,
  label = "Career Signal Score",
}: {
  value: number;
  band: string;
  max?: number;
  label?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const c = `var(--emphasis)`;
  return (
    <div className="rounded-[10px] border border-border bg-card p-6 shadow-card">
      <div className="text-[12px] font-600 uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-4 flex items-end gap-4">
        <div className="num text-[64px] font-600 leading-none text-emphasis">{value}</div>
        <div className="pb-2">
          <div className="text-[14px] font-600">{band}</div>
          <div className="text-[12px] text-muted-foreground">vs market peers</div>
        </div>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-inset">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c }} />
      </div>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wide text-muted-foreground">
        <span>Emerging</span><span>Competitive</span><span>Strong</span><span>Elite</span>
      </div>
    </div>
  );
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "primary" | "emphasis" | "success" | "warning" | "danger" | "ai" }) {
  const tones: Record<string, string> = {
    default: "bg-inset text-muted-foreground",
    primary: "bg-primary-soft text-primary",
    emphasis: "bg-emphasis-soft text-emphasis",
    ai: "bg-emphasis-soft text-emphasis",
    success: "bg-[color-mix(in_oklab,var(--success)_14%,transparent)] text-[var(--success)]",
    warning: "bg-[color-mix(in_oklab,var(--warning)_14%,transparent)] text-[var(--warning)]",
    danger: "bg-[color-mix(in_oklab,var(--danger)_14%,transparent)] text-[var(--danger)]",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-600 ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function SectionTitle({ title, kicker, action }: { title: string; kicker?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {kicker && <div className="mb-1 text-[11px] font-600 uppercase tracking-wider text-emphasis">{kicker}</div>}
        <h2 className="text-[20px] font-600 tracking-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}
