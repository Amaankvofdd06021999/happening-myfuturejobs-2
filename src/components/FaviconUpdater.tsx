import { useEffect } from "react";
import { useTheme } from "../lib/theme";

export function FaviconUpdater() {
  const { theme } = useTheme();

  useEffect(() => {
    // Update theme-color meta tag for mobile browsers
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      themeColorMeta = document.createElement("meta");
      themeColorMeta.setAttribute("name", "theme-color");
      document.head.appendChild(themeColorMeta);
    }

    // Set theme color based on current theme
    const themeColor = theme === "dark" ? "#0a0a0b" : "#ffffff";
    themeColorMeta.setAttribute("content", themeColor);

    // If you have separate favicons for light/dark mode, you can update them here
    // For now, we're using the same favicon for both themes
    // But this component is ready for future enhancements

  }, [theme]);

  return null;
}