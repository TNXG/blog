---
title: 简记Grasscutter的搭建
date: 2022-05-01 00:15:17
update: 2022-05-01 00:15:17
tags: [原神, 私服, 抓包, 教程]
categories: [游戏, 原创, 教程]
---

![](https://assets.tnxg.whitenuo.cn/images/upload/2022/05/20220501000338.jpg)

# 前言

tip:本文仅作技术分享，从而带来的任何问题我们暂不负责，若本文侵犯了贵方的权益请联系[天翔TNXG](mailto:tnxg@outlook.jp)

上一次见到关于MitmProxy的项目是关于明日方舟的G和私服，没想到这么快就轮到原神了，这还是令我有点惊讶的

不过搭建这类东西是需要点小技术的。没有技术力的还是去看别人写的博文，利用懒人包搭建罢

<!-- more -->

当然这篇博文是基于Windows的环境下搭建的，不负责Linux

你需要先在电脑中安装以下软件

```
Python ≈ 3.8
Java ≈ 17
CMD
Mongodb
```

# 下载安装Python

[python3.8.8.exe](https://assets.prts.top/d/aliyun/%E4%BE%9D%E8%B5%96/python/python3.8.8.exe)

在这里下载安装就可以了，虽然我不太确定py39能不能正常使用，但我觉得应该可以（）

但一定要记住让它安装环境变量

# 下载安装Java

我这里提供一个JavaJDK18的下载地址吧：[jdk-18_windows-x64_bin.exe](https://assets.prts.top/d/aliyun/%E4%BE%9D%E8%B5%96/java/jdk-18_windows-x64_bin.exe)

依旧是下载安装，但是Java不会给你自动配置环境变量，还需要手动配置，详细可以参考[这篇文章](https://www.runoob.com/w3cnote/windows10-java-setup.html)

# 下载安装Mongodb

关于Mongodb下载安装我有必要详细讲下，这玩意的安装过程属实有点麻烦

但如果你是大佬，或者你的Mongodb服务已经在22102端口正常运行，请跳过这步，直接开始[构建Grasscutter](#构建Grasscutter)

## 下载

首先需要到[Mongodb的官网](https://www.mongodb.com/try/download/community)下载软件，我这里推荐使用它的zip存档，这方便我们稍后配置<span class="heimus" title="你知道的太多了">如果大佬会配置Mongodb的自启或别的什么我就不说啥了，毕竟谁也不想每次开个Mongodb都要在安装盘里找半天</span>

![](https://assets.tnxg.whitenuo.cn/images/upload/2022/04/20220430221147.png)

## 开启Mongodb

解压刚下载的压缩包

打开cmd，然后cd到刚解压的文件夹中

新建一个文件夹，用来储存我们的数据`mkdir db`

然后再cd进入`bin`文件夹，`cd bin`

尝试使用命令开启Mongodb`mongod --dbpath "../db"`，如果命令提示符中出现大量json数据则代表开启成功 ~~或许开启失败也是一堆json数据，但我目前还没有遇见过~~

如果嫌每次启动都输入命令麻烦当然可以写个启动脚本

依旧是在Mongodb的根目录下，输入

```cmd
echo cd bin > start.bat
echo mongod --dbpath "../db" >> start.bat
```

这两条命令会在目录下生成生成一个`start.bat`以后点击start.bat就可以开启Mongodb服务

# 配置Python

这个还算比较简单，直接运行`pip install mitmproxy`就可以了

如果下载慢或者报错的话我个人推荐还是去网上搜搜`pip如何配置全局镜像源`

# 构建Grasscutter

## 拉取项目

在以上前置软件安装完成后前往Github下载最新的[Grasscutter](https://github.com/Grasscutters/Grasscutter)，当然是下载源代码（保持版本最新嘛）

![](https://assets.tnxg.whitenuo.cn/images/upload/2022/04/20220430223815.png)

当然用git工具直接clone是最简单的`git clone https://github.com/Grasscutters/Grasscutter.git`

首先要做的肯定是先cd到一个方便接下来步骤的文件夹，我就选择桌面了`cd C:\Users\Administrator\Desktop\`

然后直接clone Grasscutter的仓库，`git clone https://github.com/Grasscutters/Grasscutter.git`<span class="heimus" title="你知道的太多了">如果你是从github直接下载的可以直接解压，无伤大雅</span>

**尝鲜请前往development分支这里的更新速度是最快的**

## 开始构建

clone完成后再次cd进Grasscutter文件夹`cd Grasscutter`

运行开发者之前就给我们准备好的构建脚本`gradlew.bat`，然后它会自动开始下载构建需要的依赖

当这个脚本运行完成后我们接着运行`gradlew jar`，这一步会需要比较长的时间，请耐心等待

在以上步骤都执行完成过后会在代码的根目录出现一个`grasscutter.jar`文件，这个便是服务端了，但先别急着打开它，我们现在还缺少一些资源

# 配置并开放Grasscutter

## 下载资源文件

我们先新建一个Grasscutter-Server文件夹

* 将原本储存着代码的文件夹中的`data`文件夹、`keys`文件夹、`resources`文件夹、`grasscutter.jar`、`keystore.p12`、`proxy.py`移动到`Grasscutter-Server`文件夹中
* 将[GenshinData](https://github.com/Dimbreath/GenshinData)中的`TextMap`、`Subtitle`、`Readable`、`ExcelBinOutput`移动到`Grasscutter-Server`的`resources`文件夹中
* 将[Grasscutter-Protos](https://github.com/Grasscutters/Grasscutter-Protos)中的`proto`移动到`Grasscutter-Server`的`resources`文件夹中
* 将[gi-bin-output](https://github.com/radioegor146/gi-bin-output)中的`2.5.52/Data/_BinOutput`重命名为`BinOutput`然后移动到`Grasscutter-Server`的`resources`文件夹中，目前原仓库已经被封禁，但是还有备份啊（大雾）[gi-bin-output备份1](https://github.com/zhsitao/gi-bin-output)、[gi-bin-output备份2](https://github.com/Grassgrowers/gi-bin-output)

## 开放服务器

依旧是在`Grasscutter-Server`文件夹中，cmd输入

`java -jar grasscutter.jar -handbook`你会看见在根目录下多了个`GM handbook.txt`的文件！这个文件是必须的！

然后继续执行

```cmd
echo start java -jar grasscutter.jar > start.bat
echo start mitmdump -s proxy.py --ssl-insecure >> start.bat
```

如果cmd没有任何报错，恭喜你成功了，你的服务器被开放了！

现在你可以尝试使用`account create 用户名 用户id` 来创建你的游戏账号，并测试服务端是否正常

# 将国服客户端转成国际服

可以用[Snap Genshin](https://github.com/DGP-Studio/Snap.Genshin)，关于过程可以详见[它的文档](https://www.snapgenshin.com/documents/extensions/Genshin-Launcher-Plus-SE-Plugin.html)

# 链接服务器

去 `设置->网络和Internet->代理->手动设置代理` 中设置代理服务器的IP，一般来说就是`127.0.0.1`，端口是`8080`

如果代理没有作用或无法链接服务器则需要安装证书

**注:** mitmproxy的CA证书可以从[`http://mitm.it`](http://mitm.it) 中下载它

双击来[安装根证书](https://docs.microsoft.com/en-us/skype-sdk/sdn/articles/installing-the-trusted-root-certificate#installing-a-trusted-root-certificate) 或者..

确定你可以正常将流量转发到个人服务器的时候，打开游戏，在登录时你需要输入创建的用户名和任意密码即可加入服务器。

**切记，使用国际服客户端**

# Grasscutter命令(百度翻译自官方文档)

物品或生物ID可以在`GM Handbook.txt`中找到

在每个玩家的朋友列表中都有一个名为“服务器”的虚拟用户，你可以通过发送消息来使用命令。命令也适用于其他聊天室，例如私人/团队聊天。
要在游戏中使用命令，需要添加 `/` 或 `!` 前缀，如 `/pos`


| 命令           | 用法                                                                  | 权限节点                  | 可用性   | 注释                                                    | 别名                                            |
| ---------------- | ----------------------------------------------------------------------- | --------------------------- | ---------- | --------------------------------------------------------- | ------------------------------------------------- |
| account        | account <create\|delete> <用户名> [uid]                               |                           | 仅服务端 | 通过指定用户名和uid增删账户                             |                                                 |
| broadcast      | broadcast <消息内容>                                                  | server.broadcast          | 均可使用 | 给所有玩家发送公告                                      | b                                               |
| coop           | coop\<uid> <目标uid>                                                  | server.coop               | 均可使用 | 强制某位玩家进入指定玩家的多人世界                      |                                                 |
| changescene    | changescene <场景ID>                                                  | player.changescene        | 仅客户端 | 切换到指定场景                                          | scene                                           |
| clearartifacts | clearartifacts                                                        | player.clearartifacts     | 仅客户端 | 删除所有未装备及未解锁的圣遗物,包括五星                 | clearart                                        |
| clearweapons   | clearweapons                                                          | player.clearweapons       | 仅客户端 | 删除所有未装备及未解锁的武器,包括五星                   | clearwp                                         |
| drop           | drop <物品ID\|物品名称> [数量]                                        | server.drop               | 仅客户端 | 在指定玩家周围掉落指定物品                              | `d` `dropitem`                                  |
| give           | give [uid] <物品ID\|物品名称> [数量] [等级] [精炼等级]                |                           |          | 给予指定玩家一定数量及等级的物品 (精炼等级仅适用于武器) | `g` `item` `giveitem`                           |
| givechar       | givechar\<uid> <角色ID> [等级]                                        | player.givechar           | 均可使用 | 给予指定玩家对应角色                                    | givec                                           |
| giveart        | giveart [uid]\<圣遗物ID> \<主属性ID> [\<副属性ID>[,<次数>]]... [等级] | player.giveart            | 均可使用 | 给予玩家指定属性的圣遗物                                | gart                                            |
| giveall        | giveall [uid] [数量]                                                  | player.giveall            | 均可使用 | 给予指定玩家全部物品                                    | givea                                           |
| godmode        | godmode [uid]                                                         | player.godmode            | 仅客户端 | 保护你不受到任何伤害(依然会被击退)                      |                                                 |
| heal           | heal                                                                  | player.heal               | 仅客户端 | 治疗队伍中所有角色                                      | h                                               |
| help           | help [命令]                                                           |                           | 均可使用 | 显示帮助或展示指定命令的帮助                            |                                                 |
| kick           | kick\<uid>                                                            | server.kick               | 均可使用 | 从服务器中踢出指定玩家 (WIP)                            | k                                               |
| killall        | killall [uid] [场景ID]                                                | server.killall            | 均可使用 | 杀死指定玩家世界中所在或指定场景的全部生物              |                                                 |
| list           | list                                                                  |                           | 均可使用 | 列出在线玩家                                            |                                                 |
| permission     | permission <add\|remove> <用户名> <权限节点>                          | *                         | 均可使用 | 添加或移除玩家的权限                                    |                                                 |
| position       | position                                                              |                           | 仅客户端 | 获取当前坐标                                            | pos                                             |
| reload         | reload                                                                | server.reload             | 均可使用 | 重载服务器配置                                          |                                                 |
| resetconst     | resetconst [all]                                                      | player.resetconstellation | 仅客户端 | 重置当前角色的命座,重新登录即可生效                     | resetconstellation                              |
| restart        | restart                                                               |                           | 均可使用 | 重启服务端                                              |                                                 |
| say            | say\<uid> <消息>                                                      | server.sendmessage        | 均可使用 | 作为服务器发送消息给玩家                                | `sendservmsg` `sendservermessage` `sendmessage` |
| setfetterlevel | setfetterlevel <好感等级>                                             | player.setfetterlevel     | 仅客户端 | 设置当前角色的好感等级                                  | `setfetterlvl` `setfriendship`                  |
| setstats       | setstats <属性> <数值>                                                | player.setstats           | 仅客户端 | 直接修改当前角色的面板                                  | stats                                           |
| setworldlevel  | setworldlevel <世界等级>                                              | player.setworldlevel      | 仅客户端 | 设置世界等级(重新登陆即可生效)                          | setworldlvl                                     |
| spawn          | spanw <实体ID\|实体名称> [等级] [数量]                                | server.spawn              | 仅客户端 | 在你周围生成实体                                        |                                                 |
| stop           | stop                                                                  | server.stop               | 均可使用 | 停止服务器                                              |                                                 |
| talent         | talent <天赋ID> <等级>                                                | player.settalent          | 仅客户端 | 设置当前角色的天赋等级                                  |                                                 |
| teleport       | teleport [@playerUid]\<x> \<y> \<z> [sceneId]                         | player.teleport           | 均可使用 | 传送玩家到指定坐标                                      | tp                                              |
| tpall          |                                                                       | player.tpall              | 仅客户端 | 传送多人世界中所有的玩家到自身地点                      |                                                 |
| weather        | weather <天气ID> <气候ID>                                             | player.weather            | 仅客户端 | 改变天气                                                | w                                               |

## 额外功能

当你想传送到某个地点, 只需要在地图中创建标记, 关闭地图后即可到达目标地点上空

# 尾语

***切勿滥用***，给任何一个项目活下去的机会，这种东西本就不是合法的，我们自己玩玩嗨皮一把就可以了，大可不必到处宣传<span class="heimus" title="你知道的太多了">我的博客是给爬虫看的</span>

## 参考

[深海小涛:【教程】 Grasscutter 一个动画游戏的服务器端模拟器](https://xtaolink.cn/360.html)
[官方文档](https://github.com/Grasscutters/Grasscutter/blob/development/README_zh-CN.md)