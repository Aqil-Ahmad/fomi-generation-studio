"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { IconButton } from "@/components/ui/IconButton";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <IconButton
      label="Dark theme"
      tooltipSide="bottom"
      aria-pressed={isDark}
      suppressHydrationWarning
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="aria-pressed:bg-surface-2 aria-pressed:text-ink"
    >
      <Moon aria-hidden="true" size={18} strokeWidth={2} className="dark:hidden" />
      <Sun aria-hidden="true" size={18} strokeWidth={2} className="hidden dark:block" />
    </IconButton>
  );
}
