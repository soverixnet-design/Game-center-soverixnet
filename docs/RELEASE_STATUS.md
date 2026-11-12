# SOVERIX — Release & Verification Status

**Snapshot: November 12, 2026 · staging environment**

## Unified 12-game hub, Royal Slots 3D & Royal Roulette 3D (November 12, 2026)

- Live mobile-friendly hub: https://soverix-game-center.soverixnet.workers.dev/ — separate Cloudflare Worker deployed at 100% traffic.
- One game grid displays **twelve cards**: unchanged original first eight (their `/demo` launcher) and four standalone royal games (Crystal Run 3D, Battle 3D, Slots 3D, Roulette 3D).
- The original eight game provider, its private game source, its demo wallet, the Sharika app, and existing standalone Crystal/Battle Workers were **not modified** by this unified frontend deployment.
- New free Slots game: https://soverix-game-center.soverixnet.workers.dev/slots/ — CSS-3D animated symbol reels; visible and documented payout multipliers; win/loss, balance updates and locally stored round history.
- New free Roulette game: https://soverix-game-center.soverixnet.workers.dev/roulette/ — 3D-styled canvas wheel and ball, one zero (0–36), red/black, even/odd, high/low, and exact-number choices. Transparent 2×/36× total payouts; win/loss and history.
- Slots and Roulette start with one million **free, locally stored, nontransferable practice points**, share that local browser balance, and provide a free refill. No purchased coins, real-money stakes, exchange, withdrawals, commercial settlement or app-wallet integration.
- Browser Rendering smoke tests: homepage 12 cards; mobile portrait screenshots of hub, Slots and Roulette; roulette 37 number buttons; Slots 18 reel faces; full timed Slots spin and settlement; full timed Roulette spin and settlement; payout-rule calculations (zero, exact number, red/black); shared demo balance across the two paths on the same origin.
- Not yet tested: manual gameplay on several physical Android devices, long-session frame rate and performance, race conditions across multiple tabs, browser storage loss, accessibility, all possible slot payouts, and regulated-market compliance (not applicable to the free practice version but must be reviewed for any future paid product).
- **No shared server-side wallet across all 12 games.** The eight original games still use their own provider; Crystal, Battle, and Casino previews have separate local practice systems. The unified site is a launcher, not an integrated settlement backend.

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

## Royal Crystal Run 3D — 10-stage campaign (deployed and smoke-tested)

- Live game: https://soverix-royal-crystal-3d.soverixnet.workers.dev/ — dedicated Worker deployment confirmed at 100%.
- GitHub game file: `demos/royal-crystal-run-3d/index.html`; previous working version preserved as `demos/royal-crystal-run-3d/v1-backup.html`.
- Ten progressively harder stages, crystal and distance objectives, unlock-on-clear progression, practice-only rewards.
- Boss battles on levels 5 (Fire Guardian) and 10 (Crystal Emperor) use collectible attack orbs to reduce boss health.
- Three locally resetting daily missions (crystals, jumps, level clears) with claimable practice rewards.
- Top 10 scores persist in the browser only; **not a global ranking** or server-verified leaderboard.
- Verified in Cloudflare browser on mobile portrait and landscape: page render, 3D graphics/canvas, START GAME, movement, jump, dynamic distance HUD, mission counter, level picker (9 initially locked), mission panel and ranking panel.
- **Not yet verified**: full boss defeat / level-10 completion, full 10-level regression run, recovery from localStorage corruption or browser data clearing, user-device testing on diverse Android browsers.
- **Not connected** to Sharika's Main Wallet, real coin balance, D1 or the existing eight-game Cloudflare provider. No paid bets, cash value or withdrawals.

## Royal Battle 3D — playable preview

- Live isolated preview: https://soverix-royal-battle-preview.soverixnet.workers.dev/
- New public source: `demos/royal-battle-3d/index.html`, linked from the Game Center frontend independently of the original eight-game collection.
- Working playtest scope: 3D hero and enemies; mobile direction controls; sword, dodge and crystal storm special; hit points, score and practice shards; three enemy waves; Blade, Armor and Special Power upgrades; Shadow King boss (wave four).
- Cloudflare Browser Rendering verified initial menu and 3D canvas, movement, attacks, damage, wave-clear upgrade, and automated complete run ending in victory after defeating the boss.
- **Still to verify:** manual play on real Android devices, accessibility, gameplay balance, frame rate across low-end phones, local progress persistence beyond best-score, and multiplayer or global ranking (not implemented).
- Virtual practice shards cannot be transferred or exchanged. This preview is not wired to Sharika's Main Wallet, store, or private game-provider wallet; no paid stakes or cash-out.

## Incomplete / NOT production ready

- Several legacy games calculate or store practice balances locally; the entire collection does **not yet share one authoritative coin wallet**.
- End-to-end testing for every game, result, round debit/credit and history is incomplete.
- Secure production game launch sessions and SDK for third-party apps are incomplete. The license-checked staging launch API can return HTTP 503.
- Commercial wallet settlement, per-tenant end-user identity and licensing end-to-end QA are unfinished.
- No automated payment gateway (by design). Owner plans to accept payments personally and activate licenses after verification.
- Staging demo is **not a promise of commercial readiness**.

## Repo safety

The GitHub repository is **public**. It now includes the unified catalogue and public original standalone practice-game source (Crystal, Battle, Slots and Roulette). The **eight proprietary original game engines**, admin/license backend, Cloudflare secrets, D1 data and credentials remain outside this repository.

For a complete game-source archive, make the repository **private** first. This publication does **not** move the original game engine from Cloudflare or change the live Worker.

## Next priorities

1. Test the new two practice games on several real Android phones, including UI scaling and browser state recovery, and tune slot/roulette animations and odds disclosures.
2. Finish server-authoritative demo wallet and original game's round logic; only then evaluate unified account and practice-wallet integration across the 12 titles.
3. Finish secure production game launch, licensing APIs and wallet integration for third-party apps separately from the free practice showcase.
