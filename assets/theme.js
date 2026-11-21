// theme.js — the three-state theme toggle (auto / light / dark), shared by
// every page. A forced scheme rides html[data-theme] (which outranks the
// prefers-color-scheme block by specificity) and persists in localStorage
// under "banyan.theme"; the inline pre-paint snippet in each page's head
// applies it before first paint. Click order: auto → the opposite of what
// is effective → the remaining one → auto. Zero dependencies.
(function () {
  "use strict";
  var KEY = "banyan.theme";

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "light" || v === "dark" ? v : "auto";
    } catch (e) {
      return "auto";
    }
  }

  function effectiveDark() {
    var t = stored();
    if (t !== "auto") return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function persist(t) {
    try {
      if (t === "auto") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, t);
    } catch (e) {}
  }

  function apply(t) {
    var el = document.documentElement;
    if (t === "light" || t === "dark") el.setAttribute("data-theme", t);
    else el.removeAttribute("data-theme");
    persist(t);
    paint();
  }

  var ICONS = {
    auto:
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M8 2a6 6 0 0 1 0 12Z" fill="currentColor" stroke="none"/></svg>',
    light:
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="8" cy="8" r="3.2"/><path d="M8 1v1.8M8 13.2V15M1 8h1.8M13.2 8H15M3 3l1.3 1.3M11.7 11.7 13 13M13 3l-1.3 1.3M4.3 11.7 3 13"/></svg>',
    dark:
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M13.4 9.6A6 6 0 0 1 6.4 2.6a6 6 0 1 0 7 7Z"/></svg>'
  };
  var NAMES = {
    en: { auto: "theme: follow the system (click to switch)", light: "theme: day (click to switch)", dark: "theme: night (click to switch)" },
    zh: { auto: "主题：跟随系统（点击切换）", light: "主题：白天（点击切换）", dark: "主题：黑夜（点击切换）" }
  };

  function paint() {
    var b = document.getElementById("theme-toggle");
    if (!b) return;
    var t = stored();
    var zh = (document.documentElement.lang || "").indexOf("zh") === 0;
    var label = NAMES[zh ? "zh" : "en"][t];
    b.innerHTML = ICONS[t];
    b.title = label;
    b.setAttribute("aria-label", label);
  }

  function next() {
    var t = stored();
    if (t === "auto") return effectiveDark() ? "light" : "dark";
    if (t === "light") return "dark";
    return "auto";
  }

  function init() {
    var b = document.getElementById("theme-toggle");
    if (!b) return;
    b.addEventListener("click", function () {
      apply(next());
    });
    paint();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
