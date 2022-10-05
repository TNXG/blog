function loadjson($el, $url) {
    new Vue({
        el: $el,
        data: {
            girls: [],
        },
        async mounted() {
            this.girls = await fetch($url)
                .then(res => {
                    return res.json();
                })
            if (true) {
                this.girls.sort(() => Math.random() - 0.5);
            }
        }
    })
}