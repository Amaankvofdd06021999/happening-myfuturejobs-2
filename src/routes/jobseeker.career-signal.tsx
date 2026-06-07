import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AIPanel } from "@/components/AIPanel";
import { jobseekerNav } from "@/lib/nav";
import { ScoreCard, KPITile, Badge, SectionTitle } from "@/components/ui-bits";
import { TrendingUp, Sparkles, Target, BarChart3, ChevronUp, ChevronDown, Info, Award, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn, progressBar } from "@/lib/animations";
import { useState, useEffect } from "react";
import useStore from "@/lib/store";

export const Route = createFileRoute("/jobseeker/career-signal")({
  head: () => ({ meta: [{ title: "Career Signal — MYFutureJobs" }] }),
  component: Page,
});

interface Dimension {
  name: string;
  score: number;
  peer: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
  suggestions: string[];
}

const dimensions: Dimension[] = [
  {
    name: "Skills coverage",
    score: 78,
    peer: 71,
    trend: 'up',
    description: "How well your skills match market demand",
    suggestions: ["Add SQL and Python", "Get AWS certification", "Update technical skills"]
  },
  {
    name: "Experience relevance",
    score: 82,
    peer: 70,
    trend: 'stable',
    description: "Relevance of your work history to target roles",
    suggestions: ["Highlight leadership experience", "Add quantifiable achievements"]
  },
  {
    name: "Credentials",
    score: 60,
    peer: 68,
    trend: 'down',
    description: "Professional certifications and qualifications",
    suggestions: ["Complete industry certifications", "Add professional memberships"]
  },
  {
    name: "Activity & recency",
    score: 88,
    peer: 72,
    trend: 'up',
    description: "How active you are on the platform",
    suggestions: ["Keep applying regularly", "Update profile weekly"]
  },
  {
    name: "Profile completeness",
    score: 82,
    peer: 80,
    trend: 'stable',
    description: "How complete and detailed your profile is",
    suggestions: ["Add portfolio links", "Complete education details"]
  },
];

