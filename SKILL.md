---
name: budian-ui
description: The default UI design and frontend visual-quality standard for all projects. Invoke whenever ANY task involves user-interface work — creating or restyling websites, web apps, dashboards, admin panels, landing pages, or any GUI; designing, implementing, modifying, refactoring, or reviewing UI; components, layout, forms, theming, responsive, motion, or accessibility — in any frontend stack. Not for backend, CLI, or data-only work.
---

# Budian UI

Budian UI is a quiet, technical, high-contrast interface language. Hierarchy comes from **scale, spacing, typography, alignment, and behavior** — never from decoration. This file is the complete working core of the system; deeper rationale and per-topic details live in `docs/` (see References).

After reading this skill you should be able to answer five questions without visiting the original sites:
**How Budian UI looks · How it behaves · How it adapts · How it is implemented · How AI should build with it.**

## Purpose

Budian UI is the default UI design and frontend visual-quality standard for all projects. It turns any product — a landing page, a developer tool, a dashboard, docs, or a single-purpose utility — into an interface with calm surfaces, oversized statements, hairline structure, one accent, restrained motion, automatic light/dark and locale adaptation. It provides design discipline and quality standards, not a fixed template: never flatten every project into the same website.

## When to use

**Automatically activate this skill whenever any task involves user interface work, in any project.** The trigger is the task type — never a project, brand, or repository name.

Activate when the task involves:

- Creating a website, web app, dashboard, admin panel, or landing page.
- Creating any new project that includes a graphical user interface.
- Designing, implementing, modifying, refactoring, optimizing, or reviewing existing UI.
- Changing frontend code that affects anything the user can see or interact with.
- Designing components, layout, navigation, forms, settings pages, modals, tables, cards, empty states, loading states, error states.
- Working on design systems, typography, spacing, color, or iconography.
- Responsive design.
- Dark / light mode.
- Accessibility work with a visual or interaction dimension.
- Motion, animation, or interaction design.
- Visual unification or UI polish of an existing project.

Any stack qualifies: HTML/CSS/JS, React, Next.js, Vue, Svelte, Astro, Flutter Web, or any other frontend framework. The rules are stack-agnostic; map the token layer onto the project's stack (see `tokens/` and `tokens/tailwind-example.js`).

Do NOT activate for purely non-UI work: backend, database, API-only, CLI, infrastructure, CI/CD, build tooling, security analysis, data processing, or purely textual documentation. If such a task also includes a user interface, activate.

Explicitly naming Budian UI (or 不点 UI) always activates too.

## Design philosophy

Distilled from 11 live Budian pages (evidence: `docs/evidence.md`):

1. **One focal point per viewport.** An oversized line of copy, a dominant number, a centered task, or one work surface. Everything else supports it.
2. **Near-black and off-white, rarely saturated.** Content is monochrome; color is information (one accent + status colors + per-card accent palette).
3. **Hairlines before containers.** Separate regions with whitespace and 1px rules; add cards only where elevation means something.
4. **Glass is elevation, not identity.** Translucent blur surfaces are reserved for floating layers (topbar, cards over ambient art, dialogs, toasts) — never for all content.
5. **Technical metadata as texture.** Small uppercase/mono labels (kickers, indexes, section notes) give pages an engineered feel.
6. **Motion communicates hierarchy, relationship, state.** One reveal system, one functional animation per section at most. Nothing floats or glows without purpose.
7. **Mobile is a deliberate composition**, not a scaled-down desktop.
8. **Web standards first, zero runtime dependencies.** Native `<dialog>`, `<details>`, IntersectionObserver, `matchMedia`, `Intl`. No framework required; adapts to any.

Anti-goal: do not drift into a generic Tailwind demo, Vercel/Linear/Stripe clone, or shadcn starter. Budian UI is quieter, more typographic, more mono-labeled than those.

## Design participates from the start

Once this skill is active, design is not a coat of paint applied at the end. The design principles must shape the work from the moment the task begins:

