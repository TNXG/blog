---
layout: false
---
<!doctype html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
        .page {
            min-height: 100vh;
            width: 95%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            font-weight: lighter;
        }
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
        }
    </style>
    <title>天翔的留言板 | 天翔的博客</title>
</head>

<body>
    <div class="page">
        <div class="bg"></div>
        <script src="https://npm.elemecdn.com/twikoo@1.5.11/dist/twikoo.all.min.js"></script>
        <script>twikoo.init({
                envId: "https://api.twikoo.prts.top",
                el: "#tcomment",
            })</script>
    </div>
</body>

</html>