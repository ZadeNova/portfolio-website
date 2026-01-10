"use client";

import { useEffect, useState } from "react";

export default function TimeDisplay() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const singaporeTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Singapore" }));
      
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
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span className="text-xs text-muted font-mono">Singapore</span>
      </div>
      <div className="text-lg font-bold text-foreground font-mono">{time}</div>
      <div className="text-xs text-muted font-mono">{date}</div>
    </div>
  );
}
