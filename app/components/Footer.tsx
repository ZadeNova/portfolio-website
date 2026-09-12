import type { ReactElement } from "react";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { relativeTime } from "../lib/format";
import { NAME, SOCIALS, SEEKING_PERIOD, FOCUS_AREAS } from "../config/profile";

interface FooterLink {
	label: string;
	href: string;
	isExternal: boolean;
	icon: ReactElement;
}

const FOOTER_ICONS: Record<string, ReactElement> = {
	GitHub: <GitHubIcon />,
	LinkedIn: <LinkedInIcon />,
};

const FOOTER_LINKS: FooterLink[] = SOCIALS.filter(
	(social) => social.label in FOOTER_ICONS,
).map((social) => ({
	label: social.label,
	href: social.href,
	isExternal: true,
	icon: FOOTER_ICONS[social.label],
}));

const LINKEDIN_HREF =
	SOCIALS.find((social) => social.label === "LinkedIn")?.href ?? "";

const PLATFORM = "VERCEL_EDGE";
const FRAMEWORK = "NEXT.JS_16.1 + REACT_19 + TAILWIND_4";

const GIT_SHA = process.env.NEXT_PUBLIC_GIT_SHA || "unknown";
const GIT_DATE = process.env.NEXT_PUBLIC_GIT_DATE || new Date().toISOString();
const GIT_MESSAGE = process.env.NEXT_PUBLIC_GIT_MESSAGE || "";

export default function Footer(): ReactElement {
	const year = new Date().getFullYear();

	return (
		<footer
			id="contact"
			className="py-8 min-[1920px]:py-6 px-4 sm:px-6 max-w-[max(1400px,min(94vw,1700px))] mx-auto"
			aria-label="Site footer"
		>
			<div className="glass-card rounded-lg px-5 py-4">
				{/* System status bar */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-4 border-b border-border/20">
					<div className="flex flex-wrap gap-x-5 gap-y-1 text-label font-mono">
						<span title={GIT_MESSAGE || undefined}>
							<span className="text-muted mr-1.5">DEPLOY:</span>
							<span className="text-accent-lavender font-semibold">
								{GIT_SHA}
							</span>
							<span className="text-muted ml-1.5">
								· {relativeTime(GIT_DATE)}
							</span>
						</span>
						<span>
							<span className="text-muted mr-1.5">RUNNING_ON:</span>
							<span className="text-accent-blue font-semibold">{PLATFORM}</span>
						</span>
						<span>
							<span className="text-muted mr-1.5">STACK:</span>
							<span className="text-foreground">{FRAMEWORK}</span>
						</span>
					</div>
					<div className="flex items-center gap-1.5 text-label font-mono">
						<span
							className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse flex-shrink-0"
							aria-hidden="true"
						/>
						<span className="text-accent-green font-semibold tracking-wide">
							SYSTEMS_NOMINAL
						</span>
					</div>
				</div>

				{/* Availability + contact */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-4 pb-4 border-b border-border/20 text-label font-mono">
					<div className="flex flex-wrap gap-x-5 gap-y-1">
						<span>
							<span className="text-muted mr-1.5">SEEKING:</span>
							<span className="text-foreground">{FOCUS_AREAS}</span>
							<span className="text-muted mx-1.5">·</span>
							<span className="text-foreground">{SEEKING_PERIOD}</span>
						</span>
					</div>
					<div className="flex items-center gap-1.5">
						<span className="text-muted mr-1.5">CONTACT:</span>
						<a
							href={LINKEDIN_HREF}
							target="_blank"
							rel="noopener noreferrer"
							className="text-accent-lavender hover:underline underline-offset-2 transition-colors"
						>
							LinkedIn DM preferred
						</a>
					</div>
				</div>

				{/* Links + copyright */}
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<nav aria-label="Footer navigation">
						<ul className="flex items-center gap-6 list-none">
							{FOOTER_LINKS.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										{...(link.isExternal
											? { target: "_blank", rel: "noopener noreferrer" }
											: {})}
										className="flex items-center gap-2 text-foreground/70 hover:text-accent-lavender transition-colors duration-150 group"
										aria-label={link.label}
									>
										<span className="transition-colors">{link.icon}</span>
										<span className="text-label font-mono border-b border-transparent group-hover:border-accent-lavender/50 pb-px transition-colors">
											{link.label}
										</span>
									</a>
								</li>
							))}
						</ul>
					</nav>
					<p className="text-label text-muted font-mono text-center sm:text-right">
						© {year} {NAME} — Built with Next.js &amp; Tailwind CSS
					</p>
				</div>
			</div>
		</footer>
	);
}
