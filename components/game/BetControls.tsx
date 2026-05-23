import type { BetDirection } from "@/lib/types";

interface BetControlsProps {
  onBet: (bet: BetDirection) => void;
  disabled: boolean;
}

export function BetControls({ onBet, disabled }: BetControlsProps) {
  return (
    <div className="bet-controls">
      <button
        type="button"
        className="btn btn-bet btn-bet-higher"
        onClick={() => onBet("higher")}
        disabled={disabled}
      >
        <span className="btn-icon">▲</span>
        Bet Higher
      </button>
      <button
        type="button"
        className="btn btn-bet btn-bet-lower"
        onClick={() => onBet("lower")}
        disabled={disabled}
      >
        <span className="btn-icon">▼</span>
        Bet Lower
      </button>
    </div>
  );
}
