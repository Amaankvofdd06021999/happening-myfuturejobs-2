import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { jobseekerNav } from "@/lib/nav";
import { jobseekerUser } from "@/lib/mock";
import { Badge, SectionTitle } from "@/components/ui-bits";
import { Calendar, MapPin, Ticket, Bus, Award } from "lucide-react";
import eventCarnival from "@/assets/event-carnival.jpg";
import eventTraining from "@/assets/event-training.jpg";
import teamHero from "@/assets/team-hero.jpg";

export const Route = createFileRoute("/jobseeker/events")({
  head: () => ({ meta: [{ title: "Events & Training — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  const events = [
    { img: eventCarnival, tag: "Career Carnival", t: "MYFutureJobs Carnival KL 2026", d: "12–14 Mar · KLCC", spots: "Walk-in interviews" },
    { img: eventTraining, tag: "Training", t: "Industrial Automation Bootcamp", d: "Starts 1 Apr · Penang", spots: "20 seats · HRDC" },
    { img: teamHero, tag: "Hiring Event", t: "Tech Hiring Day Cyberjaya", d: "28 Feb · Cyberjaya", spots: "30+ employers" },
  ];
  return (
    <AppShell nav={jobseekerNav} user={jobseekerUser}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[28px] font-700 tracking-tight">Events & Training</h1>
          <p className="mt-1 text-sm text-muted-foreground">RSVP, attend, and claim transport rewards for verified interviews.</p>
        </div>
        <Badge tone="ai"><Award className="h-3 w-3"/> 3 rewards available</Badge>
      </div>

      <SectionTitle title="Upcoming for you" />
      <div className="grid gap-4 md:grid-cols-3">
        {events.map((e) => (
          <article key={e.t} className="overflow-hidden rounded-[14px] border border-border bg-card shadow-card">
            <img src={e.img} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
            <div className="p-5">
              <Badge tone="primary">{e.tag}</Badge>
              <h3 className="mt-3 text-[16px] font-600">{e.t}</h3>
              <div className="mt-2 space-y-1 text-[12px] text-muted-foreground">
                <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5"/> {e.d}</div>
                <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5"/> {e.spots}</div>
              </div>
              <button className="mt-4 inline-flex h-9 items-center rounded-[10px] bg-primary px-4 text-[12px] font-600 text-primary-foreground">RSVP</button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <SectionTitle kicker="Interview attendance rewards" title="Show up to your interview, claim your ride." action={<Badge tone="ai">Sponsored by PERKESO</Badge>}/>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: <Bus className="h-5 w-5"/>, t: "RM 25 Grab voucher", d: "Auto-issued after interview check-in." },
            { icon: <Ticket className="h-5 w-5"/>, t: "RM 15 RapidKL e-pass", d: "For interviews in Klang Valley." },
            { icon: <Award className="h-5 w-5"/>, t: "Interview Prep Pack", d: "AI-personalised question pack + tips." },
          ].map((r, i) => (
            <div key={r.t} className={`rounded-[14px] border border-border p-5 ${i === 0 ? "grad-orange text-white" : "bg-card"}`}>
              <span className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-[10px] ${i === 0 ? "bg-white/15 text-white" : "bg-emphasis-soft text-emphasis"}`}>{r.icon}</span>
              <div className={`text-[15px] font-600 ${i===0?"text-white":""}`}>{r.t}</div>
              <p className={`mt-1 text-[12px] ${i === 0 ? "text-white/90" : "text-muted-foreground"}`}>{r.d}</p>
              <button className={`mt-4 inline-flex h-9 items-center rounded-[10px] px-3 text-[12px] font-600 ${i === 0 ? "bg-white text-emphasis" : "bg-primary text-primary-foreground"}`}>
                Claim
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