1. Understand the product goal and the page's single purpose.
2. Understand the users and the usage context.
3. Inherit any existing product identity — colors, voice, components. Do not impose Budian's palette on a product that already has one; apply the discipline, not the look.
4. Decide the information hierarchy and the one focal point.
5. Choose the visual branch and page pattern.
6. Establish design tokens (color, type scale, spacing) before writing component code.
7. Implement layout and components against those tokens.
8. Implement responsive behavior.
9. Implement interaction states.
10. Implement motion.
11. QA against the actually rendered result (see the UI QA loop below).
12. Iterate at least once on the real rendering before delivering.

**Forbidden**: build the page first, then "beautify" it by tweaking CSS colors at the end. If a task begins as non-UI work and UI appears mid-task, the skill activates from that moment.

## Core tokens

Canonical source: `tokens/tokens.css` (CSS) and `tokens/tokens.json` (portable). Copy them into the project; never redefine values ad hoc. Components consume **semantic** tokens only — raw hex lives solely inside the token files.

**Typography** — sans: `Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui`; mono: `ui-monospace, "SFMono-Regular", Consolas, Menlo`. No webfont downloads anywhere in the system.

| Role | Size | Line-height | Tracking | Weight |
| --- | --- | --- | --- | --- |
| display (hero) | `clamp(58px, 8.2vw, 118px)` | .95 | -.06em | 780 |
| title (section h2) | `clamp(34px, 4vw, 52px)` | 1.05 | -.05em | 800 |
| heading (card h3) | 19px | 1.25 | -.02em | 700 |
| subheading | 16px | 1.5 | 0 | 650 |
| body | 15px | 1.7 | 0 | 400 |
| lede (hero paragraph) | `clamp(16px, 1.8vw, 21px)` | 1.75 | -.01em | 400 |
| small | 13px | 1.5 | 0 | 400 |
| caption / mono metadata | 11px | 1.4 | .12em | 400–600 |
| kicker (uppercase label) | 11px | 1 | .18em | 800 |

Keep the scale closed: do not invent intermediate sizes. Negative tracking only at ≥34px. Metrics and live numbers use `font-variant-numeric: tabular-nums`. Use the serif stack (`ui-serif, "Songti SC", "Noto Serif CJK SC", Georgia`) **only** in the atmospheric branch.

**Color** — semantic tokens, both themes:

| Token | Light | Dark |
| --- | --- | --- |
| `--budian-bg` | `#f3f5f8` | `#050609` |
| `--budian-bg-inset` | `#ebeef3` | `#0b0e14` |
| `--budian-surface` | `rgba(255,255,255,.68)` | `rgba(15,18,25,.66)` |
| `--budian-surface-strong` | `rgba(255,255,255,.90)` | `rgba(17,20,28,.92)` |
| `--budian-text-primary` | `#111419` | `#f4f7fb` |
| `--budian-text-secondary` | `#3f4756` | `#c3cad6` |
| `--budian-text-muted` | `#667085` | `#9299a8` |
| `--budian-border` | `rgba(15,23,42,.12)` | `rgba(255,255,255,.11)` |
| `--budian-accent` | `#237cff` | `#48b8ff` |
| `--budian-ring` | `#1a78ff` | `#67b6ff` |
| success / warning / danger | `#0ca30c` / `#c58100` / `#e65243` | `#34ef8a` / `#f0b340` / `#ff6b5c` |

Rules: one accent family per page; the 9-color card palette (cyan/green/violet/blue/amber/lime/orange/rose/red, see tokens) is for categorizing list items, injected via a local `--card-accent` variable. The gradient phrase `linear-gradient(100deg,#1976ff,#63d8ff,#7c5cff)` may appear **once** per page, on one hero line only. Derive hovers/tints with `color-mix(in srgb, var(--budian-accent) N%, transparent)` instead of new hex values.

**Spacing / radius / shadow** — spacing on a 4px scale (`--budian-space-1`…`24`), section rhythm `--budian-space-section: clamp(64px, 9vw, 112px)`. Radius: 10 / 14 (buttons) / 18 (cards) / 24 (dialogs) / 32 (hero panels) / 999 (pills). Shadows are large-blur/low-alpha (`--budian-shadow-sm…xl`); glass surfaces add `--budian-highlight-edge`. Blur: 20 cards, 28 composers, 36 dialogs, 95 ambient.

