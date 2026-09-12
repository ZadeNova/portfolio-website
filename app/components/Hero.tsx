"use client";

import TimeDisplay from "./TimeDisplay";
import { Skeleton } from "./Skeleton";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
	DISPLAY_NAME,
	ROLE_TAGLINE,
	EDUCATION,
	STATUS,
	SEEKING_PERIOD,
	FOCUS_AREAS,
	BIO_PARAGRAPH,
	ABOUT_ROWS,
	SESSION_METRICS,
	MANIFEST_CORE,
	MANIFEST_LEARNING,
	SOCIALS,
	QUOTES,
	type StatusConfig,
	type StatusVariant,
} from "../config/profile";

const SCRAMBLE_CHARS = "!@#$%^&*_+X0<>?/\\|";

function useScramble(originalText: string) {
	const [displayText, setDisplayText] = useState(originalText);
	const [isScrambling, setIsScrambling] = useState(false);
	const rafRef = useRef<number | null>(null);
	const startRef = useRef<number>(0);
	const HOLD = 80;
	const DURATION = 300;

	const scramble = useCallback(() => {
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		startRef.current = Date.now();
		setIsScrambling(true);
		const tick = () => {
			const elapsed = Date.now() - startRef.current;
			if (elapsed < HOLD) {
				setDisplayText(
					originalText
						.split("")
						.map((ch) => {
							if (ch === " ") return " ";
							return SCRAMBLE_CHARS[
								Math.floor(Math.random() * SCRAMBLE_CHARS.length)
							];
						})
						.join(""),
				);
				rafRef.current = requestAnimationFrame(tick);
				return;
			}
			const progress = Math.min((elapsed - HOLD) / (DURATION - HOLD), 1);
			const revealed = Math.floor(progress * originalText.length);
			setDisplayText(
				originalText
					.split("")
					.map((ch, i) => {
						if (ch === " ") return " ";
						if (i < revealed) return ch;
						return SCRAMBLE_CHARS[
							Math.floor(Math.random() * SCRAMBLE_CHARS.length)
						];
					})
					.join(""),
			);
			if (progress < 1) {
				rafRef.current = requestAnimationFrame(tick);
			} else {
				setIsScrambling(false);
			}
		};
		rafRef.current = requestAnimationFrame(tick);
	}, [originalText]);

	const reset = useCallback(() => {
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		setDisplayText(originalText);
		setIsScrambling(false);
	}, [originalText]);

	useEffect(
		() => () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		},
		[],
	);

	return { displayText, isScrambling, scramble, reset };
}

function ScrambleText({ text }: { text: string }) {
	const { displayText, isScrambling, scramble, reset } = useScramble(text);
	return (
		<span
			onMouseEnter={scramble}
			onMouseLeave={reset}
			className={isScrambling ? "scramble-active" : "scramble-idle"}
		>
			{displayText}
		</span>
	);
}

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
				className={`text-[11px] font-mono truncate ${textColor[config.variant]}`}
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
				<div className="text-[11px] text-muted italic mb-0.5 font-mono">
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

function YamlKeyList({
	yamlKey,
	values,
}: {
	yamlKey: string;
	values: string[];
}) {
	return (
		<div className="flex gap-x-2 font-mono text-[11px] leading-relaxed flex-wrap">
			<span className="text-accent-blue flex-shrink-0 min-w-[100px]">
				{yamlKey}:
			</span>
			<span className="text-foreground">
				[{" "}
				{values.map((v, i) => (
					<span key={v}>
						<span className="text-accent-blue">
							&quot;<ScrambleText text={v} />&quot;
						</span>
						{i < values.length - 1 && <span className="text-muted">, </span>}
					</span>
				))}{" "}
				]
			</span>
		</div>
	);
}

