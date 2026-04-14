"use client";

import { useTheme } from "./ThemeProvider";

const THEMES = [
	{ id: "mocha", name: "Mocha", emoji: "🌿" },
	{ id: "nord", name: "Nord", emoji: "❄️" },
	{ id: "gruvbox", name: "Gruvbox", emoji: "🪨" },
	{ id: "rosepine", name: "Rosé Pine", emoji: "🌸" },
	{ id: "rosepine-dawn", name: "Rosé Pine Dawn", emoji: "🌅" },
	{ id: "dracula", name: "Dracula", emoji: "🧛" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="flex flex-col h-full">
			<div className="text-[9px] text-muted uppercase tracking-widest mb-3 font-mono">
				Theme
			</div>
			<div className="flex flex-col gap-2">
				{THEMES.map((t) => {
					const isActive = theme === t.id;
					return (
						<button
							key={t.id}
							onClick={() => setTheme(t.id as ThemeId)}
							aria-label={`Switch to ${t.name} theme`}
							aria-pressed={isActive}
							className={`
                flex items-center gap-2 px-2.5 py-1.5 text-[11px] font-mono rounded transition-all
                ${
									isActive
										? "bg-accent-lavender text-background font-semibold"
										: "text-foreground border-[0.5px] border-border hover:border-accent-lavender/50 hover:text-accent-lavender"
								}
              `}
						>
							<span className="text-[12px] leading-none" aria-hidden="true">
								{t.emoji}
							</span>
							<span>{t.name}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
