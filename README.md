# SOVERIX Game Center

Public-facing source for the **SOVERIX Original Games Center**. The **playable original games, demo wallet and B2B licensing APIs remain hosted on Cloudflare**.

> This repository is **public**. It intentionally does **not** include the proprietary HTML/JavaScript game engines, customer credentials, admin passwords, D1 data, Cloudflare tokens, or source for the private licensing server. Keep the game engine in a **private** repository.

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

## What is in this repository?

- `index.html`, `assets/site.css`, `assets/site.js` — the English public landing page, eight hosted original game listings, and a link to the standalone 3D demo.
- `data/games.json` — publicly displayable metadata for the eight hosted games, **not** their game-engine code.
- `demos/royal-crystal-run-3d/index.html` — the public 3D practice game (10 levels, missions, bosses, local ranking).
- `docs/INTEGRATION.md` — developer integration model and server-side credential rules.
- `docs/RELEASE_STATUS.md` — verified staging capabilities and unfinished production work.
- `.github/workflows/validate.yml` — static source checks; does **not** automatically deploy or modify Cloudflare.

## How to run

Open `index.html` in a browser, or serve this repository with any static web server. The **Play** buttons point to the existing Cloudflare demo. No app logins or payments are handled by this GitHub frontend.

## Business flow

1. A visitor opens the original demo on Cloudflare, enters their display name and receives **1,000,000 practice coins**.
2. A customer chooses one or more games from the separate commercial marketplace.
3. The SOVERIX owner contacts the customer and collects payment **manually in USD**; there is no payment gateway.
4. After verifying payment, the owner approves the requested license in the secured Cloudflare Admin Panel.
5. The customer's backend will integrate with the SOVERIX game-launch and wallet APIs once those are production-ready.

**Important:** The hosted preview is **staging**. Some games maintain local practice balances; cross-game wallet settlement, end-to-end game-round verification, and production customer SDK integration are **not yet complete**. Do not sell it as production-ready.

## Deployment

The static site can be hosted on GitHub Pages once Pages is enabled for this repository. That does **not** deploy the proprietary game backend. The live Cloudflare game server is separate and has not been changed by this repository publication.

For a full source backup, change this repo's visibility to **Private** first, then review which proprietary source files are safe to import.
