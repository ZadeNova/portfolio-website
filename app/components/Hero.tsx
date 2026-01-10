export default function Hero() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Top row: Hero (Terminal) and Quick Links side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Left: Terminal (whoami) */}
        <div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg font-mono shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-lavender/5 to-accent-blue/5 pointer-events-none rounded-lg overflow-hidden"></div>
          <div className="relative space-y-3 text-xs z-10">
            <div className="flex items-center gap-2">
              <span className="text-accent-blue font-bold">&gt;</span>
              <span className="text-foreground">whoami</span>
            </div>
            <div className="pl-4">
              <span className="text-accent-lavender text-sm font-semibold">SIT Applied Fintech</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-accent-blue font-bold">&gt;</span>
              <span className="text-foreground">role</span>
            </div>
            <div className="pl-4">
              <span className="text-foreground text-sm">Backend / Quant Dev</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-accent-blue font-bold">&gt;</span>
              <span className="text-foreground">focus</span>
            </div>
            <div className="pl-4 space-y-1">
              <div className="text-muted text-xs">• Systems Architecture</div>
              <div className="text-muted text-xs">• Financial Data</div>
              <div className="text-muted text-xs">• High-Perf Backends</div>
            </div>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg shadow-lg">
          <h3 className="text-base font-semibold text-foreground mb-4 font-mono">Quick Links</h3>
          <div className="flex flex-col gap-2.5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 border-[0.5px] border-border rounded-md text-foreground hover:bg-accent-lavender/10 hover:border-accent-lavender transition-all text-xs font-mono flex items-center gap-2 group"
            >
              <span className="text-accent-blue group-hover:text-accent-lavender">→</span>
              <span>GitHub</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 border-[0.5px] border-border rounded-md text-foreground hover:bg-accent-lavender/10 hover:border-accent-lavender transition-all text-xs font-mono flex items-center gap-2 group"
            >
              <span className="text-accent-blue group-hover:text-accent-lavender">→</span>
              <span>Resume</span>
            </a>
            <a
              href="#projects"
              className="px-4 py-2.5 border-[0.5px] border-border rounded-md text-foreground hover:bg-accent-lavender/10 hover:border-accent-lavender transition-all text-xs font-mono flex items-center gap-2 group"
            >
              <span className="text-accent-blue group-hover:text-accent-lavender">→</span>
              <span>View Projects</span>
            </a>
          </div>
          {/* Stats inline with links */}
          <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t-[0.5px] border-border">
            <div className="text-center">
              <div className="text-xl font-bold text-accent-lavender font-mono">4+</div>
              <div className="text-xs text-muted font-mono">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-accent-blue font-mono">5+</div>
              <div className="text-xs text-muted font-mono">Languages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: About Me section */}
      <div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg shadow-lg">
        <h3 className="text-base font-semibold text-foreground mb-4 font-mono">About</h3>
        <div className="space-y-3 text-xs leading-relaxed">
          <p className="text-foreground">
            I build backend systems that handle real-world constraints: latency, scale, and correctness.
          </p>
          <p className="text-foreground">
            My work focuses on data pipelines, financial infrastructure, and distributed services where reliability and performance matter.
          </p>
          <p className="text-foreground">
            I prefer understanding fundamentals over chasing trends, and I value clear reasoning over clever solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
