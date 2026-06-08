"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SECTIONS = [
	{ id: "home", label: "home" },
	{ id: "activity", label: "activity" },
	{ id: "projects", label: "projects" },
	{ id: "contact", label: "contact" },
];

export default function SectionNav() {
	const reducedMotion = !!useReducedMotion();
	const [active, setActive] = useState(SECTIONS[0].id);

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

	function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
		e.preventDefault();
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
		history.replaceState(null, "", `#${id}`);
	}

	return (
		<nav
			className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-3"
			aria-label="Section navigation"
		>
			{SECTIONS.map((section) => {
				const isActive = active === section.id;
				return (
					<a
						key={section.id}
						href={`#${section.id}`}
						onClick={(e) => handleClick(e, section.id)}
						aria-current={isActive ? "true" : undefined}
						className="group/navdot flex items-center gap-2.5"
					>
						<span
							className={`font-mono text-[11px] uppercase tracking-widest transition-all duration-200 ${
								isActive
									? "text-accent-lavender opacity-100 translate-x-0"
									: "text-muted opacity-0 translate-x-1.5 group-hover/navdot:opacity-100 group-hover/navdot:translate-x-0"
							}`}
						>
							{section.label}
						</span>
						<span
							className={`block rounded-full transition-all duration-200 ${
								isActive
									? "w-3 h-3 bg-accent-lavender shadow-[0_0_8px_var(--accent-lavender)] animate-pulse"
									: "w-2 h-2 bg-border group-hover/navdot:bg-accent-lavender/60"
							}`}
							aria-hidden="true"
						/>
					</a>
				);
			})}
		</nav>
	);
}
