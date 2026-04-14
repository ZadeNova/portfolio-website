"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTag = "ALL" | "BACKEND" | "SYSTEMS" | "FINTECH";

type TechCategory = "language" | "ops" | "framework" | "data" | "db" | "other";

interface TechTag {
	name: string;
	category: TechCategory;
}

interface Project {
	name: string;
	description: string; // replaces problem + decisions
	learned: string;
	tags: TechTag[];
	filters: FilterTag[];
	repoUrl?: string;
	liveUrl?: string;
}

// ─── Tag styles — mono font, category-coloured ───────────────────────────────

const TAG_STYLES: Record<TechCategory, string> = {
	language: "border-green-500/40  text-green-400",
	ops: "border-yellow-500/40 text-yellow-400",
	framework: "border-accent-blue/40 text-accent-blue",
	data: "border-accent-lavender/40 text-accent-lavender",
	db: "border-cyan-500/40  text-cyan-400",
	other: "border-border text-muted",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
	{
		name: "BullBear Analysis",
		description:
			"A production-ready financial analysis tool that runs sophisticated technical indicators (MACD, RSI, Bollinger Bands) against historical stock data and surfaces buy/sell signals through an interactive Streamlit dashboard. Containerized via Docker to eliminate TA-Lib C-library setup friction, with analytics logic fully decoupled from the visualization layer for maintainability. Includes a theoretical profit maximization engine to back-test signal accuracy against historical price data.",
		learned:
			"Environment containerization for specialized C-dependencies and decoupling data processing from interactive visualization in Streamlit.",
		tags: [
			{ name: "Python", category: "language" },
			{ name: "Docker", category: "ops" },
			{ name: "Streamlit", category: "framework" },
			{ name: "TA-Lib", category: "data" },
			{ name: "Pandas", category: "data" },
			{ name: "Plotly", category: "data" },
		],
		filters: ["ALL", "BACKEND", "FINTECH"],
		repoUrl: "https://github.com/ZadeNova",
	},
	{
		name: "Class Management System",
		description:
			"A CLI-based student records system built in C using custom data structures — hash tables for O(1) ID lookups, a stack-based undo system for state recovery, and role-based access control separating Staff (write) from Student (read-only) permissions. Automated regression testing written with the Tcl/Expect framework. Demonstrates low-level memory management and systems design without relying on higher-level language abstractions.",
		learned:
			"Mastered low-level memory management and custom data structure design in C while implementing automated regression testing suites with the Tcl/Expect framework.",
		tags: [
			{ name: "C", category: "language" },
			{ name: "MakeFile", category: "ops" },
		],
		filters: ["ALL", "SYSTEMS"],
		repoUrl: "https://github.com/ZadeNova",
	},
	{
		name: "TickerLens",
		description:
			"A full-stack financial dashboard with a FastAPI backend and Next.js frontend that delivers delayed stock metrics, interactive price charts, and benchmark comparisons against the S&P 500 across YTD, 1Y, 3Y, and 5Y timeframes. Pydantic models enforce strict schema validation between the Python backend and React frontend. A custom date-alignment algorithm using pytz and relativedelta accurately maps historical price points to the nearest US trading day.",
		learned:
			"Gained deep experience in full-stack orchestration, focusing on type-safe API design with Pydantic and interactive data visualization with Recharts.",
		tags: [
			{ name: "Next.js", category: "framework" },
			{ name: "FastAPI", category: "framework" },
			{ name: "Python", category: "language" },
			{ name: "TailwindCSS", category: "framework" },
			{ name: "yFinance", category: "data" },
			{ name: "Recharts", category: "data" },
		],
		filters: ["ALL", "BACKEND", "FINTECH"],
		repoUrl: "https://github.com/ZadeNova",
	},
];

const FILTERS: FilterTag[] = ["ALL", "BACKEND", "SYSTEMS", "FINTECH"];

// ─── Icons ────────────────────────────────────────────────────────────────────

function GitHubIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			className="w-3.5 h-3.5"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
		</svg>
	);
}

function ExternalLinkIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			className="w-3.5 h-3.5"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			aria-hidden="true"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>
	);
}

