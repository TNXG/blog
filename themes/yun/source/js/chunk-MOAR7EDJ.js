import{a as d}from"./chunk-TTX6TVTO.js";var w={};d(w,{copyright:()=>u,getScript:()=>m,insertCopyCodeBtn:()=>h,isHome:()=>p,registerScrollPercent:()=>f,registerToggleSidebar:()=>b,renderKatex:()=>y,wrapTable:()=>g});HTMLElement.prototype.wrap=function(o){this.parentNode.insertBefore(o,this),this.parentNode.removeChild(this),o.appendChild(this)};function u(){console.log(`%c \u2601\uFE0F hexo-theme-yun ${window.CONFIG.version} %c https://github.com/YunYouJun/hexo-theme-yun`,"color: white; background: #0078E7; padding:5px 0;","padding:4px;border:1px solid #0078E7;")}var p=()=>window.location.pathname===window.CONFIG.root,g=()=>{document.querySelectorAll("table").forEach(o=>{let t=document.createElement("div");t.className="table-container",o.wrap(t)})};function m(o,t,n){if(n)t();else{let r=document.createElement("script");r.onload=()=>{setTimeout(t)},r.src=o,document.head.appendChild(r)}}function h(){document.querySelectorAll("pre[class*='language-']").forEach(t=>{if(!window.CONFIG.copycode)return;let n=document.createElement("div");n.className="code-container",t.wrap(n),n.insertAdjacentHTML("beforeend",'<div class="copy-btn"><svg class="icon"><use xlink:href="#icon-file-copy-line" aria-label="copy"></use></svg></div>');let r=n.querySelector(".copy-btn");r.addEventListener("click",()=>{let i=(n.querySelector("code[class*='language-']")||n.querySelector(".token")).innerText,e=document.createElement("textarea");e.style.top=`${window.scrollY}px`,e.style.position="absolute",e.style.opacity="0",e.readOnly=!0,e.value=i,document.body.append(e),e.select(),e.setSelectionRange(0,i.length),e.readOnly=!1;let s=document.execCommand("copy"),a=s?"#icon-check-line":"#icon-timer-line",l=r.querySelector("svg use");l.setAttribute("xlink:href",a),l.setAttribute("color",s?"green":"red"),e.blur(),r.blur(),document.body.removeChild(e)}),n.addEventListener("mouseleave",()=>{setTimeout(()=>{let c=r.querySelector("svg use");c.setAttribute("xlink:href","#icon-file-copy-line"),c.setAttribute("color","gray")},200)})})}function y(){typeof window.renderMathInElement<"u"?window.renderMathInElement(document.body,{delimiters:[{left:"$$",right:"$$",display:!0},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1},{left:"\\[",right:"\\]",display:!0}]}):console.error("Please check if you have introduced KaTeX(https://github.com/KaTeX/KaTeX) CDN.")}function f(){let o=document.querySelector("#back-to-top"),t=document.querySelector("#progressCircle");if(!o)return;function n(r){let c=document.body.clientHeight,i=window.innerHeight,e=t.r.baseVal.value*2*Math.PI,s=e-r/(c-i)*e;t.setAttribute("stroke-dasharray",`${e} ${e}`),t.setAttribute("stroke-dashoffset",s.toString())}window.addEventListener("scroll",()=>{o.classList.toggle("show",window.scrollY>64),n(window.scrollY)})}function b(){document.querySelectorAll(".sidebar-toggle").forEach(t=>{t.addEventListener("click",()=>{document.querySelector(".hamburger").classList.toggle("is-active"),document.querySelector(".container").classList.toggle("sidebar-open")})})}export{u as a,p as b,g as c,m as d,h as e,y as f,f as g,b as h,w as i};
