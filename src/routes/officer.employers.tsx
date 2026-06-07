import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { officerNav } from "@/lib/nav";
import { officerUser } from "@/lib/mock";
import { Badge } from "@/components/ui-bits";

export const Route = createFileRoute("/officer/employers")({
  head: () => ({ meta: [{ title: "Employer oversight — MYFutureJobs" }] }),
  component: Page,
});

const list = [
  { c: "Petronas Digital", v: 14, b: 88, st: "Tier 1", tone: "success" as const },
  { c: "Acme Sdn Bhd", v: 5, b: 52, st: "Bias risk", tone: "danger" as const },
  { c: "Zenith Logistics", v: 8, b: 70, st: "Low conversion", tone: "warning" as const },
  { c: "Sunray Manufacturing", v: 3, b: 76, st: "License expiring", tone: "warning" as const },
  { c: "Astro Malaysia", v: 11, b: 82, st: "Active", tone: "default" as const },
];

function Page() {
  return (
    <AppShell nav={officerNav} user={officerUser}>
      <div className="mb-6">
        <h1 className="text-[28px] font-700 tracking-tight">Employer oversight</h1>
        <p className="mt-1 text-sm text-muted-foreground">86 employers monitored · 3 flagged</p>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-border bg-card shadow-card">
        <table className="w-full text-[13px]">
          <thead className="bg-inset text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-4 py-3 text-left">Company</th><th className="text-right px-4">Active vacancies</th><th className="text-right px-4">Avg. JD score</th><th className="text-left px-4">Status</th><th></th></tr>
          </thead>
          <tbody>
            {list.map((e) => (
              <tr key={e.c} className="border-t border-border">
                <td className="px-4 py-3 font-600">{e.c}</td>
                <td className="px-4 text-right num">{e.v}</td>
                <td className="px-4 text-right num font-600 text-emphasis">{e.b}</td>
                <td className="px-4"><Badge tone={e.tone}>{e.st}</Badge></td>
                <td className="px-4 py-3 text-right"><button className="text-[12px] font-600 text-primary">Open →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
