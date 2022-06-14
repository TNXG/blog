function loadtnxgmassage() {
    document.getElementById("tnxg_addr").innerHTML = getAddress(getIP());
    document.getElementById("tnxg_browser").innerHTML = getBrowserName();
    document.getElementById("tnxg_notice").innerHTML = getnotice();
}

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

//根据ua获取浏览器名称
function getBrowserName() {
    var ua = navigator.userAgent.toLowerCase();
    var match = /(msie|firefox|chrome|opera|version).*?([\d.]+)/.exec(ua);
    var browser = {};
    if (match && match.length > 2) {
        browser[match[1]] = match[2];
    }
    return browser;
}