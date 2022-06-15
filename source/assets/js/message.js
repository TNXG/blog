window.onload = function loadtnxgmassage() {
    document.getElementById("tnxg_addr").innerHTML = getAddress(getIP());
    document.getElementById("tnxg_notice").innerHTML = getnotice();
}

//获取访问者的ip
function getIP() {
    axios.defaults.withCredentials = true;
    axios.get('https://api.bilibili.com/x/web-interface/zone')
        .then(function (response) {
            var obj = JSON.parse(response)
            var data = obj["data"]["addr"];
            console.log(data);
            return data;
        })
        .catch(function (error) {
            console.log(error);
            return '锟斤拷烫烫烫';
        });
}

//通过百度api获得ip属地
function getAddress(ip) {
    axios.defaults.withCredentials = true;
    axios.get('https://api.amogu.cn/api/ipinfo/?ip=' + ip)
        .then(function (response) {
            var obj = JSON.parse(response)
            var data = obj["addr"];
            console.log(data);
            return data;
        })
        .catch(function (error) {
            console.log(error);
            return '锟斤拷烫烫烫';
        });
}

//通过qexo获取最新通知
function getnotice() {
    axios.defaults.withCredentials = true;
    axios.get('https://qexo.prts.top/pub/get_custom/?key=notice')
        .then(function (response) {
            var obj = JSON.parse(response)
            var data = obj["data"];
            console.log(data);
            return data;
        })
        .catch(function (error) {
            console.log(error);
            return '锟斤拷烫烫烫';
        });
}