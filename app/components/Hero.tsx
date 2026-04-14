"use client";

import TimeDisplay from "./TimeDisplay";
import ThemeSwitcher from "./ThemeSwitcher";
import { useState, useEffect } from "react";

type StatusVariant = "open" | "interning" | "unavailable";
interface StatusConfig {
	label: string;
	variant: StatusVariant;
}
interface Social {
	label: string;
	href: string;
}

const STATUS: StatusConfig = {
	label: "Interning @ ECICS",
	variant: "interning",
};

const ABOUT_ROWS: { key: string; value: string }[] = [
	{ key: "> background", value: "Applied Fintech undergraduate @ SIT" },
	{ key: "> currently", value: "Fullstack Developer Intern @ ECICS Limited" },
	{
		key: "> focus",
		value: "Backend Engineering · DevOps · Site Reliability Engineering",
	},
	{ key: "> goal", value: "Upskill myself and enjoy the process." },
	{ key: "> hobbies", value: "Gaming, Coding, Gym, Calisthenics, TV/Movies" },
];

const MANIFEST_CORE = [
	{ key: "languages", values: ["python", "go", "java", "C", "typescript"] },
	{ key: "databases", values: ["postgres", "mysql", "sql"] },
	{ key: "backend", values: ["fastapi", "flask", "node.js", "asp.net"] },
	{ key: "frontend", values: ["next.js", "react", "tailwind"] },
	{ key: "ops", values: ["docker", "linux", "bash", "git"] },
];

const MANIFEST_RUNTIME = [
	{ key: "os_primary", value: "fedora linux" },
	{ key: "os_secondary", value: "linux mint" },
	{ key: "os_tertiary", value: "windows 11" },
	{ key: "shell", value: "bash" },
	{ key: "environment", value: "kde plasma" },
];

const MANIFEST_LEARNING = [
	{ key: "active", values: ["Golang"] },
	{ key: "next_queue", values: ["AWS", "terraform", "kubernetes"] },
];

