import { GITHUB_USERNAME } from "@/app/config/profile";

export { GITHUB_USERNAME };

export function authHeaders(token: string | undefined): HeadersInit {
	const headers: HeadersInit = { Accept: "application/vnd.github+json" };
	if (token) headers.Authorization = `Bearer ${token}`;
	return headers;
}
