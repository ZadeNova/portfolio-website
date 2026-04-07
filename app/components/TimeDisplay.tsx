"use client";

import { useEffect, useState } from "react";

interface TimeState {
	time: string;
	date: string;
}

export default function TimeDisplay() {
	const [timeState, setTimeState] = useState<TimeState>({
		time: "",
		date: "",
	});

	useEffect(() => {
		const updateTime = (): void => {
			const now = new Date();

			const timeStr = now.toLocaleTimeString("en-US", {
				timeZone: "Asia/Singapore",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
			});

			const dateStr = now.toLocaleDateString("en-US", {
				timeZone: "Asia/Singapore",
				weekday: "short",
				month: "short",
				day: "numeric",
			});

			setTimeState({ time: timeStr, date: dateStr });
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center gap-1.5">
				<svg
					viewBox="0 0 24 24"
					className="w-3 h-3 text-muted flex-shrink-0"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="10" />
					<polyline points="12 6 12 12 16 14" />
				</svg>
				<span className="text-[10px] text-muted font-mono uppercase tracking-widest">
					Singapore
				</span>
			</div>

			<div
				className="text-2xl font-bold text-foreground font-mono tracking-tight leading-none mt-1"
				aria-live="polite"
				aria-label={`Current Singapore time: ${timeState.time}`}
			>
				{timeState.time}
			</div>

			<div className="text-[11px] text-muted font-mono">{timeState.date}</div>
		</div>
	);
}
