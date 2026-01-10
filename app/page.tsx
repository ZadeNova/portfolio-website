import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Footer from "./components/Footer";
import ThemeSwitcher from "./components/ThemeSwitcher";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ThemeSwitcher />
      {/* Single scrollable page with all sections - Code editor aesthetic */}
      <div className="pt-4">
        <Hero />
        <Projects />
        <Skills />
        <Footer />
      </div>
    </main>
  );
}
