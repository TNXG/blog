hexo.extend.tag.register('twikoocdnurl', function (twikoocdnurldata) {
    const {config: themeCfg} = hexo.theme;
    if (themeCfg.static_prefix.twikoo) {
        return themeCfg.static_prefix.twikoo;
    } else {
        return 'https://unpkg.com/twikoo@latest/'
    }
});
