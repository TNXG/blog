const util = require('hexo-util');
const stripHTML = util.stripHTML;

const counter = function (content) {
    content = stripHTML(content);
    const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
    const en = (content.replace(/[\u4E00-\u9FA5]/g, '').match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || []).length;
    return [cn, en];
};

hexo.extend.helper.register('min2read', function (content, {cn = 300, en = 160} = {}) {
    const len = counter(content);
    const readingTime = len[0] / cn + len[1] / en;
    return readingTime < 1 ? '1' : parseInt(readingTime, 10);
});

hexo.extend.helper.register('wordcount', function (content) {
    const len = counter(content);
    const count = len[0] + len[1];
    return count;
});

hexo.extend.helper.register('totalcount', function (site) {
    let count = 0;
    site.posts.forEach(function (post) {
        const len = counter(post.content);
        count += len[0] + len[1];
    });
    return count;
});

hexo.extend.helper.register('siteread', function (site) {
    let count = 0;
    site.posts.forEach(function (post) {
        const len = counter(post.content);
        count += len[0] + len[1];
    });
    return Math.round(count / 150);
});