**Layout** — container `min(1240px, calc(100% - 40px))` (mobile `calc(100% - 28px)`); secondary widths 1180 / 940 / 640. Grid gaps 10–20px between cards; sections separated by hairlines + big whitespace. Workbench pattern: main column + 220–316px side panel.

**Motion** — durations 140 (instant) / 250 (fast) / 350 (normal) / 650 (slow) / 950ms (grand); ambient loops 6–36s. Easing `--budian-ease-standard: cubic-bezier(.22,1,.36,1)` and `--budian-ease-enter: cubic-bezier(.2,.8,.2,1)`. Reveal stagger 55ms. Animate `transform`/`opacity` (plus one-time `filter: blur` on the hero title only); avoid animating layout properties.

## Theme (mandatory default)

Unless the user explicitly opts out, every page supports automatic light/dark:

1. **Inline, in `<head>`, before the stylesheet** — no-flash initialization:

```html
<script>
  (function () {
    var t = null;
    try { t = localStorage.getItem("budian-theme"); } catch (e) {}
    if (t !== "light" && t !== "dark") {
      t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.dataset.theme = t;
  })();
</script>
```

2. **CSS**: light tokens on `:root`, dark overrides on `:root[data-theme="dark"]`, plus `color-scheme: light` / `dark` on the same selectors (native controls and scrollbars follow).
3. **Three modes** — `system` / `light` / `dark`: manual choice persists in `localStorage("budian-theme")`; when absent, follow OS and keep following live `matchMedia("(prefers-color-scheme: dark)")` change events while the page is open. A manual override is never clobbered by system changes.
4. **meta theme-color**: ship both `<meta name="theme-color" media="(prefers-color-scheme: light)" content="#f3f5f8">` and a dark variant, and update them from JS on manual override so the browser chrome never shows the wrong color.
5. **Switching must not reload the page.** Toggle swaps `data-theme`, syncs the button's `aria-label` and icon, updates meta theme-color.
6. **Button state must match reality.** After initialization, a theme toggle's icon, `aria-label`, and `aria-pressed` must all agree with the currently resolved theme — never "page is dark, button still says switch to dark". Static HTML ships only a neutral `aria-label`; the runtime writes `aria-pressed` and the direction-specific label, so a failed runtime cannot leave a wrong state behind.
7. **Every asset adapts**: SVG icons use `currentColor`; ambient orbs and gradient phrases have dark-mode-tuned opacities; code blocks stay dark in both themes; images get theme-appropriate treatment or overlays. Never ship a white-on-white or black-on-black asset in either theme.
8. No flash on first paint (rule 1), no half-themed components after switching (rule 7).

## Language & locale

Budian UI does not impose a language. Language policy:

- Inherit the project's existing language; never switch it unasked.
- Never override a language the user explicitly requested.
- New projects that already have a locale system keep it.
- Do not hardcode Chinese by default; do not sprinkle English into a non-English UI for a "premium" feel.
- Multi-language layouts must tolerate text-length differences between locales (English runs ~30% longer than zh-CN) — no fixed widths tied to one language's text.
- `<html lang>` must match the actual content language.
- A single-language project does not need an i18n framework — write clean copy in the project's language and skip the machinery below.

When a project genuinely is multi-language, support it properly (zh-CN / en in the reference runtime):

```js
const messages = {
  "zh-CN": { "nav.product": "产品", "hero.title": "让想法，成为可抵达的坐标。" },
  "en": { "nav.product": "Product", "hero.title": "Ideas, as reachable coordinates." }
};
```

- **Detection**: `localStorage("budian-locale")` → else `navigator.language` mapped `zh* → zh-CN`, everything else → `en`.
- **Application**: text nodes via `data-i18n="key"`; attributes via `data-i18n-attr="placeholder:key,aria-label:key2"`. No hardcoded UI strings scattered in markup.
- **Sync on switch**: `<html lang>`, `document.title`, meta description, all aria labels, placeholders, toasts, errors.
- **Dates/numbers/currency**: `Intl.DateTimeFormat` / `Intl.NumberFormat` with the active locale — never hand-formatted.
- **Layout tolerance**: buttons, navs, cards, and form labels must flex. Verify no overflow/clipping in every supported locale.
- Manual locale choice persists; otherwise browser locale wins on every visit.

