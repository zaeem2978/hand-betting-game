import { COPIES_PER_TILE, NON_NUMBER_BASE_VALUE } from "../constants";
import type {
  DragonType,
  NumberSuit,
  TileInstance,
  WindType,
} from "../types";

let idCounter = 0;

function nextId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  idCounter += 1;
  return `tile-${idCounter}-${Date.now()}`;
}

/** Remove duplicate tile ids (can occur after hot reload) keeping the first instance */
export function dedupeTilesById(tiles: TileInstance[]): TileInstance[] {
  const seen = new Set<string>();
  return tiles.filter((tile) => {
    if (seen.has(tile.id)) return false;
    seen.add(tile.id);
    return true;
  });
}

function createNumberTile(suit: NumberSuit, rank: number): TileInstance {
  return { id: nextId(), category: "number", suit, rank };
}

function createDragonTile(dragon: DragonType): TileInstance {
  return {
    id: nextId(),
    category: "dragon",
    dragon,
    dynamicValue: NON_NUMBER_BASE_VALUE,
  };
}

function createWindTile(wind: WindType): TileInstance {
  return {
    id: nextId(),
    category: "wind",
    wind,
    dynamicValue: NON_NUMBER_BASE_VALUE,
  };
}

/** Builds a full standard mahjong tile set (136 tiles) */
export function createFreshDeck(): TileInstance[] {
  const deck: TileInstance[] = [];
  const suits: NumberSuit[] = ["characters", "bamboos", "dots"];
  const dragons: DragonType[] = ["red", "green", "white"];
  const winds: WindType[] = ["east", "south", "west", "north"];

  for (const suit of suits) {
    for (let rank = 1; rank <= 9; rank++) {
      for (let copy = 0; copy < COPIES_PER_TILE; copy++) {
        deck.push(createNumberTile(suit, rank));
      }
    }
  }

  for (const dragon of dragons) {
    for (let copy = 0; copy < COPIES_PER_TILE; copy++) {
      deck.push(createDragonTile(dragon));
    }
  }

  for (const wind of winds) {
    for (let copy = 0; copy < COPIES_PER_TILE; copy++) {
      deck.push(createWindTile(wind));
    }
  }

  return deck;
}

/** Fisher–Yates shuffle (mutates array) */
export function shuffleDeck(deck: TileInstance[]): TileInstance[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

/** Face value for number tiles; dynamic value for dragons/winds */
export function getTileValue(tile: TileInstance): number {
  if (tile.category === "number" && tile.rank != null) {
    return tile.rank;
  }
  return tile.dynamicValue ?? NON_NUMBER_BASE_VALUE;
}

export function getHandTotal(tiles: TileInstance[]): number {
  return tiles.reduce((sum, tile) => sum + getTileValue(tile), 0);
}

/** Clone tile preserving dynamic values (identity preserved by id) */
export function cloneTile(tile: TileInstance): TileInstance {
  return { ...tile };
}

export function cloneTiles(tiles: TileInstance[]): TileInstance[] {
  return tiles.map(cloneTile);
}
