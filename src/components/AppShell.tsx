import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { type ReactNode, useState, useRef, useEffect } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { FloatingChatbot } from "./FloatingChatbot";
import { Bell, Search, User, Settings, HelpCircle, LogOut, ChevronUp } from "lucide-react";

export type NavItem = { to: string; label: string; icon: ReactNode };

export function AppShell({
  nav,
  user,
  children,
  rightPanel,
}: {
  nav: NavItem[];
  user: { name: string; role: string; avatar?: string };
  children: ReactNode;
  rightPanel?: ReactNode;
}) {
  const { location } = useRouterState();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem("auth");
    sessionStorage.clear();
    // Navigate to signin page
    navigate({ to: "/signin" });
  };

  return (
    <div className="flex min-h-dvh bg-surface">
      <aside className="sticky top-0 hidden h-dvh w-[240px] shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="border-b border-border px-5 py-4">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((n) => {
            const active = location.pathname === n.to || location.pathname.startsWith(n.to + "/");
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-primary-soft text-primary font-600"
                    : "text-muted-foreground hover:bg-inset hover:text-foreground"
                }`}
              >
                <span className={active ? "text-primary" : ""}>{n.icon}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="relative border-t border-border p-3" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex w-full items-center gap-3 rounded-[10px] p-2 hover:bg-inset transition-colors"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary-soft text-primary font-600">
              {user.avatar ? <img src={user.avatar} alt="" className="h-full w-full object-cover" /> : user.name[0]}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="truncate text-sm font-600">{user.name}</div>
              <div className="truncate text-[11px] text-muted-foreground">{user.role}</div>
            </div>
            <ChevronUp className={`h-4 w-4 text-muted-foreground transition-transform ${isDropdownOpen ? '' : 'rotate-180'}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-2 rounded-[12px] border border-border bg-card shadow-lg overflow-hidden">
              <Link
                to={user.role === 'jobseeker' ? '/jobseeker/profile' : user.role === 'employer' ? '/employer/company' : '/officer'}
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-inset transition-colors"
              >
                <User className="h-4 w-4 text-muted-foreground" />
                <span>View Profile</span>
              </Link>
              <Link
                to={user.role === 'jobseeker' ? '/jobseeker' : user.role === 'employer' ? '/employer' : '/officer'}
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-inset transition-colors"
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span>Settings</span>
              </Link>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setIsDropdownOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-inset transition-colors"
              >
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <span>Help & Support</span>
              </a>
              <div className="border-t border-border">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-danger hover:bg-danger/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur lg:px-8">
          <div className="lg:hidden"><Logo /></div>
          <div className="relative ml-auto hidden flex-1 max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search jobs, candidates, reports…"
              className="w-full rounded-[10px] border border-border bg-inset py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:bg-card"
            />
          </div>
          <button aria-label="Notifications" className="relative inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border bg-card hover:bg-inset">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emphasis" />
          </button>
          <ThemeToggle />
        </header>

        <div className="flex min-h-0 flex-1">
          <main className="min-w-0 flex-1 overflow-x-hidden p-4 lg:p-8">{children}</main>
          {rightPanel && <div className="hidden xl:block">{rightPanel}</div>}
        </div>
      </div>

      {/* Floating AI Chatbot */}
      <FloatingChatbot />
    </div>
  );
}
