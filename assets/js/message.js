async function getnotice() {
    const replacehtml = await fetch('https://qexo.prts.top/pub/get_custom/?key=notice');
    const noticejson = await replacehtml.text();
    json = JSON.parse(noticejson);
    message = json.data;
    document.getElementById("tnxg_notice").innerHTML = message;
}

function getdata() {
    if (!(localStorage.getItem('TNXGBlog_UserId'))) {
        localStorage.setItem('TNXGBlog_UserId', unique(36).toUpperCase())
    }
    ipinfo = getipinfo()
    var req = new XMLHttpRequest();
    req.open('POST', 'https://api.tnxg.prts.top/api/callback', false);
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
    console.log(xml.response)
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
