/* ==========================================================================
   Budian UI runtime — v1.0.0
   Framework-agnostic, zero dependencies. Progressive by design:
   without this file, page content stays visible; with it, pages gain
   theme modes, locale adaptation, reveals and toasts.

   Page contract (see the index.html of each example):
     1. Inline no-flash theme bootstrap in <head>, before stylesheets.
     2. <html> gets class "js" only via this runtime — initial hidden
        reveal states must be gated on .js so no-JS visitors see content.
     3. Text nodes carry data-i18n="key"; attributes carry
        data-i18n-attr="placeholder:key,aria-label:key2".
     4. Pages call Budian.init({ messages, ... }) on DOMContentLoaded.
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_THEME = "budian-theme";
  var STORAGE_LOCALE = "budian-locale";
  var root = document.documentElement;

  root.classList.add("js");

  var reducedMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false, addEventListener: function () {}, addListener: function () {} };

  function onMedia(query, fn) {
    var m = window.matchMedia ? window.matchMedia(query) : null;
    if (!m) return;
    if (m.addEventListener) m.addEventListener("change", fn);
    else if (m.addListener) m.addListener(fn); /* Safari < 14 */
  }

  /* ------------------------------------------------------------------ Theme */

  var theme = (function () {
    function stored() {
      try { return localStorage.getItem(STORAGE_THEME); } catch (e) { return null; }
    }
    function persist(mode) {
      try {
        if (mode === "system") localStorage.removeItem(STORAGE_THEME);
        else localStorage.setItem(STORAGE_THEME, mode);
      } catch (e) { /* private mode */ }
    }
    function systemDark() {
      return window.matchMedia
        && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    function resolved() {
      var mode = stored();
      if (mode !== "light" && mode !== "dark") mode = systemDark() ? "dark" : "light";
      return mode;
    }

    function syncMeta() {
      var color = resolved() === "dark" ? "#050609" : "#f3f5f8";
      var metas = document.querySelectorAll('meta[name="theme-color"]');
      for (var i = 0; i < metas.length; i++) metas[i].setAttribute("content", color);
    }

    /* Keep following the OS while no manual override exists. */
    onMedia("(prefers-color-scheme: change)", function () {
      if (!stored()) { applyMode("system"); }
    });

    function applyMode(mode) {
      /* mode: "system" | "light" | "dark" */
      var r = mode === "system" ? (systemDark() ? "dark" : "light") : mode;
      if (r === "dark") root.dataset.theme = "dark";
      else root.dataset.theme = "light";
      persist(mode);
      syncMeta();
      root.dispatchEvent(new CustomEvent("budian:theme", { detail: { mode: mode, resolved: r } }));
      return r;
    }

    return {
      mode: function () {
        var m = stored();
        return m === "light" || m === "dark" ? m : "system";
      },
      resolved: resolved,
      set: function (mode) { return applyMode(mode); },
      toggle: function () {
        return applyMode(resolved() === "dark" ? "light" : "dark");
      },
      syncMeta: syncMeta
    };
  })();

  /* ------------------------------------------------------------------- i18n */

  var i18n = (function () {
    var dict = {};
    var current = "en";
    var fallback = "en";

    function normalize(tag) {
      if (!tag) return null;
      return /^zh\b|^zh-/i.test(tag) ? "zh-CN" : "en";
    }
    function stored() {
      try { return localStorage.getItem(STORAGE_LOCALE); } catch (e) { return null; }
    }
    function detect() {
      var saved = stored();
      if (saved === "zh-CN" || saved === "en") return saved;
      var langs = navigator.languages || [navigator.language || "en"];
      for (var i = 0; i < langs.length; i++) {
        var n = normalize(langs[i]);
        if (n) return n;
      }
      return fallback;
    }

    function lookup(locale, key) {
      var table = dict[locale] || {};
      if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
      table = dict[fallback] || {};
      if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
      return null;
    }

    function apply() {
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var v = lookup(current, el.getAttribute("data-i18n"));
        if (v !== null) el.textContent = v;
      });
      document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
        el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
          var parts = pair.split(":");
          if (parts.length !== 2) return;
          var v = lookup(current, parts[1].trim());
          if (v !== null) el.setAttribute(parts[0].trim(), v);
        });
      });
      root.lang = current;
      var title = lookup(current, "meta.title");
      if (title !== null) document.title = title;
      var desc = document.querySelector('meta[name="description"]');
      var d = lookup(current, "meta.description");
      if (desc && d !== null) desc.setAttribute("content", d);
      root.dispatchEvent(new CustomEvent("budian:locale", { detail: { locale: current } }));
    }

    return {
      init: function (messages, options) {
        dict = messages || {};
        if (options && options.fallback) fallback = options.fallback;
        current = detect();
        apply();
      },
      set: function (locale) {
        if (locale !== "zh-CN" && locale !== "en") return;
        current = locale;
        try { localStorage.setItem(STORAGE_LOCALE, locale); } catch (e) {}
        apply();
      },
      toggle: function () { this.set(current === "zh-CN" ? "en" : "zh-CN"); },
      t: function (key) {
        var v = lookup(current, key);
        return v === null ? key : v;
      },
      locale: function () { return current; },
      /* Intl-based formatting — never hand-format dates or numbers. */
      formatDate: function (date, options) {
        return new Intl.DateTimeFormat(current, options || { dateStyle: "medium" }).format(date);
      },
      formatNumber: function (num, options) {
        return new Intl.NumberFormat(current, options).format(num);
      },
      formatCurrency: function (num, currency) {
        return new Intl.NumberFormat(current, { style: "currency", currency: currency || "CNY" }).format(num);
      }
    };
  })();

  /* ---------------------------------------------------------------- Reveal */

  var reveal = {
    init: function (selector) {
      var items = Array.prototype.slice.call(document.querySelectorAll(selector || ".reveal"));
      if (!items.length) return;
      var show = function (el) { el.classList.add("on"); };

      if (reducedMotion.matches || !("IntersectionObserver" in window)) {
        items.forEach(show);
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          show(entry.target);
          io.unobserve(entry.target);
        });
      }, { threshold: 0.16 });
      items.forEach(function (el) { io.observe(el); });
    }
  };

  /* ----------------------------------------------------------------- Toast */

  var toast = {
    show: function (message, options) {
      options = options || {};
      var host = document.getElementById("budian-toast");
      if (!host) {
        host = document.createElement("div");
        host.id = "budian-toast";
        host.className = "budian-toast" + (options.type ? " budian-toast--" + options.type : "");
        host.setAttribute("role", "status");
        host.setAttribute("aria-live", "polite");
        document.body.appendChild(host);
      }
      host.className = "budian-toast" + (options.type ? " budian-toast--" + options.type : "");
      host.textContent = message;
      /* re-trigger animation without reflow jank */
      host.classList.remove("is-in");
      void host.offsetWidth;
      host.classList.add("is-in");
      window.clearTimeout(toast._timer);
      toast._timer = window.setTimeout(function () { host.classList.remove("is-in"); }, 2800);
    }
  };

  /* -------------------------------------------------------------- Count-up */

  function countUp(el, locale) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    var decimals = (el.getAttribute("data-count").split(".")[1] || "").length;
    var suffix = el.getAttribute("data-count-suffix") || "";
    var fmt = function (n) {
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
      }).format(n) + suffix;
    };
    if (reducedMotion.matches) { el.textContent = fmt(target); return; }
    var duration = 1200, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ------------------------------------------------------------------- API */

  window.Budian = {
    version: "1.0.0",
    theme: theme,
    i18n: i18n,
    reveal: reveal,
    toast: toast,
    countUp: countUp,
    reducedMotion: function () { return reducedMotion.matches; },

    /* Standard page wiring. Options:
       { messages, onLocaleChange, onThemeChange, countUpSelector } */
    init: function (options) {
      options = options || {};
      i18n.init(options.messages, options);

      /* Controls are opt-in via [data-budian-theme-toggle] / [data-budian-locale-toggle]. */
      document.querySelectorAll("[data-budian-theme-toggle]").forEach(function (btn) {
        btn.addEventListener("click", function () { theme.toggle(); });
      });
      document.querySelectorAll("[data-budian-locale-toggle]").forEach(function (btn) {
        btn.addEventListener("click", function () { i18n.toggle(); });
      });

      /* Reflect the current state on toggle buttons (label + pressed state). */
      function syncControls() {
        document.querySelectorAll("[data-budian-locale-toggle]").forEach(function (btn) {
          var label = i18n.locale() === "zh-CN" ? "EN" : "中文";
          var full = i18n.locale() === "zh-CN" ? "Switch to English" : "切换为中文";
          if (btn.textContent.trim() !== label) btn.textContent = label;
          btn.setAttribute("aria-label", full);
          btn.setAttribute("lang", i18n.locale() === "zh-CN" ? "en" : "zh-CN");
        });
        document.querySelectorAll("[data-budian-theme-toggle]").forEach(function (btn) {
          var dark = theme.resolved() === "dark";
          btn.setAttribute("aria-pressed", dark ? "true" : "false");
          var key = dark ? "a11y.themeLight" : "a11y.themeDark";
          var v = lookupPublic(key);
          if (v !== null) btn.setAttribute("aria-label", v);
        });
      }
      function lookupPublic(key) {
        var v = null;
        try { v = i18n.t(key); } catch (e) {}
        return v === key ? null : v;
      }

      root.addEventListener("budian:locale", function () {
        syncControls();
        if (options.onLocaleChange) options.onLocaleChange(i18n.locale());
      });
      root.addEventListener("budian:theme", function (e) {
        syncControls();
        if (options.onThemeChange) options.onThemeChange(e.detail);
      });

      reveal.init();
      theme.syncMeta();
      syncControls();

      /* Count-up runs once visible, per reduced-motion rules. */
      var counters = document.querySelectorAll("[data-count]");
      if (counters.length) {
        var run = function (el) { countUp(el, i18n.locale()); };
        if (reducedMotion.matches || !("IntersectionObserver" in window)) {
          counters.forEach(run);
        } else {
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;
              run(entry.target);
              io.unobserve(entry.target);
            });
          }, { threshold: 0.4 });
          counters.forEach(function (el) { io.observe(el); });
        }
        root.addEventListener("budian:locale", function () {
          counters.forEach(function (el) { el.textContent = ""; countUp(el, i18n.locale()); });
        });
      }

      /* Copy buttons for code blocks: [data-budian-copy] on a <button>. */
      document.querySelectorAll("[data-budian-copy]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var sel = btn.getAttribute("data-budian-copy");
          var source = sel ? document.querySelector(sel) : btn.parentElement.querySelector("code, pre");
          if (!source) return;
          var text = source.textContent;
          var done = function () {
            var ok = btn.getAttribute("data-budian-copy-done") || "Copied ✓";
            var original = btn.textContent;
            btn.textContent = ok;
            window.setTimeout(function () { btn.textContent = original; }, 1600);
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, done);
          } else {
            var ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand("copy"); } catch (e) {}
            document.body.removeChild(ta);
            done();
          }
        });
      });
    }
  };
})();
