// Icon component for skills
import React from "react";
function SkillIcon({ name }: { name: string }) {
  const iconMap: Record<string, React.ReactElement> = {
    // Languages
    "Python": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M9.585 2.568c-1.172 0-2.343.119-3.498.356-1.145.231-2.187.6-3.087 1.178-.9.58-1.653 1.368-2.185 2.345-.532.98-.844 2.15-.844 3.498v2.614h7.336v.873H.391c0 1.348.312 2.518.844 3.495.532.98 1.285 1.767 2.185 2.346.9.579 1.942.949 3.087 1.179 1.155.237 2.326.356 3.498.356 1.171 0 2.342-.119 3.497-.356 1.145-.23 2.187-.6 3.087-1.179.9-.579 1.653-1.366 2.185-2.346.532-.977.844-2.147.844-3.495v-2.614H13.15v-.873h7.336c0-1.348-.312-2.518-.844-3.498-.532-.977-1.285-1.765-2.185-2.345-.9-.578-1.942-.947-3.087-1.178-1.155-.237-2.326-.356-3.497-.356zm-.794 1.194c.7 0 1.268.568 1.268 1.268 0 .7-.568 1.268-1.268 1.268-.7 0-1.268-.568-1.268-1.268 0-.7.568-1.268 1.268-1.268zm6.418 0c.7 0 1.268.568 1.268 1.268 0 .7-.568 1.268-1.268 1.268-.7 0-1.268-.568-1.268-1.268 0-.7.568-1.268 1.268-1.268zM1.936 4.15c.532-.977 1.285-1.765 2.185-2.345.9-.578 1.942-.947 3.087-1.178 1.155-.237 2.326-.356 3.498-.356 1.171 0 2.342.119 3.497.356 1.145.231 2.187.6 3.087 1.178.9.58 1.653 1.368 2.185 2.345.532.977.844 2.147.844 3.495v1.747H13.15v-.873H5.768v.873H.391v-1.747c0-1.348.312-2.518.844-3.495zm-.545 15.7c-.532-.977-.844-2.147-.844-3.495v-1.747h7.336v.873h7.336v-.873h7.336v1.747c0 1.348-.312 2.518-.844 3.495-.532.98-1.285 1.767-2.185 2.346-.9.579-1.942.949-3.087 1.179-1.155.237-2.326.356-3.497.356-1.172 0-2.343-.119-3.498-.356-1.145-.23-2.187-.6-3.087-1.179-.9-.579-1.653-1.366-2.185-2.346zm10.403.31c.7 0 1.268.568 1.268 1.268 0 .7-.568 1.268-1.268 1.268-.7 0-1.268-.568-1.268-1.268 0-.7.568-1.268 1.268-1.268zm-6.418 0c.7 0 1.268.568 1.268 1.268 0 .7-.568 1.268-1.268 1.268-.7 0-1.268-.568-1.268-1.268 0-.7.568-1.268 1.268-1.268z"/>
      </svg>
    ),
    "Go": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M11.39 12.61a1.28 1.28 0 0 1-.41 1L9 15.89a1.26 1.26 0 0 1-1.78 0 1.26 1.26 0 0 1 0-1.78l1.71-1.71a1.26 1.26 0 0 1 1.78 0 1.28 1.28 0 0 1 .68.21zm8.12-2.12a1.26 1.26 0 0 0-1.78 0 1.26 1.26 0 0 0 0 1.78l1.71 1.71a1.26 1.26 0 0 0 1.78 0 1.26 1.26 0 0 0 0-1.78zM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
      </svg>
    ),
    "Rust": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l8 4v8.64l-8 4-8-4V8.18l8-4z"/>
      </svg>
    ),
    "SQL": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
    "TypeScript": (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 5.933 5.933 0 0 1 1.77-.26zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    ),
    // CS Fundamentals
    "Data Structures": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    "Algorithms": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    "Systems Design": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
      </svg>
    ),
    "Concurrency": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    "Distributed Systems": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="2"/>
        <circle cx="18" cy="6" r="2"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="18" cy="18" r="2"/>
        <path d="M8 6h8M8 18h8M6 8v8M18 8v8"/>
      </svg>
    ),
    // Backend / Systems
    "API Design": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 7h16M4 12h16M4 17h16"/>
      </svg>
    ),
    "Database Design": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
    "Message Queues": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="4" rx="1"/>
        <rect x="2" y="10" width="20" height="4" rx="1"/>
        <rect x="2" y="16" width="20" height="4" rx="1"/>
      </svg>
    ),
    "Caching": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    "Microservices": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="2"/>
        <circle cx="18" cy="6" r="2"/>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="18" cy="18" r="2"/>
        <path d="M6 8h4m4 0h4M8 6v4m4 0v4M8 12h4m4 0h4M6 16v-4m12 0v4"/>
      </svg>
    ),
    // Data / Finance
    "ETL Pipelines": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h18M8 6l-5 6 5 6M16 6l5 6-5 6"/>
      </svg>
    ),
    "Financial Data Processing": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18M7 7h10M7 11h10M7 15h6"/>
      </svg>
    ),
    "Time-Series Data": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    "Data Reconciliation": (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  };

  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-md border-[0.5px] border-border bg-card-bg text-muted group-hover:text-accent-lavender group-hover:border-accent-lavender/50 transition-colors">
      {iconMap[name] || (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      )}
    </div>
  );
}

export default function Skills() {
  const skillGroups = [
    {
      category: "Languages",
      items: ["Python", "Go", "Rust", "SQL", "TypeScript"]
    },
    {
      category: "CS Fundamentals",
      items: ["Data Structures", "Algorithms", "Systems Design", "Concurrency", "Distributed Systems"]
    },
    {
      category: "Backend / Systems",
      items: ["API Design", "Database Design", "Message Queues", "Caching", "Microservices"]
    },
    {
      category: "Data / Finance",
      items: ["ETL Pipelines", "Financial Data Processing", "Time-Series Data", "Data Reconciliation"]
    }
  ];

  return (
    <section className="py-12 md:py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-8 md:mb-12 font-mono text-center">
        Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {skillGroups.map((group, idx) => (
          <div key={idx} className="card-glow border-[0.5px] border-border rounded-lg p-6 bg-card-bg">
            <h3 className="text-base font-medium text-foreground mb-5 font-mono">
              {group.category}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="group flex flex-col items-center gap-2 p-3 rounded-md hover:bg-accent-lavender/5 transition-colors cursor-default"
                >
                  <SkillIcon name={item} />
                  <span className="text-xs text-foreground font-mono text-center">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
