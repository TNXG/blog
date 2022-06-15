const axios = require('axios');

window.onload = function loadtnxgmassage() {
    document.getElementById("tnxg_addr").innerHTML = getAddress(getIP());
    document.getElementById("tnxg_browser").innerHTML = getUA();
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

    axios.get('https://api.bilibili.com/x/web-interface/zone')
        .then(function (response) {
            var data = response.data.addr;
            return data;
        })
        .catch(function (error) {
            console.log(error);
            return '锟斤拷烫烫烫';
        });
}

//通过百度api获得ip属地
function getAddress(ip) {
    axios.get('https://api.amogu.cn/api/ipinfo/?ip=' + ip)
        .then(function (response) {
            var data = response.addr;
            return data;
        })
        .catch(function (error) {
            console.log(error);
            return '锟斤拷烫烫烫';
        });
}

//通过qexo获取最新通知
function getnotice() {
    axios.get('https://qexo.prts.top/pub/get_custom/?key=notice')
        .then(function (response) {
            var data = response.data;
            return data;
        })
        .catch(function (error) {
            console.log(error);
            return '锟斤拷烫烫烫';
        });
}