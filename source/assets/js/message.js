function tnxg_notice() {
    document.getElementById("tnxg_notice").innerHTML = getnotice();
    document.getElementById("tnxg_addr").innerHTML = getAddress(getIP());

}

//通过qexo获取最新通知
function getnotice() {
    async () => {
        const replacehtml = await fetch('https://qexo.prts.top/pub/get_custom/?key=notice')
        const noticejson = await replacehtml.text()
        var data = noticejson.data;
        console.log(data);
        return data;
    }
}

//获取访问者的ip
function getIP() {
    async () => {
        const replacehtml = await fetch('https://api.bilibili.com/x/web-interface/zone', {
            referrerPolicy: "no-referrer"
        })
        const noticejson = await replacehtml.text()
        var data = noticejson.data.addr;
        console.log(data);
        return data;
    }
}

//通过百度api获得ip属地
function getAddress(ip) {
    async () => {
        const replacehtml = await fetch('https://prts.top/api/ipinfo/?ip=' + ip)
        const noticejson = await replacehtml.text()
        var data = noticejson.location;
        console.log(data);
        return data;
    }
}