function SessionMetrics() {
	return (
		<div className="space-y-2">
			<div className="text-[11px] text-muted uppercase tracking-widest mb-3 font-mono">
				SESSION_METRICS
			</div>
			<div className="space-y-1.5">
				{SESSION_METRICS.map((m) => (
					<div
						key={m.key}
						className="flex font-mono text-[11px] leading-relaxed"
					>
						<span className="text-accent-blue w-[72px] flex-shrink-0">
							{m.key}
						</span>
						<span className="text-muted mr-2">:</span>
						<span className={m.color}>{m.value}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function QuoteCard() {
	const [quote, setQuote] = useState(QUOTES[0]);

	useEffect(() => {
		setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
	}, []);

	return (
		<div className="flex flex-col h-full">
			<div className="text-[11px] text-muted uppercase tracking-widest mb-3 font-mono">
				quote.txt
			</div>
			<p className="text-[13px] text-foreground leading-relaxed font-sans italic">
				&ldquo;{quote}&rdquo;
			</p>
		</div>
	);
}

function TerminalTypingRows({
	rows,
	reducedMotion,
}: {
	rows: { key: string; value: string }[];
	reducedMotion: boolean;
}) {
	const [completedRows, setCompletedRows] = useState(0);
	const [currentChar, setCurrentChar] = useState(0);
	const CHAR_DELAY = 22;
	const ROW_PAUSE = 180;

	useEffect(() => {
		if (reducedMotion || completedRows >= rows.length) return;
		const value = rows[completedRows].value;
		if (currentChar < value.length) {
			const t = setTimeout(() => setCurrentChar((c) => c + 1), CHAR_DELAY);
			return () => clearTimeout(t);
		}
		const t = setTimeout(() => {
			setCompletedRows((r) => r + 1);
			setCurrentChar(0);
		}, ROW_PAUSE);
		return () => clearTimeout(t);
	}, [completedRows, currentChar, rows, reducedMotion]);

	if (reducedMotion) {
		return (
			<div className="space-y-2.5 mb-4">
				{rows.map(({ key, value }) => (
					<div
						key={key}
						className="flex flex-col sm:flex-row sm:gap-2 leading-relaxed"
					>
						<span className="text-[11px] text-accent-blue flex-shrink-0 sm:w-28">{key}</span>
						<span className="text-[13px] text-foreground pl-2 sm:pl-0">{value}</span>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="space-y-2.5 mb-4">
			{rows.map(({ key, value }, i) => {
				if (i > completedRows) return null;
				const isTyping = i === completedRows;
				const display = isTyping ? value.slice(0, currentChar) : value;
				return (
					<div
						key={key}
						className="flex flex-col sm:flex-row sm:gap-2 leading-relaxed"
					>
						<span className="text-[11px] text-accent-blue flex-shrink-0 sm:w-28">{key}</span>
						<span className="text-[13px] text-foreground pl-2 sm:pl-0">
							{display}
							{isTyping && <span className="cursor-blink" aria-hidden="true" />}
						</span>
					</div>
				);
			})}
		</div>
	);
}

// GitHub's official linguist colors (github/linguist colors.yml) — these are
// tuned to read clearly on both GitHub's light and dark UIs, so they hold up
// across our light and dark themes too. Anything not in the map (including
// the aggregated "other" bucket) falls back to the theme's --muted token so
// it always blends with whichever palette is active instead of clashing.
const GITHUB_LANG_COLORS: Record<string, string> = {
	Python: "#3572A5",
	JavaScript: "#f1e05a",
	TypeScript: "#3178c6",
	HTML: "#e34c26",
	CSS: "#563d7c",
	SCSS: "#c6538c",
	"C#": "#178600",
	C: "#555555",
	"C++": "#f34b7d",
	Java: "#b07219",
	Go: "#00ADD8",
	Shell: "#89e051",
	Dockerfile: "#384d54",
	PHP: "#4F5D95",
	Ruby: "#701516",
	Rust: "#dea584",
	Vue: "#41b883",
	Makefile: "#427819",
	PowerShell: "#012456",
	"Jupyter Notebook": "#DA5B0B",
};

function langColor(name: string): string {
	return GITHUB_LANG_COLORS[name] ?? "var(--muted)";
}

function LanguageBreakdownBar() {
	const reducedMotion = !!useReducedMotion();
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true });
	const [breakdown, setBreakdown] = useState<
		{ name: string; percent: number }[] | null
	>(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch("/api/github/languages")
			.then((res) => res.json())
			.then((data) => {
				if (data.status === "success") setBreakdown(data.breakdown);
				else setError(true);
			})
			.catch(() => setError(true));
	}, []);

	return (
		<div ref={ref} className="mt-3 border-t border-border/20 pt-3">
			<div className="text-[11px] text-muted uppercase tracking-widest mb-1.5">
				# language_breakdown (live, by bytes)
			</div>
			{error ? (
				<div className="text-[11px] text-muted font-mono">unavailable</div>
			) : !breakdown ? (
				<div>
					<Skeleton className="h-2 w-full rounded-full" />
					<div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
						{[0, 1, 2, 3].map((i) => (
							<span key={i} className="flex items-center gap-1.5">
								<Skeleton className="w-2 h-2 rounded-full" />
								<Skeleton className="h-2.5 w-14" />
							</span>
						))}
					</div>
				</div>
			) : (
				<div>
					<div className="flex h-2 rounded-full overflow-hidden bg-border/20">
						{breakdown.map((lang, i) => (
							<motion.div
								key={lang.name}
								className="h-full"
								style={{ backgroundColor: langColor(lang.name) }}
								initial={{ width: 0 }}
								animate={inView ? { width: `${lang.percent}%` } : { width: 0 }}
								transition={
									reducedMotion
										? { duration: 0 }
										: { duration: 0.8, delay: i * 0.08, ease: "easeOut" }
								}
							/>
						))}
					</div>
					<div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
						{breakdown.map((lang) => (
							<div
								key={lang.name}
								className="flex items-center gap-1.5 font-mono text-[11px]"
							>
								<span
									className="w-1.5 h-1.5 rounded-full flex-shrink-0"
									style={{ backgroundColor: langColor(lang.name) }}
									aria-hidden="true"
								/>
								<span className="text-muted">{lang.name}</span>
								<span className="text-muted">{lang.percent.toFixed(1)}%</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default function Hero() {
	const shouldReduceMotion = useReducedMotion();

	const panelVariants = {
		hidden: { opacity: 0, y: 18 },
		visible: (delay: number) => ({
			opacity: 1,
			y: 0,
			transition: shouldReduceMotion
				? { duration: 0 }
				: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
		}),
	};

	return (
		<section
			id="home"
			className="py-10 md:py-14 px-4 sm:px-6 max-w-[1400px] mx-auto"
			aria-label="Portfolio hero section"
		>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
				{/* Col 1 — Terminal card */}
				<motion.div
					className="glass-card md:col-span-3 rounded-r-lg border-l-2 border-l-accent-lavender overflow-hidden font-mono flex flex-col"
					variants={panelVariants}
					initial="hidden"
					animate="visible"
					custom={0}
				>
					<div className="flex items-center justify-between px-3 py-2 bg-background/40 border-b border-border/40 gap-2 flex-shrink-0">
						<span className="text-[11px] text-muted tracking-wide flex-shrink-0">
							zade@portfolio:~
						</span>
						<div className="flex items-center gap-2 flex-shrink-0">
							<StatusBadge config={STATUS} />
						</div>
					</div>

					<div className="p-4 flex-1 flex flex-col">
						<div className="mb-5">
							<div className="text-base font-semibold text-accent-lavender leading-snug">
								{DISPLAY_NAME}
							</div>
							<div className="text-[13px] text-foreground font-medium mt-1">
								{ROLE_TAGLINE}
							</div>
						</div>

						<div className="space-y-3.5">
							<div>
				<div className="text-[11px] text-muted uppercase tracking-widest mb-0.5">
									education
								</div>
								<div className="text-[13px] text-foreground">
									{EDUCATION}
								</div>
							</div>

							<div>
								<div className="text-[11px] text-muted uppercase tracking-widest mb-0.5">
									currently building
								</div>
								<div className="text-[13px] text-foreground flex items-center flex-wrap gap-1">
									Something cool, hopefully...
									<BlinkingCursor />
								</div>
							</div>
						</div>

						<div className="border-t border-border/30 pt-4 mt-auto">
							<SessionMetrics />
						</div>
					</div>
				</motion.div>

				{/* Col 2 — About Me */}
				<motion.div
					className="glass-card rounded-lg md:col-span-6 font-mono"
					variants={panelVariants}
					initial="hidden"
					animate="visible"
					custom={0.15}
				>
					<div className="p-4 sm:p-5 flex flex-col h-full">
						<div className="text-[11px] text-muted uppercase tracking-widest mb-4">
							about_me.txt
						</div>
						<TerminalTypingRows
							rows={ABOUT_ROWS}
							reducedMotion={!!shouldReduceMotion}
						/>
						<div className="border-t border-border/30 pt-3 mb-4">
							<p className="text-[13px] text-foreground leading-relaxed font-sans">
								{BIO_PARAGRAPH}
							</p>
						</div>
						<div className="mt-auto border-t border-border/30 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div>
								<div className="text-[11px] text-muted uppercase tracking-widest mb-1">
									Seeking
								</div>
						<div className="text-[13px] text-foreground">
									{SEEKING_PERIOD}
								</div>
							</div>
							<div>
								<div className="text-[11px] text-muted uppercase tracking-widest mb-1">
									Interests
								</div>
								<div className="text-[13px] text-foreground">
									{FOCUS_AREAS}
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Col 3 — Time + Theme */}
				<motion.div
					className="md:col-span-3 grid grid-cols-2 gap-4 md:grid-cols-1 md:flex md:flex-col"
					variants={panelVariants}
					initial="hidden"
					animate="visible"
					custom={0.30}
				>
					<div className="glass-card rounded-lg p-4 font-mono flex-shrink-0">
						<TimeDisplay />
					</div>
					<div className="glass-card rounded-lg p-4 font-mono flex-1">
						<QuoteCard />
					</div>
				</motion.div>
			</div>

			{/* YAML Stack Manifest */}
			<motion.div
				className="glass-card rounded-lg p-4 sm:p-5 mb-4 font-mono"
				variants={panelVariants}
				initial="hidden"
				animate="visible"
				custom={0.45}
			>
				<div className="flex items-center justify-between mb-4 pb-3 border-b border-border/30">
					<div className="flex items-center gap-2">
						<span
							className="w-2 h-2 rounded-full bg-accent-lavender animate-pulse"
							aria-hidden="true"
						/>
						<span className="text-[11px] text-foreground font-bold tracking-[0.15em] uppercase">
							<ScrambleText text="TECH_STACK" />
						</span>
					</div>
					<span className="text-[11px] text-muted hidden sm:block">
						<ScrambleText text="stack.manifest.yml" />
					</span>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
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
					<div className="md:border-l md:border-border/20 md:pl-8">
						<YamlSection header="experimental_learning" comment="in progress">
							{MANIFEST_LEARNING.map((row) => (
								<YamlKeyList
									key={row.key}
									yamlKey={row.key}
									values={row.values}
								/>
							))}
						</YamlSection>
						<LanguageBreakdownBar />
					</div>
				</div>
			</motion.div>

			{/* Connect Bar */}
			<motion.div
				className="glass-card rounded-lg px-4 sm:px-5 py-3 font-mono"
				variants={panelVariants}
				initial="hidden"
				animate="visible"
				custom={0.60}
			>
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
					<div className="flex items-center gap-2 flex-wrap">
						<span className="text-[11px] text-muted uppercase tracking-widest flex-shrink-0">
							01_Socials
						</span>
						<div className="flex gap-2 flex-wrap">
							{SOCIALS.map((social) => (
								<a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-[11px] text-foreground border-[0.5px] border-border rounded px-2.5 py-1.5 hover:border-accent-lavender hover:text-accent-lavender transition-colors"
								>
									<ScrambleText text={social.label} />
								</a>
							))}
						</div>
					</div>
					<div
						className="hidden sm:block w-px h-5 bg-border/40 flex-shrink-0"
						aria-hidden="true"
					/>
					<div className="flex items-center gap-2 flex-wrap">
						<span className="text-[11px] text-muted uppercase tracking-widest flex-shrink-0">
							02_Assets
						</span>
						<div className="flex gap-2 flex-wrap">
							<a
								href="#projects"
								className="text-[11px] text-accent-lavender border-[0.5px] border-accent-lavender/40 rounded px-2.5 py-1.5 hover:bg-accent-lavender/10 transition-colors"
							>
								View_Projects
							</a>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
