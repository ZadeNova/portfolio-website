"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Skeleton } from "./Skeleton";

interface ContributionDay {
	date: string;
	count: number;
	level: number;
}

interface ActivityItem {
	repo: string;
	message: string;
	sha: string;
	date: string;
}

function cellColor(level: number): string {
	if (level <= 0) return "color-mix(in srgb, var(--border) 45%, transparent)";
	const pct = [0, 30, 55, 80, 100][Math.min(level, 4)];
	return `color-mix(in srgb, var(--accent-lavender) ${pct}%, var(--border))`;
}

function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

function relativeTime(iso: string): string {
	const diffMs = Date.now() - new Date(iso).getTime();
	const mins = Math.floor(diffMs / 60_000);
	if (mins < 1) return "just now";
	if (mins < 60) return `${mins}m ago`;
	const hours = Math.floor(mins / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	if (days < 30) return `${days}d ago`;
	const months = Math.floor(days / 30);
	return `${months}mo ago`;
}

function HeatmapCell({ day }: { day: ContributionDay }) {
	return (
		<div className="relative group/cell">
			<div
				className="aspect-square w-full rounded-[2px] cursor-default"
				style={{ backgroundColor: cellColor(day.level) }}
			/>
			<div
				className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-30
				opacity-0 scale-95 group-hover/cell:opacity-100 group-hover/cell:scale-100
				transition-[opacity,transform] duration-150 whitespace-nowrap"
			>
				<div className="glass-card rounded px-2 py-1 text-[11px] font-mono leading-tight">
					<span className="text-accent-lavender font-semibold">
						{day.count}
					</span>{" "}
					contribution{day.count === 1 ? "" : "s"}
					<div className="text-muted">{formatDate(day.date)}</div>
				</div>
			</div>
		</div>
	);
}

function RecentActivityFeed({
	items,
	error,
}: {
	items: ActivityItem[] | null;
	error: boolean;
}) {
	return (
		<div className="flex flex-col h-full">
			<div className="text-[11px] text-muted uppercase tracking-widest mb-2.5">
				# recent_activity
			</div>
			{error && (
				<div className="text-[11px] text-muted font-mono">
					recent_activity: unavailable
				</div>
			)}
			{!error && !items && (
				<ul className="space-y-2.5">
					{[0, 1, 2, 3, 4].map((i) => (
						<li key={i} className="space-y-1">
							<div className="flex items-baseline justify-between gap-2">
								<Skeleton className="h-2.5 w-24" />
								<Skeleton className="h-2.5 w-12 flex-shrink-0" />
							</div>
							<Skeleton className="h-2.5 w-[85%]" />
						</li>
					))}
				</ul>
			)}
			{!error && items && items.length === 0 && (
				<div className="text-[11px] text-muted font-mono">
					no recent public activity
				</div>
			)}
			{!error && items && items.length > 0 && (
				<ul className="space-y-2.5">
					{items.map((item) => (
						<li
							key={item.sha}
							className="group/item text-[11px] font-mono leading-snug"
							title={item.message}
						>
							<div className="flex items-baseline justify-between gap-2">
								<span className="text-accent-lavender truncate">
									{item.repo}
								</span>
								<span className="text-muted text-[11px] flex-shrink-0">
									{relativeTime(item.date)}
								</span>
							</div>
							<div className="text-foreground truncate group-hover/item:text-foreground transition-colors">
								{item.message}
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default function GithubActivity() {
	const reducedMotion = !!useReducedMotion();
	const [days, setDays] = useState<ContributionDay[] | null>(null);
	const [total, setTotal] = useState(0);
	const [heatmapError, setHeatmapError] = useState(false);

	const [activity, setActivity] = useState<ActivityItem[] | null>(null);
	const [activityError, setActivityError] = useState(false);

	useEffect(() => {
		fetch("/api/github/contributions")
			.then((res) => res.json())
			.then((data) => {
				if (data.status === "success") {
					setDays(data.contributions);
					setTotal(data.total);
				} else {
					setHeatmapError(true);
				}
			})
			.catch(() => setHeatmapError(true));

		fetch("/api/github/activity")
			.then((res) => res.json())
			.then((data) => {
				if (data.status === "success") {
					setActivity(data.items);
				} else {
					setActivityError(true);
				}
			})
			.catch(() => setActivityError(true));
	}, []);

	return (
		<section
			id="activity"
			className="py-10 md:py-14 px-4 sm:px-6 max-w-[1400px] mx-auto"
			aria-label="GitHub activity"
		>
			<motion.div
				className="glass-card rounded-lg px-5 py-5"
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
					<div className="flex items-center gap-2">
						<span
							className="w-2 h-2 rounded-full bg-accent-lavender animate-pulse"
							aria-hidden="true"
						/>
						<h2 className="text-[11px] font-bold text-foreground uppercase tracking-[0.15em] font-mono">
							GITHUB_ACTIVITY
						</h2>
					</div>
					<span className="text-[11px] text-muted font-mono">
						{heatmapError ? (
							"unavailable"
						) : !days ? (
							"loading..."
						) : (
							<>
								<span className="text-accent-lavender font-semibold">
									{total.toLocaleString()}
								</span>{" "}
								CONTRIBUTIONS · LAST 12 MONTHS
							</>
						)}
					</span>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-10">
					<div className="min-w-0">
						{heatmapError && (
							<div className="text-[11px] text-muted font-mono">
								github_activity: unavailable
							</div>
						)}
						{/* Cells have a fixed minimum size so they stay legible — on
						    narrow viewports the grid overflows its container instead of
						    compressing into an unreadable smudge, and this wrapper lets
						    visitors scroll horizontally to see the full year. */}
						{!heatmapError && !days && (
							<div className="overflow-x-auto pb-1.5">
								<div
									className="grid gap-[3px] sm:gap-1"
									style={{
										gridTemplateColumns: "repeat(53, minmax(11px, 1fr))",
										gridTemplateRows: "repeat(7, minmax(0, 1fr))",
										gridAutoFlow: "column",
									}}
								>
									{Array.from({ length: 371 }).map((_, i) => (
										<Skeleton
											key={i}
											className="aspect-square w-full rounded-[2px]"
										/>
									))}
								</div>
							</div>
						)}
						{!heatmapError && days && (
							<div className="overflow-x-auto pb-1.5">
								<motion.div
									className="grid gap-[3px] sm:gap-1"
									style={{
										gridTemplateColumns: `repeat(${Math.ceil(days.length / 7)}, minmax(11px, 1fr))`,
										gridTemplateRows: "repeat(7, minmax(0, 1fr))",
										gridAutoFlow: "column",
									}}
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{
										duration: reducedMotion ? 0 : 0.6,
										delay: reducedMotion ? 0 : 0.15,
									}}
								>
									{days.map((day) => (
										<HeatmapCell key={day.date} day={day} />
									))}
								</motion.div>
							</div>
						)}
					</div>

					<div className="lg:border-l lg:border-border/20 lg:pl-8 lg:w-[280px]">
						<RecentActivityFeed items={activity} error={activityError} />
					</div>
				</div>
			</motion.div>
		</section>
	);
}
