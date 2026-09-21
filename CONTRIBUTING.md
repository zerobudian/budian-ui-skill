# Contributing to Budian UI

Thanks for helping the system stay sharp. The one rule that matters most:

> **Evidence → Pattern → Rule → Skill.** Never "I like it → add it."

Every proposed change to a rule, token or component must be able to answer: *why does this belong in Budian UI?*

## The three evidence classes

Use them honestly; they are the system's fact boundary.

| Class | Meaning | Example |
| --- | --- | --- |
| `Observed` | Measured directly from a live Budian page or its source | "Card radius is 16–19px across budiancloud and h3flowconsole" |
| `Inferred` | Consistent across several pages, normalized into a rule the source never states | "Section rhythm normalized to clamp(64px, 9vw, 112px) from the 58–130px band" |
| `Recommended` | Engineering best practice added to complete the system | "Touch targets ≥ 44px" |

Never present a `Recommended` rule as something Budian Cloud already does.

## How to contribute each kind of change

### A new component

1. Check it isn't already covered in `docs/components.md`.
2. Ask: does a *real future page* need it (date picker, data grid, file upload are legitimate), or is it speculative?
3. Build it from **existing tokens only** — no new hex, no new sizes outside the type scale.
4. Document: purpose, anatomy, variants, states, responsive behavior, both themes, a11y notes, motion, do/don't, example.
5. Add it to `examples/components/` as a live demo.
6. Mark it `Recommended` in `docs/evidence.md` — new components are never retroactively "observed".

### A token change

1. Edit `tokens/tokens.css` **and** `tokens/tokens.json` — they must stay in sync (CI-able: values are 1:1).
2. State the evidence: a measurement (`Observed`), a normalization across pages (`Inferred`), or a reasoned practice (`Recommended`).
3. Check consumers: grep the examples for the old name.
4. **Breaking renames need a CHANGELOG entry under "Changed"** and, ideally, a deprecation period.

### A new page pattern

1. Point to at least one Budian-family page that embodies it, or argue why the existing patterns can't express the product.
2. Write it up in `docs/patterns.md`: layout skeleton, section order, density, motion budget.
3. If it's a big pattern (like a new branch), build a reference example under `examples/`.

### New evidence from a Budian page

Found a live page that contradicts or extends a rule?

1. Add a row to `docs/evidence.md`: rule, source page, observed behavior, classification, notes.
2. If it changes a token or rule, open the change in the same PR so evidence and rule never drift apart.

## Running the examples

No build step. Open `examples/index.html` directly in a browser, or serve the repo:

```bash
npx serve .        # or: python3 -m http.server
```

## Verifying your change

Run the matrix from `TESTING.md` at minimum for the parts you touched:

- **Theme**: light + dark + system-follow, no flash, meta theme-color correct.
- **Locale**: zh-CN + en, no overflow in either, `<html lang>` and title switch.
- **Width**: 375 / 768 / 1440 (spot-check 320 / 1920), no horizontal scroll.
- **Keyboard**: tab order, focus rings, dialog/drawer behavior.
- **Reduced motion**: entrances instant, nothing essential depends on animation.
- **No-JS**: content and links still readable/navigable with JavaScript disabled.

## PR checklist

- [ ] Evidence for every changed rule (Observed / Inferred / Recommended)
- [ ] Tokens updated in both `tokens.css` and `tokens.json`
- [ ] No raw hex/magic numbers introduced in components or examples
- [ ] Both themes verified; no white-on-white or black-on-black assets
- [ ] Both locales verified; no hardcoded UI strings
- [ ] 375 / 768 / 1440 verified; no horizontal scroll
- [ ] Keyboard + reduced-motion + no-JS verified for interactive parts
- [ ] `CHANGELOG.md` updated (Added / Changed / Fixed / Removed)
- [ ] No secrets, analytics IDs, or copied content from the Budian sites
