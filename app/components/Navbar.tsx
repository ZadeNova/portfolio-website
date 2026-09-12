"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme, THEMES } from "./ThemeProvider";

const SECTIONS = [
	{ id: "home", label: "home" },
	{ id: "activity", label: "activity" },
	{ id: "projects", label: "projects" },
	{ id: "contact", label: "contact" },
];

export default function Navbar() {
	const reducedMotion = !!useReducedMotion();
	const { theme, setTheme } = useTheme();
	const [active, setActive] = useState(SECTIONS[0].id);
	const [themeMenuOpen, setThemeMenuOpen] = useState(false);
	const themeMenuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
			(el): el is HTMLElement => el !== null,
		);
		if (elements.length === 0) return;

		const lastId = SECTIONS[SECTIONS.length - 1].id;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) setActive(visible[0].target.id);
			},
			{ rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
		);
		elements.forEach((el) => observer.observe(el));

		// The last section (footer) is shorter than the viewport, so the page
		// can run out of scroll room before it ever crosses the observer's
		// mid-viewport band — it would never get marked active. Detect "scrolled
		// to bottom" directly and force it active in that case.
		function handleScroll() {
			const atBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 2;
			if (atBottom) setActive(lastId);
		}
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();

		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (!themeMenuOpen) return;

		function handleOutsideClick(e: MouseEvent) {
			if (!themeMenuRef.current?.contains(e.target as Node)) {
				setThemeMenuOpen(false);
			}
		}
		function handleEscape(e: KeyboardEvent) {
			if (e.key === "Escape") setThemeMenuOpen(false);
		}
		document.addEventListener("click", handleOutsideClick);
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("click", handleOutsideClick);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [themeMenuOpen]);

	function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
		e.preventDefault();
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({
			behavior: reducedMotion ? "auto" : "smooth",
			block: "start",
		});
		history.replaceState(null, "", `#${id}`);
	}

	const activeTheme = THEMES.find((t) => t.id === theme) ?? THEMES[0];

	return (
		<nav
			className="sticky top-0 z-40 backdrop-blur-md"
			style={{
				background: "var(--glass-bg)",
				borderBottom: "0.5px solid var(--glass-border)",
			}}
			aria-label="Primary navigation"
		>
			<div className="max-w-[max(1400px,min(94vw,1700px))] mx-auto px-4 sm:px-6 h-14 flex items-center gap-3 sm:gap-5">
				<span className="text-label text-muted font-mono flex-shrink-0 hidden sm:flex items-center gap-1.5">
					<span
						className="w-1.5 h-1.5 rounded-full bg-accent-lavender shadow-[0_0_6px_var(--accent-lavender)]"
						aria-hidden="true"
					/>
					zade@portfolio:~
				</span>

				<ul className="flex items-center flex-nowrap gap-3 sm:gap-5 flex-1 justify-start sm:justify-center list-none overflow-x-auto min-w-0">
					{SECTIONS.map((section) => {
						const isActive = active === section.id;
						return (
							<li key={section.id} className="flex-shrink-0">
								<a
									href={`#${section.id}`}
									onClick={(e) => handleNavClick(e, section.id)}
									aria-current={isActive ? "true" : undefined}
									className={`font-mono text-label uppercase tracking-widest whitespace-nowrap transition-colors duration-150 ${
										isActive
											? "text-accent-lavender font-semibold before:content-['[_'] after:content-['_]'] before:opacity-70 after:opacity-70"
											: "text-muted hover:text-foreground"
									}`}
								>
									{section.label}
								</a>
							</li>
						);
					})}
				</ul>

				<div className="relative flex-shrink-0" ref={themeMenuRef}>
					<button
						onClick={() => setThemeMenuOpen((open) => !open)}
						aria-haspopup="true"
						aria-expanded={themeMenuOpen}
						className="flex items-center gap-1.5 text-label font-mono text-foreground border-[0.5px] border-border rounded px-2.5 py-1.5 hover:border-accent-lavender hover:text-accent-lavender transition-colors"
					>
						<span aria-hidden="true">{activeTheme.emoji}</span>
						<span className="hidden sm:inline">{activeTheme.name}</span>
						<span aria-hidden="true">▾</span>
					</button>

					{themeMenuOpen && (
						<div
							role="menu"
							className="absolute right-0 top-[calc(100%+8px)] min-w-[180px] flex flex-col gap-1 rounded-lg p-1.5"
							style={{
								background: "var(--card-bg)",
								border: "0.5px solid var(--glass-border)",
								boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
							}}
						>
							{THEMES.map((t) => {
								const isActive = theme === t.id;
								return (
									<button
										key={t.id}
										role="menuitemradio"
										onClick={() => {
											setTheme(t.id);
											setThemeMenuOpen(false);
										}}
										aria-checked={isActive}
										className={`flex items-center gap-2 px-2.5 py-1.5 text-label font-mono rounded transition-all text-left ${
											isActive
												? "bg-accent-lavender text-background font-semibold"
												: "text-foreground border-[0.5px] border-transparent hover:border-accent-lavender/50 hover:text-accent-lavender"
										}`}
									>
										<span aria-hidden="true">{t.emoji}</span>
										<span>{t.name}</span>
									</button>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
