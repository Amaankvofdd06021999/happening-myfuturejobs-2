import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { employerNav } from "@/lib/nav";
import { employerUser } from "@/lib/mock";
import { Badge, SectionTitle } from "@/components/ui-bits";
import { Plus, Sparkles, Edit2, Copy, Archive, MoreVertical, Filter, ArrowUpDown, Pause, Play, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VacancyCreateModal } from "@/components/VacancyCreateModal";

export const Route = createFileRoute("/employer/vacancies")({
  head: () => ({ meta: [{ title: "Vacancies — MYFutureJobs" }] }),
  component: Page,
});

interface Vacancy {
  id: string;
  t: string;
  l: string;
  s: "Active" | "Draft" | "Paused";
  a: number;
  b: number;
  d: string;
}

const initialRows: Vacancy[] = [
  { id: "v1", t: "Software Engineer (Backend)", l: "KL · Hybrid", s: "Active", a: 86, b: 82, d: "2d" },
  { id: "v2", t: "Sales Manager — KL", l: "KL · On-site", s: "Active", a: 42, b: 64, d: "5d" },
  { id: "v3", t: "Data Analyst", l: "Cyberjaya · Hybrid", s: "Active", a: 33, b: 79, d: "1w" },
  { id: "v4", t: "Brand Specialist", l: "KL · Hybrid", s: "Draft", a: 0, b: 71, d: "—" },
  { id: "v5", t: "Operations Lead", l: "Penang · On-site", s: "Paused", a: 18, b: 76, d: "3w" },
];

