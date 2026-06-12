import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShieldCheck, Briefcase, Building2, ArrowRight, KeyRound } from "lucide-react";
import teamHero from "@/assets/team-hero.jpg";

export const Route = createFileRoute("/signin")({
  head: () => ({ meta: [{ title: "Sign in — MYFutureJobs" }] }),
  component: SignIn,
});

type Role = "jobseeker" | "employer" | "officer";

function SignIn() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("jobseeker");

  const roles: { id: Role; label: string; icon: React.ReactNode; desc: string; to: string }[] = [
    { id: "jobseeker", label: "Jobseeker", icon: <Briefcase className="h-4 w-4" />, desc: "Find jobs, build your profile, use Career Assistant.", to: "/jobseeker" },
    { id: "employer", label: "Employer", icon: <Building2 className="h-4 w-4" />, desc: "Post vacancies, screen candidates with Hiring Assistant.", to: "/employer" },
    { id: "officer", label: "Case Officer", icon: <ShieldCheck className="h-4 w-4" />, desc: "PERKESO staff — LDAP/SSO, RBAC, Research Hub.", to: "/officer" },
  ];
  const current = roles.find((r) => r.id === role)!;

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col bg-background">
        <div className="flex items-center justify-between border-b border-border px-6 py-4 lg:px-10">
          <Logo />
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-10 lg:px-10">
          <div className="w-full max-w-[420px]">
            <div className="mb-1 text-[12px] font-600 uppercase tracking-wider text-emphasis">Sign in</div>
            <h1 className="text-[32px] font-700 leading-tight tracking-tight">Welcome back to MYFutureJobs</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose how you're signing in. {role === "officer" && "Internal staff use LDAP."}
            </p>

            {/* role tabs */}
            <div className="mt-6 grid grid-cols-3 gap-1.5 rounded-[10px] border border-border bg-inset p-1">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex items-center justify-center gap-1.5 rounded-[8px] px-2 py-2 text-[12px] font-600 transition-colors ${
                    role === r.id ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r.icon}
                  <span className="hidden sm:inline">{r.label}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[12px] text-muted-foreground">{current.desc}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: current.to });
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="mb-1.5 block text-[12px] font-600 text-muted-foreground">
                  {role === "officer" ? "Staff ID" : role === "jobseeker" ? "IC Number" : "Email"}
                </label>
                <input
                  placeholder={role === "jobseeker" ? "e.g., 901215-14-5678" : role === "employer" ? "john.doe@company.com" : "PKS-2041"}
                  defaultValue={role === "jobseeker" ? "" : role === "employer" ? "mike.smith@petronas.com.my" : "PKS-2041"}
                  className="h-11 w-full rounded-[10px] border border-border bg-card px-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-600 text-muted-foreground">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="h-11 w-full rounded-[10px] border border-border bg-card px-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <button type="submit" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-primary text-sm font-600 text-primary-foreground">
                Sign in as {current.label} <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or continue with <span className="h-px flex-1 bg-border" />
              </div>

              <div className={`grid gap-2 ${role === "jobseeker" ? "grid-cols-1" : "grid-cols-2"}`}>
                <button type="button" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-border bg-card text-sm font-600 hover:bg-inset">
                  <KeyRound className="h-4 w-4" /> MyDigital ID
                </button>
                {role !== "jobseeker" && (
                  <button type="button" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-border bg-card text-sm font-600 hover:bg-inset">
                    <ShieldCheck className="h-4 w-4" /> PERKESO SSO
                  </button>
                )}
              </div>

              <p className="text-center text-[12px] text-muted-foreground">
                New to MYFutureJobs?{" "}
                <Link to="/signin" className="font-600 text-primary">Create a free account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* right brand panel */}
      <div className="relative hidden overflow-hidden bg-surface lg:block">
        <img src={teamHero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 grad-blue opacity-25" />
        <div className="relative flex h-full flex-col justify-end p-12">
          <div className="rounded-[14px] bg-white/95 p-6 backdrop-blur shadow-hero">
            <div className="text-[12px] font-600 uppercase tracking-wider text-emphasis">Featured story</div>
            <blockquote className="mt-2 text-[18px] font-600 leading-snug text-foreground">
              "AI-powered matching told me which skills mattered most. Five callbacks in two weeks."
            </blockquote>
            <div className="mt-3 text-[13px] text-muted-foreground">Mike Johnson · Marketing Exec, Kuala Lumpur</div>
          </div>
        </div>
      </div>
    </div>
  );
}
