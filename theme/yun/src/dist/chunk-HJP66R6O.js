var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// source/utils.ts
var utils_exports = {};
__export(utils_exports, {
  copyright: () => copyright,
  getScript: () => getScript,
  insertCopyCodeBtn: () => insertCopyCodeBtn,
  isHome: () => isHome,
  registerScrollPercent: () => registerScrollPercent,
  registerToggleSidebar: () => registerToggleSidebar,
  renderKatex: () => renderKatex,
  wrapTable: () => wrapTable
});
HTMLElement.prototype.wrap = function(wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  this.parentNode.removeChild(this);
  wrapper.appendChild(this);
};
function copyright() {
  console.log(`%c \u2601\uFE0F hexo-theme-yun ${window.CONFIG.version} %c https://github.com/YunYouJun/hexo-theme-yun`, "color: white; background: #0078E7; padding:5px 0;", "padding:4px;border:1px solid #0078E7;");
}
var isHome = () => {
  return window.location.pathname === window.CONFIG.root;
};
var wrapTable = () => {
  document.querySelectorAll("table").forEach((el) => {
    const container = document.createElement("div");
    container.className = "table-container";
    el.wrap(container);
  });
};
function getScript(url, callback, condition) {
  if (condition) {
    callback();
  } else {
    const script = document.createElement("script");
    script.onload = () => {
      setTimeout(callback);
    };
    script.src = url;
    document.head.appendChild(script);
  }
}
function insertCopyCodeBtn() {
  const codeblocks = document.querySelectorAll("pre[class*='language-']");
  codeblocks.forEach((codeblock) => {
    if (!window.CONFIG.copycode)
      return;
    const container = document.createElement("div");
    container.className = "code-container";
    codeblock.wrap(container);
    container.insertAdjacentHTML("beforeend", '<div class="copy-btn"><svg class="icon"><use xlink:href="#icon-file-copy-line" aria-label="copy"></use></svg></div>');
    const copyBtn = container.querySelector(".copy-btn");
    copyBtn.addEventListener("click", () => {
      const lines = container.querySelector("code[class*='language-']") || container.querySelector(".token");
      const code = lines.innerText;
      const ta = document.createElement("textarea");
      ta.style.top = `${window.scrollY}px`;
      ta.style.position = "absolute";
      ta.style.opacity = "0";
      ta.readOnly = true;
      ta.value = code;
      document.body.append(ta);
      ta.select();
      ta.setSelectionRange(0, code.length);
      ta.readOnly = false;
      const result = document.execCommand("copy");
      const iconName = result ? "#icon-check-line" : "#icon-timer-line";
      const iconSvg = copyBtn.querySelector("svg use");
      iconSvg.setAttribute("xlink:href", iconName);
      iconSvg.setAttribute("color", result ? "green" : "red");
      ta.blur();
      copyBtn.blur();
      document.body.removeChild(ta);
    });
    container.addEventListener("mouseleave", () => {
      setTimeout(() => {
        const iconSvg = copyBtn.querySelector("svg use");
        iconSvg.setAttribute("xlink:href", "#icon-file-copy-line");
        iconSvg.setAttribute("color", "gray");
      }, 200);
    });
  });
}
function renderKatex() {
  if (typeof window.renderMathInElement !== "undefined") {
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
      ]
    });
  } else {
    console.error("Please check if you have introduced KaTeX(https://github.com/KaTeX/KaTeX) CDN.");
  }
}
function registerScrollPercent() {
  const backToTop = document.querySelector("#back-to-top");
  const progressCircle = document.querySelector("#progressCircle");
  if (!backToTop)
    return;
  function scrollPercent(curTop) {
    const bodyHeight = document.body.clientHeight;
    const windowHeight = window.innerHeight;
    const circumference = progressCircle.r.baseVal.value * 2 * Math.PI;
    const offset = circumference - curTop / (bodyHeight - windowHeight) * circumference;
    progressCircle.setAttribute("stroke-dasharray", `${circumference} ${circumference}`);
    progressCircle.setAttribute("stroke-dashoffset", offset.toString());
  }
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 64);
    scrollPercent(window.scrollY);
  });
}
function registerToggleSidebar() {
  const toggleBtns = document.querySelectorAll(".sidebar-toggle");
  toggleBtns.forEach((el) => {
    el.addEventListener("click", () => {
      document.querySelector(".hamburger").classList.toggle("is-active");
      document.querySelector(".container").classList.toggle("sidebar-open");
    });
  });
}

export {
  copyright,
  isHome,
  wrapTable,
  getScript,
  insertCopyCodeBtn,
  renderKatex,
  registerScrollPercent,
  registerToggleSidebar,
  utils_exports
};
