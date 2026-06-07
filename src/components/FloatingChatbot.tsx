import { useEffect, useState, useRef } from "react";
import { MessageCircle, X, Send, Sparkles, MapPin, Calendar, Building2, Award, FileText, Smartphone } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Msg = { role: "user" | "ai"; text: string; suggestions?: string[] };

interface SectionContext {
  name: string;
  icon: React.ReactNode;
  greeting: string;
  suggestions: string[];
  tips: string[];
}

const sectionContexts: Record<string, SectionContext> = {
  hero: {
    name: "Job Search",
    icon: <Sparkles className="h-4 w-4" />,
    greeting: "Welcome! I can help you find your perfect job. What role are you looking for?",
    suggestions: ["Find admin jobs in KL", "Show tech positions", "Entry-level opportunities"],
    tips: ["Use AI-powered search for better matches", "Filter by location and salary", "Save searches for alerts"]
  },
  employers: {
    name: "Top Employers",
    icon: <Building2 className="h-4 w-4" />,
    greeting: "Exploring top employers? I can share insights about company culture and open positions.",
    suggestions: ["Tell me about Petronas Digital", "Maybank work culture", "Companies hiring now"],
    tips: ["Check company ratings", "Read employee reviews", "View salary benchmarks"]
  },
  events: {
    name: "Events & Programs",
    icon: <Calendar className="h-4 w-4" />,
    greeting: "Looking for career events? I'll help you find relevant career fairs and training programs.",
    suggestions: ["Upcoming career fairs", "HRDC training programs", "Events near me"],
    tips: ["RSVP early for popular events", "Prepare your CV beforehand", "Research attending companies"]
  },
  "ai-features": {
    name: "AI Features",
    icon: <Sparkles className="h-4 w-4" />,
    greeting: "Our AI tools can accelerate your job search. Let me explain how they work.",
    suggestions: ["How does AI matching work?", "What is Career Signal Score?", "CV improvement tips"],
    tips: ["AI analyzes 400M+ profiles", "Get personalized recommendations", "Bias-free job matching"]
  },
  success: {
    name: "Success Stories",
    icon: <Award className="h-4 w-4" />,
    greeting: "Inspired by success stories? I can help you achieve similar results!",
    suggestions: ["How to improve my profile", "Interview preparation tips", "Salary negotiation advice"],
    tips: ["Update your profile regularly", "Highlight key achievements", "Use metrics in your CV"]
  },
  industries: {
    name: "Industry Solutions",
    icon: <Building2 className="h-4 w-4" />,
    greeting: "Which industry are you interested in? I can provide sector-specific guidance.",
    suggestions: ["Tech industry requirements", "Healthcare certifications", "Finance sector jobs"],
    tips: ["Each industry has specific requirements", "Check compliance needs", "Industry-specific training available"]
  },
  resources: {
    name: "Resources",
    icon: <FileText className="h-4 w-4" />,
    greeting: "Need career resources? I can guide you to the right tools and templates.",
    suggestions: ["CV templates", "Interview guides", "Salary calculator"],
    tips: ["Use our free templates", "Watch weekly webinars", "Download hiring guides"]
  },
  mobile: {
    name: "Mobile App",
    icon: <Smartphone className="h-4 w-4" />,
    greeting: "Stay connected on the go! Let me tell you about our mobile app features.",
    suggestions: ["Mobile app features", "Download for iOS", "Android app benefits"],
    tips: ["Get push notifications", "Apply on the go", "Track applications anywhere"]
  },
  default: {
    name: "Career Assistant",
    icon: <Sparkles className="h-4 w-4" />,
    greeting: "Hi! I'm your Career Assistant. Ask about jobs, training, or PERKESO services.",
    suggestions: ["Find admin jobs in KL", "Upcoming career carnivals", "How do I apply for SIP?"],
    tips: ["Create a free account", "Complete your profile", "Set up job alerts"]
  }
};

