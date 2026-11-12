# SOVERIX Game Center

Public-facing source for the **SOVERIX 12-game hub**: eight privately hosted original games plus four independent royal practice games. The original game engines, existing demo wallet and B2B licensing APIs remain hosted on their existing Cloudflare Game Provider.

> This repository is **public**. It intentionally does **not** include the proprietary HTML/JavaScript game engines, customer credentials, admin passwords, D1 data, Cloudflare tokens, or source for the private licensing server. Keep the game engine in a **private** repository.

## Unified live game center

- **[Open the complete 12-game SOVERIX Game Center](https://soverix-game-center.soverixnet.workers.dev/)** — one mobile-friendly catalogue with the eight original hosted games and four standalone royal previews. Original eight open through the existing `/demo` lobby; the four standalone games open directly. The catalogues are unified, but wallets are **not** universally connected.
- **[Play Royal Slots 3D](https://soverix-game-center.soverixnet.workers.dev/slots/)** — animated CSS-3D spinning reels, transparent payouts, free practice points and local round history.
- **[Play Royal Roulette 3D](https://soverix-game-center.soverixnet.workers.dev/roulette/)** — 3D-styled European roulette wheel with moving ball, 0–36 number or color choices, practice points, transparent payouts and local history.
- Slots and Roulette share the same localStorage demo balance on this browser origin. Initial balance and free refill: **1,000,000** nontransferable practice points; no purchases or withdrawals.

## Live staging links

- **[Play Original Games](https://soverix-games-provider-staging.soverixnet.workers.dev/demo)** — enter any player name; receive 1,000,000 free practice coins without signing in.
- **[Games marketplace and manual USD quote requests](https://soverix-games-provider-staging.soverixnet.workers.dev/)** — customer selects games, asks for a quote, owner confirms payment directly, and approves licenses manually.
- **[Games owner administration](https://soverix-games-provider-staging.soverixnet.workers.dev/admin)** — private login.
- **[Separate digital assets provider](https://soverix-assets-provider-staging.soverixnet.workers.dev/)** — frames, room entry effects, video gifts, VIP items and medals.

## New standalone 3D practice demo

- **[Play Royal Crystal Run 3D](https://soverix-royal-crystal-3d.soverixnet.workers.dev/)** ([view source](demos/royal-crystal-run-3d/index.html)) is an independent 10-stage WebGL runner with two boss stages (5 and 10), three daily missions, touch/keyboard controls, a device-only top-10 leaderboard, scores and local practice coins.
- Unlike the eight hosted proprietary originals, this **new demonstration is intentionally published in this public repository**. Its standalone HTML/WebGL implementation is now readable in this public repository; the previous compressed v1 entry is archived as `demos/royal-crystal-run-3d/v1-backup.html`.
- It is **not connected to Sharika Main Wallet, D1 or the private Cloudflare provider**. There are no wagers, purchases or real-money functions. This addition does not change any of the existing eight games.
- The standalone title is already hosted at the Cloudflare link above. GitHub's `blob` viewer shows source rather than running HTML.

## New Royal Battle 3D combat preview

- **[Play Royal Battle 3D](https://soverix-royal-battle-preview.soverixnet.workers.dev/)** — standalone live WebGL arena with sword attacks, special moves, dodge, waves, upgrades, and a final Shadow King fight.
- Source: `demos/royal-battle-3d/index.html`. Separate Cloudflare Worker: `soverix-royal-battle-preview`.
- Browser smoke tests verified mobile launch, visible 3D arena, movement, attacks, HP/damage, special attack, wave completion, three upgrade choices and end-to-end boss victory (automated test).
- **Preview only:** free practice shards, local score, no real-money purchases, no cash-out, no server-authoritative leaderboard, and no Sharika Main Wallet or D1 integration.
- This new preview is independent of the eight privately hosted original games and the older Royal Crystal Run 3D live game.

## What is in this repository?

- `index.html`, `assets/site.css`, `assets/site.js` — one English public landing page and **twelve unified cards**, routing original games to their preserved demo lobby and four royal games to direct play URLs.
- `data/games.json` — metadata for eight hosted original games (not their private source) plus four standalone game entries.
- `assets/royal-casino.css` and `assets/royal-casino.js` — shared mobile-friendly practice Slots / Roulette visual effects, balance, game rules and round history.
- `demos/royal-slots-3d/index.html` and `demos/royal-roulette-3d/index.html` — two playable royal casino practice pages.
- Cloudflare Worker `soverix-game-center` serves the unified frontend and both games without changing the eight-game provider.
- `demos/royal-crystal-run-3d/index.html` — the public 3D practice game (10 levels, missions, bosses, local ranking).
- `docs/INTEGRATION.md` — developer integration model and server-side credential rules.
- `docs/RELEASE_STATUS.md` — verified staging capabilities and unfinished production work.
- `.github/workflows/validate.yml` — static source checks; does **not** automatically deploy or modify Cloudflare.

## How to run

Open **https://soverix-game-center.soverixnet.workers.dev/** to play. For development, serve this repository with a local static HTTP server (rather than using file:// due to `fetch` and path routing). The original eight cards open the existing Cloudflare demo lobby; the new royal preview cards open their standalone URLs. No app logins, real-money wagers or payments are handled by these practice games.

## Business flow

1. A visitor opens the original demo on Cloudflare, enters their display name and receives **1,000,000 practice coins**.
2. A customer chooses one or more games from the separate commercial marketplace.
3. The SOVERIX owner contacts the customer and collects payment **manually in USD**; there is no payment gateway.
4. After verifying payment, the owner approves the requested license in the secured Cloudflare Admin Panel.
5. The customer's backend will integrate with the SOVERIX game-launch and wallet APIs once those are production-ready.

**Important:** The hosted preview is **staging**. Some games maintain local practice balances; cross-game wallet settlement, end-to-end game-round verification, and production customer SDK integration are **not yet complete**. Do not sell it as production-ready.

## Deployment

The static unified site and the new Slots/Roulette preview pages are deployed at Cloudflare Worker `soverix-game-center`. It serves `index.html`, `assets/site.*`, `data/games.json`, the two practice pages, and shared casino CSS/JS. The **existing** proprietary game provider and its eight games have not been overwritten or migrated. The other two standalone WebGL games also retain their original separate Workers.

For a full source backup, change this repo's visibility to **Private** first, then review which proprietary source files are safe to import.
