"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme =
	| "mocha"
	| "nord"
	| "gruvbox"
	| "rosepine"
	| "rosepine-dawn"
	| "dracula";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "mocha",
	setTheme: () => {},
});

const VALID_THEMES: Theme[] = [
	"mocha",
	"nord",
	"gruvbox",
	"rosepine",
	"rosepine-dawn",
	"dracula",
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("mocha");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem("theme") as Theme;
		const initial = saved && VALID_THEMES.includes(saved) ? saved : "mocha";
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
