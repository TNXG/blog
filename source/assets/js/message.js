async function getnotice() {
    const replacehtml = await fetch('https://qexo.prts.top/pub/get_custom/?key=notice');
    const noticejson = await replacehtml.text();
    json = JSON.parse(noticejson);
    window.通知内容 = json.data;
    document.getElementById("tnxg_notice").innerHTML = window.通知内容;
}

async function getdata() {
    if (window.localStorage.getItem('TNXGBlog_UserId')) {
        userid = window.localStorage.getItem('TNXGBlog_UserId');
        const replacehtml = await fetch('https://prts.top/api/data/blog.php?id=' + userid);
        const noticejson = await replacehtml.text();
        json = JSON.parse(noticejson);
        local = json.local;
        document.getElementById("tnxg_addr").innerHTML = json.id;
    } else {
        const replacehtml = await fetch('https://prts.top/api/data/blog.php');
        const noticejson = await replacehtml.text();
        json = JSON.parse(noticejson);
        local = json.local;
        window.localStorage.setItem('TNXGBlog_UserId', json.id);
        document.getElementById("tnxg_addr").innerHTML = json.id;
    }
}

function getUA() {
    var ua = navigator.userAgent.toLowerCase();
    var match = /(msie|firefox|chrome|opera|version).*?([\d.]+)/.exec(ua);
    var browser = {};
    if (match && match.length > 2) {
        browser[match[1]] = match[2];
    }
    return browser;
}