import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { type ReactNode, useState, useRef, useEffect } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { FloatingChatbot } from "./FloatingChatbot";
import { Bell, Search, User, Settings, HelpCircle, LogOut, ChevronUp, Menu, X } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
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
      {/* Desktop Sidebar */}
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

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur lg:px-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border bg-card hover:bg-inset"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <div className="lg:hidden"><Logo /></div>

          {/* Search bar - hidden on mobile, visible on tablet and up */}
          <div className="relative ml-auto hidden flex-1 max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search jobs, candidates, reports…"
              className="w-full rounded-[10px] border border-border bg-inset py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:bg-card"
            />
          </div>

          {/* Notifications and Theme Toggle - visible on all sizes */}
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button aria-label="Notifications" className="relative inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border bg-card hover:bg-inset">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emphasis" />
            </button>
            <ThemeToggle />
          </div>
        </header>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="fixed inset-0 top-[57px] z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="absolute left-0 top-0 h-full w-[280px] bg-card shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* User Profile Section */}
              <div className="border-b border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary-soft text-primary font-600">
                    {user.avatar ? <img src={user.avatar} alt="" className="h-full w-full object-cover" /> : user.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-600">{user.name}</div>
                    <div className="truncate text-[11px] text-muted-foreground">{user.role}</div>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 space-y-1 p-3">
                {nav.map((n) => {
                  const active = location.pathname === n.to || location.pathname.startsWith(n.to + "/");
                  return (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setIsMobileMenuOpen(false)}
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

              {/* Mobile Menu Actions */}
              <div className="border-t border-border p-3">
                <Link
                  to={user.role === 'jobseeker' ? '/jobseeker/profile' : user.role === 'employer' ? '/employer/company' : '/officer'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-inset transition-colors rounded-[10px]"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>View Profile</span>
                </Link>
                <Link
                  to={user.role === 'jobseeker' ? '/jobseeker' : user.role === 'employer' ? '/employer' : '/officer'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-inset transition-colors rounded-[10px]"
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span>Settings</span>
                </Link>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-inset transition-colors rounded-[10px]"
                >
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <span>Help & Support</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors rounded-[10px]"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex min-h-0 flex-1">
          <main className="min-w-0 flex-1 overflow-x-hidden p-4 lg:p-8">{children}</main>
          {rightPanel && <div className="hidden xl:block">{rightPanel}</div>}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-5 gap-1 px-2 py-1">
          {nav.slice(0, 5).map((n) => {
            const active = location.pathname === n.to || location.pathname.startsWith(n.to + "/");
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-[8px] transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`h-5 w-5 ${active ? "text-primary" : ""}`}>{n.icon}</span>
                <span className="mt-1 text-[10px] font-500">{n.label.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating AI Chatbot - adjusted for mobile */}
      <FloatingChatbot />
    </div>
  );
}
