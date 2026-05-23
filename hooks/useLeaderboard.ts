"use client";

import { useCallback, useEffect, useState } from "react";
import {
  LEADERBOARD_SIZE,
  LEADERBOARD_STORAGE_KEY,
} from "@/lib/constants";
import type { LeaderboardEntry } from "@/lib/types";

function loadEntries(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LeaderboardEntry[];
  } catch {
    return [];
  }
}

function persistEntries(entries: LeaderboardEntry[]): void {
  localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
}

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const submitScore = useCallback((score: number) => {
    const entry: LeaderboardEntry = {
      score,
      date: new Date().toISOString(),
    };
    setEntries((prev) => {
      const next = [...prev, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, LEADERBOARD_SIZE);
      persistEntries(next);
      return next;
    });
  }, []);

  return { entries, submitScore };
}
