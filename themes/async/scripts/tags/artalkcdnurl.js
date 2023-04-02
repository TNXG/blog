hexo.extend.tag.register('artalkcdnurl', function (artalkcdnurldata) {
    const { config: themeCfg } = hexo.theme;
    if (themeCfg.assets.plugin.artalk) {
        return themeCfg.assets.plugin.artalk;
    } else {
        return 'https://unpkg.com/artalk@latest/dist/'
    }
});
