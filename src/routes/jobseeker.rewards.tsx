import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { jobseekerNav } from "@/lib/nav";
import { jobseekerUser } from "@/lib/mock";
import { KPITile, Badge, SectionTitle } from "@/components/ui-bits";
import {
  Trophy, Ticket, Gift, Star, Brain, Zap, Target,
  TrendingUp, Flame, Award, Play, Lock, CheckCircle2,
  Gamepad2, Puzzle, Calculator, BookOpen, Timer,
  ChevronRight, Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/jobseeker/rewards")({
  head: () => ({ meta: [{ title: "Rewards & Brain Games — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [profileLevel, setProfileLevel] = useState(12);
  const [gamesPlayed, setGamesPlayed] = useState(42);

  const handlePlayGame = (gameName: string) => {
    toast.success(`Starting ${gameName}`, {
      description: "Good luck! Complete to maintain your streak!"
    });
    setGamesPlayed(prev => prev + 1);
  };

  const brainGames = [
    {
      name: "Career Match Memory",
      icon: <Brain className="h-5 w-5" />,
      description: "Match job skills to roles",
      difficulty: "Easy",
      points: 50,
      unlocked: true,
      playTime: "2 min",
      lastPlayed: "Today"
    },
    {
      name: "Salary Negotiation Simulator",
      icon: <Calculator className="h-5 w-5" />,
      description: "Practice negotiation tactics",
      difficulty: "Medium",
      points: 100,
      unlocked: true,
      playTime: "5 min",
      lastPlayed: "Yesterday"
    },
    {
      name: "Interview Puzzle Challenge",
      icon: <Puzzle className="h-5 w-5" />,
      description: "Solve logic problems",
      difficulty: "Hard",
      points: 150,
      unlocked: true,
      playTime: "8 min",
      lastPlayed: "2 days ago"
    },
    {
      name: "Resume Builder Race",
      icon: <Timer className="h-5 w-5" />,
      description: "Build perfect resumes fast",
      difficulty: "Medium",
      points: 75,
      unlocked: profileLevel >= 10,
      playTime: "3 min",
      lastPlayed: "Never"
    },
    {
      name: "Industry Knowledge Quiz",
      icon: <BookOpen className="h-5 w-5" />,
      description: "Test your industry IQ",
      difficulty: "Easy",
      points: 60,
      unlocked: profileLevel >= 5,
      playTime: "4 min",
      lastPlayed: "1 week ago"
    },
    {
      name: "Networking Strategy Game",
      icon: <Target className="h-5 w-5" />,
      description: "Build your professional network",
      difficulty: "Hard",
      points: 200,
      unlocked: profileLevel >= 15,
      playTime: "10 min",
      lastPlayed: "Never"
    }
  ];

  return (
    <AppShell nav={jobseekerNav} user={jobseekerUser}>
      <div className="mb-6">
        <h1 className="text-[28px] font-700 tracking-tight">Rewards & Gamification</h1>
        <p className="mt-1 text-sm text-muted-foreground">Earn points, maintain streaks, and level up your career profile.</p>
      </div>

      {/* Enhanced Stats with Streaks */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KPITile label="Points balance" value="3,450" delta="+200 this week" emphasis gradient icon={<Star className="h-4 w-4"/>} />
        <KPITile
          label="Current Streak"
          value={`${currentStreak} days`}
          delta="Keep it going!"
          icon={<Flame className="h-4 w-4 text-orange-500"/>}
          className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20"
        />
        <KPITile label="Profile Level" value={`Lvl ${profileLevel}`} delta="88% to next" icon={<TrendingUp className="h-4 w-4"/>} />
        <KPITile label="Games Played" value={gamesPlayed} delta="Top 10%" icon={<Gamepad2 className="h-4 w-4"/>} />
        <KPITile label="Brain Score" value="842" delta="High performer" icon={<Brain className="h-4 w-4"/>} />
      </div>

      {/* Streak Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-[12px] border border-border bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 p-5 shadow-card"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <h3 className="text-[16px] font-600">Daily Streak Challenge</h3>
          </div>
          <Badge tone="emphasis">
            <Sparkles className="h-3 w-3"/> 2x Points Today!
          </Badge>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`h-12 rounded-[8px] flex items-center justify-center text-[11px] font-600 ${
                i < currentStreak
                  ? "bg-gradient-to-br from-orange-400 to-orange-500 text-white"
                  : "bg-inset text-muted-foreground"
              }`}
            >
              {i < currentStreak ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <span>Day {i + 1}</span>
              )}
            </motion.div>
          ))}
        </div>
        <p className="mt-3 text-[12px] text-muted-foreground">
          Complete daily brain games to maintain your streak and earn bonus points!
        </p>
      </motion.div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { t: "Career Starter", d: "Completed onboarding", e: true },
          { t: "First Interview", d: "Attended first verified interview", e: true },
          { t: "Lifelong Learner", d: "Completed 3 trainings", e: true },
          { t: "Profile Pro", d: "100% profile completion", e: false },
          { t: "Networker", d: "Attended a Career Carnival", e: false },
          { t: "Skill Climber", d: "+10 Career Signal in 30 days", e: false },
        ].map((b) => (
          <div key={b.t} className={`rounded-[12px] border p-5 ${b.e ? "border-emphasis bg-emphasis-soft" : "border-border bg-card opacity-70"}`}>
            <div className="flex items-start justify-between">
              <span className={`flex h-10 w-10 items-center justify-center rounded-[10px] ${b.e ? "grad-orange text-white" : "bg-inset text-muted-foreground"}`}>
                <Trophy className="h-5 w-5"/>
              </span>
              <Badge tone={b.e ? "emphasis" : "default"}>{b.e ? "Earned" : "Locked"}</Badge>
            </div>
            <div className="mt-3 text-[15px] font-600">{b.t}</div>
            <p className="mt-1 text-[12px] text-muted-foreground">{b.d}</p>
          </div>
        ))}
      </div>

      {/* Brain Games Section */}
      <div className="mt-8">
        <SectionTitle
          title="Brain Games & Career Challenges"
          kicker="Level up your job profile"
          action={
            <Badge tone="ai">
              <Zap className="h-3 w-3"/> Your Brain Score: 842
            </Badge>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {brainGames.map((game, i) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-[12px] border ${
                game.unlocked
                  ? "border-border bg-card hover:shadow-hero hover:border-primary cursor-pointer"
                  : "border-border bg-card/50 opacity-60"
              } p-5 transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-[10px] ${
                  game.unlocked
                    ? "bg-gradient-to-br from-primary to-primary-dark text-white"
                    : "bg-inset text-muted-foreground"
                }`}>
                  {game.unlocked ? game.icon : <Lock className="h-5 w-5" />}
                </div>
                <div className="text-right">
                  <Badge tone={
                    game.difficulty === "Easy" ? "success" :
                    game.difficulty === "Medium" ? "warning" : "danger"
                  }>
                    {game.difficulty}
                  </Badge>
                  <div className="text-[11px] text-muted-foreground mt-1">{game.playTime}</div>
                </div>
              </div>

              <h3 className="text-[15px] font-600 mb-1">{game.name}</h3>
              <p className="text-[12px] text-muted-foreground mb-3">{game.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                  <span className="text-[12px] font-600">+{game.points} pts</span>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {game.lastPlayed}
                </span>
              </div>

              {game.unlocked ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlayGame(game.name)}
                  className="w-full h-9 rounded-[8px] bg-primary text-[12px] font-600 text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <Play className="h-3.5 w-3.5" />
                  Play Now
                </motion.button>
              ) : (
                <div className="w-full h-9 rounded-[8px] bg-inset text-[12px] font-600 text-muted-foreground flex items-center justify-center">
                  <Lock className="h-3.5 w-3.5 mr-1.5" />
                  Unlock at Level {game.unlocked === false ? 15 : 10}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Profile Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 rounded-[12px] border border-border bg-card p-5 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-600">Your Job Profile Progress</h3>
            <Badge tone="primary">Level {profileLevel}</Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-[10px] bg-inset p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-[13px] font-600">Skills Assessment</span>
              </div>
              <div className="text-[24px] font-700 text-primary">78%</div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Complete 2 more games to improve
              </p>
            </div>

            <div className="rounded-[10px] bg-inset p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-orange-500" />
                <span className="text-[13px] font-600">Career Readiness</span>
              </div>
              <div className="text-[24px] font-700 text-orange-500">85%</div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Above average for your field
              </p>
            </div>

            <div className="rounded-[10px] bg-inset p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-[13px] font-600">Growth Rate</span>
              </div>
              <div className="text-[24px] font-700 text-success">+12%</div>
              <p className="text-[11px] text-muted-foreground mt-1">
                This month vs last month
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-[10px] bg-gradient-to-r from-primary-soft to-primary-soft/50 border border-primary/20">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-[12px] font-600 text-primary">Pro Tip:</span>
              <span className="text-[12px]">
                Playing brain games daily increases your match rate by 23%
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}
