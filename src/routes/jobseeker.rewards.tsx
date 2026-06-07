import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { jobseekerNav } from "@/lib/nav";
import { jobseekerUser } from "@/lib/mock";
import { KPITile, Badge, SectionTitle } from "@/components/ui-bits";
import { Trophy, Ticket, Gift, Star } from "lucide-react";

export const Route = createFileRoute("/jobseeker/rewards")({
  head: () => ({ meta: [{ title: "Rewards — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell nav={jobseekerNav} user={jobseekerUser}>
      <div className="mb-6">
        <h1 className="text-[28px] font-700 tracking-tight">Rewards</h1>
        <p className="mt-1 text-sm text-muted-foreground">Earn for showing up, learning, and growing.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPITile label="Points balance" value="3,450" delta="+200 this week" emphasis gradient icon={<Star className="h-4 w-4"/>} />
        <KPITile label="Vouchers" value="4" delta="2 expiring soon" icon={<Ticket className="h-4 w-4"/>} />
        <KPITile label="Badges earned" value="9" delta="3 new" icon={<Trophy className="h-4 w-4"/>} />
        <KPITile label="Cash equivalents" value="RM 95" delta="Available to redeem" icon={<Gift className="h-4 w-4"/>} />
      </div>

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
    </AppShell>
  );
}
