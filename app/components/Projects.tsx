"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const projects = [
    {
      name: "Market Data Aggregator",
      problem: "Consolidate real-time market data from multiple exchanges with sub-100ms latency requirements.",
      techStack: ["Go", "Redis", "WebSocket", "PostgreSQL"],
      decisions: [
        "Used Redis pub/sub for inter-service communication to avoid network overhead",
        "Implemented connection pooling with exponential backoff for exchange APIs",
        "Chose PostgreSQL over time-series DB due to existing infrastructure and query patterns"
      ],
      learned: "Understanding of WebSocket connection management at scale and trade-offs between consistency and latency in financial data systems."
    },
    {
      name: "ETL Pipeline for Trade Reconciliation",
      problem: "Process and reconcile millions of daily trades across multiple systems with strict accuracy requirements.",
      techStack: ["Python", "Apache Airflow", "SQL", "S3"],
      decisions: [
        "Separated extraction, transformation, and loading into distinct Airflow DAGs for easier debugging",
        "Used S3 as intermediate storage to enable reprocessing without re-fetching source data",
        "Implemented idempotent operations to handle partial failures gracefully"
      ],
      learned: "Importance of observability in data pipelines and how to design for failure recovery without manual intervention."
    },
    {
      name: "High-Frequency Web Scraper",
      problem: "Monitor price changes across e-commerce sites while respecting rate limits and avoiding detection.",
      techStack: ["Python", "Scrapy", "Docker", "PostgreSQL"],
      decisions: [
        "Rotated user agents and IP addresses using proxy pools to distribute load",
        "Implemented exponential backoff with jitter to respect rate limits dynamically",
        "Used Scrapy's built-in caching to avoid redundant requests"
      ],
      learned: "Balancing efficiency with ethical scraping practices and understanding how to scale scraping infrastructure cost-effectively."
    },
    {
      name: "Order Matching Engine",
      problem: "Match buy and sell orders for a trading system with strict ordering guarantees and low latency.",
      techStack: ["Rust", "PostgreSQL", "gRPC"],
      decisions: [
        "Used PostgreSQL's SERIALIZABLE isolation level to ensure order matching correctness",
        "Implemented order book as in-memory data structure with periodic persistence",
        "Chose Rust for critical path to minimize latency in matching logic"
      ],
      learned: "Trade-offs between database consistency guarantees and performance, and when to use in-memory state with eventual persistence."
    }
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
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
