import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { jobseekerNav } from "@/lib/nav";
import { jobseekerUser } from "@/lib/mock";
import { Badge, SectionTitle } from "@/components/ui-bits";
import { Calendar, MapPin, Ticket, Bus, Award, Search, Filter } from "lucide-react";
import eventCarnival from "@/assets/event-carnival.jpg";
import eventTraining from "@/assets/event-training.jpg";
import teamHero from "@/assets/team-hero.jpg";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/jobseeker/events")({
  head: () => ({ meta: [{ title: "Events & Training — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string[]>([]);

  const allEvents = [
    { img: eventCarnival, tag: "Career Carnival", t: "MYFutureJobs Carnival KL 2026", d: "12–14 Mar · KLCC", spots: "Walk-in interviews", location: "KLCC" },
    { img: eventTraining, tag: "Training", t: "Industrial Automation Bootcamp", d: "Starts 1 Apr · Penang", spots: "20 seats · HRDC", location: "Penang" },
    { img: teamHero, tag: "Hiring Event", t: "Tech Hiring Day Cyberjaya", d: "28 Feb · Cyberjaya", spots: "30+ employers", location: "Cyberjaya" },
    { img: eventCarnival, tag: "Training", t: "Digital Marketing Masterclass", d: "5 Mar · Online", spots: "50 seats · MDEC", location: "Online" },
    { img: teamHero, tag: "Career Carnival", t: "Finance & Banking Career Fair", d: "20 Mar · Putrajaya", spots: "25+ employers", location: "Putrajaya" },
    { img: eventTraining, tag: "Hiring Event", t: "Healthcare Professionals Recruitment", d: "15 Mar · Shah Alam", spots: "15+ hospitals", location: "Shah Alam" },
  ];

  const eventTypes = ["Career Carnival", "Training", "Hiring Event"];

  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const matchesSearch = event.t.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.tag.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType.length === 0 || selectedType.includes(event.tag);
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType, allEvents]);

  const events = filteredEvents.slice(0, 3);
  return (
    <AppShell nav={jobseekerNav} user={jobseekerUser}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[28px] font-700 tracking-tight">Events & Training</h1>
          <p className="mt-1 text-sm text-muted-foreground">RSVP, attend, and claim transport rewards for verified interviews. {filteredEvents.length} events found</p>
        </div>
        <Badge tone="ai"><Award className="h-3 w-3"/> 3 rewards available</Badge>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-3 flex-wrap">
          <label className="flex items-center gap-2 rounded-[10px] border border-border bg-card px-3 flex-1 min-w-[250px]">
            <Search className="h-4 w-4 text-muted-foreground"/>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, locations, or types..."
              className="h-11 w-full bg-transparent text-sm outline-none"
            />
          </label>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground"/>
            {eventTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(prev =>
                  prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
                )}
                className={`h-11 px-4 rounded-[10px] text-[12px] font-600 transition-colors ${
                  selectedType.includes(type)
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-card hover:border-primary'
                }`}
              >
                {type}
              </button>
            ))}
            {selectedType.length > 0 && (
              <button
                onClick={() => setSelectedType([])}
                className="h-11 px-3 rounded-[10px] border border-border bg-card text-[12px] font-600 hover:border-error hover:text-error transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <SectionTitle title="Upcoming for you" />
      <div className="grid gap-4 md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {events.map((e, index) => (
            <motion.article
              key={e.t}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-[14px] border border-border bg-card shadow-card hover:shadow-hero hover:border-primary transition-all">
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
          </motion.article>
        ))}
        </AnimatePresence>
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
