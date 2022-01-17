//SW安装初始化
const CACHE_NAME = 'TNXGderBlog';//可以为Cache版本号，但这样可能会导致缓存冗余累积
let cachelist = [];
self.db = {
    read: (key) => {
        return new Promise((resolve, reject) => {
            caches.match(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`)).then(function (res) {
                res.text().then(text => resolve(text))
            }).catch(() => {
                resolve(null)
            })
        })
    },
    read_arrayBuffer: (key) => {
        return new Promise((resolve, reject) => {
            caches.match(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`)).then(function (res) {
                res.arrayBuffer().then(aB => resolve(aB))
            }).catch(() => {
                resolve(null)
            })
        })
    },
    write: (key, value) => {
        return new Promise((resolve, reject) => {
            caches.open(CACHE_NAME).then(function (cache) {
                cache.put(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`), new Response(value));
                resolve()
            }).catch(() => {
                reject()
            })
        })
    }
}

//预缓存网址
let cachelist = [
    '/404.html',
    '/index.html',
    '/offline.html'
];

//监听sw安装时开启此缓存空间
self.addEventListener('install', async function (installEvent) {
    self.skipWaiting();
    installEvent.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(cachelist);
            })
    );
});

//捕获请求:添加监听器
self.addEventListener('fetch', async event => {
    event.respondWith(handle(event.request))
});

const handle = async(req)=>{
    return fetch(req)
}

//捕获请求:篡改请求
/* const handle = async (req) => {
    if ((req.url.split('/'))[2].match('xxx.com')) {
        //xxx.com为图片所在域名
        return fetch(req.url, {
            method: "POST"
        })
    }
    return fetch(req)
} */
//可以由Get转换为Post

//捕获请求:篡改响应
 /* const handle = async (req) => {
    const res = await fetch(req)
    const resp = res.clone()
    if (!!resp.headers.get('content-type')) {
        if (resp.headers.get('content-type').includes('text/html')) {
            return new Response((await resp.text()).replace(/TEST/g, 'SHIT'), {
                headers: resp.headers,
                status: resp.status
            })
        }
    }
    return resp
} */
//这个例子会检测返回内容，若为html，将把所有的”TEST”都替换成”SHIT”

//捕获请求:移花接木
const handle = async (req) => {
    const domain = req.url.split('/')[2];
    if (domain.match("unpkg.com")) {
        return fetch(req.url.replace("https://unpkg.com", "https://zhimg.unpkg.com"));
    }
    else {
        return fetch(req)
    }
}

//捕获请求:并行请求
const lfetch = (urllist) => {
    return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const PauseProgress = async (res) => {
            return new Response(await (res).arrayBuffer(), { status: res.status, headers: res.headers });
        };
        Promise.any(urllist.map(url => {
            fetch(url, {
                signal: controller.signal
            })
                .then(PauseProgress)
                .then(res => {
                    if (res.status == 200) {
                        controller.abort();
                        resolve(res)
                    } else {
                        reject()
                    }
                }).catch(err => {
                    reject()
                })
        }))
    })
}
const handle = async (req) => {
    const hdslb_mirror = [
        'https://s1.hdslb.com/',
        'https://i0.hdslb.com/',
        'https://i1.hdslb.com/',
        'https://i2.hdslb.com/'
    ]
    for (var k in hdslb_mirror) {
        if (req.url.match(hdslb_mirror[k]) && req.url.replace('https://', '').split('/')[0] == hdslb_mirror[k].replace('https://', '').split('/')[0]) {
            return lfetch((() => {
                let l = []
                for (let i = 0; i < hdslb_mirror.length; i++) {
                    l.push(hdslb_mirror[i] + req.url.split('/')[3])
                }
                return l
            })())
        }
    }
    return fetch(req)
}
let cdn = {
    "gh": {
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/gh"
        },
        pigax: {
            "url": "https://u.pigax.cn/gh"
        },
        tianli: {
            "url": "https://cdn1.tianli0.top/gh"
        }
    },
    "combine": {
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/combine"
        },
        pigax: {
            "url": "https://u.pigax.cn/combine"
        },
        tianli: {
            "url": "https://cdn1.tianli0.top/combine"
        }
    },
    "npm": {
        eleme: {
            "url": "https://npm.elemecdn.com"
        },
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/npm"

        },
        zhimg: {
            "url": "https://unpkg.zhimg.com"
        },
        unpkg: {
            "url": "https://unpkg.com"
        },
        bdstatic: {
            "url": "https://code.bdstatic.com/npm"
        },
        pigax: {
            "url": "https://u.pigax.cn/npm"
        }

    }
}

//缓存控制:持久化缓存
const handle = async (req) => {
    const cache_url_list = [
        /(http:\/\/|https:\/\/)cdn\.jsdelivr\.net/g,
        /(http:\/\/|https:\/\/)s1\.hdslb\.com/g,
        /(http:\/\/|https:\/\/)i0\.hdslb\.com/g,
        /(http:\/\/|https:\/\/)i1\.hdslb\.com/g,
        /(http:\/\/|https:\/\/)i2\.hdslb\.com/g
    ]
    for (var i in cache_url_list) {
        if (req.url.match(cache_url_list[i])) {
            return caches.match(req).then(function (resp) {
                return resp || fetch(req).then(function (res) {
                    return caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(req, res.clone());
                        return res;
                    });
                });
            })
        }
    }
    return fetch(req)
}

//缓存控制:离线化缓存
const handle = async (req) => {
    return fetch(req.url).then(function (res) {
        if (!res) { throw 'error' } //1
        return caches.open(CACHE_NAME).then(function (cache) {
            cache.delete(req);
            cache.put(req, res.clone());
            return res;
        });
    }).catch(function (err) {
        return caches.match(req).then(function (resp) {
            return resp || caches.match(new Request('/offline.html')) //2
        })
    })
}
