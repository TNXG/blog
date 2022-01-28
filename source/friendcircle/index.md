---
title: 友链朋友圈
date: 2022-1-15 01:30:00
banner: <meta name="referrer" content="no-referrer"/>
---
<!-- 友链朋友圈样式 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Rock-Candy-Tea/hexo-friendcircle-demo@main/css/akilar-SAO.css">

<!-- 挂载友链朋友圈的容器 -->
<div id="fcircleContainer"></div>

<!-- 全局引入友链朋友圈配置项 -->
<script>
  // 全局变量声明区域
  var fdata = {
    apiurl: 'https://friendcircle-api-gilt.vercel.app/api',
    initnumber: 20, //【可选】页面初始化展示文章数量
    stepnumber: 10,//【可选】每次加载增加的篇数
    error_img: '/image/404.gif' //【可选】头像加载失败时默认显示的头像
  }
  //存入本地存储
  localStorage.setItem("fdatalist",JSON.stringify(fdata))
</script>

<!-- 全局引入抓取方法 -->
<script defer src="https://cdn.jsdelivr.net/gh/Rock-Candy-Tea/hexo-friendcircle-demo@main/js/fetch.js"></script>