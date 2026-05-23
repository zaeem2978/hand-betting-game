import { Logo } from "@/components/Logo";
import type { BetDirection, GameState } from "@/lib/types";
import { BetControls } from "./BetControls";
import { CurrentHand } from "./CurrentHand";
import { HandHistory } from "./HandHistory";
import { PileCounts } from "./PileCounts";

interface GameBoardProps {
  state: GameState;
  onBet: (bet: BetDirection) => void;
  onExit: () => void;
}

export function GameBoard({ state, onBet, onExit }: GameBoardProps) {
  return (
    <div className="game-board">
      <header className="game-header">
        <button type="button" className="btn btn-ghost" onClick={onExit}>
          ← Exit
        </button>
        <Logo size={40} className="game-header-logo" decorative />
        <div className="score-display">
          <span className="score-label">Score</span>
          <span className="score-value">{state.score}</span>
        </div>
      </header>

      <PileCounts
        drawCount={state.drawPile.length}
        discardCount={state.discardPile.length}
        deckExhaustionCount={state.deckExhaustionCount}
      />

      <div className="game-main">
        <CurrentHand
          tiles={state.currentHand}
          awaitingBet={state.awaitingBet}
        />
        <BetControls onBet={onBet} disabled={!state.awaitingBet} />
        <HandHistory history={state.handHistory} />
      </div>
    </div>
  );
}
