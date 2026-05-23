import type { LeaderboardEntry } from "@/lib/types";
import { LeaderboardDate } from "./LeaderboardDate";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
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
            <li key={`${entry.score}-${entry.date}-${index}`} className="leaderboard-item">
              <span className="leaderboard-rank">#{index + 1}</span>
              <span className="leaderboard-score">{entry.score} pts</span>
              <LeaderboardDate iso={entry.date} />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
