import { NextResponse } from "next/server";

const GITHUB_USER = "ZadeNova";
const FEED_LIMIT = 5;
const CANDIDATE_LIMIT = 40;
// GitHub's special "profile README" repo convention (owner/owner) — this is
// where scheduled bot workflows (e.g. readme-bot) commit on a recurring basis.
const PROFILE_README_REPO = `${GITHUB_USER}/${GITHUB_USER}`;

interface GithubEvent {
	type: string;
	repo: { name: string };
	payload: { head?: string };
	created_at: string;
}

interface ActivityItem {
	repo: string;
	message: string;
	sha: string;
	date: string;
	isBot: boolean;
}

function authHeaders(token: string | undefined): HeadersInit {
	const headers: HeadersInit = { Accept: "application/vnd.github+json" };
	if (token) headers.Authorization = `Bearer ${token}`;
	return headers;
}

export async function GET() {
	const token = process.env.GITHUB_TOKEN;

	try {
		const eventsRes = await fetch(
			`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=50`,
			{ headers: authHeaders(token), next: { revalidate: 3600 } },
		);
		const events: GithubEvent[] = await eventsRes.json();

		const pushes = events
			.filter(
				(e) =>
					e.type === "PushEvent" &&
					e.payload.head &&
					e.repo.name !== PROFILE_README_REPO,
			)
			.slice(0, CANDIDATE_LIMIT);

		const candidates: ActivityItem[] = await Promise.all(
			pushes.map(async (event) => {
				const sha = event.payload.head as string;
				const repo = event.repo.name.replace(`${GITHUB_USER}/`, "");
				try {
					const commitRes = await fetch(
						`https://api.github.com/repos/${event.repo.name}/commits/${sha}`,
						{ headers: authHeaders(token), next: { revalidate: 3600 } },
					);
					const commit = await commitRes.json();
					const message: string =
						commit?.commit?.message?.split("\n")[0] ?? "(no message)";
					const isBot =
						commit?.author?.type === "Bot" ||
						commit?.commit?.author?.name?.toLowerCase().includes("bot");
					return { repo, message, sha: sha.slice(0, 7), date: event.created_at, isBot };
				} catch {
					return {
						repo,
						message: "(commit unavailable)",
						sha: sha.slice(0, 7),
						date: event.created_at,
						isBot: false,
					};
				}
			}),
		);

		const items = candidates
			.filter((item) => !item.isBot)
			.slice(0, FEED_LIMIT)
			.map(({ repo, message, sha, date }) => ({ repo, message, sha, date }));

		return NextResponse.json({ status: "success", items });
	} catch {
		return NextResponse.json(
			{ status: "error", message: "Failed to fetch GitHub activity" },
			{ status: 500 },
		);
	}
}
