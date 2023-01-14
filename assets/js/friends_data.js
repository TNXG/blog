var api = 'https://action.prts.top/data/friends/data.json';


// 在页面加载后被激活
window.onload = function () {
    document.getElementById("qexot").innerHTML = '<div class="qexo_loading"><div class="qexo_part"><div style="display: flex; justify-content: center"><div class="qexo_loader"><div class="qexo_inner one"></div><div class="qexo_inner two"></div><div class="qexo_inner three"></div></div></div></div><p style="text-align: center; display: block">QexoTalks正在加载...</p></div>';
    tnxg_friends();
}


// 通过fetch获取数据
function tnxg_friends() {
    fetch(api).then(function (response) {
        return response.json();
    }).then(function (json) {
        document.getElementById("qexot").innerHTML = '';
        // 遍历json数据
        var allhtml = '';
        for (var i = 0; i < json.length; i++) {
            // 获取json数据中的每一项
            var item = json[i];
            // 检测item.description字数不得超过200
            if (item.description.length > 200) {
                item.description = item.description.substring(0, 200) + '[...]';
                // 删除item.description中的html标签
                item.description = item.description.replace(/<[^>]+>/g, "");
            }
            html = "<div class=\"qexot-item\">\n <p class=\"qexot-floor\">" + (i + 1) + "</p> <div class=\"qexot-top\">\n      <p class=\"qexot-tags\">" + item.author + "</p>\n  </div>\n  <div class=\"qexot-content\">\n<a class=\"tnxg_wochao\" href=\"" + item.link + "\"><div class=\"datacont\">\n    " + item.description + "\n    </div>\n</a></div>\n  <div class=\"qexot-bottom\">\n    <div class=\"qexot-info\">\n      <time class=\"qexot-datatime\" datetime=\"" + item.pubDate + "\"><i class=\"ri-calendar-todo-fill ri-lg\"></i>发表于：" + item.pubDate + "</time>\n    </div>" + item.title + "</div></div></a>"
            // 输出html到dom
            allhtml += html;
        }
        document.getElementById("qexot").innerHTML = `<section class="qexot"><div class="qexot-list">${allhtml}</section></div>`;
    });
}