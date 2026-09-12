import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import { DISPLAY_NAME, ROLE_TAGLINE, BIO_PARAGRAPH } from "./config/profile";

const SITE_URL = "https://erfan-portfolio-website.vercel.app";

const plexSans = IBM_Plex_Sans({
	variable: "--font-plex-sans",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
	variable: "--font-plex-mono",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: `${DISPLAY_NAME} — ${ROLE_TAGLINE}`,
	description: BIO_PARAGRAPH,
	openGraph: {
		title: `${DISPLAY_NAME} — ${ROLE_TAGLINE}`,
		description: BIO_PARAGRAPH,
		url: SITE_URL,
		siteName: DISPLAY_NAME,
		type: "website",
	},
	twitter: {
		card: "summary",
		title: `${DISPLAY_NAME} — ${ROLE_TAGLINE}`,
		description: BIO_PARAGRAPH,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              (function() {
                var valid = ['rosepine-dawn','everforest-light','nord','gruvbox','rosepine','dracula'];
                var saved = localStorage.getItem('theme');
                var theme = (saved && valid.indexOf(saved) !== -1) ? saved : 'rosepine-dawn';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
					}}
				/>
			</head>
			<body
				className={`${plexSans.variable} ${plexMono.variable} antialiased`}
			>
				<ThemeProvider>
					<ScrollProgress />
					<Navbar />
					{children}
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
