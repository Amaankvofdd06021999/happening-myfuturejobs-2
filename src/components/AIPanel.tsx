import { useState, type ReactNode } from "react";
import { Sparkles, ChevronDown, X } from "lucide-react";

export function AIPanel({
  title = "Career Assistant",
  subtitle = "AI · Explanations included",
  children,
  why,
  onClose,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  why?: ReactNode;
  onClose?: () => void;
}) {
  const [showWhy, setShowWhy] = useState(false);
  return (
    <aside className="flex h-full w-full flex-col overflow-hidden border-l border-border bg-card lg:w-[400px]">
      <div className="flex items-center justify-between border-b border-border bg-emphasis-soft px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-[8px] grad-orange text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-600">{title}</div>
            <div className="text-[11px] text-muted-foreground">{subtitle}</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} aria-label="Close panel" className="rounded p-1 hover:bg-card">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        {children}
        {why && (
          <div className="mt-4 overflow-hidden rounded-[10px] border border-border">
            <button
              onClick={() => setShowWhy((v) => !v)}
              className="flex w-full items-center justify-between bg-inset px-3 py-2 text-left text-[12px] font-600"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emphasis" /> Why this result?
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showWhy ? "rotate-180" : ""}`} />
            </button>
            {showWhy && <div className="space-y-2 p-3 text-[12px] leading-relaxed text-muted-foreground">{why}</div>}
          </div>
        )}
      </div>
    </aside>
  );
}
