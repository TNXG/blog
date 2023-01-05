function getElement(string, item = document.documentElement) {
    let tmp = item.querySelector(string);
    if (tmp === null) {
        throw new Error("Unknown HTML");
    }
    return tmp;
}

class dust {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.vx = Math.random() * 2 + 2;
        this.vy = Math.random() * 2;
        this.color = '#fff';
        this.shadowBlur = Math.random() * 3;
        this.shadowX = (Math.random() * 2) - 1;
        this.shadowY = (Math.random() * 2) - 1;
        this.radiusX = Math.random() * 3;
        this.radiusY = Math.random() * 3;
        this.rotation = Math.PI * Math.floor(Math.random() * 2);
    }
}

class canvasDust {
    constructor(canvasID) {
        this.width = 300;
        this.height = 300;
        this.dustQuantity = 50;
        this.dustArr = [];
        this.build = () => {
            this.resize();
            if (this.ctx) {
                const point = canvasDust.getPoint(this.dustQuantity);
                for (let i of point) {
                    const dustObj = new dust();
                    this.buildDust(i[0], i[1], dustObj);
                    this.dustArr.push(dustObj);
                }
                setInterval(this.play, 40);
            }
        };
        this.play = () => {
            var _a;
            const dustArr = this.dustArr;
            (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.width, this.height);
            for (let i of dustArr) {
                if (i.x < 0 || i.y < 0) {
                    const x = this.width;
                    const y = Math.floor(Math.random() * window.innerHeight);
                    i.x = x;
                    i.y = y;
                    this.buildDust(x, y, i);
                } else {
                    const x = i.x - i.vx;
                    const y = i.y - i.vy;
                    this.buildDust(x, y, i);
                }
            }
        };
        this.buildDust = (x, y, dust) => {
            const ctx = this.ctx;
            if (x)
                dust.x = x;
            if (y)
                dust.y = y;
            if (ctx) {
                ctx.beginPath();
                ctx.shadowBlur = dust.shadowBlur;
                ctx.shadowColor = dust.color;
                ctx.shadowOffsetX = dust.shadowX;
                ctx.shadowOffsetY = dust.shadowY;
                ctx.ellipse(dust.x, dust.y, dust.radiusX, dust.radiusY, dust.rotation, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = dust.color;
                ctx.fill();
            }
        };
        this.resize = () => {
            const canvas = this.canvas;
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.width = width;
            this.height = height;
            this.dustQuantity = Math.floor((width + height) / 38);
            if (canvas !== undefined) {
                canvas.width = width;
                canvas.height = height;
            }
        };
        const canvas = getElement(canvasID);
        if (canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.build();
            window.addEventListener('resize', () => this.resize());
        } else {
            throw new Error('canvasID 无效');
        }
    }
}

canvasDust.getPoint = (number = 1) => {
    let point = [];
    for (let i = 0; i < number; i++) {
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        point.push([x, y]);
    }
    return point;
};
try {
    new canvasDust('#canvas-dust');
} catch (e) {
}

class Cursor {
    constructor() {
        this.now = new MouseEvent('');
        this.first = true;
        this.last = 0;
        this.moveIng = false;
        this.fadeIng = false;
        this.outer = getElement('#cursor-outer').style;
        this.effecter = getElement('#cursor-effect').style;
        this.attention = "a,input,button,.admonition,.code-header,.gt-user-inner,.gt-header-textarea,.navBtnIcon";
        this.move = (timestamp) => {
            if (this.now !== undefined) {
                let SX = this.outer.left, SY = this.outer.top, preX = Number(SX.substring(0, SX.length - 2)),
                    preY = Number(SY.substring(0, SY.length - 2)), delX = (this.now.x - preX) * 0.3,
                    delY = (this.now.y - preY) * 0.3;
                if (timestamp - this.last > 15) {
                    preX += delX;
                    preY += delY;
                    this.outer.left = preX.toFixed(2) + 'px';
                    this.outer.top = preY.toFixed(2) + 'px';
                    this.last = timestamp;
                }
                if (Math.abs(delX) > 0.2 || Math.abs(delY) > 0.2) {
                    window.requestAnimationFrame(this.move);
                } else {
                    this.moveIng = false;
                }
            }
        };
        this.reset = (mouse) => {
            if (!this.moveIng) {
                this.moveIng = true;
                window.requestAnimationFrame(this.move);
            }
            this.now = mouse;
            if (this.first) {
                this.first = false;
                this.outer.left = String(this.now.x) + 'px';
                this.outer.top = String(this.now.y) + 'px';
            }
        };
        this.Aeffect = (mouse) => {
            if (this.fadeIng == false) {
                this.fadeIng = true;
                this.effecter.left = String(mouse.x) + 'px';
                this.effecter.top = String(mouse.y) + 'px';
                this.effecter.transition =
                    'transform .5s cubic-bezier(0.22, 0.61, 0.21, 1)\
    ,opacity .5s cubic-bezier(0.22, 0.61, 0.21, 1)';
                this.effecter.transform = 'translate(-50%, -50%) scale(1)';
                this.effecter.opacity = '0';
                setTimeout(() => {
                    this.fadeIng = false;
                    this.effecter.transition = '';
                    this.effecter.transform = 'translate(-50%, -50%) scale(0)';
                    this.effecter.opacity = '1';
                }, 500);
            }
        };
        this.hold = () => {
            this.outer.height = '24px';
            this.outer.width = '24px';
            this.outer.background = "rgba(255, 255, 255, 0.5)";
        };
        this.relax = () => {
            this.outer.height = '36px';
            this.outer.width = '36px';
            this.outer.background = "unset";
        };
        this.pushHolder = (items) => {
            items.forEach(item => {
                if (!item.classList.contains('is--active')) {
                    item.addEventListener('mouseover', this.hold, {passive: true});
                    item.addEventListener('mouseout', this.relax, {passive: true});
                }
            });
        };
        this.pushHolders = () => {
            this.pushHolder(document.querySelectorAll(this.attention));
        };
        this.effecter.transform = 'translate(-50%, -50%) scale(0)';
        this.effecter.opacity = '1';
        window.addEventListener('mousemove', this.reset, {passive: true});
        window.addEventListener('click', this.Aeffect, {passive: true});
        this.pushHolders();
        const observer = new MutationObserver(this.pushHolders);
        observer.observe(document, {childList: true, subtree: true});
    }
}

new Cursor();

class pjaxSupport {
    constructor() {
        this.loading = getElement('.loading');
        this.left = getElement('.loadingBar.left');
        this.right = getElement('.loadingBar.right');
        this.timestamp = 0;
        this.start = (need) => {
            this.left.style.width = need + '%';
            this.right.style.width = need + '%';
            ++this.timestamp;
        };
        this.loaded = () => {
            ++this.timestamp;
            if (this.loading.style.opacity === '1') {
                getElement('main').scrollTop = 0;
                if (this.left.style.width !== "50%") {
                    this.start(50);
                    setTimeout((time) => {
                        if (this.timestamp == time) {
                            this.loading.style.opacity = '0';
                        }
                    }, 600, this.timestamp);
                }
            }
        };
        document.addEventListener('pjax:send', () => {
            if (getElement('main').classList.contains('up')) {
                scrolls.slideDown();
            }
            this.loading.classList.add('reset');
            this.start(0);
            setTimeout((time) => {
                if (this.timestamp == time) {
                    this.loading.style.opacity = '1';
                    this.loading.classList.remove('reset');
                    this.start(15);
                    setTimeout((time) => {
                        if (this.timestamp == time) {
                            this.start(30);
                        }
                    }, 800, this.timestamp);
                }
            }, 10, this.timestamp);
        });
        document.addEventListener('pjax:start', this.loaded);
        document.addEventListener('pjax:complete', this.loaded);
    }
}

try {
    new pjaxSupport();
} catch (e) {
}
