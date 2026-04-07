interface ProjectCardProps {
	index: number;
	name: string;
	problem: string;
	techStack: string[];
	decisions: string[];
	learned: string;
	repoUrl?: string;
	liveUrl?: string;
}

export default function ProjectCard({
	index,
	name,
	problem,
	techStack,
	decisions,
	learned,
	repoUrl,
	liveUrl,
}: ProjectCardProps) {
	const cardNumber = String(index + 1).padStart(2, "0");

	return (
		<article className="card-glow relative bg-card-bg border-[0.5px] border-border border-l-2 border-l-accent-lavender rounded-r-lg flex flex-col h-full overflow-hidden font-mono">
			{/* Watermark number */}
			<span
				className="absolute top-1 left-2 text-[42px] font-bold leading-none text-border/40 select-none pointer-events-none z-0"
				aria-hidden="true"
			>
				{cardNumber}
			</span>

			<div className="relative z-10 p-5 flex flex-col h-full">
				{/* Header: title + tags side by side */}
				<div className="flex items-start justify-between gap-3 mb-3">
					<h3 className="text-[15px] font-bold text-accent-lavender leading-tight">
						{name}
					</h3>

					{/* Tech tags — top right badge cluster */}
					<div className="flex flex-wrap justify-end gap-1 flex-shrink-0 max-w-[45%]">
						{techStack.map((tech) => (
							<span
								key={tech}
								className="text-[9px] border-[0.5px] border-border rounded px-1.5 py-0.5 text-muted uppercase tracking-wide whitespace-nowrap"
							>
								{tech}
							</span>
						))}
					</div>
				</div>

				{/* Problem description */}
				<p className="text-[11px] text-muted leading-relaxed mb-4">{problem}</p>

				{/* Logic */}
				<div className="flex-grow mb-4">
					<span className="text-[9px] text-muted/60 uppercase tracking-widest block mb-2.5">
						LOGIC:
					</span>
					<ul className="space-y-2">
						{decisions.map((decision, idx) => (
							<li key={idx} className="flex items-start gap-2.5 text-[11px]">
								<span
									className="text-muted/50 mt-0.5 flex-shrink-0 font-bold"
									aria-hidden="true"
								>
									—
								</span>
								<span className="text-foreground leading-relaxed">
									{decision}
								</span>
							</li>
						))}
					</ul>
				</div>

				{/* Learned */}
				<div className="border-t border-border/30 pt-3 mt-auto">
					<p className="text-[11px] text-muted leading-relaxed">
						<span className="text-muted/60 uppercase tracking-widest text-[9px] mr-2">
							LEARNED:
						</span>
						{learned}
					</p>
				</div>

				{/* Optional links */}
				{(repoUrl ?? liveUrl) && (
					<div className="flex gap-3 mt-3 pt-3 border-t border-border/30">
						{repoUrl && (
							<a
								href={repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-[10px] text-muted hover:text-accent-lavender transition-colors border-[0.5px] border-border hover:border-accent-lavender/50 rounded px-2.5 py-1"
							>
								Source
							</a>
						)}
						{liveUrl && (
							<a
								href={liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-[10px] text-muted hover:text-accent-lavender transition-colors border-[0.5px] border-border hover:border-accent-lavender/50 rounded px-2.5 py-1"
							>
								Live
							</a>
						)}
					</div>
				)}
			</div>
		</article>
	);
}