## Responsive (mandatory default)

- Mobile-first; canonical breakpoints `640px` / `900px` / `1024px` (max-width media queries; 1024 mainly for sidebar layouts). These are observed Budian clusters, not Tailwind defaults — do not "fix" them to 768/1280.
- Gutters: 20px desktop → 14px below 640. Topbar 92px → 76px mobile.
- At 900: hide secondary labels/destinations, keep primary nav. At 640: stack workbench panels, single-column grids, full-width dialogs (`width: calc(100% - 28px)`).
- Test widths: 320, 375, 430, 768, 1024, 1280, 1440, 1920. No horizontal scroll, no fixed-height overflow, no unreachable navigation, tap targets ≥ `--budian-target-min` (44×44px) on every interactive control — icon buttons, nav links, and small buttons included.
- Viewport: `width=device-width, initial-scale=1, viewport-fit=cover`; use `100svh`/`100dvh` (not `100vh`) for full-height heroes; honor `env(safe-area-inset-top/bottom)` for notches and gesture bars.
- Touch: core information must not live behind `:hover` only. Guard hover-only reveals behind `@media (hover: hover)`.

## Components (core set)

Documented in `docs/components.md`; live reference in `examples/components/`. Composition rules:

- **Topbar** — 92/76px, hairline bottom, 38px square brand mark (foreground-on-background), small action cluster (icon buttons + one solid primary). Glass blur when fixed.
- **Button** — heights 44–52px (never below `--budian-target-min`; small variants shrink padding and font, not the target), radius 14, weight 600–650. Variants: solid (fg bg / bg text), ghost (surface + border), text. States: default, hover, `:focus-visible`, active (1–2px press), disabled (`.55` opacity), loading (inline spinner, keeps width).
- **Card / Row card** — radius 18, hairline border, `--budian-surface` + blur(20) + edge highlight; min-height 94–108px; grid `[index] [icon] [copy] [destination]`. Hover: -2px lift, accent-tinted border via color-mix, one gradient sheen sweep max. Icon tile: 42px, radius 13, accent at 9% bg / 17% border.
- **Input / Textarea / Select** — radius 10–14, hairline, bg-inset or surface; `:focus-within` accent border + ring; labels tied with `<label for>`; 44px min height.
- **Tabs** — compact, hairline track, active = stronger text + 2px underline or white inset pill; `role="tablist"/"tab"/"tabpanel"`, `aria-selected`, arrow-key cycling.
- **Segmented control** — for true mode switches only (not navigation).
- **Modal** — native `<dialog>`, radius 24, `surface-strong` + blur(36), blurred backdrop, click-outside closes, one clear primary action; entrance 300ms scale+fade.
- **Toast** — fixed bottom-center, radius 14, blur(24), `role="status"` + `aria-live="polite"`, auto-dismiss ~2.8s, no reflow-jank (re-trigger via class toggle).
- **Alert / Callout** — status-tinted border-left or pill, used in docs and forms.
- **Code block / Terminal** — always-dark surface (`--budian-code-bg`), mono 13px, radius 14+, optional header bar with copy button (`navigator.clipboard` with fallback).
- **Table** — hairline rows, mono numerals, right-aligned metrics, sticky header in dashboards.
- **Stat card** — one dominant tabular number + kicker label; optional count-up animation.
- **Status indicator** — 7px dot + glow for "live", status colors for state.
- **Badge / Pill** — 9–11px, radius 999, tinted at 7–9% bg / 17–22% border.
- **Empty state** — dashed hairline box, short copy, one action.
- **Skeleton** — for genuinely async regions only; never wrap static content.
- **Progress** — pill track, height 6–18px, width-transition 720–800ms.
- **Tooltip** — CSS-only via `data-tip` + `::after` where possible; dismissible on focus loss.
- **Dropdown menu** — prefer native `<details>` for progressive enhancement; custom menus need full keyboard + aria.
- **Sidebar** (dashboard/docs) — 220–280px, hairline right, collapses to overlay drawer ≤900px with focus trap and scrim.

