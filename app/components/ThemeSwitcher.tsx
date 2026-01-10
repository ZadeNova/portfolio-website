"use client";

import { useTheme } from "./ThemeProvider";

const themes = [
  { id: "mocha", name: "Mocha", emoji: "☕" },
  { id: "latte", name: "Latte", emoji: "🥛" },
  { id: "macchiato", name: "Macchiato", emoji: "☕" },
  { id: "frappe", name: "Frappe", emoji: "🍨" },
] as const;

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
      <div className="bg-card-bg border-[0.5px] border-border rounded-md p-2.5 md:p-3 shadow-lg">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-xs text-muted font-mono px-1 hidden sm:inline">Theme:</span>
          <div className="flex gap-1 md:gap-1.5">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as "mocha" | "latte" | "macchiato" | "frappe")}
                className={`px-2.5 py-1.5 md:px-3 md:py-2 text-sm font-mono rounded-md transition-all ${
                  theme === t.id
                    ? "bg-accent-lavender text-background shadow-sm"
                    : "text-foreground hover:opacity-80 border-[0.5px] border-border"
                }`}
                title={t.name}
                aria-label={`Switch to ${t.name} theme`}
              >
                {t.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
