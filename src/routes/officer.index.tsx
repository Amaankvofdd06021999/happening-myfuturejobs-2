import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AIPanel } from "@/components/AIPanel";
import { officerNav } from "@/lib/nav";
import { officerUser } from "@/lib/mock";
import { KPITile, SectionTitle, Badge } from "@/components/ui-bits";
import { Users, Building2, FileText, Sparkles, AlertTriangle, MapPin, Download, MessageSquare, Bell } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/officer/")({
  head: () => ({ meta: [{ title: "Case Officer dashboard — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  const [selectedResearch, setSelectedResearch] = useState<string | null>(null);

  const handleKPIClick = (label: string) => {
    toast.info(`Viewing details`, {
      description: `Opening detailed view for ${label}`,
    });
  };

  const handleCaseAction = (name: string, action: string) => {
    toast.success(`Action taken`, {
      description: `${action} for ${name}`,
    });
  };

  const handleEmployerFlag = (company: string) => {
    toast.warning(`Employer flagged`, {
      description: `Review needed for ${company}`,
    });
  };

  const handleResearchSuggestion = (study: string) => {
    setSelectedResearch(study);
    toast.info(`Research queued`, {
      description: study,
    });
  };

  return (
    <AppShell
      nav={officerNav}
      user={officerUser}
      rightPanel={
        <AIPanel
          title="Research Assistant"
          subtitle="Suggested studies"
          why={<p>Suggestions derived from caseload anomalies and unanswered queries from the last 14 days.</p>}
        >
          <div className="space-y-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-[10px] bg-emphasis-soft p-3 cursor-pointer"
              onClick={() => toast.success("Opening Research Hub", {
                description: "Loading market intelligence data..."
              })}
            >
              <div className="text-[11px] font-600 uppercase tracking-wider text-emphasis">Trending in Klang</div>
              <p className="mt-1 text-[12px]">Electrical & Electronics demand up 38% — recommend an LMI brief.</p>
              <Link to="/officer/research" className="mt-2 inline-flex h-8 items-center rounded-[8px] grad-orange px-3 text-[12px] font-600 text-white hover:opacity-90 transition-opacity">Open Research Hub →</Link>
            </motion.div>
            {[
              "Skill gap analysis · Logistics · Northern region",
              "F&B turnover & wage benchmark · Klang Valley",
              "Youth NEET pipeline study · ages 18–24",
            ].map((s) => (
              <motion.div
                key={s}
                whileHover={{ scale: 1.02, borderColor: "var(--primary)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleResearchSuggestion(s)}
                className={`rounded-[10px] border border-border p-3 text-[12px] cursor-pointer transition-all hover:border-primary hover:bg-primary-soft ${selectedResearch === s ? 'border-primary bg-primary-soft' : ''}`}
              >
                {s}
              </motion.div>
            ))}
          </div>
        </AIPanel>
      }
    >
      <div className="mb-6">
        <div className="text-[12px] font-600 uppercase tracking-wider text-emphasis">PERKESO · Klang branch</div>
        <h1 className="text-[28px] font-700 tracking-tight">Caseload overview</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleKPIClick("Active jobseeker cases")}>
          <KPITile label="Active jobseeker cases" value="248" delta="+12 this week" icon={<Users className="h-4 w-4"/>} className="cursor-pointer transition-shadow hover:shadow-hero"/>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleKPIClick("Employers monitored")}>
          <KPITile label="Employers monitored" value="86" delta="3 flagged" icon={<Building2 className="h-4 w-4"/>} className="cursor-pointer transition-shadow hover:shadow-hero"/>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleKPIClick("Reports generated")}>
          <KPITile label="Reports generated" value="22" delta="Last 30 days" icon={<FileText className="h-4 w-4"/>} className="cursor-pointer transition-shadow hover:shadow-hero"/>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleKPIClick("Intervention success")}>
          <KPITile label="Intervention success" value="71%" delta="vs 64% national" emphasis gradient icon={<Sparkles className="h-4 w-4"/>} className="cursor-pointer transition-shadow hover:shadow-hero"/>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <SectionTitle title="Jobseeker cases — needs action" action={<Link to="/officer/cases" className="text-sm font-600 text-primary">View all →</Link>}/>
          <div className="overflow-hidden rounded-[10px] border border-border">
            <table className="w-full text-[13px]">
              <thead className="bg-inset text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2.5 text-left">Jobseeker</th>
                  <th className="px-3 py-2.5 text-left">Region</th>
                  <th className="px-3 py-2.5 text-right">Completeness</th>
                  <th className="px-3 py-2.5 text-right">Activity</th>
                  <th className="px-3 py-2.5 text-right">Signal</th>
                  <th className="px-3 py-2.5 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: "Ahmad Faiz", r: "Klang", c: 42, a: "Inactive 21d", s: 38, st: "At risk", tone: "danger" as const },
                  { n: "Wei Ling Chong", r: "Subang", c: 68, a: "Low", s: 54, st: "Needs review", tone: "warning" as const },
                  { n: "R. Murugan", r: "Shah Alam", c: 81, a: "Active", s: 72, st: "On track", tone: "success" as const },
                  { n: "Siti Nadiah", r: "Klang", c: 55, a: "Med", s: 61, st: "Coach", tone: "warning" as const },
                ].map((c) => (
                  <tr key={c.n} className="border-t border-border hover:bg-inset transition-colors cursor-pointer group" onClick={() => handleCaseAction(c.n, "Viewing case details")}>
                    <td className="px-3 py-2.5 font-600 group-hover:text-primary transition-colors">{c.n}</td>
                    <td className="px-3 py-2.5 text-muted-foreground"><span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3"/>{c.r}</span></td>
                    <td className="px-3 py-2.5 text-right num">{c.c}%</td>
                    <td className="px-3 py-2.5 text-right text-muted-foreground">{c.a}</td>
                    <td className="px-3 py-2.5 text-right num font-600 text-emphasis">{c.s}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <Badge tone={c.tone}>{c.st}</Badge>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.success("Sending message", { description: `Opening chat with ${c.n}` });
                            }}
                            className="p-1 hover:bg-primary-soft rounded"
                          >
                            <MessageSquare className="h-3 w-3 text-primary" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info("Setting reminder", { description: `Reminder set for ${c.n}` });
                            }}
                            className="p-1 hover:bg-warning-soft rounded"
                          >
                            <Bell className="h-3 w-3 text-warning" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <SectionTitle title="Employer oversight flags"/>
          <ul className="space-y-2">
            {[
              { c: "Acme Sdn Bhd", w: "JD bias score below 50 (3 vacancies)" },
              { c: "Zenith Logistics", w: "0 interviews after 60 applicants" },
              { c: "Sunray Manufacturing", w: "License expiring in 14 days" },
            ].map((e) => (
              <motion.li
                key={e.c}
                whileHover={{ scale: 1.02, borderColor: "var(--warning)" }}
                whileTap={{ scale: 0.98 }}
                className="flex items-start gap-2 rounded-[10px] border border-border p-3 text-[13px] cursor-pointer transition-all hover:bg-warning-soft hover:border-warning group"
                onClick={() => handleEmployerFlag(e.c)}
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 text-[var(--warning)] group-hover:animate-pulse"/>
                <div className="flex-1">
                  <div className="font-600 group-hover:text-warning transition-colors">{e.c}</div>
                  <div className="text-[12px] text-muted-foreground">{e.w}</div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success("Report generated", { description: `Downloading compliance report for ${e.c}` });
                    }}
                    className="p-1.5 hover:bg-background rounded-lg transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.info("Contact initiated", { description: `Opening communication channel with ${e.c}` });
                    }}
                    className="p-1.5 hover:bg-background rounded-lg transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
