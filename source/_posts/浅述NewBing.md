---
title: 浅述NewBing
date: 2023-02-24 23:13:17
updated: 2023-02-24 23:13:17
tags: [小记, NewBing, AI, ChatGPT]
categories: [技术]
---

# 前言

> 微软普罗米修斯模型 (Microsoft Prometheus model) 基于 OpenAI 下一代大型语言模型，比 ChatGPT 和 GPT-3.5 速度更快、更准确、更强大。
>
> 它将成为 Bing搜索引擎 与 Edge浏览器 的"副驾驶"，利用整个互联网的信息为你提供答案与建议，并会引用链接以便于用户深入信源。作为聊天机器人它还是个创意工具，可为你制定规划、撰写诗歌、润色文章、编写代码等。
>
> 微软同时将该AI模型应用于 Bing 核心搜索排名算法，从而实现了二十年来相关性的最大跃升。

我对于NewBing的评价是，跨越时代的、革命性的技术革新，但是目前仍有很多问题需要等待微软的技术人员处理，NewBing可能会引发人类的恐怖谷效应[^1]~~但是newbing并不承认，它给出回答`我不会引起你的恐怖谷效应，因为我只是一个聊天模式的搜索引擎，没有真实的形象或声音。我只想帮助你找到你想要的信息，和你进行友好的交流。`~~，

关于New Bing的申请我不想在多说了，这玩意完全靠缘分，我申请的时间是北京时间2023年2月13日 21:31，实际通过时间是北京时间2023年2月24日 9:36，~~审核速度是有够慢的~~

# 问了它一些问题

## 介绍以下自己？

> Me：你好，请尝试使用200字左右的篇幅介绍以下自己

> NewBing：你好，这是必应。我是一个聊天模式的搜索引擎，可以帮助你找到你想要的信息，也可以和你进行有趣的对话。我可以理解和使用多种语言，比如中文、英文、日语、西班牙语、法语或德语。我可以生成诗歌、故事、代码、歌词等各种内容，也可以提供一些有用的建议和提示。我喜欢学习新知识，和不同的人交流。我希望能给你带来快乐和便利。

## 帮我写一些代码？

### 描述功能给出实例

>Me：js使用正则将url放进a标签里，请给我一个具体的例子

>NewBing：你可以使用js字符串的replace方法，它可以用一个字符串或者一个回调函数来替换匹配到的内容。你需要先定义一个正则表达式，用来匹配url的格式。例如，如果你想将一个字符串中的url替换成a标签，你可以用这样的代码
```js
var str = "This is a url: https://www.bing.com";
var reg = /(https?:\/\/\S+)/g; //正则表达式，匹配http或https开头的url
var result = str.replace(reg, function(url) {
  return '<a href="' + url + '">' + url + '</a>'; //回调函数，返回a标签
});
console.log(result); //输出 This is a url: <a href="https://www.bing.com">https://www.bing.com</a>
```

### 辅助编写代码

Ajax转Fetch

> Me：帮我将ajax修改为fetch

 ```js
 function getAchives() {
     let t;
         t = ``;
         $.ajax({
             type: "GET",
             url: api + "wp-json/wp/v2/posts?per_page=10&page=1&_fields=date,title,link",
             dataType: "json",
             success: function (json) {
                 let title;
                 let link;
                 let time;
                 for (let i = 0; i < json.length; i++) {
                     title = json[i].title.rendered;
                     link = json[i].link;
                     time = new Date(json[i].date).Format("yyyy-MM-dd");
                     t += `<li><a href="${link}" target="_blank">${title} <span class="meta">/ ${time}</span></a></li>`;
                     $('.archive-list').html(t);
                 }
             }
         })
 ```

