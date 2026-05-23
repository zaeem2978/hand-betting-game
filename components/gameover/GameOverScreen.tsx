interface GameOverScreenProps {
  score: number;
  reason?: string;
  onPlayAgain: () => void;
  onReturnHome: () => void;
}

export function GameOverScreen({
  score,
  reason,
  onPlayAgain,
  onReturnHome,
}: GameOverScreenProps) {
  return (
    <div className="game-over">
      <div className="game-over-card">
        <p className="game-over-label">Game Over</p>
        <h2 className="game-over-score">{score}</h2>
        <p className="game-over-sub">Final Score</p>
        {reason && <p className="game-over-reason">{reason}</p>}
        <div className="game-over-actions">
          <button type="button" className="btn btn-primary" onClick={onPlayAgain}>
            Play Again
          </button>
          <button type="button" className="btn btn-secondary" onClick={onReturnHome}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
