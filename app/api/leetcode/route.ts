import { NextResponse } from "next/server";

export async function GET() {
	try {
		// 1. Your Next.js server makes the request to Heroku (No CORS restrictions here!)
		const res = await fetch(
			"https://leetcode-stats-api.herokuapp.com/ZadeNova",
			{
				next: { revalidate: 3600 }, // Cache the result for 1 hour so you don't spam the API
			},
		);

		const data = await res.json();

		// 2. Return the data to your frontend
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ status: "error", message: "Failed to fetch LeetCode stats" },
			{ status: 500 },
		);
	}
}
