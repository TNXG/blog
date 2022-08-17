async function getnotice() {
    const replacehtml = await fetch('https://qexo.prts.top/pub/get_custom/?key=notice');
    const noticejson = await replacehtml.text();
    json = JSON.parse(noticejson);
    message = json.data;
    document.getElementById("tnxg_notice").innerHTML = message;
}

function getdata() {
    $.ajax({
        type: "get",
        url: "https://whois.pconline.com.cn/ipJson.jsp?json=true",
        dataType: "json",
        success: function (json) {
            if (!(localStorage.getItem('TNXGBlog_UserId'))) {
                localStorage.setItem('TNXGBlog_UserId', unique(36).toUpperCase())
            }
            var req = new XMLHttpRequest();
            req.open('POST', 'https://api.tnxg.prts.top/api/callback');
            req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            req.send('userid=' + localStorage.getItem('TNXGBlog_UserId') + '&url=' + encodeURIComponent(window.location.href) + "&ip=" + json.ip + "&addr=" + json.addr);
            json = JSON.parse(req.response);
            local = json.local;
            document.getElementById("tnxg_addr").innerHTML = json.addr;
        },
        error: function (e) {
            alert("error");
        }
    });
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
