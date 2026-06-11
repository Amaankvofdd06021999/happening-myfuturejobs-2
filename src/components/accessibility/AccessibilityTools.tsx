import React, { useState, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Palette,
  Sun,
  Moon,
  Type,
  Link,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const AccessibilityTools = () => {
  const [fontSize, setFontSize] = useState(100);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isNegativeContrast, setIsNegativeContrast] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);
  const [isUnderlineLinks, setIsUnderlineLinks] = useState(false);
  const [isReadableFont, setIsReadableFont] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedPreferences = localStorage.getItem('accessibilityPreferences');
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setFontSize(prefs.fontSize || 100);
      setIsGrayscale(prefs.isGrayscale || false);
      setIsHighContrast(prefs.isHighContrast || false);
      setIsNegativeContrast(prefs.isNegativeContrast || false);
      setIsLightBackground(prefs.isLightBackground || false);
      setIsUnderlineLinks(prefs.isUnderlineLinks || false);
      setIsReadableFont(prefs.isReadableFont || false);
    }
  }, []);

  useEffect(() => {
    // Apply accessibility styles
    const root = document.documentElement;

    // Font size
    root.style.fontSize = `${fontSize}%`;

    // Grayscale
    if (isGrayscale) {
      root.style.filter = 'grayscale(100%)';
    } else {
      root.style.filter = 'none';
    }

    // High Contrast
    if (isHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Negative Contrast
    if (isNegativeContrast) {
      root.classList.add('negative-contrast');
    } else {
      root.classList.remove('negative-contrast');
    }

    // Light Background
    if (isLightBackground) {
      root.classList.add('light-background');
    } else {
      root.classList.remove('light-background');
    }

    // Underline Links
    if (isUnderlineLinks) {
      root.classList.add('underline-links');
    } else {
      root.classList.remove('underline-links');
    }

    // Readable Font
    if (isReadableFont) {
      root.classList.add('readable-font');
    } else {
      root.classList.remove('readable-font');
    }

    // Save preferences
    const preferences = {
      fontSize,
      isGrayscale,
      isHighContrast,
      isNegativeContrast,
      isLightBackground,
      isUnderlineLinks,
      isReadableFont
    };
    localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
  }, [fontSize, isGrayscale, isHighContrast, isNegativeContrast, isLightBackground, isUnderlineLinks, isReadableFont]);

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 10, 150));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 10, 50));
  };

  const resetAll = () => {
    setFontSize(100);
    setIsGrayscale(false);
    setIsHighContrast(false);
    setIsNegativeContrast(false);
    setIsLightBackground(false);
    setIsUnderlineLinks(false);
    setIsReadableFont(false);
    localStorage.removeItem('accessibilityPreferences');
  };

  return (
    <>
      <style jsx global>{`
        .high-contrast {
          filter: contrast(150%);
        }

        .negative-contrast {
          filter: invert(100%);
        }

        .light-background * {
          background-color: #f5f5f5 !important;
          color: #333 !important;
        }

        .underline-links a {
          text-decoration: underline !important;
        }

        .readable-font * {
          font-family: 'Open Sans', 'Arial', sans-serif !important;
          line-height: 1.8 !important;
          letter-spacing: 0.05em !important;
        }
      `}</style>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Eye className="h-4 w-4" />
            <span className="sr-only">Accessibility Tools</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end">
          <div className="p-2">
            <h3 className="font-semibold mb-3 text-sm">Accessibility Tools</h3>

            {/* Font Size Controls */}
            <div className="space-y-2 mb-3">
              <DropdownMenuItem
                onClick={increaseFontSize}
                className="flex items-center gap-3 cursor-pointer"
              >
                <ZoomIn className="h-4 w-4" />
                <span>Increase Text</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={decreaseFontSize}
                className="flex items-center gap-3 cursor-pointer"
              >
                <ZoomOut className="h-4 w-4" />
                <span>Decrease Text</span>
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />

            {/* Visual Options */}
            <div className="space-y-2 my-3">
              <DropdownMenuItem
                onClick={() => setIsGrayscale(!isGrayscale)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Palette className="h-4 w-4" />
                <span>Grayscale</span>
                {isGrayscale && <span className="ml-auto text-xs text-green-600">ON</span>}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setIsHighContrast(!isHighContrast)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Sun className="h-4 w-4" />
                <span>High Contrast</span>
                {isHighContrast && <span className="ml-auto text-xs text-green-600">ON</span>}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setIsNegativeContrast(!isNegativeContrast)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <EyeOff className="h-4 w-4" />
                <span>Negative Contrast</span>
                {isNegativeContrast && <span className="ml-auto text-xs text-green-600">ON</span>}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setIsLightBackground(!isLightBackground)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Moon className="h-4 w-4" />
                <span>Light Background</span>
                {isLightBackground && <span className="ml-auto text-xs text-green-600">ON</span>}
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />

            {/* Text Options */}
            <div className="space-y-2 my-3">
              <DropdownMenuItem
                onClick={() => setIsUnderlineLinks(!isUnderlineLinks)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Link className="h-4 w-4" />
                <span>Links Underline</span>
                {isUnderlineLinks && <span className="ml-auto text-xs text-green-600">ON</span>}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setIsReadableFont(!isReadableFont)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Type className="h-4 w-4" />
                <span>Readable Font</span>
                {isReadableFont && <span className="ml-auto text-xs text-green-600">ON</span>}
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />

            {/* Reset Button */}
            <DropdownMenuItem
              onClick={resetAll}
              className="flex items-center gap-3 cursor-pointer text-red-600"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AccessibilityTools;