"use client";

import { useEffect, useRef, useState } from "react";
import { GameBoard } from "@/components/game/GameBoard";
import { GameOverScreen } from "@/components/gameover/GameOverScreen";
import { LandingPage } from "@/components/landing/LandingPage";
import { useGame } from "@/hooks/useGame";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import type { BetResult } from "@/lib/types";

const BET_FEEDBACK_MS = 1000;

export function GameApp() {
  const { state, startGame, placeBet, exitGame, returnToLanding } = useGame();
  const { entries, submitScore } = useLeaderboard();
  const scoreSubmitted = useRef(false);
  const historyLenRef = useRef(0);

  const [betFeedback, setBetFeedback] = useState<{
    result: BetResult;
    pointsEarned: number;
  } | null>(null);

  useEffect(() => {
    if (state.phase === "landing") {
      historyLenRef.current = 0;
      setBetFeedback(null);
    }
  }, [state.phase]);

  useEffect(() => {
    if (state.handHistory.length <= historyLenRef.current) return;

    const last = state.handHistory[state.handHistory.length - 1];
    historyLenRef.current = state.handHistory.length;

    if (!last.result) return;

    const pointsEarned =
      last.result === "win" && last.comparedToTotal != null
        ? Math.max(1, Math.abs(last.total - last.comparedToTotal))
        : 0;

    setBetFeedback({ result: last.result, pointsEarned });

    const timer = window.setTimeout(() => setBetFeedback(null), BET_FEEDBACK_MS);
    return () => window.clearTimeout(timer);
  }, [state.handHistory]);

  useEffect(() => {
    if (state.phase === "gameover" && !scoreSubmitted.current && !betFeedback) {
      submitScore(state.score);
      scoreSubmitted.current = true;
    }
    if (state.phase !== "gameover") {
      scoreSubmitted.current = false;
    }
  }, [state.phase, state.score, submitScore, betFeedback]);

  const handlePlayAgain = () => {
    scoreSubmitted.current = false;
    historyLenRef.current = 0;
    setBetFeedback(null);
    startGame();
  };

  const showGameBoard =
    state.phase === "playing" || (state.phase === "gameover" && betFeedback != null);

  const showGameOver = state.phase === "gameover" && betFeedback == null;

  return (
    <div className="app-shell">
      {state.phase === "landing" && (
        <LandingPage onStartGame={startGame} entries={entries} />
      )}
      {showGameBoard && (
        <GameBoard
          state={state}
          onBet={placeBet}
          onExit={exitGame}
          betLocked={betFeedback != null}
          betFeedback={betFeedback}
        />
      )}
      {showGameOver && (
        <GameOverScreen
          score={state.score}
          reason={state.gameOverReason}
          onPlayAgain={handlePlayAgain}
          onReturnHome={returnToLanding}
        />
      )}
    </div>
  );
}
