import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Target, TrendingUp, BookOpen, Award, ChevronRight,
  Briefcase, GraduationCap, Star, Clock, MapPin,
  ArrowRight, CheckCircle2, Info, Lock, Sparkles,
  BarChart3, Users, FileText, Download, Play,
  PlusCircle, Brain, Lightbulb, Trophy, Zap,
  Shield, Coffee, GitBranch, Compass, Flag
} from "lucide-react";
import { Card } from "@/components/ui-bits";
import { AppShell } from "@/components/AppShell";
import { jobseekerNav, employerNav, officerNav } from "@/lib/nav";

export const Route = createFileRoute("/career-pathway")({
  component: CareerPathway,
});

function CareerPathway() {
  const [userRole, setUserRole] = useState<"jobseeker" | "employer" | "officer">("jobseeker");

  useEffect(() => {
    // Get user role from localStorage or session
    const storedRole = localStorage.getItem("userRole") || "jobseeker";
    setUserRole(storedRole as "jobseeker" | "employer" | "officer");
  }, []);

  // Select navigation based on user role
  const navigation = userRole === "employer" ? employerNav : userRole === "officer" ? officerNav : jobseekerNav;
  const userName = userRole === "employer" ? "Employer User" : userRole === "officer" ? "Officer User" : "Alex Chen";
  const userRoleLabel = userRole === "employer" ? "Employer" : userRole === "officer" ? "Case Officer" : "Jobseeker";
  const [selectedRole, setSelectedRole] = useState("Software Engineer");
  const [currentLevel, setCurrentLevel] = useState("Junior");

  const careerPaths = {
    "Software Engineer": {
      levels: [
        {
          title: "Junior Developer",
          yearsExp: "0-2 years",
          avgSalary: "RM 3,500 - 5,000",
          skills: ["HTML/CSS", "JavaScript", "Git", "Basic SQL"],
          certifications: ["AWS Certified Cloud Practitioner"],
          current: currentLevel === "Junior",
        },
        {
          title: "Mid-Level Developer",
          yearsExp: "2-5 years",
          avgSalary: "RM 5,000 - 8,000",
          skills: ["React/Vue", "Node.js", "Docker", "CI/CD"],
          certifications: ["AWS Solutions Architect"],
          current: currentLevel === "Mid",
        },
        {
          title: "Senior Developer",
          yearsExp: "5-8 years",
          avgSalary: "RM 8,000 - 12,000",
          skills: ["System Design", "Microservices", "Team Leadership"],
          certifications: ["Professional Scrum Master"],
          current: currentLevel === "Senior",
        },
        {
          title: "Tech Lead / Architect",
          yearsExp: "8+ years",
          avgSalary: "RM 12,000 - 18,000",
          skills: ["Architecture Design", "Strategic Planning", "Mentoring"],
          certifications: ["TOGAF", "PMP"],
          current: false,
        },
      ],
      relatedRoles: ["DevOps Engineer", "Product Manager", "Data Engineer", "Solutions Architect"],
      learningPaths: [
        { name: "Full Stack Development", duration: "6 months", provider: "Coursera" },
        { name: "Cloud Architecture", duration: "4 months", provider: "AWS Training" },
        { name: "Machine Learning Basics", duration: "3 months", provider: "Google" },
      ],
    },
    "Digital Marketer": {
      levels: [
        {
          title: "Marketing Executive",
          yearsExp: "0-2 years",
          avgSalary: "RM 2,800 - 4,000",
          skills: ["Social Media", "Content Writing", "Basic Analytics"],
          certifications: ["Google Ads Fundamentals"],
          current: currentLevel === "Junior",
        },
        {
          title: "Marketing Specialist",
          yearsExp: "2-5 years",
          avgSalary: "RM 4,000 - 6,500",
          skills: ["SEO/SEM", "Campaign Management", "Data Analysis"],
          certifications: ["Google Analytics Certified"],
          current: currentLevel === "Mid",
        },
        {
          title: "Marketing Manager",
          yearsExp: "5-8 years",
          avgSalary: "RM 6,500 - 10,000",
          skills: ["Strategy Development", "Team Management", "Budget Planning"],
          certifications: ["HubSpot Marketing Certified"],
          current: currentLevel === "Senior",
        },
        {
          title: "Marketing Director",
          yearsExp: "8+ years",
          avgSalary: "RM 10,000 - 15,000",
          skills: ["Strategic Leadership", "P&L Management", "Brand Strategy"],
          certifications: ["CMO Certification"],
          current: false,
        },
      ],
      relatedRoles: ["Content Strategist", "Growth Manager", "Brand Manager", "PR Manager"],
      learningPaths: [
        { name: "Digital Marketing Masterclass", duration: "4 months", provider: "Udemy" },
        { name: "Data-Driven Marketing", duration: "3 months", provider: "LinkedIn Learning" },
        { name: "Marketing Leadership", duration: "2 months", provider: "Harvard Business" },
      ],
    },
  };

  const currentPath = careerPaths[selectedRole as keyof typeof careerPaths] || careerPaths["Software Engineer"];

  const skillGapAnalysis = [
    { skill: "Cloud Computing", current: 3, required: 5, recommendation: "AWS Certification Course" },
    { skill: "Project Management", current: 2, required: 4, recommendation: "Agile/Scrum Training" },
    { skill: "Data Analysis", current: 4, required: 4, recommendation: "Already proficient" },
    { skill: "Leadership", current: 2, required: 5, recommendation: "Leadership Workshop" },
  ];

  const upcomingMilestones = [
    { title: "Complete AWS Certification", dueDate: "Jan 2025", progress: 65 },
    { title: "Lead First Project", dueDate: "Mar 2025", progress: 30 },
    { title: "Performance Review", dueDate: "Apr 2025", progress: 0 },
    { title: "Promotion Eligibility", dueDate: "Jun 2025", progress: 45 },
  ];

  return (
    <AppShell
      nav={navigation}
      user={{
        name: userName,
        role: userRoleLabel,
        avatar: userName.substring(0, 2).toUpperCase(),
      }}
    >
      <div className="min-h-screen bg-surface">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-700">Career Pathway Explorer</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Visualize your career journey and plan your next steps
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-[10px] bg-primary px-4 py-2 text-sm font-600 text-white hover:opacity-90">
              <Sparkles className="h-4 w-4" />
              Get AI Recommendations
            </button>
          </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Role Selector */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-600">Select Career Path</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(careerPaths).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`rounded-[8px] px-4 py-2 text-sm font-600 transition-colors ${
                  selectedRole === role
                    ? "bg-primary text-white"
                    : "border border-border bg-card hover:bg-inset"
                }`}
              >
                {role}
              </button>
            ))}
            <button className="rounded-[8px] border border-dashed border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary">
              + Add Custom Path
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Career Progression Timeline */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-700">Career Progression</h2>
              <div className="space-y-4">
                {currentPath.levels.map((level, index) => (
                  <div key={level.title} className="relative">
                    {index < currentPath.levels.length - 1 && (
                      <div className="absolute left-6 top-12 h-full w-0.5 bg-border" />
                    )}
                    <div className={`flex gap-4 rounded-[10px] p-4 transition-colors ${
                      level.current ? "bg-primary/10 border border-primary" : "hover:bg-inset"
                    }`}>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        level.current ? "bg-primary text-white" : "bg-inset"
                      }`}>
                        {level.current ? (
                          <Target className="h-5 w-5" />
                        ) : index < currentPath.levels.findIndex(l => l.current) ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-600">{level.title}</h3>
                          {level.current && (
                            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-600 text-white">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {level.yearsExp}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {level.avgSalary}
                          </span>
                        </div>
                        <div className="mt-3">
                          <p className="mb-2 text-xs font-600">Key Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {level.skills.map((skill) => (
                              <span key={skill} className="rounded-full bg-inset px-2 py-0.5 text-[10px]">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        {level.certifications.length > 0 && (
                          <div className="mt-2">
                            <p className="mb-1 text-xs font-600">Recommended Certifications:</p>
                            <div className="flex flex-wrap gap-1">
                              {level.certifications.map((cert) => (
                                <span key={cert} className="flex items-center gap-1 text-[10px] text-primary">
                                  <Award className="h-3 w-3" />
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Skill Gap Analysis */}
            <Card className="mt-6 p-6">
              <h2 className="mb-4 text-lg font-700">Skill Gap Analysis</h2>
              <div className="space-y-4">
                {skillGapAnalysis.map((skill) => (
                  <div key={skill.skill}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-600">{skill.skill}</span>
                      <span className="text-xs text-muted-foreground">{skill.recommendation}</span>
                    </div>
                    <div className="relative h-2 rounded-full bg-inset">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-primary/30"
                        style={{ width: `${(skill.required / 5) * 100}%` }}
                      />
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-primary"
                        style={{ width: `${(skill.current / 5) * 100}%` }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                      <span>Current: {skill.current}/5</span>
                      <span>Required: {skill.required}/5</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Roles */}
            <Card className="p-6">
              <h3 className="mb-3 text-sm font-700">Alternative Career Paths</h3>
              <div className="space-y-2">
                {currentPath.relatedRoles.map((role) => (
                  <button
                    key={role}
                    className="flex w-full items-center justify-between rounded-[8px] p-2 text-left text-sm hover:bg-inset"
                  >
                    <span>{role}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Learning Paths */}
            <Card className="p-6">
              <h3 className="mb-3 text-sm font-700">Recommended Learning</h3>
              <div className="space-y-3">
                {currentPath.learningPaths.map((path) => (
                  <div key={path.name} className="rounded-[8px] border border-border p-3">
                    <p className="text-sm font-600">{path.name}</p>
                    <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {path.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {path.provider}
                      </span>
                    </div>
                    <button className="mt-2 text-xs font-600 text-primary hover:underline">
                      Enroll Now →
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Milestones */}
            <Card className="p-6">
              <h3 className="mb-3 text-sm font-700">Upcoming Milestones</h3>
              <div className="space-y-3">
                {upcomingMilestones.map((milestone) => (
                  <div key={milestone.title}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-600">{milestone.title}</p>
                      <span className="text-[10px] text-muted-foreground">{milestone.dueDate}</span>
                    </div>
                    <div className="relative h-1.5 rounded-full bg-inset">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-primary"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground">{milestone.progress}% complete</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Career Coach */}
            <Card className="bg-gradient-to-br from-primary/10 to-transparent p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-700">AI Career Coach</h3>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">
                Get personalized advice on reaching your next career milestone
              </p>
              <button className="w-full rounded-[8px] bg-primary py-2 text-xs font-600 text-white hover:opacity-90">
                Start Coaching Session
              </button>
            </Card>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Career Insights */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="font-700">Market Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Demand Growth</span>
                <span className="text-sm font-600 text-green-500">+23%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg. Time to Hire</span>
                <span className="text-sm font-600">42 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Competition Level</span>
                <span className="text-sm font-600 text-orange-500">Medium</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Remote Opportunities</span>
                <span className="text-sm font-600">65%</span>
              </div>
            </div>
            <button className="mt-4 w-full rounded-[8px] border border-border bg-inset py-2 text-xs font-600 hover:bg-card">
              View Full Report
            </button>
          </Card>

          {/* Success Stories */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-primary" />
              <h3 className="font-700">Success Stories</h3>
            </div>
            <div className="space-y-3">
              <div className="rounded-[8px] bg-inset p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-primary-soft text-primary text-xs font-600 flex items-center justify-center">
                    JL
                  </div>
                  <div>
                    <p className="text-sm font-600">Jane Lee</p>
                    <p className="text-xs text-muted-foreground">Junior → Senior in 3 years</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  "The career pathway helped me identify key skills to focus on..."
                </p>
              </div>
              <div className="rounded-[8px] bg-inset p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-primary-soft text-primary text-xs font-600 flex items-center justify-center">
                    MR
                  </div>
                  <div>
                    <p className="text-sm font-600">Mike Rahman</p>
                    <p className="text-xs text-muted-foreground">Switched to Tech Lead</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  "Clear milestones made my transition smooth..."
                </p>
              </div>
            </div>
            <button className="mt-4 w-full rounded-[8px] bg-primary py-2 text-xs font-600 text-white hover:opacity-90">
              Share Your Story
            </button>
          </Card>

          {/* Interactive Tools */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="h-5 w-5 text-primary" />
              <h3 className="font-700">Career Tools</h3>
            </div>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between rounded-[8px] p-3 text-left hover:bg-inset">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span className="text-sm">Skills Assessment</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between rounded-[8px] p-3 text-left hover:bg-inset">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-primary" />
                  <span className="text-sm">Career Path Simulator</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between rounded-[8px] p-3 text-left hover:bg-inset">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm">CV Builder</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between rounded-[8px] p-3 text-left hover:bg-inset">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary" />
                  <span className="text-sm">Export Career Plan</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </Card>
        </div>

        {/* Learning Resources */}
        <Card className="mt-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="font-700">Featured Learning Resources</h3>
            </div>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Cloud Architecture Fundamentals",
                provider: "AWS",
                duration: "40 hours",
                level: "Intermediate",
                rating: 4.8,
                enrolled: 2341,
                icon: "☁️"
              },
              {
                title: "Leadership & Team Management",
                provider: "LinkedIn Learning",
                duration: "20 hours",
                level: "Advanced",
                rating: 4.7,
                enrolled: 1856,
                icon: "👥"
              },
              {
                title: "Data Science Bootcamp",
                provider: "Coursera",
                duration: "60 hours",
                level: "Beginner",
                rating: 4.9,
                enrolled: 3421,
                icon: "📊"
              },
              {
                title: "Agile Project Management",
                provider: "Udemy",
                duration: "30 hours",
                level: "Intermediate",
                rating: 4.6,
                enrolled: 2107,
                icon: "🚀"
              }
            ].map((course) => (
              <div key={course.title} className="rounded-[10px] border border-border p-4 hover:border-primary transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{course.icon}</span>
                  <span className="rounded-full bg-inset px-2 py-0.5 text-[10px] font-600">
                    {course.level}
                  </span>
                </div>
                <h4 className="text-sm font-600 mb-1">{course.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{course.provider}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    <span className="text-xs">{course.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{course.enrolled} enrolled</span>
                  <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                    <Play className="h-3 w-3" />
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Career Path Comparison */}
        <Card className="mt-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="h-5 w-5 text-primary" />
            <h3 className="font-700">Compare Career Paths</h3>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[10px] border border-primary bg-primary/5 p-4">
              <h4 className="font-600 mb-3">Your Current Path: {selectedRole}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time to Senior Level</span>
                  <span className="font-600">3-5 years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Salary Growth</span>
                  <span className="font-600 text-green-500">+150%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Job Openings</span>
                  <span className="font-600">2,456</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Skills Required</span>
                  <span className="font-600">12 core</span>
                </div>
              </div>
            </div>
            <div className="rounded-[10px] border border-border p-4">
              <h4 className="font-600 mb-3">Alternative: Product Manager</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time to Senior Level</span>
                  <span className="font-600">4-6 years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Salary Growth</span>
                  <span className="font-600 text-green-500">+180%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Job Openings</span>
                  <span className="font-600">1,234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Skills Required</span>
                  <span className="font-600">10 core</span>
                </div>
              </div>
              <button className="mt-3 w-full rounded-[8px] border border-primary bg-transparent py-2 text-xs font-600 text-primary hover:bg-primary hover:text-white">
                Explore This Path
              </button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}