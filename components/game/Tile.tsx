import { getTileSuitColor, getTileLabel } from "@/lib/tiles/display";
import { getTileValue } from "@/lib/tiles/factory";
import type { TileInstance } from "@/lib/types";

interface TileProps {
  tile: TileInstance;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-14 w-10 text-xs",
  md: "h-24 w-16 text-lg",
  lg: "h-32 w-20 text-2xl",
};

export function Tile({ tile, size = "md", className = "" }: TileProps) {
  const value = getTileValue(tile);
  const label = getTileLabel(tile);
  const colorClass = getTileSuitColor(tile);
  const isNonNumber = tile.category !== "number";

  return (
    <div
      className={`tile ${sizeClasses[size]} ${className}`}
      title={`${tile.category} — value ${value}`}
    >
      <div className="tile-inner">
        <span className={`tile-face font-bold ${colorClass}`}>{label}</span>
        <span className="tile-value">{value}</span>
        {isNonNumber && (
          <span className="tile-badge" aria-hidden>
            ★
          </span>
        )}
      </div>
    </div>
  );
}
