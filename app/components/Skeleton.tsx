export function Skeleton({ className = "" }: { className?: string }) {
	return (
		<span
			className={`inline-block animate-pulse rounded-sm bg-border/40 ${className}`}
			aria-hidden="true"
		/>
	);
}
