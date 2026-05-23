"use client";

import { useEffect, useRef } from "react";
import { GameBoard } from "@/components/game/GameBoard";
import { GameOverScreen } from "@/components/gameover/GameOverScreen";
import { LandingPage } from "@/components/landing/LandingPage";
import { useGame } from "@/hooks/useGame";
import { useLeaderboard } from "@/hooks/useLeaderboard";

export function GameApp() {
  const { state, startGame, placeBet, exitGame, returnToLanding } = useGame();
  const { entries, submitScore } = useLeaderboard();
  const scoreSubmitted = useRef(false);

  useEffect(() => {
    if (state.phase === "gameover" && !scoreSubmitted.current) {
      submitScore(state.score);
      scoreSubmitted.current = true;
    }
    if (state.phase !== "gameover") {
      scoreSubmitted.current = false;
    }
  }, [state.phase, state.score, submitScore]);

  const handlePlayAgain = () => {
    scoreSubmitted.current = false;
    startGame();
  };

  return (
    <div className="app-shell">
      {state.phase === "landing" && (
        <LandingPage onStartGame={startGame} entries={entries} />
      )}
      {state.phase === "playing" && (
        <GameBoard state={state} onBet={placeBet} onExit={exitGame} />
      )}
      {state.phase === "gameover" && (
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
