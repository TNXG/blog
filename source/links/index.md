---
title: 小伙伴们
date: 2019-08-12 13:06:06
---

## 友链说明

每次刷新为随机顺序展示～
请前往[这里](https://github.com/TNXG/blog/#friends)申请友链或者在评论区发送

```
"url": "站点链接",
"avatar": "icon图片链接（推荐使用图床）",
"name": "站长名字",
"blog": "站点名称",
"desc": "站点简介",
"color": "显示在友链页面的文本颜色（推荐使用十六进制颜色代码）"
```

<div id="links">
    <div class="spinner" v-if="!links.length"></div>
    <ul class="link-items" v-else>
        <li class="link-item" v-for="link in links" :id="link.name"
            :style="link.color ? `--primary-color:${link.color}` : ''"><a class="link-url" :href="link.url"
                :title="link.name" alt="portrait" target="_blank" rel="friend">
                <div class="link-left"><img class="link-avatar" loading="lazy" :src="link.avatar" :alt="link.name"
                        onerror="onAvatarError(this)"></div>
                <div class="link-info">
                    <div class="link-blog" v-html=link.blog></div>
                    <div class="link-desc" v-html=link.desc></div>
                </div>
            </a></li>
    </ul>
    <script>new Vue({
            el: "#links",
            data: {
                links: [],
                placeholder: ""
            },
            async beforeCreate() {
                this.links = await fetch("/assets/data/links.json")
                    .then(res => {
                        return res.json()
                    })
                if (true) {
                    this.links.sort(() => Math.random() - 0.5);
                }
            }
        })
    </script>
</div>
