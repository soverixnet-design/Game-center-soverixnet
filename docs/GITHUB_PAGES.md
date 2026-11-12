# Static hosting options

This repository contains a **public brochure and catalogue**, not the running game engine.

To publish the public brochure on GitHub Pages:

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select branch `main` and folder `/(root)`.
4. Save. GitHub will show the resulting Pages URL after the deployment.

The live, original playable games remain on Cloudflare and are linked through the **Play Original** buttons. GitHub Pages does **not** run Cloudflare Workers, D1 or the private license API.

If you need the complete proprietary original games' source controlled by GitHub, first switch the repository to **Private** under repository Settings. Then integrate the server source in a separate reviewed update; do not put production credentials into GitHub.