Every interactive component implements: default, hover, `:focus-visible`, active, selected, disabled, loading where applicable. `outline: none` without a replacement ring is forbidden.

## Page patterns

1. **Landing / editorial index** (budiancloud-like): topbar → hero (kicker + status light, display headline with one gradient line, lede, scroll cue) → hairline sections with kicker+h2 headings → row-card grid with staggered reveal → social/link section → footer. Ambient: 1–2 blurred orbs + optional grid field.
2. **Developer tool / product workbench** (h3flow-like): topbar with live status → compact hero → workbench in first viewport (main canvas + 316px controls panel) → feature rows → integration/code → CTA. Task surface first, marketing second.
3. **Technical showcase** (resident3/gfw-x-like): one dominant metric/name, black canvas + single luminous accent, animated bars/flows/diagrams built from simple SVG/CSS, scenario switchers that reveal architecture, explicit measured-vs-estimated labeling.
4. **Dashboard**: sidebar nav + topbar → metric row (stat cards) → chart region (CSS/SVG bars, tabular numbers) → data table with actions → dialogs for settings. Density higher than landing, still hairline-structured.
5. **Documentation**: header with search → persistent sidebar TOC → article column (~72ch) with code blocks, callouts, prev/next → mobile drawer nav.
6. **Calm utility** (ciphey/wtx-like): reduce chrome to task + status + actions; two-pane input/output or centered single task; compact tabs; privacy/local-processing note near the task.
7. **Status page** (if needed): availability banner, uptime metric, incident timeline — same tokens, status colors doing the talking.

Visual branches (choose one, combine only if the product truly needs both): **editorial index · product workbench · technical showcase · calm utility · atmospheric experience** (serif + pastel + slow motion, vellunote-like). See `docs/design-system.md`.

## AI workflow

When asked to build or restyle a page, follow in order:

1. Understand the product, its real content, and the page's single purpose.
2. Identify content hierarchy; pick the one focal point for the first viewport.
3. Choose a page pattern + visual branch.
4. Build semantic HTML first (landmarks, headings, native elements: `dialog`, `details`, `button`).
5. Import Budian tokens; apply typography/color/spacing tokens — no raw values.
6. Lay out with the container formula, hairline sections, and responsive grids.
7. Wire the theme module (inline no-flash script, three modes, meta sync, button-state contract).
8. Wire locale: inherit the project's language; if (and only if) the project is multi-language, wire the i18n module (messages object, data-i18n, Intl formatting, lang sync).
9. Add component states (hover/focus-visible/active/disabled/loading/empty/error).
10. Add accessibility behavior (labels, aria, keyboard paths, skip-link).
11. Add restrained motion (one reveal system, optional one functional animation).
12. Optimize (system fonts, no layout-thrashing animation, minimal deps, no unused CSS).
13. Test the matrix: theme × locale × width (375/768/1440 minimum) × reduced-motion × keyboard × no-JS — for runnable projects, via the UI QA loop below, not source-code reading alone.
14. Remove unnecessary effects — if an animation explains nothing, delete it.
15. Compare the result against the Design Philosophy above and the checklist below; fix deviations before delivering.

## UI QA loop (mandatory)

For any UI project that can be run or previewed, never judge completion from source code alone. Start the project / open the preview and actually run the page. When the environment supports screenshots or a live preview, prefer examining real renders over static CSS analysis.

Work through, in order:

1. Start the project; confirm the page opens.
2. Check the browser console for errors and warnings.
3. Desktop viewport check.
4. Mobile viewport check.
5. Check for horizontal overflow.
6. Check for text truncation or clipping.
7. Check navigation works.
8. Check the primary interactions work.
9. Check hover / focus / active states.
10. Check loading / empty / error states where applicable.
11. Check light mode.
12. Check dark mode.
13. Check `prefers-reduced-motion`.
14. Check keyboard navigation.
15. Check for obvious accessibility problems.
16. Make at least one necessary fix based on the actual rendered result.
17. Re-verify after the fix.

Never claim "visually verified" without having performed the corresponding verification. If the environment genuinely cannot run or render the project, say so explicitly, fall back to the static validation checklist, and list what could not be verified.

## Do / Don't

