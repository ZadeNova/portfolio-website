"use client";

import { useEffect, useState } from "react";

export default function TimeDisplay() {
	const [time, setTime] = useState<string>("");
	const [date, setDate] = useState<string>("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const singaporeTime = new Date(
				now.toLocaleString("en-US", { timeZone: "Asia/Singapore" })
			);

			const timeStr = singaporeTime.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
			});

			const dateStr = singaporeTime.toLocaleDateString("en-US", {
				weekday: "short",
				month: "short",
				day: "numeric",
			});

			setTime(timeStr);
			setDate(dateStr);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="space-y-1">
			<div className="flex items-center gap-2">
				<svg
					viewBox="0 0 24 24"
					className="w-4 h-4 text-muted"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<circle cx="12" cy="12" r="10" />
					<polyline points="12 6 12 12 16 14" />
				</svg>
				<span className="text-xs text-muted font-mono">Singapore</span>
			</div>
			<div className="text-lg font-bold text-foreground font-mono">{time}</div>
			<div className="text-xs text-muted font-mono">{date}</div>
			<div className="mt-6 pt-6 border-t-[0.5px] border-border space-y-3 font-mono text-[10px]">
				<div className="flex justify-between items-center text-muted">
					<span className="uppercase tracking-wider">System Status</span>
					<span className="text-accent-lavender flex items-center gap-1.5 font-bold">
						<span className="h-1.5 w-1.5 rounded-full bg-accent-lavender animate-pulse"></span>
						NOMINAL
					</span>
				</div>

				{/* <div className="flex justify-between items-center">
					<span className="text-muted uppercase tracking-wider">Latency</span>
					<span className="text-foreground">
						12.4ms <span className="text-[8px] text-muted/50">(avg)</span>
					</span>
				</div>


				<div className="flex items-end gap-0.5 h-4 pt-1">
					<div className="bg-accent-blue/40 w-full h-[40%] rounded-sm"></div>
					<div className="bg-accent-blue/40 w-full h-[60%] rounded-sm"></div>
					<div className="bg-accent-blue w-full h-[90%] rounded-sm"></div>
					<div className="bg-accent-blue/40 w-full h-[50%] rounded-sm"></div>
					<div className="bg-accent-blue/40 w-full h-[30%] rounded-sm"></div>
				</div> */}
			</div>
		</div>
	);
}
