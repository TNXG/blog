---
layout: false
---
<!doctype html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="mask-icon" href="/assets/images/favicon.png" color="#0078E7">
    <link rel="stylesheet" type="text/css" href="https://s-cd-1806-tnxg-oss-cdn.oss.dogecdn.com/npm/tnxg-resource@latest/css/blog_twikoo_board.css" />
    <title>天翔的留言板 | 天翔的博客</title>
</head>

<body>
    <div class="page">
        <div class="bg"></div>
        <div class="container result">
            <h1 class="title">天翔的留言板</h1>
            <div class>
                <div class="info">
                    <div id="tcomment"></div>
                    <script src="https://s-cd-1806-tnxg-oss-cdn.oss.dogecdn.com/npm/twikoo@1.5.11/dist/twikoo.min.js"></script>
                    <script>
                        twikoo.init({
                            envId: 'https://api.twikoo.prts.top',
                            el: '#tcomment',
                        })
                    </script>
                </div>
            </div>
        </div>
    </div>
</body>

</html>