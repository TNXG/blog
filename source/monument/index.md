---
title: Monument丨丰碑
date: 2022-08-01 20:20:00
banner: <span title="二游玩家应该学会自己找刀子">他们的故事应该时刻被铭记</span>
---
谁又没有被情所伤呢

亲情，爱情，友情

亦或者所谓“大义”

或许我无法为此类的人洗脱罪名，但我却能为他们建立起一座丰碑

为所有因为梦想而失去生命的人树立一座丰碑

他们不该被曲解，也不该被遗忘

他们照亮这一切，引领这一切，他们就是领航星

> <span class="CtrlAstr">Don't ask should fire burning, ask cold dark also there;</span>
> 不要问篝火该不该燃烧，先问寒冷黑暗还在不在；

> <span class="Gsenochian">don't ask the bullet should taste, ask oppression exploitation still is in;</span>
> 不要问子弹该不该上膛，先问压迫剥削还在不在；

> <span class="Tevyat">don't ask just cause to have tomorrow, ask uneven today also is in in the world.</span>
> 不要问正义事业有没有明天，先问人间不平今天还在不在。

> <span class="AgeFonts001">We are heading east.</span>
> 我们正向东行驶。

# 跳转到 [Lovely Girls](/girls/)

<div id="girls">
    <div class="spinner" v-if="!girls.length"></div>
    <div class="girls-number">{{girls.length}}</div>
    <div class="girl-banner"><span title="二游玩家应该学会自己找刀子">他们的故事应该时刻被铭记</span></div>
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
                this.girls = await fetch("/assets/data/monument.json")
                    .then(res => {
                        return res.json();
                    })
                if (true) {
                    this.girls.sort(() => Math.random() - 0.5);
                }
            }
        })</script>
