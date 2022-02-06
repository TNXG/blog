import {
  isHome,
  renderKatex
} from "./chunk-HJP66R6O.js";

// source/pjax.ts
function initPjax() {
  new Pjax({
    selectors: ["title", ".js-Pjax", "main", "aside"]
  });
}
function onPjaxSuccess() {
  isHome();
  renderKatex();
}
document.addEventListener("DOMContentLoaded", initPjax);
document.addEventListener("DOMContentLoaded", isHome);
document.addEventListener("pjax:success", onPjaxSuccess);
