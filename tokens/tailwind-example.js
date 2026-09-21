/**
 * Budian UI — Tailwind adapter example
 * --------------------------------------------------------------------------
 * Budian UI is framework-agnostic: the canonical sources are tokens.css
 * (CSS variables) and tokens.json (portable data). Tailwind is NOT required;
 * this file only shows how to derive a Tailwind v4 theme from tokens.json
 * so projects already on Tailwind can adopt Budian UI without forking values.
 *
 * Tailwind v4 usage (CSS-first):
 *   @import "tailwindcss";
 *   @theme { ...derived variables below... }
 *
 * Tailwind v3 usage (JS config):
 *   module.exports = buildTailwindTheme(require("./tokens.json"));
 *
 * Rules that must survive any adapter:
 *   1. Components consume SEMANTIC names (bg, surface, text-primary...),
 *      never raw hex values.
 *   2. Dark mode flips via [data-theme="dark"], driven by the inline
 *      no-flash script (see docs/theme.md) — not by Tailwind's class strategy.
 *   3. The spacing scale stays on the 4px base; do not reintroduce
 *      arbitrary values for rhythm that the scale already covers.
 */

const fs = require("fs");

function buildTailwindTheme(tokens) {
  const light = tokens.color.light;
  const dark = tokens.color.dark;

  return {
    // Semantic colors resolve to CSS variables so both themes share one name.
    colors: {
      bg: "var(--budian-bg)",
      "bg-inset": "var(--budian-bg-inset)",
      surface: "var(--budian-surface)",
      "surface-strong": "var(--budian-surface-strong)",
      fg: "var(--budian-text-primary)",
      "fg-secondary": "var(--budian-text-secondary)",
      muted: "var(--budian-text-muted)",
      border: "var(--budian-border)",
      "border-strong": "var(--budian-border-strong)",
      accent: "var(--budian-accent)",
      "on-accent": "var(--budian-on-accent)",
      ring: "var(--budian-ring)",
      success: "var(--budian-success)",
      warning: "var(--budian-warning)",
      danger: "var(--budian-danger)",
      info: "var(--budian-info)",
    },
    fontFamily: {
      sans: [tokens.typography.fonts["font-sans"].value],
      mono: [tokens.typography.fonts["font-mono"].value],
      serif: [tokens.typography.fonts["font-serif"].value],
    },
    fontSize: {
      display: [tokens.typography.scale.display.size, { lineHeight: tokens.typography.scale.display.lineHeight }],
      title: [tokens.typography.scale.title.size, { lineHeight: tokens.typography.scale.title.lineHeight }],
      heading: [tokens.typography.scale.heading.size, { lineHeight: tokens.typography.scale.heading.lineHeight }],
      subheading: [tokens.typography.scale.subheading.size],
      body: [tokens.typography.scale.body.size, { lineHeight: tokens.typography.scale.body.lineHeight }],
      lede: [tokens.typography.scale.lede.size, { lineHeight: tokens.typography.scale.lede.lineHeight }],
      small: [tokens.typography.scale.small.size],
      caption: [tokens.typography.scale.caption.size, { letterSpacing: tokens.typography.scale.caption.tracking }],
      kicker: [tokens.typography.scale.kicker.size, { letterSpacing: tokens.typography.scale.kicker.tracking, fontWeight: tokens.typography.scale.kicker.weight }],
    },
    spacing: tokens.spacing.scale,
    borderRadius: Object.fromEntries(
      Object.entries(tokens.radius)
        .filter(([k]) => !k.startsWith("_"))
        .map(([k, v]) => [k.replace("radius-", ""), v.value])
    ),
    boxShadow: {
      sm: "var(--budian-shadow-sm)",
      md: "var(--budian-shadow-md)",
      lg: "var(--budian-shadow-lg)",
      xl: "var(--budian-shadow-xl)",
    },
    screens: {
      sm: `${tokens.breakpoints.sm}`,
      md: `${tokens.breakpoints.md}`,
      lg: `${tokens.breakpoints.lg}`,
    },
    transitionTimingFunction: {
      standard: "var(--budian-ease-standard)",
      enter: "var(--budian-ease-enter)",
      exit: "var(--budian-ease-exit)",
    },
    transitionDuration: {
      instant: "140ms",
      fast: "250ms",
      normal: "350ms",
      slow: "650ms",
      grand: "950ms",
    },
    // Keep dark values documented next to the adapter for audits.
    _budianDarkReference: dark,
  };
}

// CLI: node tailwind-example.js [tokens.json] [out.json]
if (require.main === module) {
  const input = process.argv[2] || `${__dirname}/tokens.json`;
  const output = process.argv[3] || `${__dirname}/tailwind-theme.json`;
  const tokens = JSON.parse(fs.readFileSync(input, "utf8"));
  const theme = buildTailwindTheme(tokens);
  fs.writeFileSync(output, JSON.stringify(theme, null, 2));
  console.log(`Budian UI Tailwind theme written to ${output}`);
  console.log("Note: colors resolve to var(--budian-*) so [data-theme='dark'] keeps working.");
}

module.exports = { buildTailwindTheme };
