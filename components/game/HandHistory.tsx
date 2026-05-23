import type { HandSnapshot } from "@/lib/types";
import { Tile } from "./Tile";

interface HandHistoryProps {
  history: HandSnapshot[];
}

const resultStyles: Record<string, string> = {
  win: "history-result-win",
  loss: "history-result-loss",
  push: "history-result-push",
};

export function HandHistory({ history }: HandHistoryProps) {
  if (history.length === 0) {
    return (
      <section className="panel history-panel">
        <h2 className="panel-title">History</h2>
        <p className="empty-history">No hands played yet.</p>
      </section>
    );
  }

  return (
    <section className="panel history-panel">
      <h2 className="panel-title">History</h2>
      <ul className="history-list">
        {[...history].reverse().map((hand, index) => (
          <li
            key={`round-${history.length - index}`}
            className="history-item"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <div className="history-meta">
              <span className="history-round">#{history.length - index}</span>
              {hand.bet && (
                <span className="history-bet">
                  Bet {hand.bet} vs {hand.comparedToTotal}
                </span>
              )}
              {hand.result && (
                <span className={`history-result ${resultStyles[hand.result]}`}>
                  {hand.result}
                </span>
              )}
              <span className="history-total">Total {hand.total}</span>
            </div>
            <div className="history-tiles">
              {hand.tiles.map((tile, tileIndex) => (
                <Tile
                  key={`${history.length - index}-${tileIndex}-${tile.id}`}
                  tile={tile}
                  size="sm"
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
