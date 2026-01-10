export default function About() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-8 font-mono">
        About
      </h2>
      <div className="border-[0.5px] border-border rounded-md p-8 bg-card-bg shadow-sm hover:shadow-md transition-all">
        <p className="text-foreground leading-relaxed mb-5 text-sm">
          I build backend systems that handle real-world constraints: latency, scale, and correctness.
        </p>
        <p className="text-foreground leading-relaxed mb-5 text-sm">
          My work focuses on data pipelines, financial infrastructure, and distributed services where reliability and performance matter.
        </p>
        <p className="text-foreground leading-relaxed text-sm">
          I prefer understanding fundamentals over chasing trends, and I value clear reasoning over clever solutions.
        </p>
      </div>
    </section>
  );
}
