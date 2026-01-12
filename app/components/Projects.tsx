"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";

export default function Projects() {
	const projects = [
		{
			name: "BullBear Analysis",
			problem:
				"Perform sophisticated technical analysis and trend identification on historical stock data with production-ready visualization.",
			techStack: [
				"Python",
				"Streamlit",
				"TA-Lib",
				"Docker",
				"Pandas",
				"Plotly",
			],
			decisions: [
				"Used Docker to containerize the application, bypassing complex local setup requirements for the TA-Lib C-library",
				"Decoupled core financial analytics and indicator logic from the UI into a modular package structure for maintainability",
				"Implemented a theoretical profit maximization algorithm to validate buy/sell signals against historical data",
			],
			learned:
				"Importance of environment containerization for specialized C-dependencies and how to decouple data processing from interactive visualization in Streamlit.",
		},
		{
			name: "Class Management System Database",
			problem:
				"Efficiently manage, analyze, and visualize student records using custom high-performance data structures in a C-based CLI environment.",
			techStack: ["C", "MakeFile"],
			decisions: [
				"Utilized custom Hash Tables to achieve O(1) time complexity for student retrieval by ID, ensuring scalable lookup performance",
				"Designed and implemented a stack-based undo functionality to maintain data integrity and allow for reliable state recovery",
				"Built a role-based access control system to enforce distinct permissions between administrative Staff (Write) and Student (Read-only) users",
			],
			learned:
				"Mastered low-level memory management and custom data structure design in C while implementing automated regression testing suites with the Tcl/Expect framework.",
		},
		{
			name: "TickerLens",
			problem:
				"Develop a lightweight, one-stop financial analysis web app providing delayed(15-30min) stock metrics and a price chart",
			techStack: [
				"Next.js",
				"FastAPI",
				"Python",
				"TailwindCSS",
				"yfinance",
				"Recharts",
			],
			decisions: [
				"Implemented a benchmark comparison engine to calculate and track ticker performance against the S&P 500 (^GSPC) across YTD, 1Y, 3Y, and 5Y timeframes",
				"Utilized Pydantic models to enforce strict schema validation for stock, ETF, and historical price data, ensuring type safety between the Python backend and Next.js frontend",
				"Developed a custom date-alignment algorithm using pytz and relativedelta to accurately map historical price points to nearest trading days relative to US market hours",
			],
			learned:
				"Gained deep experience in full-stack orchestration, focusing on type-safe API design with Pydantic and interactive data visualization with Recharts.",
		},
	];

	const [currentPage, setCurrentPage] = useState(1);
	const projectsPerPage = 2;
	const totalPages = Math.ceil(projects.length / projectsPerPage);

	const startIndex = (currentPage - 1) * projectsPerPage;
	const endIndex = startIndex + projectsPerPage;
	const currentProjects = projects.slice(startIndex, endIndex);

	const goToPage = (page: number) => {
		setCurrentPage(page);
		// Scroll to top of projects section
		document
			.getElementById("projects")
			?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<section id="projects" className="py-12 md:py-16 px-6 max-w-5xl mx-auto">
			<h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-8 md:mb-12 font-mono text-center">
				Projects
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				{currentProjects.map((project, idx) => (
					<ProjectCard
						key={startIndex + idx}
						name={project.name}
						problem={project.problem}
						techStack={project.techStack}
						decisions={project.decisions}
						learned={project.learned}
					/>
				))}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex items-center justify-center gap-2 mt-8">
					<button
						onClick={() => goToPage(currentPage - 1)}
						disabled={currentPage === 1}
						className="px-4 py-2 border-[0.5px] border-border rounded-md text-foreground hover:bg-accent-lavender/10 hover:border-accent-lavender transition-all text-sm font-mono disabled:opacity-50 disabled:cursor-not-allowed"
					>
						← Prev
					</button>

					<div className="flex items-center gap-2">
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<button
								key={page}
								onClick={() => goToPage(page)}
								className={`px-4 py-2 border-[0.5px] border-border rounded-md text-sm font-mono transition-all ${
									currentPage === page
										? "bg-accent-lavender text-background border-accent-lavender"
										: "text-foreground hover:bg-accent-lavender/10 hover:border-accent-lavender"
								}`}
							>
								{page}
							</button>
						))}
					</div>

					<button
						onClick={() => goToPage(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="px-4 py-2 border-[0.5px] border-border rounded-md text-foreground hover:bg-accent-lavender/10 hover:border-accent-lavender transition-all text-sm font-mono disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Next →
					</button>
				</div>
			)}
		</section>
	);
}
