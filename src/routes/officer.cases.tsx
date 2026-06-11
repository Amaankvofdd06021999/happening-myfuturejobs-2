import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { officerNav } from "@/lib/nav";
import { officerUser } from "@/lib/mock";
import { Badge, SectionTitle } from "@/components/ui-bits";
import { Search, Filter, AlertCircle, User, Briefcase } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/officer/cases")({
  head: () => ({ meta: [{ title: "Action Required - Cases — MYFutureJobs" }] }),
  component: Page,
});

const cases = [
  { n: "Ahmad Faiz", ic: "990412-10-xxxx", role: "Software Engineer", c: 42, a: "21d", st: "ATS · No callbacks", s: 38, action: "CV Review needed", tone: "danger" as const },
  { n: "Wei Ling Chong", ic: "950618-08-xxxx", role: "Marketing Manager", c: 68, a: "7d", st: "ATS · 2 interviews", s: 54, action: "Follow-up required", tone: "warning" as const },
  { n: "R. Murugan", ic: "880123-14-xxxx", role: "Data Analyst", c: 81, a: "2d", st: "Hired · onboarding", s: 72, action: "Complete onboarding", tone: "success" as const },
  { n: "Siti Nadiah", ic: "970305-11-xxxx", role: "HR Executive", c: 55, a: "10d", st: "ATS · KIV stage", s: 61, action: "Skills assessment", tone: "warning" as const },
  { n: "Lim Wei Jian", ic: "920917-07-xxxx", role: "Product Designer", c: 90, a: "1d", st: "ATS · Active", s: 78, action: "Interview prep", tone: "success" as const },
];

function Page() {
  const handleAction = (name: string, action: string) => {
    toast.success(`Action initiated for ${name}`, {
      description: `Processing: ${action}`
    });
  };

  return (
    <AppShell nav={officerNav} user={officerUser}>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-warning" />
          <h1 className="text-[28px] font-700 tracking-tight">Action Required Cases</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">248 active · 12 require immediate attention</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
          <input placeholder="Search name, IC or role…" className="h-10 w-72 rounded-[10px] border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary"/>
        </label>
        <button className="inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-border bg-card px-3 text-sm font-600">
          <Briefcase className="h-4 w-4"/> Role: All
        </button>
        <button className="inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-border bg-card px-3 text-sm font-600">
          <Filter className="h-4 w-4"/> Priority: High
        </button>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-border bg-card shadow-card">
        <table className="w-full text-[13px]">
          <thead className="bg-inset text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5"/> Jobseeker
                </div>
              </th>
              <th className="px-4 py-3 text-left">IC</th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5"/> Role Applied
                </div>
              </th>
              <th className="px-4 py-3 text-right">Complete %</th>
              <th className="px-4 py-3 text-left">Last Active</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5"/> Action Required
                </div>
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.n} className="border-t border-border hover:bg-inset transition-colors">
                <td className="px-4 py-3 font-600">{c.n}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.ic}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-[12px]">
                    <Briefcase className="h-3.5 w-3.5 text-muted-foreground"/>
                    {c.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-2 bg-inset rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          c.c >= 80 ? 'bg-success' : c.c >= 50 ? 'bg-warning' : 'bg-danger'
                        }`}
                        style={{ width: `${c.c}%` }}
                      />
                    </div>
                    <span className="num text-[11px] font-600">{c.c}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{c.a}</td>
                <td className="px-4 py-3"><Badge tone={c.tone}>{c.st}</Badge></td>
                <td className="px-4 py-3">
                  <Badge tone={c.tone === "danger" ? "danger" : c.tone === "warning" ? "warning" : "primary"}>
                    <AlertCircle className="h-3 w-3"/> {c.action}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleAction(c.n, c.action)}
                    className="text-[12px] font-600 text-primary hover:underline"
                  >
                    Take Action →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
