const CACHE_NAME = 'TNXGSW';
let cachelist = [
    '/offline.html',
    'https://i0.hdslb.com/bfs/album/7ac2a3d7490a925e70b7ff9b1ef1676df8bde111.png'
];
self.db = {
    read: (key, config) => {
        if (!config) { config = { type: "text" } }
        return new Promise((resolve, reject) => {
            caches.match(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`)).then(function (res) {
                res.text().then(text => resolve(text))
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
const handleerr = async (req, msg) => {
    return new Response(`<h1>ChenBlogHelper Error</h1>
    <b>${msg}</b>`, { headers: { "content-type": "text/html; charset=utf-8" } })
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

const cache_url_list = [
    /(http:\/\/|https:\/\/)i0\.hdslb\.com/g,
    /(http:\/\/|https:\/\/)i1\.hdslb\.com/g,
    /(http:\/\/|https:\/\/)i2\.hdslb\.com/g,
    /(http:\/\/|https:\/\/)s1\.hdslb\.com/g
]

const handle = async function (req) {
    const urlStr = req.url
    let urlObj = new URL(urlStr)
    const uuid = await db.read('uuid')
    console.log(uuid)
    const pathname = urlObj.href.substr(urlObj.origin.length)
    const port = urlObj.port
    //setItem('origin',pathname)
    const domain = (urlStr.split('/'))[2]
    const path = pathname.split('?')[0]
    const query = q => urlObj.searchParams.get(q)
    let urls = []
    for (let i in cdn) {
        for (let j in cdn[i]) {
            console.log(domain, cdn[i][j].url.split('https://')[1].split('/')[0])
            if (domain == cdn[i][j].url.split('https://')[1].split('/')[0] && urlStr.match(cdn[i][j].url)) {
                urls = []
                for (let k in cdn[i]) {
                    urls.push(urlStr.replace(cdn[i][j].url, cdn[i][k].url))
                }


                return caches.match(req).then(function (resp) {
                    return resp || lfetch(urls, urlStr).then(function (res) {
                        return caches.open(CACHE_NAME).then(function (cache) {
                            cache.put(req, res.clone());
                            return res;
                        });
                    });
                })


            }
        }
    }
    for (var i in blog.origin) {
        if (domain.split(":")[0] == blog.origin[i].split(":")[0]) {
            if (blog.local) { return fetch(req) }

            urls = []
            for (let k in blog.plus) {
                urls.push(urlStr.replace(domain, blog.plus[k]).replace(domain + ":" + port, blog.plus[k]).replace('http://', "https://"))
            }

            return lfetch(urls, urlStr).then(function (res) {
                if (!res) { throw 'error' }
                return caches.open(CACHE_NAME).then(function (cache) {
                    cache.delete(req);
                    cache.put(req, res.clone());
                    return res;
                });
            }).catch(function (err) {
                return caches.match(req).then(function (resp) {
                    return resp || caches.match(new Request('/offline.html'))
                }
                )
            })
        }
    }
 
    for (var i in cache_url_list) {
        console.log(urlStr.match(cache_url_list[i]))
        if (urlStr.match(cache_url_list[i])) {
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

const lfetch = async (urls, url) => {
    console.log(urls)
    const uuid = await db.read('uuid')
    try {
        let controller = new AbortController();
        const PauseProgress = async (res) => {
            return new Response(await (res).arrayBuffer(), { status: res.status, headers: res.headers });
        };
        let results = Promise.any(urls.map(urls => {
            return new Promise((resolve, reject) => {
                fetch(urls, {
                    signal: controller.signal
                })
                    .then(PauseProgress)
                    .then(res => {
                        const resn = res.clone()
                        if (resn.status == 200) {
                            setTimeout(() => {
                                ws_sw({
                                    type: "send",
                                    data: JSON.stringify({
                                        type: 'fetch',
                                        url: urls,
                                        origin_url: url,
                                        promise_any: true,
                                        uuid: uuid,
                                        request_uuid: generate_uuid()
                                    })
                                })
                            }, 0);
                            controller.abort();
                            resolve(resn)
                        } else {
                            reject(null)
                        }
                    }).catch(() => {
                        reject(null)
                    })
            }
            )
        }
        )).then(res => { return res }).catch(() => { return null })

        return results
    }
    catch (err) {
        ws_sw({
            type: "send",
            data: JSON.stringify({
                type: 'fetch',
                url: urls[0],
                promise_any: false,
                err: err,
                request_uuid: generate_uuid(),
                uuid: uuid
            })
        })
        return fetch(urls[0])
    }
}

const test_func = async () => {
    for (let i in cdn) {
        for (let j in cdn[i]) {
            let t1 = new Date().getTime()
            const n = await fetch(cdn[i][j].url + testurl[i] + '?' + Math.random())
            let t2 = new Date().getTime()
            if (n.status === 200) {
                cdn[i][j].time = t2 - t1
                console.log(`TEST:${cdn[i][j].url + testurl[i]} WITH ${t2 - t1}ms`)
            } else {
                cdn[i][j].time = 20000
                console.log(`TEST:${cdn[i][j].url + testurl[i]} WITH Erorr ${t2 - t1}ms`)
            }
        }
    }
    console.log(cdn)
}
//(async () => { await test_func() })();
//setInterval(async () => { test_func() }, 10000);