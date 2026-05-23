"use client";

import { useEffect, useState } from "react";

interface LeaderboardDateProps {
  iso: string;
}

/** Renders locale date only after mount to avoid SSR hydration mismatches */
export function LeaderboardDate({ iso }: LeaderboardDateProps) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    setFormatted(
      new Date(iso).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    );
  }, [iso]);

  return <span className="leaderboard-date">{formatted || "—"}</span>;
}
