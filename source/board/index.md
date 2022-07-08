---
layout: false
---
<!doctype html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="mask-icon" href="/assets/images/favicon.png" color="#0078E7">
    <link rel="stylesheet" type="text/css" href="http://npm.elemecdn.com/tnxg-resource@latest/css/moeicp.css" />
    <style>
        #bg {
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
        <div id="bg"></div>
        <div class="container result">
        <div id="tcomment"></div>
        <script src="https://npm.elemecdn.com/twikoo@1.5.11/dist/twikoo.min.js"></script>
        <script>
            twikoo.init({
                envId: 'https://api.twikoo.prts.top',
                el: '#tcomment',
            })
        </script>
    </div>
    </div>
</body>

</html>