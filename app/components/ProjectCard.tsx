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
    <article className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground font-mono mb-3">{name}</h3>
        <p className="text-muted text-sm leading-relaxed">{problem}</p>
      </div>
      
      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {techStack.map((tech, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 border-[0.5px] border-border rounded text-xs text-accent-blue font-mono hover:bg-accent-blue/10 hover:border-accent-blue/50 transition-colors"
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
        <ul className="list-none text-xs text-foreground space-y-2.5">
          {decisions.map((decision, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-accent-lavender mt-1 font-bold">•</span>
              <span className="leading-relaxed">{decision}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t-[0.5px] border-border mt-auto">
        <span className="text-xs font-medium text-muted font-mono">LEARNED: </span>
        <span className="text-xs text-foreground leading-relaxed">{learned}</span>
      </div>
    </article>
  );
}
