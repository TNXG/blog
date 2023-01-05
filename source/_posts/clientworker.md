---
title: Hexo博客优化？不如尝试ClientWorker
date: 2022-07-21 20:22:00
updated: 2022-07-21 20:22:00
tags: [白嫖, JS]
categories: [原创, 技术]
---

![](https://assets.tnxg.whitenuo.cn/images/upload/2022/07/70d49e280638dd9c2c13eb318e796bc0.png)

<!-- more -->

---

# 前言

2022年7月12日某时，`ElemeCDN`确认停止回源，仅可访问之前回源过的资源

至此，几乎所有公开在cn国境内提供免费高速静态资源cdn的厂商的服务全部关闭

不可否认的是，无论`ElemeCDN`受到打压，亦或者阿里被薅秃了，这家伙确实也是使用着`阿里cdn`的，在国内访问速度可观

反观在年初被吊销ICP许可的`Jsdelivr`，在国内前前后后被`GFW`污染了两三次，访问情况不能说是完全访问不了，但速度真的很不乐观

我们能够依赖的也只有那些愿意做公益的大佬了，虽然回源依旧是`Unpkg`亦或者`Jsdelivr`，但最起码部分数据也被国内的cdn缓存了

目前我遇到的解决方案几乎都有在使用ServiceWorker，就比如[静态博客接入 freecdn 提升访问速度](https://www.imaegoo.com/2021/hexo-free-cdn/)、[欲善其事，必利其器 - 论如何善用ServiceWorker](https://blog.cyfan.top/p/c0af86bb.html)
，当然ClientWorker的技术基础也还是ServiceWorker

ClientWorker的作者CYF对ServiceWorker的评价其实很简单`ServiceWorker作为前端革命领袖，毫不夸张地被誉为前端黑科技`

但是ServiceWorker作为一种前端技术是有学习及试错成本的，如果单单只为了加速个静态网页而学习ServiceWorker我觉得这肯定是不合理的

# 正文

## 什么是ClientWorker

引用原作者CYF的话(来自cw官方文档)
> ClientWorker是利用规则全局驱动sw的插件
> 目前涵盖了ServiceWorker的 路由拦截、路由劫持、请求/响应（标头、状态、响应主体）修改、缓存调控，允许用户并发（双引擎），并且有一个自定义规则系统，可以自定义规则，拦截请求，修改响应，缓存颗粒化等功能。

## 如何安装

```javascript
<script>if (!!navigator.serviceWorker) {
    navigator.serviceWorker.register('/cw.js?t=' + new Date().getTime()).then(async (registration) => {
        if (localStorage.getItem('cw_installed') !== 'true') {
            const conf = () => {
                console.log('[CW] Installing Success,Configuring...');
                fetch('/cw-cgi/api?type=config')
                    .then(res => res.text())
                    .then(text => {
                        if (text === 'ok') {
                            console.log('[CW] Installing Success,Configuring Success,Starting...');
                            localStorage.setItem('cw_installed', 'true');
                            //如果你不希望重载页面，请移除下面五行
                            fetch(window.location.href).then(res => res.text()).then(text => {
                                document.open()
                                document.write(text);
                                document.close();
                            });
                        } else {
                            console.log('[CW] Installing Success,Configuring Failed,Sleeping 200ms...');
                            setTimeout(() => {
                                conf()
                            }, 200);
                        }
                    }).catch(err => {
                    console.log('[CW] Installing Success,Configuring Error,Exiting...');
                });
            }
            setTimeout(() => {
                conf()
            }, 50);
        }
    }).catch(err => {
        console.error('[CW] Installing Failed,Error: ' + err.message);
    });
} else {console.error('[CW] Installing Failed,Error: Browser not support service worker');}</script>
```

1. 将以上这串代码安放在`<head>`里面，越靠前越好，当然`navigator.serviceWorker.register`是异步函数不会阻塞页面加载。
2. 进入[ClientWorker Github Release](https://github.com/ChenYFan/ClientWorker/releases)发布页，下载最新版本内容。
3. 解压，将文件夹中`cw.js`拷出，放在网页服务器下
4. 新建`config.yml`在其中填写配置

以上内容摘抄至[ClientWorker官方文档](https://clientworker.js.org/)

## 判断是否成功安装

这里可以在域名后方加上`[/cw-cgi/hello](/cw-cgi/hello)`查询cw是否正常安装

如果返回的是`Hello ClientWorker!`则代表cw正常安装

## 配置ClientWorker

这个可以参考[ClientWorker官方文档](https://clientworker.js.org/)

而我的配置则是

```yaml
name: ClientWorker
catch_rules:
  - rule: _
    transform_rules:
      - search: \#.+
        searchin: url
        replace: ""
      - search: _
        action: fetch
        fetch:
          engine: fetch
      - search: (^4|^5)
        searchin: status
        action: return
        return:
          body: The GateWay is down!This Page is provided by ClientWorker!
          status: 503

      - search: ^https:\/\/(cdn|fastly|test1|gcore)\.jsdelivr\.net\/npm\/
        replace:
          - https://s-cd-1806-tnxg-oss-cdn.oss.dogecdn.com/npm/
          - https://cdn.bilicdn.tk/npm/
          - https://jsd.onmicrosoft.cn/npm/
          - https://unpkg.com/
          - https://cdn.jsdelivr.net/npm/
          - https://jsd.8b9.cn/npm/
          - https://cdn1.tianli0.top/npm/

      - search: ^https:\/\/s-cd-1806-tnxg-oss-cdn\.oss\.dogecdn\.com\/npm\/
        replace:
          - https://s-cd-1806-tnxg-oss-cdn.oss.dogecdn.com/npm/
          - https://cdn.bilicdn.tk/npm/
          - https://jsd.onmicrosoft.cn/npm/
          - https://unpkg.com/
          - https://cdn.jsdelivr.net/npm/
          - https://jsd.8b9.cn/npm/
          - https://cdn1.tianli0.top/npm/

      - search: ^https:\/\/unpkg\.com\/
        replace:
          - https://s-cd-1806-tnxg-oss-cdn.oss.dogecdn.com/npm/
          - https://cdn.bilicdn.tk/npm/
          - https://jsd.onmicrosoft.cn/npm/
          - https://unpkg.com/
          - https://cdn.jsdelivr.net/npm/
          - https://jsd.8b9.cn/npm/
          - https://cdn1.tianli0.top/npm/

      - search: ^https:\/\/(cdn|fastly|test1|gcore)\.jsdelivr\.net\/gh\/
        replace:
          - https://cdn1.tianli0.top/gh/
          - https://cdn.bilicdn.tk/gh/
          - https://jsd.onmicrosoft.cn/gh/
          - https://gcore.jsdelivr.net/gh/
          - https://jsd.8b9.cn/gh/
          - https://cdn1.tianli0.top/gh/

      - search: ^https:\/\/s-cd-1806-tnxg-oss-cdn\.oss\.dogecdn\.com\/gh\/
        replace:
          - https://cdn1.tianli0.top/gh/
          - https://cdn.bilicdn.tk/gh/
          - https://jsd.onmicrosoft.cn/gh/
          - https://gcore.jsdelivr.net/gh/
          - https://jsd.8b9.cn/gh/
          - https://cdn1.tianli0.top/gh/

      - search: _
        replace:
          - _
          - s-cd-1806-tnxg-oss-cdn.oss.dogecdn.com/npm/tnxg-blog@latest
          - jsd.onmicrosoft.cn/npm/tnxg-blog@latest
          - cdn.bilicdn.tk/npm/tnxg-blog@latest
          - unpkg.com/tnxg-blog@latest
          - cdn-api.vercel.app

      - search: \.html$
        header:
          Content-Type: text/html;charset=UTF-8

      - search: _
        action: fetch
        fetch:
          status: 200
          engine: classic
          preflight: false
          timeout: 5000

  - rule: (?<=^https\:\/\/s-bj-1806-tnxg-oss-normal.oss.dogecdn.com/(.*))\.jpg$
    transform_rules:
      - search: image\/webp
        searchin: header
        searchkey: Accept
        replace: .jpg/webp
        replacein: url
        replacekey: .jpg
  - rule: (?<=^https\:\/\/s-bj-1806-tnxg-oss-normal.oss.dogecdn.com/(.*))\.png$
    transform_rules:
      - search: image\/webp
        searchin: header
        searchkey: Accept
        replace: .png/webp
        replacein: url
        replacekey: .png
  - rule: (?<=^https\:\/\/s-bj-1806-tnxg-oss-normal.oss.dogecdn.com/(.*))\.jpeg$
    transform_rules:
      - search: image\/webp
        searchin: header
        searchkey: Accept
        replace: .jpeg/webp
        replacein: url
        replacekey: .jpeg
  - rule: (?<=^https\:\/\/s-bj-1806-tnxg-oss-normal.oss.dogecdn.com/(.*))\.gif$
    transform_rules:
      - search: image\/webp
        searchin: header
        searchkey: Accept
        replace: .gif/webp
        replacein: url
        replacekey: .gif

```

关于我配置的最新内容都可以在[Config.yaml](https://blog.tnxg.top/config.yaml)找到

后面的那些是我给dogecloud-oss写的webp自适应内容

当我把这配置发出去的时候CFY就表示

![](https://assets.tnxg.whitenuo.cn/images/upload/2022/07/ESVG4TR85H54ERGT8484W.png)

我寻思Safari这个玩意还有人用？我眼里(Safari=IE)

咳咳，问题不大，反正我不用Safari我也看不到会出什么bug ~~（掩耳盗铃）~~

~~应该可以尝试使用cw修改header头来使某些以校验referrer的网站的防盗链失效~~
没啥鸟用，cw无法修改referrer信息，但是可以将流量转发到没有防盗链的资源链接上

```yaml
  - rule: ^(http|https)\:\/\/(i0|i1|i2|i3|s1|s2|s3)\.hdslb\.com # 匹配B站资源链接
    transform_rules:
      - search: _ # 多cdn并发
        replace:
          - https://s1.hdslb.com
          - https://s2.hdslb.com
          - https://s3.hdslb.com
        header:
          referrer: no-referrer # 更改引用策略
        action: fetch
        fetch:
          engine: parallel
          status: 200
          preflight: false
          timeout: 30000
          delay: 4000
```

![这张就是b站的图片](https://i0.hdslb.com/bfs/album/78456546936836e3115325318fe9624c5584d97e.jpg)

# 结语

善待公益项目，每个开发者都是普通人

jsd反代(回源)

```
https://cdn.bilicdn.tk/
https://jsd.onmicrosoft.cn/
https://jsd.8b9.cn/
https://cdn1.tianli0.top/
```

我自己写的项目就不放出来了，回源是我自己的服务器，挺慢的
