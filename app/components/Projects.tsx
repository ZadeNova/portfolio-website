"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTag = "ALL" | "BACKEND" | "SYSTEMS" | "FINTECH";

type TechCategory = "language" | "ops" | "framework" | "data" | "db" | "other";

interface TechTag {
	name: string;
	category: TechCategory;
}

interface Project {
	name: string;
	problem: string;
	tags: TechTag[];
	decisions: string[];
	learned: string;
	filters: FilterTag[];
	repoUrl?: string;
	liveUrl?: string;
}

// ─── Tag category colours — theme-aware via CSS vars ─────────────────────────
// language → green  |  ops → yellow/amber  |  framework → blue
// data → lavender   |  db  → teal-ish blue |  other → muted

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
		problem:
			"Perform sophisticated technical analysis and trend identification on historical stock data with production-ready visualization.",
		tags: [
			{ name: "Python", category: "language" },
			{ name: "Docker", category: "ops" },
			{ name: "Streamlit", category: "framework" },
			{ name: "TA-Lib", category: "data" },
			{ name: "Pandas", category: "data" },
			{ name: "Plotly", category: "data" },
		],
		decisions: [
			"Used Docker to containerize the application, bypassing complex local setup requirements for the TA-Lib C-library",
			"Decoupled core financial analytics and indicator logic from the UI into a modular package structure for maintainability",
			"Implemented a theoretical profit maximization algorithm to validate buy/sell signals against historical data",
		],
		learned:
			"Importance of environment containerization for specialized C-dependencies and how to decouple data processing from interactive visualization in Streamlit.",
		filters: ["ALL", "BACKEND", "FINTECH"],
		repoUrl: "https://github.com/ZadeNova",
	},
	{
		name: "Class Management System",
		problem:
			"Efficiently manage, analyze, and visualize student records using custom high-performance data structures in a C-based CLI environment.",
		tags: [
			{ name: "C", category: "language" },
			{ name: "MakeFile", category: "ops" },
		],
		decisions: [
			"Utilized custom Hash Tables to achieve O(1) time complexity for student retrieval by ID, ensuring scalable lookup performance",
			"Designed and implemented a stack-based undo functionality to maintain data integrity and allow for reliable state recovery",
			"Built a role-based access control system to enforce distinct permissions between administrative Staff (Write) and Student (Read-only) users",
		],
		learned:
			"Mastered low-level memory management and custom data structure design in C while implementing automated regression testing suites with the Tcl/Expect framework.",
		filters: ["ALL", "SYSTEMS"],
		repoUrl: "https://github.com/ZadeNova",
	},
	{
		name: "TickerLens",
		problem:
			"Develop a lightweight, one-stop financial analysis web app providing delayed stock metrics and a price chart.",
		tags: [
			{ name: "Next.js", category: "framework" },
			{ name: "FastAPI", category: "framework" },
			{ name: "Python", category: "language" },
			{ name: "TailwindCSS", category: "framework" },
			{ name: "yfinance", category: "data" },
			{ name: "Recharts", category: "data" },
		],
		decisions: [
			"Implemented a benchmark comparison engine to calculate and track ticker performance against the S&P 500 across YTD, 1Y, 3Y, and 5Y timeframes",
			"Utilized Pydantic models to enforce strict schema validation for stock, ETF, and historical price data, ensuring type safety between the Python backend and Next.js frontend",
			"Developed a custom date-alignment algorithm using pytz and relativedelta to accurately map historical price points to nearest trading days relative to US market hours",
		],
		learned:
			"Gained deep experience in full-stack orchestration, focusing on type-safe API design with Pydantic and interactive data visualization with Recharts.",
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
		<article className="border-[0.5px] border-border border-l-2 border-l-accent-lavender rounded-r-lg bg-card-bg font-mono transition-colors duration-150 hover:border-accent-lavender/40">
			{/* Collapsed row */}
			<div className="flex items-center gap-3 px-4 py-3">
				{/* Clickable region — index + name + tags + summary */}
				<button
					onClick={onToggle}
					aria-expanded={isExpanded}
					aria-controls={`project-detail-${index}`}
					className="flex items-center gap-3 flex-1 min-w-0 text-left group"
				>
					<span className="text-[11px] text-muted/40 font-bold flex-shrink-0 w-6 tabular-nums">
						{cardNumber}
					</span>
					<span className="text-[13px] font-bold text-accent-lavender flex-shrink-0 min-w-[160px] group-hover:text-accent-lavender/90 transition-colors">
						{project.name}
					</span>
					<div className="flex gap-1.5 flex-wrap flex-1">
						{project.tags.map((tag) => (
							<span
								key={tag.name}
								className={`text-[9px] border-[0.5px] rounded px-1.5 py-0.5 uppercase tracking-wide ${TAG_STYLES[tag.category]}`}
							>
								{tag.name}
							</span>
						))}
					</div>
					<span className="text-[11px] text-muted hidden xl:block flex-shrink-0 max-w-[260px] truncate">
						{project.problem}
					</span>
				</button>

				{/* Row actions — always visible, no expand needed */}
				<div className="flex items-center gap-2 flex-shrink-0 ml-2">
					{project.repoUrl && (
						<a
							href={project.repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`GitHub repo for ${project.name}`}
							className="text-muted hover:text-accent-lavender transition-colors p-1"
						>
							<GitHubIcon />
						</a>
					)}
					{project.liveUrl && (
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Live demo for ${project.name}`}
							className="text-muted hover:text-accent-lavender transition-colors p-1"
						>
							<ExternalLinkIcon />
						</a>
					)}
					<button
						onClick={onToggle}
						aria-label={isExpanded ? "Collapse" : "Expand"}
						className={`text-muted/60 text-[10px] transition-transform duration-200 p-1 hover:text-accent-lavender ${isExpanded ? "rotate-180" : "rotate-0"}`}
					>
						▼
					</button>
				</div>
			</div>

			{/* Expanded detail */}
			{isExpanded && (
				<div
					id={`project-detail-${index}`}
					className="px-4 pb-4 border-t border-border/30"
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
						<div>
							<p className="text-[11px] text-muted leading-relaxed mb-4">
								{project.problem}
							</p>
							<div className="text-[9px] text-muted/60 uppercase tracking-widest mb-2.5">
								LOGIC:
							</div>
							<ul className="space-y-2">
								{project.decisions.map((d, i) => (
									<li key={i} className="flex items-start gap-2.5 text-[11px]">
										<span className="text-muted/40 flex-shrink-0 mt-0.5">
											—
										</span>
										<span className="text-foreground leading-relaxed">{d}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="lg:border-l lg:border-border/30 lg:pl-6">
							<div className="text-[9px] text-muted/60 uppercase tracking-widest mb-2.5">
								LEARNED:
							</div>
							<p className="text-[11px] text-foreground leading-relaxed">
								{project.learned}
							</p>
						</div>
					</div>
				</div>
			)}
		</article>
	);
}

// ─── Mobile card ─────────────────────────────────────────────────────────────

function MobileCard({ project, index }: { project: Project; index: number }) {
	const cardNumber = String(index + 1).padStart(2, "0");
	return (
		<article className="relative bg-card-bg border-[0.5px] border-border border-l-2 border-l-accent-lavender rounded-r-lg flex flex-col h-full overflow-hidden font-mono">
			<span
				className="absolute top-1 left-2 text-[42px] font-bold leading-none text-border/40 select-none pointer-events-none"
				aria-hidden="true"
			>
				{cardNumber}
			</span>
			<div className="relative p-4 flex flex-col h-full">
				<div className="flex items-start justify-between gap-2 mb-3">
					<h3 className="text-[14px] font-bold text-accent-lavender leading-tight">
						{project.name}
					</h3>
					<div className="flex flex-wrap justify-end gap-1 max-w-[45%]">
						{project.tags.map((tag) => (
							<span
								key={tag.name}
								className={`text-[8px] border-[0.5px] rounded px-1.5 py-0.5 uppercase tracking-wide ${TAG_STYLES[tag.category]}`}
							>
								{tag.name}
							</span>
						))}
					</div>
				</div>
				<p className="text-[11px] text-muted leading-relaxed mb-3">
					{project.problem}
				</p>
				<div className="flex-grow mb-3">
					<div className="text-[9px] text-muted/60 uppercase tracking-widest mb-2">
						LOGIC:
					</div>
					<ul className="space-y-2">
						{project.decisions.map((d, i) => (
							<li key={i} className="flex items-start gap-2 text-[11px]">
								<span className="text-muted/40 flex-shrink-0 mt-0.5">—</span>
								<span className="text-foreground leading-relaxed">{d}</span>
							</li>
						))}
					</ul>
				</div>
				<div className="border-t border-border/30 pt-3 mt-auto">
					<p className="text-[11px] text-muted leading-relaxed">
						<span className="text-muted/60 uppercase tracking-widest text-[9px] mr-2">
							LEARNED:
						</span>
						{project.learned}
					</p>
					{(project.repoUrl ?? project.liveUrl) && (
						<div className="flex gap-2 mt-3">
							{project.repoUrl && (
								<a
									href={project.repoUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1.5 text-[10px] text-muted hover:text-accent-lavender border-[0.5px] border-border hover:border-accent-lavender/50 rounded px-2.5 py-1.5 transition-colors"
								>
									<GitHubIcon /> Source
								</a>
							)}
							{project.liveUrl && (
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1.5 text-[10px] text-muted hover:text-accent-lavender border-[0.5px] border-border hover:border-accent-lavender/50 rounded px-2.5 py-1.5 transition-colors"
								>
									<ExternalLinkIcon /> Live
								</a>
							)}
						</div>
					)}
				</div>
			</div>
		</article>
	);
}

// ─── Carousel hook ────────────────────────────────────────────────────────────

function useCarouselIndex(
	trackRef: React.RefObject<HTMLDivElement | null>,
	total: number,
): number {
	const [activeIndex, setActiveIndex] = useState(0);
	useEffect(() => {
		const el = trackRef.current;
		if (!el) return;
		const onScroll = () => {
			const idx = Math.round(el.scrollLeft / (el.scrollWidth / total));
			setActiveIndex(Math.min(Math.max(idx, 0), total - 1));
		};
		el.addEventListener("scroll", onScroll, { passive: true });
		return () => el.removeEventListener("scroll", onScroll);
	}, [trackRef, total]);
	return activeIndex;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Projects() {
	const [activeFilter, setActiveFilter] = useState<FilterTag>("ALL");
	const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // first open by default
	const [showAll, setShowAll] = useState(false);

	const trackRef = useRef<HTMLDivElement>(null);
	const activeCarouselIndex = useCarouselIndex(trackRef, PROJECTS.length);

	const scrollToIndex = useCallback((index: number) => {
		const el = trackRef.current;
		if (!el) return;
		el.scrollTo({
			left: (el.scrollWidth / PROJECTS.length) * index,
			behavior: "smooth",
		});
	}, []);

	const filtered = useMemo(
		() => PROJECTS.filter((p) => p.filters.includes(activeFilter)),
		[activeFilter],
	);

	const displayed = showAll ? filtered : filtered.slice(0, 3);

	const handleToggle = (index: number) => {
		setExpandedIndex((prev) => (prev === index ? null : index));
	};

	const handleFilterChange = (f: FilterTag) => {
		setActiveFilter(f);
		setExpandedIndex(0); // reset expand to first on filter change
	};

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

				{/* Filter bar — "grep" approach */}
				<div
					className="flex gap-1.5 font-mono"
					role="group"
					aria-label="Filter projects"
				>
					{FILTERS.map((f) => (
						<button
							key={f}
							onClick={() => handleFilterChange(f)}
							aria-pressed={activeFilter === f}
							className={`text-[9px] px-2.5 py-1.5 rounded border-[0.5px] uppercase tracking-widest transition-colors ${
								activeFilter === f
									? "bg-accent-lavender text-background border-accent-lavender font-bold"
									: "text-muted border-border hover:text-accent-lavender hover:border-accent-lavender/50"
							}`}
						>
							{f}
						</button>
					))}
				</div>
			</div>

			{/* ── Desktop: scrollable fixed-height list (md+) ─────────────── */}
			<div className="hidden md:block">
				<div
					className="flex flex-col gap-2 overflow-y-auto pr-1"
					style={{
						maxHeight: "520px",
						scrollbarWidth: "thin",
						scrollbarColor: "var(--border) transparent",
					}}
				>
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

				{/* Load all toggle */}
				{filtered.length > 3 && (
					<button
						onClick={() => setShowAll((s) => !s)}
						className="w-full mt-3 py-2 text-[10px] font-mono text-muted border-[0.5px] border-border/50 border-dashed rounded hover:text-accent-lavender hover:border-accent-lavender/40 transition-colors tracking-widest uppercase"
					>
						{showAll
							? "[ COLLAPSE_MODULES ]"
							: `[ LOAD_ALL_MODULES +${filtered.length - 3} ]`}
					</button>
				)}
			</div>

			{/* ── Mobile: horizontal scroll carousel (< md) ───────────────── */}
			<div className="md:hidden">
				<div
					ref={trackRef}
					className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth scrollbar-none"
					role="region"
					aria-label="Project cards"
				>
					{PROJECTS.map((project, idx) => (
						<div
							key={project.name}
							className="snap-start flex-shrink-0 w-[88vw] sm:w-[75vw]"
						>
							<MobileCard project={project} index={idx} />
						</div>
					))}
				</div>
				<div
					className="flex items-center justify-center gap-2 mt-4"
					role="tablist"
				>
					{PROJECTS.map((project, idx) => (
						<button
							key={project.name}
							role="tab"
							aria-selected={activeCarouselIndex === idx}
							aria-label={`Go to project ${idx + 1}: ${project.name}`}
							onClick={() => scrollToIndex(idx)}
							className={`transition-all duration-300 rounded-sm ${
								activeCarouselIndex === idx
									? "w-5 h-[3px] bg-accent-lavender"
									: "w-[5px] h-[3px] bg-border hover:bg-muted"
							}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
