import type { NextConfig } from "next";
import { execSync } from "node:child_process";

function readGitInfo() {
	try {
		return {
			sha: execSync("git rev-parse --short HEAD").toString().trim(),
			message: execSync("git log -1 --pretty=%s").toString().trim(),
			date: execSync("git log -1 --pretty=%cI").toString().trim(),
		};
	} catch {
		return { sha: "unknown", message: "", date: new Date().toISOString() };
	}
}

const git = readGitInfo();

const nextConfig: NextConfig = {
	env: {
		NEXT_PUBLIC_GIT_SHA: git.sha,
		NEXT_PUBLIC_GIT_MESSAGE: git.message,
		NEXT_PUBLIC_GIT_DATE: git.date,
	},
};

export default nextConfig;
