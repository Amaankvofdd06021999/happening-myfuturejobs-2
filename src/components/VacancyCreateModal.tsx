import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui-bits";
import {
  X, Sparkles, AlertTriangle, CheckCircle2, Brain,
  FileText, Wand2, ChevronRight, TrendingUp, Users,
  Target, Globe, DollarSign, Info
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface VacancyCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "generate" | "analyze";
}

export function VacancyCreateModal({ isOpen, onClose, mode }: VacancyCreateModalProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!jobDescription) {
      toast.error("Please enter a job description to analyze");
      return;
    }

    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        score: 82,
        clarity: 78,
        inclusivity: 85,
        marketFit: 88,
        issues: [
          { type: "warning", text: "Years of experience requirement may be too restrictive" },
          { type: "warning", text: "Missing salary range information" },
          { type: "info", text: "Consider adding remote work options" },
        ],
        suggestions: [
          "Add specific technical skills required",
          "Include company culture and values",
          "Specify growth opportunities",
        ]
      });
      setIsAnalyzing(false);
      toast.success("Analysis complete!", { description: "Your JD scored 82/100" });
    }, 2000);
  };

  const handleGenerate = () => {
    if (!jobTitle) {
      toast.error("Please enter a job title first");
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setJobDescription(`
**About the Role**
We are seeking an experienced ${jobTitle} to join our dynamic team. This role offers an exciting opportunity to contribute to innovative projects and drive organizational growth.

**Key Responsibilities:**
• Lead and manage key initiatives aligned with business objectives
• Collaborate with cross-functional teams to deliver high-quality solutions
• Analyze data and provide strategic insights to stakeholders
• Mentor junior team members and foster a culture of continuous improvement
• Drive process optimization and efficiency improvements

**Requirements:**
• Bachelor's degree in relevant field or equivalent experience
• 3-5 years of experience in similar role
• Strong analytical and problem-solving skills
• Excellent communication and interpersonal abilities
• Proficiency in relevant tools and technologies

**What We Offer:**
• Competitive salary and performance bonuses
• Comprehensive health and wellness benefits
• Professional development opportunities
• Flexible work arrangements
• Collaborative and inclusive work environment
      `.trim());
      setIsAnalyzing(false);
      toast.success("Job description generated!", { description: "Review and customize as needed" });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-5xl md:w-full md:max-h-[90vh] overflow-auto bg-card rounded-[16px] border border-border shadow-hero z-50"
          >
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="text-[20px] font-700">
                  {mode === "create" ? "Create New Vacancy" :
                   mode === "generate" ? "AI Job Description Generator" :
                   "Analyze Job Description"}
                </h2>
                <p className="text-[13px] text-muted-foreground mt-1">
                  {mode === "create" ? "Fill in the details to post a new job vacancy" :
                   mode === "generate" ? "Let AI help you create a compelling job description" :
                   "Optimize your JD for better candidate matches"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-inset transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-[1fr_380px] gap-6">
                {/* Main Content */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-600 mb-2">
                      Job Title <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g., Senior Software Engineer"
                      className="w-full h-11 rounded-[10px] border border-border bg-inset px-4 text-[13px] outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[13px] font-600">
                        Job Description <span className="text-error">*</span>
                      </label>
                      {/* Show AI buttons in all modes, not just generate mode */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleGenerate}
                          disabled={isAnalyzing || !jobTitle}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[8px] bg-primary text-[11px] font-600 text-primary-foreground hover:opacity-90 disabled:opacity-50"
                          title={!jobTitle ? "Please enter a job title first" : "Generate job description with AI"}
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          {isAnalyzing ? "Generating..." : "Generate by AI"}
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleAnalyze}
                          disabled={isAnalyzing || !jobDescription}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[8px] grad-orange text-[11px] font-600 text-white hover:opacity-90 disabled:opacity-50"
                          title={!jobDescription ? "Please enter a job description first" : "Analyze and improve your JD"}
                        >
                          <Brain className="h-3.5 w-3.5" />
                          {isAnalyzing ? "Analyzing..." : "Analyze JD"}
                        </motion.button>
                      </div>
                    </div>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Enter or paste your job description here..."
                      className="w-full h-64 rounded-[10px] border border-border bg-inset p-4 text-[13px] outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  {/* Additional Fields - Always show for create mode and when generate is complete */}
                  {(mode === "create" || (mode === "generate" && jobDescription)) && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-600 mb-2">Location</label>
                        <input
                          type="text"
                          placeholder="e.g., Kuala Lumpur"
                          className="w-full h-11 rounded-[10px] border border-border bg-inset px-4 text-[13px] outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-600 mb-2">Employment Type</label>
                        <select className="w-full h-11 rounded-[10px] border border-border bg-inset px-4 text-[13px] outline-none focus:border-primary transition-colors">
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Contract</option>
                          <option>Internship</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[13px] font-600 mb-2">Salary Range</label>
                        <input
                          type="text"
                          placeholder="e.g., RM 5,000 - 8,000"
                          className="w-full h-11 rounded-[10px] border border-border bg-inset px-4 text-[13px] outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-600 mb-2">Experience Level</label>
                        <select className="w-full h-11 rounded-[10px] border border-border bg-inset px-4 text-[13px] outline-none focus:border-primary transition-colors">
                          <option>Entry Level</option>
                          <option>Mid Level</option>
                          <option>Senior Level</option>
                          <option>Executive</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar - Analysis Results */}
                <div className="space-y-4">
                  {analysisResult && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      {/* Score Card */}
                      <div className="rounded-[12px] border border-border bg-gradient-to-br from-primary-soft to-primary-soft/50 p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-[14px] font-600">JD Score</h3>
                          <Badge tone="success">{analysisResult.score}/100</Badge>
                        </div>
                        <div className="text-[32px] font-700 text-primary mb-2">
                          {analysisResult.score}
                        </div>
                        <div className="text-[12px] text-muted-foreground">
                          Good score! A few improvements can make it excellent.
                        </div>

                        {/* Sub-scores */}
                        <div className="mt-4 space-y-2">
                          {[
                            { label: "Clarity", score: analysisResult.clarity, icon: <FileText className="h-3.5 w-3.5" /> },
                            { label: "Inclusivity", score: analysisResult.inclusivity, icon: <Users className="h-3.5 w-3.5" /> },
                            { label: "Market Fit", score: analysisResult.marketFit, icon: <Target className="h-3.5 w-3.5" /> },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-[12px]">
                                {item.icon}
                                <span>{item.label}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-inset rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.score}%` }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="h-full bg-gradient-to-r from-primary to-primary-light"
                                  />
                                </div>
                                <span className="text-[11px] font-600">{item.score}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Issues */}
                      <div className="rounded-[12px] border border-border bg-card p-4">
                        <h3 className="text-[13px] font-600 mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-warning" />
                          Issues Found
                        </h3>
                        <div className="space-y-2">
                          {analysisResult.issues.map((issue: any, i: number) => (
                            <div key={i} className="flex items-start gap-2 text-[12px]">
                              {issue.type === "warning" ? (
                                <AlertTriangle className="h-3.5 w-3.5 text-warning mt-0.5" />
                              ) : (
                                <Info className="h-3.5 w-3.5 text-primary mt-0.5" />
                              )}
                              <span>{issue.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Suggestions */}
                      <div className="rounded-[12px] border border-border bg-card p-4">
                        <h3 className="text-[13px] font-600 mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          AI Suggestions
                        </h3>
                        <div className="space-y-2">
                          {analysisResult.suggestions.map((suggestion: string, i: number) => (
                            <div key={i} className="flex items-start gap-2 text-[12px]">
                              <ChevronRight className="h-3.5 w-3.5 text-primary mt-0.5" />
                              <span>{suggestion}</span>
                            </div>
                          ))}
                        </div>
                        <button className="w-full mt-3 h-9 rounded-[8px] bg-primary text-[12px] font-600 text-primary-foreground hover:opacity-90">
                          Apply All Suggestions
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* AI Tips (shown when no analysis) */}
                  {!analysisResult && mode === "analyze" && (
                    <div className="rounded-[12px] border border-border bg-card p-4">
                      <h3 className="text-[13px] font-600 mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        AI Analysis Features
                      </h3>
                      <div className="space-y-3 text-[12px] text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5" />
                          <span>Detect bias and exclusionary language</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5" />
                          <span>Benchmark against industry standards</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5" />
                          <span>Optimize for better candidate matches</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5" />
                          <span>Improve clarity and readability</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5" />
                          <span>Get market-aligned salary suggestions</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex items-center justify-between">
              <button
                onClick={onClose}
                className="inline-flex h-10 items-center rounded-[10px] border border-border bg-card px-5 text-[13px] font-600 hover:border-primary transition-colors"
              >
                Cancel
              </button>
              <div className="flex items-center gap-3">
                {mode === "create" && (
                  <>
                    <button className="inline-flex h-10 items-center rounded-[10px] border border-border bg-card px-5 text-[13px] font-600 hover:border-primary transition-colors">
                      Save as Draft
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        toast.success("Vacancy posted!", { description: "Your job posting is now live" });
                        onClose();
                      }}
                      className="inline-flex h-10 items-center rounded-[10px] bg-primary px-5 text-[13px] font-600 text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Post Vacancy
                    </motion.button>
                  </>
                )}
                {mode === "generate" && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      toast.success("Job description saved!", { description: "You can now post your vacancy" });
                      onClose();
                    }}
                    className="inline-flex h-10 items-center rounded-[10px] bg-primary px-5 text-[13px] font-600 text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Use This Description
                  </motion.button>
                )}
                {mode === "analyze" && analysisResult && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      toast.success("Improvements applied!", { description: "Your JD has been optimized" });
                      onClose();
                    }}
                    className="inline-flex h-10 items-center rounded-[10px] bg-primary px-5 text-[13px] font-600 text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Apply Improvements
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}