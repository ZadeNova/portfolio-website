"use client";

import { useTheme } from "./ThemeProvider";

const themes = [
	{ id: "mocha", name: "Mocha" },
	{ id: "latte", name: "Latte" },
	{ id: "macchiato", name: "Macchiato" },
	{ id: "frappe", name: "Frappe" },
	{ id: "nord", name: "Nord" },
	{ id: "gruvbox", name: "Gruvbox" },
] as const;

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="h-full flex flex-col">
			<h3 className="text-sm font-semibold text-foreground mb-4 font-mono">
				Theme
			</h3>
			<div className="grid grid-cols-1  gap-2">
				{themes.map((t) => (
					<button
						key={t.id}
						onClick={() =>
							setTheme(
								t.id as
									| "mocha"
									| "latte"
									| "macchiato"
									| "frappe"
									| "nord"
									| "gruvbox"
							)
						}
						className={`px-2.5 py-2 text-xs font-mono rounded-md transition-all text-center ${
							theme === t.id
								? "bg-accent-lavender text-background shadow-sm font-semibold"
								: "text-foreground hover:bg-accent-lavender/10 border-[0.5px] border-border"
						}`}
						title={t.name}
						aria-label={`Switch to ${t.name} theme`}
					>
						{t.name}
					</button>
				))}
			</div>
			{/* <div className="mt-auto pt-4 border-t-[0.5px] border-border">
				<div className="space-y-1 font-mono text-[10px]">
					<div className="text-muted"># current_env</div>
					<div className="flex items-center gap-2">
						<span className="text-accent-blue">SET</span>
						<span className="text-foreground uppercase">{theme}_MODE</span>
					</div>
					<div className="text-muted/50 italic">
						Load SIT_Applied_Fintech.sh
					</div>
				</div>
			</div> */}
		</div>
	);
}
