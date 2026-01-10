export default function Footer() {
  return (
    <footer className="py-12 px-6 max-w-4xl mx-auto border-t-[0.5px] border-border mt-8">
      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-accent-blue transition-colors text-sm font-mono hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-accent-blue transition-colors text-sm font-mono hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="mailto:your.email@example.com"
          className="text-muted hover:text-accent-blue transition-colors text-sm font-mono hover:underline"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
