interface PileCountsProps {
  drawCount: number;
  discardCount: number;
  deckExhaustionCount: number;
}

export function PileCounts({
  drawCount,
  discardCount,
  deckExhaustionCount,
}: PileCountsProps) {
  return (
    <div className="pile-counts">
      <div className="pile-stat">
        <span className="pile-label">Draw Pile</span>
        <span className="pile-value">{drawCount}</span>
      </div>
      <div className="pile-stat">
        <span className="pile-label">Discard Pile</span>
        <span className="pile-value">{discardCount}</span>
      </div>
      <div className="pile-stat pile-stat-muted">
        <span className="pile-label">Reshuffles</span>
        <span className="pile-value">{deckExhaustionCount} / 3</span>
      </div>
    </div>
  );
}
