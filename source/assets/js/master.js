// 监听键盘事件，如果按下了Ctrl+Shift+C或者F12，则显示提示
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 123 || (event.ctrlKey && event.shiftKey && event.keyCode == 73) || (event.ctrlKey && event.shiftKey && event.keyCode == 67)) {
        message({ type: 'warn', text: '开发者模式已打开，请遵循CC BY-NC-SA 4.0 协议！', duration: '6000', zIndex: '10' });
    }
});

// 监听内容复制事件，如果复制了内容，则显示提示
document.addEventListener('copy', function (event) {
    message({ type: 'warn', text: '已复制！本站文字内容默认使用CC BY-NC-SA 4.0 协议，分享时请遵守使用协议！', duration: '6000', zIndex: '10' });
});

// 提示文章是否过期，每次页面开启时检查
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.indexOf('/p/') != -1) {
        // 获取<time>中的时间
        var post = document.querySelector('time').getAttribute('datetime');
        post = post.split('T')[0];
        console.log(post);
        // 检测post的时间是否距今超过120天
        var today = new Date();
        today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        newtoday = new Date(today);
        newpost = new Date(post);
        var diff = newtoday - newpost;
        diff = diff / 1000 / 60 / 60 / 24;
        // 化为整数
        diff = parseInt(diff);
        if (diff > 120) {
            message({ type: 'warn', text: '本文发布于' + post + '，距今已' + diff + '天，内容可能已经过时，请谨慎参考！', duration: '3000', zIndex: '10' });
        }
    }
});