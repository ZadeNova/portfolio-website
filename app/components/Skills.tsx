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
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-12 font-mono">
        Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group, idx) => (
          <div key={idx} className="card-glow border-[0.5px] border-border rounded-md p-6 bg-card-bg shadow-sm">
            <h3 className="text-lg font-medium text-foreground mb-5 font-mono">
              {group.category}
            </h3>
            <ul className="space-y-2.5">
              {group.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="text-muted text-sm hover:text-foreground transition-colors"
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
