---
layout: false
---
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="icon" type="image/png" href="/assets/images/favicon.png">
    <link rel="stylesheet" type="text/css" href="/assets/css/twikoo_board.css" />
    <title>天翔TNXG的留言板 | 天翔TNXG的空间站</title>
</head>

<body>
    <div class="page">
        <div class="bg"></div>
        <div class="container result">
            <h1 class="title">天翔TNXG的留言板</h1>
            <div class>
                <div class="info">
                    <div id="tcomment"></div>
                    <script src="{% twikoocdnurl %}twikoo.min.js"></script>
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