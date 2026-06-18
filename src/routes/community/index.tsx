import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Users, MessageSquare, Calendar, Award, TrendingUp,
  Heart, MessageCircle, Share2, Bookmark, Search,
  Filter, ChevronRight, Star, UserCheck, Globe,
  Video, Mic, Image, Link, Hash, MapPin,
  Bell, Settings, MoreVertical, ThumbsUp,
  Send, PlusCircle, CheckCircle, Clock,
  Trophy, Target, Zap, Shield, Coffee
} from "lucide-react";
import { Card } from "@/components/ui-bits";
import { AppShell } from "@/components/AppShell";
import { jobseekerNav, employerNav, officerNav } from "@/lib/nav";

export const Route = createFileRoute("/community/")({
  component: Community,
});

function Community() {
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
  const [activeTab, setActiveTab] = useState<"feed" | "groups" | "events" | "mentors">("feed");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Active Members", value: "25,432", icon: Users, color: "text-blue-500" },
    { label: "Discussion Groups", value: "156", icon: MessageSquare, color: "text-green-500" },
    { label: "Upcoming Events", value: "42", icon: Calendar, color: "text-orange-500" },
    { label: "Success Stories", value: "1,289", icon: Award, color: "text-blue-600" },
  ];

  const posts = [
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "SC",
      role: "Software Engineer at Tech Corp",
      time: "2 hours ago",
      content: "Just completed the AI certification program through MYFutureJobs! The learning path was well-structured and the mentorship made all the difference. Happy to share my experience with anyone interested! 🎓",
      likes: 124,
      comments: 32,
      shares: 15,
      tags: ["#CareerGrowth", "#AILearning", "#Success"],
    },
    {
      id: 2,
      author: "Ahmad Ibrahim",
      avatar: "AI",
      role: "Career Coach",
      time: "5 hours ago",
      content: "Hosting a free webinar next week on 'Interview Preparation for Tech Roles'. Limited spots available. Register through the events section!",
      likes: 89,
      comments: 21,
      shares: 45,
      tags: ["#CareerTips", "#Webinar", "#FreeEvent"],
    },
    {
      id: 3,
      author: "MYFutureJobs Team",
      avatar: "MF",
      role: "Official",
      time: "1 day ago",
      content: "🎉 Exciting news! We've launched a new mentorship matching program. Get paired with industry professionals based on your career goals. Check out the Mentors tab to get started!",
      likes: 342,
      comments: 67,
      shares: 128,
      tags: ["#Mentorship", "#CareerDevelopment"],
    },
  ];

  const groups = [
    { name: "Tech Professionals Malaysia", members: "5.2k", posts: "12 new today", icon: "💻" },
    { name: "Fresh Graduates Network", members: "8.7k", posts: "28 new today", icon: "🎓" },
    { name: "Women in Business", members: "3.4k", posts: "15 new today", icon: "👩‍💼" },
    { name: "Startup Founders Hub", members: "2.1k", posts: "7 new today", icon: "🚀" },
    { name: "Creative Industries", members: "4.6k", posts: "19 new today", icon: "🎨" },
    { name: "Healthcare Professionals", members: "6.3k", posts: "23 new today", icon: "🏥" },
  ];

  const events = [
    {
      title: "Career Fair 2024",
      date: "28 Dec 2024",
      time: "10:00 AM - 5:00 PM",
      location: "KLCC Convention Centre",
      attendees: 1250,
      type: "In-Person",
    },
    {
      title: "Digital Marketing Masterclass",
      date: "2 Jan 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Online",
      attendees: 450,
      type: "Virtual",
    },
    {
      title: "AI & Future of Work Summit",
      date: "15 Jan 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Putrajaya International Convention Centre",
      attendees: 800,
      type: "Hybrid",
    },
  ];

  const mentors = [
    {
      name: "Dr. Lim Wei Ming",
      role: "Senior Data Scientist",
      company: "Tech Innovations Sdn Bhd",
      expertise: ["Machine Learning", "Python", "Career Planning"],
      rating: 4.9,
      sessions: 127,
      available: true,
    },
    {
      name: "Fatima Abdullah",
      role: "Marketing Director",
      company: "Global Brands Malaysia",
      expertise: ["Digital Marketing", "Brand Strategy", "Leadership"],
      rating: 4.8,
      sessions: 89,
      available: true,
    },
    {
      name: "Raj Kumar",
      role: "Startup Founder & CEO",
      company: "InnovateTech Solutions",
      expertise: ["Entrepreneurship", "Fundraising", "Product Development"],
      rating: 4.9,
      sessions: 156,
      available: false,
    },
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
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-700">Community Hub</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Connect, learn, and grow with Malaysia's professional community
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search community..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-[10px] border border-border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary lg:w-[300px]"
              />
            </div>
            <button className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-border bg-card px-4 text-sm font-600 hover:bg-inset">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-700">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-inset ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4">
        <div className="flex gap-1 rounded-[10px] border border-border bg-inset p-1">
          {[
            { id: "feed" as const, label: "Feed", icon: TrendingUp },
            { id: "groups" as const, label: "Groups", icon: Users },
            { id: "events" as const, label: "Events", icon: Calendar },
            { id: "mentors" as const, label: "Mentors", icon: UserCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-[8px] px-3 py-2 text-sm font-600 transition-colors ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === "feed" && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Sidebar - User Profile & Quick Stats */}
            <div className="hidden lg:block space-y-4">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-600">
                    {userName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-600">{userName}</p>
                    <p className="text-xs text-muted-foreground">{userRoleLabel}</p>
                  </div>
                </div>
                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Connections</span>
                    <span className="font-600">487</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Posts</span>
                    <span className="font-600">23</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reputation</span>
                    <span className="font-600 text-primary">Expert</span>
                  </div>
                </div>
                <button className="mt-4 w-full rounded-[8px] border border-border bg-inset py-2 text-xs font-600 hover:bg-card">
                  View Full Profile
                </button>
              </Card>

              <Card className="p-4">
                <h3 className="font-600 text-sm mb-3">Trending Topics</h3>
                <div className="space-y-2">
                  {["#AIJobs", "#RemoteWork", "#TechMalaysia", "#CareerGrowth", "#StartupLife"].map((tag) => (
                    <button key={tag} className="flex items-center justify-between w-full text-left hover:bg-inset rounded-[6px] p-1.5">
                      <span className="text-xs text-primary">{tag}</span>
                      <span className="text-[10px] text-muted-foreground">1.2k posts</span>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-4 w-4 text-orange-500" />
                  <h3 className="font-600 text-sm">Community Challenge</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Share your success story and win prizes!
                </p>
                <button className="w-full rounded-[8px] bg-orange-500 py-2 text-xs font-600 text-white hover:opacity-90">
                  Join Challenge
                </button>
              </Card>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-4">
            {/* Create Post */}
            <Card className="p-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary font-600">
                  {userName.substring(0, 1).toUpperCase()}
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your thoughts, achievements, or questions..."
                    className="w-full rounded-[10px] border border-border bg-inset px-3 py-2 text-sm outline-none focus:border-primary resize-none"
                    rows={3}
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-2">
                      <button className="inline-flex items-center gap-1 rounded-[6px] px-2 py-1 text-xs text-muted-foreground hover:bg-inset">
                        <Image className="h-3.5 w-3.5" />
                        Photo
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-[6px] px-2 py-1 text-xs text-muted-foreground hover:bg-inset">
                        <Video className="h-3.5 w-3.5" />
                        Video
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-[6px] px-2 py-1 text-xs text-muted-foreground hover:bg-inset">
                        <Link className="h-3.5 w-3.5" />
                        Link
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-[6px] px-2 py-1 text-xs text-muted-foreground hover:bg-inset">
                        <Hash className="h-3.5 w-3.5" />
                        Topic
                      </button>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-[10px] bg-primary px-4 py-2 text-sm font-600 text-white hover:opacity-90">
                      <Send className="h-3.5 w-3.5" />
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Posts */}
            {posts.map((post) => (
              <Card key={post.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary font-600">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-600">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.role}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                    <p className="mt-3 text-sm">{post.content}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-6 border-t border-border pt-3">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <Share2 className="h-4 w-4" />
                        {post.shares}
                      </button>
                      <button className="ml-auto text-muted-foreground hover:text-foreground">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            </div>
          </div>
        )}

        {activeTab === "groups" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.name} className="p-4 hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{group.icon}</span>
                      <h3 className="font-600">{group.name}</h3>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {group.members} members
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {group.posts}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <button className="mt-4 w-full rounded-[8px] border border-border bg-inset py-2 text-xs font-600 hover:bg-card">
                  Join Group
                </button>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "events" && (
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.title} className="p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-600">{event.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-600 ${
                        event.type === "Virtual" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" :
                        event.type === "In-Person" ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                        "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </span>
                      <span>{event.time}</span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.attendees} attending
                      </span>
                    </div>
                  </div>
                  <button className="inline-flex h-10 items-center rounded-[10px] bg-primary px-4 text-sm font-600 text-white hover:opacity-90">
                    Register
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "mentors" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <Card key={mentor.name} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary font-600">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-600">{mentor.name}</h3>
                    <p className="text-xs text-muted-foreground">{mentor.role}</p>
                    <p className="text-xs text-muted-foreground">{mentor.company}</p>
                  </div>
                  {mentor.available ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-600 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      Available
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-600 text-muted-foreground">
                      Busy
                    </span>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-1">
                  {mentor.expertise.map((skill) => (
                    <span key={skill} className="rounded-full bg-inset px-2 py-0.5 text-[10px] font-500">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      {mentor.rating}
                    </span>
                    <span>{mentor.sessions} sessions</span>
                  </div>
                  <button className={`rounded-[8px] px-3 py-1.5 text-xs font-600 ${
                    mentor.available
                      ? "bg-primary text-white hover:opacity-90"
                      : "border border-border bg-inset text-muted-foreground cursor-not-allowed"
                  }`} disabled={!mentor.available}>
                    Connect
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}