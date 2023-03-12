function showTip(text) {
    var tip = document.getElementById("tnxg_tip");
    if (tip) {
        tip.innerHTML = text;
        tip.style.display = "block";
    } else {
        tip = document.createElement("div");
        tip.id = "tnxg_tip";
        tip.innerHTML = text;
        document.body.appendChild(tip);
    }
    setTimeout(function () {
        tip.style.display = "none";
    }, 8000);
}

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