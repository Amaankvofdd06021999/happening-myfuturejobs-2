import { LayoutDashboard, Briefcase, Sparkles, FileText, User, Calendar, Award, Trophy } from "lucide-react";
import type { NavItem } from "@/components/AppShell";

export const jobseekerNav: NavItem[] = [
  { to: "/jobseeker", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/jobseeker/jobs", label: "Find jobs", icon: <Briefcase className="h-4 w-4" /> },
  { to: "/jobseeker/applications", label: "Applications", icon: <FileText className="h-4 w-4" /> },
  { to: "/jobseeker/career-signal", label: "Career Signal", icon: <Sparkles className="h-4 w-4" /> },
  { to: "/jobseeker/cv-positioning", label: "CV Positioning", icon: <Award className="h-4 w-4" /> },
  { to: "/jobseeker/cv-edits", label: "CV Edits", icon: <FileText className="h-4 w-4" /> },
  { to: "/jobseeker/events", label: "Events & Training", icon: <Calendar className="h-4 w-4" /> },
  { to: "/jobseeker/rewards", label: "Rewards", icon: <Trophy className="h-4 w-4" /> },
  { to: "/jobseeker/profile", label: "My Profile", icon: <User className="h-4 w-4" /> },
];

export const employerNav: NavItem[] = [
  { to: "/employer", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/employer/vacancies", label: "Vacancies", icon: <Briefcase className="h-4 w-4" /> },
  { to: "/employer/jd-analysis", label: "JD Analysis", icon: <Sparkles className="h-4 w-4" /> },
  { to: "/employer/bias", label: "Bias Detection", icon: <FileText className="h-4 w-4" /> },
  { to: "/employer/fit-match", label: "Fit-Match", icon: <Award className="h-4 w-4" /> },
  { to: "/employer/interview", label: "Interview Questions", icon: <FileText className="h-4 w-4" /> },
  { to: "/employer/company", label: "Company", icon: <User className="h-4 w-4" /> },
];

export const officerNav: NavItem[] = [
  { to: "/officer", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/officer/cases", label: "Jobseeker cases", icon: <User className="h-4 w-4" /> },
  { to: "/officer/employers", label: "Employer oversight", icon: <Briefcase className="h-4 w-4" /> },
  { to: "/officer/research", label: "Research Hub", icon: <Sparkles className="h-4 w-4" /> },
  { to: "/officer/reports", label: "Reports", icon: <FileText className="h-4 w-4" /> },
];
