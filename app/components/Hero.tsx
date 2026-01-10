"use client";

import TimeDisplay from "./TimeDisplay";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Hero() {
  return (
    <section className="py-12 md:py-16 px-6 max-w-6xl mx-auto">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-fr">
        {/* Terminal Card - whoami (spans 2 columns on md, 3 on lg) */}
        <div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg font-mono md:col-span-2 lg:col-span-3">
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-accent-blue font-bold">&gt;</span>
              <span className="text-foreground">whoami</span>
            </div>
            <div className="pl-6">
              <span className="text-accent-lavender text-base font-semibold">SIT Applied Fintech</span>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <span className="text-accent-blue font-bold">&gt;</span>
              <span className="text-foreground">role</span>
            </div>
            <div className="pl-6">
              <span className="text-foreground">Backend / Quant Dev</span>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <span className="text-accent-blue font-bold">&gt;</span>
              <span className="text-foreground">focus</span>
            </div>
            <div className="pl-6 space-y-1.5">
              <div className="text-muted text-xs">• Systems Architecture</div>
              <div className="text-muted text-xs">• Financial Data</div>
              <div className="text-muted text-xs">• High-Perf Backends</div>
            </div>
          </div>
        </div>

        {/* Location & Time Card (spans 1 column on md, 1 on lg) */}
        <div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg md:col-span-1 lg:col-span-1">
          <TimeDisplay />
        </div>

        {/* Theme Switcher Card (spans 1 column on md, 2 on lg for better layout) */}
        <div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg md:col-span-1 lg:col-span-2">
          <ThemeSwitcher />
        </div>

        {/* Philosophy Card (spans 2 columns on md, 2 on lg) */}
        <div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg md:col-span-2 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4 font-mono">Philosophy</h3>
          <p className="text-sm leading-relaxed text-foreground/90">
            I build backend systems that handle real-world constraints: latency, scale, and correctness.
          </p>
          <p className="text-sm leading-relaxed text-foreground/90 mt-3">
            I prefer understanding fundamentals over chasing trends, and I value clear reasoning over clever solutions.
          </p>
        </div>

        {/* Work Focus Card (spans 2 columns on md, 2 on lg) */}
        <div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg md:col-span-2 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4 font-mono">Work Focus</h3>
          <p className="text-sm leading-relaxed text-foreground/90">
            My work focuses on data pipelines, financial infrastructure, and distributed services where reliability and performance matter.
          </p>
          <div className="mt-4 pt-4 border-t-[0.5px] border-border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-lg font-bold text-accent-lavender font-mono">4+</div>
                <div className="text-xs text-muted font-mono mt-1">Projects</div>
              </div>
              <div>
                <div className="text-lg font-bold text-accent-blue font-mono">5+</div>
                <div className="text-xs text-muted font-mono mt-1">Languages</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links Section - Horizontal Buttons */}
      <div className="mt-4 md:mt-6">
        <div className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg">
          <h3 className="text-sm font-semibold text-foreground mb-4 font-mono">Links</h3>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-button group flex items-center gap-2.5 px-4 py-2.5 rounded-md border-[0.5px] border-border bg-card-bg hover:bg-accent-lavender/5"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted group-hover:text-accent-lavender transition-colors" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-xs text-foreground group-hover:text-accent-lavender transition-colors font-mono">GitHub</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-button group flex items-center gap-2.5 px-4 py-2.5 rounded-md border-[0.5px] border-border bg-card-bg hover:bg-accent-lavender/5"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted group-hover:text-accent-lavender transition-colors" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-xs text-foreground group-hover:text-accent-lavender transition-colors font-mono">LinkedIn</span>
            </a>

            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-button group flex items-center gap-2.5 px-4 py-2.5 rounded-md border-[0.5px] border-border bg-card-bg hover:bg-accent-lavender/5"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted group-hover:text-accent-lavender transition-colors" fill="currentColor">
                <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662L2.102 13.222c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.676-4.676c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.038-1.901l-2.609-2.636a5.82 5.82 0 0 0-3.91-1.569 5.812 5.812 0 0 0-3.942 1.569L1.126 8.188a5.802 5.802 0 0 0-1.569 3.903c0 1.618.619 3.127 1.569 4.076l6.249 6.341c.51.517 1.18.781 1.908.781.728 0 1.398-.264 1.907-.781l5.229-5.128c.514-.514.535-1.365.021-1.9-.513-.533-1.364-.553-1.897-.039zm6.314-11.1l-1.29 1.407 1.501 1.517c.515.514.494 1.365-.039 1.9-.533.534-1.384.553-1.897.039l-1.592-1.601-1.54 1.391c-.515.467-1.258.757-2.064.757-.805 0-1.548-.29-2.062-.757l-3.868-3.53c-.514-.467-.702-1.15-.702-1.863s.188-1.357.702-1.824l3.868-3.53c.514-.467 1.257-.757 2.062-.757.806 0 1.549.29 2.064.757l1.54 1.391 1.592-1.601c.513-.514 1.364-.495 1.897.039.533.535.554 1.386.039 1.9l-1.501 1.517 1.29 1.407c.516.515.516 1.35 0 1.865z"/>
              </svg>
              <span className="text-xs text-foreground group-hover:text-accent-lavender transition-colors font-mono">LeetCode</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-button group flex items-center gap-2.5 px-4 py-2.5 rounded-md border-[0.5px] border-border bg-card-bg hover:bg-accent-lavender/5"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted group-hover:text-accent-lavender transition-colors" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <span className="text-xs text-foreground group-hover:text-accent-lavender transition-colors font-mono">Resume</span>
            </a>

            <a
              href="#projects"
              className="link-button group flex items-center gap-2.5 px-4 py-2.5 rounded-md border-[0.5px] border-border bg-card-bg hover:bg-accent-lavender/5"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted group-hover:text-accent-lavender transition-colors" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span className="text-xs text-foreground group-hover:text-accent-lavender transition-colors font-mono">Projects</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