function Page() {
  const [vacancies, setVacancies] = useState<Vacancy[]>(initialRows);
  const [sortBy, setSortBy] = useState<"applicants" | "score" | "date">("applicants");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "generate" | "analyze">("create");

  const handleEdit = (vacancy: Vacancy) => {
    toast.info("Opening editor", {
      description: `Editing ${vacancy.t}`,
    });
    setActiveMenu(null);
  };

  const handleDuplicate = (vacancy: Vacancy) => {
    const newVacancy = {
      ...vacancy,
      id: `${vacancy.id}-copy-${Date.now()}`,
      t: `${vacancy.t} (Copy)`,
      s: "Draft" as const,
      a: 0,
      d: "Just now"
    };
    setVacancies(prev => [newVacancy, ...prev]);
    toast.success("Vacancy duplicated", {
      description: `Created copy of ${vacancy.t}`,
    });
    setActiveMenu(null);
  };

  const handleArchive = (id: string, title: string) => {
    setVacancies(prev => prev.filter(v => v.id !== id));
    toast.success("Vacancy archived", {
      description: title,
    });
    setActiveMenu(null);
  };

  const handleToggleStatus = (id: string, currentStatus: Vacancy['s']) => {
    const newStatus = currentStatus === "Active" ? "Paused" : "Active";
    setVacancies(prev => prev.map(v => v.id === id ? { ...v, s: newStatus } : v));
    toast.success(`Vacancy ${newStatus.toLowerCase()}`, {
      description: `Status changed to ${newStatus}`,
    });
    setActiveMenu(null);
  };

  const filteredVacancies = vacancies.filter(v =>
    statusFilter.length === 0 || statusFilter.includes(v.s)
  );

  const sortedVacancies = [...filteredVacancies].sort((a, b) => {
    if (sortBy === "applicants") return b.a - a.a;
    if (sortBy === "score") return b.b - a.b;
    return 0;
  });

  return (
    <AppShell nav={employerNav} user={employerUser}>
      <div className="mb-6">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-4">
          <div>
            <h1 className="text-[28px] font-700 tracking-tight">Vacancies</h1>
            <p className="mt-1 text-sm text-muted-foreground">{sortedVacancies.length} vacancies · Verified employer</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setModalMode("generate");
                setModalOpen(true);
              }}
              className="inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-border bg-card px-4 text-sm font-600 hover:border-primary transition-colors"
            >
              <Sparkles className="h-4 w-4"/> Generate by AI
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setModalMode("analyze");
                setModalOpen(true);
              }}
              className="inline-flex h-10 items-center gap-1.5 rounded-[10px] grad-orange px-4 text-sm font-600 text-white hover:opacity-90 transition-opacity"
            >
              <Sparkles className="h-4 w-4"/> Analyze JD
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setModalMode("create");
                setModalOpen(true);
              }}
              className="inline-flex h-10 items-center gap-1.5 rounded-[10px] bg-primary px-4 text-sm font-600 text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4"/> New vacancy
            </motion.button>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortBy("applicants")}
              className={`inline-flex items-center gap-2 h-9 px-4 rounded-[10px] text-[12px] font-600 transition-colors ${
                sortBy === "applicants" ? 'bg-primary text-primary-foreground' : 'border border-border bg-card hover:border-primary'
              }`}
            >
              <ArrowUpDown className="h-3 w-3" />
              Applicants
            </button>
            <button
              onClick={() => setSortBy("score")}
              className={`inline-flex items-center gap-2 h-9 px-4 rounded-[10px] text-[12px] font-600 transition-colors ${
                sortBy === "score" ? 'bg-primary text-primary-foreground' : 'border border-border bg-card hover:border-primary'
              }`}
            >
              <ArrowUpDown className="h-3 w-3" />
              JD Score
            </button>
          </div>

          <div className="flex items-center gap-2">
            {['Active', 'Draft', 'Paused'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(prev =>
                  prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
                )}
                className={`h-9 px-3 rounded-[10px] text-[12px] font-600 transition-colors ${
                  statusFilter.includes(status)
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-card hover:border-primary'
                }`}
              >
                {status}
              </button>
            ))}
            {statusFilter.length > 0 && (
              <button
                onClick={() => setStatusFilter([])}
                className="h-9 px-3 rounded-[10px] border border-border bg-card text-[12px] font-600 hover:border-error hover:text-error transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-border bg-card shadow-card">
        <table className="w-full text-[13px]">
          <thead className="bg-inset text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Applicants</th>
              <th className="px-4 py-3 text-right">JD score</th>
              <th className="px-4 py-3 text-left">Posted</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {sortedVacancies.map((r, index) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-border hover:bg-inset transition-colors group"
                >
                  <td className="px-4 py-3 font-600">{r.t}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.l}</td>
                  <td className="px-4 py-3"><Badge tone={r.s === "Active" ? "success" : r.s === "Draft" ? "default" : "warning"}>{r.s}</Badge></td>
                  <td className="px-4 py-3 text-right num">{r.a}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`num inline-flex items-center gap-1 font-600 ${r.b < 70 ? "text-emphasis" : "text-primary"}`}>
                      <Sparkles className="h-3 w-3"/> {r.b}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.d}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to="/employer/jd-analysis"
                        className="text-[12px] font-600 text-primary hover:underline"
                      >
                        Open →
                      </Link>
                      <div className="relative">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenu(activeMenu === r.id ? null : r.id);
                          }}
                          className="p-1.5 rounded-lg hover:bg-primary-soft transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </motion.button>

                        <AnimatePresence>
                          {activeMenu === r.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="absolute right-0 top-full mt-1 w-48 rounded-[10px] border border-border bg-card shadow-hero z-10"
                            >
                              <button
                                onClick={() => handleEdit(r)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-[13px] hover:bg-inset transition-colors"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                                Edit vacancy
                              </button>
                              <button
                                onClick={() => handleDuplicate(r)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-[13px] hover:bg-inset transition-colors"
                              >
                                <Copy className="h-3.5 w-3.5" />
                                Duplicate
                              </button>
                              <button
                                onClick={() => handleToggleStatus(r.id, r.s)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-[13px] hover:bg-inset transition-colors"
                              >
                                {r.s === "Active" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                                {r.s === "Active" ? "Pause" : "Activate"}
                              </button>
                              <div className="h-px bg-border my-1" />
                              <button
                                onClick={() => handleArchive(r.id, r.t)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-error hover:bg-error-soft transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Archive
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Vacancy Create/Generate/Analyze Modal */}
      <VacancyCreateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
      />
    </AppShell>
  );
}
