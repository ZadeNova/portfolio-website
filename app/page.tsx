import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Single scrollable page with improved flow */}
      <div className="pt-8">
        <Hero />
        <div className="border-t border-border/30 my-12 md:my-16"></div>
        <Projects />
        <div className="border-t border-border/30 my-12 md:my-16"></div>
        <Skills />
        <Footer />
      </div>
    </main>
  );
}