function ChevronIcon({ open }: { open: boolean }) {
	return (
		<svg
			viewBox="0 0 24 24"
			className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			aria-hidden="true"
		>
			<polyline points="6 9 12 15 18 9" />
		</svg>
	);
}

// ─── Desktop expandable row ───────────────────────────────────────────────────

interface DesktopRowProps {
	project: Project;
	index: number;
	isExpanded: boolean;
	onToggle: () => void;
}

function DesktopRow({ project, index, isExpanded, onToggle }: DesktopRowProps) {
	const cardNumber = String(index + 1).padStart(2, "0");

	return (
		<article
			className={`flex overflow-hidden rounded-r-lg transition-all duration-150 glass-card ${
				isExpanded ? "glass-card--active" : ""
			}`}
			style={{
				borderLeftWidth: "2px",
				borderLeftColor: isExpanded
					? "var(--accent-lavender)"
					: "rgba(203,166,247,0.25)",
			}}
		>
			{/* Collapsed header row — always visible */}
			<div className="flex-1 min-w-0">
				<button
					onClick={onToggle}
					aria-expanded={isExpanded}
					aria-controls={`project-detail-${index}`}
					className="w-full flex items-center gap-3 px-4 py-3 text-left group"
				>
					<span className="text-[11px] text-muted/50 font-bold font-mono flex-shrink-0 w-6 tabular-nums">
						{cardNumber}
					</span>
					<span className="text-[13px] font-semibold text-accent-lavender flex-shrink-0 min-w-[160px] font-sans group-hover:opacity-90 transition-opacity">
						{project.name}
					</span>
					<div className="flex gap-1.5 flex-wrap flex-1 min-w-0">
						{project.tags.slice(0, 5).map((tag) => (
							<span
								key={tag.name}
								className={`text-[8px] border-[0.5px] rounded px-1.5 py-0.5 uppercase tracking-wide font-mono ${TAG_STYLES[tag.category]}`}
							>
								{tag.name}
							</span>
						))}
						{project.tags.length > 5 && (
							<span className="text-[8px] text-muted font-mono">
								+{project.tags.length - 5}
							</span>
						)}
					</div>
					<span className="text-[10px] text-muted/60 font-mono flex-shrink-0 hidden lg:block max-w-[260px] truncate">
						{project.description.slice(0, 72)}…
					</span>
					<div className="flex items-center gap-2 ml-3 flex-shrink-0 text-muted/50">
						{project.repoUrl && (
							<a
								href={project.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => e.stopPropagation()}
								className="hover:text-accent-lavender transition-colors"
								aria-label={`${project.name} GitHub repository`}
							>
								<GitHubIcon />
							</a>
						)}
						{project.liveUrl && (
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => e.stopPropagation()}
								className="hover:text-accent-lavender transition-colors"
								aria-label={`${project.name} live demo`}
							>
								<ExternalLinkIcon />
							</a>
						)}
						<span className="text-muted/40">
							<ChevronIcon open={isExpanded} />
						</span>
					</div>
				</button>

				{/* Expanded body */}
				{isExpanded && (
					<div
						id={`project-detail-${index}`}
						className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t font-mono"
						style={{ borderColor: "var(--glass-border)" }}
					>
						{/* Left — description */}
						<div
							className="p-4 md:p-5"
							style={{ borderRight: "0.5px solid var(--glass-border)" }}
						>
							<div className="text-[9px] text-muted/60 uppercase tracking-widest mb-3">
								Overview
							</div>
							<p className="text-[12px] text-foreground/80 leading-relaxed font-sans">
								{project.description}
							</p>
						</div>

						{/* Right — learned + tags + links */}
						<div className="p-4 md:p-5 flex flex-col gap-4">
							<div>
								<div className="text-[9px] text-muted/60 uppercase tracking-widest mb-2">
									Learned
								</div>
								<div
									className="rounded p-3 text-[11px] leading-relaxed font-sans"
									style={{
										background: "var(--glass-tint)",
										border: "0.5px solid var(--glass-border)",
										color: "var(--foreground)",
										opacity: 0.85,
									}}
								>
									{project.learned}
								</div>
							</div>

							<div>
								<div className="text-[9px] text-muted/60 uppercase tracking-widest mb-2">
									Stack
								</div>
								<div className="flex flex-wrap gap-1.5">
									{project.tags.map((tag) => (
										<span
											key={tag.name}
											className={`text-[9px] border-[0.5px] rounded px-2 py-0.5 uppercase tracking-wide font-mono ${TAG_STYLES[tag.category]}`}
										>
											{tag.name}
										</span>
									))}
								</div>
							</div>

							<div className="flex gap-2 mt-auto">
								{project.repoUrl && (
									<a
										href={project.repoUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1.5 text-[9px] font-mono text-accent-lavender border-[0.5px] border-accent-lavender/30 rounded px-2.5 py-1.5 hover:bg-accent-lavender/10 transition-colors tracking-wide uppercase"
									>
										<GitHubIcon />
										Source
									</a>
								)}
								{project.liveUrl && (
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1.5 text-[9px] font-mono text-accent-blue border-[0.5px] border-accent-blue/30 rounded px-2.5 py-1.5 hover:bg-accent-blue/10 transition-colors tracking-wide uppercase"
									>
										<ExternalLinkIcon />
										Live
									</a>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</article>
	);
}

// ─── Mobile card ─────────────────────────────────────────────────────────────

function MobileCard({ project, index }: { project: Project; index: number }) {
	const cardNumber = String(index + 1).padStart(2, "0");
	return (
		<article
			className="glass-card relative flex flex-col h-full overflow-hidden rounded-r-lg"
			style={{
				borderLeftWidth: "2px",
				borderLeftColor: "var(--accent-lavender)",
			}}
		>
			<span
				className="absolute top-1 left-2 text-[42px] font-bold leading-none text-border/30 select-none pointer-events-none font-mono"
				aria-hidden="true"
			>
				{cardNumber}
			</span>
			<div className="relative p-4 flex flex-col h-full">
				<div className="flex items-start justify-between gap-2 mb-3">
					<h3 className="text-[14px] font-semibold text-accent-lavender leading-tight font-sans">
						{project.name}
					</h3>
					<div className="flex flex-wrap justify-end gap-1 max-w-[45%]">
						{project.tags.slice(0, 4).map((tag) => (
							<span
								key={tag.name}
								className={`text-[8px] border-[0.5px] rounded px-1.5 py-0.5 uppercase tracking-wide font-mono ${TAG_STYLES[tag.category]}`}
							>
								{tag.name}
							</span>
						))}
					</div>
				</div>

				<p className="text-[11px] text-foreground/75 leading-relaxed mb-4 font-sans">
					{project.description}
				</p>

				<div
					className="rounded p-3 mb-4 text-[11px] leading-relaxed font-sans"
					style={{
						background: "var(--glass-tint)",
						border: "0.5px solid var(--glass-border)",
						color: "var(--muted)",
					}}
				>
					<span
						className="text-[9px] uppercase tracking-widest font-mono mr-2"
						style={{ color: "var(--muted)", opacity: 0.6 }}
					>
						Learned:
					</span>
					{project.learned}
				</div>

				{(project.repoUrl ?? project.liveUrl) && (
					<div className="flex gap-2 mt-auto">
						{project.repoUrl && (
							<a
								href={project.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1.5 text-[9px] font-mono text-accent-lavender border-[0.5px] border-accent-lavender/30 rounded px-2.5 py-1.5 hover:bg-accent-lavender/10 transition-colors tracking-wide uppercase"
							>
								<GitHubIcon />
								Source
							</a>
						)}
						{project.liveUrl && (
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1.5 text-[9px] font-mono text-accent-blue border-[0.5px] border-accent-blue/30 rounded px-2.5 py-1.5 hover:bg-accent-blue/10 transition-colors tracking-wide uppercase"
							>
								<ExternalLinkIcon />
								Live
							</a>
						)}
					</div>
				)}
			</div>
		</article>
	);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Projects() {
	const [activeFilter, setActiveFilter] = useState<FilterTag>("ALL");
	const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
	const [showAll, setShowAll] = useState(false);

	const filtered = PROJECTS.filter((p) => p.filters.includes(activeFilter));
	const displayed = showAll ? filtered : filtered.slice(0, 3);

	const handleToggle = (index: number) => {
		setExpandedIndex((prev) => (prev === index ? null : index));
	};

	const handleFilterChange = (f: FilterTag) => {
		setActiveFilter(f);
		setExpandedIndex(0);
	};

	// ── Mobile snap scroll refs ───────────────────────────────────────────────
	const scrollRef = useRef<HTMLDivElement>(null);
	const [activeCard, setActiveCard] = useState(0);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		const onScroll = () => {
			const idx = Math.round(el.scrollLeft / el.clientWidth);
			setActiveCard(idx);
		};
		el.addEventListener("scroll", onScroll, { passive: true });
		return () => el.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<section
			id="projects"
			className="py-10 md:py-14 px-4 sm:px-6 max-w-[1400px] mx-auto"
			aria-label="Projects section"
		>
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
				<div className="flex items-center gap-2">
					<span
						className="w-2 h-2 rounded-full bg-accent-lavender animate-pulse"
						aria-hidden="true"
					/>
					<h2 className="text-[11px] font-bold text-foreground uppercase tracking-[0.15em] font-mono">
						PROJECTS
					</h2>
					<span className="text-[10px] text-muted font-mono ml-2">
						{filtered.length} MODULES INDEXED
					</span>
				</div>

				{/* Filter bar — glass pills */}
				<div className="flex gap-1.5" role="group" aria-label="Filter projects">
					{FILTERS.map((f) => (
						<button
							key={f}
							onClick={() => handleFilterChange(f)}
							aria-pressed={activeFilter === f}
							className={`text-[9px] px-3 py-1.5 rounded-full border-[0.5px] uppercase tracking-widest font-mono transition-all duration-150 backdrop-blur-sm ${
								activeFilter === f
									? "bg-accent-lavender/20 text-accent-lavender border-accent-lavender/50 font-bold"
									: "text-muted border-border/50 hover:text-accent-lavender hover:border-accent-lavender/30"
							}`}
							style={{
								background: activeFilter === f ? undefined : "var(--glass-bg)",
							}}
						>
							{f}
						</button>
					))}
				</div>
			</div>

			{/* ── Desktop: accordion list ──────────────────────────────────── */}
			<div className="hidden md:block">
				<div className="flex flex-col gap-2">
					{displayed.map((project, idx) => (
						<DesktopRow
							key={project.name}
							project={project}
							index={idx}
							isExpanded={expandedIndex === idx}
							onToggle={() => handleToggle(idx)}
						/>
					))}
				</div>

				{filtered.length > 3 && (
					<button
						onClick={() => setShowAll((s) => !s)}
						className="w-full mt-3 py-2 text-[10px] font-mono text-muted border-[0.5px] border-dashed rounded hover:text-accent-lavender hover:border-accent-lavender/40 transition-colors tracking-widest uppercase"
						style={{ borderColor: "var(--glass-border)" }}
					>
						{showAll
							? "[ COLLAPSE_MODULES ]"
							: `[ LOAD_ALL_MODULES +${filtered.length - 3} ]`}
					</button>
				)}
			</div>

			{/* ── Mobile: snap scroll carousel ─────────────────────────────── */}
			<div className="md:hidden">
				<div
					ref={scrollRef}
					className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3"
					style={{ scrollbarWidth: "none" }}
				>
					{filtered.map((project, idx) => (
						<div
							key={project.name}
							className="flex-shrink-0 w-[85vw] snap-start"
						>
							<MobileCard project={project} index={idx} />
						</div>
					))}
				</div>

				{/* Dot indicators */}
				<div className="flex justify-center gap-1.5 mt-3" aria-hidden="true">
					{filtered.map((_, idx) => (
						<span
							key={idx}
							className={`rounded-full transition-all duration-200 ${
								activeCard === idx
									? "w-4 h-1.5 bg-accent-lavender"
									: "w-1.5 h-1.5 bg-border"
							}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
