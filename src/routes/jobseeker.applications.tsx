import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { jobseekerNav } from "@/lib/nav";
import { Badge, SectionTitle, KPITile } from "@/components/ui-bits";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";
import { useState, useEffect } from "react";
import useStore from "@/lib/store";
import { mockApplications, type JobApplication } from "@/lib/mock-data";
import { format, formatDistanceToNow } from "date-fns";
import {
  Briefcase, Clock, Calendar, MapPin, DollarSign, Building2,
  ChevronRight, Eye, MessageCircle, Download, Filter, Search,
  CheckCircle2, XCircle, AlertCircle, Star, TrendingUp, Archive, Upload, Trash2
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/jobseeker/applications")({
  head: () => ({ meta: [{ title: "Applications — MYFutureJobs" }] }),
  component: Page,
});

interface ApplicationStage {
  id: string;
  label: string;
  color: string;
  icon: React.ReactNode;
  applications: JobApplication[];
}

function Page() {
  const { user, applications: storeApplications, updateApplicationStatus, addNotification } = useStore();
  const [stages, setStages] = useState<ApplicationStage[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [filterQuery, setFilterQuery] = useState("");
  const [viewMode, setViewMode] = useState<'kanban' | 'timeline'>('kanban');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState<string | null>(null);

  // Initialize applications from store or mock data
  const allApplications = storeApplications.length > 0 ? storeApplications : mockApplications;

  useEffect(() => {
    // Group applications by status
    const groupedStages: ApplicationStage[] = [
      {
        id: 'applied',
        label: 'Applied',
        color: 'var(--muted-foreground)',
        icon: <CheckCircle2 className="h-4 w-4" />,
        applications: allApplications.filter(a => a.status === 'Applied')
      },
      {
        id: 'reviewing',
        label: 'Under Review',
        color: 'var(--primary)',
        icon: <Eye className="h-4 w-4" />,
        applications: allApplications.filter(a => a.status === 'Reviewing')
      },
      {
        id: 'interview',
        label: 'Interview',
        color: 'var(--warning)',
        icon: <Calendar className="h-4 w-4" />,
        applications: allApplications.filter(a => a.status === 'Interview')
      },
      {
        id: 'kiv',
        label: 'Keep In View',
        color: 'var(--info)',
        icon: <Archive className="h-4 w-4" />,
        applications: allApplications.filter(a => a.status === 'KIV')
      },
      {
        id: 'offered',
        label: 'Offered',
        color: 'var(--success)',
        icon: <Star className="h-4 w-4" />,
        applications: allApplications.filter(a => a.status === 'Offered')
      },
      {
        id: 'rejected',
        label: 'Rejected',
        color: 'var(--error)',
        icon: <XCircle className="h-4 w-4" />,
        applications: allApplications.filter(a => a.status === 'Rejected')
      }
    ];

    setStages(groupedStages);
  }, [allApplications]);

  const handleDragEnd = (applicationId: string, newStatus: JobApplication['status']) => {
    updateApplicationStatus(applicationId, newStatus);
    addNotification({
      id: Date.now().toString(),
      type: 'info',
      title: 'Application Updated',
      message: `Status changed to ${newStatus}`,
      timestamp: new Date(),
      read: false
    });
  };

  const filteredApplications = allApplications.filter(app => {
    const matchesSearch = app.job.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      app.job.company.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(app.status);
    return matchesSearch && matchesStatus;
  });

  const handleWithdrawApplication = (appId: string, jobTitle: string) => {
    updateApplicationStatus(appId, 'Rejected');
    setShowWithdrawConfirm(null);
    setSelectedApplication(null);
    toast.error("Application withdrawn", {
      description: `Your application to ${jobTitle} has been withdrawn`,
    });
  };

  const handleUploadDocument = (appId: string) => {
    toast.success("Document upload", {
      description: "File upload interface would open here",
    });
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const stats = {
    total: allApplications.length,
    interviews: allApplications.filter(a => a.status === 'Interview').length,
    offers: allApplications.filter(a => a.status === 'Offered').length,
    avgMatchScore: Math.round(
      allApplications.reduce((sum, a) => sum + a.matchScore, 0) / allApplications.length
    )
  };

  return (
    <AppShell
      nav={jobseekerNav}
      user={user || { name: "Ahmad Rahman", email: "ahmad@email.com", role: "jobseeker" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-[28px] font-700 tracking-tight">Application Tracker</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your applications, interviews, and offers in one place
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6"
      >
        <motion.div variants={fadeInUp}>
          <KPITile
            label="Total Applications"
            value={stats.total.toString()}
            delta={`${allApplications.filter(a => {
              const date = new Date(a.appliedDate);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return date > weekAgo;
            }).length} this week`}
            icon={<Briefcase className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <KPITile
            label="Interviews"
            value={stats.interviews.toString()}
            delta="Upcoming"
            icon={<Calendar className="h-4 w-4" />}
            emphasis
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <KPITile
            label="Offers"
            value={stats.offers.toString()}
            delta="Pending decision"
            icon={<Star className="h-4 w-4" />}
            gradient
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <KPITile
            label="Avg Match Score"
            value={`${stats.avgMatchScore}%`}
            delta="Strong matches"
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </motion.div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search applications..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="h-9 pl-9 pr-3 rounded-[10px] border border-border bg-card text-sm outline-none focus:border-primary"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 h-9 px-4 rounded-[10px] border border-border bg-card text-[12px] font-600 transition-colors ${
                showFilters ? 'border-primary bg-primary-soft' : 'hover:border-primary'
              }`}
            >
              <Filter className="h-3 w-3" />
              Filters {statusFilter.length > 0 && `(${statusFilter.length})`}
            </motion.button>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('kanban')}
              className={`h-9 px-4 rounded-[10px] text-[12px] font-600 transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card hover:border-primary'
              }`}
            >
              Kanban
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('timeline')}
              className={`h-9 px-4 rounded-[10px] text-[12px] font-600 transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card hover:border-primary'
              }`}
            >
              Timeline
            </motion.button>
          </div>
        </div>

        {/* Status Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-[12px] border border-border bg-card p-4 shadow-card">
                <div className="text-[12px] font-600 uppercase tracking-wider text-muted-foreground mb-3">Filter by status</div>
                <div className="flex flex-wrap gap-2">
                  {['Applied', 'Reviewing', 'Interview', 'KIV', 'Offered', 'Rejected'].map(status => (
                    <motion.button
                      key={status}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleStatusFilter(status)}
                      className={`h-8 px-3 rounded-[8px] text-[12px] font-600 transition-colors ${
                        statusFilter.includes(status)
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-border bg-card hover:border-primary'
                      }`}
                    >
                      {status}
                    </motion.button>
                  ))}
                  {statusFilter.length > 0 && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStatusFilter([])}
                      className="h-8 px-3 rounded-[8px] border border-border bg-card text-[12px] font-600 hover:border-error hover:text-error transition-colors"
                    >
                      Clear filters
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {stages.slice(0, 4).map((stage, stageIndex) => (
            <motion.section
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: stageIndex * 0.1 }}
              className="rounded-[12px] border border-border bg-card p-4 shadow-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ color: stage.color }}>{stage.icon}</span>
                  <h3 className="text-[14px] font-600">{stage.label}</h3>
                </div>
                <Badge tone="default" size="sm">
                  {stage.applications.length}
                </Badge>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-2"
              >
                {stage.applications.map((app, i) => (
                  <motion.article
                    key={app.id}
                    variants={fadeInUp}
                    custom={i}
                    layoutId={app.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedApplication(app)}
                    className="rounded-[10px] border border-border bg-background p-3 cursor-pointer hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-[13px] font-600 line-clamp-1">
                        {app.job.title}
                      </div>
                      <Badge tone="ai" size="sm">
                        {app.matchScore}%
                      </Badge>
                    </div>
                    <div className="text-[12px] text-muted-foreground mb-1">
                      {app.job.company}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(app.appliedDate), { addSuffix: true })}
                      </span>
                      {app.interviewDate && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(app.interviewDate), 'MMM d')}
                        </span>
                      )}
                    </div>

                    {/* Timeline dots */}
                    <div className="mt-2 flex items-center gap-1">
                      {app.timeline.map((t, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className="text-[14px]"
                        >
                          {t.icon}
                        </motion.span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              {stage.applications.length === 0 && (
                <div className="py-8 text-center text-[12px] text-muted-foreground">
                  No applications in this stage
                </div>
              )}
            </motion.section>
          ))}
        </div>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {filteredApplications.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
              onClick={() => setSelectedApplication(app)}
              className="rounded-[12px] border border-border bg-card p-4 shadow-card hover:shadow-hero transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Company logo placeholder */}
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-soft to-emphasis-soft text-lg font-600">
                  {app.job.company.charAt(0)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-[15px] font-600">{app.job.title}</h3>
                      <p className="text-[13px] text-muted-foreground">
                        {app.job.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone={
                        app.status === 'Interview' ? 'warning' :
                        app.status === 'Offered' ? 'success' :
                        app.status === 'Rejected' ? 'error' :
                        'default'
                      }>
                        {app.status}
                      </Badge>
                      <Badge tone="ai">
                        {app.matchScore}% match
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[12px] text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {app.job.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {app.job.salary}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Applied {formatDistanceToNow(new Date(app.appliedDate), { addSuffix: true })}
                    </span>
                    {app.interviewDate && (
                      <span className="inline-flex items-center gap-1 text-primary font-600">
                        <Calendar className="h-3 w-3" />
                        Interview: {format(new Date(app.interviewDate), 'MMM d, h:mm a')}
                      </span>
                    )}
                  </div>

                  {/* Timeline */}
                  <div className="relative">
                    <div className="absolute left-0 top-3 h-[1px] w-full bg-border" />
                    <div className="relative flex items-center justify-between">
                      {app.timeline.map((event, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
                          className="relative flex flex-col items-center"
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-card border-2 border-primary z-10">
                            <span className="text-[12px]">{event.icon}</span>
                          </div>
                          <div className="mt-1 text-[10px] text-muted-foreground whitespace-nowrap">
                            {event.status}
                          </div>
                          <div className="text-[9px] text-muted-foreground">
                            {format(new Date(event.date), 'MMM d')}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {app.nextSteps && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-3 p-2 rounded-[8px] bg-primary-soft"
                    >
                      <div className="text-[11px] font-600 text-primary mb-0.5">Next Steps</div>
                      <p className="text-[11px] text-muted-foreground">{app.nextSteps}</p>
                    </motion.div>
                  )}
                </div>

                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Application Details Modal */}
      <AnimatePresence>
        {selectedApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedApplication(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-[14px] border border-border p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-hero"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[18px] font-600">{selectedApplication.job.title}</h3>
                  <p className="text-[14px] text-muted-foreground">
                    {selectedApplication.job.company} · {selectedApplication.job.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>

              {/* Application Info */}
              <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div className="p-3 rounded-[10px] bg-inset">
                  <div className="text-[12px] text-muted-foreground mb-1">Status</div>
                  <div className="flex items-center gap-2">
                    <Badge tone={
                      selectedApplication.status === 'Interview' ? 'warning' :
                      selectedApplication.status === 'Offered' ? 'success' :
                      selectedApplication.status === 'Rejected' ? 'error' :
                      'default'
                    }>
                      {selectedApplication.status}
                    </Badge>
                    <span className="text-[13px] font-600">
                      Match Score: {selectedApplication.matchScore}%
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-[10px] bg-inset">
                  <div className="text-[12px] text-muted-foreground mb-1">Salary Range</div>
                  <div className="text-[14px] font-600">{selectedApplication.job.salary}</div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-4">
                <h4 className="text-[14px] font-600 mb-3">Application Timeline</h4>
                <div className="space-y-3">
                  {selectedApplication.timeline.map((event, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft">
                        <span className="text-[14px]">{event.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] font-600">{event.status}</div>
                        <div className="text-[12px] text-muted-foreground">
                          {event.description} · {format(new Date(event.date), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Interview Details */}
              {selectedApplication.interviewDate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 rounded-[10px] bg-warning-soft mb-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-warning" />
                    <span className="text-[13px] font-600 text-warning">Interview Scheduled</span>
                  </div>
                  <p className="text-[12px] text-muted-foreground">
                    {format(new Date(selectedApplication.interviewDate), 'EEEE, MMMM d, yyyy · h:mm a')}
                  </p>
                  {selectedApplication.interviewLocation && (
                    <p className="text-[12px] text-muted-foreground mt-1">
                      <MapPin className="inline h-3 w-3 mr-1" />
                      {selectedApplication.interviewLocation}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    toast.success("Opening message", {
                      description: `Starting conversation with ${selectedApplication.job.company}`
                    });
                  }}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-[10px] bg-primary text-primary-foreground text-[12px] font-600 hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="h-3 w-3" />
                  Message Recruiter
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    toast.success("Download started", {
                      description: "Your application PDF is downloading"
                    });
                  }}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-[10px] border border-border bg-card text-[12px] font-600 hover:border-primary transition-colors"
                >
                  <Download className="h-3 w-3" />
                  Download
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUploadDocument(selectedApplication.id)}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-[10px] border border-border bg-card text-[12px] font-600 hover:border-primary transition-colors"
                >
                  <Upload className="h-3 w-3" />
                  Upload Document
                </motion.button>
                {selectedApplication.status !== 'Rejected' && selectedApplication.status !== 'Offered' && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowWithdrawConfirm(selectedApplication.id)}
                    className="inline-flex items-center gap-2 h-9 px-4 rounded-[10px] border border-error bg-card text-error text-[12px] font-600 hover:bg-error-soft transition-colors ml-auto"
                  >
                    <Trash2 className="h-3 w-3" />
                    Withdraw
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Withdraw Confirmation Modal */}
      <AnimatePresence>
        {showWithdrawConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowWithdrawConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-[14px] border border-border p-6 max-w-md w-full shadow-hero"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error-soft">
                  <AlertCircle className="h-5 w-5 text-error" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] font-600 mb-1">Withdraw Application?</h3>
                  <p className="text-[13px] text-muted-foreground">
                    Are you sure you want to withdraw this application? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowWithdrawConfirm(null)}
                  className="h-9 px-4 rounded-[10px] border border-border bg-card text-[12px] font-600 hover:border-primary transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const app = allApplications.find(a => a.id === showWithdrawConfirm);
                    if (app) handleWithdrawApplication(app.id, app.job.title);
                  }}
                  className="h-9 px-4 rounded-[10px] bg-error text-white text-[12px] font-600 hover:opacity-90 transition-opacity"
                >
                  Withdraw Application
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}