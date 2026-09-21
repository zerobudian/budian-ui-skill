# Testing

How Budian UI v1.0.0 was verified, and how to re-run every check. Two automated suites (46 static checks + 56 runtime checks) plus a manual matrix; all green at release.

## Automated suites

### 1. Static suite (46 checks)

Covers: HTML well-formedness, `lang`/`<main>`/skip-link presence, inline theme bootstrap ordering (before stylesheets), i18n key coverage (every `data-i18n` key defined in both locales), internal link + anchor resolution, raw-color audit (example CSS contains zero hex/rgba — tokens and `color-mix` only), `tokens.css` ↔ `tokens.json` sync (all 120 CSS variables represented), secret scan (API keys / tokens / Cloudflare beacons / analytics IDs).

```bash
# equivalent logic, run from repo root:
node --check examples/assets/budian.js
python3 <test suite>   # see repository history for the exact script
```

Result at release: **46 / 46 PASS.** Fixes it forced: JS block-comment syntax error (`*/` inside a path), missing `#top` anchor, raw `#fff`/`#000` in example CSS (replaced with the new `--budian-on-danger` token and `black` mask keyword), incomplete tokens.json (regenerated, 120 vars).

### 2. Runtime smoke suite (56 checks, JSDOM)

Loads each example page, executes the runtime + inline scripts, then exercises the controls:

| Check | What it proves |
| --- | --- |
| no runtime errors | page scripts execute cleanly |
| theme toggle flips `data-theme` | light ↔ dark switching works |
| theme persists to `localStorage` | manual preference survives reload |
| `aria-pressed` syncs | toggle button state stays truthful |
| locale toggle flips `<html lang>` | zh-CN ↔ en switching works |
| locale persists | manual locale survives reload |
| `data-i18n` node has text | translation actually applied to the DOM |
| `html` has `.js` class | reveal gating is JS-gated → **no-JS content stays visible** |
| `.reveal.on` applied | IntersectionObserver path activates |
| meta `theme-color` synced | browser chrome follows the active theme |

Result at release: **56 / 56 PASS** across all 6 pages (landing, dashboard, docs, components, starter, examples index).

## Manual matrix (how to re-run by hand)

Open `examples/index.html` and work through:

| Dimension | Values | What to verify |
| --- | --- | --- |
| Theme | light · dark · system | no first-paint flash; no unreadable pairing; meta theme-color matches; every SVG/icon legible in both |
| Locale | zh-CN · en | `<html lang>` + title + description switch; no untranslated strings; no overflow/clipped nav/buttons in English (+30% length) |
| Width | 320 · 375 · 430 · 768 · 1024 · 1280 · 1440 · 1920 | no horizontal scroll; no fixed-height overflow; tap targets ≥ 44px; mobile menu reachable |
| Motion | normal · `prefers-reduced-motion` | entrances become instant; no infinite decorative loops; count-ups render final value; nothing essential depends on animation |
| Input | mouse · keyboard · touch | tab order logical; `:focus-visible` ring on every control; tabs arrow-keyable; dialog/drawer focus + Esc; nothing core behind hover only |
| Runtime | JS on · JS off | content, links, nav basics usable with JS disabled (reveal states gated on `.js`); native `<details>` menu works; dark mode still applies via the CSS `prefers-color-scheme` fallback |

Design-level assertions checked during build: single focal point per first viewport; one accent family; gradient phrase used at most once per page (hero line only); hairline separation before card containers; glass only on floating layers.

## Known limitations

- Visual rendering was verified structurally (DOM/CSS), not pixel-screenshot-diffed across browsers.
- Safari < 14 gets the `addListener` fallback path (untested on real devices, code path is exercised for syntax).
- `backdrop-filter` degrades to translucent solid color on unsupported browsers (values chosen so contrast holds either way).
- The Tailwind adapter outputs a theme object but is not wired into a real Tailwind build (it is an example, per the framework-agnostic rule).
