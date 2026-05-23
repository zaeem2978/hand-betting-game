import { Logo } from "@/components/Logo";
import type { LeaderboardEntry } from "@/lib/types";
import { Leaderboard } from "./Leaderboard";

interface LandingPageProps {
  onStartGame: () => void;
  entries: LeaderboardEntry[];
}

export function LandingPage({ onStartGame, entries }: LandingPageProps) {
  return (
    <div className="landing">
      <div className="landing-hero">
        <Logo size={88} className="landing-logo" />
        <h1 className="landing-title">Hand Betting Game</h1>
        <p className="landing-subtitle">
          Read the hand, trust your instinct, and bet on what comes next.
        </p>
        <button type="button" className="btn btn-primary btn-lg" onClick={onStartGame}>
          New Game
        </button>
      </div>
      <Leaderboard entries={entries} />
    </div>
  );
}
