import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { jobseekerNav } from "@/lib/nav";
import { jobseekerUser } from "@/lib/mock";
import { Badge, SectionTitle } from "@/components/ui-bits";
import { Award, GraduationCap, Sparkles, Plus } from "lucide-react";
import person1 from "@/assets/person-1.jpg";

export const Route = createFileRoute("/jobseeker/profile")({
  head: () => ({ meta: [{ title: "My Profile — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell nav={jobseekerNav} user={jobseekerUser}>
      <div className="overflow-hidden rounded-[14px] border border-border bg-card shadow-card">
        <div className="h-28 grad-blue" />
        <div className="-mt-12 px-6 pb-6">
          <img src={person1} alt="" className="h-24 w-24 rounded-full border-4 border-card object-cover shadow-card" />
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-[24px] font-700 tracking-tight">Nurul Aiman binti Hassan</h1>
              <p className="text-[14px] text-muted-foreground">Senior Marketing Executive · Kuala Lumpur</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge tone="primary">Verified by MyDigital ID</Badge>
                <Badge tone="ai"><Sparkles className="h-3 w-3"/> Career Signal 74</Badge>
                <Badge tone="emphasis">Open to opportunities</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex h-10 items-center rounded-[10px] border border-border px-4 text-sm font-600">Preview public profile</button>
              <button className="inline-flex h-10 items-center rounded-[10px] bg-primary px-4 text-sm font-600 text-primary-foreground">Edit</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <section className="rounded-[12px] border border-border bg-card p-5 shadow-card">
            <SectionTitle title="Experience" action={<button className="text-[12px] font-600 text-primary inline-flex items-center gap-1"><Plus className="h-3.5 w-3.5"/> Add</button>}/>
            <ul className="space-y-4">
              {[
                { r: "Senior Marketing Executive", c: "Astro Malaysia", d: "Jun 2023 — Present" },
                { r: "Marketing Executive", c: "Lazada MY", d: "Jan 2021 — May 2023" },
                { r: "Marketing Assistant", c: "Watsons", d: "Aug 2019 — Dec 2020" },
              ].map((e) => (
                <li key={e.r} className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <div className="text-[14px] font-600">{e.r}</div>
                    <div className="text-[13px] text-muted-foreground">{e.c} · {e.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[12px] border border-border bg-card p-5 shadow-card">
            <SectionTitle title="Skills"/>
            <div className="flex flex-wrap gap-2">
              {["SEO","Content","HubSpot","Looker","Brand strategy","BM/EN copy","A/B testing","Stakeholder mgmt"].map((s) => (
                <span key={s} className="rounded-full bg-inset px-3 py-1 text-[12px]">{s}</span>
              ))}
            </div>
          </section>

          <section className="rounded-[12px] border border-border bg-card p-5 shadow-card">
            <SectionTitle title="Certifications & Credentials" action={<Badge tone="ai"><Sparkles className="h-3 w-3"/> 4 suggested</Badge>}/>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { t: "Google Analytics 4", i: "✓" },
                { t: "Meta Blueprint", i: "✓" },
                { t: "HRDC Digital Marketing", i: "✓" },
                { t: "SQL for Marketers (suggested)", i: "+" },
              ].map((c) => (
                <li key={c.t} className={`flex items-center justify-between rounded-[10px] border p-3 ${c.i === "+" ? "border-dashed border-emphasis bg-emphasis-soft" : "border-border"}`}>
                  <span className="flex items-center gap-2 text-[13px]"><Award className="h-4 w-4 text-primary"/> {c.t}</span>
                  <span className={`font-600 ${c.i === "+" ? "text-emphasis" : "text-[var(--success)]"}`}>{c.i}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[12px] border border-border bg-card p-5 shadow-card">
            <SectionTitle title="What your assistant knows"/>
            <ul className="space-y-2 text-[13px]">
              <li className="flex justify-between"><span>Profile fields read</span><span className="num font-600">42</span></li>
              <li className="flex justify-between"><span>Jobs analysed</span><span className="num font-600">4,210</span></li>
              <li className="flex justify-between"><span>Peer profiles compared</span><span className="num font-600">312</span></li>
              <li className="flex justify-between"><span>Data location</span><span className="font-600">PERKESO on-prem</span></li>
            </ul>
            <p className="mt-3 text-[11px] text-muted-foreground">All payloads anonymised before AI processing.</p>
          </div>
          <div className="rounded-[12px] border border-border bg-card p-5 shadow-card">
            <SectionTitle title="AI training recommendations"/>
            <ul className="space-y-3">
              {[
                { t: "SQL for Marketers", d: "+24 matched roles" },
                { t: "Digital Analytics Foundations", d: "+18 matched roles" },
              ].map((t) => (
                <li key={t.t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary-soft text-primary"><GraduationCap className="h-4 w-4"/></span>
                  <div>
                    <div className="text-[13px] font-600">{t.t}</div>
                    <div className="text-[11px] text-emphasis font-600">{t.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
