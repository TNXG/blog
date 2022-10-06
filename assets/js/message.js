async function getnotice() {
    localnotice = localStorage.getItem("TNXGBlog_notice");
    document.getElementById("tnxg_notice").innerHTML = localnotice;
    const replacehtml = await fetch('https://qexo.prts.top/pub/get_custom/?key=notice');
    noticejson = await replacehtml.json().data;
    if (localnotice != noticejson.data) {
        console.log("天翔TNXG的空间站:::非最新公告，正在更新")
        localStorage.setItem("TNXGBlog_notice", noticejson.data)
        document.getElementById("tnxg_notice").innerHTML = noticejson.data;
    }
}

async function gethitokoto() {
    console.log("天翔TNXG的空间站::获取一言数据中")
    const replacehtml = await fetch('/assets/data/hitokoto.json');
    noticejson = await replacehtml.json();
    datalength = noticejson.length;
    random = randomNum(0, datalength - 1)
    returndata = noticejson[random]
    document.getElementById("tnxg_hitokoto").innerHTML = `${returndata.content}(${returndata.from})`;
}



function getdata() {
    if (!(localStorage.getItem('TNXGBlog_UserId'))) {
        localStorage.setItem('TNXGBlog_UserId', unique(36).toUpperCase());
    }
    ipinfo = getipinfo()
    var req = new XMLHttpRequest();
    req.open('POST', 'https://api.tnxg.prts.top/api/v1/callback', false);
    req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    req.send('userid=' + localStorage.getItem('TNXGBlog_UserId') + '&url=' + encodeURIComponent(window.location.href) + "&ip=" + ipinfo.ip + "&loc=" + ipinfo.location);
    json = JSON.parse(req.response);
    local = json.local;
    document.getElementById("tnxg_addr").innerHTML = local;
}

function getipinfo() {
    var xml = new XMLHttpRequest();
    xml.open('GET', 'https://prts.top/api/ipinfo/', false);
    xml.send(null);
    json = JSON.parse(xml.response);
    return json;
}

function unique(size) {
    size = size || 10;
    var r = function r() {
        return Math.random().toString(36).slice(2);
    };
    var result = r();
    while (result.length < size) {
        result += r();
    }
    return result.slice(0, size);
}

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}