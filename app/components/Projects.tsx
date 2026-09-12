"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitHubIcon } from "./icons";
import {
	PROJECTS,
	type Project,
	type FilterTag,
	type TechCategory,
} from "../config/profile";

// ─── Tag styles — mono font, category-coloured ───────────────────────────────

const TAG_STYLES: Record<TechCategory, string> = {
	language: "border-accent-green/40  text-accent-green",
	ops: "border-yellow-500/40 text-yellow-400",
	framework: "border-accent-blue/40 text-accent-blue",
	data: "border-accent-lavender/40 text-accent-lavender",
	db: "border-cyan-500/40  text-cyan-400",
	other: "border-border text-muted",
};

const FILTERS: FilterTag[] = ["ALL", "BACKEND", "SYSTEMS", "FINTECH"];

// ─── Icons ────────────────────────────────────────────────────────────────────

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
					<span className="text-label text-muted font-bold font-mono flex-shrink-0 w-6 tabular-nums">
						{cardNumber}
					</span>
					<span className="text-subhead font-semibold text-accent-lavender flex-shrink-0 min-w-[160px] font-sans group-hover:opacity-90 transition-opacity">
						{project.name}
					</span>
					<div className="flex gap-1.5 flex-wrap flex-1 min-w-0">
						{project.tags.slice(0, 5).map((tag) => (
							<span
								key={tag.name}
								className={`text-label border-[0.5px] rounded px-2 py-0.5 uppercase tracking-wide font-mono ${TAG_STYLES[tag.category]}`}
							>
								{tag.name}
							</span>
						))}
						{project.tags.length > 5 && (
							<span className="text-label text-muted font-mono">
								+{project.tags.length - 5}
							</span>
						)}
					</div>
					<span className="text-label text-muted font-mono flex-shrink-0 hidden lg:block max-w-[260px] truncate">
						{project.description.slice(0, 72)}…
					</span>
					<div className="flex items-center gap-2 ml-3 flex-shrink-0 text-muted">
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
						<span className="text-muted">
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
							<div className="text-label text-muted uppercase tracking-widest mb-3">
								Overview
							</div>
							<p className="text-body text-foreground leading-relaxed font-sans">
								{project.description}
							</p>
						</div>

						{/* Right — learned + tags + links */}
						<div className="p-4 md:p-5 flex flex-col gap-4">
							<div>
								<div className="text-label text-muted uppercase tracking-widest mb-2">
									Learned
								</div>
								<div
									className="rounded p-3 text-body leading-relaxed font-sans"
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
								<div className="text-label text-muted uppercase tracking-widest mb-2">
									Stack
								</div>
								<div className="flex flex-wrap gap-1.5">
									{project.tags.map((tag) => (
										<span
											key={tag.name}
											className={`text-label border-[0.5px] rounded px-2 py-0.5 uppercase tracking-wide font-mono ${TAG_STYLES[tag.category]}`}
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
										className="flex items-center gap-1.5 text-label font-mono text-accent-lavender border-[0.5px] border-accent-lavender/30 rounded px-2.5 py-1.5 hover:bg-accent-lavender/10 transition-colors tracking-wide uppercase"
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
										className="flex items-center gap-1.5 text-label font-mono text-accent-blue border-[0.5px] border-accent-blue/30 rounded px-2.5 py-1.5 hover:bg-accent-blue/10 transition-colors tracking-wide uppercase"
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
					<h3 className="text-subhead font-semibold text-accent-lavender leading-tight font-sans">
						{project.name}
					</h3>
					<div className="flex flex-wrap justify-end gap-1 max-w-[45%]">
						{project.tags.slice(0, 4).map((tag) => (
							<span
								key={tag.name}
								className={`text-label border-[0.5px] rounded px-2 py-0.5 uppercase tracking-wide font-mono ${TAG_STYLES[tag.category]}`}
							>
								{tag.name}
							</span>
						))}
					</div>
				</div>

				<p className="text-body text-foreground leading-relaxed mb-4 font-sans">
					{project.description}
				</p>

				<div
					className="rounded p-3 mb-4 text-body leading-relaxed font-sans"
					style={{
						background: "var(--glass-tint)",
						border: "0.5px solid var(--glass-border)",
						color: "var(--muted)",
					}}
				>
					<span
						className="text-label uppercase tracking-widest font-mono mr-2 text-muted"
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
								className="flex items-center gap-1.5 text-label font-mono text-accent-lavender border-[0.5px] border-accent-lavender/30 rounded px-2.5 py-1.5 hover:bg-accent-lavender/10 transition-colors tracking-wide uppercase"
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
								className="flex items-center gap-1.5 text-label font-mono text-accent-blue border-[0.5px] border-accent-blue/30 rounded px-2.5 py-1.5 hover:bg-accent-blue/10 transition-colors tracking-wide uppercase"
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

	const filterCounts = Object.fromEntries(
		FILTERS.map((f) => [
			f,
			f === "ALL"
				? PROJECTS.length
				: PROJECTS.filter((p) => p.filters.includes(f)).length,
		]),
	) as Record<FilterTag, number>;

	const rowVariants = {
		hidden: { opacity: 0, y: 12 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.45,
				delay: i * 0.08,
				ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
			},
		}),
	};

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
			className="py-10 md:py-14 min-[1920px]:py-8 px-4 sm:px-6 max-w-[max(1400px,min(94vw,1700px))] mx-auto"
			aria-label="Projects section"
		>
			{/* Header */}
			<motion.div
				className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4"
				initial={{ opacity: 0, y: -8 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.4, ease: "easeOut" }}
			>
				<div className="flex items-center gap-2">
					<span
						className="w-2 h-2 rounded-full bg-accent-lavender animate-pulse"
						aria-hidden="true"
					/>
					<h2 className="text-heading font-bold text-foreground uppercase tracking-widest font-mono">
						PROJECTS
					</h2>
					<span className="text-label text-muted font-mono ml-2 inline-flex items-center gap-1">
						<AnimatePresence mode="wait">
							<motion.span
								key={filtered.length}
								initial={{ opacity: 0, y: -4 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 4 }}
								transition={{ duration: 0.15 }}
								className="text-accent-lavender font-semibold"
							>
								{filtered.length}
							</motion.span>
						</AnimatePresence>
						MODULES INDEXED
					</span>
				</div>

				{/* Filter bar — glass pills */}
				<div
					className="flex gap-1.5 overflow-x-auto sm:overflow-visible flex-nowrap -mx-1 px-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
					role="group"
					aria-label="Filter projects"
				>
					{FILTERS.map((f) => (
						<button
							key={f}
							onClick={() => handleFilterChange(f)}
							aria-pressed={activeFilter === f}
							className={`shrink-0 text-label px-3 py-1.5 rounded-full border-[0.5px] uppercase tracking-widest font-mono transition-all duration-150 backdrop-blur-sm ${
								activeFilter === f
									? "bg-accent-lavender/20 text-accent-lavender border-accent-lavender/50 font-bold"
									: "text-muted border-border/50 hover:text-accent-lavender hover:border-accent-lavender/30"
							}`}
							style={{
								background: activeFilter === f ? undefined : "var(--glass-bg)",
							}}
						>
							{f} ({filterCounts[f]})
						</button>
					))}
				</div>
			</motion.div>

			{/* ── Desktop: accordion list ──────────────────────────────────── */}
			<div className="hidden md:block">
				<AnimatePresence mode="sync">
					<motion.div
						key={activeFilter + String(showAll)}
						className="flex flex-col gap-2"
						initial="hidden"
						animate="visible"
						exit={{ opacity: 0, transition: { duration: 0.15 } }}
					>
						{displayed.map((project, idx) => (
							<motion.div
								key={project.name}
								variants={rowVariants}
								custom={idx}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: "-40px" }}
							>
								<DesktopRow
									project={project}
									index={idx}
									isExpanded={expandedIndex === idx}
									onToggle={() => handleToggle(idx)}
								/>
							</motion.div>
						))}
					</motion.div>
				</AnimatePresence>

				{filtered.length > 3 && (
					<button
						onClick={() => setShowAll((s) => !s)}
						className="w-full mt-3 py-2 text-label font-mono text-muted border-[0.5px] border-dashed rounded hover:text-accent-lavender hover:border-accent-lavender/40 transition-colors tracking-widest uppercase"
						style={{ borderColor: "var(--glass-border)" }}
					>
						{showAll
							? "[ COLLAPSE_MODULES ]"
							: `[ LOAD_ALL_MODULES +${filtered.length - 3} ]`}
					</button>
				)}
			</div>

			{/* ── Mobile: snap scroll carousel ─────────────────────────────── */}
			<motion.div
				className="md:hidden"
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
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
			</motion.div>
		</section>
	);
}
