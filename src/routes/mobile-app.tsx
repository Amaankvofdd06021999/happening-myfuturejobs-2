import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Smartphone, Home, User, Briefcase, Building2, ShieldCheck,
  Search, Bell, MapPin, Filter, Heart, Bookmark, ChevronRight,
  Menu, X, BarChart3, Calendar, Award, Settings, LogOut,
  Clock, Star, ArrowLeft, Share2, MoreVertical
} from "lucide-react";

export const Route = createFileRoute("/mobile-app")({
  component: MobileApp,
});

function MobileApp() {
  const [currentScreen, setCurrentScreen] = useState<"role-selection" | "home" | "job-detail" | "dashboard">("role-selection");
  const [selectedRole, setSelectedRole] = useState<"jobseeker" | "employer" | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  // Role Selection Screen
  const RoleSelectionScreen = () => (
    <div className="flex h-full flex-col bg-gradient-to-b from-primary/10 to-background">
      {/* Header */}
      <div className="p-4">
        <div className="text-center">
          <h1 className="text-2xl font-700">MYFutureJobs</h1>
          <p className="mt-1 text-sm text-muted-foreground">Choose your role to get started</p>
        </div>
      </div>

      {/* Role Cards */}
      <div className="flex-1 space-y-4 p-4">
        <button
          onClick={() => {
            setSelectedRole("jobseeker");
            setCurrentScreen("home");
          }}
          className="w-full rounded-[16px] bg-card p-6 text-left shadow-card transition-transform active:scale-95"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-700">I'm a Jobseeker</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Find jobs, build your profile, and grow your career
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-inset px-2 py-0.5 text-[10px]">AI Job Matching</span>
                <span className="rounded-full bg-inset px-2 py-0.5 text-[10px]">Career Assistant</span>
                <span className="rounded-full bg-inset px-2 py-0.5 text-[10px]">Skills Training</span>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            setSelectedRole("employer");
            setCurrentScreen("home");
          }}
          className="w-full rounded-[16px] bg-card p-6 text-left shadow-card transition-transform active:scale-95"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-700">I'm an Employer</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Post jobs, find talent, and manage applications
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-inset px-2 py-0.5 text-[10px]">AI Screening</span>
                <span className="rounded-full bg-inset px-2 py-0.5 text-[10px]">Hiring Assistant</span>
                <span className="rounded-full bg-inset px-2 py-0.5 text-[10px]">Analytics</span>
              </div>
            </div>
          </div>
        </button>

        <button className="w-full rounded-[16px] border border-dashed border-border p-6 text-center">
          <ShieldCheck className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            PERKESO Officer Login
          </p>
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <button className="font-600 text-primary">Sign In</button>
        </p>
      </div>
    </div>
  );

  // Jobseeker Home Screen
  const JobseekerHomeScreen = () => (
    <div className="flex h-full flex-col bg-surface">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-card shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <h1 className="text-lg font-700">MYFutureJobs</h1>
          <button className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emphasis" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full rounded-[10px] border border-border bg-inset py-2 pl-10 pr-3 text-sm"
              />
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-border bg-card">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="rounded-[12px] bg-card p-4">
            <p className="text-2xl font-700 text-primary">74</p>
            <p className="text-xs text-muted-foreground">Career Signal</p>
          </div>
          <div className="rounded-[12px] bg-card p-4">
            <p className="text-2xl font-700">12</p>
            <p className="text-xs text-muted-foreground">Applications</p>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-700">Recommended for You</h2>
            <button className="text-xs text-primary">See all</button>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentScreen("job-detail")}
                className="w-full rounded-[12px] bg-card p-4 text-left transition-transform active:scale-98"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-600">Software Engineer</h3>
                    <p className="text-xs text-muted-foreground">Tech Innovations Sdn Bhd</p>
                    <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Kuala Lumpur
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        2 days ago
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-600 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        85% Match
                      </span>
                      <span className="rounded-full bg-inset px-2 py-0.5 text-[10px]">
                        RM 5k-8k
                      </span>
                    </div>
                  </div>
                  <button className="p-1">
                    <Bookmark className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4">
          <h2 className="mb-3 font-700">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <button className="rounded-[12px] bg-card p-4 text-center">
              <User className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-1 text-xs">Profile</p>
            </button>
            <button className="rounded-[12px] bg-card p-4 text-center">
              <FileText className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-1 text-xs">CV Edit</p>
            </button>
            <button className="rounded-[12px] bg-card p-4 text-center">
              <Award className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-1 text-xs">Rewards</p>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border bg-card">
        <div className="grid grid-cols-5 gap-1 p-2">
          <button className="flex flex-col items-center py-2 text-primary">
            <Home className="h-5 w-5" />
            <span className="mt-0.5 text-[10px]">Home</span>
          </button>
          <button className="flex flex-col items-center py-2 text-muted-foreground">
            <Briefcase className="h-5 w-5" />
            <span className="mt-0.5 text-[10px]">Jobs</span>
          </button>
          <button className="flex flex-col items-center py-2 text-muted-foreground">
            <FileText className="h-5 w-5" />
            <span className="mt-0.5 text-[10px]">Apply</span>
          </button>
          <button className="flex flex-col items-center py-2 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span className="mt-0.5 text-[10px]">Events</span>
          </button>
          <button className="flex flex-col items-center py-2 text-muted-foreground">
            <User className="h-5 w-5" />
            <span className="mt-0.5 text-[10px]">Profile</span>
          </button>
        </div>
      </div>

      {/* Slide-out Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-30 bg-black/50" onClick={() => setShowMenu(false)}>
          <div className="h-full w-72 bg-card" onClick={(e) => e.stopPropagation()}>
            <div className="border-b border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary font-700">
                  J
                </div>
                <div>
                  <p className="font-600">John Doe</p>
                  <p className="text-xs text-muted-foreground">Jobseeker</p>
                </div>
              </div>
            </div>
            <nav className="p-4">
              <button
                onClick={() => {
                  setCurrentScreen("dashboard");
                  setShowMenu(false);
                }}
                className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2 text-left hover:bg-inset"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">Dashboard</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2 text-left hover:bg-inset">
                <Settings className="h-4 w-4" />
                <span className="text-sm">Settings</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2 text-left text-danger hover:bg-danger/10">
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );

  // Job Detail Screen
  const JobDetailScreen = () => (
    <div className="flex h-full flex-col bg-surface">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-card shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setCurrentScreen("home")}>
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-700">Job Details</h1>
          <div className="flex items-center gap-2">
            <button>
              <Share2 className="h-5 w-5" />
            </button>
            <button>
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Company Header */}
        <div className="bg-card p-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-primary-soft text-primary font-700">
              TI
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-700">Software Engineer</h2>
              <p className="text-sm text-muted-foreground">Tech Innovations Sdn Bhd</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Kuala Lumpur
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  2 days ago
                </span>
              </div>
            </div>
          </div>

          {/* Match Score */}
          <div className="mt-4 rounded-[10px] bg-green-100 p-3 dark:bg-green-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-700 text-green-700 dark:text-green-400">85% Match</p>
                  <p className="text-xs text-green-600 dark:text-green-500">Great fit for your profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-4 p-4">
          <div className="rounded-[12px] bg-card p-4">
            <h3 className="mb-2 font-700">Job Description</h3>
            <p className="text-sm text-muted-foreground">
              We are looking for a talented Software Engineer to join our growing team. You will be responsible for developing and maintaining our web applications...
            </p>
          </div>

          <div className="rounded-[12px] bg-card p-4">
            <h3 className="mb-2 font-700">Requirements</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                <span>3+ years of experience in software development</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                <span>Strong knowledge of JavaScript and React</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                <span>Experience with REST APIs and databases</span>
              </li>
            </ul>
          </div>

          <div className="rounded-[12px] bg-card p-4">
            <h3 className="mb-2 font-700">Salary & Benefits</h3>
            <div className="space-y-2 text-sm">
              <p className="font-600">RM 5,000 - 8,000 / month</p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-inset px-2 py-0.5 text-xs">Medical Insurance</span>
                <span className="rounded-full bg-inset px-2 py-0.5 text-xs">Annual Bonus</span>
                <span className="rounded-full bg-inset px-2 py-0.5 text-xs">Flexible Hours</span>
                <span className="rounded-full bg-inset px-2 py-0.5 text-xs">Remote Work</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-border bg-card p-4">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-[10px] border border-border bg-card py-3 font-600">
            <Bookmark className="h-4 w-4" />
            Save
          </button>
          <button className="rounded-[10px] bg-primary py-3 font-600 text-white">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );

  // Dashboard Screen
  const DashboardScreen = () => (
    <div className="flex h-full flex-col bg-surface">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-card shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setCurrentScreen("home")}>
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-700">Dashboard</h1>
          <button className="relative">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Career Signal */}
        <div className="mb-4 rounded-[12px] bg-gradient-to-br from-primary to-primary/80 p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Career Signal Score</p>
              <p className="text-3xl font-700">74</p>
              <p className="mt-1 text-xs opacity-80">Above Average</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-[12px] bg-card p-4">
            <p className="text-2xl font-700">148</p>
            <p className="text-xs text-muted-foreground">Profile Views</p>
          </div>
          <div className="rounded-[12px] bg-card p-4">
            <p className="text-2xl font-700">12</p>
            <p className="text-xs text-muted-foreground">Applications</p>
          </div>
          <div className="rounded-[12px] bg-card p-4">
            <p className="text-2xl font-700">3</p>
            <p className="text-xs text-muted-foreground">Interviews</p>
          </div>
          <div className="rounded-[12px] bg-card p-4">
            <p className="text-2xl font-700">1</p>
            <p className="text-xs text-muted-foreground">Offers</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-[12px] bg-card p-4">
          <h3 className="mb-3 font-700">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-600">Application Viewed</p>
                <p className="text-xs text-muted-foreground">Tech Corp reviewed your application</p>
                <p className="mt-1 text-[10px] text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-600">Interview Scheduled</p>
                <p className="text-xs text-muted-foreground">DataTech - Tomorrow at 2:00 PM</p>
                <p className="mt-1 text-[10px] text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-4">
      <div className="w-full max-w-sm">
        <div className="mb-4 text-center">
          <h2 className="text-lg font-700">Mobile App Preview</h2>
          <p className="text-sm text-muted-foreground">Experience MYFutureJobs on mobile</p>
        </div>

        {/* Phone Frame */}
        <div className="relative mx-auto h-[700px] w-full max-w-[360px] rounded-[40px] border-8 border-gray-800 bg-gray-800 shadow-2xl">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-gray-800" />

          {/* Screen */}
          <div className="h-full w-full overflow-hidden rounded-[32px] bg-white dark:bg-gray-900">
            {currentScreen === "role-selection" && <RoleSelectionScreen />}
            {currentScreen === "home" && selectedRole === "jobseeker" && <JobseekerHomeScreen />}
            {currentScreen === "job-detail" && <JobDetailScreen />}
            {currentScreen === "dashboard" && <DashboardScreen />}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-gray-600" />
        </div>

        {/* Navigation Controls */}
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setCurrentScreen("role-selection")}
            className={`rounded-[8px] px-3 py-1.5 text-xs font-600 ${
              currentScreen === "role-selection"
                ? "bg-primary text-white"
                : "border border-border bg-card hover:bg-inset"
            }`}
          >
            Role Selection
          </button>
          <button
            onClick={() => {
              setSelectedRole("jobseeker");
              setCurrentScreen("home");
            }}
            className={`rounded-[8px] px-3 py-1.5 text-xs font-600 ${
              currentScreen === "home"
                ? "bg-primary text-white"
                : "border border-border bg-card hover:bg-inset"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentScreen("job-detail")}
            className={`rounded-[8px] px-3 py-1.5 text-xs font-600 ${
              currentScreen === "job-detail"
                ? "bg-primary text-white"
                : "border border-border bg-card hover:bg-inset"
            }`}
          >
            Job Detail
          </button>
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className={`rounded-[8px] px-3 py-1.5 text-xs font-600 ${
              currentScreen === "dashboard"
                ? "bg-primary text-white"
                : "border border-border bg-card hover:bg-inset"
            }`}
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}