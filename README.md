# Hand Betting Game

A web-based Mahjong tile betting game built with **Next.js**, **React**, and **TypeScript**. Predict whether the next hand's total will be higher or lower than the current one — and watch dragon and wind tile values shift over time.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

## How to Play

1. **Start** — Click **New Game** on the landing page.
2. **Read the hand** — Five Mahjong tiles are dealt. The total value is shown.
3. **Bet** — Choose **Bet Higher** or **Bet Lower** for the *next* hand's total.
4. **Score** — Correct bets earn points equal to the absolute difference between the two hand totals.
5. **Game Over** when:
   - Any dragon or wind tile reaches value **0** or **10**
   - The draw pile empties for the **3rd** time

### Tile Values

| Type | Value |
|------|-------|
| Number tiles (1–9) | Face value |
| Dragons & Winds | Start at **5**; +1 when in a winning hand, −1 when in a losing hand |

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** with `useReducer` for state management
- **TypeScript**
- **Tailwind CSS v4**
- **Poppins** (Google Font) for UI typography; **Noto Sans SC** for Mahjong tile characters

## Architecture

The codebase is organized for easy extension during onsite interview:

```
lib/
  types.ts          — Shared TypeScript types
  constants.ts      — Tunable game parameters
  tiles/            — Deck factory, shuffle, display helpers
  game/reducer.ts   — Pure game logic (useReducer)
hooks/
  useGame.ts        — Reducer wrapper
  useLeaderboard.ts — localStorage top-5 scores
components/
  landing/          — Landing page & leaderboard
  game/             — Board, tiles, betting, history
  gameover/         — End-of-game screen
```

State is managed entirely with React's **`useReducer`** — no external state libraries.

Key extension points:

- `lib/constants.ts` — hand size, score rules, deck composition
- `lib/game/reducer.ts` — add new actions or game phases
- `lib/types.ts` — extend tile types or game state

## AI Utilization

| Area | Approach |
|------|----------|
| Project scaffolding | Created with `create-next-app` |
| Game logic & architecture | Handwritten — reducer, tile factory, types |
| UI components & CSS | Handwritten with AI-assisted polish suggestions 
---

Built as a technical assessment submission.
