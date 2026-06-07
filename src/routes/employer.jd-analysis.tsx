import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AIPanel } from "@/components/AIPanel";
import { employerNav } from "@/lib/nav";
import { employerUser } from "@/lib/mock";
import { ScoreCard, Badge, SectionTitle, KPITile } from "@/components/ui-bits";
import { Sparkles, DollarSign, Check, X, TrendingUp } from "lucide-react";

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
        <div className="text-[12px] font-600 uppercase tracking-wider text-emphasis">Hiring Assistant</div>
        <h1 className="text-[28px] font-700 tracking-tight">JD Analysis — Software Engineer (Backend)</h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
        <ScoreCard value={64} band="Needs work" label="JD Quality Score" />
        <KPITile label="Salary benchmark" value="RM 7.8k" delta="Range 6.5 – 9.2k · High confidence" icon={<DollarSign className="h-4 w-4"/>} emphasis />
        <KPITile label="Predicted applicants" value="180–240" delta="+85% if improved" icon={<TrendingUp className="h-4 w-4"/>}/>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <header className="mb-3 flex items-center justify-between">
            <div className="font-600">Original</div>
            <Badge tone="default">Score 64</Badge>
          </header>
          <div className="space-y-2 text-[13px] leading-relaxed text-muted-foreground">
            <p>We are looking for an energetic backend ninja with 5+ years of experience. Must be a rockstar coder and team player. Salary negotiable.</p>
            <p>Responsibilities: Build features, fix bugs, handle deployments. Other duties as assigned.</p>
          </div>
        </article>
        <article className="rounded-[12px] border border-emphasis bg-emphasis-soft/30 p-5 shadow-card">
          <header className="mb-3 flex items-center justify-between">
            <div className="font-600">AI-improved</div>
            <Badge tone="emphasis"><Sparkles className="h-3 w-3"/> Score 88</Badge>
          </header>
          <div className="space-y-2 text-[13px] leading-relaxed">
            <p>Join a 12-person backend team building real-time payments infrastructure on Go and PostgreSQL. We're seeking a skilled engineer (3+ years required, 5+ preferred) to lead service design and mentor 2 juniors.</p>
            <p><b>You'll:</b> design APIs, drive deployments via CI/CD, partner with product on roadmap.</p>
            <p><b>Salary:</b> RM 7,000 – 9,200 + bonus, hybrid (3 days KL Sentral).</p>
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
