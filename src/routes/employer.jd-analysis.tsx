import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AIPanel } from "@/components/AIPanel";
import { employerNav } from "@/lib/nav";
import { employerUser } from "@/lib/mock";
import { ScoreCard, Badge, SectionTitle, KPITile } from "@/components/ui-bits";
import { Sparkles, DollarSign, Check, X, TrendingUp, AlertTriangle, CheckCircle2, Info, Globe, Users, Target } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/employer/jd-analysis")({
  head: () => ({ meta: [{ title: "JD Analysis — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell
      nav={employerNav}
      user={employerUser}
      rightPanel={
        <AIPanel
          title="Hiring Assistant"
          subtitle="JD critique"
          why={<p>JD score combines clarity, specificity, market-alignment of skills, and inclusivity of language. Benchmarked against 1,840 recently filled JDs in the same role family.</p>}
        >
          <div className="space-y-3 text-[12px]">
            <div className="rounded-[10px] bg-emphasis-soft p-3">
              <div className="font-600 text-emphasis">Top 3 fixes</div>
              <ol className="mt-2 list-decimal space-y-1 pl-4">
                <li>Quantify the team size and stack</li>
                <li>Move "5+ years" from must to preferred</li>
                <li>Swap "ninja" for "skilled" (gender-coded)</li>
              </ol>
            </div>
            <button className="inline-flex h-9 w-full items-center justify-center rounded-[10px] grad-orange text-[12px] font-600 text-white">
              Accept improved JD
            </button>
          </div>
        </AIPanel>
      }
    >
      <div className="mb-6">
        <div className="text-[12px] font-600 uppercase tracking-wider text-emphasis">AI-Powered Job Description Optimization</div>
        <h1 className="text-[28px] font-700 tracking-tight">SAP S/4HANA Programme Director</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">Management Consulting • Senior Leadership Role</p>
      </div>

      <div className="mb-4 rounded-[12px] border border-warning bg-warning-soft p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
          <div className="flex-1">
            <div className="font-600 text-[14px]">Re-Analyze with AI (saves to JD Store)</div>
            <p className="text-[12px] text-muted-foreground mt-1">AI will detect bias, suggest improvements, and benchmark against market data</p>
          </div>
          <button
            onClick={() => toast.success("Analyzing JD with AI...", { description: "This will take a few seconds" })}
            className="inline-flex h-8 items-center rounded-[8px] grad-orange px-4 text-[12px] font-600 text-white hover:opacity-90"
          >
            Re-Analyze
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-600 text-muted-foreground">Overall Score</span>
            <Badge tone="success">8.0/10</Badge>
          </div>
          <div className="text-[36px] font-700 num text-emphasis">8.0</div>
          <div className="text-[12px] text-muted-foreground">Strong and highly attractive for senior SAP leaders</div>
        </div>
        <KPITile label="Salary Competitiveness" value="RM 18-22k" delta="Large performance bonus (40-60%)" icon={<DollarSign className="h-4 w-4"/>} emphasis />
        <KPITile label="Market Reach" value="High" delta="15+ years required" icon={<Globe className="h-4 w-4"/>}/>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Market Competitiveness */}
        <article className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <header className="mb-4 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <div className="font-600 text-[14px]">Market Competitiveness</div>
          </header>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
              <div className="flex-1">
                <div className="text-[12px] font-500">Clear senior leadership role</div>
                <div className="text-[11px] text-muted-foreground">Strategic client exposure</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
              <div className="flex-1">
                <div className="text-[12px] font-500">Competitive base salary</div>
                <div className="text-[11px] text-muted-foreground">RM 18k-22k plus large bonus</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
              <div className="flex-1">
                <div className="text-[12px] font-500">Strong benefits package</div>
                <div className="text-[11px] text-muted-foreground">Global mobility & sabbatical offerings</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                <div className="flex-1">
                  <div className="text-[12px] font-500 text-warning">Areas to Improve</div>
                  <ul className="mt-1 text-[11px] text-muted-foreground space-y-1">
                    <li>• High experience requirement (15+ years)</li>
                    <li>• Vague travel expectations</li>
                    <li>• No explicit visa/relocation support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Clarity Issues */}
        <article className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <header className="mb-4 flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            <div className="font-600 text-[14px]">Clarity Issues</div>
          </header>
          <div className="space-y-3">
            <div className="rounded-[8px] border border-warning bg-warning-soft p-3">
              <div className="text-[12px] font-600 text-warning mb-1">Vague Requirements</div>
              <div className="text-[11px] space-y-1">
                <p className="italic">"Deep hands-on experience"</p>
                <p>→ Quantify: number/type of projects</p>
              </div>
            </div>
            <div className="rounded-[8px] border border-warning bg-warning-soft p-3">
              <div className="text-[12px] font-600 text-warning mb-1">Missing Information</div>
              <ul className="text-[11px] space-y-0.5">
                <li>• Employment contract type not specified</li>
                <li>• Expected travel percentage unclear</li>
                <li>• Reporting line not mentioned</li>
              </ul>
            </div>
            <div className="rounded-[8px] bg-primary-soft border border-primary p-3">
              <div className="text-[12px] font-600 text-primary mb-1">Corporate Jargon</div>
              <div className="text-[11px]">
                <span className="font-500">RISE with SAP</span> • <span className="font-500">SAP BTP</span> • <span className="font-500">SAP Integration Suite</span>
              </div>
            </div>
          </div>
        </article>

        {/* Bias Detection */}
        <article className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <header className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <div className="font-600 text-[14px]">Bias Detection</div>
            <Badge tone="warning" className="ml-auto">Medium</Badge>
          </header>
          <div className="space-y-3">
            <div className="rounded-[8px] border border-danger bg-danger-soft p-3">
              <div className="text-[12px] font-600 mb-1">Gender-Coded Language</div>
              <div className="space-y-1">
                <div className="text-[11px]">
                  <span className="px-1.5 py-0.5 rounded bg-danger text-white">"exceptional leader"</span>
                  <span className="px-1.5 py-0.5 rounded bg-danger text-white ml-1">"world-class"</span>
                </div>
                <div className="text-[11px]">
                  <span className="px-1.5 py-0.5 rounded bg-danger text-white">"high-profile"</span>
                </div>
              </div>
            </div>
            <div className="rounded-[8px] border border-warning bg-warning-soft p-3">
              <div className="text-[12px] font-600 mb-1">Age Bias Indicators</div>
              <ul className="text-[11px] space-y-0.5">
                <li>• Minimum 15 years of experience</li>
                <li>• 5 years in senior leadership role</li>
              </ul>
            </div>
            <div className="rounded-[8px] border border-warning bg-warning-soft p-3">
              <div className="text-[12px] font-600 mb-1">Exclusionary Requirements</div>
              <div className="text-[11px]">
                Preference for top-tier consulting firms may exclude diverse talent
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <SectionTitle title="Skill matrix"/>
          <div className="space-y-2 text-[13px]">
            {[
              { t: "Go / Golang", v: "Required", tone: "primary" as const },
              { t: "PostgreSQL", v: "Required", tone: "primary" as const },
              { t: "Kubernetes", v: "Preferred", tone: "default" as const },
              { t: "Event-driven systems", v: "Hot · trending", tone: "emphasis" as const },
              { t: "Stakeholder mgmt", v: "Implicit", tone: "default" as const },
              { t: "Mentorship", v: "Typically missing — recommend adding", tone: "warning" as const },
            ].map((s) => (
              <div key={s.t} className="flex items-center justify-between rounded-[8px] border border-border px-3 py-2">
                <span>{s.t}</span>
                <Badge tone={s.tone}>{s.v}</Badge>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <SectionTitle title="Tracked changes"/>
          <ul className="space-y-2">
            {[
              { o: "energetic backend ninja", n: "skilled backend engineer", w: "Removes gender + age coding" },
              { o: "5+ years experience required", n: "3+ years required, 5+ preferred", w: "Widens talent pool by ~38%" },
              { o: "Salary negotiable", n: "RM 7,000 – 9,200 + bonus", w: "Transparent ranges lift application rate 2.1x" },
            ].map((e) => (
              <li key={e.o} className="rounded-[10px] border border-border p-3 text-[13px]">
                <div className="text-muted-foreground line-through decoration-[var(--danger)]/60">{e.o}</div>
                <div className="text-emphasis font-600">→ {e.n}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{e.w}</div>
                <div className="mt-2 flex justify-end gap-1.5">
                  <button className="inline-flex h-7 items-center gap-1 rounded-[6px] border border-border px-2 text-[11px]"><X className="h-3 w-3"/> Reject</button>
                  <button className="inline-flex h-7 items-center gap-1 rounded-[6px] bg-primary px-2 text-[11px] font-600 text-primary-foreground"><Check className="h-3 w-3"/> Accept</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
