import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { employerNav } from "@/lib/nav";
import { employerUser } from "@/lib/mock";
import { Badge, SectionTitle, KPITile } from "@/components/ui-bits";
import {
  Building2, ShieldCheck, MapPin, Globe, Star, TrendingUp,
  Users, Briefcase, Award, Calendar, Clock, DollarSign,
  Heart, Coffee, Home, Laptop, GraduationCap, Sparkles,
  ChevronRight, ExternalLink, Mail, Phone, MessageSquare,
  Target, BarChart3, UserCheck, FileText, Zap, CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/employer/company")({
  head: () => ({ meta: [{ title: "Company profile — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  const [activeTab, setActiveTab] = useState<"overview" | "culture" | "jobs">("overview");

  const handleContactAction = (action: string) => {
    toast.success(`${action} initiated`, {
      description: "We'll get back to you within 24 hours"
    });
  };

  const companyStats = {
    activeJobs: 12,
    totalHires: 847,
    responseTime: "< 2 days",
    interviewRatio: "1:3",
    diversityScore: 92,
    retentionRate: "94%"
  };

  const benefits = [
    { icon: <Heart className="h-4 w-4" />, title: "Healthcare", desc: "Full medical, dental & vision" },
    { icon: <Coffee className="h-4 w-4" />, title: "Wellness", desc: "Gym, mental health support" },
    { icon: <Home className="h-4 w-4" />, title: "Flexible Work", desc: "Hybrid, 2 days WFH" },
    { icon: <Laptop className="h-4 w-4" />, title: "Equipment", desc: "Latest tech & home setup" },
    { icon: <GraduationCap className="h-4 w-4" />, title: "Learning", desc: "RM 10k annual budget" },
    { icon: <DollarSign className="h-4 w-4" />, title: "Bonus", desc: "Up to 4 months yearly" },
  ];

  const reviews = [
    { rating: 5, name: "Sarah L.", role: "Software Engineer", text: "Great work-life balance and supportive team culture." },
    { rating: 4, name: "Ahmad R.", role: "Data Analyst", text: "Excellent career growth opportunities and learning environment." },
    { rating: 5, name: "Priya K.", role: "Product Manager", text: "Innovative projects and truly diverse workplace." }
  ];

  return (
    <AppShell nav={employerNav} user={employerUser}>
      {/* Enhanced Header Section */}
      <div className="overflow-hidden rounded-[16px] bg-gradient-to-br from-primary via-primary-dark to-emphasis shadow-hero">
        <div className="relative p-8">
          {/* Company Logo and Info */}
          <div className="flex flex-wrap items-start gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex h-24 w-24 items-center justify-center rounded-[16px] bg-white shadow-hero"
            >
              <span className="text-3xl font-700 text-primary">PD</span>
            </motion.div>

            <div className="flex-1 text-white">
              <h1 className="text-[32px] font-700 tracking-tight">Petronas Digital Sdn Bhd</h1>
              <p className="mt-2 text-[15px] text-white/90 max-w-2xl">
                Leading Malaysia's digital transformation in energy sector with cutting-edge technology solutions
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Badge tone="success" className="bg-white/20 backdrop-blur text-white border-white/30">
                  <ShieldCheck className="h-3.5 w-3.5"/> Verified Platinum Employer
                </Badge>
                <Badge tone="default" className="bg-white/20 backdrop-blur text-white border-white/30">
                  <Star className="h-3.5 w-3.5"/> 4.6 Rating (248 reviews)
                </Badge>
                <Badge tone="ai" className="bg-white/20 backdrop-blur text-white border-white/30">
                  <Award className="h-3.5 w-3.5"/> Best Workplace 2024
                </Badge>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-[13px] text-white/80">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4"/> KLCC, Kuala Lumpur
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4"/> 1,200+ employees
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4"/> petronas.com.my
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4"/> Est. 2019
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-white px-4 text-sm font-600 text-primary hover:bg-white/90"
              >
                <MessageSquare className="h-4 w-4"/> Message Us
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-white/30 bg-white/10 backdrop-blur px-4 text-sm font-600 text-white hover:bg-white/20"
              >
                <Users className="h-4 w-4"/> Follow Company
              </motion.button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { label: "Active Jobs", value: companyStats.activeJobs, icon: <Briefcase className="h-3.5 w-3.5"/> },
              { label: "Total Hires", value: companyStats.totalHires, icon: <UserCheck className="h-3.5 w-3.5"/> },
              { label: "Response Time", value: companyStats.responseTime, icon: <Clock className="h-3.5 w-3.5"/> },
              { label: "Interview Ratio", value: companyStats.interviewRatio, icon: <Target className="h-3.5 w-3.5"/> },
              { label: "Diversity Score", value: `${companyStats.diversityScore}%`, icon: <Heart className="h-3.5 w-3.5"/> },
              { label: "Retention", value: companyStats.retentionRate, icon: <TrendingUp className="h-3.5 w-3.5"/> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/10 backdrop-blur rounded-[10px] p-3 border border-white/20"
              >
                <div className="flex items-center gap-1.5 text-[11px] text-white/70 mb-1">
                  {stat.icon}
                  {stat.label}
                </div>
                <div className="text-[18px] font-700 text-white">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-6 flex items-center gap-2 p-1 rounded-[12px] border border-border bg-card">
        {["overview", "culture", "jobs"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 h-10 rounded-[10px] text-[13px] font-600 capitalize transition-all ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "hover:bg-inset"
            }`}
          >
            {tab === "overview" && <BarChart3 className="inline h-4 w-4 mr-1.5"/>}
            {tab === "culture" && <Heart className="inline h-4 w-4 mr-1.5"/>}
            {tab === "jobs" && <Briefcase className="inline h-4 w-4 mr-1.5"/>}
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* About Section */}
            <div className="lg:col-span-2 rounded-[12px] border border-border bg-card p-6 shadow-card">
              <SectionTitle title="About Petronas Digital"/>
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                Petronas Digital is the technology backbone of PETRONAS, Malaysia's national oil and gas company.
                We're building the digital infrastructure that powers the future of energy - from AI-driven exploration
                to carbon-neutral operations.
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                Our 1,200+ team members work on cutting-edge projects in cloud computing, data analytics, AI/ML,
                and digital twins. We're not just digitizing processes - we're reimagining how energy companies
                operate in the 21st century.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-[10px] bg-inset p-4">
                  <div className="text-[12px] font-600 text-muted-foreground mb-2">Our Mission</div>
                  <p className="text-[13px]">Accelerate PETRONAS' transformation through digital innovation</p>
                </div>
                <div className="rounded-[10px] bg-inset p-4">
                  <div className="text-[12px] font-600 text-muted-foreground mb-2">Industry Focus</div>
                  <p className="text-[13px]">Energy, Technology, Sustainability, Digital Transformation</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-[13px] font-600 mb-3">Key Achievements</div>
                <div className="space-y-2">
                  {[
                    "Malaysia Digital Status Company",
                    "ISO 27001 Certified for Information Security",
                    "Winner of IDC Digital Transformation Awards 2023",
                    "Carbon Neutral Operations by 2025"
                  ].map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2 text-[13px]">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0"/>
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hiring Insights */}
            <div className="space-y-4">
              <div className="rounded-[12px] border border-border bg-card p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="h-5 w-5 text-primary"/>
                  <h3 className="text-[15px] font-600">Hiring Insights</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-muted-foreground">Avg. Time to Hire</span>
                    <span className="text-[13px] font-600">11 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-muted-foreground">Applications/Month</span>
                    <span className="text-[13px] font-600">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-muted-foreground">Interview Success</span>
                    <span className="text-[13px] font-600">32%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-muted-foreground">Offer Accept Rate</span>
                    <span className="text-[13px] font-600">89%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[12px] border border-border bg-card p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-primary"/>
                  <h3 className="text-[15px] font-600">Quick Links</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Careers Page", url: "petronas.com/careers" },
                    { label: "LinkedIn", url: "linkedin.com/company/petronas" },
                    { label: "Glassdoor Reviews", url: "glassdoor.com/petronas" }
                  ].map((link) => (
                    <button
                      key={link.label}
                      onClick={() => toast.info(`Opening ${link.url}`)}
                      className="w-full flex items-center justify-between p-2 rounded-[8px] hover:bg-inset transition-colors text-[13px]"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground"/>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "culture" && (
          <div className="grid gap-6">
            {/* Benefits & Perks */}
            <div className="rounded-[12px] border border-border bg-card p-6 shadow-card">
              <SectionTitle title="Benefits & Perks"/>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-[10px] bg-inset"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-primary-soft text-primary">
                      {benefit.icon}
                    </div>
                    <div>
                      <div className="text-[13px] font-600">{benefit.title}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{benefit.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Employee Reviews */}
            <div className="rounded-[12px] border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <SectionTitle title="Employee Reviews"/>
                <Badge tone="success">
                  <Star className="h-3.5 w-3.5"/> 4.6/5.0
                </Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {reviews.map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-[10px] border border-border p-4"
                  >
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`h-3.5 w-3.5 ${
                            j < review.rating ? "fill-warning text-warning" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[13px] text-muted-foreground mb-2">"{review.text}"</p>
                    <div className="text-[11px]">
                      <span className="font-600">{review.name}</span> • {review.role}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="rounded-[12px] border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <SectionTitle title="Open Positions"/>
              <Badge tone="primary">{companyStats.activeJobs} active jobs</Badge>
            </div>
            <div className="text-center py-12 text-[14px] text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50"/>
              View and manage job postings in the Vacancies section
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
