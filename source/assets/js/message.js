function tnxg_notice() {
    var t = "https://qexo.prts.top/pub/get_custom/?key=notice";
    fetch(t, {
        referrerPolicy: "no-referrer-when-downgrade"
    }).then(function (res) {
        if (res.ok) {
            res.json().then(function () {
                if (response.data) {
                    if (document.getElementById("tnxg_notice")) {
                        document.getElementById("tnxg_notice").innerHTML = response.data;
                    }
                } else {
                    console.log(e.error);
                    if (document.getElementById("tnxg_notice")) {
                        document.getElementById("tnxg_notice").innerHTML = "请求失败";
                    }
                }
            })
        }
    });
}

//通过qexo获取最新通知
function getnotice() {
    axios.defaults.withCredentials = true;
    axios.get('https://qexo.prts.top/pub/get_custom/?key=notice')
        .then(function (response) {
            var data = response.data;
            console.log(data);
            return data;
        })
        .catch(function (error) {
            console.log(error);
            return '锟斤拷烫烫烫';
        });
}

//获取访问者的ip
function getIP() {
    axios.defaults.withCredentials = true;
    axios.get('https://api.bilibili.com/x/web-interface/zone')
        .then(function (response) {
            var data = response["data"]["addr"];
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
            var data = response["addr"];
            console.log(data);
            return data;
        })
        .catch(function (error) {
            console.log(error);
            return '锟斤拷烫烫烫';
        });
}