# SOVERIX — Release & Verification Status

**Snapshot: November 12, 2026 · staging environment**

## Verified live

- Cloudflare Games Provider storefront: `https://soverix-games-provider-staging.soverixnet.workers.dev/`
- Public original game demo: `https://soverix-games-provider-staging.soverixnet.workers.dev/demo`
- Separate Digital Assets provider: `https://soverix-assets-provider-staging.soverixnet.workers.dev/`
- Eight original game previews from previous GitHub game source (names in `data/games.json`).
- Guest demo profile can be created using a display name **without email or password**.
- **1,000,000 free practice coins** displayed for new guests.
- Royal Greedy Wheel images, timer, English UI and bet chips verified in a live browser.
- Sovera Gaddy original wheel, English navigation, timer, chip controls and 1,000,000 demo coins verified in a live browser.
- English interface updates deployed; **not every dynamically generated message has been exhaustively checked**.
- B2B catalogue and manual USD quote request interface deployed.
- Games and Digital Assets have **separate** Cloudflare Workers and D1 databases.

## Incomplete / NOT production ready

- Several legacy games calculate or store practice balances locally; the entire collection does **not yet share one authoritative coin wallet**.
- End-to-end testing for every game, result, round debit/credit and history is incomplete.
- Secure production game launch sessions and SDK for third-party apps are incomplete. The license-checked staging launch API can return HTTP 503.
- Commercial wallet settlement, per-tenant end-user identity and licensing end-to-end QA are unfinished.
- No automated payment gateway (by design). Owner plans to accept payments personally and activate licenses after verification.
- Staging demo is **not a promise of commercial readiness**.

## Repo safety

The GitHub repository is **public**. It contains only the public catalogue gateway and operating/integration documentation. The original game HTML/JavaScript, admin/license backend, Cloudflare secrets, D1 data and credentials remain outside this repository.

For a complete game-source archive, make the repository **private** first. This publication does **not** move the original game engine from Cloudflare or change the live Worker.

## Next priorities

1. Finish server-authoritative demo wallet and each original game's round logic/integration.
2. Test game bet → countdown → result → atomic balance update → history for all eight games, including mobile browser.
3. Complete one-time customer app SDK, short-lived launch tokens, operator wallet API and suspension tests before licensing production games.
