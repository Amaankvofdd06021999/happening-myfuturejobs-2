import { useState } from "react";
import { Eye, EyeOff, Type, Palette, ZoomIn, ZoomOut, Settings2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleFontSizeChange = (delta: number) => {
    const newSize = Math.max(80, Math.min(150, fontSize + delta));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("high-contrast");
  };

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
    document.documentElement.classList.toggle("reduced-motion");
  };

  const resetSettings = () => {
    setFontSize(100);
    setHighContrast(false);
    setReducedMotion(false);
    document.documentElement.style.fontSize = "100%";
    document.documentElement.classList.remove("high-contrast", "reduced-motion");
  };

  return (
    <>
      {/* Floating Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Accessibility settings"
      >
        <Settings2 className="h-5 w-5" />
      </button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 z-50 w-80 rounded-[14px] border border-border bg-card shadow-hero"
          >
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[16px] font-600">Accessibility Settings</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-[8px] p-1 hover:bg-inset transition-colors"
                  aria-label="Close accessibility settings"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Font Size Control */}
              <div className="mb-4 space-y-2">
                <label className="text-[13px] font-500 text-muted-foreground">Text Size</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleFontSizeChange(-10)}
                    className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-border hover:bg-inset transition-colors"
                    aria-label="Decrease text size"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <div className="flex-1 text-center text-[13px] font-600">{fontSize}%</div>
                  <button
                    onClick={() => handleFontSizeChange(10)}
                    className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-border hover:bg-inset transition-colors"
                    aria-label="Increase text size"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div className="mb-4">
                <button
                  onClick={toggleHighContrast}
                  className={`flex w-full items-center justify-between rounded-[10px] border p-3 transition-colors ${
                    highContrast
                      ? "border-primary bg-primary-soft"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Palette className="h-4 w-4" />
                    <span className="text-[13px] font-500">High Contrast</span>
                  </div>
                  <div className={`text-[11px] font-600 ${highContrast ? "text-primary" : "text-muted-foreground"}`}>
                    {highContrast ? "ON" : "OFF"}
                  </div>
                </button>
              </div>

              {/* Reduced Motion Toggle */}
              <div className="mb-4">
                <button
                  onClick={toggleReducedMotion}
                  className={`flex w-full items-center justify-between rounded-[10px] border p-3 transition-colors ${
                    reducedMotion
                      ? "border-primary bg-primary-soft"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {reducedMotion ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="text-[13px] font-500">Reduced Motion</span>
                  </div>
                  <div className={`text-[11px] font-600 ${reducedMotion ? "text-primary" : "text-muted-foreground"}`}>
                    {reducedMotion ? "ON" : "OFF"}
                  </div>
                </button>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetSettings}
                className="w-full rounded-[10px] border border-border bg-inset p-2 text-[13px] font-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Reset to Default
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}