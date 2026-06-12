import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui-bits";
import { Link } from "@tanstack/react-router";
import {
  X, MapPin, Calendar, DollarSign, Briefcase, Users, Clock,
  Sparkles, Brain, Target, ChevronRight, Building, CheckCircle2,
  AlertCircle, TrendingUp, Award, BookOpen, ExternalLink
} from "lucide-react";
import { toast } from "sonner";

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: string;
    title: string;
    company: string;
    logo: string;
    loc: string;
    type: string;
    pay: string;
    posted: string;
    match: number;
  };
  onApply: () => void;
}

export function JobDetailModal({ isOpen, onClose, job, onApply }: JobDetailModalProps) {
  const matchAnalysis = {
    strengths: [
      { skill: "Digital Marketing", match: 95 },
      { skill: "Content Strategy", match: 88 },
      { skill: "Analytics", match: 82 },
      { skill: "Team Leadership", match: 78 },
    ],
    gaps: [
      { skill: "SEO Optimization", suggestion: "Take our free SEO course" },
      { skill: "Google Ads", suggestion: "Get certified in 2 weeks" },
    ],
    overall: {
      score: job.match,
      recommendation: job.match >= 80 ? "Strong Match" : job.match >= 60 ? "Good Match" : "Potential Match",
      color: job.match >= 80 ? "text-green-600" : job.match >= 60 ? "text-primary" : "text-orange-500"
    }
  };

  const aiInsights = {
    companyGrowth: "+45% revenue growth in 2025",
    teamSize: "12-15 person marketing team",
    culture: "Fast-paced, data-driven environment",
    advancement: "Clear path to Senior Manager in 18-24 months",
    workStyle: "Hybrid with 2 days WFH",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-4xl md:w-full md:max-h-[90vh] overflow-auto bg-card rounded-[16px] border border-border shadow-hero z-50"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[12px] bg-inset text-2xl">
                  {job.logo}
                </div>
                <div>
                  <h2 className="text-[20px] font-700">{job.title}</h2>
                  <div className="mt-1">
                    <Link
                      to="/company/$companyId"
                      params={{ companyId: job.company.toLowerCase().replace(/\s+/g, '-') }}
                      className="text-[14px] text-muted-foreground hover:text-primary hover:underline transition-colors inline-flex items-center gap-1"
                      onClick={onClose}
                    >
                      {job.company}
                      <ExternalLink className="h-3.5 w-3.5"/>
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 text-[12px] text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5"/> {job.loc}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5"/> {job.type}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5"/> {job.pay}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5"/> Posted {job.posted} ago</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-inset transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Match Score Analysis */}
              <div className="rounded-[14px] border border-border bg-gradient-to-r from-primary-soft/50 to-primary-soft/20 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-600 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary"/> Match Score Analysis
                  </h3>
                  <div className="text-right">
                    <div className="text-[28px] font-700 text-primary">{matchAnalysis.overall.score}%</div>
                    <div className={`text-[12px] font-600 ${matchAnalysis.overall.color}`}>
                      {matchAnalysis.overall.recommendation}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div>
                    <div className="text-[13px] font-600 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600"/> Your Strengths
                    </div>
                    <div className="space-y-2">
                      {matchAnalysis.strengths.map((s) => (
                        <div key={s.skill} className="flex items-center justify-between">
                          <span className="text-[12px]">{s.skill}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-inset rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${s.match}%` }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="h-full bg-gradient-to-r from-primary to-primary-light"
                              />
                            </div>
                            <span className="text-[11px] font-600 text-primary">{s.match}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Improvement Areas */}
                  <div>
                    <div className="text-[13px] font-600 mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-orange-500"/> Skills to Improve
                    </div>
                    <div className="space-y-2">
                      {matchAnalysis.gaps.map((g) => (
                        <div key={g.skill} className="rounded-[10px] bg-card/80 p-3">
                          <div className="text-[12px] font-600">{g.skill}</div>
                          <div className="text-[11px] text-muted-foreground mt-1">{g.suggestion}</div>
                          <button className="text-[11px] font-600 text-primary hover:underline mt-2">
                            Learn more →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI-Assisted Insights */}
              <div className="rounded-[14px] border border-border bg-card p-5">
                <h3 className="text-[16px] font-600 flex items-center gap-2 mb-4">
                  <Brain className="h-5 w-5 text-primary"/> AI-Powered Insights
                </h3>

                <div className="grid md:grid-cols-2 gap-3">
                  {Object.entries(aiInsights).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-3 rounded-[10px] bg-inset p-3">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0"/>
                      <div>
                        <div className="text-[11px] font-600 uppercase text-muted-foreground">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-[13px] mt-0.5">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-[10px] bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-orange-600 mt-0.5"/>
                    <div>
                      <div className="text-[13px] font-600 text-orange-900 dark:text-orange-400">
                        Interview Success Tip
                      </div>
                      <p className="text-[12px] text-orange-800 dark:text-orange-500 mt-1">
                        Based on this company's interview patterns, prepare 2-3 examples demonstrating data-driven decision making and cross-functional collaboration.
                      </p>
                      <button
                        onClick={() => toast.info("Opening interview prep guide")}
                        className="text-[12px] font-600 text-orange-700 dark:text-orange-400 hover:underline mt-2"
                      >
                        Get personalized interview questions →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h3 className="text-[16px] font-600 mb-3">About the Role</h3>
                <div className="text-[13px] leading-relaxed text-muted-foreground space-y-3">
                  <p>
                    We're looking for a passionate Marketing Manager to lead our brand initiatives and drive customer acquisition strategies.
                    You'll work closely with our product and sales teams to create compelling campaigns that resonate with our target audience.
                  </p>
                  <div>
                    <div className="font-600 text-foreground mb-2">Key Responsibilities:</div>
                    <ul className="space-y-1 ml-4">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0"/>
                        <span>Develop and execute comprehensive marketing strategies across digital channels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0"/>
                        <span>Lead a team of 3-5 marketing specialists and coordinate with external agencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0"/>
                        <span>Analyze campaign performance and optimize based on data insights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0"/>
                        <span>Manage marketing budget and ensure ROI targets are met</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Company Benefits */}
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { icon: <Users className="h-4 w-4"/>, label: "Medical & Dental", value: "Full coverage" },
                  { icon: <Clock className="h-4 w-4"/>, label: "Work-Life Balance", value: "Flexible hours" },
                  { icon: <BookOpen className="h-4 w-4"/>, label: "Learning Budget", value: "RM 5,000/year" },
                ].map((benefit) => (
                  <div key={benefit.label} className="rounded-[10px] border border-border bg-inset p-3">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      {benefit.icon}
                      <span className="text-[11px] font-600">{benefit.label}</span>
                    </div>
                    <div className="text-[12px]">{benefit.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge tone="ai">
                  <Sparkles className="h-3 w-3"/> AI recommends applying
                </Badge>
                <button
                  onClick={() => toast.info("Saving job to your list")}
                  className="text-[12px] font-600 text-muted-foreground hover:text-primary"
                >
                  Save for later
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="inline-flex h-10 items-center rounded-[10px] border border-border bg-card px-5 text-[13px] font-600 hover:border-primary transition-colors"
                >
                  Close
                </button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onApply();
                    onClose();
                  }}
                  className="inline-flex h-10 items-center rounded-[10px] bg-primary px-5 text-[13px] font-600 text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Apply Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}