const SOCIALS: Social[] = [
	{ label: "GitHub", href: "https://github.com/ZadeNova" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/erfanmohan-zade/" },
	{ label: "LeetCode", href: "https://leetcode.com/u/ZadeNova/" },
];

const RESUME_URL = "/resume.pdf";
const EMAIL = "your.email@example.com";

function StatusBadge({ config }: { config: StatusConfig }) {
	const dotColor: Record<StatusVariant, string> = {
		open: "bg-accent-lavender",
		interning: "bg-accent-blue",
		unavailable: "bg-muted",
	};
	const textColor: Record<StatusVariant, string> = {
		open: "text-accent-lavender",
		interning: "text-accent-blue",
		unavailable: "text-muted",
	};
	return (
		<div className="flex items-center gap-1.5 min-w-0">
			<span
				className={`w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0 ${dotColor[config.variant]}`}
				aria-hidden="true"
			/>
			<span
				className={`text-[10px] font-mono truncate ${textColor[config.variant]}`}
			>
				{config.label}
			</span>
		</div>
	);
}

function BlinkingCursor() {
	return (
		<span
			className="inline-block w-[7px] h-[13px] bg-accent-lavender ml-1 align-middle animate-pulse"
			aria-hidden="true"
		/>
	);
}

function YamlSection({
	header,
	comment,
	children,
}: {
	header: string;
	comment?: string;
	children: React.ReactNode;
}) {
	return (
		<div className="mb-3">
			{comment && (
				<div className="text-[10px] text-muted italic mb-0.5 font-mono">
					# {comment}
				</div>
			)}
			<div className="text-[11px] text-accent-lavender font-mono font-semibold mb-1">
				{header}:
			</div>
			<div className="pl-3 space-y-0.5">{children}</div>
		</div>
	);
}

function YamlKeyValue({ yamlKey, value }: { yamlKey: string; value: string }) {
	return (
		<div className="flex gap-x-2 font-mono text-[11px] leading-relaxed flex-wrap">
			<span className="text-accent-blue/80 flex-shrink-0 min-w-[100px]">
				{yamlKey}:
			</span>
			<span className="text-foreground">{value}</span>
		</div>
	);
}

function YamlKeyList({
	yamlKey,
	values,
}: {
	yamlKey: string;
	values: string[];
}) {
	return (
		<div className="flex gap-x-2 font-mono text-[11px] leading-relaxed flex-wrap">
			<span className="text-accent-blue/80 flex-shrink-0 min-w-[100px]">
				{yamlKey}:
			</span>
			<span className="text-foreground/90">
				[{" "}
				{values.map((v, i) => (
					<span key={v}>
						<span className="text-accent-blue/70">&quot;{v}&quot;</span>
						{i < values.length - 1 && <span className="text-muted">, </span>}
					</span>
				))}{" "}
				]
			</span>
		</div>
	);
}

function SessionMetrics() {
	const metrics = [
		{ key: "AGE", value: "24 years", color: "text-foreground" },
		{ key: "MBTI", value: "INTP", color: "text-foreground" },
		{ key: "LEVEL", value: "Year 1 Student @ SIT", color: "text-foreground" },
		{
			key: "ACTIVITY",
			value: "Currently trying to survive SIT",
			color: "text-accent-blue font-semibold",
		},
	];
	return (
		<div className="space-y-2">
			<div className="text-[9px] text-muted uppercase tracking-widest mb-3 font-mono">
				SESSION_METRICS
			</div>
			<div className="space-y-1.5">
				{metrics.map((m) => (
					<div
						key={m.key}
						className="flex font-mono text-[11px] leading-relaxed"
					>
						<span className="text-accent-blue/90 w-[72px] flex-shrink-0">
							{m.key}
						</span>
						<span className="text-muted/60 mr-2">:</span>
						<span className={m.color}>{m.value}</span>
					</div>
				))}
			</div>
			<div className="flex gap-1.5 pt-3" aria-hidden="true">
				<span className="w-2.5 h-2.5 rounded-full bg-[#f38ba8]" />
				<span className="w-2.5 h-2.5 rounded-full bg-[#fab387]" />
				<span className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]" />
				<span className="w-2.5 h-2.5 rounded-full bg-[#94e2d5]" />
				<span className="w-2.5 h-2.5 rounded-full bg-[#89b4fa]" />
				<span className="w-2.5 h-2.5 rounded-full bg-[#cba6f7]" />
			</div>
		</div>
	);
}

function LeetCodeStats() {
	const [stats, setStats] = useState({
		solved: "loading...",
		ranking: "loading...",
		acceptance: "loading...",
	});
	useEffect(() => {
		fetch("/api/leetcode")
			.then((res) => res.json())
			.then((data) => {
				if (data.status === "success") {
					setStats({
						solved: data.totalSolved.toString(),
						ranking: data.ranking.toLocaleString(),
						acceptance: `${data.acceptanceRate}%`,
					});
				} else {
					setStats({ solved: "err", ranking: "err", acceptance: "err" });
				}
			})
			.catch(() =>
				setStats({ solved: "err", ranking: "err", acceptance: "err" }),
			);
	}, []);
	return (
		<YamlSection header="leetcode">
			<YamlKeyValue yamlKey="solved" value={stats.solved} />
			<YamlKeyValue yamlKey="ranking" value={stats.ranking} />
			<YamlKeyValue yamlKey="acceptance" value={stats.acceptance} />
		</YamlSection>
	);
}

