import { getHandTotal } from "@/lib/tiles/factory";
import type { TileInstance } from "@/lib/types";
import { Tile } from "./Tile";

interface CurrentHandProps {
  tiles: TileInstance[];
  awaitingBet: boolean;
}

export function CurrentHand({ tiles, awaitingBet }: CurrentHandProps) {
  const total = getHandTotal(tiles);

  return (
    <section className="panel current-hand">
      <header className="panel-header">
        <h2 className="panel-title">Current Hand</h2>
        <div className="hand-total">
          <span className="hand-total-label">Total</span>
          <span className="hand-total-value">{total}</span>
        </div>
      </header>

      <div className="tile-row">
        {tiles.map((tile, index) => (
          <Tile key={`${index}-${tile.id}`} tile={tile} size="lg" />
        ))}
      </div>

      <p className="hand-hint">
        {awaitingBet
          ? "Will the next hand total be higher or lower?"
          : "Resolving…"}
      </p>
    </section>
  );
}
