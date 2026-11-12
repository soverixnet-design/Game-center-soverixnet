# SOVERIX Game Provider — Integration Guide

**Status: staging / commercial SDK NOT production-ready**

## Company onboarding

1. The operator/company submits its company name, contact email, platform and app package/bundle/domain, plus the selected games, at the [live SOVERIX Games Store](https://soverix-games-provider-staging.soverixnet.workers.dev/#request).
2. The SOVERIX owner discusses the USD price and **collects payment manually**. The storefront does not process card payments.
3. The owner checks the payment and approves the order in the [Games Admin Panel](https://soverix-games-provider-staging.soverixnet.workers.dev/admin).
4. A client ID and a one-time client secret are created for the **operator's backend only**; the owner must hand over these credentials privately.
5. The customer's app authenticates its own users. Its backend supplies a stable external user ID and asks SOVERIX for a game launch session. The hosted game frontend then loads in the app's WebView while the voice room remains in the host app.

## API design (not yet usable for production game launches)

The existing staging server exposes:

```http
POST https://soverix-games-provider-staging.soverixnet.workers.dev/api/client/launch
Content-Type: application/json

{
  "client_id": "svx_customer_example",
  "client_secret": "(NEVER IN THE MOBILE APP)",
  "game_id": "lion_food"
}
```

**The endpoint currently validates licensing and then returns HTTP 503 when the licensed original game engine is not integrated for customer launches.** It does not issue a production-ready playable URL. Do not treat a verified license as a finished integration.

`game_id` catalogue identifiers are in `data/games.json`. The hosted demo uses a **separate guest session** and 1,000,000 non-transferable free practice coins. The production customer identity and wallet flows are unfinished.

## Security requirements before launch

- Client secrets, Cloudflare API tokens, Admin credentials and server-side game logic stay on the provider backend or a **private** code repository, never inside Android APK, frontend JavaScript, or this public GitHub repository.
- The future game-launch token must be short-lived, bound to tenant, game and external user, and validated on each authorized session.
- Wallet debit/credit requires **server-to-server authentication, idempotent transaction IDs, atomic settlements, abuse controls and audit trails**.
- Disable or revoke game access promptly when a customer license expires or is suspended.
- Do not share D1 contents, internal admin secrets, signing keys or production wallet details with customers.
- Check local laws and distribution policies before enabling paid/monetary wagering or transferable virtual currency.

## What the customer actually receives

An integration guide, client ID and securely delivered secret; eventually a working **Game SDK / WebView bridge** and a launch-session API. **They do not need a copy of the original games' source code.**

## Demo access

`https://soverix-games-provider-staging.soverixnet.workers.dev/demo`

Enter any display name; receive 1,000,000 free demo coins. No account signup, email, OTP or payment required.
