import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AIPanel } from "@/components/AIPanel";
import { jobseekerNav } from "@/lib/nav";
import { jobseekerUser } from "@/lib/mock";
import { Badge, SectionTitle } from "@/components/ui-bits";
import { Sparkles, Check, X, FileText, Download } from "lucide-react";

export const Route = createFileRoute("/jobseeker/cv-edits")({
  head: () => ({ meta: [{ title: "CV Edits — MYFutureJobs" }] }),
  component: Page,
});

const edits = [
  {
    section: "Summary",
    orig: "Marketing executive with 5 years experience in digital and offline campaigns. Hardworking and team player.",
    sug: "Marketing executive driving 5+ years of growth campaigns — delivered 32% YoY lead growth across 4 verticals. Specialises in funnel design, brand voice, and cross-functional delivery.",
    why: "Quantifies impact (32% YoY) and uses verbs preferred by ATS systems for Marketing roles.",
  },
  {
    section: "Experience · Astro",
    orig: "Responsible for managing social media accounts and creating content.",
    sug: "Owned 3 brand social channels (1.8M followers); grew engagement 41% and lifted referral signups by 22% via a quarterly content calendar.",
    why: "Adds scope, outcome metrics, and reframes 'responsible for' to ownership language.",
  },
  {
    section: "Skills",
    orig: "MS Office, Photoshop, social media, communication.",
    sug: "Marketing automation (HubSpot), Looker Studio, A/B testing, SQL (basics), brand strategy, multilingual copy (BM/EN).",
    why: "Aligns to the 4 most-requested skills in target roles you've viewed.",
  },
];

function Page() {
  return (
    <AppShell
      nav={jobseekerNav}
      user={jobseekerUser}
      rightPanel={
        <AIPanel
          title="Career Assistant"
          subtitle="CV editor · tracked changes"
          why={
            <p>Suggestions are derived from 312 anonymised winning CVs in the same role and region, plus active JD requirements from the last 30 days.</p>
          }
        >
          <div className="space-y-3">
            <div className="rounded-[10px] bg-emphasis-soft p-3">
              <div className="text-[11px] font-600 uppercase tracking-wider text-emphasis">Impact preview</div>
              <p className="mt-1 text-[12px]">Accept all suggestions → Career Signal projected <b>74 → 83</b>.</p>
            </div>
            <button className="inline-flex h-9 w-full items-center justify-center rounded-[10px] grad-orange text-[12px] font-600 text-white">
              Accept all
            </button>
            <button className="inline-flex h-9 w-full items-center justify-center rounded-[10px] border border-border bg-card text-[12px] font-600">
              <Download className="mr-1.5 h-3.5 w-3.5"/> Export Clean PDF
            </button>
            <button className="inline-flex h-9 w-full items-center justify-center rounded-[10px] border border-border bg-card text-[12px] font-600">
              <FileText className="mr-1.5 h-3.5 w-3.5"/> Export Review PDF
            </button>
          </div>
        </AIPanel>
      }
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[12px] font-600 uppercase tracking-wider text-emphasis">Career Assistant</div>
          <h1 className="text-[28px] font-700 tracking-tight">CV Edits — tracked changes</h1>
          <p className="mt-1 text-sm text-muted-foreground">Review each suggestion. Accept what you like, reject what you don't.</p>
        </div>
        <div className="flex items-center gap-2 text-[12px]">
          <Badge tone="ai"><Sparkles className="h-3 w-3"/> 12 suggestions</Badge>
          <Badge tone="success"><Check className="h-3 w-3"/> 3 accepted</Badge>
        </div>
      </div>

      <div className="space-y-4">
        {edits.map((e) => (
          <article key={e.section} className="rounded-[12px] border border-border bg-card shadow-card">
            <header className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="font-600">{e.section}</div>
              <Badge tone="ai"><Sparkles className="h-3 w-3"/> AI rewrite</Badge>
            </header>
            <div className="grid gap-0 md:grid-cols-2 md:divide-x md:divide-border">
              <div className="p-5">
                <div className="mb-2 text-[11px] font-600 uppercase tracking-wider text-muted-foreground">Original</div>
                <p className="text-[14px] leading-relaxed text-muted-foreground line-through decoration-[var(--danger)]/60 decoration-2">{e.orig}</p>
              </div>
              <div className="bg-emphasis-soft/40 p-5">
                <div className="mb-2 text-[11px] font-600 uppercase tracking-wider text-emphasis">Suggested rewrite</div>
                <p className="text-[14px] leading-relaxed">{e.sug}</p>
                <p className="mt-3 text-[12px] text-muted-foreground"><b>Why:</b> {e.why}</p>
              </div>
            </div>
            <footer className="flex items-center justify-end gap-2 border-t border-border px-5 py-3">
              <button className="inline-flex h-9 items-center gap-1 rounded-[8px] border border-border px-3 text-[12px] font-600 text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5"/> Reject
              </button>
              <button className="inline-flex h-9 items-center gap-1 rounded-[8px] bg-primary px-3 text-[12px] font-600 text-primary-foreground">
                <Check className="h-3.5 w-3.5"/> Accept
              </button>
            </footer>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
