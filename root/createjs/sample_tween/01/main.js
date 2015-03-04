function init() {
    createjs.CSSPlugin.install(createjs.Tween);

    var ball = document.createElement("div");
    ball.className = "ball";
    document.body.appendChild(ball);

    ball.style.left = "200px";
    ball.style.top = "100px";

    var w = 960;
    var h = 400;

    var tween = new createjs.Tween(ball, {loop: false});
    tween.to({width: 100, height: 100, top: h - 55, left: 100}, 5000, createjs.Ease.bounceOut)
        .wait(1000)
        .to({left: w - 55}, 2500, createjs.Ease.bounceOut)
        .wait(1000)
        .to({width: 200, height: 200, left: w - 110, top: h - 110}, 2500, createjs.Ease.bounceOut)
        .wait(1000)
        .to({width: 50, height: 50, left: 30, top: h - 30}, 2500, createjs.Ease.bounceOut)
        .wait(1000)
        .call(handleComplete);

    function handleComplete() {
        console.log('end');
    }
}