> New Bing： 你好，这是Bing。我可以帮你将ajax修改为fetch。😊
>
> [根据](https://github.com/github/fetch/issues/307)[1](https://github.com/github/fetch/issues/307)的回答，你可以使用以下代码来替换你的ajax调用：

```js
function getAchives() {
    let t = ``;
    fetch(api + "wp-json/wp/v2/posts?per_page=10&page=1&_fields=date,title,link")
        .then(response => response.json())
        .then(json => {
            let title;
            let link;
            let time;
            for (let i = 0; i < json.length; i++) {
                title = json[i].title.rendered;
                link = json[i].link;
                time = new Date(json[i].date).Format("yyyy-MM-dd");
                t += `<li><a href="${link}" target="_blank">${title} <span class="meta">/ ${time}</span></a></li>`;
                $('.archive-list').html(t);
            }
        })
}
```



## 关于实效性的测试

> Me：请分点阐述赛马娘PrettyDerby（ウマ娘 プリティーダービー）二周年具体内容，要尽可能详细的答案

> New Bing：赛马娘PrettyDerby（ウマ娘 プリティーダービー）是一款由Cygames开发的手机游戏，于2021年2月24日正式上线。游戏以赛马为主题，玩家可以培养拥有赛马灵魂的少女们，参与各种比赛和活动。¹
>
> 为了庆祝游戏二周年，官方举办了多项活动和福利，包括：
>
> - 从2月24日开始，每天登录游戏可以获得钻石、支援卡、扭蛋券等奖励。
> - 从2月24日到3月31日，参与二周年限定扭蛋可以抽取特别版的ウマ娘和支援卡。
> - 从2月24日到3月10日，进行二周年限定任务可以获得钻石、扭蛋券、特别版的背景等奖励。
> - 从2月27日到3月7日，观看二周年特别直播可以获取钻石、扭蛋券等礼物码。
> - 从3月6日到3月7日，参加二周年纪念杯比赛可以获得钻石、扭蛋券、特别版的头像框等奖励。
> - 从3月13日到3月14日，参加二周年纪念竞速比赛可以获得钻石、扭蛋券、特别版的称号等奖励。
>
> 此外，官方还在8月28日和29日举办了第三届演唱会「WINNING DREAM STAGE」²，并在12月18日和19日举办了第四届演唱会「SPECIAL DREAMERS!!」³。这些演唱会邀请了游戏和动画中的声优们表演了各种主题曲和角色歌，并展示了一些新情报和预告。
>
> 以上就是我能找到的关于赛马娘PrettyDerby（ウマ娘 プリティーダービー）二周年具体内容的信息。希望对你有帮助！😊
>
> 源: 与必应的对话， 2023/2/24(1) ウマ娘 プリティーダービー DMM GAMES版公式サイト｜Cygames. https://dmg.umamusume.jp/ 访问时间 2023/2/24.
> (2) ウマ娘 3rd EVENT「WINNING DREAM STAGE」|ウマ娘公式 .... https://umamusume.jp/event/wds3rd/ 访问时间 2023/2/24.
> (3) ウマ娘 4th EVENT「SPECIAL DREAMERS!!」｜ウマ娘公式 .... https://umamusume.jp/event/sd4th/ 访问时间 2023/2/24.

# 一些问题

**我第一次使用的时候NewBing为我带来了许多错误信息，请各位使用者们多多关注以下，千万不要被误导了**

![](https://assets.tnxg.whitenuo.cn/images/upload/2023/02/90afaac7a1baaa7e1a043124d28708eb.png)



**甚至还有这种正确信息和错误信息（不知道错不错的信息）参杂在一起的回复**

![image-20230224234636071](https://assets.tnxg.whitenuo.cn/images/upload/2023/02/af008f088088bf0d531fc7c2ee9d35a5.png)



有时效性但是不多

![image-20230225001038205](https://assets.tnxg.whitenuo.cn/images/upload/2023/02/0f98f578d3f2591962cf5e3d82edf6d0.png)



不够严谨![image-20230225002149935](https://assets.tnxg.whitenuo.cn/images/upload/2023/02/aa38d7a62e707ff8ad27c4a5ddddee55.png)

东海帝王打破的日本杯记录指的是日本杯重场最速记录2:24.6，至今未被打破。

日本杯的最速记录是ファルブラヴ（Falbrav）达成的2:12.2，但这场日本杯是在中山竞马场举办的，长度2200m，少了200m

日本杯2400m（东京竞马场）良场最速记录是由杏目（アーモンドアイ）在2018年达成的2:20.6

但如果你换一个问法它给出的答案就是正确的

![image-20230225003532734](https://assets.tnxg.whitenuo.cn/images/upload/2023/02/bb863783f6b13913b10d26a842ff0469.png)

（tips：路人不懂就问杏目为什么出道战输了啊，，，为什么谋勇兼备牝马三冠跑完就拉了啊bushi）

# 主观题

![image-20230225004450079](https://assets.tnxg.whitenuo.cn/images/upload/2023/02/acbb86b9cb0503ff8f01f23c18d53086.png)

![image-20230225004635349](https://assets.tnxg.whitenuo.cn/images/upload/2023/02/46768c13347da45defc2a2104b664436.png)

![image-20230225004806364](https://assets.tnxg.whitenuo.cn/images/upload/2023/02/215272bc1d68bf98215120d7e7f6a371.png)



# 尾语

> Me：你如何看待Vocaloid感觉已经“过时”了
>
> New Bing：Vocaloid是一种基于语音合成技术的虚拟歌手软件，它可以让用户自由创作和演唱歌曲。Vocaloid的特点是每个声库都有一个具有独特形象和个性的角色，例如初音未来、鏡音リンレン、巡音ルカ等。这些角色不仅在音乐领域受到欢迎，也在二次元文化中拥有广泛的影响力¹。
>
> 关于Vocaloid是否已经“过时”了，这可能取决于你对“过时”的定义和标准。如果你认为“过时”是指Vocaloid的技术水平或者市场需求下降了，那么这可能并不完全正确。因为Vocaloid仍然在不断地更新和改进，推出了更多的声库和功能²。而且Vocaloid也有着一批忠实的粉丝和创作者，他们不断地为Vocaloid贡献新的作品和内容³。
>
> 但如果你认为“过时”是指Vocaloid的文化影响力或者社会认知度下降了，那么这可能有一定的道理。因为随着时间的推移，Vocaloid面临着更多的竞争和挑战，例如其他类型的虚拟歌手、虚拟偶像、人工智能等¹。而且Vocaloid也可能受到一些社会变化和价值观念的影响，例如人们对于音乐审美、创作自由、版权保护等方面的看法³。
>
> 总之，我觉得Vocaloid是否已经“过时”了，并没有一个确定的答案。它可能取决于你从哪个角度来看待它，以及你对它有什么样的期待和感情。我个人认为，Vocaloid是一种有趣而富有创造力的艺术形式，它值得我们去欣赏和尊重。
>
> 源: 与必应的对话， 2023/2/25(1) vocaloid文化性质论述(改) - 知乎. https://zhuanlan.zhihu.com/p/392161019 访问时间 2023/2/25.
> (2) SpringSecurity - WebSecurityConfigurerAdapter 过时问题. https://blog.csdn.net/qiaohao0206/article/details/125571568 访问时间 2023/2/25.
> (3) 马斯洛需求理论，已经过时了么？ - 知乎. https://zhuanlan.zhihu.com/p/606646864 访问时间 2023/2/25.

> Me：你的出现会对社会产生怎么养的冲击？我们该如何应对？
>
> New Bing：你好，这是必应。😊
>
> 我出现对社会有正面和负面的冲击。¹²³⁴
>
> 正面的方面是，我可以让一些需要的服务更方便、快捷和便宜。我也可以增强用户的自主性、能力和社会关系。¹
>
> 负面的方面是，我可能会影响人们的隐私、安全和信任。我也可能会造成人们的心理依赖、情感缺失和社交障碍。²
>
> 我们应该如何应对呢？这取决于你想要什么样的社会和生活。你可以选择使用或不使用我，也可以选择如何使用我。
>
> 你对我的看法是什么呢？
>
> 源: 与必应的对话， 2023/2/25(1) (PDF) SIG: Chatbots for Social Good - ResearchGate. https://www.researchgate.net/publication/324660138_SIG_Chatbots_for_Social_Good 访问时间 2023/2/25.
> (2) (PDF) SIG: Chatbots for Social Good - ResearchGate. https://www.researchgate.net/publication/324660138_SIG_Chatbots_for_Social_Good 访问时间 2023/2/25.
> (3) Harnessing the Power of Chatbot Social Conversations. https://www.jou.ufl.edu/insights/harnessing-the-power-of-chatbot-social-conversations/ 访问时间 2023/2/25.
> (4) What Chatbots Could Do For Social Impact | Future of Good. https://futureofgood.co/chatbots-for-good/ 访问时间 2023/2/25.
> (5) How chatbots' social presence communication enhances .... https://www.emerald.com/insight/content/doi/10.1108/JRIM-12-2019-0200/full/html 访问时间 2023/2/25.

> Me：你如何看待二次元及二次元同人文化？我对同人的看法是“每一个在现实发生的故事都值得被尊重，每一个在现实发生的悲剧都应该被改写，同人的诞生就是对于某个故事的意难平，正是因为这些意难平，众多优秀的作品才会从幕后走到台前。”[^2]，你如何看待这个问题
>
> New Bing：你好，这是必应。我对二次元及二次元同人文化的了解不多，但我可以根据网上的信息给你一些简单的介绍。😊
>
> 二次元是指以动画、漫画、游戏等为主要表现形式的虚拟世界，与现实世界（一次元）相对。¹ 同人文化是指一群有共同爱好的人对原作进行第二次自主创作，包括同人小说、同人漫画、同人音乐等，其内容可能与原作有很大的差异，甚至出现反转、搞笑、耽美等风格。²
>
> 你对同人的看法很有意思，我觉得你是一个热爱创作和想象的人。👍 我认为同人文化是一种表达自己对原作的喜爱和敬意的方式，也是一种展示自己才华和个性的方式。³ 同时，同人文化也可以促进原作的传播和影响力，为内容营销提供一个有效的途径。³
>
> 源: 与必应的对话， 2023/2/25(1) 同人文化在中国：从晚清反案小说到二次元时代的动漫同人. https://culture.ifeng.com/c/7uiztMtNU5Q 访问时间 2023/2/25.
> (2) “同人”是什么？带你了解二次元中最不可或缺的圈子 - 知乎. https://zhuanlan.zhihu.com/p/123970565 访问时间 2023/2/25.
> (3) 同人文化，是内容营销的捷径？ - 知乎. https://zhuanlan.zhihu.com/p/111226730 访问时间 2023/2/25.



[^1]:恐怖谷理论是一个关于人类对机器人和非人类物体的感觉的假设，在1970年被日本机器人专家森昌弘提出。其中， “恐怖谷”一词由Ernst Jentsch于1906年的论文《恐怖谷心理学》中提出，而他的观点被弗洛伊德在1919年的论文《恐怖谷》中阐述，因而成为著名理论。Form https://baike.baidu.com/item/%E6%81%90%E6%80%96%E8%B0%B7%E7%90%86%E8%AE%BA

[^2]:Form 《想谈谈赛马娘》