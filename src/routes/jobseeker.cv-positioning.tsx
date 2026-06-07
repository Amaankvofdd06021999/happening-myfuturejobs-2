import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AIPanel } from "@/components/AIPanel";
import { jobseekerNav } from "@/lib/nav";
import { ScoreCard, Badge, SectionTitle, KPITile } from "@/components/ui-bits";
import { Sparkles, TrendingUp, DollarSign, Briefcase, AlertTriangle, CheckCircle2, Plus, X, ArrowUp, ArrowDown, Target, Brain, Zap, BookOpen, FileText, Download, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn, cardHover } from "@/lib/animations";
import { useState, useEffect } from "react";
import useStore from "@/lib/store";

export const Route = createFileRoute("/jobseeker/cv-positioning")({
  head: () => ({ meta: [{ title: "CV Market Positioning — MYFutureJobs" }] }),
  component: Page,
});

interface Skill {
  name: string;
  category: 'have' | 'missing' | 'hot' | 'preferred' | 'implicit';
  impact: number;
  trending?: boolean;
}

const skills: Skill[] = [
  { name: "SEO", category: 'have', impact: 5 },
  { name: "Content Marketing", category: 'have', impact: 8 },
  { name: "Brand Management", category: 'have', impact: 7 },
  { name: "Stakeholder Mgmt", category: 'have', impact: 6 },
  { name: "Reporting", category: 'have', impact: 4 },
  { name: "Campaign Execution", category: 'have', impact: 9 },
  { name: "SQL", category: 'missing', impact: 15 },
  { name: "Tableau/Looker", category: 'missing', impact: 12 },
  { name: "HubSpot", category: 'missing', impact: 8 },
  { name: "A/B Testing", category: 'missing', impact: 10 },
  { name: "AI Prompt Design", category: 'hot', impact: 18, trending: true },
  { name: "Marketing Automation", category: 'preferred', impact: 14 },
  { name: "Data Storytelling", category: 'implicit', impact: 11 },
  { name: "Cross-cultural Campaigns", category: 'implicit', impact: 7 }
];

const salaryBenchmarks = [
  { role: "Marketing Executive", min: 3800, max: 5500, current: false },
  { role: "Senior Marketing Exec", min: 5000, max: 7000, current: true },
  { role: "Marketing Manager", min: 6500, max: 9000, current: false },
  { role: "Senior Brand Manager", min: 7500, max: 11000, current: false },
  { role: "Growth Marketing Lead", min: 8000, max: 12000, current: false }
];

