import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AIPanel } from "@/components/AIPanel";
import { employerNav } from "@/lib/nav";
import { employerUser, candidates } from "@/lib/mock";
import { KPITile, SectionTitle, Badge } from "@/components/ui-bits";
import { Briefcase, Users, Calendar, Sparkles, ArrowRight, Eye, AlertTriangle, CheckCircle2, UserPlus, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/employer/")({
  head: () => ({ meta: [{ title: "Employer dashboard — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();

  const handleAISuggestionClick = (title: string, path: string) => {
    toast.success(`Opening ${title}`, {
      description: "Navigating to AI-powered tool",
    });
    navigate({ to: path });
  };

  return (
    <AppShell
      nav={employerNav}
      user={employerUser}
      rightPanel={
        <AIPanel
          title="Hiring Assistant"
          subtitle="Recommended actions"
          why={<p>Suggestions are scored against your last 30 vacancies and current talent pool depth.</p>}
        >
          <div className="space-y-3">
            <div className="rounded-[10px] bg-emphasis-soft p-3 transition-all hover:shadow-md">
              <div className="text-[11px] font-600 uppercase tracking-wider text-emphasis">Today's priority</div>
              <p className="mt-1 text-[12px]">3 strong matches pending review for <b>Software Engineer · KL</b>.</p>
              <button
                onClick={() => handleAISuggestionClick("Fit-Match Shortlist", "/employer/fit-match")}
                className="mt-2 inline-flex h-8 items-center rounded-[8px] grad-orange px-3 text-[12px] font-600 text-white transition-transform hover:scale-105 active:scale-95"
              >
                Open shortlist →
              </button>
            </div>
            <div className="space-y-2">
              {[
                { t: "Run bias check on 'Sales Manager' JD", to: "/employer/bias", label: "Bias Detection" },
                { t: "Generate interview pack for Aisyah R.", to: "/employer/interview", label: "Interview Questions" },
                { t: "Improve JD: 'Brand Specialist' score 64 → 82", to: "/employer/jd-analysis", label: "JD Analysis" },
              ].map((s) => (
                <button
                  key={s.t}
                  onClick={() => handleAISuggestionClick(s.label, s.to)}
                  className="w-full flex items-center justify-between rounded-[10px] border border-border px-3 py-2 text-[12px] hover:border-primary hover:bg-primary-soft transition-all hover:shadow-sm active:scale-98"
                >
                  <span>{s.t}</span><ArrowRight className="h-3.5 w-3.5"/>
                </button>
              ))}
            </div>
          </div>
        </AIPanel>
      }
    >
      <div className="mb-6">
        <div className="text-[12px] font-600 uppercase tracking-wider text-emphasis">Petronas Digital</div>
        <h1 className="text-[28px] font-700 tracking-tight">Hiring at a glance</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          onClick={() => {
            toast.info("Viewing all vacancies");
            navigate({ to: "/employer/vacancies" });
          }}
          className="text-left transition-transform hover:scale-105 active:scale-95"
        >
          <KPITile label="Open vacancies" value="14" delta="+2 this week" icon={<Briefcase className="h-4 w-4"/>}/>
        </button>
        <button
          onClick={() => {
            toast.info("Viewing candidate pipeline");
            navigate({ to: "/employer/fit-match" });
          }}
          className="text-left transition-transform hover:scale-105 active:scale-95"
        >
          <KPITile label="Candidates in pipeline" value="248" delta="+38 last 7d" icon={<Users className="h-4 w-4"/>}/>
        </button>
        <button
          onClick={() => {
            toast.info("Viewing interview schedule");
            navigate({ to: "/employer/interview" });
          }}
          className="text-left transition-transform hover:scale-105 active:scale-95"
        >
          <KPITile label="Interviews this week" value="22" delta="3 today" icon={<Calendar className="h-4 w-4"/>}/>
        </button>
        <button
          onClick={() => {
            toast.success("Excellent fit-match performance!", {
              description: "Your average score improved from 79 to 84 this month",
            });
          }}
          className="text-left transition-transform hover:scale-105 active:scale-95"
        >
          <KPITile label="Avg. Fit-Match score" value="84" delta="Up from 79 last month" emphasis gradient icon={<Sparkles className="h-4 w-4"/>}/>
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <SectionTitle title="Active vacancies" action={
            <button
              onClick={() => {
                toast.info("Viewing all vacancies");
                navigate({ to: "/employer/vacancies" });
              }}
              className="text-sm font-600 text-primary hover:text-primary/80 transition-colors"
            >
              View all →
            </button>
          }/>
          <div className="space-y-2">
            {[
              { t: "Software Engineer (Backend)", a: 86, n: 12, b: 82, id: "v1" },
              { t: "Sales Manager — KL", a: 42, n: 5, b: 64, id: "v2" },
              { t: "Data Analyst", a: 33, n: 8, b: 79, id: "v3" },
              { t: "Brand Specialist", a: 51, n: 4, b: 71, id: "v4" },
            ].map((v) => (
              <div
                key={v.t}
                className="grid grid-cols-[1.5fr_repeat(3,1fr)_auto] items-center gap-3 rounded-[10px] border border-border p-3 text-[13px] transition-all hover:border-primary hover:bg-primary-soft/50 hover:shadow-sm cursor-pointer"
                onClick={() => {
                  toast.info(`Opening ${v.t}`, {
                    description: `${v.a} total applicants, ${v.n} new`,
                  });
                  navigate({ to: "/employer/vacancies" });
                }}
              >
                <div className="font-600">{v.t}</div>
                <div><span className="text-muted-foreground">Applicants </span><b className="num">{v.a}</b></div>
                <div><span className="text-muted-foreground">New </span><b className="num">{v.n}</b></div>
                <div className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-emphasis"/><span className="num font-600">{v.b}</span><span className="text-muted-foreground"> JD</span></div>
                <button
                  aria-label="View vacancy details"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.success(`Viewing ${v.t}`, {
                      description: "Opening vacancy details",
                    });
                    navigate({ to: "/employer/vacancies" });
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Eye className="h-4 w-4"/>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <SectionTitle title="Top fit-matches today" action={<Badge tone="ai"><Sparkles className="h-3 w-3"/> AI</Badge>}/>
          <ul className="space-y-3">
            {candidates.slice(0,4).map((c) => (
              <li
                key={c.id}
                className="group relative flex items-center gap-3 rounded-[10px] border border-border p-3 transition-all hover:border-primary hover:bg-primary-soft/50 hover:shadow-md cursor-pointer"
                onClick={() => {
                  toast.success(`Viewing ${c.name}'s profile`, {
                    description: `Fit score: ${c.fit} - Top strength: ${c.top}`,
                  });
                  navigate({ to: "/employer/fit-match" });
                }}
              >
                <img src={c.avatar} alt={c.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary transition-all"/>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-[13px] font-600">{c.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{c.role} · {c.exp}</div>
                </div>
                <div className="text-right">
                  <div className="num text-[16px] font-600 text-emphasis">{c.fit}</div>
                  <div className="text-[10px] text-muted-foreground">{c.top}</div>
                </div>
                <div className="absolute right-3 bottom-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success(`Viewing ${c.name}'s full profile`);
                      navigate({ to: "/employer/fit-match" });
                    }}
                    className="p-1.5 rounded-[6px] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    aria-label="View profile"
                  >
                    <UserPlus className="h-3.5 w-3.5"/>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success(`Opening interview scheduler for ${c.name}`, {
                        description: "Schedule a time for the interview",
                      });
                      navigate({ to: "/employer/interview" });
                    }}
                    className="p-1.5 rounded-[6px] bg-emphasis text-white hover:bg-emphasis/90 transition-colors"
                    aria-label="Schedule interview"
                  >
                    <MessageSquare className="h-3.5 w-3.5"/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[12px] border border-border bg-card p-5 shadow-card">
          <SectionTitle
            title="Bias alerts"
            action={
              <button
                onClick={() => {
                  toast.info("Opening Bias Detection tool");
                  navigate({ to: "/employer/bias" });
                }}
                className="text-xs font-600 text-primary hover:text-primary/80 transition-colors"
              >
                Review all →
              </button>
            }
          />
          <ul className="space-y-2 text-[13px]">
            <li
              className="flex items-center gap-2 rounded-[8px] border border-border p-3 transition-all hover:border-warning hover:bg-warning/10 cursor-pointer"
              onClick={() => {
                toast.warning("Bias detected: 'Energetic'", {
                  description: "This term may be age-coded in Sales JD",
                });
                navigate({ to: "/employer/bias" });
              }}
            >
              <AlertTriangle className="h-4 w-4 text-[var(--warning)]"/> "Energetic" — age-coded in 'Sales' JD
            </li>
            <li
              className="flex items-center gap-2 rounded-[8px] border border-border p-3 transition-all hover:border-warning hover:bg-warning/10 cursor-pointer"
              onClick={() => {
                toast.warning("Bias detected: 'Rockstar'", {
                  description: "This term may be gender-coded in Engineer JD",
                });
                navigate({ to: "/employer/bias" });
              }}
            >
              <AlertTriangle className="h-4 w-4 text-[var(--warning)]"/> "Rockstar" — gender-coded in 'Engineer' JD
            </li>
            <li
              className="flex items-center gap-2 rounded-[8px] border border-border p-3 transition-all hover:border-success hover:bg-success/10 cursor-pointer"
              onClick={() => {
                toast.success("9 job descriptions are bias-free!", {
                  description: "Great work maintaining inclusive language",
                });
              }}
            >
              <CheckCircle2 className="h-4 w-4 text-[var(--success)]"/> 9 JDs clean
            </li>
          </ul>
        </div>
        <div className="rounded-[12px] border border-border bg-card p-5 shadow-card lg:col-span-2">
          <SectionTitle title="Funnel · last 30 days"/>
          <div className="grid grid-cols-5 items-end gap-2 h-44">
            {[
              {l:"Sourced",v:90,n:482, desc: "Total candidates sourced"},
              {l:"Screened",v:62,n:268, desc: "Candidates screened"},
              {l:"Interview",v:38,n:112, desc: "Interviews conducted"},
              {l:"Offer",v:18,n:36, desc: "Offers extended"},
              {l:"Hired",v:10,n:18, desc: "Successful hires"},
            ].map((s, i) => (
              <button
                key={s.l}
                onClick={() => {
                  toast.info(`${s.l}: ${s.n} candidates`, {
                    description: s.desc,
                  });
                }}
                className="group flex h-full flex-col justify-end transition-transform hover:scale-105 active:scale-95"
              >
                <div className="num text-center text-[12px] font-600 group-hover:text-primary transition-colors">{s.n}</div>
                <div className={`mt-1 rounded-t-md transition-all ${i === 4 ? "grad-orange" : "bg-primary group-hover:bg-primary/80"}`} style={{ height: `${s.v}%` }} />
                <div className="mt-2 text-center text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">{s.l}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