function Page() {
  const { user, addNotification } = useStore();
  const [currentScore, setCurrentScore] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(null);
  const [showImprovement, setShowImprovement] = useState(false);
  const [animatedDims, setAnimatedDims] = useState<Dimension[]>([]);
  const [historicalData] = useState([
    { month: 'Jan', score: 62 },
    { month: 'Feb', score: 65 },
    { month: 'Mar', score: 68 },
    { month: 'Apr', score: 70 },
    { month: 'May', score: 72 },
    { month: 'Jun', score: 74 },
  ]);

  useEffect(() => {
    // Animate score increase
    const timer = setTimeout(() => {
      setCurrentScore(user?.careerSignalScore || 74);
    }, 500);

    // Animate dimensions one by one
    dimensions.forEach((dim, index) => {
      setTimeout(() => {
        setAnimatedDims(prev => [...prev, dim]);
      }, 700 + index * 100);
    });

    return () => clearTimeout(timer);
  }, [user]);

  const handleImprovementAction = (action: string) => {
    setShowImprovement(true);
    addNotification({
      id: Date.now().toString(),
      type: 'info',
      title: 'Improvement Started',
      message: `Working on: ${action}`,
      timestamp: new Date(),
      read: false
    });

    setTimeout(() => {
      setCurrentScore(prev => Math.min(100, prev + Math.floor(Math.random() * 5 + 3)));
      addNotification({
        id: Date.now().toString(),
        type: 'success',
        title: 'Score Updated!',
        message: `Your Career Signal improved by +${Math.floor(Math.random() * 5 + 3)} points`,
        timestamp: new Date(),
        read: false
      });
    }, 2000);
  };

  return (
    <AppShell
      nav={jobseekerNav}
      user={user || { name: "Ahmad Rahman", email: "ahmad@email.com", role: "jobseeker" }}
      rightPanel={
        <AIPanel
          title="Career Assistant"
          subtitle="Score explainer"
          why={
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="space-y-2"
            >
              <p>Your Career Signal of <b>{currentScore}</b> is based on:</p>
              <motion.ul variants={fadeInUp} className="list-disc pl-4 space-y-1">
                <li>Skill match against 4,200 active Senior roles in MY</li>
                <li>Peer benchmark: 312 anonymised profiles with similar experience</li>
                <li>Activity over the last 30 days</li>
                <li>Profile completeness and quality metrics</li>
              </motion.ul>
              <motion.p variants={fadeInUp} className="pt-1 text-[11px] text-muted-foreground">
                All data processed on-prem and anonymised.
              </motion.p>
            </motion.div>
          }
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-3"
          >
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              className="rounded-[10px] border border-emphasis-soft bg-emphasis-soft p-3"
            >
              <div className="text-[11px] font-600 uppercase tracking-wider text-emphasis">
                🎯 Biggest lever
              </div>
              <div className="mt-1 text-[13px] font-600">Add 2 professional credentials</div>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Could move you to <b>Strong</b> band (target: 82+)
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleImprovementAction("Add credentials")}
                className="mt-2 inline-flex h-7 items-center rounded-[8px] bg-emphasis px-3 text-[11px] font-600 text-white"
              >
                Start now →
              </motion.button>
            </motion.div>

            <div className="text-[12px] font-600 text-muted-foreground">Quick actions</div>

            <motion.div variants={staggerContainer} className="space-y-2">
              {[
                { t: "Add SQL skill", d: "+6 score · unlocks 18 roles", icon: "💻", time: "2 min" },
                { t: "Take Digital Analytics cert", d: "+9 score · unlocks 24 roles", icon: "📊", time: "4 hrs" },
                { t: "Refresh CV summary", d: "+3 score · instant boost", icon: "📝", time: "5 min" },
                { t: "Complete portfolio section", d: "+5 score · showcase work", icon: "🎨", time: "15 min" },
              ].map((action, i) => (
                <motion.button
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleImprovementAction(action.t)}
                  className="w-full rounded-[10px] border border-border p-3 text-left hover:border-primary hover:bg-primary-soft transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px]">{action.icon}</span>
                        <span className="text-[13px] font-600">{action.t}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{action.d}</div>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{action.time}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="rounded-[10px] bg-card border border-border p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-3.5 w-3.5 text-primary" />
                <span className="text-[11px] font-600 text-primary">Pro tip</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Profiles with 80+ scores get 3x more interview invites. You're just 6 points away!
              </p>
            </motion.div>
          </motion.div>
        </AIPanel>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="text-[12px] font-600 uppercase tracking-wider text-emphasis">Career Assistant</div>
        <h1 className="text-[28px] font-700 tracking-tight">Career Signal & Scoring</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Where you stand against the market, and exactly how to climb.
        </p>
      </motion.div>

      {/* Main score and KPIs */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]"
      >
        <motion.div variants={scaleIn}>
          <ScoreCard value={currentScore} band={currentScore >= 80 ? "Strong" : "Competitive"} />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <KPITile
            label="Peer percentile"
            value="68th"
            delta="Top third in your role"
            icon={<Target className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <KPITile
            label="Trend (90d)"
            value={`+${currentScore - 63}`}
            delta="Consistently improving"
            icon={<TrendingUp className="h-4 w-4" />}
            emphasis
          />
        </motion.div>
      </motion.div>

      {/* Score breakdown by dimension */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 rounded-[12px] border border-border bg-card p-6 shadow-card"
      >
        <SectionTitle
          kicker="Breakdown"
          title="Score by dimension"
          action={
            <Badge tone="ai">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-3 w-3" />
              </motion.div>
              AI Analysis
            </Badge>
          }
        />
        <div className="space-y-5">
          {animatedDims.map((dim, i) => (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedDimension(dim)}
              className="cursor-pointer"
            >
              <div className="mb-1.5 flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-2">
                  <span className="font-600">{dim.name}</span>
                  {dim.trend === 'up' && <ChevronUp className="h-3 w-3 text-success" />}
                  {dim.trend === 'down' && <ChevronDown className="h-3 w-3 text-error" />}
                  {dim.score < dim.peer && (
                    <AlertCircle className="h-3 w-3 text-warning" />
                  )}
                </div>
                <span className="num text-muted-foreground">
                  You: {dim.score} · Peers: {dim.peer}
                </span>
              </div>
              <div className="relative h-2.5 overflow-hidden rounded-full bg-inset">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${dim.score}%` }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  style={{
                    background: dim.score >= dim.peer
                      ? "linear-gradient(90deg, var(--primary), var(--emphasis))"
                      : "var(--primary)"
                  }}
                />
                <motion.div
                  className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 bg-foreground/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  style={{ left: `${dim.peer}%` }}
                  aria-label="Peer benchmark"
                />
              </div>
              {dim.score < dim.peer && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] text-warning mt-1"
                >
                  Below peer average · Focus area
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Market positioning and improvements */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-[12px] border border-border bg-card p-6 shadow-card"
        >
          <SectionTitle title="Market positioning" />
          <div className="flex h-44 items-end gap-2">
            {[42, 55, 60, 68, 74, 78, 82, 88].map((v, i) => (
              <motion.div
                key={i}
                className="relative flex-1 rounded-t-md"
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
                style={{
                  background: i === 4
                    ? "linear-gradient(180deg, var(--emphasis), var(--emphasis-soft))"
                    : "var(--primary)"
                }}
                whileHover={{ opacity: 0.8 }}
              >
                {i === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-emphasis px-1.5 py-0.5 text-[10px] font-600 text-white"
                  >
                    YOU
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
            <span>P10</span><span>P25</span><span>P40</span><span>P55</span>
            <span className="font-600 text-emphasis">P68</span>
            <span>P80</span><span>P92</span><span>P99</span>
          </div>

          {/* Historical trend */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-[11px] font-600 uppercase tracking-wider text-muted-foreground mb-2">
              6-month trend
            </div>
            <div className="flex items-end gap-1 h-16">
              {historicalData.map((data, i) => (
                <motion.div
                  key={data.month}
                  className="flex-1 flex flex-col items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                >
                  <motion.div
                    className="w-full rounded-t bg-primary-soft"
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.score / 100) * 48}px` }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.05 }}
                  />
                  <span className="text-[9px] text-muted-foreground">{data.month}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-[12px] border border-border bg-card p-6 shadow-card"
        >
          <SectionTitle title="What lifts your score" />
          <motion.ul
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-3 text-[13px]"
          >
            {[
              { t: "Add SQL skill", v: "+6", c: "emphasis", icon: "⚡", urgent: true },
              { t: "Complete Digital Analytics cert", v: "+9", c: "primary", icon: "📚" },
              { t: "Add measurable achievements", v: "+4", c: "primary", icon: "📈" },
              { t: "Refresh activity (apply this week)", v: "+2", c: "primary", icon: "🎯" },
              { t: "Complete portfolio section", v: "+5", c: "primary", icon: "💼" },
            ].map((improvement, i) => (
              <motion.li
                key={improvement.t}
                variants={fadeInUp}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between rounded-[8px] border border-border px-3 py-2.5 hover:border-primary hover:bg-primary-soft transition-all cursor-pointer"
                onClick={() => handleImprovementAction(improvement.t)}
              >
                <span className="flex items-center gap-2">
                  <span className="text-[16px]">{improvement.icon}</span>
                  <span>{improvement.t}</span>
                  {improvement.urgent && (
                    <Badge tone="emphasis" size="sm">Quick win</Badge>
                  )}
                </span>
                <motion.span
                  className={`num font-600 ${improvement.c === "emphasis" ? "text-emphasis" : "text-primary"}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                >
                  {improvement.v}
                </motion.span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 p-3 rounded-[10px] bg-emphasis-soft border border-emphasis-soft"
          >
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-emphasis" />
              <span className="text-[12px] font-600 text-emphasis">Instant boost available!</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Complete 3 quick actions now for +12 points total
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="mt-2 inline-flex h-7 items-center rounded-[8px] grad-orange px-3 text-[11px] font-600 text-white w-full justify-center"
            >
              Boost my score now →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Dimension details modal */}
      <AnimatePresence>
        {selectedDimension && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDimension(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-[14px] border border-border p-6 max-w-md w-full shadow-hero"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-600">{selectedDimension.name}</h3>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    {selectedDimension.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDimension(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-[10px] bg-inset">
                  <span className="text-[13px]">Your score</span>
                  <span className="text-[18px] font-600 text-primary">
                    {selectedDimension.score}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-[10px] bg-inset">
                  <span className="text-[13px]">Peer average</span>
                  <span className="text-[18px] font-600 text-muted-foreground">
                    {selectedDimension.peer}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-[13px] font-600 mb-2">How to improve</h4>
                <ul className="space-y-2">
                  {selectedDimension.suggestions.map((suggestion, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-[12px]"
                    >
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                      {suggestion}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleImprovementAction(`Improve ${selectedDimension.name}`);
                  setSelectedDimension(null);
                }}
                className="mt-4 w-full h-9 rounded-[10px] bg-primary text-primary-foreground text-[13px] font-600"
              >
                Start improving →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Improvement notification */}
      <AnimatePresence>
        {showImprovement && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 bg-card rounded-[12px] border border-success-soft shadow-hero p-4 max-w-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-soft">
                <Award className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-[13px] font-600">Great progress!</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  Your Career Signal is improving. Keep going!
                </p>
              </div>
              <button
                onClick={() => setShowImprovement(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}