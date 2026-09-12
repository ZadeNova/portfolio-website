import Hero from "./components/Hero";
import GithubActivity from "./components/GithubActivity";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

function SectionDivider({ path }: { path: string }) {
	return (
		<div
			className="flex items-center gap-3 max-w-[max(1400px,min(94vw,1700px))] mx-auto px-4 sm:px-6 my-12 md:my-16 min-[1920px]:my-8"
			aria-hidden="true"
		>
			<div className="flex-1 border-t border-dashed border-border/40" />
			<span className="text-label text-muted font-mono tracking-wide flex-shrink-0">
				cd {path}
			</span>
			<div className="flex-1 border-t border-dashed border-border/40" />
		</div>
	);
}

export default function Home() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			{/* Single scrollable page with improved flow */}
			<div className="pt-8">
				<Hero />
				<SectionDivider path="~/activity" />
				<GithubActivity />
				<SectionDivider path="~/projects" />
				<Projects />
				<SectionDivider path="~/contact" />
				<Footer />
			</div>
		</main>
	);
}
