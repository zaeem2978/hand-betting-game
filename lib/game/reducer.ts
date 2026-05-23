import {
  HAND_SIZE,
  MAX_DECK_EXHAUSTIONS,
  MAX_TILE_VALUE,
  MIN_TILE_VALUE,
} from "../constants";
import {
  cloneTile,
  cloneTiles,
  createFreshDeck,
  createSnapshotId,
  dedupeTilesById,
  getHandTotal,
  getTileValue,
  shuffleDeck,
} from "../tiles/factory";
import type {
  BetDirection,
  BetResult,
  GameAction,
  GameState,
  TileInstance,
} from "../types";

export const initialGameState: GameState = {
  phase: "landing",
  drawPile: [],
  discardPile: [],
  currentHand: [],
  handHistory: [],
  score: 0,
  deckExhaustionCount: 0,
  awaitingBet: false,
};

interface DrawResult {
  tiles: TileInstance[];
  drawPile: TileInstance[];
  discardPile: TileInstance[];
  deckExhaustionCount: number;
  gameOver: boolean;
  gameOverReason?: string;
}

/** Draw N tiles, reshuffling when the draw pile is empty */
function drawTiles(
  drawPile: TileInstance[],
  discardPile: TileInstance[],
  deckExhaustionCount: number,
  count: number,
): DrawResult {
  let pile = cloneTiles(drawPile);
  let discard = cloneTiles(discardPile);
  let exhaustion = deckExhaustionCount;
  const drawn: TileInstance[] = [];

  while (drawn.length < count) {
    if (pile.length === 0) {
      if (exhaustion >= MAX_DECK_EXHAUSTIONS) {
        return {
          tiles: drawn,
          drawPile: pile,
          discardPile: discard,
          deckExhaustionCount: exhaustion,
          gameOver: true,
          gameOverReason: "The draw pile ran out for the third time.",
        };
      }

      exhaustion += 1;
      const fresh = createFreshDeck();
      pile = shuffleDeck(dedupeTilesById([...fresh, ...discard]));
      discard = [];
    }

    const tile = pile.pop();
    if (!tile) break;
    if (drawn.some((t) => t.id === tile.id)) continue;
    drawn.push(tile);
  }

  if (drawn.length < count) {
    return {
      tiles: drawn,
      drawPile: pile,
      discardPile: discard,
      deckExhaustionCount: exhaustion,
      gameOver: true,
      gameOverReason: "Not enough tiles remaining to continue.",
    };
  }

  return {
    tiles: drawn,
    drawPile: pile,
    discardPile: discard,
    deckExhaustionCount: exhaustion,
    gameOver: false,
  };
}

function resolveBet(
  previousTotal: number,
  nextTotal: number,
  bet: BetDirection,
): BetResult {
  if (nextTotal === previousTotal) return "push";
  if (bet === "higher") return nextTotal > previousTotal ? "win" : "loss";
  return nextTotal < previousTotal ? "win" : "loss";
}

/** Apply +/-1 to non-number tiles in the evaluated hand */
function applyDynamicScaling(
  hand: TileInstance[],
  result: BetResult,
): TileInstance[] {
  if (result === "push") return hand;

  const delta = result === "win" ? 1 : -1;

  return hand.map((tile) => {
    if (tile.category === "number") return tile;
    const current = tile.dynamicValue ?? 5;
    return { ...tile, dynamicValue: current + delta };
  });
}

function findOutOfBoundsTile(tiles: TileInstance[]): TileInstance | undefined {
  return tiles.find((tile) => {
    if (tile.category === "number") return false;
    const value = getTileValue(tile);
    return value <= MIN_TILE_VALUE || value >= MAX_TILE_VALUE;
  });
}

