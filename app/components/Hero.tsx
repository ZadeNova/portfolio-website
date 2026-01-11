"use client";

import TimeDisplay from "./TimeDisplay";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Hero() {
	return (
		<section className="py-12 md:py-16 px-6 max-w-6xl mx-auto">
			{/* Bento Grid Layout */}
			<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-fr">
				{/* Terminal Card - whoami (spans 2 columns on md, 3 on lg) */}
				<div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg font-mono md:col-span-2 lg:col-span-2">
					<div className="space-y-4 text-sm">
						<div className="flex items-center gap-2">
							<span className="text-accent-blue font-bold">&gt;</span>
							<span className="text-foreground">Name</span>
						</div>

						<div className="pl-6">
							<span className="text-accent-lavender text-base font-semibold">
								Erfan Mohan (Zade)
							</span>
						</div>

						<div className="flex items-center gap-2 mt-5">
							<span className="text-accent-blue font-bold">&gt;</span>
							<span className="text-foreground">Education</span>
						</div>

						<div className="pl-6">
							<span className="text-foreground">
								SIT Applied Computing Fintech
							</span>
						</div>

						<div className="flex items-center gap-2 mt-5">
							<span className="text-accent-blue font-bold">&gt;</span>
							<span className="text-foreground">Role</span>
						</div>

						<div className="pl-6">
							<span className="text-foreground">
								Aspiring Software Engineer
							</span>
						</div>

						<div className="flex items-center gap-2 mt-5">
							<span className="text-accent-blue font-bold">&gt;</span>
							<span className="text-foreground">Live Status</span>
						</div>
						<div className="pl-6 space-y-1.5">
							<div className="text-muted text-xs">• Systems Architectures</div>
							<div className="text-muted text-xs">• Financial Data</div>
							<div className="text-muted text-xs">• High-Perf Backends</div>
						</div>
					</div>
				</div>

				{/* About me Card (spans 2 columns on md, 2 on lg)
				<div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg md:col-span-2 lg:col-span-3">
					<h3 className="text-sm font-semibold text-foreground mb-4 font-mono">
						About Me
					</h3>
					<p className="text-sm leading-relaxed text-foreground/90">
						I build backend systems that handle real-world constraints: latency,
						scale, and correctness.
					</p>
					<p className="text-sm leading-relaxed text-foreground/90 mt-3">
						I prefer understanding fundamentals over chasing trends, and I value
						clear reasoning over clever solutions.
					</p>
				</div> */}

				{/* About Me Card (spans 3 columns on lg) */}
				<div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg flex flex-col h-full md:col-span-2 lg:col-span-3">
					<h3 className="text-sm font-semibold text-foreground mb-4 font-mono">
						About Me
					</h3>

					{/* Narrative Section */}
					<div className="space-y-4">
						<p className="text-sm text-foreground/90 leading-relaxed">
							I’m an{" "}
							<span className="text-accent-lavender font-medium">
								Applied Fintech
							</span>{" "}
							undergraduate at SIT, exploring how software, data, and markets
							intersect. I prefer building systems that solve real financial
							constraints over chasing trends.
						</p>
						<p className="text-sm text-foreground/90 leading-relaxed">
							Outside the curriculum, I am refining my skills in Java Spring
							Boot and Go, with a long-term goal of mastering Rust for
							high-performance infrastructure.
						</p>
					</div>

					{/* Structured "Quick Specs" Section to fill the void */}
					<div className="mt-auto pt-6 border-t border-border/30">
						<div className="grid grid-cols-2 gap-y-4 font-mono text-[10px]">
							<div>
								<div className="text-muted mb-1 uppercase tracking-wider">
									Seeking
								</div>
								<div className="text-foreground">
									Seeking Summer 2026 Internships
								</div>
								<div className="text-muted/80 mt-0.5 font-sans italic">
									May — Aug 2026
								</div>
							</div>
							<div>
								<div className="text-muted mb-1 uppercase tracking-wider">
									Interests
								</div>
								<div className="text-foreground">
									Backend Engineering, Data Engineering
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Location & Time Card (spans 1 column on md, 1 on lg) */}
				<div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg md:col-span-1 lg:col-span-1">
					<TimeDisplay />
				</div>

				{/* Philosophy Card (spans 2 columns on md, 2 on lg)
				<div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg md:col-span-2 lg:col-span-3">
					<h3 className="text-sm font-semibold text-foreground mb-4 font-mono">
						Philosophy
					</h3>
					<p className="text-sm leading-relaxed text-foreground/90">
						I build backend systems that handle real-world constraints: latency,
						scale, and correctness.
					</p>
					<p className="text-sm leading-relaxed text-foreground/90 mt-3">
						I prefer understanding fundamentals over chasing trends, and I value
						clear reasoning over clever solutions.
					</p>
				</div> */}

				{/* Work Focus Card (spans 2 columns on md, 2 on lg) */}
				<div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg md:col-span-2 lg:col-span-2">
					<h3 className="text-sm font-semibold text-foreground mb-4 font-mono">
						Work Focus
					</h3>
					<p className="text-sm leading-relaxed text-foreground/90">
						My work focuses on data pipelines, financial infrastructure, and
						distributed services where reliability and performance matter.
					</p>
					<div className="mt-4 pt-4 border-t-[0.5px] border-border">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<div className="text-lg font-bold text-accent-lavender font-mono">
									4+
								</div>
								<div className="text-xs text-muted font-mono mt-1">
									Projects
								</div>
							</div>
							<div>
								<div className="text-lg font-bold text-accent-blue font-mono">
									5+
								</div>
								<div className="text-xs text-muted font-mono mt-1">
									Languages
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg flex flex-col h-full md:col-span-2 lg:col-span-1">
					<h3 className="text-sm font-semibold text-foreground mb-8 font-mono">
						Links
					</h3>

					{/* Simple Vertical Stack */}
					<div className="flex flex-col gap-3 mt-auto">
						<a
							href="https://github.com/ZadeNova"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-3 px-3 py-2.5 border-[0.5px] border-border rounded-md bg-card-bg hover:bg-accent-lavender/5 transition-all"
						>
							<svg
								viewBox="0 0 24 24"
								className="w-4 h-4 text-muted group-hover:text-accent-lavender transition-colors"
								fill="currentColor"
							>
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
							</svg>
							<span className="text-xs text-foreground font-mono">GitHub</span>
						</a>

						<a
							href="https://www.linkedin.com/in/erfanmohan-zade/"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-3 px-3 py-2.5 border-[0.5px] border-border rounded-md bg-card-bg hover:bg-accent-lavender/5 transition-all"
						>
							<svg
								viewBox="0 0 24 24"
								className="w-4 h-4 text-muted group-hover:text-accent-lavender transition-colors"
								fill="currentColor"
							>
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
							<span className="text-xs text-foreground font-mono">
								LinkedIn
							</span>
						</a>

						<a
							href="https://leetcode.com/u/ZadeNova/"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-center py-2.5 border-[0.5px] border-border rounded-md bg-card-bg hover:bg-accent-lavender/5 transition-all"
						>
							<span className="text-xs text-foreground font-mono">
								Leetcode
							</span>
						</a>

						<a
							href="/resume.pdf"
							className="group flex items-center justify-center py-2.5 border-[0.5px] border-border rounded-md bg-card-bg hover:bg-accent-lavender/5 transition-all"
						>
							<span className="text-[10px] text-muted group-hover:text-accent-lavender font-mono uppercase tracking-widest">
								Resume
							</span>
						</a>

						<a
							href="#projects"
							className="flex items-center justify-center py-3 border-[0.5px] border-border rounded-md bg-accent-lavender/5 hover:bg-accent-lavender/15 transition-all mt-2"
						>
							<span className="text-[10px] text-accent-lavender font-mono uppercase tracking-[0.2em] font-bold">
								Projects
							</span>
						</a>
					</div>
				</div>

				{/* Theme Switcher Card (spans 1 column on md, 2 on lg for better layout) */}
				<div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg md:col-span-1 lg:col-span-1">
					<ThemeSwitcher />
				</div>

				<div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg flex flex-col h-full md:col-span-2 lg:col-span-2">
					<h3 className="text-sm font-semibold text-foreground mb-4 font-mono">
						Primary Stack
					</h3>

					<div className="flex flex-wrap gap-2 mb-auto">
						{["Java", "Python", "Go", "SQL", "PostgreSQL", "Docker"].map(
							(tech) => (
								<span
									key={tech}
									className="px-2 py-1 bg-border/10 border border-border/50 rounded text-[10px] text-accent-blue font-mono uppercase"
								>
									{tech}
								</span>
							)
						)}
					</div>

					<div className="mt-6 pt-4 border-t border-border/30">
						<div className="flex justify-between items-center text-[9px] font-mono text-muted uppercase">
							<span>Specialization</span>
							<span className="text-foreground">Backend & Fintech</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
