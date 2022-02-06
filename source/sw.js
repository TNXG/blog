const CACHE_NAME = 'TNXG_Blog_SW';
let cachelist = [];
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
self.addEventListener('fetch', async event => {
    try {
        event.respondWith(handle(event.request))
    } catch (msg) {
        event.respondWith(handleerr(event.request, msg))
    }
});
const handleerr = async (req, msg) => {
    return new Response(`<h1>CDN分流器遇到了致命错误</h1>
    <b>${msg}</b>`, { headers: { "content-type": "text/html; charset=utf-8" } })
}
let cdn = {
    "gh": {
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/gh"
        },
        jsdelivr_fastly: {
            "url": "https://fastly.jsdelivr.net/gh"
        },
        jsdelivr_gcore: {
            "url": "https://gcore.jsdelivr.net/gh"
        },
        pigax_jsd: {
            "url": "https://u.pigax.cn/gh"
        },
        pigax_chenyfan_jsd: {
            "url": "https://cdn-jsd.pigax.cn/gh"
        },
        tianli: {
            "url": "https://cdn1.tianli0.top/gh"
        }
    },
    "combine": {
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/combine"
        },
        jsdelivr_fastly: {
            "url": "https://fastly.jsdelivr.net/combine"
        },
        jsdelivr_gcore: {
            "url": "https://gcore.jsdelivr.net/combine"
        },
        pigax_jsd: {
            "url": "https://u.pigax.cn/combine"
        },
        pigax_chenyfan_jsd: {
            "url": "https://cdn-jsd.pigax.cn/combine"
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
        pigax_jsd: {
            "url": "https://u.pigax.cn/npm"
        },
        pigax_unpkg: {
            "url": "https://unpkg.pigax.cn/"
        },
        pigax_chenyfan_jsd: {
            "url": "https://cdn-jsd.pigax.cn/npm"
        },
        tianli: {
            "url": "https://cdn1.tianli0.top/npm"
        }

    }
}
const handle = async function (req) {
    const urlStr = req.url
    const domain = (urlStr.split('/'))[2]
    let urls = []
    for (let i in cdn) {
        for (let j in cdn[i]) {
            if (domain == cdn[i][j].url.split('https://')[1].split('/')[0] && urlStr.match(cdn[i][j].url)) {
                urls = []
                for (let k in cdn[i]) {
                    urls.push(urlStr.replace(cdn[i][j].url, cdn[i][k].url))
                }
                if (urlStr.indexOf('@latest/') > -1) {
                    return lfetch(urls, urlStr)
                } else {
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
    }
    return fetch(req)
}
const lfetch = async (urls, url) => {
    let controller = new AbortController();
    const PauseProgress = async (res) => {
        return new Response(await (res).arrayBuffer(), { status: res.status, headers: res.headers });
    };
    if (!Promise.any) {
        Promise.any = function (promises) {
            return new Promise((resolve, reject) => {
                promises = Array.isArray(promises) ? promises : []
                let len = promises.length
                let errs = []
                if (len === 0) return reject(new AggregateError('All promises were rejected'))
                promises.forEach((promise) => {
                    promise.then(value => {
                        resolve(value)
                    }, err => {
                        len--
                        errs.push(err)
                        if (len === 0) {
                            reject(new AggregateError(errs))
                        }
                    })
                })
            })
        }
    }
    return Promise.any(urls.map(urls => {
        return new Promise((resolve, reject) => {
            fetch(urls, {
                signal: controller.signal
            })
                .then(PauseProgress)
                .then(res => {
                    if (res.status == 200) {
                        controller.abort();
                        resolve(res)
                    } else {
                        reject(res)
                    }
                })
        })
    }))
}

const blog = {
    local: 0,
    origin: [
        "tnxg.loyunet.cn",
        "tnxg-github-io.vercel.app"
    ],
    plus: [
        "tnxg.github.io"
    ]
};
const handle = async function (req) {
    const urlStr = req.url
    let urlObj = new URL(urlStr)
    const uuid = await db.read('uuid')
    //console.log(uuid)
    const pathname = urlObj.href.substr(urlObj.origin.length)
    const port = urlObj.port
    const domain = (urlStr.split('/'))[2]
    const path = pathname.split('?')[0]
    const query = q => urlObj.searchParams.get(q)
    let urls = []
    for (let i in cdn) {
        for (let j in cdn[i]) {
            //console.log(domain, cdn[i][j].url.split('https://')[1].split('/')[0])
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


self.addEventListener("message", async event => {
    const data = event.data;
    if (!!data) {
        switch (data.type) {
            case 'INIT':
                self.ClientPort = event.ports[0];
                break;
            default:
                const event_data = event.data.id
                ws_sw({
                    type: "send",
                    data: JSON.stringify({
                        type: 'info',
                        data: event.data.data,
                        uuid: await db.read('uuid')
                    })
                });
                wsc.addEventListener('message', (event) => {
                    const data = JSON.parse(event.data)
                    self.ClientPort.postMessage({
                        id: event_data,
                        data: {
                            ip: data.data.ip,
                            addr: data.data.addr,
                            user: data.data.user,
                            delay: new Date().getTime() - data.data.time,
                        }
                    })

                })
                break;
        }
    }
})