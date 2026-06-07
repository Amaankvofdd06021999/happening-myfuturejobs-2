import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AIPanel } from "@/components/AIPanel";
import { employerNav } from "@/lib/nav";
import { employerUser } from "@/lib/mock";
import { ScoreCard, Badge, SectionTitle } from "@/components/ui-bits";
import { Sparkles, AlertTriangle, Check } from "lucide-react";

export const Route = createFileRoute("/employer/bias")({
  head: () => ({ meta: [{ title: "Bias Detection — MYFutureJobs" }] }),
  component: Page,
});

const flags = [
  { type: "Gender-coded", phrase: "rockstar coder", fix: "skilled engineer", w: "‘Rockstar’ correlates with male-skewed applicant pools (Gaucher et al., 2011)." },
  { type: "Age-coded", phrase: "energetic, young-at-heart team", fix: "collaborative, fast-moving team", w: "‘Young’ is age-discriminatory under MY employment guidelines." },
  { type: "Exclusionary", phrase: "must be Malaysian Muslim male", fix: "open to all Malaysian citizens", w: "Religious / gender restrictions are not permitted unless legally exempted." },
  { type: "Ableist", phrase: "able-bodied", fix: "no specific physical requirement", w: "Unless physically essential, this phrase excludes qualified candidates." },
];

function Page() {
  return (
    <AppShell
      nav={employerNav}
      user={employerUser}
      rightPanel={
        <AIPanel title="Hiring Assistant" subtitle="Bias detection" why={<p>Detection model trained on 28k Malaysian JDs cross-referenced with EU Lighthouse and JobScan bias datasets.</p>}>
          <div className="space-y-3">
            <div className="rounded-[10px] bg-emphasis-soft p-3">
              <div className="text-[11px] font-600 uppercase tracking-wider text-emphasis">Result</div>
              <p className="mt-1 text-[12px]">4 flags in this JD. Estimated reach increase if all fixed: <b>+62% qualified applicants</b>.</p>
            </div>
            <button className="inline-flex h-9 w-full items-center justify-center rounded-[10px] grad-orange text-[12px] font-600 text-white">
              Accept all rewrites
            </button>
          </div>
        </AIPanel>
      }
    >
      <div className="mb-6">
        <div className="text-[12px] font-600 uppercase tracking-wider text-emphasis">Hiring Assistant</div>
        <h1 className="text-[28px] font-700 tracking-tight">Bias Detection</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sales Manager — KL · last edited 12 minutes ago.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <ScoreCard value={52} band="Multiple flags" label="JD Inclusivity Score" />
        <div className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <SectionTitle title="Flags found" action={<Badge tone="warning"><AlertTriangle className="h-3 w-3"/> 4 flags</Badge>}/>
          <div className="space-y-3">
            {flags.map((f) => (
              <article key={f.phrase} className="rounded-[10px] border border-border p-4">
                <div className="flex items-center justify-between">
                  <Badge tone="warning">{f.type}</Badge>
                  <Badge tone="ai"><Sparkles className="h-3 w-3"/> AI rewrite</Badge>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div>
                    <div className="mb-1 text-[11px] font-600 uppercase tracking-wider text-muted-foreground">Original</div>
                    <p className="rounded-[8px] bg-[color-mix(in_oklab,var(--danger)_8%,transparent)] p-2.5 text-[13px] text-foreground">"{f.phrase}"</p>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] font-600 uppercase tracking-wider text-emphasis">Suggested</div>
                    <p className="rounded-[8px] bg-emphasis-soft p-2.5 text-[13px] font-600">"{f.fix}"</p>
                  </div>
                </div>
                <p className="mt-2 text-[12px] text-muted-foreground"><b>Why:</b> {f.w}</p>
                <div className="mt-3 flex justify-end gap-2">
                  <button className="inline-flex h-8 items-center rounded-[8px] border border-border px-3 text-[12px] font-600">Reject</button>
                  <button className="inline-flex h-8 items-center gap-1 rounded-[8px] bg-primary px-3 text-[12px] font-600 text-primary-foreground"><Check className="h-3 w-3"/> Apply</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
