log.console('妈的我是傻逼');
document.getElementById("tnxg_addr").innerHTML = getAddress(getIP());
document.getElementById("tnxg_notice").innerHTML = getnotice();
log.console(getnotice() + getAddress(getIP()));

//获取访问者的ua
function getUA() {
    var ua = navigator.userAgent.toLowerCase();
    var match = /(msie|firefox|chrome|opera|version).*?([\d.]+)/.exec(ua);
    var browser = {};
    if (match && match.length > 2) {
        browser[match[1]] = match[2];
    }
    return browser;
}

//获取访问者的ip
function getIP() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://api.bilibili.com/x/web-interface/zone',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                resolve(data.addr)
            }
        })
    })
}
//通过百度api获得ip属地
function getAddress(ip) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://api.amogu.cn/api/ipinfo/?ip=' + ip,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                resolve(addr)
            }
        })
    })
}
//获取公告信息
function getnotice() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://qexo.prts.top/pub/get_custom/?key=notice',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                resolve(data)
            }
        })
    })
}
<script>
    //ChenYFan大佬提供的serviceworker加载方式
    (async () => {
        const $ = document.querySelector.bind(document);
        if ('serviceWorker' in navigator) {
            if (Number(window.localStorage.getItem('TNXG_ServiceWorker')) < 1) {
                window.localStorage.setItem('TNXG_ServiceWorker', 1)
                window.stop()
                document.body.innerHTML = await (await fetch('https://npm.elemecdn.com/tnxg-resource@0.0.2/pages/swinstall.html')).text()
            }
            navigator.serviceWorker.register(`/sw.js?time=${ranN(1, 88888888888888888888)}`).then(async () => {
                if (Number(window.localStorage.getItem('TNXG_ServiceWorker')) < 2) {
                    setTimeout(() => {
                        window.localStorage.setItem('TNXG_ServiceWorker', 2)
                        window.location.reload()
                    }, 500)
                }
            })
                .catch(err => console.error(`TNXG_ServiceWorker:${err}`))
        }
    })()
</script>