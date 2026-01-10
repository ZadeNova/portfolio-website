"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "mocha" | "latte" | "macchiato" | "frappe" | "nord" | "gruvbox";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Default context value to prevent errors before initialization
const defaultContextValue: ThemeContextType = {
  theme: "gruvbox",
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("gruvbox");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or default
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const validThemes = ["mocha", "latte", "macchiato", "frappe", "nord", "gruvbox"];
    const initialTheme = (savedTheme && validThemes.includes(savedTheme)) 
      ? savedTheme 
      : "gruvbox";
    
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    setMounted(true);
  }, []);

  // Update theme when it changes
  const handleSetTheme = (newTheme: Theme) => {
    if (mounted) {
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  // Always provide the context, even before mounting
  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
