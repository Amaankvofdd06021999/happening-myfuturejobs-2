import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AIPanel } from "@/components/AIPanel";
import { employerNav } from "@/lib/nav";
import { employerUser } from "@/lib/mock";
import { Badge, SectionTitle } from "@/components/ui-bits";
import { Sparkles, Download, Flag, CheckCircle2, AlertCircle, Brain, FileText, Info, Target } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/employer/interview")({
  head: () => ({ meta: [{ title: "Interview Question Generator — MYFutureJobs" }] }),
  component: Page,
});

const groups = [
  {
    type: "Behavioural", color: "primary",
    qs: [
      { q: "Tell me about a time you had to refactor a critical service in production. What was at stake, and what trade-offs did you make?",
        signals: ["Risk awareness", "Communication", "Rollback strategy"], red: ["Blames team", "No metrics"] },
      { q: "Describe a disagreement with a product manager. How did you resolve it?",
        signals: ["Active listening", "Negotiation"], red: ["Avoids conflict"] },
    ],
  },
  {
    type: "Competency", color: "default",
    qs: [
      { q: "Walk me through how you'd design a rate-limiting layer for a payments API serving 10k RPS.",
        signals: ["Trade-off reasoning", "Knows alg. families"], red: ["Jumps to vendor"] },
    ],
  },
  {
    type: "Situational", color: "emphasis",
    qs: [
      { q: "A junior on your team ships a bug that causes a 2-hour outage. Walk me through the next 24 hours.",
        signals: ["Blameless post-mortem", "Comms discipline"], red: ["Punitive language"] },
    ],
  },
];

function Page() {
  return (
    <AppShell
      nav={employerNav}
      user={employerUser}
      rightPanel={
        <AIPanel title="Hiring Assistant" subtitle="Question generator" why={<p>Questions generated against the JD's competency model and Aisyah's profile. Each question maps to one or more evaluation dimensions.</p>}>
          <div className="space-y-3">
            <div className="rounded-[10px] bg-emphasis-soft p-3">
              <div className="text-[11px] font-600 uppercase tracking-wider text-emphasis">Pack details</div>
              <div className="mt-1 text-[12px]">4 questions · ~45 min · Includes scoring rubric.</div>
            </div>
            <button className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-[10px] grad-orange text-[12px] font-600 text-white">
              <Download className="h-3.5 w-3.5"/> Export PDF pack
            </button>
            <button className="inline-flex h-9 w-full items-center justify-center rounded-[10px] border border-border bg-card text-[12px] font-600">
              Regenerate
            </button>
          </div>
        </AIPanel>
      }
    >
      <div className="mb-6">
        <div className="text-[12px] font-600 uppercase tracking-wider text-emphasis">AI Interview Assistant</div>
        <h1 className="text-[28px] font-700 tracking-tight">Prepare for Candidate Interviews</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          5 Questions for Clark J. Kent · Standard mode · 5 credits charged
        </p>
      </div>

      {/* AI Alert Box */}
      <div className="mb-4 rounded-[12px] border border-info bg-info-soft p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-info mt-0.5" />
          <div className="flex-1">
            <div className="font-600 text-[14px]">Interview Preparation Assistant</div>
            <p className="text-[12px] text-muted-foreground mt-1">
              Select a candidate from your talent pool and optionally attach a job description from the JD Store or paste one directly.
              The AI generates targeted interview questions with ideal answers, key points, and pitfalls based on the candidate's profile.
            </p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => toast.success("Exporting interview pack...", { description: "PDF will download shortly" })}
                className="inline-flex h-8 items-center rounded-[8px] grad-orange px-4 text-[12px] font-600 text-white hover:opacity-90"
              >
                <FileText className="h-3 w-3 mr-1" />
                Export PDF
              </button>
              <button
                onClick={() => toast.info("Starting new interview session...")}
                className="inline-flex h-8 items-center rounded-[8px] border border-primary bg-white px-4 text-[12px] font-600 text-primary hover:bg-primary-soft"
              >
                New Session
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {groups.map((g) => (
          <section key={g.type} className="rounded-[12px] border border-border bg-card p-5 shadow-card">
            <SectionTitle title={g.type} action={<Badge tone={g.color as any}>{g.qs.length} questions</Badge>}/>
            <div className="space-y-3">
              {g.qs.map((qq, idx) => (
                <article key={idx} className="rounded-[10px] border border-border p-4">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[11px] font-600 text-primary">Q{idx+1}</span>
                    <p className="text-[14px] font-600 leading-relaxed">{qq.q}</p>
                  </div>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div>
                      <div className="mb-1 flex items-center gap-1 text-[11px] font-600 uppercase tracking-wider text-[var(--success)]"><CheckCircle2 className="h-3 w-3"/> Must-hit signals</div>
                      <ul className="space-y-1 text-[12px]">{qq.signals.map((s) => <li key={s} className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]"/> {s}</li>)}</ul>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-1 text-[11px] font-600 uppercase tracking-wider text-[var(--danger)]"><AlertCircle className="h-3 w-3"/> Red flags</div>
                      <ul className="space-y-1 text-[12px]">{qq.red.map((s) => <li key={s} className="flex items-center gap-1.5"><Flag className="h-3 w-3 text-[var(--danger)]"/> {s}</li>)}</ul>
                    </div>
                  </div>
                  <div className="mt-3 rounded-[8px] bg-inset p-3 text-[12px]">
                    <b>Scoring rubric:</b> 1 (weak) — vague, no examples · 3 (solid) — specific story with outcome · 5 (strong) — story + metrics + lessons + counter-factuals.
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
