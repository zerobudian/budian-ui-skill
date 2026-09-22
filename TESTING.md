# Testing

How Budian UI **v1.1.0** is verified locally and in CI. All checks are real, meaningful assertions; the test scripts live in `.github/workflows/` and derive the repository root from their own location (not from an absolute sandbox path), so they run identically on a developer machine and on a GitHub Actions runner.

## CI (automatic)

`.github/workflows/validate.yml` runs on push to `main` and on pull requests:

| Step | Command | What it verifies |
| --- | --- | --- |
| JS syntax | `node --check examples/assets/budian.js` | runtime parses cleanly |
| tokens.json valid | `python3 -c "import json; json.load(open('tokens/tokens.json'))"` | tokens.json is well-formed JSON |
| Static suite | `python3 .github/workflows/_static.py` | 519 checks (below) |
| Runtime smoke | `NODE_PATH=... node .github/workflows/_runtime.js` | 71 checks (below); jsdom installed into a temp prefix in CI |

To re-run locally from the repo root:

```bash
node --check examples/assets/budian.js
python3 .github/workflows/_static.py
mkdir -p /tmp/budian-ci && cd /tmp/budian-ci && npm init -y
npm install --no-audit --no-fund jsdom
NODE_PATH=/tmp/budian-ci/node_modules node <repo>/.github/workflows/_runtime.js
```

The repo root is intentionally derived via `pathlib.Path(__file__).resolve().parents[2]` (Python) and `path.resolve(__dirname, "..", "..")` (Node), so neither suite depends on a checkout location or the shell working directory.

## Static suite — 519 checks (`.github/workflows/_static.py`)

- **Example pages (×5)** — `examples/{starter,landing,dashboard,docs,components}/index.html`: has `<html>`, has `<main>`, has a skip link, `<script>`/`</script>` tags balanced.
- **Markdown (`*.md`)** — fenced code blocks balanced; no stray backslash-escaped backtick outside table cells; every **local** `.md` link (resolved relative to the linking file's own directory, `#anchor` stripped first) points to an existing file. External URLs (`http(s)://`, `mailto:`, `#`-only, and inline-code targets) are excluded from the check.
- **i18n key coverage (×5 examples)** — every `data-i18n="key"` and every attribute key used in `data-i18n-attr="attr:key"` is defined in both the `zh-CN` and `en` message tables.
- **Secret scan** — no GitHub PAT (`ghp_…`), `sk-…`, private key blocks, Cloudflare beacon/analytics IDs, or `AKIA…` in any tracked source file.
- **Tokens** — `tokens.json` parses as JSON; `$meta.version` is `1.1.0`; `tokens.css` header is `v1.1.0`; `--budian-target-min` present.
- **Runtime contract** — `budian.js` version `1.1.0`; `root.classList.add("js")` appears exactly once (the reveal-arming path); listens on `(prefers-color-scheme: dark)`; the invalid `(prefers-color-scheme: change)` query is absent.

## Runtime smoke suite — 71 checks (`.github/workflows/_runtime.js`, JSDOM)

Loads each of the 5 example pages head-first with the no-flash bootstrap, injects `budian.js` in real load order (bootstrap → runtime → body init), then asserts:

- No inline-script error; no-flash theme bootstrap present and ordered before any stylesheet link.
- Theme button contract: static HTML ships only a neutral `aria-label` (no hardcoded `aria-pressed`); the runtime writes `aria-pressed` to match the resolved theme.
- Reveal/progressive enhancement: `.reveal` elements exist (except documented pages that have none, e.g. docs); `html.js` is added only when reveal elements are present; `.reveal.on` is applied to in-viewport items after the IntersectionObserver path.
- i18n: every `data-i18n` node has translated text; `<html lang>` is set; a locale-toggle control exists and its label is populated by the runtime.
- No-JS gating: starter CSS gates `.reveal` hidden states behind `.js` (so no-JS leaves content visible).
- 44px targets: every example's CSS uses the `--budian-target-min` token.

Result: **71 / 71 PASS.**

## Manual-only checks

These require a real (or emulated) device and are **not** asserted by CI:

| Dimension | Values | What to verify |
| --- | --- | --- |
| Theme | light · dark · system | no first-paint flash; no unreadable pairing; meta theme-color matches; every SVG/icon legible in both; system change follows only when no manual override |
| Locale | zh-CN · en | `<html lang>` + title + description switch; no untranslated strings; no overflow/clipped nav/buttons in English (+30% length) |
| Width | 320 · 375 · 430 · 768 · 1024 · 1280 · 1440 · 1920 | no horizontal scroll; no fixed-height overflow; tap targets ≥ 44px; mobile menu reachable |
| Motion | normal · `prefers-reduced-motion` | entrances become instant; no infinite decorative loops; count-ups render final value; nothing essential depends on animation |
| Input | mouse · keyboard · touch | tab order logical; `:focus-visible` ring on every control; tabs arrow-keyable; dialog/drawer focus + Esc; nothing core behind hover only |
| Runtime | JS on · JS off | content, links, nav basics usable with JS disabled (reveal states gated on `.js`); native `<details>` menu works; dark mode still applies via the CSS `prefers-color-scheme` fallback |

Design-level assertions checked during build (not CI): single focal point per first viewport; one accent family; gradient phrase used at most once per page (hero line only); hairline separation before card containers; glass only on floating layers; no fabricated metrics/testimonials/logos.

## Known limitations

- Visual rendering is verified structurally (DOM/CSS via JSDOM), **not** pixel-screenshot-diffed across browsers. Real desktop/mobile screenshots and browser-console inspection remain a manual step.
- Safari < 14 gets the `addListener` fallback path (syntax-exercised, not run on real devices).
- `backdrop-filter` degrades to translucent solid color on unsupported browsers (values chosen so contrast holds either way).
- The Tailwind adapter outputs a theme object but is not wired into a real Tailwind build (it is an example, per the framework-agnostic rule).
- CI runs jsdom in Node without a headless-browser layout engine, so width-specific overflow, exact pixel spacing, and focus-ring geometry are covered only by the manual matrix above.