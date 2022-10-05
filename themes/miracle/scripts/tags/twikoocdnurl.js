hexo.extend.tag.register('twikoocdnurl', function (twikoocdnurldata) {
    const { config: themeCfg } = hexo.theme;
        return themeCfg.static_prefix.twikoo;
});