export default function Hero() {
	const handleCopyEmail = async (): Promise<void> => {
		try {
			await navigator.clipboard.writeText(EMAIL);
		} catch {
			const el = document.createElement("textarea");
			el.value = EMAIL;
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);
		}
	};

	return (
		<section
			className="py-10 md:py-14 px-4 sm:px-6 max-w-[1400px] mx-auto"
			aria-label="Portfolio hero section"
		>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
				{/* Col 1 — Terminal card */}
				<div className="glass-card md:col-span-3 rounded-r-lg border-l-2 border-l-accent-lavender overflow-hidden font-mono flex flex-col">
					<div className="flex items-center justify-between px-3 py-2 bg-background/40 border-b border-border/40 gap-2 flex-shrink-0">
						<div
							className="flex items-center gap-1.5 flex-shrink-0"
							aria-hidden="true"
						>
							<span
								className="w-2.5 h-2.5 rounded-full"
								style={{ background: "#f38ba8" }}
							/>
							<span
								className="w-2.5 h-2.5 rounded-full"
								style={{ background: "#f9e2af" }}
							/>
							<span
								className="w-2.5 h-2.5 rounded-full"
								style={{ background: "#a6e3a1" }}
							/>
						</div>
						<span className="text-[10px] text-muted tracking-wide flex-shrink-0 hidden sm:block">
							zade@portfolio:~
						</span>
						<div className="flex items-center gap-2 flex-shrink-0">
							<StatusBadge config={STATUS} />
						</div>
					</div>

					<div className="p-4 flex-1 flex flex-col">
						<div className="mb-6">
							<div className="text-[10px] font-semibold mb-0.5">
								<span className="text-muted">zade@portfolio</span>
								<span className="text-muted/70">:~$ </span>
								<span className="text-accent-lavender">cat name.txt</span>
							</div>
							<div className="text-sm font-semibold text-accent-lavender">
								Erfan Mohan (Zade)
							</div>
						</div>

						<div className="mb-6">
							<div className="text-[10px] font-semibold mb-0.5">
								<span className="text-muted">zade@portfolio</span>
								<span className="text-muted/70">:~$ </span>
								<span className="text-accent-lavender">cat education.txt</span>
							</div>
							<div className="text-[11px] text-foreground">
								SIT Applied Computing Fintech
							</div>
						</div>

						<div className="mb-6">
							<div className="text-[10px] font-semibold mb-0.5">
								<span className="text-muted">zade@portfolio</span>
								<span className="text-muted/70">:~$ </span>
								<span className="text-accent-lavender">cat role.txt</span>
							</div>
							<div className="text-[11px] text-foreground">
								Aspiring Backend Engineer
							</div>
						</div>

						<div className="mb-6">
							<div className="text-[10px] font-semibold mb-0.5">
								<span className="text-muted">zade@portfolio</span>
								<span className="text-muted/70">:~$ </span>
								<span className="text-accent-lavender">cat building.txt</span>
							</div>
							<div className="text-[11px] text-foreground flex items-center flex-wrap gap-1">
								Something cool hopefully...
								<BlinkingCursor />
							</div>
						</div>

						<div className="border-t border-border/30 pt-4 mt-auto">
							<SessionMetrics />
						</div>
					</div>
				</div>

				{/* Col 2 — About Me */}
				<div className="glass-card rounded-lg md:col-span-6 font-mono">
					<div className="p-4 sm:p-5 flex flex-col h-full">
						<div className="text-[9px] text-muted uppercase tracking-widest mb-4">
							about_me.txt
						</div>
						<div className="space-y-2.5 mb-4">
							{ABOUT_ROWS.map(({ key, value }) => (
								<div
									key={key}
									className="flex flex-col sm:flex-row sm:gap-2 text-[11px] leading-relaxed"
								>
									<span className="text-accent-blue/90 flex-shrink-0 sm:w-28">
										{key}
									</span>
									<span className="text-foreground pl-2 sm:pl-0">{value}</span>
								</div>
							))}
						</div>
						<div className="border-t border-border/30 pt-3 mb-4">
							<p className="text-[11px] text-muted leading-relaxed italic">
								I prefer understanding systems deeply before adding
								abstractions. Most of my side work lives at the intersection of
								financial data and backend reliability. I value clear reasoning
								and well-designed interfaces over clever solutions.
							</p>
						</div>
						<div className="mt-auto border-t border-border/30 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div>
								<div className="text-[9px] text-muted uppercase tracking-widest mb-1">
									Seeking
								</div>
								<div className="text-[11px] text-foreground">
									May 2027 - May 2028 1Y Internship
								</div>
								<div className="text-[10px] text-muted italic mt-0.5">
									May 2027 — May 2028
								</div>
							</div>
							<div>
								<div className="text-[9px] text-muted uppercase tracking-widest mb-1">
									Interests
								</div>
								<div className="text-[11px] text-foreground">
									Backend · DevOps · SRE · Fintech
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Col 3 — Time + Theme */}
				<div className="md:col-span-3 grid grid-cols-2 gap-4 md:grid-cols-1 md:flex md:flex-col">
					<div className="glass-card rounded-lg p-4 font-mono flex-shrink-0">
						<TimeDisplay />
					</div>
					<div className="glass-card rounded-lg p-4 font-mono flex-1">
						<ThemeSwitcher />
					</div>
				</div>
			</div>

			{/* YAML Stack Manifest */}
			<div className="glass-card rounded-lg p-4 sm:p-5 mb-4 font-mono">
				<div className="flex items-center justify-between mb-4 pb-3 border-b border-border/30">
					<div className="flex items-center gap-2">
						<span
							className="w-2 h-2 rounded-full bg-accent-lavender animate-pulse"
							aria-hidden="true"
						/>
						<span className="text-[11px] text-foreground font-bold tracking-[0.15em] uppercase">
							TECH_STACK
						</span>
					</div>
					<span className="text-[10px] text-muted hidden sm:block">
						stack.manifest.yml
					</span>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
					<div>
						<YamlSection header="core_services" comment="primary tech stack">
							{MANIFEST_CORE.map((row) => (
								<YamlKeyList
									key={row.key}
									yamlKey={row.key}
									values={row.values}
								/>
							))}
						</YamlSection>
					</div>
					<div className="md:border-l md:border-border/20 md:pl-6">
						<YamlSection header="runtime_env" comment="local dev environment">
							{MANIFEST_RUNTIME.map((row) => (
								<YamlKeyValue
									key={row.key}
									yamlKey={row.key}
									value={row.value}
								/>
							))}
						</YamlSection>
					</div>
					<div className="md:border-l md:border-border/20 md:pl-6">
						<YamlSection header="experimental_learning" comment="in progress">
							{MANIFEST_LEARNING.map((row) => (
								<YamlKeyList
									key={row.key}
									yamlKey={row.key}
									values={row.values}
								/>
							))}
						</YamlSection>
						<div className="mt-3 border-t border-border/20 pt-3">
							<div className="text-[9px] text-muted uppercase tracking-widest mb-1.5">
								# live_metrics
							</div>
							<LeetCodeStats />
						</div>
					</div>
				</div>
			</div>

			{/* Connect Bar */}
			<div className="glass-card rounded-lg px-4 sm:px-5 py-3 font-mono">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
					<div className="flex items-center gap-2 flex-wrap">
						<span className="text-[9px] text-muted uppercase tracking-widest flex-shrink-0">
							01_Socials
						</span>
						<div className="flex gap-2 flex-wrap">
							{SOCIALS.map((social) => (
								<a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-[10px] text-foreground border-[0.5px] border-border rounded px-2.5 py-1.5 hover:border-accent-lavender hover:text-accent-lavender transition-colors"
								>
									{social.label}
								</a>
							))}
						</div>
					</div>
					<div
						className="hidden sm:block w-px h-5 bg-border/40 flex-shrink-0"
						aria-hidden="true"
					/>
					<div className="flex items-center gap-2 flex-wrap">
						<span className="text-[9px] text-muted uppercase tracking-widest flex-shrink-0">
							02_Assets
						</span>
						<div className="flex gap-2 flex-wrap">
							<a
								href={RESUME_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="text-[10px] text-accent-lavender border-[0.5px] border-accent-lavender/40 rounded px-2.5 py-1.5 hover:bg-accent-lavender/10 transition-colors"
							>
								Download_Resume
							</a>
							<a
								href="#projects"
								className="text-[10px] text-accent-lavender border-[0.5px] border-accent-lavender/40 rounded px-2.5 py-1.5 hover:bg-accent-lavender/10 transition-colors"
							>
								View_Projects
							</a>
						</div>
					</div>
					<div
						className="hidden sm:block w-px h-5 bg-border/40 flex-shrink-0"
						aria-hidden="true"
					/>
					<div className="flex items-center gap-2 flex-wrap">
						<span className="text-[9px] text-muted uppercase tracking-widest flex-shrink-0">
							03_Email
						</span>
						<button
							onClick={handleCopyEmail}
							className="text-[10px] font-bold text-background bg-accent-lavender rounded px-3 py-1.5 hover:opacity-90 active:scale-[0.98] transition-all"
							aria-label="Copy email address to clipboard"
						>
							Copy_Email
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