/** Sync updated hand tiles back into draw/discard piles by id */
function syncTileValues(
  updatedHand: TileInstance[],
  drawPile: TileInstance[],
  discardPile: TileInstance[],
): { drawPile: TileInstance[]; discardPile: TileInstance[] } {
  const valueMap = new Map(updatedHand.map((t) => [t.id, t]));

  const sync = (pile: TileInstance[]) =>
    pile.map((t) => {
      const updated = valueMap.get(t.id);
      return updated ? cloneTile(updated) : t;
    });

  return {
    drawPile: sync(drawPile),
    discardPile: sync(discardPile),
  };
}

function checkTileBoundsGameOver(
  ...tileGroups: TileInstance[][]
): { gameOver: boolean; reason?: string } {
  for (const group of tileGroups) {
    const offender = findOutOfBoundsTile(group);
    if (offender) {
      const value = getTileValue(offender);
      return {
        gameOver: true,
        reason: `A ${offender.category} tile reached value ${value}.`,
      };
    }
  }
  return { gameOver: false };
}

function startGame(): GameState {
  const drawResult = drawTiles([], [], 0, HAND_SIZE);

  return {
    phase: "playing",
    drawPile: drawResult.drawPile,
    discardPile: drawResult.discardPile,
    currentHand: drawResult.tiles,
    handHistory: [],
    score: 0,
    deckExhaustionCount: drawResult.deckExhaustionCount,
    awaitingBet: true,
  };
}

function placeBet(state: GameState, bet: BetDirection): GameState {
  if (state.phase !== "playing" || !state.awaitingBet) return state;

  const previousTotal = getHandTotal(state.currentHand);
  const drawResult = drawTiles(
    state.drawPile,
    state.discardPile,
    state.deckExhaustionCount,
    HAND_SIZE,
  );

  if (drawResult.gameOver) {
    return {
      ...state,
      drawPile: drawResult.drawPile,
      discardPile: drawResult.discardPile,
      deckExhaustionCount: drawResult.deckExhaustionCount,
      phase: "gameover",
      awaitingBet: false,
      gameOverReason: drawResult.gameOverReason,
    };
  }

  const nextHand = drawResult.tiles;
  const nextTotal = getHandTotal(nextHand);
  const result = resolveBet(previousTotal, nextTotal, bet);

  let scaledHand = applyDynamicScaling(nextHand, result);

  let score = state.score;
  if (result === "win") {
    score += Math.max(1, Math.abs(nextTotal - previousTotal));
  }

  const snapshot = {
    id: createSnapshotId(),
    tiles: cloneTiles(scaledHand),
    total: nextTotal,
    bet,
    result,
    comparedToTotal: previousTotal,
  };

  let drawPile = dedupeTilesById(drawResult.drawPile);
  const newDiscard = state.currentHand.filter(
    (tile) => !state.discardPile.some((d) => d.id === tile.id),
  );
  let discardPile = dedupeTilesById([...state.discardPile, ...newDiscard]);
  const synced = syncTileValues(scaledHand, drawPile, discardPile);
  drawPile = synced.drawPile;
  discardPile = synced.discardPile;

  const boundsCheck = checkTileBoundsGameOver(
    scaledHand,
    drawPile,
    discardPile,
  );

  if (boundsCheck.gameOver) {
    return {
      ...state,
      drawPile,
      discardPile,
      currentHand: scaledHand,
      handHistory: [...state.handHistory, snapshot],
      score,
      deckExhaustionCount: drawResult.deckExhaustionCount,
      phase: "gameover",
      awaitingBet: false,
      gameOverReason: boundsCheck.reason,
    };
  }

  return {
    ...state,
    drawPile,
    discardPile,
    currentHand: scaledHand,
    handHistory: [...state.handHistory, snapshot],
    score,
    deckExhaustionCount: drawResult.deckExhaustionCount,
    awaitingBet: true,
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return startGame();
    case "PLACE_BET":
      return placeBet(state, action.bet);
    case "EXIT_GAME":
      return { ...initialGameState };
    case "RETURN_TO_LANDING":
      return { ...initialGameState };
    default:
      return state;
  }
}
