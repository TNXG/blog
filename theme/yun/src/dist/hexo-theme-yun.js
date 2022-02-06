import {
  copyright,
  utils_exports
} from "./chunk-HJP66R6O.js";

// source/hexo-theme-yun.ts
window.Yun.utils = utils_exports;
function initPage() {
  window.Yun.utils.registerToggleSidebar();
  window.Yun.utils.registerScrollPercent();
  window.Yun.utils.insertCopyCodeBtn();
  window.Yun.utils.wrapTable();
}
copyright();
document.addEventListener("DOMContentLoaded", initPage);
