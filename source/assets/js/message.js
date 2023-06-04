window.randomNum = randomNum;

function tnxg_pages() {
    getdata();
}

function tnxg_index() {
    tnxg_pages();
    getnotice();
    gethitokoto()
}

async function getnotice() {
    localnotice = localStorage.getItem("TNXGBlog_notice");
    console.log(`天翔TNXGの空间站::加载本地缓存公告，公告内容：${localnotice}`)
    document.getElementById("tnxg_notice").innerHTML = localnotice;
    const replacehtml = await fetch('https://qexo.prts.top/pub/get_custom/?key=notice');
    noticejson = await replacehtml.json();
    if (localnotice != noticejson.data) {
        console.log(`天翔TNXGの空间站::非最新公告或初次访问，正在更新，最新公告内容：${noticejson.data}`)
        localStorage.setItem("TNXGBlog_notice", noticejson.data)
        document.getElementById("tnxg_notice").innerHTML = noticejson.data;
    }
}

async function gethitokoto() {
    console.log("天翔TNXGの空间站::获取一言数据中")
    const replacehtml = await fetch('/assets/data/hitokoto.json');
    noticejson = await replacehtml.json();
    datalength = noticejson.length;
    random = randomNum(0, 32)
    returndata = noticejson[random]
    document.getElementById("tnxg_hitokoto").innerHTML = `${returndata.content}(${returndata.from})`;
}

async function getdata() {
    if (!(localStorage.getItem('TNXGBlog_UserId'))) {
        localStorage.setItem('TNXGBlog_UserId', unique(36).toUpperCase());
    }
    const replacehtml = await fetch('/sw-req/api?getip');
    ipinfo = await replacehtml.json();
    const con = await fetch('https://api-blog.tnxg.top/callback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: localStorage.getItem('TNXGBlog_UserId'),
            url: encodeURIComponent(window.location.href),
            ip: ipinfo.ip
        })
    });
    json = await con.json();
    document.getElementById("tnxg_addr").innerHTML = json.local;
    date = new Date(json.repo_latest_date);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate().toString().padStart(2, '0') + '&nbsp';
    h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes() + 1);
    document.getElementById("tnxg_ghrepo_latest-date").innerHTML = Y + M + D + h + m;
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
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}
