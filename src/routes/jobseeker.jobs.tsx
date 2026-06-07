import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { jobseekerNav } from "@/lib/nav";
import { jobseekerUser, jobs } from "@/lib/mock";
import { Badge } from "@/components/ui-bits";
import { Search, MapPin, Sliders, Sparkles, Bookmark, ArrowUpDown, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/jobseeker/jobs")({
  head: () => ({ meta: [{ title: "Find jobs — MYFutureJobs" }] }),
  component: Page,
});

function Page() {
  const [searchKeyword, setSearchKeyword] = useState("Marketing");
  const [searchLocation, setSearchLocation] = useState("Kuala Lumpur");
  const [salaryFilter, setSalaryFilter] = useState("Any salary");
  const [jobTypeFilters, setJobTypeFilters] = useState<string[]>([]);
  const [experienceFilters, setExperienceFilters] = useState<string[]>([]);
  const [industryFilters, setIndustryFilters] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"match" | "date">("match");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const allJobs = [...jobs, ...jobs.map((j) => ({ ...j, id: j.id + "x", match: j.match - 7 }))];

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let filtered = allJobs.filter(job => {
      // Search filters
      const matchesKeyword = job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchesLocation = job.loc.toLowerCase().includes(searchLocation.toLowerCase());

      // Apply filters
      const matchesJobType = jobTypeFilters.length === 0 || jobTypeFilters.includes(job.type);

      return matchesKeyword && matchesLocation && matchesJobType;
    });

    // Sort
    if (sortBy === "match") {
      filtered.sort((a, b) => b.match - a.match);
    } else {
      filtered.sort((a, b) => a.posted.localeCompare(b.posted));
    }

    return filtered;
  }, [searchKeyword, searchLocation, jobTypeFilters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
    toast.success("Search updated", {
      description: `Found ${filteredJobs.length} jobs matching your criteria`,
    });
  };

  const toggleSaveJob = (jobId: string, jobTitle: string) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
      toast.info("Job unsaved", { description: jobTitle });
    } else {
      newSaved.add(jobId);
      toast.success("Job saved", { description: jobTitle });
    }
    setSavedJobs(newSaved);
  };

  const handleApply = (jobTitle: string, company: string) => {
    toast.success("Application started", {
      description: `Applying to ${jobTitle} at ${company}`,
    });
  };

  const toggleFilter = (filterSet: string[], setFilter: (v: string[]) => void, value: string) => {
    const newFilters = filterSet.includes(value)
      ? filterSet.filter(f => f !== value)
      : [...filterSet, value];
    setFilter(newFilters);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setJobTypeFilters([]);
    setExperienceFilters([]);
    setIndustryFilters([]);
    setSalaryFilter("Any salary");
    setCurrentPage(1);
    toast.info("Filters reset", { description: "All filters have been cleared" });
  };

  return (
    <AppShell nav={jobseekerNav} user={jobseekerUser}>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-[28px] font-700 tracking-tight">Find jobs</h1>
          <p className="mt-1 text-sm text-muted-foreground">{filteredJobs.length} matches · sorted by {sortBy === "match" ? "AI fit" : "date posted"}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortBy(sortBy === "match" ? "date" : "match")}
            className="inline-flex items-center gap-2 h-9 px-4 rounded-[10px] border border-border bg-card text-[12px] font-600 hover:border-primary transition-colors"
          >
            <ArrowUpDown className="h-3 w-3" />
            Sort by {sortBy === "match" ? "date" : "match"}
          </button>
        </div>
      </div>

      <div className="rounded-[12px] border border-border bg-card p-3 shadow-card">
        <div className="grid gap-2 md:grid-cols-[1.5fr_1fr_1fr_auto]">
          <label className="flex items-center gap-2 rounded-[10px] bg-inset px-3">
            <Search className="h-4 w-4 text-muted-foreground"/>
            <input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Job title or company"
              className="h-11 w-full bg-transparent text-sm outline-none"
            />
          </label>
          <label className="flex items-center gap-2 rounded-[10px] bg-inset px-3">
            <MapPin className="h-4 w-4 text-muted-foreground"/>
            <input
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Location"
              className="h-11 w-full bg-transparent text-sm outline-none"
            />
          </label>
          <select
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(e.target.value)}
            className="h-11 rounded-[10px] bg-inset px-3 text-sm outline-none"
          >
            <option>Any salary</option><option>RM 4k+</option><option>RM 6k+</option><option>RM 8k+</option>
          </select>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="h-11 rounded-[10px] bg-primary px-5 text-sm font-600 text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Search
          </motion.button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-5 rounded-[12px] border border-border bg-card p-5 shadow-card lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center justify-between"><div className="text-[14px] font-600">Filters</div><Sliders className="h-4 w-4 text-muted-foreground"/></div>

          <div>
            <div className="mb-2 text-[12px] font-600 uppercase tracking-wider text-muted-foreground">Job type</div>
            <div className="space-y-1.5">
              {["Full-time", "Part-time", "Contract", "Internship"].map((option) => (
                <label key={option} className="flex items-center gap-2 text-[13px] cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={jobTypeFilters.includes(option)}
                    onChange={() => toggleFilter(jobTypeFilters, setJobTypeFilters, option)}
                    className="h-4 w-4 rounded border-border accent-[var(--primary)] cursor-pointer"
                  />
                  <span className="group-hover:text-primary transition-colors">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-[12px] font-600 uppercase tracking-wider text-muted-foreground">Experience</div>
            <div className="space-y-1.5">
              {["Entry", "Mid", "Senior", "Lead"].map((option) => (
                <label key={option} className="flex items-center gap-2 text-[13px] cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={experienceFilters.includes(option)}
                    onChange={() => toggleFilter(experienceFilters, setExperienceFilters, option)}
                    className="h-4 w-4 rounded border-border accent-[var(--primary)] cursor-pointer"
                  />
                  <span className="group-hover:text-primary transition-colors">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-[12px] font-600 uppercase tracking-wider text-muted-foreground">Industry</div>
            <div className="space-y-1.5">
              {["Tech", "Finance", "F&B", "Healthcare", "Govt"].map((option) => (
                <label key={option} className="flex items-center gap-2 text-[13px] cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={industryFilters.includes(option)}
                    onChange={() => toggleFilter(industryFilters, setIndustryFilters, option)}
                    className="h-4 w-4 rounded border-border accent-[var(--primary)] cursor-pointer"
                  />
                  <span className="group-hover:text-primary transition-colors">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={resetFilters}
            className="w-full rounded-[10px] border border-border py-2 text-[12px] font-600 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            Reset filters
          </motion.button>
        </aside>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {paginatedJobs.map((j, index) => (
              <motion.article
                key={j.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[12px] border border-border bg-card p-5 shadow-card transition-all hover:shadow-hero hover:border-primary"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-inset text-xl">{j.logo}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-[16px] font-600">{j.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge tone="ai"><Sparkles className="h-3 w-3"/> {j.match}% match</Badge>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleSaveJob(j.id, j.title)}
                          aria-label={savedJobs.has(j.id) ? "Unsave job" : "Save job"}
                          className="transition-colors"
                        >
                          {savedJobs.has(j.id) ? (
                            <BookmarkCheck className="h-4 w-4 text-primary fill-primary" />
                          ) : (
                            <Bookmark className="h-4 w-4 text-muted-foreground hover:text-primary" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                    <div className="text-[13px] text-muted-foreground">{j.company} · {j.loc}</div>
                    <div className="mt-3 flex flex-wrap gap-2 text-[12px]">
                      <Badge tone="default">{j.type}</Badge>
                      <Badge tone="default">{j.pay}</Badge>
                      <Badge tone="default">Posted {j.posted} ago</Badge>
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                      Looking for a marketing professional who can lead end-to-end campaign delivery across digital channels. Strong analytical mindset and storytelling skills required.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        onClick={() => toast.info("Match explanation", {
                          description: `This role matches your marketing background and ${j.match}% of your skills`
                        })}
                        className="text-[12px] font-600 text-primary hover:underline"
                      >
                        Why this match? →
                      </button>
                      <div className="flex gap-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toast.info("Opening job details", { description: j.title })}
                          className="inline-flex h-9 items-center rounded-[8px] border border-border bg-card px-3 text-[12px] font-600 hover:border-primary transition-colors"
                        >
                          View
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleApply(j.title, j.company)}
                          className="inline-flex h-9 items-center rounded-[8px] bg-primary px-3 text-[12px] font-600 text-primary-foreground hover:opacity-90 transition-opacity"
                        >
                          Quick apply
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex h-9 items-center rounded-[8px] border border-border bg-card px-4 text-[12px] font-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition-colors"
              >
                Previous
              </motion.button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <motion.button
                    key={page}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(page)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-[8px] text-[12px] font-600 transition-colors ${
                      page === currentPage
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border bg-card hover:border-primary'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex h-9 items-center rounded-[8px] border border-border bg-card px-4 text-[12px] font-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition-colors"
              >
                Next
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
