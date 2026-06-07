import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { officerNav } from "@/lib/nav";
import { officerUser } from "@/lib/mock";
import { Badge, SectionTitle } from "@/components/ui-bits";
import { Search, Filter } from "lucide-react";

export const Route = createFileRoute("/officer/cases")({
  head: () => ({ meta: [{ title: "Jobseeker cases — MYFutureJobs" }] }),
  component: Page,
});

const cases = [
  { n: "Ahmad Faiz", ic: "990412-10-xxxx", r: "Klang", c: 42, a: "21d", st: "ATS · No callbacks", s: 38, tone: "danger" as const },
  { n: "Wei Ling Chong", ic: "950618-08-xxxx", r: "Subang", c: 68, a: "7d", st: "ATS · 2 interviews", s: 54, tone: "warning" as const },
  { n: "R. Murugan", ic: "880123-14-xxxx", r: "Shah Alam", c: 81, a: "2d", st: "Hired · onboarding", s: 72, tone: "success" as const },
  { n: "Siti Nadiah", ic: "970305-11-xxxx", r: "Klang", c: 55, a: "10d", st: "ATS · KIV stage", s: 61, tone: "warning" as const },
  { n: "Lim Wei Jian", ic: "920917-07-xxxx", r: "Petaling", c: 90, a: "1d", st: "ATS · Active", s: 78, tone: "success" as const },
];

function Page() {
  return (
    <AppShell nav={officerNav} user={officerUser}>
      <div className="mb-6">
        <h1 className="text-[28px] font-700 tracking-tight">Jobseeker cases</h1>
        <p className="mt-1 text-sm text-muted-foreground">248 active · 12 require attention</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
          <input placeholder="Search name or IC…" className="h-10 w-72 rounded-[10px] border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary"/>
        </label>
        <button className="inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-border bg-card px-3 text-sm font-600"><Filter className="h-4 w-4"/> Region: Klang</button>
        <button className="inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-border bg-card px-3 text-sm font-600">Status: At risk</button>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-border bg-card shadow-card">
        <table className="w-full text-[13px]">
          <thead className="bg-inset text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Jobseeker</th>
              <th className="px-4 py-3 text-left">IC</th>
              <th className="px-4 py-3 text-left">Region</th>
              <th className="px-4 py-3 text-right">Completeness</th>
              <th className="px-4 py-3 text-left">Last active</th>
              <th className="px-4 py-3 text-left">ATS</th>
              <th className="px-4 py-3 text-right">Signal</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.n} className="border-t border-border hover:bg-inset">
                <td className="px-4 py-3 font-600">{c.n}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.ic}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.r}</td>
                <td className="px-4 py-3 text-right num">{c.c}%</td>
                <td className="px-4 py-3 text-muted-foreground">{c.a}</td>
                <td className="px-4 py-3"><Badge tone={c.tone}>{c.st}</Badge></td>
                <td className="px-4 py-3 text-right num font-600 text-emphasis">{c.s}</td>
                <td className="px-4 py-3 text-right"><button className="text-[12px] font-600 text-primary">Open case →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