**Do**: use real, traceable content; keep one accent; separate with hairlines and whitespace; make metadata mono/uppercase; use tabular numbers; test every supported locale and theme; keep JS progressive (content readable without it); prefer native elements; inherit the project's language and identity; document states.

**Don't — hard anti-patterns**:

- **Gratuitous gradients** — one gradient phrase per page, hero line only. Nothing else glows.
- **Excessive glass blur** — blur is for floating layers (topbar, dialogs, toasts), never all content.
- **Every section wrapped in a card** — hairlines + whitespace first; cards only where elevation means something.
- **Excessive pills** — pills are for tags and status, not for every label or button.
- **Animation everywhere** — one reveal system, one functional animation per section at most.
- **Huge hero with no product information** — the first viewport must explain what the product does.
- **Fake metrics, fake testimonials, fake customer logos, invented product capabilities** — never fabricate content; if real data is unavailable, use clearly-labeled placeholders.
- **Desktop UI merely scaled down on mobile** — recompose the hierarchy for small screens.
- **Low-contrast gray-on-gray text** — text tokens exist for a reason; check both themes.
- **Decorative motion that harms usability** — motion communicates hierarchy/state or it gets deleted.
- **Removing functionality for visual cleanliness** — quiet ≠ feature-poor.
- **Redesigning brand identity without being asked** — apply the discipline, not the look; respect the product's existing identity.
- Fix widths to one language's text; animate on every scroll event; use emoji as production icons; use `!important` (except the reduced-motion kill switch); hide content behind hover; ship a page whose content requires JavaScript to appear (reveal hidden states arm only after the reveal runtime initializes); copy the original sites' source, logos, analytics tokens, or private data — the system is learned from them, not copied from them.

## Validation checklist

Before delivering any Budian UI page, verify:

- [ ] One focal point in the first viewport; hierarchy readable at a glance
- [ ] Only semantic tokens consumed; no raw hex/magic numbers in components
- [ ] Light + dark both correct: no flash, no unreadable pairing, no wrong-colored asset, meta theme-color synced, toggle button state (icon + aria-label + aria-pressed) matches the resolved theme
- [ ] Every supported locale: correct `<html lang>`, no untranslated hardcoded strings, no overflow in any locale, Intl-formatted dates/numbers; project language inherited, never imposed
- [ ] Widths 375 / 768 / 1440 (+320/1920 spot checks): no horizontal scroll, no clipped text, ≥`--budian-target-min` (44px) targets on every interactive control
- [ ] Keyboard: tab order logical, focus ring visible on every control, modal/drawer focus behavior correct
- [ ] `prefers-reduced-motion`: entrances instant, no loops, state feedback intact; no essential information depends on animation
- [ ] No-JS and failed-runtime: content, links, and nav basics still usable — reveal hidden states arm only after the reveal runtime initializes, so a dead script can never hide content
- [ ] Motion restrained: one reveal system, durations from the token scale, transform/opacity only
- [ ] Zero new runtime dependencies; fonts are system stacks
- [ ] Semantic HTML landmarks + headings; aria only where native semantics fall short
- [ ] UI QA loop executed against the running page (or an explicit list of what could not be verified and why)

## References

- `tokens/tokens.css` · `tokens/tokens.json` · `tokens/tailwind-example.js` — canonical values (CSS / portable / Tailwind adapter)
- `docs/design-system.md` — full system: branches, tokens, components, per-site observations
- `docs/evidence.md` — every rule's source and Observed/Inferred/Recommended classification
- `docs/colors.md` · `typography.md` · `spacing.md` · `layout.md` · `components.md` · `responsive.md` · `motion.md` · `theme.md` · `i18n.md` · `accessibility.md` · `performance.md` · `patterns.md` — per-topic deep dives
- `examples/landing` · `dashboard` · `docs` · `components` · `starter` — runnable reference implementations (open `index.html` directly)
- `AUDIT.md` · `docs/gap-analysis.md` · `TESTING.md` — provenance: what came from the original ZIP, what changed, what was tested

When implementing, produce working code, not style descriptions. Reuse the target project's stack and conventions; for new static pages, start from `examples/starter/` or the closest example and adapt content, never the token values.
