hexo.extend.tag.register('artalkcdnurl', function (artalkcdnurldata) {
    const {config: themeCfg} = hexo.theme;
    if (themeCfg.static_prefix.artalk) {
        return themeCfg.static_prefix.artalk;
    } else {
        return 'https://unpkg.com/artalk@latest/dist/'
    }
});
