var colorSeed = 0;

function init() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var box;
    var count = 300;

    createjs.CSSPlugin.install(createjs.Tween);
    createjs.Ticker.setFPS(60);

    while (--count >= 0) {
        box = document.createElement('div');
        box.classList.add('box');
        document.body.appendChild(box);

        // 放射状に散らばす
        var a = (Math.random() * Math.PI * 2 * 16 | 0) / 16;
        box.style.webkitTransform = "rotate(" + a + "rad)";

        var d = 30;
        box.style.left = w / 2 + Math.cos(a - 0.2 - Math.random()) * d + "px";
        box.style.top  = h / 2 + Math.sin(a - 0.2 - Math.random()) * d + "px";

        d = (Math.min(w, h) - 16) / 2 * (Math.random() * 0.3 + 0.7);
        var x = w / 2 + Math.cos(a) * d;
        var y = h / 2 + Math.sin(a) * d;

        runTween(box, x, y);
    }
    createjs.Tween.get(this, {loop: true}).to({colorSeed: 360}, 5000);
}

function runTween(elm, eX, eY) {
    var tw = createjs.Tween.get(elm, {loop: true}, true);
    tw.set({opacity: 0}, elm.style)
      .wait(Math.random() * 1000 + 1 | 0)
      .call(updateColor)
      .to({top: eY, left: eX, width: 100, height: 4, opacity: 1}, Math.random() * 1500 + 1000, easeIn);
}

function updateColor(tween) {
    var randomNumber = Math.random() * 0xFF0000 | 0;
    var randomColor  = createjs.Graphics.getRGB(randomNumber);
    tween._target.style.backgroundColor = randomColor;
}

function easeIn(ratio) {
    return ratio * ratio;
}

