import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { jobseekerNav } from "@/lib/nav";
import { KPITile, ScoreCard, SectionTitle, Badge, Card } from "@/components/ui-bits";
import { AIPanel } from "@/components/AIPanel";
import { Briefcase, Eye, Send, CheckCircle2, Sparkles, ArrowRight, GraduationCap, MapPin, TrendingUp, Clock, Calendar, Bell, Award, Target, Users, BookOpen, Heart, BookmarkPlus, Home, Search, Plus, User, MoreHorizontal, ChevronRight, FileText, Star, Zap } from "lucide-react";
import eventCarnival from "@/assets/event-carnival.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, cardHover, scaleIn, progressBar, pulseAnimation, floatingAnimation } from "@/lib/animations";
import { useState, useEffect } from "react";
import useStore from "@/lib/store";
import { mockJobListings, mockApplications, mockTrainingPrograms, mockCareerEvents } from "@/lib/mock-data";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/jobseeker/")({
  head: () => ({ meta: [{ title: "Jobseeker dashboard — MYFutureJobs" }] }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const {
    user,
    applications,
    registeredEvents,
    savedJobs,
    saveJob,
    unsaveJob,
    applyToJob,
    addNotification,
    registerForEvent,
    enrollInTraining,
    enrolledTrainings
  } = useStore();
  const [careerScore, setCareerScore] = useState(68);
  const [profileCompletion, setProfileCompletion] = useState(75);
  const [showAIInsight, setShowAIInsight] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState({
    applications: 12,
    views: 148,
    interviews: 3,
    offers: 1
  });

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animate career score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setCareerScore(user?.careerSignalScore || 74);
      setProfileCompletion(user?.profileCompleteness || 82);
    }, 500);
    return () => clearTimeout(timer);
  }, [user]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        views: prev.views + Math.floor(Math.random() * 3)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickApply = (job: any) => {
    const application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      job,
      appliedDate: new Date().toISOString(),
      status: 'Applied' as const,
      matchScore: job.matchScore || 85,
      timeline: [{
        date: new Date().toISOString(),
        status: 'Applied',
        description: 'Application submitted successfully',
        icon: '📤'
      }]
    };

    applyToJob(application);
    setSelectedJob(job.id);

    // Show toast notification
    toast.success('Application Submitted!', {
      description: `Successfully applied to ${job.title} at ${job.company}`,
      duration: 4000,
    });

    // Show success animation
    setTimeout(() => {
      setSelectedJob(null);
    }, 2000);
  };

  const handleSaveJob = (job: any) => {
    if (savedJobs.includes(job.id)) {
      unsaveJob(job.id);
      toast.info('Job Removed', {
        description: `${job.title} has been removed from your saved jobs`,
        duration: 3000,
      });
    } else {
      saveJob(job.id);
      toast.success('Job Saved!', {
        description: `${job.title} has been added to your saved jobs`,
        duration: 3000,
      });
    }
  };

  const handleViewJobDetails = (job: any) => {
    toast.info('Opening Job Details', {
      description: `Loading details for ${job.title}`,
      duration: 2000,
    });
    navigate({ to: '/jobseeker/jobs', search: { jobId: job.id } });
  };

  const handleViewApplication = (app: any) => {
    toast.info('Opening Application', {
      description: `Viewing your application to ${app.job.title}`,
      duration: 2000,
    });
    navigate({ to: '/jobseeker/applications', search: { appId: app.id } });
  };

  const handleRegisterEvent = (event: any) => {
    if (registeredEvents.includes(event.id)) {
      toast.info('Already Registered', {
        description: `You're already registered for ${event.title}`,
        duration: 3000,
      });
    } else {
      registerForEvent(event.id);
      toast.success('RSVP Confirmed!', {
        description: `You're registered for ${event.title}`,
        duration: 4000,
      });
    }
  };

  const handleEnrollTraining = (training: any) => {
    if (enrolledTrainings.includes(training.id)) {
      toast.info('Already Enrolled', {
        description: `You're already enrolled in ${training.title}`,
        duration: 3000,
      });
    } else {
      enrollInTraining(training.id);
      toast.success('Enrollment Successful!', {
        description: `You're now enrolled in ${training.title}`,
        duration: 4000,
      });
    }
  };

  const handleAISuggestionClick = (suggestion: string, action: string) => {
    toast.info('Taking Action', {
      description: suggestion,
      duration: 3000,
    });

    // Navigate based on action type
    if (action === 'apply') {
      navigate({ to: '/jobseeker/jobs' });
    } else if (action === 'training') {
      navigate({ to: '/jobseeker/events' });
    } else if (action === 'event') {
      navigate({ to: '/jobseeker/events' });
    } else if (action === 'profile') {
      navigate({ to: '/jobseeker/profile' });
    }
  };

  const handleProfileUpdate = () => {
    toast.success('Opening Profile', {
      description: 'Navigating to your profile editor...',
      duration: 2000,
    });
    navigate({ to: '/jobseeker/profile' });
  };

  const handleAddProfileSection = (section: string) => {
    toast.info('Update Your Profile', {
      description: `Add ${section} to complete your profile`,
      duration: 3000,
    });
    navigate({ to: '/jobseeker/profile', search: { section } });
  };

  const recommendedJobs = mockJobListings.slice(0, 4);
  const upcomingInterviews = applications.filter(app => app.status === 'Interview').slice(0, 2);
  const recentApplications = applications.slice(0, 3);
  const suggestedTraining = mockTrainingPrograms.slice(0, 2);
  const upcomingEvents = mockCareerEvents.filter(e => !e.isRegistered).slice(0, 2);

  // Mobile-optimized view
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-blue-100/50 dark:from-gray-900 dark:to-blue-950/20 pb-20">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Welcome back</p>
                <h1 className="text-lg font-700">{user?.name?.split(' ')[0] || 'Ahmad'}</h1>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative"
                  onClick={() => toast.info("You have 3 new notifications")}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white"
                  onClick={() => navigate({ to: '/jobseeker/profile' })}
                >
                  <span className="text-sm font-700">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AR'}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Career Score Card - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-500 rounded-3xl p-5 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm opacity-90">Your Career Signal</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-700">{careerScore}</span>
                  <span className="text-sm opacity-90">/ 100</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-90 mb-1">Competitive</p>
                <p className="text-xs">+6 this month</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="text-xs">Better than 73% jobseekers</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate({ to: '/jobseeker/applications' })}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <Send className="h-5 w-5 text-blue-500" />
                <span className="text-xs text-green-500 font-600">+3 new</span>
              </div>
              <div className="text-2xl font-700">{applications.length}</div>
              <p className="text-xs text-muted-foreground">Applications</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <Eye className="h-5 w-5 text-purple-500" />
                <span className="text-xs text-green-500 font-600">+22</span>
              </div>
              <div className="text-2xl font-700">{stats.views}</div>
              <p className="text-xs text-muted-foreground">Profile views</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate({ to: '/jobseeker/applications', search: { status: 'Interview' } })}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <span className="text-xs text-orange-500 font-600">Upcoming</span>
              </div>
              <div className="text-2xl font-700">{upcomingInterviews.length}</div>
              <p className="text-xs text-muted-foreground">Interviews</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <Award className="h-5 w-5 text-green-500" />
                <span className="text-xs text-green-500 font-600">Active</span>
              </div>
              <div className="text-2xl font-700">1</div>
              <p className="text-xs text-muted-foreground">Offers</p>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate({ to: '/jobseeker/jobs' })}
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl py-4 flex items-center justify-center gap-2 font-600 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            Find New Jobs
          </motion.button>

          {/* Application Pipeline - Mobile */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h3 className="font-700 mb-3">Your Pipeline</h3>
            <div className="space-y-2">
              {[
                { label: 'Applied', count: applications.filter(a => a.status === 'Applied').length, color: 'bg-gray-500' },
                { label: 'Reviewing', count: applications.filter(a => a.status === 'Reviewing').length, color: 'bg-blue-500' },
                { label: 'Interview', count: upcomingInterviews.length, color: 'bg-orange-500' },
                { label: 'Offered', count: applications.filter(a => a.status === 'Offered').length, color: 'bg-green-500' }
              ].map(stage => (
                <div key={stage.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${stage.color}`} />
                    <span className="text-sm">{stage.label}</span>
                  </div>
                  <span className="text-sm font-700">{stage.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Success rate</span>
                <span className="text-sm font-700">{Math.round((applications.filter(a => a.status === 'Offered').length / applications.length) * 100) || 0}%</span>
              </div>
            </div>
          </div>

          {/* Recommended Jobs - Mobile */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-700">Jobs for you</h3>
              <Link to="/jobseeker/jobs">
                <span className="text-sm text-blue-500 font-600">See all</span>
              </Link>
            </div>
            <div className="space-y-3">
              {recommendedJobs.slice(0, 3).map(job => (
                <motion.div
                  key={job.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 flex items-center justify-center text-lg font-700 text-blue-600 dark:text-blue-400">
                      {job.company.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-600 text-sm">{job.title}</h4>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{job.location}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{job.type}</span>
                      </div>
                    </div>
                    <Badge tone="ai" className="text-xs">
                      {job.matchScore}%
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {applications.some(app => app.jobId === job.id) ? (
                      <button
                        className="flex-1 rounded-xl border border-green-500 bg-green-50 dark:bg-green-900/20 py-2 text-xs font-600 text-green-600 dark:text-green-400"
                        disabled
                      >
                        <CheckCircle2 className="h-3 w-3 inline mr-1" />
                        Applied
                      </button>
                    ) : (
                      <>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSaveJob(job)}
                          className="rounded-xl border border-gray-200 dark:border-gray-700 p-2"
                        >
                          <Heart className={`h-4 w-4 ${savedJobs.includes(job.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickApply(job)}
                          className="flex-1 rounded-xl bg-blue-500 py-2 text-xs font-600 text-white"
                        >
                          Quick Apply
                        </motion.button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Events - Mobile */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-700">Upcoming Events</h3>
              <Link to="/jobseeker/events">
                <span className="text-sm text-blue-500 font-600">See all</span>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
              {upcomingEvents[0] && (
                <div>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-600 text-sm">{upcomingEvents[0].title}</h4>
                      <p className="text-xs text-muted-foreground">{format(new Date(upcomingEvents[0].date), 'MMM d, yyyy')}</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRegisterEvent(upcomingEvents[0])}
                    className="w-full mt-3 rounded-xl bg-orange-500 py-2 text-xs font-600 text-white"
                  >
                    Register Now
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-5 py-2">
            <button
              className="flex flex-col items-center gap-1 py-2"
              onClick={() => navigate({ to: '/jobseeker' })}
            >
              <Home className="h-5 w-5 text-blue-500" />
              <span className="text-[10px] text-blue-500">Home</span>
            </button>
            <button
              className="flex flex-col items-center gap-1 py-2"
              onClick={() => navigate({ to: '/jobseeker/jobs' })}
            >
              <Search className="h-5 w-5 text-gray-400" />
              <span className="text-[10px] text-gray-400">Jobs</span>
            </button>
            <button
              className="flex flex-col items-center gap-1 py-2"
              onClick={() => navigate({ to: '/jobseeker/applications' })}
            >
              <FileText className="h-5 w-5 text-gray-400" />
              <span className="text-[10px] text-gray-400">Applied</span>
            </button>
            <button
              className="flex flex-col items-center gap-1 py-2"
              onClick={() => navigate({ to: '/jobseeker/events' })}
            >
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-[10px] text-gray-400">Events</span>
            </button>
            <button
              className="flex flex-col items-center gap-1 py-2"
              onClick={() => navigate({ to: '/jobseeker/profile' })}
            >
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-[10px] text-gray-400">Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop view (original layout)
  return (
    <AppShell
      nav={jobseekerNav}
      user={user || { name: "Ahmad Rahman", email: "ahmad@email.com", role: "jobseeker" }}
      rightPanel={
        <AIPanel
          title="Career Assistant"
          subtitle="Daily next-best-action"
          why={
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="space-y-2"
            >
              <p>Your "Add SQL" suggestion is based on:</p>
              <motion.ul variants={fadeInUp} className="list-disc pl-4 space-y-1">
                <li>72% of Senior roles you viewed list SQL as preferred.</li>
                <li>Peers at +1 band have SQL on their profile (sample: 312 profiles).</li>
                <li>Adding it typically lifts Career Signal by +6–9 points.</li>
              </motion.ul>
            </motion.div>
          }
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-4"
          >
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              className="rounded-[10px] bg-emphasis-soft p-3"
            >
              <div className="text-[11px] font-600 uppercase tracking-wider text-emphasis">Today's focus</div>
              <div className="mt-1 text-[14px] font-600">Complete your certifications section</div>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Could lift your Career Signal by ~+7 and unlock 18 more matched roles.
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleProfileUpdate}
                className="mt-3 inline-flex h-8 items-center rounded-[8px] grad-orange px-3 text-[12px] font-600 text-white transition-all hover:shadow-md"
              >
                Update profile →
              </motion.button>
            </motion.div>

            <div>
              <div className="mb-2 text-[12px] font-600 text-muted-foreground">Suggested actions this week</div>
              <motion.ul
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-2"
              >
                {[
                  { text: "Apply to Senior Software Engineer at Petronas (94% match)", icon: "🎯", action: "apply" },
                  { text: "Complete 'Cloud Architecture' micro-cert (4 hrs, HRDC)", icon: "📚", action: "training" },
                  { text: "RSVP MYFutureJobs Tech Carnival · 12 Mar", icon: "📅", action: "event" },
                  { text: "Update portfolio with recent projects", icon: "💼", action: "profile" },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAISuggestionClick(item.text, item.action)}
                    className="flex items-start gap-2 rounded-[8px] border border-border p-2.5 cursor-pointer hover:border-primary hover:bg-primary-soft/5 transition-all"
                  >
                    <span className="text-[16px]">{item.icon}</span>
                    <span className="text-[12px] leading-relaxed">{item.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              variants={fadeInUp}
              className="rounded-[10px] bg-card border border-primary-soft p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-4 w-4 text-primary" />
                <span className="text-[12px] font-600 text-primary">Interview tomorrow!</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Petronas Digital · 10:00 AM · Twin Towers Level 42
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  toast.info('Interview Preparation', {
                    description: 'Opening interview preparation guide...',
                    duration: 3000,
                  });
                  navigate({ to: '/jobseeker/applications' });
                }}
                className="mt-2 text-[11px] font-600 text-primary hover:underline transition-all"
              >
                View prep guide →
              </motion.button>
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
        <div className="text-[12px] font-600 uppercase tracking-wider text-emphasis">
          Good morning, {user?.name?.split(' ')[0] || 'Ahmad'}
        </div>
        <h1 className="text-[28px] font-700 tracking-tight">Your career, on track.</h1>
      </motion.div>

      {/* Animated KPI tiles */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            toast.info('Applications', {
              description: 'Viewing all your applications...',
              duration: 2000,
            });
            navigate({ to: '/jobseeker/applications' });
          }}
          className="cursor-pointer"
        >
          <KPITile
            label="Applications"
            value={applications.length.toString()}
            delta={`+${applications.filter(a => {
              const date = new Date(a.appliedDate);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return date > weekAgo;
            }).length} this week`}
            icon={<Send className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            toast.info('Profile Analytics', {
              description: 'Your profile has been viewed by employers',
              duration: 3000,
            });
          }}
          className="cursor-pointer"
        >
          <KPITile
            label="Profile views"
            value={stats.views.toString()}
            delta="+22 last 7d"
            icon={<Eye className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            toast.info('Upcoming Interviews', {
              description: 'Viewing your interview schedule...',
              duration: 2000,
            });
            navigate({ to: '/jobseeker/applications', search: { status: 'Interview' } });
          }}
          className="cursor-pointer"
        >
          <KPITile
            label="Interviews"
            value={upcomingInterviews.length.toString()}
            delta={`${upcomingInterviews.length} upcoming`}
            icon={<Briefcase className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            toast.info('Career Signal', {
              description: 'Learn how to improve your career signal score',
              duration: 2000,
            });
            navigate({ to: '/jobseeker/career-signal' });
          }}
          className="cursor-pointer"
        >
          <KPITile
            label="Career Signal"
            value={careerScore.toString()}
            delta="Competitive · +6 last month"
            emphasis
            gradient
            icon={<Sparkles className="h-4 w-4" />}
          />
        </motion.div>
      </motion.div>

      {/* Score + completion with animations */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => {
            toast.info('Career Signal', {
              description: 'Learn more about your career signal score',
              duration: 2000,
            });
            navigate({ to: '/jobseeker/career-signal' });
          }}
          className="cursor-pointer"
        >
          <ScoreCard value={careerScore} band="Competitive" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-[10px] border border-border bg-card p-6 shadow-card"
        >
          <div className="text-[12px] font-600 uppercase tracking-wider text-muted-foreground">Profile completion</div>
          <div className="mt-4 flex items-center gap-5">
            <div className="relative h-24 w-24">
              <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
                <circle cx="50" cy="50" r="44" stroke="var(--inset)" strokeWidth="10" fill="none" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke="var(--primary)"
                  strokeWidth="10"
                  fill="none"
                  initial={{ strokeDasharray: "0 276" }}
                  animate={{ strokeDasharray: `${(profileCompletion/100)*276} 276` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-[18px] font-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {profileCompletion}%
              </motion.div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex-1 space-y-1.5 text-[13px]"
            >
              {[
                ["Basics", true],
                ["Experience", true],
                ["Skills", true],
                ["Certifications", false],
                ["Portfolio links", false],
              ].map(([label, completed], i) => (
                <motion.div
                  key={label as string}
                  variants={fadeInUp}
                  custom={i}
                  className="flex items-center justify-between"
                >
                  <span className={completed ? "text-foreground" : "text-muted-foreground"}>{label as string}</span>
                  {completed ? (
                    <CheckCircle2 className="h-4 w-4 text-[var(--success)]"/>
                  ) : (
                    <motion.span
                      whileHover={{ x: 2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddProfileSection(label as string)}
                      className="text-[11px] text-primary font-600 cursor-pointer hover:underline transition-all"
                    >
                      Add →
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Achievement badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 pt-4 border-t border-border"
          >
            <div className="text-[11px] font-600 uppercase tracking-wider text-muted-foreground mb-2">Recent achievements</div>
            <div className="flex gap-2">
              {[
                { emoji: '🏆', title: 'First Application', desc: 'Applied to your first job' },
                { emoji: '⚡', title: 'Quick Learner', desc: 'Completed 3 training programs' },
                { emoji: '🎯', title: 'Perfect Match', desc: 'Applied to 5 jobs with 90%+ match' },
                { emoji: '⭐', title: 'Profile Star', desc: 'Profile viewed 100+ times' }
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    toast.success(badge.title, {
                      description: badge.desc,
                      duration: 3000,
                    });
                  }}
                  className="h-8 w-8 rounded-full bg-inset flex items-center justify-center cursor-pointer hover:bg-primary-soft/20 transition-all"
                  title={`${badge.title}: ${badge.desc}`}
                >
                  <span className="text-[14px]">{badge.emoji}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Jobs for you with animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <SectionTitle
          kicker="AI Matched"
          title="Jobs for you"
          action={
            <Link to="/jobseeker/jobs">
              <motion.span
                whileHover={{ x: 2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-600 text-primary hover:underline transition-all inline-block"
              >
                View all →
              </motion.span>
            </Link>
          }
        />
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-3 lg:grid-cols-2"
        >
          {recommendedJobs.map((job, i) => (
            <motion.article
              key={job.id}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -2 }}
              className="rounded-[12px] border border-border bg-card p-4 shadow-card transition-all hover:shadow-hero hover:border-primary-soft"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-soft to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-xl"
                >
                  {job.company.charAt(0)}
                </motion.div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-[15px] font-600">{job.title}</h3>
                    <Badge tone="ai">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="h-3 w-3" />
                      </motion.div>
                      {job.matchScore}% match
                    </Badge>
                  </div>
                  <div className="mt-0.5 truncate text-[13px] text-muted-foreground">{job.company}</div>
                  <div className="mt-2 flex flex-wrap gap-3 text-[12px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3"/>{job.location}
                    </span>
                    <span>{job.salary}</span>
                    <span>{job.type}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3"/>
                      {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
                    </span>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2 py-0.5 rounded-full bg-inset text-[10px] font-500">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] text-muted-foreground">
                        +{job.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <motion.button
                  whileHover={{ x: 2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleViewJobDetails(job)}
                  className="text-[12px] font-600 text-primary hover:underline transition-all"
                >
                  View details →
                </motion.button>
                <AnimatePresence>
                  {selectedJob === job.id ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="inline-flex h-9 items-center gap-1 px-3 text-[12px] font-600 text-success"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Applied!
                    </motion.div>
                  ) : applications.some(app => app.jobId === job.id) ? (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="inline-flex h-9 items-center gap-1 px-3 text-[12px] font-600 text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Applied
                    </motion.div>
                  ) : savedJobs.includes(job.id) ? (
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSaveJob(job)}
                        className="inline-flex h-9 items-center gap-1 rounded-[8px] border border-primary px-3 text-[12px] font-600 text-primary hover:bg-primary-soft/10 transition-all"
                      >
                        <Heart className="h-3 w-3 fill-primary" />
                        Saved
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickApply(job)}
                        className="inline-flex h-9 items-center rounded-[8px] bg-primary px-3 text-[12px] font-600 text-primary-foreground transition-all"
                      >
                        Quick apply
                      </motion.button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSaveJob(job)}
                        className="inline-flex h-9 items-center gap-1 rounded-[8px] border border-border px-3 text-[12px] font-600 hover:border-primary hover:text-primary transition-all"
                      >
                        <BookmarkPlus className="h-3 w-3" />
                        Save
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickApply(job)}
                        className="inline-flex h-9 items-center rounded-[8px] bg-primary px-3 text-[12px] font-600 text-primary-foreground transition-all"
                      >
                        Apply
                      </motion.button>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>

      {/* Application Pipeline + Training */}
      <div className="mt-8 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-[12px] border border-border bg-card p-5 shadow-card"
        >
          <SectionTitle title="Application pipeline" />
          <div className="grid grid-cols-4 gap-2">
            {[
              { status: "Applied", count: applications.filter(a => a.status === 'Applied').length, color: "var(--muted-foreground)" },
              { status: "Reviewing", count: applications.filter(a => a.status === 'Reviewing').length, color: "var(--primary)" },
              { status: "Interview", count: applications.filter(a => a.status === 'Interview').length, color: "var(--warning)" },
              { status: "Offered", count: applications.filter(a => a.status === 'Offered').length, color: "var(--success)" },
            ].map((stage, i) => (
              <motion.div
                key={stage.status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  toast.info('Filtering Applications', {
                    description: `Showing applications with status: ${stage.status}`,
                    duration: 2000,
                  });
                  navigate({ to: '/jobseeker/applications', search: { status: stage.status } });
                }}
                className="rounded-[10px] bg-inset p-3 text-center cursor-pointer hover:bg-primary-soft/10 transition-all"
              >
                <motion.div
                  className="num text-[24px] font-600"
                  style={{ color: stage.color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                >
                  {stage.count}
                </motion.div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {stage.status}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="mt-4 space-y-2"
          >
            {recentApplications.map((app, i) => (
              <motion.div
                key={app.id}
                variants={fadeInUp}
                whileHover={{ x: 4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleViewApplication(app)}
                className="flex items-center justify-between rounded-[10px] border border-border p-3 text-[13px] hover:border-primary-soft hover:bg-primary-soft/5 transition-all cursor-pointer"
              >
                <div>
                  <div className="font-600">{app.job.title}</div>
                  <div className="text-[12px] text-muted-foreground">
                    {app.job.company} · {app.status}
                    {app.interviewDate && ` · ${format(new Date(app.interviewDate), 'MMM d, h:mm a')}`}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    {app.timeline.map((t, idx) => (
                      <span key={idx} className="text-[16px]">{t.icon}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={app.matchScore >= 80 ? "success" : "default"}>
                    {app.matchScore}% match
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Link to="/jobseeker/applications">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full rounded-[10px] border border-border bg-inset p-3 text-[13px] font-600 text-primary hover:bg-card transition-colors"
            >
              View all applications →
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-[12px] border border-border bg-card p-5 shadow-card"
        >
          <SectionTitle
            kicker="AI suggested"
            title="Skills to unlock roles"
          />

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              toast.info('Events & Training', {
                description: 'Opening events and training page...',
                duration: 2000,
              });
              navigate({ to: '/jobseeker/events' });
            }}
            className="overflow-hidden rounded-[10px] border border-border cursor-pointer transition-all hover:border-primary-soft hover:shadow-md"
          >
            <img src={eventCarnival} alt="Career Events" className="aspect-[16/9] w-full object-cover transition-transform hover:scale-105" loading="lazy"/>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="mt-3 space-y-3"
          >
            {suggestedTraining.map((training, i) => (
              <motion.div
                key={training.id}
                variants={fadeInUp}
                whileHover={{ x: 2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleEnrollTraining(training)}
                className="flex items-start gap-3 cursor-pointer p-2 -mx-2 rounded-lg hover:bg-primary-soft/5 transition-all"
              >
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-[8px] bg-primary-soft text-primary"
                >
                  <GraduationCap className="h-4 w-4"/>
                </motion.span>
                <div className="flex-1">
                  <div className="text-[13px] font-600">{training.title}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {training.duration} · {training.mode} · {training.isHRDCClaimable ? 'HRDC' : `RM ${training.price}`}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-600 text-emphasis"
                  >
                    <TrendingUp className="h-3 w-3"/>
                    +{Math.floor(Math.random() * 20 + 10)} matched roles
                  </motion.div>
                  <div className="mt-1 flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: idx < Math.floor(training.rating) ? 1 : 0.3 }}
                        transition={{ delay: 1 + idx * 0.05 }}
                        className="text-[10px]"
                      >
                        ⭐
                      </motion.span>
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1">
                      ({training.reviews})
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              toast.info('Explore Training', {
                description: 'Loading all available training programs...',
                duration: 2000,
              });
              navigate({ to: '/jobseeker/events' });
            }}
            className="mt-4 w-full rounded-[10px] grad-orange p-2.5 text-[12px] font-600 text-white transition-all"
          >
            Explore all training →
          </motion.button>
        </motion.div>
      </div>

      {/* Upcoming Events Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <SectionTitle
          kicker="Don't miss out"
          title="Upcoming career events"
          action={
            <Link to="/jobseeker/events">
              <motion.span
                whileHover={{ x: 2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-600 text-primary hover:underline transition-all inline-block"
              >
                View all →
              </motion.span>
            </Link>
          }
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {upcomingEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                toast.info('Event Details', {
                  description: `Loading details for ${event.title}`,
                  duration: 2000,
                });
                navigate({ to: '/jobseeker/events', search: { eventId: event.id } });
              }}
              className="rounded-[12px] border border-border bg-card p-4 shadow-card hover:shadow-hero hover:border-primary-soft transition-all cursor-pointer"
            >
              <div className="flex gap-3">
                <motion.div
                  animate={floatingAnimation.animate}
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-soft to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
                >
                  <Calendar className="h-5 w-5 text-primary" />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[14px] font-600">{event.title}</h4>
                      <p className="text-[12px] text-muted-foreground mt-0.5">
                        {format(new Date(event.date), 'MMM d, yyyy')} · {event.location}
                      </p>
                    </div>
                    <Badge tone={event.type === 'Career Fair' ? 'emphasis' : 'primary'}>
                      {event.type}
                    </Badge>
                  </div>
                  <p className="mt-2 text-[12px] text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.registeredCount}/{event.capacity} registered
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        Free entry
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegisterEvent(event);
                      }}
                      className="inline-flex h-8 items-center rounded-[8px] bg-primary px-3 text-[11px] font-600 text-primary-foreground transition-all"
                    >
                      {registeredEvents.includes(event.id) ? 'Registered ✓' : 'RSVP →'}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating notification for real-time updates */}
      <AnimatePresence>
        {showAIInsight && (
          <motion.div
            initial={{ opacity: 0, y: 100, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-1/2 z-50 rounded-[12px] bg-card border border-primary-soft shadow-hero p-4 max-w-sm"
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={pulseAnimation.animate}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-emphasis-soft"
              >
                <Sparkles className="h-4 w-4 text-emphasis" />
              </motion.div>
              <div>
                <p className="text-[13px] font-600">New AI Insight</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  3 new jobs match your updated profile
                </p>
                <button className="mt-2 text-[11px] font-600 text-primary">
                  View matches →
                </button>
              </div>
              <button
                onClick={() => setShowAIInsight(false)}
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