function Page() {
  const { user, addNotification } = useStore();
  const [positioningScore, setPositioningScore] = useState(0);
  const [currentSalary] = useState(5200);
  const [marketAvg] = useState(6400);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showSalaryDetails, setShowSalaryDetails] = useState(false);
  const [analyzingCV, setAnalyzingCV] = useState(false);
  const [cvInsights, setCvInsights] = useState({
    strengths: [] as string[],
    gaps: [] as string[],
    opportunities: [] as string[]
  });

  useEffect(() => {
    // Animate score on mount
    setTimeout(() => setPositioningScore(68), 500);

    // Simulate CV analysis
    setTimeout(() => {
      setCvInsights({
        strengths: [
          "Strong brand storytelling examples",
          "Quantified campaign results (ROI +45%)",
          "Multi-channel expertise evident"
        ],
        gaps: [
          "No data analytics tools mentioned",
          "Limited tech stack visibility",
          "Missing industry certifications"
        ],
        opportunities: [
          "Add SQL/Python to unlock 42 more roles",
          "Highlight cross-functional leadership",
          "Include MarTech stack experience"
        ]
      });
    }, 1000);
  }, []);

  const handleSkillToggle = (skillName: string) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(prev => prev.filter(s => s !== skillName));
    } else {
      setSelectedSkills(prev => [...prev, skillName]);

      // Update score when adding skills
      const skill = skills.find(s => s.name === skillName);
      if (skill && skill.category === 'missing') {
        setPositioningScore(prev => Math.min(100, prev + Math.floor(skill.impact / 2)));
        addNotification({
          id: Date.now().toString(),
          type: 'success',
          title: 'Skill Added',
          message: `Adding ${skillName} could increase matches by ${skill.impact}%`,
          timestamp: new Date(),
          read: false
        });
      }
    }
  };

  const handleCVAnalysis = () => {
    setAnalyzingCV(true);
    setTimeout(() => {
      setAnalyzingCV(false);
      addNotification({
        id: Date.now().toString(),
        type: 'info',
        title: 'CV Analysis Complete',
        message: 'Found 3 strengths, 3 gaps, and 3 opportunities',
        timestamp: new Date(),
        read: false
      });
    }, 2000);
  };

  const salaryPercentile = Math.round((currentSalary - 3800) / (10000 - 3800) * 100);

  return (
    <AppShell
      nav={jobseekerNav}
      user={user || { name: "Ahmad Rahman", email: "ahmad@email.com", role: "jobseeker" }}
      rightPanel={
        <AIPanel
          title="Career Assistant"
          subtitle="CV positioning analysis"
          why={
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <p>Salary benchmark uses last 90 days of verified MYFutureJobs offers in <b>Marketing · KL/Selangor · 5–7 yrs</b>.</p>
              <motion.p variants={fadeInUp} className="mt-2">
                Confidence band reflects sample size (n=412 verified offers).
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-3 p-2 rounded-[8px] bg-inset">
                <div className="flex items-center gap-2 text-[11px]">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  <span>Data verified from actual job offers</span>
                </div>
              </motion.div>
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
              className="rounded-[10px] bg-emphasis-soft p-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-emphasis" />
                <span className="text-[11px] font-600 uppercase tracking-wider text-emphasis">
                  Key Finding
                </span>
              </div>
              <p className="text-[12px] leading-relaxed">
                You're <b>underpaid by ~RM {(marketAvg - currentSalary).toLocaleString()}/mo</b> for your skill profile in your region.
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-2 text-[11px] font-600 text-emphasis hover:underline"
                onClick={() => setShowSalaryDetails(true)}
              >
                See detailed breakdown →
              </motion.button>
            </motion.div>

            <motion.div variants={fadeInUp} className="rounded-[10px] border border-border p-3">
              <div className="text-[12px] font-600">Roles you're qualified for</div>
              <ul className="mt-2 space-y-2 text-[12px]">
                {salaryBenchmarks.slice(2, 5).map((role, i) => (
                  <motion.li
                    key={role.role}
                    variants={fadeInUp}
                    custom={i}
                    whileHover={{ x: 2 }}
                    className="flex items-center justify-between p-2 rounded-[6px] bg-inset hover:bg-primary-soft cursor-pointer"
                  >
                    <span>{role.role}</span>
                    <span className="text-[11px] font-600 text-primary">
                      RM {(role.min/1000).toFixed(1)}k+
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="text-[11px] font-600 text-muted-foreground">Quick Actions</div>
              {[
                { icon: "📊", label: "Update salary expectations", action: "update-salary" },
                { icon: "🎯", label: "Target higher roles", action: "target-roles" },
                { icon: "📚", label: "Get missing certifications", action: "get-certs" }
              ].map((action) => (
                <motion.button
                  key={action.action}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left p-2 rounded-[8px] border border-border hover:border-primary hover:bg-primary-soft"
                  onClick={() => {
                    addNotification({
                      id: Date.now().toString(),
                      type: 'info',
                      title: action.label,
                      message: 'Opening relevant section...',
                      timestamp: new Date(),
                      read: false
                    });
                  }}
                >
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="text-[16px]">{action.icon}</span>
                    <span className="font-500">{action.label}</span>
                  </div>
                </motion.button>
              ))}
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
        <h1 className="text-[28px] font-700 tracking-tight">CV Market Positioning Analysis</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          See how your CV positions you in the market and what to optimize
        </p>
      </motion.div>

      {/* Score cards */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="grid gap-4 lg:grid-cols-[1.1fr_1fr_1fr]"
      >
        <motion.div variants={scaleIn}>
          <ScoreCard
            value={positioningScore}
            band={positioningScore >= 75 ? "Strong" : "Competitive"}
            label="Positioning Score"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <KPITile
            label="Market salary fit"
            value={`P${salaryPercentile}`}
            delta="Below skill level"
            icon={<DollarSign className="h-4 w-4"/>}
            emphasis
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <KPITile
            label="Matched roles"
            value={(142 + selectedSkills.length * 8).toString()}
            delta={`+${selectedSkills.length * 8} with changes`}
            icon={<Briefcase className="h-4 w-4"/>}
          />
        </motion.div>
      </motion.div>

      {/* Salary benchmark visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 rounded-[12px] border border-border bg-card p-6 shadow-card"
      >
        <SectionTitle
          kicker="Salary benchmark"
          title="Marketing · KL/Selangor · 5–7 yrs (n=412)"
          action={
            <Badge tone="ai">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-3 w-3"/>
              </motion.div>
              AI Analysis
            </Badge>
          }
        />

        <div className="relative h-24 rounded-[10px] bg-inset px-4 overflow-hidden">
          {/* Confidence band */}
          <motion.div
            className="absolute inset-y-4 rounded-md grad-blue opacity-60"
            initial={{ left: '50%', right: '50%' }}
            animate={{ left: '20%', right: '15%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Your position */}
          <motion.div
            className="absolute inset-y-2 flex flex-col items-center"
            initial={{ left: '20%', opacity: 0 }}
            animate={{ left: `${salaryPercentile}%`, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="rounded bg-emphasis px-2 py-0.5 text-[10px] font-600 text-white z-10"
            >
              YOU · RM {currentSalary.toLocaleString()}
            </motion.div>
            <div className="mt-1 h-16 w-0.5 bg-emphasis" />
          </motion.div>

          {/* Market average */}
          <motion.div
            className="absolute inset-y-2 flex flex-col items-center"
            initial={{ left: '80%', opacity: 0 }}
            animate={{ left: '72%', opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, type: "spring" }}
              className="rounded bg-foreground px-2 py-0.5 text-[10px] font-600 text-background z-10"
            >
              Market · RM {marketAvg.toLocaleString()}
            </motion.div>
            <div className="mt-1 h-16 w-0.5 bg-foreground" />
          </motion.div>
        </div>

        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
          <span>RM 3.8k</span>
          <span>RM 5k</span>
          <span>RM 6.5k</span>
          <span>RM 8k</span>
          <span>RM 10k</span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-4 text-[13px] leading-relaxed text-muted-foreground"
        >
          Your current package sits at <b>P{salaryPercentile}</b>.
          Profiles with similar skill graphs are typically offered between{' '}
          <b>RM 6,400 – 7,800</b>.
          Confidence: <span className="text-emphasis font-600">High</span>.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSalaryDetails(true)}
          className="mt-3 inline-flex items-center gap-2 text-[12px] font-600 text-primary hover:underline"
        >
          <Eye className="h-3 w-3" />
          View detailed salary breakdown →
        </motion.button>
      </motion.div>

      {/* Skills analysis */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-[12px] border border-border bg-card p-6 shadow-card"
        >
          <SectionTitle title="Skills Coverage" />
          <div className="flex flex-wrap gap-2">
            {skills.filter(s => s.category === 'have').map((skill, i) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="rounded-full bg-primary-soft px-3 py-1 text-[12px] font-600 text-primary cursor-pointer"
              >
                <CheckCircle2 className="inline h-3 w-3 mr-1" />
                {skill.name}
              </motion.span>
            ))}

            {skills.filter(s => s.category === 'missing').map((skill, i) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.05, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSkillToggle(skill.name)}
                className={`rounded-full border ${
                  selectedSkills.includes(skill.name)
                    ? 'bg-success-soft border-success text-success'
                    : 'border-dashed border-emphasis bg-emphasis-soft text-emphasis'
                } px-3 py-1 text-[12px] font-600 cursor-pointer transition-all`}
              >
                {selectedSkills.includes(skill.name) ? (
                  <>
                    <CheckCircle2 className="inline h-3 w-3 mr-1" />
                    {skill.name}
                  </>
                ) : (
                  <>
                    <Plus className="inline h-3 w-3 mr-1" />
                    {skill.name}
                    <span className="ml-1 text-[10px]">+{skill.impact}%</span>
                  </>
                )}
              </motion.span>
            ))}
          </div>

          {selectedSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-[10px] bg-success-soft border border-success-soft"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-600 text-success">
                  Skills to add: {selectedSkills.length}
                </span>
                <span className="text-[11px] text-success">
                  +{selectedSkills.length * 8} potential matches
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-[12px] border border-border bg-card p-6 shadow-card"
        >
          <SectionTitle title="Market Demand Signals" />
          <motion.ul
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-2 text-[13px]"
          >
            {skills.filter(s => ['hot', 'preferred', 'implicit'].includes(s.category)).map((skill, i) => (
              <motion.li
                key={skill.name}
                variants={fadeInUp}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between rounded-[8px] bg-inset px-3 py-2 hover:bg-primary-soft cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {skill.trending && (
                    <motion.div
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <TrendingUp className="h-4 w-4 text-emphasis"/>
                    </motion.div>
                  )}
                  {!skill.trending && skill.category === 'preferred' && (
                    <Target className="h-4 w-4 text-primary"/>
                  )}
                  {!skill.trending && skill.category === 'implicit' && (
                    <Brain className="h-4 w-4 text-muted-foreground"/>
                  )}
                  {skill.name}
                </span>
                <Badge tone={
                  skill.category === 'hot' ? 'emphasis' :
                  skill.category === 'preferred' ? 'primary' : 'default'
                }>
                  {skill.category === 'hot' ? 'Hot · Trending' :
                   skill.category === 'preferred' ? 'Preferred' : 'Often Implied'}
                </Badge>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* CV Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 rounded-[12px] border border-border bg-card p-6 shadow-card"
      >
        <div className="flex items-center justify-between mb-4">
          <SectionTitle title="CV Deep Analysis" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCVAnalysis}
            disabled={analyzingCV}
            className="inline-flex items-center gap-2 h-9 px-4 rounded-[10px] bg-primary text-primary-foreground text-[12px] font-600 disabled:opacity-50"
          >
            {analyzingCV ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-3 w-3" />
                </motion.div>
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="h-3 w-3" />
                Re-analyze CV
              </>
            )}
          </motion.button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-[13px] font-600">Strengths</span>
            </div>
            {cvInsights.strengths.map((strength, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="text-[12px] p-2 rounded-[8px] bg-success-soft text-success"
              >
                {strength}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-[13px] font-600">Gaps</span>
            </div>
            {cvInsights.gaps.map((gap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-[12px] p-2 rounded-[8px] bg-warning-soft text-warning"
              >
                {gap}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-emphasis" />
              <span className="text-[13px] font-600">Opportunities</span>
            </div>
            {cvInsights.opportunities.map((opp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="text-[12px] p-2 rounded-[8px] bg-emphasis-soft text-emphasis cursor-pointer hover:bg-emphasis hover:text-white transition-colors"
              >
                {opp}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 flex gap-3"
        >
          <Link to="/jobseeker/cv-edits">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-[10px] grad-orange text-white text-[12px] font-600"
            >
              <FileText className="h-3 w-3" />
              Get CV Improvement Suggestions
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 h-9 px-4 rounded-[10px] border border-border bg-card text-[12px] font-600"
          >
            <Download className="h-3 w-3" />
            Export Analysis Report
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Salary Details Modal */}
      <AnimatePresence>
        {showSalaryDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSalaryDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-[14px] border border-border p-6 max-w-lg w-full shadow-hero"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-600">Salary Breakdown by Role</h3>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    Based on your experience level (5-7 years)
                  </p>
                </div>
                <button
                  onClick={() => setShowSalaryDetails(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                {salaryBenchmarks.map((benchmark, i) => (
                  <motion.div
                    key={benchmark.role}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-3 rounded-[10px] ${
                      benchmark.current ? 'bg-primary-soft border border-primary' : 'bg-inset'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-600">{benchmark.role}</span>
                      {benchmark.current && (
                        <Badge tone="primary" size="sm">Current Level</Badge>
                      )}
                    </div>
                    <div className="relative h-2 rounded-full bg-background">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${((benchmark.max - benchmark.min) / (12000 - 3800)) * 100}%`,
                          left: `${((benchmark.min - 3800) / (12000 - 3800)) * 100}%`
                        }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      />
                      {benchmark.current && (
                        <motion.div
                          className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 bg-emphasis"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            left: `${((currentSalary - 3800) / (12000 - 3800)) * 100}%`
                          }}
                          transition={{ delay: 0.5 }}
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[11px] text-muted-foreground">
                      <span>RM {(benchmark.min/1000).toFixed(1)}k</span>
                      <span>RM {(benchmark.max/1000).toFixed(1)}k</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 p-3 rounded-[10px] bg-emphasis-soft"
              >
                <div className="flex items-center gap-2 mb-1">
                  <ArrowUp className="h-4 w-4 text-emphasis" />
                  <span className="text-[12px] font-600 text-emphasis">Recommendation</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Target Marketing Manager or Senior Brand Manager roles for a
                  30-50% salary increase based on your current skills.
                </p>
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSalaryDetails(false)}
                className="mt-4 w-full h-9 rounded-[10px] bg-primary text-primary-foreground text-[13px] font-600"
              >
                Got it, thanks!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}