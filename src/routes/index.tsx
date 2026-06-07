import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Search, MapPin, Sparkles, Briefcase, Building2, GraduationCap, Calendar, Award, ArrowRight, CheckCircle2, BarChart3, Users, ShieldCheck, Brain, Zap, Globe, TrendingUp, FileText, Play, Lock, Rocket, Target, ChevronRight, BookOpen, Layers, LineChart, UserCheck, MessageSquare, Settings, Database, Shield, Smartphone, Cloud, Mail, Phone, MapPinned, Facebook, Twitter, Linkedin, Instagram, Youtube, ExternalLink, Clock, Star, UserCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import { Badge } from "@/components/ui-bits";
import teamHero from "@/assets/team-hero.jpg";
import heroImage from "../../Heroimage.png";
import mobileAppPreview from "../../MobileApppreview.png";
import downloadMobile from "../../downloadmobile.png";
import person1 from "@/assets/person-1.jpg";
import person2 from "@/assets/person-2.jpg";
import person3 from "@/assets/person-3.jpg";
import person4 from "@/assets/person-4.jpg";
import eventCarnival from "@/assets/event-carnival.jpg";
import eventTraining from "@/assets/event-training.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MYFutureJobs — Find work that fits you" },
      { name: "description", content: "Malaysia's national employment portal. AI-powered job matching, verified employers, training & rewards." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [language, setLanguage] = useState("English");

  // Handler for job search
  const handleJobSearch = () => {
    if (!jobSearch && !locationSearch) {
      toast.error("Please enter a job title or location to search");
      return;
    }
    toast.success(`Searching for ${jobSearch || "jobs"} in ${locationSearch || "all locations"}...`, {
      description: "This would normally redirect to the jobs page with search results",
    });
  };

  // Handler for popular tags
  const handlePopularTag = (tag: string) => {
    setJobSearch(tag);
    toast.info(`Searching for ${tag} positions...`, {
      description: "Popular search applied",
    });
  };

  // Handler for event registration
  const handleEventAction = (eventName: string, actionType: string) => {
    toast.success(`${actionType} confirmed for ${eventName}!`, {
      description: "We've sent a confirmation email with event details.",
    });
  };

  // Handler for mobile app downloads
  const handleAppDownload = (platform: string) => {
    toast.info(`Redirecting to ${platform} store...`, {
      description: "Download the MYFutureJobs app to stay connected on the go!",
    });
  };

  // Handler for integration clicks
  const handleIntegrationClick = (integrationName: string) => {
    toast.info(`${integrationName} integration`, {
      description: "Click to learn more about connecting this tool to MYFutureJobs",
    });
  };

  // Handler for ROI calculator
  const handleROICalculator = () => {
    toast.success("Opening ROI Calculator...", {
      description: "Calculate your potential savings with MYFutureJobs",
    });
  };

  // Handler for resource actions
  const handleResourceAction = (resource: string) => {
    toast.info(`Opening ${resource}...`, {
      description: "Redirecting to resource page",
    });
  };

  // Handler for partner clicks
  const handlePartnerClick = (partner: string) => {
    toast.info(`${partner}`, {
      description: "Opening partner information",
    });
  };

  // Handler for language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    toast.success(`Language changed to ${newLang}`, {
      description: "All content will be displayed in your selected language",
    });
  };

  // Handler for social media links
  const handleSocialClick = (platform: string) => {
    toast.info(`Opening ${platform}...`, {
      description: "Redirecting to our social media page",
    });
  };

  // Handler for footer links
  const handleFooterLink = (link: string) => {
    toast.info(`Opening ${link}...`);
  };

  // Handler for live chat
  const handleLiveChat = () => {
    toast.success("Live chat opened!", {
      description: "An agent will be with you shortly",
    });
  };

  // Handler for navigation scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      toast.info("Navigating to section...");
    }
  };

  return (
    <div className="min-h-dvh bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-6 px-4 lg:px-8">
          <Logo />
          <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#jobs" onClick={(e) => handleNavClick(e, "jobs")} className="hover:text-foreground cursor-pointer transition-colors">Find jobs</a>
            <a href="#employers" onClick={(e) => handleNavClick(e, "employers")} className="hover:text-foreground cursor-pointer transition-colors">Employers</a>
            <a href="#events" onClick={(e) => handleNavClick(e, "events")} className="hover:text-foreground cursor-pointer transition-colors">Events</a>
            <a href="#ai-features" onClick={(e) => handleNavClick(e, "ai-features")} className="hover:text-foreground cursor-pointer transition-colors">AI Features</a>
            <a href="#success" onClick={(e) => handleNavClick(e, "success")} className="hover:text-foreground cursor-pointer transition-colors">Success Stories</a>
            <a href="#resources" onClick={(e) => handleNavClick(e, "resources")} className="hover:text-foreground cursor-pointer transition-colors">Resources</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Link to="/signin" className="hidden h-10 items-center rounded-[10px] px-4 text-sm font-600 text-foreground hover:bg-inset sm:inline-flex">
              Sign in
            </Link>
            <Link to="/signin" className="inline-flex h-10 items-center rounded-[10px] bg-primary px-4 text-sm font-600 text-primary-foreground hover:opacity-95">
              Create account
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH SEARCH */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-8 lg:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emphasis" />
              National employment portal · Powered by PERKESO
            </div>
            <h1 className="text-[44px] font-700 leading-[1.05] tracking-tight lg:text-[60px]">
              Find work that <span className="text-emphasis">fits you</span>, not just any job.
            </h1>
            <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-muted-foreground">
              Smart matching, AI career coaching, verified Malaysian employers, and pathways into training — all in one place.
            </p>

            {/* ENHANCED SEARCH WITH AI */}
            <div id="jobs" className="mt-7 rounded-[14px] border border-border bg-card p-2 shadow-hero">
              <div className="grid gap-2 md:grid-cols-[1.5fr_1fr_auto]">
                <label className="relative flex items-center gap-2 rounded-[10px] bg-inset px-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    placeholder="Job title, skill or company"
                    className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleJobSearch()}
                  />
                  <Badge tone="ai" className="absolute right-3"><Sparkles className="h-3 w-3"/> AI</Badge>
                </label>
                <label className="flex items-center gap-2 rounded-[10px] bg-inset px-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <input
                    placeholder="Kuala Lumpur, Selangor…"
                    className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleJobSearch()}
                  />
                </label>
                <button
                  onClick={handleJobSearch}
                  className="h-12 rounded-[10px] grad-orange px-6 text-sm font-600 text-white hover:opacity-90 transition-opacity"
                >
                  Find jobs
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2 px-2 py-2 text-[12px] text-muted-foreground">
                <span>Popular:</span>
                {["Admin Clerk", "Software Engineer", "Nurse", "Sales Executive", "F&B"].map((t) => (
                  <button
                    key={t}
                    onClick={() => handlePopularTag(t)}
                    className="rounded-full border border-border px-2.5 py-0.5 hover:border-primary hover:text-primary transition-colors"
                  >
                    {t}
                  </button>
                ))}
                <button className="ml-auto flex items-center gap-1 text-emphasis font-600 hover:underline">
                  <MessageSquare className="h-3 w-3"/> Ask AI Assistant
                </button>
              </div>
            </div>

            {/* QUICK ACCESS HUB */}
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <button className="rounded-[10px] border border-border bg-card p-3 text-left hover:border-primary transition-colors">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-[13px] font-600">Community Hub</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">Join 15K+ job seekers</p>
              </button>
              <button className="rounded-[10px] border border-border bg-card p-3 text-left hover:border-primary transition-colors">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-[13px] font-600">Upcoming Events</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">3 career fairs this week</p>
              </button>
              <button className="rounded-[10px] border border-border bg-card p-3 text-left hover:border-primary transition-colors">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="text-[13px] font-600">Top Employers</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">120+ companies hiring</p>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-[12px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary"/> Verified employers only</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary"/> Data stays on-premises</span>
              <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-emphasis"/> AI-powered matching</span>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="overflow-hidden rounded-[18px] border border-border shadow-hero">
              <img src={heroImage} alt="Malaysian professional working" className="aspect-[5/4] w-full object-cover" />
            </div>
            {/* Floating cards */}
            <div className="absolute -left-4 top-10 hidden w-[230px] rounded-[12px] border border-border bg-card p-3 shadow-hero sm:block">
              <div className="flex items-center gap-3">
                <img src={person3} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="text-[13px] font-600">Aisyah · Marketing</div>
                  <div className="text-[11px] text-muted-foreground">Matched in 2 days</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Career Signal</span>
                <span className="num font-600 text-emphasis">82</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-inset"><div className="h-full bg-emphasis" style={{ width: "82%" }} /></div>
            </div>
            <div className="absolute -right-4 bottom-8 hidden w-[240px] rounded-[12px] border border-border bg-card p-3 shadow-hero sm:block">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-600 uppercase tracking-wider text-muted-foreground">Jobs near you</div>
                <Badge tone="ai"><Sparkles className="h-3 w-3"/> AI</Badge>
              </div>
              <div className="mt-2 space-y-2">
                {[
                  { t: "Software Engineer", c: "Petronas Digital", l: "KL · RM 6.5k" },
                  { t: "Operations Exec", c: "MISC Berhad", l: "Selangor · RM 4.2k" },
                ].map((j) => (
                  <div key={j.t} className="rounded-[8px] bg-inset px-2.5 py-2">
                    <div className="text-[12px] font-600">{j.t}</div>
                    <div className="text-[11px] text-muted-foreground">{j.c} · {j.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROLE SELECTION (Job Seeker, Employer, Officer) */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: <Briefcase className="h-5 w-5"/>, t: "I'm looking for a job", d: "Build your profile, get AI-matched roles, and track every application.", to: "/signin", emp: false, cta: "Find jobs" },
              { icon: <Building2 className="h-5 w-5"/>, t: "I'm hiring talent", d: "Post vacancies, screen with AI fit-match, and book interviews faster.", to: "/signin", emp: true, cta: "Post a job" },
              { icon: <ShieldCheck className="h-5 w-5"/>, t: "Case Officer (PERKESO)", d: "Manage caseloads, oversee employers, and run market intelligence.", to: "/signin", emp: false, cta: "Officer sign-in" },
            ].map((r) => (
              <Link key={r.t} to={r.to} className="group rounded-[14px] border border-border bg-card p-6 transition-shadow hover:shadow-hero">
                <span className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[10px] ${r.emp ? "grad-orange text-white" : "bg-primary-soft text-primary"}`}>
                  {r.icon}
                </span>
                <div className="text-[18px] font-600">{r.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{r.d}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-600 text-primary group-hover:gap-2 transition-all">
                  {r.cta} <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOP EMPLOYERS SHOWCASE */}
      <section id="employers" className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8">
        <div className="mb-8">
          <div className="mb-1 text-[12px] font-600 uppercase tracking-wider text-emphasis">Featured Employers</div>
          <h2 className="text-[28px] font-600 tracking-tight">Top employers actively hiring now</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              company: "Petronas Digital",
              vacancies: 45,
              logoUrl: "https://logo.clearbit.com/petronas.com",
              bgColor: "bg-teal-50",
              featured: ["Software Engineer", "Data Analyst"],
              hiring: "Immediate",
              microsites: true,
              analytics: "82% match rate"
            },
            {
              company: "Maybank",
              vacancies: 38,
              logoUrl: "https://logo.clearbit.com/maybank.com",
              bgColor: "bg-yellow-50",
              featured: ["Branch Manager", "Risk Analyst"],
              hiring: "Q1 2026",
              microsites: true,
              analytics: "75% match rate"
            },
            {
              company: "AirAsia",
              vacancies: 67,
              logoUrl: "https://logo.clearbit.com/airasia.com",
              bgColor: "bg-red-50",
              featured: ["Cabin Crew", "Ground Staff"],
              hiring: "Ongoing",
              microsites: false,
              analytics: "91% match rate"
            },
            {
              company: "Grab Malaysia",
              vacancies: 29,
              logoUrl: "https://logo.clearbit.com/grab.com",
              bgColor: "bg-green-50",
              featured: ["Operations Lead", "Product Manager"],
              hiring: "Immediate",
              microsites: true,
              analytics: "88% match rate"
            },
            {
              company: "Shopee",
              vacancies: 51,
              logoUrl: "https://logo.clearbit.com/shopee.com",
              bgColor: "bg-orange-50",
              featured: ["Marketing Exec", "Logistics Coordinator"],
              hiring: "Monthly",
              microsites: true,
              analytics: "79% match rate"
            },
            {
              company: "TNB",
              vacancies: 33,
              logoUrl: "https://logo.clearbit.com/tnb.com.my",
              bgColor: "bg-blue-50",
              featured: ["Electrical Engineer", "Project Manager"],
              hiring: "Q2 2026",
              microsites: false,
              analytics: "71% match rate"
            },
          ].map((emp) => (
            <div key={emp.company} className="rounded-[14px] border border-border bg-card p-5 hover:shadow-hero transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-[10px] ${emp.bgColor} p-2`}>
                    <img
                      src={emp.logoUrl}
                      alt={`${emp.company} logo`}
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        // Fallback to first letter if logo fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-xl font-bold text-gray-700">${emp.company.charAt(0)}</span>`;
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-600">{emp.company}</h3>
                    <p className="text-[12px] text-emphasis font-600">{emp.vacancies} open positions</p>
                  </div>
                </div>
                {emp.microsites && <Badge tone="ai"><Sparkles className="h-3 w-3"/> Verified</Badge>}
              </div>
              <div className="mt-4 space-y-2">
                {emp.featured.map((job) => (
                  <div key={job} className="flex items-center justify-between rounded-[8px] bg-inset px-3 py-2">
                    <span className="text-[13px] font-500">{job}</span>
                    <span className="text-[11px] text-primary font-600">Apply →</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Hiring: {emp.hiring}</span>
                <span className="text-emphasis font-600">{emp.analytics}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS & PROGRAMS */}
      <section id="events" className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="mb-1 text-[12px] font-600 uppercase tracking-wider text-emphasis">Programs & Events</div>
              <h2 className="text-[28px] font-600 tracking-tight">Career fairs, training & hiring events near you</h2>
            </div>
            <button onClick={() => handleResourceAction("All Events")} className="hidden text-sm font-600 text-primary hover:underline md:inline">
              See all →
            </button>
          </div>

          {/* Smart Event Recommendations */}
          <div className="mb-8 grid gap-4 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {[
                { type: "Recommended", event: "Digital Marketing Summit", match: "92% match", location: "Kuala Lumpur", date: "15 Mar", skills: ["SEO", "Analytics", "Content"], why: "Matches your marketing background" },
                { type: "Near You", event: "Startup Career Fair", match: "85% match", location: "Petaling Jaya (5km)", date: "22 Mar", skills: ["Agile", "Leadership", "Innovation"], why: "Walking distance from your location" },
                { type: "Industry Specific", event: "FinTech Hiring Day", match: "78% match", location: "Cyberjaya", date: "28 Mar", skills: ["Banking", "Blockchain", "Risk"], why: "Aligns with your finance experience" },
              ].map((rec) => (
                <div key={rec.event} className="rounded-[12px] border border-border bg-card p-4 hover:shadow-card transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge tone="primary">{rec.type}</Badge>
                      <h3 className="mt-2 text-[16px] font-600">{rec.event}</h3>
                      <p className="text-[13px] text-muted-foreground">{rec.location} · {rec.date}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {rec.skills.map((skill) => (
                          <span key={skill} className="rounded-full bg-inset px-2 py-0.5 text-[11px]">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[20px] font-600 text-emphasis">{rec.match}</div>
                      <p className="text-[11px] text-muted-foreground">AI match score</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 rounded-[8px] bg-primary-soft p-2">
                    <Sparkles className="h-4 w-4 text-primary"/>
                    <span className="text-[12px] text-primary font-500">{rec.why}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-[14px] border border-border bg-card p-5">
              <h3 className="text-[16px] font-600">Your Event Preferences</h3>
              <div className="mt-4 space-y-3">
                <div className="rounded-[8px] bg-inset p-3">
                  <div className="text-[12px] font-600 text-muted-foreground">Location Range</div>
                  <div className="mt-1 text-[14px] font-600">Within 25km</div>
                </div>
                <div className="rounded-[8px] bg-inset p-3">
                  <div className="text-[12px] font-600 text-muted-foreground">Career Interests</div>
                  <div className="mt-1 text-[14px] font-600">Tech, Marketing, Data</div>
                </div>
                <div className="rounded-[8px] bg-inset p-3">
                  <div className="text-[12px] font-600 text-muted-foreground">Event Types</div>
                  <div className="mt-1 text-[14px] font-600">Career Fairs, Training</div>
                </div>
              </div>
              <button className="mt-4 w-full rounded-[10px] border border-border bg-card py-2 text-[13px] font-600 hover:border-primary hover:text-primary transition-colors">
                Update Preferences →
              </button>
            </div>
          </div>

          {/* Event Cards */}
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { img: eventCarnival, tag: "Career Carnival", t: "MYFutureJobs Carnival KL 2026", d: "12–14 Mar · KLCC · 120+ employers · Walk-in interviews", cta: "RSVP" },
              { img: eventTraining, tag: "Training", t: "Industrial Automation Bootcamp", d: "4 weeks · Penang · HRDC-claimable · Cert on completion", cta: "Apply" },
              { img: teamHero, tag: "Hiring Event", t: "Tech & Digital Hiring Day", d: "28 Feb · Cyberjaya · 30+ tech employers", cta: "Register" },
            ].map((e) => (
              <article key={e.t} className="overflow-hidden rounded-[14px] border border-border bg-card shadow-card hover:shadow-hero transition-shadow">
                <img src={e.img} alt="" className="aspect-[16/10] w-full object-cover" />
                <div className="p-5">
                  <Badge tone="primary">{e.tag}</Badge>
                  <h3 className="mt-3 text-[16px] font-600">{e.t}</h3>
                  <p className="mt-1 text-[13px] text-muted-foreground">{e.d}</p>
                  <button
                    onClick={() => handleEventAction(e.t, e.cta)}
                    className="mt-4 inline-flex h-9 items-center rounded-[10px] border border-border bg-card px-4 text-[13px] font-600 hover:border-primary hover:text-primary transition-colors"
                  >
                    {e.cta} →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AI FEATURES */}
      <section id="ai-features" className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-2 text-[12px] font-600 uppercase tracking-wider text-emphasis">AI-Powered Technology</div>
          <h2 className="text-[36px] font-700 tracking-tight">Smart hiring that scales with you</h2>
          <p className="mx-auto mt-3 max-w-[600px] text-[16px] text-muted-foreground">
            Our AI engine processes millions of data points to match the right talent with the right opportunities, reducing time-to-hire by 65%.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <Brain className="h-5 w-5"/>, title: "Smart Candidate Sourcing", desc: "AI automatically finds and ranks qualified candidates from our 2M+ talent pool", stats: "400M+ profiles analyzed", gradient: true },
            { icon: <Zap className="h-5 w-5"/>, title: "Instant Resume Parsing", desc: "Extract and structure candidate data in seconds with 99.2% accuracy", stats: "0.3s avg processing time" },
            { icon: <Target className="h-5 w-5"/>, title: "Predictive Matching", desc: "ML models predict candidate success based on historical hiring patterns", stats: "87% placement success rate" },
            { icon: <MessageSquare className="h-5 w-5"/>, title: "Automated Screening", desc: "AI-powered chatbots conduct initial screenings 24/7 in multiple languages", stats: "50% reduction in screening time" },
            { icon: <LineChart className="h-5 w-5"/>, title: "Market Intelligence", desc: "Real-time salary benchmarks and talent availability insights by location", stats: "Updated every 24 hours" },
            { icon: <UserCheck className="h-5 w-5"/>, title: "Bias Detection", desc: "Automated checks ensure fair and inclusive job descriptions and processes", stats: "23 bias indicators tracked" }
          ].map((feature) => (
            <div key={feature.title} className={`group rounded-[14px] border border-border ${feature.gradient ? 'grad-orange text-white' : 'bg-card'} p-6 transition-all hover:shadow-hero`}>
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[10px] ${feature.gradient ? 'bg-white/20' : 'bg-primary-soft text-primary'}`}>
                {feature.icon}
              </div>
              <h3 className={`text-[18px] font-600 ${feature.gradient ? 'text-white' : ''}`}>{feature.title}</h3>
              <p className={`mt-2 text-[14px] ${feature.gradient ? 'text-white/90' : 'text-muted-foreground'}`}>{feature.desc}</p>
              <div className={`mt-4 text-[12px] font-600 ${feature.gradient ? 'text-white/80' : 'text-emphasis'}`}>{feature.stats}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS STORIES & TESTIMONIALS */}
      <section id="success" className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8">
          <div className="mb-8">
            <div className="mb-1 text-[12px] font-600 uppercase tracking-wider text-emphasis">Success Stories</div>
            <h2 className="text-[28px] font-600 tracking-tight">Real Malaysians, real career transformations</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { img: person1, n: "Nurul Aiman", r: "Marketing Exec, KL", q: "The AI told me exactly which 3 skills to add to my CV. Got 4 callbacks in two weeks.", video: true, journey: "From intern to manager in 18 months", stats: "+125% salary increase" },
              { img: person2, n: "Daniel Tan", r: "Software Engineer, Penang", q: "Career Signal Score made me realise I was underselling myself. Pay jump of 28% on my next role.", video: false, journey: "3 job offers in 1 month", stats: "28% salary jump" },
              { img: person4, n: "Mr. Suresh", r: "HR Lead, Subang", q: "Fit-Match cut our shortlisting time from 3 days to 4 hours. Bias flags caught wording I'd missed.", video: true, journey: "Hired 50+ employees via platform", stats: "75% reduction in time-to-hire" },
            ].map((t) => (
              <figure key={t.n} className="rounded-[14px] border border-border bg-card overflow-hidden shadow-card">
                {t.video && (
                  <div className="relative aspect-video bg-inset">
                    <img src={t.img} alt="" className="h-full w-full object-cover" />
                    <button className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors">
                      <div className="rounded-full bg-white p-3">
                        <Play className="h-5 w-5 text-black" />
                      </div>
                    </button>
                  </div>
                )}
                <div className="p-5">
                  <blockquote className="text-[15px] leading-relaxed">"{t.q}"</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    {!t.video && <img src={t.img} alt="" className="h-10 w-10 rounded-full object-cover" />}
                    <div className="flex-1">
                      <div className="text-[13px] font-600">{t.n}</div>
                      <div className="text-[11px] text-muted-foreground">{t.r}</div>
                    </div>
                  </figcaption>
                  <div className="mt-4 space-y-2 border-t border-border pt-4">
                    <div className="flex items-center gap-2 text-[12px]">
                      <TrendingUp className="h-3 w-3 text-primary" />
                      <span className="text-muted-foreground">{t.journey}</span>
                    </div>
                    <div className="text-[14px] font-600 text-emphasis">{t.stats}</div>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRY SOLUTIONS MARQUEE */}
      <section id="industries" className="overflow-hidden py-16">
        <div className="mx-auto mb-12 max-w-[1280px] px-4 lg:px-8">
          <div className="mb-2 text-[12px] font-600 uppercase tracking-wider text-emphasis">Industry Solutions</div>
          <h2 className="text-[36px] font-700 tracking-tight">Tailored for every Malaysian industry</h2>
          <p className="mt-3 max-w-[600px] text-[16px] text-muted-foreground">
            Pre-built workflows, compliance checks, and talent pools specific to your sector.
          </p>
        </div>

        {/* Marquee container */}
        <div className="marquee-container relative">
          <div className="marquee-content">
            {/* First set of cards */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4 px-2">
                {[
                  {
                    industry: "Technology",
                    icon: <Rocket className="h-8 w-8" />,
                    features: ["Tech stack matching", "GitHub integration", "Coding assessments"],
                    talent: "45K+ developers",
                    bgColor: "from-blue-600/10 to-purple-600/10",
                    borderColor: "border-blue-500/20"
                  },
                  {
                    industry: "Healthcare",
                    icon: <Shield className="h-8 w-8" />,
                    features: ["License verification", "Shift scheduling", "MMC compliance"],
                    talent: "28K+ practitioners",
                    bgColor: "from-green-600/10 to-teal-600/10",
                    borderColor: "border-green-500/20"
                  },
                  {
                    industry: "Manufacturing",
                    icon: <Settings className="h-8 w-8" />,
                    features: ["Safety certifications", "Skill matrices", "HRDF tracking"],
                    talent: "120K+ workers",
                    bgColor: "from-gray-600/10 to-slate-600/10",
                    borderColor: "border-gray-500/20"
                  },
                  {
                    industry: "Retail & F&B",
                    icon: <Users className="h-8 w-8" />,
                    features: ["High-volume hiring", "Part-time management", "Location matching"],
                    talent: "85K+ frontliners",
                    bgColor: "from-orange-600/10 to-red-600/10",
                    borderColor: "border-orange-500/20"
                  },
                  {
                    industry: "Finance",
                    icon: <LineChart className="h-8 w-8" />,
                    features: ["BNM compliance", "Background checks", "Certification tracking"],
                    talent: "32K+ professionals",
                    bgColor: "from-indigo-600/10 to-blue-600/10",
                    borderColor: "border-indigo-500/20"
                  },
                  {
                    industry: "Education",
                    icon: <GraduationCap className="h-8 w-8" />,
                    features: ["MOE requirements", "Academic credentials", "Teaching permits"],
                    talent: "18K+ educators",
                    bgColor: "from-purple-600/10 to-pink-600/10",
                    borderColor: "border-purple-500/20"
                  },
                  {
                    industry: "Construction",
                    icon: <Building2 className="h-8 w-8" />,
                    features: ["CIDB cards", "Safety training", "Foreign worker permits"],
                    talent: "95K+ trades",
                    bgColor: "from-yellow-600/10 to-orange-600/10",
                    borderColor: "border-yellow-500/20"
                  },
                  {
                    industry: "Hospitality",
                    icon: <Globe className="h-8 w-8" />,
                    features: ["Multi-language support", "Seasonal hiring", "Tourism certs"],
                    talent: "42K+ staff",
                    bgColor: "from-cyan-600/10 to-blue-600/10",
                    borderColor: "border-cyan-500/20"
                  }
                ].map((solution, index) => (
                  <div
                    key={`${setIndex}-${index}`}
                    className={`relative min-w-[320px] overflow-hidden rounded-[16px] border ${solution.borderColor} bg-gradient-to-br ${solution.bgColor} p-6 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl`}
                  >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20" />
                      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emphasis/20" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[12px] bg-background/80 shadow-lg">
                        <div className="text-primary">{solution.icon}</div>
                      </div>
                      <h3 className="text-[20px] font-600">{solution.industry}</h3>
                      <div className="mt-4 space-y-2">
                        {solution.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-[13px] text-foreground/80">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                            {f}
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between rounded-[10px] bg-background/60 px-4 py-3">
                        <span className="text-[12px] font-500 text-muted-foreground">Available talent</span>
                        <span className="text-[14px] font-600 text-emphasis">{solution.talent}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER SERVICES */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8">
        <div className="mb-8">
          <div className="mb-1 text-[12px] font-600 uppercase tracking-wider text-emphasis">Career Services</div>
          <h2 className="text-[28px] font-600 tracking-tight">A complete toolkit for your career</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <Sparkles/>, t: "Career Signal Score", d: "Know exactly where you stand vs. the market — and how to improve." },
            { icon: <BarChart3/>, t: "CV Market Positioning", d: "AI critique with side-by-side rewrites and tracked changes." },
            { icon: <GraduationCap/>, t: "Training Pathways", d: "Certifications mapped to roles you want, not roles you don't." },
            { icon: <Award/>, t: "Interview Rewards", d: "Transport vouchers when you attend interviews via the portal." },
            { icon: <Users/>, t: "Verified Employers", d: "Every company is screened by PERKESO before posting." },
            { icon: <Calendar/>, t: "Events & Carnivals", d: "RSVP, walk-in interviews and on-site hiring across Malaysia." },
            { icon: <Briefcase/>, t: "Application Tracker", d: "Applied → Interview → KIV → Hired. Never lose track again." },
            { icon: <ShieldCheck/>, t: "On-prem AI, anonymised", d: "Your data never leaves PERKESO infrastructure." },
          ].map((s) => (
            <div key={s.t} className="rounded-[12px] border border-border bg-card p-5">
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-[8px] bg-primary-soft text-primary">{s.icon}</span>
              <div className="text-[15px] font-600">{s.t}</div>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROI METRICS */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8">

            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              {/* Left content */}
              <div>
                <div className="mb-2 text-[12px] font-600 uppercase tracking-wider text-emphasis">The Numbers</div>
                <h2 className="text-[42px] font-700 leading-tight tracking-tight">ROI that speaks for itself</h2>
                <p className="mt-3 max-w-[500px] text-[16px] text-muted-foreground">
                  Companies using MYFutureJobs see measurable improvements across all hiring metrics within 30 days.
                </p>

                <div className="mt-10 space-y-5">
                  {[
                    { icon: <Clock className="h-5 w-5" />, metric: "Time to hire", before: "45 days", after: "12 days", improvement: "-73%", color: "orange" },
                    { icon: <Briefcase className="h-5 w-5" />, metric: "Cost per hire", before: "RM 8,500", after: "RM 2,100", improvement: "-75%", color: "orange" },
                    { icon: <Star className="h-5 w-5" />, metric: "Quality of hire", before: "62%", after: "89%", improvement: "+44%", color: "orange" },
                    { icon: <UserCircle className="h-5 w-5" />, metric: "Candidate experience", before: "3.2/5", after: "4.7/5", improvement: "+47%", color: "orange" }
                  ].map((stat) => (
                    <div key={stat.metric} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-200 bg-orange-50 text-orange-600">
                        {stat.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[15px] font-600">{stat.metric}</span>
                          <span className="rounded-full bg-green-100 px-3 py-1 text-[12px] font-600 text-green-600">{stat.improvement}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[13px]">
                          <span className="text-muted-foreground">Before: {stat.before}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className="font-600 text-emphasis">After: {stat.after}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={handleROICalculator} className="mt-8 inline-flex h-12 items-center rounded-[10px] grad-orange px-8 text-[15px] font-600 text-white hover:opacity-90 transition-opacity">
                  Calculate your ROI →
                </button>
              </div>

              {/* Right side metrics */}
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="rounded-[16px] border border-border bg-card/95 backdrop-blur p-6">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-emphasis" />
                      <div>
                        <div className="text-[36px] font-700 text-emphasis num leading-tight">2.3M+</div>
                        <div className="text-[13px] text-muted-foreground">Successful placements to date</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-border bg-card/95 backdrop-blur p-6">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-8 w-8 text-emphasis" />
                      <div>
                        <div className="text-[36px] font-700 text-emphasis num leading-tight">8,400+</div>
                        <div className="text-[13px] text-muted-foreground">Companies actively hiring</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-border bg-card/95 backdrop-blur p-6">
                    <div className="flex items-center gap-3">
                      <Award className="h-8 w-8 text-emphasis" />
                      <div>
                        <div className="text-[36px] font-700 text-emphasis num leading-tight">4.8/5</div>
                        <div className="text-[13px] text-muted-foreground">Average employer rating</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* This month card */}
                <div className="rounded-[16px] border border-primary bg-primary-soft p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span className="text-[12px] font-600 uppercase text-primary">This Month</span>
                    </div>
                    <Badge tone="success">+26%</Badge>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[32px] font-700 num">62,847</div>
                      <div className="text-[13px] text-muted-foreground">New jobs posted</div>
                    </div>
                    <div className="flex items-end gap-1">
                      {[20, 35, 25, 40, 30, 45, 55].map((h, i) => (
                        <div key={i} className="w-2 rounded-t bg-primary/30" style={{ height: `${h}px` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section id="resources" className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8">
        <div className="mb-12">
          <div className="mb-2 text-[12px] font-600 uppercase tracking-wider text-emphasis">Resources</div>
          <h2 className="text-[36px] font-700 tracking-tight">Everything you need to hire smarter</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[14px] border border-border bg-card p-6">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[10px] grad-orange text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-[18px] font-600">Hiring Playbooks</h3>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Step-by-step guides for hiring across 50+ roles with Malaysian market insights.
            </p>
            <button onClick={() => handleResourceAction("Hiring Guides")} className="mt-5 inline-flex items-center gap-1 text-[13px] font-600 text-primary hover:gap-2 transition-all">
              Browse all guides <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-[14px] border border-border bg-card p-6">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-primary-soft text-primary">
              <Play className="h-5 w-5" />
            </div>
            <h3 className="text-[18px] font-600">Webinar Series</h3>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Weekly sessions with HR leaders sharing recruitment best practices.
            </p>
            <button onClick={() => handleResourceAction("Webinars")} className="mt-5 inline-flex items-center gap-1 text-[13px] font-600 text-primary hover:gap-2 transition-all">
              Register for webinars <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-[14px] border border-border bg-card p-6">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-primary-soft text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="text-[18px] font-600">Templates & Tools</h3>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Ready-to-use templates for job descriptions, interviews, and offers.
            </p>
            <button onClick={() => handleResourceAction("Templates")} className="mt-5 inline-flex items-center gap-1 text-[13px] font-600 text-primary hover:gap-2 transition-all">
              Access templates <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* MOBILE APP */}
      <section className="relative border-y border-border bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 pb-0 pt-16 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div className="pb-16">
              <div className="mb-2 text-[12px] font-600 uppercase tracking-wider text-emphasis">Mobile First</div>
              <h2 className="text-[36px] font-700 leading-tight tracking-tight">Hire on the go with our mobile app</h2>
              <p className="mt-3 text-[16px] text-muted-foreground">
                Review candidates, schedule interviews, and make offers—all from your phone.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Push notifications for new applications",
                  "One-tap candidate review and shortlisting",
                  "Voice notes for team collaboration",
                  "Offline mode for uninterrupted workflow"
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-[14px]">
                    <div className="mt-0.5">
                      <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </div>
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => handleAppDownload("iOS App")}
                  className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-black px-6 text-[14px] font-600 text-white hover:opacity-90 transition-opacity"
                >
                  <Smartphone className="h-4 w-4" />
                  Download for iOS
                </button>
                <button
                  onClick={() => handleAppDownload("Android")}
                  className="inline-flex h-11 items-center gap-2 rounded-[8px] border border-border bg-white px-6 text-[14px] font-600 text-foreground hover:border-primary hover:bg-gray-50 transition-colors"
                >
                  <Smartphone className="h-4 w-4" />
                  Get for Android
                </button>
              </div>
            </div>

            {/* Mobile phone image aligned with bottom border */}
            <div className="relative lg:mr-10">
              <img
                src={downloadMobile}
                alt="MYFutureJobs mobile app interface"
                className="w-[280px] lg:w-[320px] xl:w-[360px] h-auto object-contain drop-shadow-2xl"
                style={{ marginBottom: '-1px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8">
        <div className="overflow-hidden rounded-[18px] border border-border bg-card p-8 shadow-hero lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="mb-2 text-[12px] font-600 uppercase tracking-wider text-emphasis">Get started — free</div>
              <h2 className="text-[36px] font-700 leading-tight tracking-tight">Three minutes to your first AI-matched job</h2>
              <p className="mt-3 max-w-lg text-[15px] text-muted-foreground">No fees, no spam, no agency middlemen. Built and run by PERKESO for every Malaysian.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/signin" className="inline-flex h-11 items-center rounded-[10px] grad-orange px-6 text-sm font-600 text-white">Create your account →</Link>
                <Link to="/signin" className="inline-flex h-11 items-center rounded-[10px] border border-border bg-card px-6 text-sm font-600">I'm an employer</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "Verified employers", v: "8,400+" },
                { k: "Open vacancies", v: "62k" },
                { k: "Trainings live", v: "320" },
                { k: "Avg. time to hire", v: "9 days" },
              ].map((s, i) => (
                <div key={s.k} className={`rounded-[12px] p-4 ${i === 1 ? "grad-orange text-white" : "border border-border bg-inset"}`}>
                  <div className={`text-[11px] font-600 uppercase tracking-wide ${i===1 ? "text-white/90" : "text-muted-foreground"}`}>{s.k}</div>
                  <div className={`num mt-1 text-[26px] font-600 ${i===1 ? "text-white" : "text-foreground"}`}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
            {/* Brand column */}
            <div>
              <Logo />
              <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed text-muted-foreground">
                Malaysia's national employment portal, powered by PERKESO. Connecting talent with opportunity since 2012.
              </p>
              <div className="mt-6 flex gap-3">
                {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                  <button
                    key={i}
                    onClick={() => handleSocialClick(Icon.name)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-border bg-card hover:border-primary hover:text-primary transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div>
              <h3 className="text-[14px] font-600">For Job Seekers</h3>
              <ul className="mt-4 space-y-2.5">
                {["Browse Jobs", "Career Advice", "Resume Builder", "Salary Calculator"].map((link) => (
                  <li key={link}><button onClick={() => handleFooterLink(link)} className="text-[13px] text-muted-foreground hover:text-primary">{link}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[14px] font-600">For Employers</h3>
              <ul className="mt-4 space-y-2.5">
                {["Post a Job", "Search Resumes", "Pricing Plans", "HR Resources"].map((link) => (
                  <li key={link}><button onClick={() => handleFooterLink(link)} className="text-[13px] text-muted-foreground hover:text-primary">{link}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[14px] font-600">Resources</h3>
              <ul className="mt-4 space-y-2.5">
                {["Help Center", "Blog", "Webinars", "Success Stories"].map((link) => (
                  <li key={link}><button onClick={() => handleFooterLink(link)} className="text-[13px] text-muted-foreground hover:text-primary">{link}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[14px] font-600">Get Support</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-[13px] text-foreground">1-300-88-5055</div>
                    <div className="text-[11px] text-muted-foreground">Mon-Fri, 8:30 AM - 5:30 PM</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <a href="mailto:support@myfuturejobs.gov.my" className="text-[13px] text-foreground hover:text-primary">support@myfuturejobs.gov.my</a>
                  </div>
                </li>
              </ul>
              <button onClick={handleLiveChat} className="mt-4 inline-flex h-9 items-center gap-2 rounded-[8px] border border-border bg-card px-4 text-[13px] font-600 hover:border-primary hover:text-primary">
                <MessageSquare className="h-3.5 w-3.5" />
                Live Chat
              </button>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="text-[12px] text-muted-foreground">
                © 2026 MYFutureJobs. All rights reserved. Operated under PERKESO for the people of Malaysia.
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                <select value={language} onChange={handleLanguageChange} className="bg-transparent text-[12px] text-muted-foreground outline-none">
                  <option>English</option>
                  <option>Bahasa Malaysia</option>
                  <option>中文</option>
                  <option>தமிழ்</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <FloatingChatbot />
    </div>
  );
}