/** Tile category — extensible for future tile types */
export type TileCategory = "number" | "dragon" | "wind";

export type NumberSuit = "characters" | "bamboos" | "dots";

export type DragonType = "red" | "green" | "white";

export type WindType = "east" | "south" | "west" | "north";

export type BetDirection = "higher" | "lower";

export type BetResult = "win" | "loss" | "push";

export type GamePhase = "landing" | "playing" | "gameover";

/** Unique tile instance — dynamic value tracks per physical tile */
export interface TileInstance {
  id: string;
  category: TileCategory;
  /** Face rank 1–9 for number tiles */
  rank?: number;
  suit?: NumberSuit;
  dragon?: DragonType;
  wind?: WindType;
  /** Mutable value for dragons/winds; undefined for number tiles */
  dynamicValue?: number;
}

export interface HandSnapshot {
  tiles: TileInstance[];
  total: number;
  bet?: BetDirection;
  result?: BetResult;
  comparedToTotal?: number;
}

export interface GameState {
  phase: GamePhase;
  drawPile: TileInstance[];
  discardPile: TileInstance[];
  currentHand: TileInstance[];
  handHistory: HandSnapshot[];
  score: number;
  /** How many times the draw pile has been exhausted (game over at 3) */
  deckExhaustionCount: number;
  /** True when waiting for the player to place a bet */
  awaitingBet: boolean;
  gameOverReason?: string;
}

export type GameAction =
  | { type: "START_GAME" }
  | { type: "PLACE_BET"; bet: BetDirection }
  | { type: "EXIT_GAME" }
  | { type: "RETURN_TO_LANDING" };

export interface LeaderboardEntry {
  score: number;
  date: string;
}
