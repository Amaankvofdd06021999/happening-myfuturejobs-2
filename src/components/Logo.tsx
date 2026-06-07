import { Link } from "@tanstack/react-router";
import { useTheme } from "../lib/theme";

export function Logo({ className = "" }: { className?: string }) {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/assets/logo-white.png" : "/assets/logo.png";

  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`} aria-label="MYFutureJobs">
      <img
        src={logoSrc}
        alt="MYFutureJobs Logo"
        className="h-8 w-auto object-contain"
      />
    </Link>
  );
}
