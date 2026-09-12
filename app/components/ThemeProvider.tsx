"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const THEMES = [
	{ id: "rosepine-dawn", name: "Rosé Pine Dawn", emoji: "🌅" },
	{ id: "everforest-light", name: "Everforest Light", emoji: "🌲" },
	{ id: "nord", name: "Nord", emoji: "❄️" },
	{ id: "gruvbox", name: "Gruvbox", emoji: "🪨" },
	{ id: "rosepine", name: "Rosé Pine", emoji: "🌸" },
	{ id: "dracula", name: "Dracula", emoji: "🧛" },
] as const;

type Theme = (typeof THEMES)[number]["id"];

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "rosepine-dawn",
	setTheme: () => {},
});

const VALID_THEMES: Theme[] = THEMES.map((t) => t.id);

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
