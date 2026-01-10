interface ProjectCardProps {
  name: string;
  problem: string;
  techStack: string[];
  decisions: string[];
  learned: string;
}

export default function ProjectCard({
  name,
  problem,
  techStack,
  decisions,
  learned,
}: ProjectCardProps) {
  return (
    <article className="card-glow border-[0.5px] border-border rounded-md p-6 bg-card-bg h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-foreground font-mono">{name}</h3>
        {/* Architecture diagram placeholder icon */}
        <div className="w-10 h-10 border-[0.5px] border-border rounded-md flex items-center justify-center text-muted text-xs hover:border-accent-blue transition-colors cursor-default">
          [ ]
        </div>
      </div>
      
      <p className="text-muted mb-5 text-sm leading-relaxed">{problem}</p>
      
      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {techStack.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 border-[0.5px] border-border rounded-md text-xs text-accent-blue font-mono hover:bg-accent-blue/10 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Logic Summary */}
      <div className="mb-5 flex-grow">
        <span className="text-xs font-medium text-muted block mb-3 font-mono">
          LOGIC:
        </span>
        <ul className="list-none text-xs text-foreground space-y-2">
          {decisions.map((decision, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-accent-lavender mt-1">•</span>
              <span className="leading-relaxed">{decision}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t-[0.5px] border-border">
        <span className="text-xs font-medium text-muted font-mono">LEARNED: </span>
        <span className="text-xs text-foreground leading-relaxed">{learned}</span>
      </div>
    </article>
  );
}
