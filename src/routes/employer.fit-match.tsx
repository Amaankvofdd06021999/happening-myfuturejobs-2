import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AIPanel } from "@/components/AIPanel";
import { employerNav } from "@/lib/nav";
import { employerUser, candidates } from "@/lib/mock";
import { Badge, SectionTitle } from "@/components/ui-bits";
import { Sparkles, ArrowRight, X, Check, Users, Filter, Calendar, MessageSquare, FileText, Download, Star, Brain, Target, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { InterviewCalendar } from "@/components/InterviewCalendar";

export const Route = createFileRoute("/employer/fit-match")({
  head: () => ({ meta: [{ title: "Fit-Match — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  const [active, setActive] = useState(candidates[0]);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(candidates.map(c => c.id));
  const [rejectedIds, setRejectedIds] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedCandidateForInterview, setSelectedCandidateForInterview] = useState<string>("");
  const dims = [
    { name: "Leadership", v: 72 },
    { name: "Cultural Fit", v: 80 },
    { name: "Experience", v: 88 },
    { name: "Technical Skills", v: 95 },
    { name: "Industry", v: 76 },
  ];
  const top = dims.reduce((a, b) => (b.v > a.v ? b : a));

  const handleShortlist = (candidateId: string, candidateName: string) => {
    if (!shortlistedIds.includes(candidateId)) {
      setShortlistedIds(prev => [...prev, candidateId]);
      setRejectedIds(prev => prev.filter(id => id !== candidateId));
      toast.success("Candidate shortlisted", {
        description: candidateName,
      });
    }
  };

  const handleReject = (candidateId: string, candidateName: string) => {
    setShortlistedIds(prev => prev.filter(id => id !== candidateId));
    setRejectedIds(prev => [...prev, candidateId]);
    toast.error("Candidate rejected", {
      description: candidateName,
    });
  };

  const handleScheduleInterview = (candidateName: string) => {
    setSelectedCandidateForInterview(candidateName);
    setCalendarOpen(true);
  };

  const toggleCompareSelection = (candidateId: string) => {
    setSelectedForCompare(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : prev.length < 3
          ? [...prev, candidateId]
          : prev
    );
  };

  const filteredCandidates = candidates.filter(c =>
    shortlistedIds.includes(c.id) && parseInt(c.fit) >= filterMinScore
  );

  return (
    <AppShell
      nav={employerNav}
      user={employerUser}
      rightPanel={
        <AIPanel title="Hiring Assistant" subtitle={`Fit deep-dive · ${active.name}`} why={<div>
          <p>Fit-Match weights tuned to this JD:</p>
          <ul className="mt-1 list-disc pl-4">
            <li>Technical 35% · Experience 25% · Leadership 15% · Industry 15% · Culture 10%</li>
          </ul>
          <p className="mt-2">Edit weights from JD Analysis → Evaluation Criteria.</p>
        </div>}>
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[10px] bg-emphasis-soft p-3"
            >
              <div className="text-[11px] font-600 uppercase tracking-wider text-emphasis">Recommendation</div>
              <p className="mt-1 text-[12px]">Move to interview — top match this week.</p>
            </motion.div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScheduleInterview(active.name)}
              className="inline-flex h-9 w-full items-center justify-center rounded-[10px] grad-orange text-[12px] font-600 text-white hover:opacity-90 transition-opacity"
            >
              <Calendar className="h-3 w-3 mr-1.5" />
              Schedule interview
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success("Generating pack", { description: `Creating interview materials for ${active.name}` })}
              className="inline-flex h-9 w-full items-center justify-center rounded-[10px] border border-border bg-card text-[12px] font-600 hover:border-primary transition-colors"
            >
              <FileText className="h-3 w-3 mr-1.5" />
              Generate interview pack
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.info("Opening resume", { description: `Viewing ${active.name}'s profile` })}
              className="inline-flex h-9 w-full items-center justify-center rounded-[10px] border border-border bg-card text-[12px] font-600 hover:border-primary transition-colors"
            >
              <Download className="h-3 w-3 mr-1.5" />
              Download CV
            </motion.button>
          </div>
        </AIPanel>
      }
    >
      <div className="mb-6">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-2">
          <div>
            <div className="text-[12px] font-600 uppercase tracking-wider text-emphasis">AI-Powered Candidate Matching</div>
            <h1 className="text-[28px] font-700 tracking-tight">Fit Match Result</h1>
            <p className="mt-1 text-[14px] text-muted-foreground">AI analyzes candidate profiles against job requirements</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setCompareMode(!compareMode)}
              className={`inline-flex items-center gap-2 h-9 px-4 rounded-[10px] text-[12px] font-600 transition-colors ${
                compareMode ? 'bg-primary text-primary-foreground' : 'border border-border bg-card hover:border-primary'
              }`}
            >
              <Users className="h-3 w-3" />
              Compare {selectedForCompare.length > 0 && `(${selectedForCompare.length})`}
            </motion.button>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-[13px] text-muted-foreground">Min. score:</div>
          <div className="flex items-center gap-2">
            {[0, 70, 80, 90].map(score => (
              <button
                key={score}
                onClick={() => setFilterMinScore(score)}
                className={`h-8 px-3 rounded-[8px] text-[12px] font-600 transition-colors ${
                  filterMinScore === score
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-card hover:border-primary'
                }`}
              >
                {score}+
              </button>
            ))}
          </div>
          <div className="ml-auto text-[13px] text-muted-foreground">
            Showing {filteredCandidates.length} candidates
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        <section className="rounded-[12px] border border-border bg-card p-3 shadow-card">
          <div className="mb-2 px-2 pt-1 text-[12px] font-600 uppercase tracking-wider text-muted-foreground">Shortlist · {filteredCandidates.length}</div>
          <ul className="space-y-1">
            <AnimatePresence mode="popLayout">
              {filteredCandidates.map((c) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  layout
                >
                  <button
                    onClick={() => setActive(c)}
                    className={`flex w-full items-center gap-3 rounded-[10px] p-2.5 text-left transition-all ${
                      active.id === c.id ? "bg-primary-soft border-2 border-primary" : "hover:bg-inset"
                    } ${compareMode ? 'pr-1' : ''}`}
                  >
                    {compareMode && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompareSelection(c.id);
                        }}
                        className="flex-shrink-0"
                      >
                        <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedForCompare.includes(c.id)
                            ? 'bg-primary border-primary'
                            : 'border-border hover:border-primary'
                        }`}>
                          {selectedForCompare.includes(c.id) && <Check className="h-3 w-3 text-white" />}
                        </div>
                      </motion.div>
                    )}
                    <img src={c.avatar} alt="" className="h-9 w-9 rounded-full object-cover"/>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-600">{c.name}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{c.role} · {c.exp}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="num text-[15px] font-600 text-emphasis">{c.fit}</div>
                    </div>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </section>

        <section className="rounded-[12px] border border-border bg-card p-6 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src={active.avatar} alt="" className="h-14 w-14 rounded-full object-cover"/>
              <div>
                <div className="text-[18px] font-600">{active.name}</div>
                <div className="text-[13px] text-muted-foreground">{active.role} · {active.exp} · {active.loc}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="num text-[40px] font-600 leading-none text-emphasis">{active.fit}</div>
              <div className="text-[12px] text-muted-foreground">Fit-Match score</div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {dims.map((d) => {
              const isTop = d.name === top.name;
              return (
                <div key={d.name}>
                  <div className="mb-1.5 flex items-center justify-between text-[13px]">
                    <span className="font-600">{d.name} {isTop && <Badge tone="emphasis">Strongest</Badge>}</span>
                    <span className="num">{d.v}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-inset">
                    <div className="h-full rounded-full" style={{ width: `${d.v}%`, background: isTop ? "var(--emphasis)" : "var(--primary)" }}/>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[10px] border border-border p-4">
              <div className="text-[12px] font-600 uppercase tracking-wider text-muted-foreground">Why a strong match</div>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-[13px]">
                <li>5 yrs Go/PostgreSQL at scale (fintech)</li>
                <li>Led migration project — matches scope</li>
                <li>Based in Cyberjaya, hybrid-friendly</li>
              </ul>
            </div>
            <div className="rounded-[10px] border border-border p-4">
              <div className="text-[12px] font-600 uppercase tracking-wider text-muted-foreground">Gaps</div>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-[13px]">
                <li>No prior team-lead title (only informal mentorship)</li>
                <li>Limited exposure to payments domain</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                toast.info("Opening message", { description: `Starting conversation with ${active.name}` });
              }}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-[10px] border border-border bg-card text-sm font-600 hover:border-primary transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Message
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleReject(active.id, active.name)}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-[10px] border border-error bg-card text-error text-sm font-600 hover:bg-error-soft transition-colors"
            >
              <X className="h-4 w-4" />
              Reject
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScheduleInterview(active.name)}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-[10px] bg-primary text-primary-foreground text-sm font-600 hover:opacity-90 transition-opacity ml-auto"
            >
              Move to interview
              <ArrowRight className="h-4 w-4"/>
            </motion.button>
          </div>
        </section>
      </div>

      {/* Comparison View */}
      <AnimatePresence>
        {compareMode && selectedForCompare.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 rounded-[12px] border border-primary bg-card p-6 shadow-hero"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-600">Candidate Comparison</h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedForCompare([]);
                  setCompareMode(false);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedForCompare.map(candidateId => {
                const candidate = candidates.find(c => c.id === candidateId);
                if (!candidate) return null;
                return (
                  <motion.div
                    key={candidateId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-[10px] border border-border p-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img src={candidate.avatar} alt="" className="h-10 w-10 rounded-full object-cover"/>
                      <div>
                        <div className="text-[14px] font-600">{candidate.name}</div>
                        <div className="text-[12px] text-muted-foreground">{candidate.role}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[12px]">
                        <span>Fit Score</span>
                        <Badge tone="ai" size="sm">{candidate.fit}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span>Experience</span>
                        <span className="font-600">{candidate.exp}</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span>Location</span>
                        <span className="font-600">{candidate.loc}</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span>Top Strength</span>
                        <Badge tone="emphasis" size="sm">{candidate.top}</Badge>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleScheduleInterview(candidate.name)}
                        className="flex-1 h-8 rounded-[8px] bg-primary text-primary-foreground text-[11px] font-600 hover:opacity-90 transition-opacity"
                      >
                        Interview
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActive(candidate)}
                        className="flex-1 h-8 rounded-[8px] border border-border bg-card text-[11px] font-600 hover:border-primary transition-colors"
                      >
                        View Full
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add button to open calendar view */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setCalendarOpen(true)}
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 h-12 px-5 rounded-[12px] bg-primary text-primary-foreground shadow-hero hover:opacity-90 transition-opacity z-30"
      >
        <Calendar className="h-5 w-5" />
        <span className="font-600">View Interview Calendar</span>
      </motion.button>

      {/* Interview Calendar Modal */}
      <InterviewCalendar
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        candidateName={selectedCandidateForInterview}
      />
    </AppShell>
  );
}
