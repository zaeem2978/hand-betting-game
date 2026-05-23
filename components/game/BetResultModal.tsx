import type { BetResult } from "@/lib/types";

interface BetResultModalProps {
  result: BetResult;
  pointsEarned?: number;
}

const config: Record<
  BetResult,
  { label: string; sublabel: string; className: string }
> = {
  win: {
    label: "You Win!",
    sublabel: "Great call",
    className: "bet-modal-win",
  },
  loss: {
    label: "You Lose",
    sublabel: "Better luck next hand",
    className: "bet-modal-loss",
  },
  push: {
    label: "Push",
    sublabel: "Same total — no change",
    className: "bet-modal-push",
  },
};

export function BetResultModal({ result, pointsEarned }: BetResultModalProps) {
  const { label, sublabel, className } = config[result];

  return (
    <div className="bet-modal-backdrop" role="dialog" aria-live="assertive">
      <div className={`bet-modal ${className}`}>
        <p className="bet-modal-label">{label}</p>
        {result === "win" && pointsEarned != null && pointsEarned > 0 && (
          <p className="bet-modal-points">+{pointsEarned} pts</p>
        )}
        <p className="bet-modal-sub">{sublabel}</p>
      </div>
    </div>
  );
}
