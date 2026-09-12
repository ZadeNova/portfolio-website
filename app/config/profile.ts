// Single source of truth for personal/profile content shown across the site.
// Edit this file to update your info everywhere it's used — no browser APIs
// here, so it's safe to import from both client components and server route
// handlers (e.g. app/api/github/*).

export const GITHUB_USERNAME = "ZadeNova";

export const NAME = "Erfan Mohan";
export const DISPLAY_NAME = "Erfan Mohan (Zade)";
export const ROLE_TAGLINE = "Aspiring Backend Engineer";
export const EDUCATION = "SIT — Applied Computing (Fintech)";

export type StatusVariant = "open" | "interning" | "unavailable";
export interface StatusConfig {
	label: string;
	variant: StatusVariant;
}

export const STATUS: StatusConfig = {
	label: "Y2 Fintech Student",
	variant: "open",
};

export const SEEKING_PERIOD = "May 2027 – May 2028 · 1Y Internship";
export const FOCUS_AREAS = "Backend · DevOps · SRE";

export const QUOTES: string[] = [
	"We suffer more often in imagination than in reality.",
	"Luck is what happens when preparation meets opportunity.",
	"Today is victory over yourself of yesterday.",
	"The best revenge is massive success.",
	"There are no men like me. Only me.",
];

export const BIO_PARAGRAPH =
	"I prefer understanding systems deeply before adding abstractions. Most of my side work lives at the intersection of financial data and backend reliability. I value clear reasoning and well-designed interfaces over clever solutions.";

export interface Social {
	label: string;
	href: string;
}

export const SOCIALS: Social[] = [
	{ label: "GitHub", href: `https://github.com/${GITHUB_USERNAME}` },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/erfanmohan-zade/" },
	{ label: "LeetCode", href: "https://leetcode.com/u/ZadeNova/" },
];

export const ABOUT_ROWS: { key: string; value: string }[] = [
	{ key: "> background", value: "Applied Fintech undergraduate @ SIT" },
	{ key: "> currently", value: "Job hunting while upskilling." },
	{
		key: "> focus",
		value: "Backend Engineering · DevOps · Site Reliability Engineering",
	},
	{ key: "> goal", value: "Land a solid role and enjoy the process." },
	{ key: "> hobbies", value: "Gaming, Coding, Gym, Calisthenics, TV/Movies" },
];

export const SESSION_METRICS: {
	key: string;
	value: string;
	color: string;
}[] = [
	{ key: "AGE", value: "24 years", color: "text-muted" },
	{ key: "MBTI", value: "INTP", color: "text-muted" },
	{ key: "LEVEL", value: "Year 2 Fintech Student @ SIT", color: "text-muted" },
	{
		key: "ACTIVITY",
		value: "Currently trying to survive SIT",
		color: "text-accent-blue font-semibold",
	},
];

export const MANIFEST_CORE = [
	{ key: "languages", values: ["python", "go", "java", "C", "typescript"] },
	{ key: "databases", values: ["postgres", "mysql", "sql"] },
	{ key: "backend", values: ["fastapi", "flask", "Django", "asp.net"] },
	{ key: "frontend", values: ["next.js", "react", "tailwind"] },
	{ key: "ops", values: ["docker", "linux", "bash", "git"] },
];

export const MANIFEST_LEARNING = [
	{ key: "active", values: ["Golang"] },
	{ key: "next_queue", values: ["AWS", "terraform"] },
];

export type TechCategory =
	| "language"
	| "ops"
	| "framework"
	| "data"
	| "db"
	| "other";

export interface TechTag {
	name: string;
	category: TechCategory;
}

export type FilterTag = "ALL" | "BACKEND" | "SYSTEMS" | "FINTECH";

export interface Project {
	name: string;
	description: string;
	learned: string;
	tags: TechTag[];
	filters: FilterTag[];
	repoUrl?: string;
	liveUrl?: string;
}

export const PROJECTS: Project[] = [
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
		repoUrl: "https://github.com/ZadeNova/INF1002_P5-1_Python_Project",
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
		repoUrl: "https://github.com/ZadeNova/INF1002_C_Project",
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
		repoUrl: "https://github.com/ZadeNova/TickerLens",
	},
];
