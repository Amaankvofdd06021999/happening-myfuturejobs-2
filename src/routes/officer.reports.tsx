import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { officerNav } from "@/lib/nav";
import { officerUser } from "@/lib/mock";
import { KPITile, SectionTitle, Badge } from "@/components/ui-bits";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/officer/reports")({
  head: () => ({ meta: [{ title: "Reports — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  const reports = [
    { t: "Klang Valley E&E Demand · Q1 2026", d: "Feb 8, 2026", k: "LMI" },
    { t: "Youth NEET Pipeline Study", d: "Feb 1, 2026", k: "Cohort" },
    { t: "F&B Wage Benchmark", d: "Jan 26, 2026", k: "Wage" },
    { t: "Northern Logistics Skills Gap", d: "Jan 18, 2026", k: "Skills" },
  ];
  return (
    <AppShell nav={officerNav} user={officerUser}>
      <div className="mb-6">
        <h1 className="text-[28px] font-700 tracking-tight">Reports library</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPITile label="Total reports" value="22" delta="Last 30 days"/>
        <KPITile label="Distributed" value="14" delta="To branch heads"/>
        <KPITile label="Pending review" value="3" delta="Awaiting QA" emphasis/>
        <KPITile label="Public-ready" value="5" delta="Cleared for release"/>
      </div>

      <div className="mt-6 space-y-2">
        {reports.map((r) => (
          <div key={r.t} className="flex items-center gap-4 rounded-[12px] border border-border bg-card p-4 shadow-card">
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary-soft text-primary"><FileText className="h-5 w-5"/></span>
            <div className="flex-1">
              <div className="text-[14px] font-600">{r.t}</div>
              <div className="text-[12px] text-muted-foreground">{r.d}</div>
            </div>
            <Badge tone="primary">{r.k}</Badge>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-[8px] border border-border px-3 text-[12px] font-600"><Download className="h-3.5 w-3.5"/> PDF</button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
