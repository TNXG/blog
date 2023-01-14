hexo.extend.tag.register('dogevideos', function (dogevideosdata) {
    data = `
    <div id="player_${dogevideosdata}"></div>
    <script type="text/javascript" src="https://player.dogecloud.com/js/loader"></script>
    <script type="text/javascript">
    var player = new DogePlayer({
        container: document.getElementById('player_${dogevideosdata}'),
        userId: 1806,
        vcode: '${dogevideosdata}',
        autoPlay: true
    });
    </script>
    `
    return data;
});
