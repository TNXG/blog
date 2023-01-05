---
title: 获取bing每日图的方法
date: 2022-07-31 14:22:00
updated: 2022-07-31 14:22:00
tags: [白嫖, PHP]
categories: [原创, 技术]
---

随便扯一篇文章发出来？

<!-- more -->

```php
ini_set("display_errors", "Off");
error_reporting(E_ALL | E_STRICT);
// 删除警告信息

$str = file_get_contents('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8');
$str = json_decode($str, true);
$num = $_GET['num'];
// 从官方api返回最近每日图的信息，并获取参数$num

if (empty($num)) {
    $a = 0;
} else {
    if (7 >= $num && $num >= 0) {
        $a = $num;
    } else {
        $a = 0;
    };
};
// 如果$num为空则赋值0，否则则按num传入值对$num进行赋值(大于等于7或小于等于0)

$con = $str['images'][$a]['url'];
$url = "https://cn.bing.com" . $con;
// 获取随机图信息

$type = $_GET['type'];
switch ($type) {
    case 'json':
        header('Content-type:text/json');
        die(json_encode(['url' => $url]));

    case 'url':
        die(header("Location: $url"));

    default:
        header("content-type:image/jpeg");
        $images = file_get_contents($url);
        die($images);
}
// 获取参数type并赋值$type，按照赋值内容返回相对应的格式
```

详细信息及实现方法已经写在代码注释里了，可以参考着玩一玩（大雾）

![](https://i0.hdslb.com/bfs/album/3f6cedace0a8e58f1de4b64f7d85e21ed687718f.png)
