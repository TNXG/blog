let conimagesurl = hexo.config.images.domain;
hexo.extend.tag.register('imagesurl', function (imagesurldata) {
    if (hexo.config.images.enable) {
        return '<img src=\"' + hexo.config.images.domain + imagesurldata[0] + '\" alt=\"Raiden_Aurora\" loading=\"lazy\">';
    }
});
