import { NextResponse } from "next/server";

const GITHUB_USER = "ZadeNova";
const MAX_LANGUAGES = 5;

interface GithubRepo {
	name: string;
	fork: boolean;
	languages_url: string;
}

function authHeaders(token: string | undefined): HeadersInit {
	const headers: HeadersInit = { Accept: "application/vnd.github+json" };
	if (token) headers.Authorization = `Bearer ${token}`;
	return headers;
}

export async function GET() {
	const token = process.env.GITHUB_TOKEN;

	try {
		const reposRes = await fetch(
			`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner`,
			{
				headers: authHeaders(token),
				next: { revalidate: 3600 },
			},
		);
		const repos: GithubRepo[] = await reposRes.json();
		if (!Array.isArray(repos)) throw new Error("unexpected repos response");

		const totals: Record<string, number> = {};
		await Promise.all(
			repos
				.filter((repo) => !repo.fork)
				.map(async (repo) => {
					const res = await fetch(repo.languages_url, {
						headers: authHeaders(token),
						next: { revalidate: 3600 },
					});
					const langs: unknown = await res.json();
					if (!langs || typeof langs !== "object") return;
					for (const [lang, bytes] of Object.entries(
						langs as Record<string, unknown>,
					)) {
						if (typeof bytes !== "number") continue;
						totals[lang] = (totals[lang] ?? 0) + bytes;
					}
				}),
		);

		const totalBytes = Object.values(totals).reduce((a, b) => a + b, 0);
		if (!Number.isFinite(totalBytes) || totalBytes <= 0) {
			throw new Error("no usable language data");
		}
		const sorted = Object.entries(totals).sort(([, a], [, b]) => b - a);
		const top = sorted.slice(0, MAX_LANGUAGES);
		const rest = sorted.slice(MAX_LANGUAGES);
		const restBytes = rest.reduce((sum, [, bytes]) => sum + bytes, 0);

		const breakdown = top.map(([name, bytes]) => ({
			name,
			percent: (bytes / totalBytes) * 100,
		}));
		if (restBytes > 0) {
			breakdown.push({ name: "other", percent: (restBytes / totalBytes) * 100 });
		}

		return NextResponse.json({ status: "success", breakdown });
	} catch {
		return NextResponse.json(
			{ status: "error", message: "Failed to fetch GitHub language stats" },
			{ status: 500 },
		);
	}
}
