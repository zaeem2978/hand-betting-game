"use client";

import { useCallback, useReducer } from "react";
import { gameReducer, initialGameState } from "@/lib/game/reducer";
import type { BetDirection } from "@/lib/types";

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const startGame = useCallback(() => dispatch({ type: "START_GAME" }), []);
  const placeBet = useCallback(
    (bet: BetDirection) => dispatch({ type: "PLACE_BET", bet }),
    [],
  );
  const exitGame = useCallback(() => dispatch({ type: "EXIT_GAME" }), []);
  const returnToLanding = useCallback(
    () => dispatch({ type: "RETURN_TO_LANDING" }),
    [],
  );

  return { state, startGame, placeBet, exitGame, returnToLanding };
}
