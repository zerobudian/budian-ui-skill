# Changelog

All notable changes to Budian UI are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/); versioning follows [SemVer](https://semver.org/).

## [1.1.0] — 2026-09-22

Maintenance release focused on trigger semantics, progressive-enhancement robustness, theme correctness, and accessibility enforcement. No visual redesign; the design language is unchanged.

### Fixed

- **Reveal gating could hide content forever** — the runtime added the `js` class to `<html>` at script load, so if `budian.js` loaded but `Budian.init()` never ran (or threw), `.reveal` elements stayed `opacity: 0` permanently. The `js` class is now added only inside `reveal.init()`, after the IntersectionObserver path is confirmed available. A failed/missing runtime now always leaves content visible. Added a 4s failsafe that force-reveals any in-viewport element whose IO callback never fired.
- **System theme never actually followed live** — the OS-change listener used the invalid media query `"(prefers-color-scheme: change)"`, which never fires. Now listens on `matchMedia("(prefers-color-scheme: dark)")` change events; system appearance flips apply in real time while no manual override exists, and manual overrides are never clobbered.
- **Theme toggle could show a wrong pre-init state** — pages hardcoded `aria-pressed="false"` and a "switch to dark" label, wrong whenever the page booted in dark mode. Static HTML now ships a neutral `aria-label` only; the runtime writes `aria-pressed` and the direction-specific label after init (icon was already CSS-driven and correct from first paint).
- **44px touch targets not met by the examples themselves** — all five examples' icon buttons were 40×40, `.btn--sm` 40px, starter/landing top-nav links ~30px, docs search box 40px, docs TOC links ~29px. All now use `--budian-target-min` (44×44). The Button spec changed from "40–52px" to "44–52px; small variants shrink padding/font, not the target".

### Changed

- **Trigger semantics (SKILL.md + agents/openai.yaml + README)** — activation is now task-type based ("any task involving user interface work, in any project"), replacing the old project/brand-name triggers (GFW X, Resident3, Ciphey, Budian Cloud, etc.). Budian UI is described as the default UI design and frontend visual-quality standard for all projects; explicit non-UI exclusions listed (backend, CLI, data-only, …) with UI-inclusive override.
- **Language policy** — new "Language & locale" section: inherit the project's language, never impose one, never hardcode Chinese by default, no gratuitous English mixing; the zh-CN/en machinery is now clearly scoped to genuinely multi-language projects. Same policy added to `docs/i18n.md` and README.
- **Design participates from the start** — new SKILL.md section: 12-stage workflow (product goal → users → identity → hierarchy → branch → tokens → layout → responsive → states → motion → QA → iterate) and an explicit ban on "build first, beautify later".
- **Mandatory UI QA loop** — new SKILL.md section: 17-step loop for runnable projects (launch, console, desktop/mobile, overflow, truncation, nav, interactions, states, both themes, reduced motion, keyboard, a11y, fix, re-verify), with the rule "never claim visual verification without performing it".
- **Anti-patterns** — the Do/Don't list is now an explicit hard-ban list (gratuitous gradients, excessive blur, card-wrapping, pill spam, fake metrics/testimonials/logos, desktop-scaled-mobile, gray-on-gray, decorative motion harming usability, removing functionality for cleanliness, unasked brand redesigns, …).

### Added

- `a11y.themeToggle` neutral label key in all five examples (both locales), used by the new theme-button contract.
- `reveal.armed` state; reveal init is idempotent.
- Documentation: theme button-state contract and live-follow implementation notes (`docs/theme.md`), language-inheritance principles (`docs/i18n.md`), reveal arming iron rule (`docs/motion.md`), 44px enforcement record (`docs/accessibility.md`), round-2 maintenance rows (`docs/gap-analysis.md`).

## [1.0.0] — 2026-09-21

First stable release. Baseline: `budian-ui-open-source.zip` (v0 draft). This release re-derives the entire system from live evidence, restructures the repository, and adds runnable examples.

### Added

- **Evidence framework** — `docs/evidence.md`: every rule tagged `Observed` / `Inferred` / `Recommended` with its source page, from a full crawl of 11 Budian-family pages (budiancloud, gfw-x, resident3, h3flowconsole, budianai, ciphey, vellunote, budianwtx, boogleone, budianfarm, budianyun).
- **Gap analysis** — `docs/gap-analysis.md`: requirement-by-requirement audit of the v0 ZIP with PASS/PARTIAL/FAIL verdicts and the actions taken.
- **Complete token system** — `tokens/tokens.css` (semantic + raw layers, dark theme, no-JS dark fallback, reduced-motion kill switch), `tokens/tokens.json` (portable), `tokens/tailwind-example.js` (adapter example).
- **Shared runtime** — `examples/assets/budian.js`: theme (3 modes, live OS-following, meta sync), i18n (detection, persistence, `Intl` formatting), reveal, toast, count-up, clipboard; ~7KB, zero dependencies.
- **Five runnable examples** — landing (editorial index), dashboard (workbench), docs (documentation), components (gallery), starter (skeleton); plus an examples index page. All fictional products.
- **Documentation set** — `docs/`: design-system, colors, typography, spacing, layout, components, responsive, motion, theme, i18n, accessibility, performance, patterns (13 files).
- **Repo meta** — README, CHANGELOG, CONTRIBUTING, TESTING, .gitignore.

### Changed

- **Theme architecture** — v0 stored a single `budian-theme` value and toggled dark/light only. v1 adds the `system` mode (remove key, follow OS live via `matchMedia` change events), syncs all `meta[name=theme-color]` tags on switch, and adds a pure-CSS `prefers-color-scheme` fallback for JS-off visitors.
- **SKILL.md** — rewritten around the five questions (looks / behaves / adapts / implemented / AI workflow); tokens now reference the canonical files instead of inline duplicating; added page patterns, visual branches, do/don't, validation checklist.
- **i18n** — v0 had no i18n at all. v1 introduces the full architecture (messages object, `data-i18n`, locale persistence, `<html lang>`/title/description sync, `Intl` formatting, layout-flex rules for English length).
- **Token naming** — unified to the `--budian-*` prefix with semantic/raw separation; v0's ad-hoc `--bg`/`--fg`/`--line` names retired.

### Fixed

- No-JS content visibility: reveal hidden states are now gated behind the `.js` class set by the runtime, so content is never hidden when JavaScript fails.
- `prefers-reduced-motion` now ships globally in `tokens.css` (v0 required per-page copies).
- Hero `line-height`/`letter-spacing` normalized for CJK safety (`.92` → `.95`, `-.075em` → `-.06em`) per documentation notes.

### Removed

- Nothing user-facing. v0's `references/design-system.md` and `assets/starter/*` were superseded by `docs/` and `examples/starter/`.

## [0.1.0] — baseline

Initial draft from `budian-ui-open-source.zip`: minimal SKILL.md, single-file starter, basic light/dark toggle.
