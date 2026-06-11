import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui-bits";
import {
  Calendar, Clock, Users, Video, MapPin, ChevronLeft, ChevronRight,
  Plus, User, Briefcase, Star, AlertCircle, Check, X
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Interview {
  id: string;
  candidate: string;
  role: string;
  time: string;
  duration: string;
  type: "video" | "in-person" | "phone";
  status: "scheduled" | "confirmed" | "pending";
  matchScore: number;
}

interface InterviewCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName?: string;
}

export function InterviewCalendar({ isOpen, onClose, candidateName }: InterviewCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<"calendar" | "schedule">("calendar");

  // Generate dates for current week
  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeek);
  const monthYear = weekDates[3].toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Sample interview data
  const interviews: Interview[] = [
    {
      id: "1",
      candidate: candidateName || "Sarah Chen",
      role: "Senior Developer",
      time: "09:00 AM",
      duration: "45 min",
      type: "video",
      status: "confirmed",
      matchScore: 92
    },
    {
      id: "2",
      candidate: "Ahmad Rahman",
      role: "Marketing Manager",
      time: "11:00 AM",
      duration: "30 min",
      type: "in-person",
      status: "scheduled",
      matchScore: 85
    },
    {
      id: "3",
      candidate: "Priya Kumar",
      role: "Data Analyst",
      time: "02:00 PM",
      duration: "60 min",
      type: "video",
      status: "pending",
      matchScore: 78
    },
    {
      id: "4",
      candidate: "David Lim",
      role: "Sales Executive",
      time: "03:30 PM",
      duration: "30 min",
      type: "phone",
      status: "confirmed",
      matchScore: 81
    },
    {
      id: "5",
      candidate: "Mei Wong",
      role: "UX Designer",
      time: "10:00 AM",
      duration: "45 min",
      type: "video",
      status: "confirmed",
      matchScore: 88
    }
  ];

  // Get interviews for a specific date
  const getInterviewsForDate = (date: Date) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 1) return [interviews[0], interviews[1]]; // Monday
    if (dayOfWeek === 2) return [interviews[2]]; // Tuesday
    if (dayOfWeek === 3) return [interviews[3], interviews[4]]; // Wednesday
    if (dayOfWeek === 4) return [interviews[0]]; // Thursday
    return [];
  };

  const handleScheduleInterview = () => {
    if (!selectedDate) {
      toast.error("Please select a date first");
      return;
    }
    toast.success("Interview scheduled!", {
      description: `Interview scheduled for ${selectedDate.toLocaleDateString()}`
    });
  };

  const handleConfirmInterview = (interview: Interview) => {
    toast.success("Interview confirmed", {
      description: `Interview with ${interview.candidate} confirmed`
    });
  };

  const handleCancelInterview = (interview: Interview) => {
    toast.error("Interview cancelled", {
      description: `Interview with ${interview.candidate} cancelled`
    });
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
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-6xl md:w-full md:max-h-[85vh] overflow-auto bg-card rounded-[16px] border border-border shadow-hero z-50"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="text-[20px] font-700">Interview Schedule</h2>
                <p className="text-[13px] text-muted-foreground mt-1">
                  Manage and schedule interviews with candidates
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-[8px] border border-border">
                  <button
                    onClick={() => setViewMode("calendar")}
                    className={`px-4 py-2 text-[12px] font-600 rounded-l-[8px] transition-colors ${
                      viewMode === "calendar" ? "bg-primary text-primary-foreground" : "hover:bg-inset"
                    }`}
                  >
                    Calendar View
                  </button>
                  <button
                    onClick={() => setViewMode("schedule")}
                    className={`px-4 py-2 text-[12px] font-600 rounded-r-[8px] transition-colors ${
                      viewMode === "schedule" ? "bg-primary text-primary-foreground" : "hover:bg-inset"
                    }`}
                  >
                    Schedule View
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-inset transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {viewMode === "calendar" ? (
                <>
                  {/* Calendar Navigation */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setCurrentWeek(currentWeek - 1)}
                        className="p-2 rounded-lg hover:bg-inset transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <h3 className="text-[16px] font-600">{monthYear}</h3>
                      <button
                        onClick={() => setCurrentWeek(currentWeek + 1)}
                        className="p-2 rounded-lg hover:bg-inset transition-colors"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      {currentWeek !== 0 && (
                        <button
                          onClick={() => setCurrentWeek(0)}
                          className="text-[12px] font-600 text-primary hover:underline"
                        >
                          Today
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone="success">
                        <Check className="h-3 w-3" /> 8 confirmed
                      </Badge>
                      <Badge tone="warning">
                        <AlertCircle className="h-3 w-3" /> 3 pending
                      </Badge>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-3">
                    {/* Day Headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-[12px] font-600 text-muted-foreground text-center pb-2">
                        {day}
                      </div>
                    ))}

                    {/* Date Cells */}
                    {weekDates.map((date, index) => {
                      const dayInterviews = getInterviewsForDate(date);
                      const isToday = date.toDateString() === new Date().toDateString();
                      const isSelected = selectedDate?.toDateString() === date.toDateString();

                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedDate(date)}
                          className={`min-h-[120px] rounded-[10px] border p-3 cursor-pointer transition-all ${
                            isSelected
                              ? "border-primary bg-primary-soft"
                              : isToday
                              ? "border-emphasis bg-emphasis-soft"
                              : "border-border hover:border-primary hover:bg-inset"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[14px] font-600 ${isToday ? "text-emphasis" : ""}`}>
                              {date.getDate()}
                            </span>
                            {dayInterviews.length > 0 && (
                              <Badge tone="primary" className="text-[10px]">
                                {dayInterviews.length}
                              </Badge>
                            )}
                          </div>

                          <div className="space-y-1">
                            {dayInterviews.slice(0, 2).map((interview, idx) => (
                              <div
                                key={idx}
                                className="text-[10px] p-1.5 rounded bg-card border border-border"
                              >
                                <div className="font-600 truncate">{interview.time}</div>
                                <div className="text-muted-foreground truncate">{interview.candidate}</div>
                              </div>
                            ))}
                            {dayInterviews.length > 2 && (
                              <div className="text-[10px] text-muted-foreground text-center">
                                +{dayInterviews.length - 2} more
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Selected Date Details */}
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 rounded-[12px] border border-border bg-card p-5"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[14px] font-600">
                          {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h4>
                        <button
                          onClick={handleScheduleInterview}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[8px] bg-primary text-[11px] font-600 text-primary-foreground hover:opacity-90"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Schedule Interview
                        </button>
                      </div>

                      <div className="space-y-2">
                        {getInterviewsForDate(selectedDate).length > 0 ? (
                          getInterviewsForDate(selectedDate).map(interview => (
                            <div
                              key={interview.id}
                              className="flex items-center justify-between p-3 rounded-[10px] border border-border bg-inset"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card">
                                  <User className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                  <div className="text-[13px] font-600">{interview.candidate}</div>
                                  <div className="text-[11px] text-muted-foreground">
                                    {interview.role} • {interview.time} • {interview.duration}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge tone="ai">
                                  <Star className="h-3 w-3" /> {interview.matchScore}%
                                </Badge>
                                {interview.type === "video" && <Video className="h-4 w-4 text-primary" />}
                                {interview.type === "in-person" && <MapPin className="h-4 w-4 text-primary" />}
                                <button
                                  onClick={() => handleConfirmInterview(interview)}
                                  className="p-1.5 rounded-lg hover:bg-success-soft transition-colors"
                                >
                                  <Check className="h-4 w-4 text-success" />
                                </button>
                                <button
                                  onClick={() => handleCancelInterview(interview)}
                                  className="p-1.5 rounded-lg hover:bg-danger-soft transition-colors"
                                >
                                  <X className="h-4 w-4 text-danger" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-[13px] text-muted-foreground">
                            No interviews scheduled for this day
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                /* Schedule View */
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[16px] font-600">This Week's Interviews</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-muted-foreground">Total:</span>
                      <Badge tone="primary">{interviews.length} interviews</Badge>
                    </div>
                  </div>

                  {/* Timeline View */}
                  <div className="space-y-3">
                    {weekDates.map((date, dayIndex) => {
                      const dayInterviews = getInterviewsForDate(date);
                      if (dayInterviews.length === 0) return null;

                      return (
                        <div key={dayIndex} className="rounded-[12px] border border-border bg-card p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="h-4 w-4 text-primary" />
                            <h4 className="text-[14px] font-600">
                              {date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </h4>
                            <Badge tone="default" className="ml-auto">
                              {dayInterviews.length} interviews
                            </Badge>
                          </div>

                          <div className="space-y-2 ml-6">
                            {dayInterviews.map((interview, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center justify-between p-3 rounded-[10px] bg-inset"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="text-[13px] font-600 text-muted-foreground w-20">
                                    {interview.time}
                                  </div>
                                  <div className="w-px h-8 bg-border" />
                                  <div>
                                    <div className="text-[13px] font-600">{interview.candidate}</div>
                                    <div className="text-[11px] text-muted-foreground">
                                      {interview.role} • {interview.duration}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge tone={
                                    interview.status === "confirmed" ? "success" :
                                    interview.status === "pending" ? "warning" : "default"
                                  }>
                                    {interview.status}
                                  </Badge>
                                  <Badge tone="ai">
                                    <Star className="h-3 w-3" /> {interview.matchScore}%
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    {interview.type === "video" && (
                                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                        <Video className="h-3.5 w-3.5" /> Video
                                      </span>
                                    )}
                                    {interview.type === "in-person" && (
                                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                        <MapPin className="h-3.5 w-3.5" /> In-person
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex items-center justify-between">
              <div className="text-[12px] text-muted-foreground">
                Tip: Click on any date to see detailed interview schedule
              </div>
              <button
                onClick={onClose}
                className="inline-flex h-10 items-center rounded-[10px] border border-border bg-card px-5 text-[13px] font-600 hover:border-primary transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}