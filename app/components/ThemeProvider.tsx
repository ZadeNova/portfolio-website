"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme =
	| "everforest-light"
	| "nord"
	| "gruvbox"
	| "rosepine"
	| "rosepine-dawn"
	| "dracula";

export interface ThemeOption {
	id: Theme;
	name: string;
	emoji: string;
}

// Single source of truth for the theme list — id order here also drives the
// switcher UI (Navbar.tsx), so it's shared rather than duplicated per-consumer.
export const THEMES: ThemeOption[] = [
	{ id: "rosepine-dawn", name: "Rosé Pine Dawn", emoji: "🌅" },
	{ id: "everforest-light", name: "Everforest Light", emoji: "🌲" },
	{ id: "nord", name: "Nord", emoji: "❄️" },
	{ id: "gruvbox", name: "Gruvbox", emoji: "🪨" },
	{ id: "rosepine", name: "Rosé Pine", emoji: "🌸" },
	{ id: "dracula", name: "Dracula", emoji: "🧛" },
];

const VALID_THEMES: Theme[] = THEMES.map((t) => t.id);

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "rosepine-dawn",
	setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("rosepine-dawn");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem("theme") as Theme;
		const initial =
			saved && VALID_THEMES.includes(saved) ? saved : "rosepine-dawn";
		setTheme(initial);
		document.documentElement.setAttribute("data-theme", initial);
		setMounted(true);
	}, []);

	const handleSetTheme = (newTheme: Theme) => {
		if (!mounted) return;
		document.documentElement.classList.add("theme-transitioning");
		setTheme(newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
		setTimeout(() => {
			document.documentElement.classList.remove("theme-transitioning");
		}, 400);
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
