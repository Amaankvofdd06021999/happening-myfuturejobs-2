import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AIPanel } from "@/components/AIPanel";
import { officerNav } from "@/lib/nav";
import { officerUser } from "@/lib/mock";
import { KPITile, SectionTitle, Badge } from "@/components/ui-bits";
import { Users, Building2, FileText, Sparkles, AlertTriangle, MapPin, Download, MessageSquare, Bell, TrendingUp, Activity, BookOpen, Target } from "lucide-react";
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
        <h1 className="text-[28px] font-700 tracking-tight">My Case Metrics</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleKPIClick("My Active Cases")}>
          <KPITile label="My Active Cases" value="42" delta="+3 assigned today" icon={<Users className="h-4 w-4"/>} className="cursor-pointer transition-shadow hover:shadow-hero"/>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleKPIClick("Cases Pending Review")}>
          <KPITile label="Cases Pending Review" value="8" delta="2 urgent" icon={<Building2 className="h-4 w-4"/>} className="cursor-pointer transition-shadow hover:shadow-hero"/>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleKPIClick("Cases Closed This Month")}>
          <KPITile label="Cases Closed This Month" value="15" delta="+25% vs last month" icon={<FileText className="h-4 w-4"/>} className="cursor-pointer transition-shadow hover:shadow-hero"/>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleKPIClick("Intervention success")}>
          <KPITile label="Intervention success" value="71%" delta="vs 64% national" emphasis gradient icon={<Sparkles className="h-4 w-4"/>} className="cursor-pointer transition-shadow hover:shadow-hero"/>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <SectionTitle title="My Assigned Cases — Requiring Action" action={<Link to="/officer/cases" className="text-sm font-600 text-primary">View all cases →</Link>}/>
          <div className="overflow-hidden rounded-[10px] border border-border">
            <table className="w-full text-[13px]">
              <thead className="bg-inset text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2.5 text-left">Case Name</th>
                  <th className="px-3 py-2.5 text-left">Stage</th>
                  <th className="px-3 py-2.5 text-right">Days Active</th>
                  <th className="px-3 py-2.5 text-right">Progress</th>
                  <th className="px-3 py-2.5 text-right">Priority</th>
                  <th className="px-3 py-2.5 text-left">Action Needed</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: "Ahmad Faiz", r: "Assessment", c: 21, a: "42%", s: "High", st: "Schedule meeting", tone: "danger" as const },
                  { n: "Wei Ling Chong", r: "Training", c: 14, a: "68%", s: "Medium", st: "Review progress", tone: "warning" as const },
                  { n: "R. Murugan", r: "Job Matching", c: 7, a: "81%", s: "Low", st: "Follow up", tone: "success" as const },
                  { n: "Siti Nadiah", r: "Counseling", c: 35, a: "55%", s: "High", st: "Intervention", tone: "warning" as const },
                ].map((c) => (
                  <tr key={c.n} className="border-t border-border hover:bg-inset transition-colors cursor-pointer group" onClick={() => handleCaseAction(c.n, "Viewing case details")}>
                    <td className="px-3 py-2.5 font-600 group-hover:text-primary transition-colors">{c.n}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{c.r}</td>
                    <td className="px-3 py-2.5 text-right num">{c.c}</td>
                    <td className="px-3 py-2.5 text-right text-muted-foreground">{c.a}</td>
                    <td className="px-3 py-2.5 text-right">
                      <Badge tone={c.s === "High" ? "danger" : c.s === "Medium" ? "warning" : "success"}>{c.s}</Badge>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <Badge tone={c.tone}>{c.st}</Badge>
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.success("Sending message", { description: `Opening chat with ${c.n}` });
                            }}
                            className="p-1 hover:bg-primary-soft rounded transition-all"
                          >
                            <MessageSquare className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info("Setting reminder", { description: `Reminder set for ${c.n}` });
                            }}
                            className="p-1 hover:bg-warning-soft rounded transition-all"
                          >
                            <Bell className="h-3 w-3 text-muted-foreground group-hover:text-warning transition-colors" />
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
          <SectionTitle title="Case Lifecycle Overview"/>
          <ul className="space-y-2">
            {[
              { c: "Initial Assessment", w: "8 cases - Average 3 days", icon: <Activity className="h-4 w-4" />, color: "primary" },
              { c: "Active Counseling", w: "15 cases - Average 14 days", icon: <MessageSquare className="h-4 w-4" />, color: "warning" },
              { c: "Training Programs", w: "12 cases - Average 30 days", icon: <BookOpen className="h-4 w-4" />, color: "success" },
              { c: "Job Placement", w: "7 cases - Average 10 days", icon: <Target className="h-4 w-4" />, color: "emphasis" },
            ].map((e) => (
              <motion.li
                key={e.c}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-start gap-3 rounded-[10px] border border-border p-3 text-[13px] cursor-pointer transition-all hover:bg-inset hover:border-primary group"
                onClick={() => handleCaseAction(e.c, "Viewing stage details")}
              >
                <div className={`mt-0.5 text-${e.color}`}>{e.icon}</div>
                <div className="flex-1">
                  <div className="font-600 group-hover:text-primary transition-colors">{e.c}</div>
                  <div className="text-[12px] text-muted-foreground">{e.w}</div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success("Report generated", { description: `Downloading compliance report` });
                    }}
                    className="p-1.5 hover:bg-background rounded-lg transition-colors"
                  >
                    <Download className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.info("Contact initiated", { description: `Opening communication channel` });
                    }}
                    className="p-1.5 hover:bg-background rounded-lg transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
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
