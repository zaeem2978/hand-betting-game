import type { LeaderboardEntry } from "@/lib/types";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <section className="panel leaderboard">
      <h2 className="panel-title">Top Scores</h2>
      {entries.length === 0 ? (
        <p className="leaderboard-empty">No scores yet — be the first!</p>
      ) : (
        <ol className="leaderboard-list">
          {entries.map((entry, index) => (
            <li key={`${entry.date}-${index}`} className="leaderboard-item">
              <span className="leaderboard-rank">#{index + 1}</span>
              <span className="leaderboard-score">{entry.score} pts</span>
              <span className="leaderboard-date">{formatDate(entry.date)}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
