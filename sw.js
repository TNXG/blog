// 添加监听器 / AddEventListener
self.addEventListener('fetch', async event => {
    event.respondWith(handle(event.request))
});
const handle = async (req) => {
    const urlStr = req.url
    const urlObj = new URL(urlStr);
    const urlPath = urlObj.pathname;
    const domain = urlObj.hostname;

    // 对数组内所有地址进行请求，返回第一个成功的请求结果并打断其他请求
    const 并发请求 = async (urls, url) => {
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
                            controller.abort()
                            resolve(res)
                        } else {
                            reject(res)
                        }
                    })
            })
        }))
    }

    // 天翔TNXG云存储处理函数
    if (req.url.includes('assets.tnxg.whitenuo.cn')) {
        console.log('[TNXG_SW]检测到网络请求：' + req.url);
        // 天翔TNXG云存储图片WebP处理
        if (req.headers.get('accept').includes('webp')) {
            if (req.url.includes('.jpg') || req.url.includes('.png') || req.url.includes('.gif') || req.url.includes('.jpeg')) {
                let webpReq = new Request(req.url + '?fmt=webp', req);
                console.log('[TNXG_SW]检测到TNXG桶的图片请求，转换WebP：' + req.url + '?fmt=webp');
                return fetch(webpReq);
            }
        }
    }

    // 主站分流函数
    if (domain == 'blog.tnxg.top' || domain == 'localhost') {
        const 获取完整地址 = (path) => {
            path = path.split('?')[0].split('#')[0];
            if (path.match(/\/$/)) {
                path += 'index'
            };
            if (!path.match(/\.[a-zA-Z]+$/)) {
                path += '.html'
            };
            return path;
        };
        const 获取分流地址 = (path) => {
            const 站点镜像源 = [
                `https://blog.tnxg.top`,
                `https://vercel.blog.tnxg.top`,
                `https://gcore.blog.tnxg.top`,
            ]
            for (var i in 站点镜像源) {
                站点镜像源[i] += path;
            }
            return 站点镜像源;
        }

        return 分流地址 = 并发请求(获取分流地址(获取完整地址(urlPath)))
            .then(res => res.arrayBuffer())
            .then(buffer =>
                new Response(buffer, {
                    headers: { "Content-Type": "text/html;charset=utf-8" }
                })
            );
    }
    // 其余请求直接返回
    return fetch(req)
}

importScripts('https://assets.tnxg.whitenuo.cn/proxy/npm/workbox-cdn@5.1.3/workbox/workbox-sw.js');

workbox.setConfig({
    modulePathPrefix: 'https://assets.tnxg.whitenuo.cn/proxy/npm/workbox-cdn@5.1.3/workbox/'
});

//关闭日志
self.__WB_DISABLE_DEV_LOGS = true;

const { core, precaching, routing, strategies, expiration } = workbox;
const { CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate } = strategies;
const { ExpirationPlugin } = expiration;

const cacheSuffixVersion = '_20200610';

core.setCacheNameDetails({
    prefix: 'bycg',
    suffix: cacheSuffixVersion
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                if (!key.includes(cacheSuffixVersion)) return caches.delete(key);
            }));
        })
    );
});


core.skipWaiting();
core.clientsClaim();

/**
 * 缓存第三方引用
 */
routing.registerRoute(
    /.*(cdn.jsdelivr.net|at.alicdn.com)/,
    new CacheFirst({
        cacheName: 'static-cdn' + cacheSuffixVersion,
        fetchOptions: {
            mode: 'cors',
            credentials: 'omit'
        },
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 30 * 24 * 60 * 60,
                purgeOnQuotaError: true
            })
        ]
    })
);

//不作缓存
routing.registerRoute(
    /\/sw.js/,
    new NetworkOnly()
);


//缓存图片
routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif|webp)/,
    new CacheFirst({
        cacheName: 'static-image' + cacheSuffixVersion,
    })
);

//缓存js css
routing.registerRoute(
    /.*\.(css|js)$/,
    new CacheFirst({
        cacheName: 'static-js-css' + cacheSuffixVersion,
    })
);

//本站其他文件 
routing.registerRoute(
    ({ url }) => {
        return url.hostname === location.hostname
    },
    new NetworkFirst({
        cacheName: 'static-other' + cacheSuffixVersion,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                purgeOnQuotaError: true
            })
        ]
    })
);