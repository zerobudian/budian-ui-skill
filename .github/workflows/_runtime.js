const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// Resolve repo root from this script's own location (.github/workflows/_runtime.js -> ../..)
const ROOT = path.resolve(__dirname, "..", "..", "examples");
const FILES = ["starter", "landing", "dashboard", "docs", "components"];
let pass = 0, fail = 0;
const report = [];

function check(name, cond, detail) {
  if (cond) { pass++; report.push(`PASS  ${name}`); }
  else { fail++; report.push(`FAIL  ${name} — ${detail || ""}`); }
}

// Read one full page: inline scripts executed in head/body order, runtime injected
// after inline scripts so Budian.init path matches real usage.
function loadPage(dir, opts = {}) {
  const htmlPath = path.join(ROOT, dir, "index.html");
  let html = fs.readFileSync(htmlPath, "utf8");
  // strip <link> so jsdom doesn't chase stylesheets; keep scripts
  html = html.replace(/<link[^>]*>/g, "");
  const dom = new JSDOM(html, {
    url: `https://example.invalid/${dir}/`,
    runScripts: "outside-only",
    beforeParse(window) {
      window.matchMedia = window.matchMedia || (q => ({
        matches: q === "(prefers-color-scheme: dark)" && !!opts.prefersDark,
        addEventListener(){}, addListener(){}, removeEventListener(){}
      }));
      window.IntersectionObserver = !opts.noIO ? class {
        constructor(cb){ this.cb = cb; }
        observe(el){ setTimeout(()=>this.cb([{isIntersecting:true,target:el}]),0); }
        unobserve(){}
      } : undefined;
      window.requestAnimationFrame = fn => setTimeout(fn, 0);
    }
  });
  const w = dom.window;
  // Real load order: head inline bootstrap → <script src="budian.js"> (defines window.Budian)
  // → body inline init script (calls Budian.init). So inject the runtime BEFORE evaluating
  // the page's inline scripts in document order.
  const runtime = fs.readFileSync(path.join(ROOT, "assets", "budian.js"), "utf8");
  w.eval(runtime);
  const inline = [...w.document.querySelectorAll("script:not([src])")];
  inline.forEach(s => { try { w.eval(s.textContent); } catch (e) { w.__inlineErr = e; } });
  // fire DOMContentLoaded for scripts that defer their Budian.init
  w.document.dispatchEvent(new w.Event("DOMContentLoaded", { bubbles: true }));
  return w;
}

(async function main() {
  for (const dir of FILES) {
    const w = loadPage(dir, { prefersDark: true });
    const d = w.document;
    const headHtml = fs.readFileSync(path.join(ROOT, dir, "index.html"), "utf8");
    const revealPromises = [];

  // 1. No inline eval error
  check(`${dir}: no inline script error`, !w.__inlineErr, String(w.__inlineErr));

  // 2. Theme bootstrap sets data-theme before stylesheets (progressive)
  const bootMatch = headHtml.match(/<script>[\s\S]*?localStorage\.getItem\("budian-theme"\)[\s\S]*?<\/script>/);
  check(`${dir}: inline no-flash theme bootstrap present`, !!bootMatch, "head script missing");
  check(`${dir}: bootstrap precedes <link stylesheet>`, headHtml.indexOf(bootMatch ? bootMatch[0] : "\u0000") !== -1 && (headHtml.indexOf("<link") === -1 || headHtml.indexOf(bootMatch[0]) < headHtml.indexOf("<link")), "bootstrap not before css link");

  // 3. Theme button contract: neutral aria-label, no hardcoded aria-pressed, runtime writes it
  const btn = d.querySelector("[data-budian-theme-toggle]");
  const hasNeutral = headHtml.includes('aria-label:a11y.themeToggle');
  const noHardcodedPressed = !headHtml.includes('data-budian-theme-toggle') || !/theme-toggle[^>]*aria-pressed/.test(headHtml);
  check(`${dir}: theme btn ships neutral aria-label`, hasNeutral, "missing a11y.themeToggle ref");
  check(`${dir}: theme btn no hardcoded aria-pressed`, noHardcodedPressed, "stale aria-pressed in html");
  if (btn) check(`${dir}: runtime wrote aria-pressed`, btn.getAttribute("aria-pressed") !== null, "aria-pressed:"+btn.getAttribute("aria-pressed")+" label:"+btn.getAttribute("aria-label"));

  // 4. Reveal arming: .js added only after reveal armed (i.e. page has .reveal and runtime armed) — and content visible w/o js
  const revealCount = d.querySelectorAll(".reveal").length;
  check(`${dir}: reveal elements exist`, revealCount > 0 || dir === "starter" || dir === "docs", `reveal=${revealCount}`);
  // when IO present + motion ok, js armed & .reveal.on applied
  const jsArmed = d.documentElement.classList.contains("js");
  check(`${dir}: .js added when reveal present`, revealCount === 0 || jsArmed, "js missing");
  revealPromises.push(new Promise(resolve => {
    setTimeout(() => {
      const on = d.querySelectorAll(".reveal.on").length;
      check(`${dir}: reveal.on applied for in-view items`, revealCount === 0 || on === revealCount, `on=${on}/${revealCount}`);
      resolve();
    }, 40);
  }));

  // 5. i18n: data-i18n nodes got text, html lang set, locale toggle node present
  const i18nNodes = d.querySelectorAll("[data-i18n]");
  let i18nOk = true;
  i18nNodes.forEach(el => { if (!el.textContent.trim()) i18nOk = false; });
  check(`${dir}: data-i18n nodes have text`, i18nNodes.length === 0 || i18nOk, "untranslated node(s)");
  check(`${dir}: html lang set`, !!d.documentElement.lang, "lang:"+d.documentElement.lang);
  const localeToggle = d.querySelector("[data-budian-locale-toggle]");
  check(`${dir}: locale toggle control present`, !!localeToggle, "no locale toggle button");
  if (localeToggle) {
    // text must have been refined to the non-current-language label by init
    check(`${dir}: locale toggle labeled by runtime`, /\S/.test(localeToggle.textContent), "empty label");
  }
    await Promise.all(revealPromises);
  }

  // No-JS progressive enhancement: rendering the page with NO runtime/inline must keep .reveal visible
  {
    const raw = fs.readFileSync(path.join(ROOT, "starter", "index.html"), "utf8");
    const hasJsGated = /\.js\s+\.reveal/.test(fs.readFileSync(path.join(ROOT, "starter", "styles.css"), "utf8"));
    check("no-JS: .reveal rules gated behind .js", hasJsGated, ".js .reveal block missing in starter css");
  }

  // 44px targets auditor (static)
  for (const dir of FILES) {
    const css = fs.readFileSync(path.join(ROOT, dir, "styles.css"), "utf8");
    const usesTargetMin = css.includes("--budian-target-min");
    check(`${dir}: uses --budian-target-min (44px)`, usesTargetMin, "target-min token absent");
  }

  console.log(report.join("\n"));
  console.log(`\nRESULT: ${pass} pass, ${fail} fail`);
  process.exit(fail ? 1 : 0);
})();