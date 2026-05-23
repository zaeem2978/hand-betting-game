import type { TileInstance } from "../types";

const SUIT_LABELS: Record<string, string> = {
  characters: "万",
  bamboos: "条",
  dots: "筒",
};

const DRAGON_LABELS: Record<string, string> = {
  red: "中",
  green: "發",
  white: "",
};

const WIND_LABELS: Record<string, string> = {
  east: "东",
  south: "南",
  west: "西",
  north: "北",
};

const SUIT_COLORS: Record<string, string> = {
  characters: "text-red-700",
  bamboos: "text-emerald-700",
  dots: "text-blue-700",
};

export function getTileLabel(tile: TileInstance): string {
  if (tile.category === "number" && tile.rank != null && tile.suit) {
    return `${tile.rank}${SUIT_LABELS[tile.suit]}`;
  }
  if (tile.category === "dragon" && tile.dragon) {
    return DRAGON_LABELS[tile.dragon] || "白";
  }
  if (tile.category === "wind" && tile.wind) {
    return WIND_LABELS[tile.wind];
  }
  return "?";
}

export function getTileSuitColor(tile: TileInstance): string {
  if (tile.category === "number" && tile.suit) {
    return SUIT_COLORS[tile.suit];
  }
  if (tile.category === "dragon") return "text-red-600";
  if (tile.category === "wind") return "text-slate-700";
  return "text-slate-800";
}

export function getTileCategoryLabel(tile: TileInstance): string {
  if (tile.category === "number") return "Number";
  if (tile.category === "dragon") return "Dragon";
  return "Wind";
}
