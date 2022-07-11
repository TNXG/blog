
function cgi_start() {
    userid = window.localStorage.getItem('TNXGBlog_UserId');
    var req = new XMLHttpRequest();
    req.open('GET', 'https://tnxg.loyunet.cn/cdn-cgi/trace', false);
    req.send(null);
    text = req.response;
    if (req.status == '200') {
        document.getElementById("tnxg_cgi_CDNState").innerHTML = 'CloudFlare CDN正常运行<br>节点信息:' + loc2name(text.split("colo=")[1].split("\n")[0]) + '<br>节点ip:' + text.split("ip=")[1].split("\n")[0];
    } else {
        document.getElementById("tnxg_cgi_CDNState").innerHTML = 'CloudFlare CDN未启用';
    };
    ipinfo = getipinfo(userid);
    var info = new Browser();
    document.getElementById("tnxg_cgi_userip").innerHTML = '用户ip:' + ipinfo.ip;
    document.getElementById("tnxg_cgi_userloc").innerHTML = '用户地址:' + ipinfo.local;
    document.getElementById("tnxg_cgi_userid").innerHTML = '用户id:' + userid;
    document.getElementById("tnxg_cgi_userua").innerHTML = '用户浏览器信息:浏览器:' + info.browser + ';版本:' + info.version + ';引擎:' + info.engine;
    document.getElementById("tnxg_cgi_system").innerHTML = '用户系统信息:系统:' + info.os + ';设备:' + info.device + ';语言:' + info.language;

    //这个地方同步请求会卡网页，于是采用fetch异步请求
    fetch('https://npm.elemecdn.com/tnxg-blog@latest/index.html').then(function (response) {
        if (response.status == '200' || response.status == '304') {
            document.getElementById("tnxg_cgi_cdnstatus_eleme").innerHTML = 'ElemeCDN:返回正常';
        } else {
            document.getElementById("tnxg_cgi_cdnstatus_eleme").innerHTML = 'ElemeCDN:返回异常';
        }
    });


    fetch('https://cdn.jsdelivr.net/npm/tnxg-blog@latest/index.html').then(function (response) {
        if (response.status == '200' || response.status == '304') {
            document.getElementById("tnxg_cgi_cdnstatus_jc").innerHTML = 'Jsdelivr_cdn:返回正常';
        } else {
            document.getElementById("tnxg_cgi_cdnstatus_jc").innerHTML = 'Jsdelivr_cdn:返回异常';
        }
    });

    fetch('https://fastly.jsdelivr.net/npm/tnxg-blog@latest/index.html').then(function (response) {
        if (response.status == '200' || response.status == '304') {
            document.getElementById("tnxg_cgi_cdnstatus_jf").innerHTML = 'Jsdelivr_Fastly:返回正常';
        } else {
            document.getElementById("tnxg_cgi_cdnstatus_jf").innerHTML = 'Jsdelivr_Fastly:返回异常';
        }
    })

    fetch('https://gcore.jsdelivr.net/npm/tnxg-blog@latest/index.html').then(function (response) {
        if (response.status == '200' || response.status == '304') {
            document.getElementById("tnxg_cgi_cdnstatus_jg").innerHTML = 'Jsdelivr_Gcore:返回正常';
        } else {
            document.getElementById("tnxg_cgi_cdnstatus_jg").innerHTML = 'Jsdelivr_Gcore:返回异常';
        }
    })

    fetch('https://s-cd-1806-tnxg-oss-jsd.oss.dogecdn.com/npm/tnxg-blog@latest/index.html').then(function (response) {
        if (response.status == '200' || response.status == '304') {
            document.getElementById("tnxg_cgi_cdnstatus_doge").innerHTML = 'DogeCloud_OSS:返回正常';
        } else {
            document.getElementById("tnxg_cgi_cdnstatus_doge").innerHTML = 'DogeCloud_OSS:返回异常';
        }
    })

    fetch('https://cdn1.tianli0.top/npm/tnxg-blog@latest/index.html')
        .then(function (response) {
            if (response.status == '200' || response.status == '304') {
                document.getElementById("tnxg_cgi_cdnstatus_tianli").innerHTML = 'tianli:返回正常';
            } else {
                document.getElementById("tnxg_cgi_cdnstatus_tianli").innerHTML = 'tianli:返回异常';
            }
        })

    fetch('https://prts.top/')
        .then(function (response) {
            if (response.status == '200' || response.status == '304') {
                document.getElementById("tnxg_cgi_apistatus_prts").innerHTML = 'ArknightsProxyInazuma:返回正常';
            } else {
                document.getElementById("tnxg_cgi_cdnstatus_prts").innerHTML = 'ArknightsProxyInazuma:返回异常';
            }
        })

    fetch('https://qexo.prts.top/')
        .then(function (response) {
            if (response.status == '200' || response.status == '304') {
                document.getElementById("tnxg_cgi_apistatus_qexo").innerHTML = 'Qexo:返回正常';
            } else {
                document.getElementById("tnxg_cgi_apistatus_qexo").innerHTML = 'Qexo:返回异常';
            }
        })

    fetch('https://assets.prts.top/')
        .then(function (response) {
            if (response.status == '200' || response.status == '304') {
                document.getElementById("tnxg_cgi_apistatus_assets").innerHTML = 'AssetsService:返回正常';
            } else {
                document.getElementById("tnxg_cgi_apistatus_assets").innerHTML = 'AssetsService:返回异常';
            }
        })
    fetch('https://api.twikoo.prts.top/')
        .then(function (response) {
            if (response.status == '200' || response.status == '304') {
                document.getElementById("tnxg_cgi_apistatus_twikoo").innerHTML = 'Twikoo:返回正常';
            } else {
                document.getElementById("tnxg_cgi_apistatus_twikoo").innerHTML = 'Twikoo:返回异常';
            }
        })
    fetch('https://api.friendcircle.prts.top/')
        .then(function (response) {
            if (response.status == '200' || response.status == '304') {
                document.getElementById("tnxg_cgi_apistatus_fc").innerHTML = 'FriendCircle:返回正常';
            } else {
                document.getElementById("tnxg_cgi_apistatus_fc").innerHTML = 'FriendCircle:返回异常';
            }
        })
}
function loc2name(loc) {
    var nodes = [['TNR', '塔那那利佛节点'], ['CPT', '开普敦节点'], ['CMN', '卡萨布兰卡节点'], ['DKR', '达喀尔节点'], ['DAR', '达累斯萨拉姆节点'], ['JIB', '吉布提市节点'], ['DUR', '德班节点'], ['JNB', '约翰尼斯堡节点'], ['KGL', '基加利节点'], ['LOS', '拉各斯节点'], ['LAD', '罗安达节点'], ['MPM', '马普托节点'], ['MBA', '蒙巴萨岛节点'], ['ROB', '利比里亚节点'], ['NBO', '内罗比节点'], ['MRU', '路易港节点'], ['RUN', '法属留尼汪岛节点'], ['BLR', '班加罗尔节点'], ['BKK', '曼谷节点'], ['BWN', '斯里巴加湾节点'], ['CEB', '宿务岛节点'], ['CTU', '中国成都节点'], ['MAA', '金奈节点'], ['CGP', '吉大港节点'], ['CKG', '中国重庆节点'], ['CMB', '科伦坡节点'], ['DAC', '达卡节点'], ['SZX', '中国东莞节点'], ['FUO', '中国佛山节点'], ['FOC', '中国福州节点'], ['CAN', '中国广州节点'], ['HGH', '中国杭州节点'], ['HAN', '河内节点'], ['HNY', '中国衡阳节点'], ['SGN', '胡志明市节点'], ['HKG', '中国香港节点'], ['HYD', '海得拉巴节点'], ['ISB', '伊斯兰堡节点'], ['CGK', '雅加达节点'], ['TNA', '中国济南节点'], ['JHB', '新山市节点'], ['KHI', '卡拉奇节点'], ['KTM', '加德满都节点'], ['CCU', '加尔各答节点'], ['KUL', '吉隆坡节点'], ['LHE', '拉合尔节点'], ['NAY', '中国廊坊节点'], ['LYA', '中国洛阳节点'], ['MFM', '中国澳门节点'], ['MLE', '马累节点'], ['MNL', '马尼拉节点'], ['BOM', '孟买节点'], ['NAG', '那格浦尔节点'], ['NNG', '中国南宁节点'], ['DEL', '新德里节点'], ['NBG', '中国宁波节点'], ['KIX', '大阪节点'], ['PNH', '金边节点'], ['TAO', '中国青岛节点'], ['ICN', '首尔节点'], ['SHA', '中国上海节点'], ['SHE', '中国沈阳节点'], ['SJW', '中国石家庄节点'], ['SIN', '新加坡节点'], ['SZV', '中国苏州节点'], ['TPE', '中国台北节点'], ['PBH', '廷布节点'], ['TSN', '中国天津节点'], ['NRT', '东京节点'], ['ULN', '乌兰巴托节点'], ['VTE', '万象节点'], ['WUH', '中国武汉节点'], ['WUX', '中国无锡节点'], ['XIY', '中国西安节点'], ['RGN', '仰光节点'], ['EVN', '耶烈万节点'], ['CGO', '中国郑州节点'], ['CSX', '中国长沙节点'], ['AMS', '阿姆斯特丹节点'], ['ATH', '雅典节点'], ['BCN', '巴塞罗纳节点'], ['BEG', '贝尔格莱德节点'], ['TXL', '柏林节点'], ['BRU', '布鲁塞尔节点'], ['OTP', '布加勒斯特节点'], ['BUD', '布达佩斯节点'], ['KIV', '基希讷乌节点'], ['CPH', '哥本哈根节点'], ['ORK', '科克郡节点'], ['DUB', '都柏林节点'], ['DUS', '杜塞尔多夫节点'], ['EDI', '爱丁堡节点'], ['FRA', '法兰克福节点'], ['GVA', '日内瓦节点'], ['GOT', '哥德堡节点'], ['HAM', '汉堡节点'], ['HEL', '赫尔辛基节点'], ['IST', '伊斯坦布尔节点'], ['KBP', '基辅节点'], ['LIS', '里斯本节点'], ['LHR', '伦敦节点'], ['LUX', '卢森堡节点'], ['MAD', '马德里节点'], ['MAN', '曼彻斯特节点'], ['MRS', '马赛节点'], ['MXP', '米兰节点'], ['DME', '莫斯科节点'], ['MUC', '慕尼黑节点'], ['LCA', '尼科西亚节点'], ['OSL', '奥斯陆节点'], ['CDG', '巴黎节点'], ['PRG', '布拉格节点'], ['KEF', '雷克雅未克节点'], ['RIX', '里加节点'], ['FCO', '罗马节点'], ['LED', '圣彼德堡节点'], ['SOF', '索非亚节点'], ['ARN', '斯德哥尔摩节点'], ['TLL', '塔林节点'], ['TBS', '第比利斯节点'], ['SKG', '塞萨洛尼基节点'], ['VIE', '维也纳节点'], ['VNO', '维尔纽斯节点'], ['WAW', '华沙节点'], ['ZAG', '萨格勒布节点'], ['ZRH', '苏黎世节点'], ['ARI', '阿里卡节点'], ['ASU', '亚松森节点'], ['BOG', '波哥大节点'], ['EZE', '布宜诺斯艾利斯节点'], ['CWB', '库里蒂巴节点'], ['FOR', '福塔雷萨节点'], ['GUA', '危地马拉节点'], ['LIM', '利马节点'], ['MDE', '麦德林节点'], ['PTY', '巴拿马城节点'], ['PBM', '帕拉马里博节点'], ['POA', '愉港节点'], ['UIO', '基多节点'], ['GIG', '里约热内卢节点'], ['SSA', '萨尔瓦多节点'], ['SJO', '圣何塞节点'], ['SCL', '圣地亚哥节点'], ['GRU', '圣保罗节点'], ['GND', '圣乔治节点'], ['TGU', '特古西加尔巴节点'], ['CUR', '威廉斯塔德节点'], ['AMM', '安曼节点'], ['BGW', '巴格达节点'], ['GYD', '巴库节点'], ['BEY', '贝鲁特节点'], ['DOH', '多哈节点'], ['DXB', '迪拜节点'], ['KWI', '科威特城节点'], ['BAH', '麦纳麦节点'], ['MCT', '马斯喀特节点'], ['ZDM', '拉马拉节点'], ['RUH', '利雅得节点'], ['TLV', '特拉维夫市节点'], ['IAD', 'Ashburn节点'], ['ATL', '亚特兰大节点'], ['BOS', '波士顿节点'], ['BUF', '水牛城节点'], ['YYC', '卡尔加里节点'], ['CLT', '卡尔加里节点'], ['ORD', '芝加哥节点'], ['CMH', '哥伦布市节点'], ['DFW', '达拉斯节点'], ['DEN', '丹佛节点'], ['DTW', '底特律节点'], ['HNL', '檀香山市节点'], ['IAH', '休斯顿节点'], ['IND', '印第安纳波利斯节点'], ['JAX', '杰克逊维尔节点'], ['MCI', '堪萨斯节点'], ['LAS', '拉斯维加斯节点'], ['LAX', '洛杉矶节点'], ['MFE', '麦卡伦节点'], ['MEM', '孟菲斯市节点'], ['MEX', '墨西哥城节点'], ['MIA', '迈阿密节点'], ['MSP', '明尼阿波里斯市节点'], ['MGM', '蒙哥马利市节点'], ['YUL', '蒙特利尔节点'], ['BNA', '那什维尔节点'], ['EWR', '纽瓦克市节点'], ['ORF', '诺福克节点'], ['OMA', '奥马哈市节点'], ['PHL', '费城节点'], ['PHX', '凤凰城节点'], ['PIT', '匹兹堡节点'], ['PAP', '太子港节点'], ['PDX', '波特兰节点'], ['QRO', '克雷塔罗市节点'], ['RIC', '里士满节点'], ['SMF', '萨克拉门托节点'], ['SLC', '盐湖城节点'], ['SAN', '圣地亚哥节点'], ['SJC', '圣何塞节点'], ['YXE', '萨斯卡通节点'], ['SEA', '西雅图节点'], ['STL', '圣路易斯节点'], ['TPA', '坦帕节点'], ['YYZ', '多伦多节点'], ['YVR', '温哥华节点'], ['TLH', '塔拉哈西节点'], ['YWG', '温尼伯节点'], ['ADL', '阿德莱德节点'], ['AKL', '奥克兰节点'], ['BNE', '布里斯班节点'], ['MEL', '墨尔本节点'], ['NOU', '努美阿节点'], ['PER', '佩斯节点'], ['SYD', '悉尼节点'],];
    for (i = 0; i < nodes.length; i++) {
        if (loc == nodes[i][0]) {
            return ("[" + loc + "]" + nodes[i][1]);
            break;
        }
    }
}

function getipinfo(userid) {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://prts.top/api/data/blog.php?id=' + userid, false);
    req.send(null);
    return JSON.parse(req.response);
}