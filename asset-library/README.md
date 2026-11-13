# SOVERIX Royal Asset Library

This folder is an original first-party, reusable vector asset collection for SOVERIX's own mobile applications. The parent game repository remains a 12-game hub. This library has no connection to practice wallets or game rules.

## Contents

- **6** VIP frames (transparent SVG, 512×512)
- **6** animated SVG entrance previews (720×1280)
- **6** medals (512×512)
- **8** SBF nobels, levels 1–8 (512×512, NOT medals)
- **6** animated SVG gift effect previews (800×800), suggested price tiers 1M–50M virtual coins
- **6** editable SVG promo banners (1200×480)

All **38** design files are stored under `graphics/`, with machine-readable metadata in `catalog.json`. The `index.html` page provides filters, search, previews, direct SVG download and a copyable URL. These SVGs are programmatically generated SOVERIX originals and do not copy any third-party stock assets.

### What is NOT complete

- The animated SVG entrance and gift effects are **visual previews only** and are not MP4/WebM with sound. Their timing and styling still require video rendering plus legally cleared sound effects.
- Android rendering, circle crop, profile-seat safe area, GIF/MP4 export and R2/CDN integrations are **not verified**.
- No third-party media has been copied into this public repository. Find candidate assets via `catalog.json > sources`, confirm item-level license and original creator before import. Mixkit SFX allow end-product use but prohibit redistribution as standalone stock; Pixabay disallows standalone resale/redistribution. LottieFiles has restrictions on compilation into competing libraries.
- The existing separate Digital Assets Provider licensing service remains independent: https://soverix-assets-provider-staging.soverixnet.workers.dev/.
- **Deployment is not automatic** from this GitHub repository; the Cloudflare Game Center Worker must be separately updated to include `asset-library/*` paths or serve the static assets. New site links may 404 before that deployment.

### Use in an app

1. Pick an item in `catalog.json`; preview it in the library.
2. Obtain the exact `graphics/<id>.svg` file from the repository and review its license/source.
3. Optimize SVG or export PNG/WebP for static Android UI. For animated entries/gifts, produce finalized transparent video/Lottie files with sound and performance testing; do not label these previews as production video gifts.
4. Add the asset to the app's own asset delivery pipeline (R2 or packaged resources), with admin assignment/duration rules handled separately.

© 2026 SOVERIX. First-party original assets; the owner may reuse these in Sharika, Sura Chat and other owned apps. Public availability of source does not grant third parties permission to commercially resell the artwork.
