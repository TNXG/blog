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
  <link href="/assets/css/artalk.css" rel="stylesheet">
  <title>天翔TNXG的留言板 | 天翔TNXGの空间站</title>
</head>

<body>
  <div class="page">
    <div class="bg"></div>
    <div class="container result">
      <h1 class="title">天翔TNXG的留言板</h1>
      <div class>
        <div class="info">
          <div id="ART_comments"></div>
          <script src="{% artalkcdnurl %}Artalk.min.js"></script>
          <script>
            var artalk = new Artalk({
              el: '#ART_comments',
              server: 'https://artalk.prts.top',
              site: '天翔TNXGの空间站',
              //- Zkeq佬提供的图片上传方式
              imgUploader: async (file) => {
                const formData = new FormData()
                let headers = new Headers();
                formData.set('file', file)
                headers.append('Authorization', 'Bearer 1|KFJIr9ahWLj7SYwLDaKCTtd63yoBMSEyZ27FbpAd');
                headers.append('Accept', 'application/json');
                return fetch('https://pic.prts.top/api/v1/upload', {
                    method: 'POST',
                    headers: headers,
                    body: formData,
                  })
                  .then((resp) => resp.json())
                  .then((resp) => resp.data.links.url);
              }
            })
          </script>
        </div>
      </div>
    </div>
  </div>
</body>

</html>