---
title: Lovely Girls
date: 2019-08-12 13:20:09
---
我喜欢她们，兄弟。虽然我知道可能会很奇怪，但我就是喜欢她们。这种爱是跨越空间的，是跨越世纪的，是跨越生与死的边界的

# 跳转到 [丰碑](/monument/)

<div id="girls">
    <div class="spinner" v-if="!girls.length"></div>
    <div class="girls-number">{{girls.length}}</div>
    <div class="girl-banner"><span title="我全都要！">大家都是我的天使！</span>
    <ul class="girl-items">
        <li class="girl-item" v-for="girl in girls" :id="girl.name"><a class="girl-url"
                :href="girl.url || 'https://zh.moegirl.org/' + girl.name" :title="girl.reason" alt="portrait"
                target="_blank" rel="noopener">
                <figure class="girl-info"><img class="girl-avatar" loading="lazy" :src="girl.avatar" :alt="girl.name"
                        onerror="this.src=CONFIG.anonymous_image">
                    <!-- 重构代码时以下原结构不可用 <span class="girl-name">{{ girl.name }}</span> -->
                    <span class="girl-name" v-html=girl.name></span>
                    <br>
                    <span class="girl-from" v-html=girl.from></span>
                </figure>
            </a></li>
    </ul>
    <script>new Vue({
            el: "#girls",
            data: {
                girls: [],
            },
            async mounted() {
                this.girls = await fetch("/assets/data/girls.json")
                    .then(res => {
                        return res.json();
                    })
                if (true) {
                    this.girls.sort(() => Math.random() - 0.5);
                }
            }
        })</script>