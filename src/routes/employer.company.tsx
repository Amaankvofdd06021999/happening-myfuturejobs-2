import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { employerNav } from "@/lib/nav";
import { employerUser } from "@/lib/mock";
import { Badge, SectionTitle, KPITile } from "@/components/ui-bits";
import { Building2, ShieldCheck, MapPin, Globe } from "lucide-react";

export const Route = createFileRoute("/employer/company")({
  head: () => ({ meta: [{ title: "Company profile — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell nav={employerNav} user={employerUser}>
      <div className="overflow-hidden rounded-[14px] border border-border bg-card shadow-card">
        <div className="h-28 grad-blue"/>
        <div className="-mt-10 flex flex-wrap items-end gap-4 px-6 pb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-[14px] border-4 border-card bg-emphasis-soft text-2xl font-700 text-emphasis shadow-card">PD</div>
          <div className="flex-1">
            <h1 className="text-[24px] font-700 tracking-tight">Petronas Digital Sdn Bhd</h1>
            <div className="mt-1 flex flex-wrap gap-2 text-[13px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5"/> KL Sentral</span>
              <span className="inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5"/> 1,200 staff</span>
              <span className="inline-flex items-center gap-1"><Globe className="h-3.5 w-3.5"/> petronas.com.my</span>
            </div>
            <div className="mt-2 flex gap-2">
              <Badge tone="success"><ShieldCheck className="h-3 w-3"/> Verified employer</Badge>
              <Badge tone="primary">SSM registered</Badge>
              <Badge tone="ai">Tier 1 partner</Badge>
            </div>
          </div>
          <button className="inline-flex h-10 items-center rounded-[10px] bg-primary px-4 text-sm font-600 text-primary-foreground">Edit profile</button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPITile label="Followers" value="14.2k" delta="+312 last 7d" />
        <KPITile label="Profile views" value="8,920" delta="+18% MoM" />
        <KPITile label="Reviews" value="4.6" delta="248 reviews" emphasis />
        <KPITile label="Avg. time to hire" value="11 days" delta="Below industry avg" />
      </div>

      <div className="mt-6 rounded-[12px] border border-border bg-card p-6 shadow-card">
        <SectionTitle title="About"/>
        <p className="text-[14px] leading-relaxed text-muted-foreground">Petronas Digital is the technology backbone of PETRONAS, building cloud, data and AI products that power the next decade of Malaysian energy. We are an equal-opportunity employer committed to a diverse, inclusive workplace.</p>
      </div>
    </AppShell>
  );
}
