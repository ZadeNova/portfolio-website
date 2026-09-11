import { NextResponse } from "next/server";
import { GITHUB_USERNAME } from "../_shared";

const QUERY = `
	query($login: String!) {
		user(login: $login) {
			contributionsCollection {
				contributionCalendar {
					totalContributions
					weeks {
						contributionDays {
							date
							contributionCount
						}
					}
				}
			}
		}
	}
`;

interface ContributionDay {
	date: string;
	contributionCount: number;
}

function levelFor(count: number): number {
	if (count === 0) return 0;
	if (count <= 2) return 1;
	if (count <= 5) return 2;
	if (count <= 9) return 3;
	return 4;
}

export async function GET() {
	const token = process.env.GITHUB_TOKEN;
	if (!token) {
		return NextResponse.json(
			{ status: "error", message: "GITHUB_TOKEN not configured" },
			{ status: 500 },
		);
	}

	try {
		const res = await fetch("https://api.github.com/graphql", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USERNAME } }),
			next: { revalidate: 3600 },
		});
		const json = await res.json();
		const calendar =
			json?.data?.user?.contributionsCollection?.contributionCalendar;
		if (!calendar) throw new Error("unexpected response");

		const contributions = calendar.weeks.flatMap(
			(week: { contributionDays: ContributionDay[] }) =>
				week.contributionDays.map((day) => ({
					date: day.date,
					count: day.contributionCount,
					level: levelFor(day.contributionCount),
				})),
		);

		return NextResponse.json({
			status: "success",
			contributions,
			total: calendar.totalContributions,
		});
	} catch {
		return NextResponse.json(
			{ status: "error", message: "Failed to fetch GitHub contributions" },
			{ status: 500 },
		);
	}
}
