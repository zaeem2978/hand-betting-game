import type { BetDirection, BetResult, GameState } from "@/lib/types";
import { BetControls } from "./BetControls";
import { BetResultModal } from "./BetResultModal";
import { CurrentHand } from "./CurrentHand";
import { HandHistory } from "./HandHistory";
import { PileCounts } from "./PileCounts";

interface GameBoardProps {
  state: GameState;
  onBet: (bet: BetDirection) => void;
  onExit: () => void;
  betLocked?: boolean;
  betFeedback?: { result: BetResult; pointsEarned: number } | null;
}

export function GameBoard({
  state,
  onBet,
  onExit,
  betLocked = false,
  betFeedback = null,
}: GameBoardProps) {
  return (
    <div className="game-board">
      <header className="game-header">
        <button type="button" className="btn btn-ghost" onClick={onExit}>
          ← Exit
        </button>
        <div className="score-display">
          <span className="score-label">Score</span>
          <span className="score-value">{state.score}</span>
        </div>
      </header>

      <div className="pile-area">
        <PileCounts
          drawCount={state.drawPile.length}
          discardCount={state.discardPile.length}
          deckExhaustionCount={state.deckExhaustionCount}
        />
        {betFeedback && (
          <BetResultModal
            result={betFeedback.result}
            pointsEarned={betFeedback.pointsEarned}
          />
        )}
      </div>

      <div className="game-main">
        <CurrentHand
          tiles={state.currentHand}
          awaitingBet={state.awaitingBet}
        />
        <BetControls
          onBet={onBet}
          disabled={!state.awaitingBet || betLocked}
        />
        <HandHistory history={state.handHistory} />
      </div>
    </div>
  );
}
