---
title: 小伙伴们
date: 2019-08-12 13:06:06
---
<script>
        (async () => {
          var res = await fetch('/assets/data/links.json');
          var json = await res.json();
          console.log(json);
          const Linkscontainer = document.getElementById('links-page');
          json.forEach(item => {
            const element = document.createElement('div');
            element.className = "links-card";

            element.innerHTML = `
        <a href="${item.link}" class="links-card-body" target="_blank" rel="noopener">
          <div class="links-card-content">
              <div class="link-avatar my-auto">
                
                  <img webp-comp class="lazyload-img" data-srcset="${item.image}" srcset="/img/loading.svg" src="${item.image}" alt="${item.title}" />
                
              </div>
            <div class="link-text">
              <div class="link-title">${item.title}</div>
              <div class="link-intro">${item.intro}</div>
            </div>
          </div>
        </a>
            `;
            Linkscontainer.appendChild(element);
          });
          setTimeout(function () {
  function query(selector) {
    return Array.from(document.querySelectorAll(selector));
}
    
var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) { 
            var img = entry.target;
            img.srcset = img.getAttribute('data-srcset');
            img.className += ' loaded'
            io.unobserve(img);
        }
    });
});
    
query('.lazyload-img').forEach(function (item) {
    io.observe(item);
});
},0)
        })();


      </script>
## 友链说明
每次刷新为随机顺序展示～
现已不支持在评论区中直接申请友链，请前往[这里](https://github.com/TNXG/blog/#friends)～