export default function Footer() {
  return (
    <footer className="py-8 md:py-12 px-6 max-w-5xl mx-auto mt-12 md:mt-16">
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-accent-lavender transition-colors font-mono border-b border-transparent hover:border-accent-lavender"
        >
          GitHub
        </a>
        <span className="text-muted/30">•</span>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-accent-lavender transition-colors font-mono border-b border-transparent hover:border-accent-lavender"
        >
          LinkedIn
        </a>
        <span className="text-muted/30">•</span>
        <a
          href="mailto:your.email@example.com"
          className="text-muted hover:text-accent-lavender transition-colors font-mono border-b border-transparent hover:border-accent-lavender"
        >
          Email
        </a>
      </div>
      <div className="text-center mt-6 text-xs text-muted font-mono">
        © {new Date().getFullYear()} — Built with Next.js & Tailwind CSS
      </div>
    </footer>
  );
}
