# Changelog

All notable changes to Budian UI are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/); versioning follows [SemVer](https://semver.org/).

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
