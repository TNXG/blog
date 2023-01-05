---
title: 更换主题Miracle
date: 2022-10-13 05:25:40
updated: 2022-10-15 13:44:54
tags:

- 原创
- 小记
- 总结

---

其实早就有了更换主题的心思了，但是奈何页面修改太多想必迁移也是一种很麻烦的事情，但是思前想后最终还是把主题给更换了

<!-- more -->

我实在受不了之前那个主题被我改的加载半天的页面了，当时正好群里的大佬在宣传他写的Miracle主题，看了看还是蛮符合我审美的，于是我就开始了痛苦的更换主题工作

![9ddfa1cd417c722ee5c7e9304f0eda8f](https:/assets.tnxg.whitenuo.cn/images/upload/2022/10/9ddfa1cd417c722ee5c7e9304f0eda8f.png)

# 对于失效页面进行修改

更换主题的过程中，我突然意识到貌似博客的 [Lovely Girls](/girls/) 和 [Monument丨丰碑](/monument/)
是基于原主题提供的支持搭建的页面，如果更换主题那么这两个页面也将会出现问题，于是我看了看代码结构

```js
new Vue({
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
})
```

好，妈的是vue，根本不会，但是并不影响我将功能迁移到新的主题，毕竟没养过猪也吃过猪肉嘛

简单对于这些页面进行处理之后这两个页面也算是恢复正常了<span class="heimu">实际上css设置的还是有点小问题，待修复</span>
，但貌似 [视频集](/video/) 和 [相册集](/albums/) 及其下属的子页面也是通过类似的代码实现的，但是我懒，不想搞了，，，到时候闲下来再说罢

# 关于背景图片

因为新主题并不支持背景图片，所以我用css简单实现了这个功能

```css
.bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("https://prts.top/api/img/wallpaper/?type=cdn");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    z-index: -100
}
```

`z-index: -100`这个参数其实是我后面添加的，因为之前的css总会覆盖页面其他内容，于是简单设置了个优先度，将背景图片置于最底层

# 其他

实际上我对于很多页面进行了修复，其中包括了因为更换主题导致出现问题的页面及因为时间久远未进行维护的页面

简单优化了一下实现公告功能的代码，删除了很多cw并发的链接，cw本来就是对于页面进行加速的，像我原来那样配置非但没有起到加速的作用反而堵塞了网络请求，使页面无法加载或加载缓慢

罢了罢了，溜走溜走，新主题到现在也算是配置好了