export function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("default");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [showTip, setShowTip] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Get current context based on section
  const context = sectionContexts[currentSection] || sectionContexts.default;

  // Initialize with context-aware greeting
  useEffect(() => {
    setMsgs([
      {
        role: "ai",
        text: context.greeting,
        suggestions: context.suggestions
      }
    ]);
  }, [currentSection]);

  // Set up intersection observer for section detection
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || entry.target.closest('section')?.id;
          if (sectionId && sectionContexts[sectionId]) {
            setCurrentSection(sectionId);
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    });

    // Observe all major sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observerRef.current?.observe(section);
    });

    // Also observe the hero search area
    const heroSearch = document.querySelector('#jobs');
    if (heroSearch) {
      observerRef.current?.observe(heroSearch);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");

    // Context-aware AI response
    setTimeout(() => {
      let response = "";
      let suggestions: string[] = [];

      // Generate context-aware responses
      if (text.toLowerCase().includes("job") || text.toLowerCase().includes("position")) {
        response = `I found several ${currentSection === 'employers' ? 'positions at top companies' : 'matching jobs'} for you. For personalized results and to track applications, create a free account.`;
        suggestions = ["View all matches", "Filter by salary", "Set up alerts"];
      } else if (text.toLowerCase().includes("event") || text.toLowerCase().includes("fair")) {
        response = "There are 3 career fairs near you this month. The MYFutureJobs Carnival KL is highly recommended with 120+ employers.";
        suggestions = ["Show all events", "RSVP for carnival", "Virtual events"];
      } else if (text.toLowerCase().includes("company") || text.toLowerCase().includes("employer")) {
        response = "I can provide insights on company culture, benefits, and current openings. Which company interests you?";
        suggestions = ["Top-rated companies", "Companies hiring now", "Startup opportunities"];
      } else if (text.toLowerCase().includes("cv") || text.toLowerCase().includes("resume")) {
        response = "Our AI-powered CV analyzer can improve your resume's impact. Upload your CV for instant feedback and suggestions.";
        suggestions = ["CV templates", "AI CV review", "Industry-specific tips"];
      } else if (text.toLowerCase().includes("training") || text.toLowerCase().includes("course")) {
        response = "We offer HRDC-claimable training programs in various fields. What skills would you like to develop?";
        suggestions = ["Tech courses", "Soft skills", "Certification programs"];
      } else {
        response = `Great question! Based on your interest in ${context.name.toLowerCase()}, I recommend exploring our ${context.tips[0].toLowerCase()}. Would you like more specific guidance?`;
        suggestions = context.suggestions;
      }

      setMsgs((m) => [
        ...m,
        {
          role: "ai",
          text: response,
          suggestions: suggestions
        },
      ]);
    }, 600);
  };

  return (
    <>
      {!open && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Context tip bubble */}
          {showTip && (
            <div className="absolute bottom-16 right-0 mb-2 w-64 animate-fade-in rounded-[10px] border border-border bg-card p-3 shadow-hero">
              <button
                onClick={() => setShowTip(false)}
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-card border border-border flex items-center justify-center hover:bg-inset"
              >
                <X className="h-3 w-3" />
              </button>
              <div className="flex items-start gap-2">
                {context.icon}
                <div>
                  <div className="text-[12px] font-600">{context.name} Help Available</div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {context.tips[0]}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floating button with pulse */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open Career Assistant"
            className="relative flex h-14 w-14 items-center justify-center rounded-full grad-orange text-white shadow-hero transition-transform hover:scale-105"
          >
            <MessageCircle className="h-6 w-6" />
            {/* Pulse indicator for context change */}
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emphasis animate-pulse" />
          </button>
        </div>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[14px] border border-border bg-card shadow-hero">
          {/* Header with current context */}
          <div className="flex items-center justify-between border-b border-border bg-emphasis-soft px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-[8px] grad-orange text-white">
                {context.icon}
              </span>
              <div>
                <div className="text-sm font-600">{context.name} Assistant</div>
                <div className="text-[11px] text-muted-foreground">AI · Context-aware · Personalized</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-md p-1 hover:bg-inset">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Current section indicator */}
          <div className="border-b border-border bg-inset px-4 py-2">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <MapPin className="h-3 w-3" />
              Currently viewing: <span className="font-600 text-foreground">{context.name}</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin p-4">
            {msgs.map((m, i) => (
              <div key={i}>
                <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-[10px] px-3 py-2 text-[13px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-inset text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
                {/* Suggestions after AI messages */}
                {m.role === "ai" && m.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-2">
                    {m.suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border border-border bg-card px-3 py-1.5 text-[11px] text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick tips for current section */}
          <div className="border-t border-border bg-inset px-4 py-2">
            <div className="text-[10px] font-600 text-muted-foreground mb-1">QUICK TIPS</div>
            <div className="flex gap-2 overflow-x-auto">
              {context.tips.slice(0, 2).map((tip, i) => (
                <div key={i} className="text-[11px] text-muted-foreground whitespace-nowrap">
                  • {tip}
                </div>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="border-t border-border p-3">
            <Link
              to="/signin"
              className="mb-2 flex items-center justify-center rounded-[10px] grad-orange px-3 py-2 text-[12px] font-600 text-white"
            >
              Create an account for full features →
            </Link>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 rounded-[10px] border border-border bg-card px-2 py-1.5"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask about ${context.name.toLowerCase()}...`}
                className="flex-1 bg-transparent px-1 py-1 text-[13px] outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary text-primary-foreground"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}