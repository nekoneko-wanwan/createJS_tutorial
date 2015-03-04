var canvas;
var stage;

function init() {
    canvas = document.getElementById("testCanvas");
    stage  = new createjs.Stage(canvas);
    stage.autoClear = true;  // default, falseで描画の動きが残る

    var ball = new createjs.Shape();
    ball.graphics.setStrokeStyle(5, 'round', 'round');
    ball.graphics.beginStroke(('#000000'));
    ball.graphics.beginFill("#FF0000").drawCircle(0, 0, 50);
    ball.graphics.endStroke();
    ball.graphics.endFill();
    ball.graphics.setStrokeStyle(1, 'round', 'round');
    ball.graphics.beginStroke(('#000000'));
    ball.graphics.moveTo(0, 0);
    ball.graphics.lineTo(0, 50);
    ball.graphics.endStroke();

    ball.x = Math.random() * 200 | 0;
    ball.y = -50;

    var tween = createjs.Tween.get(ball, {loop: true})
            .to({x: ball.x, y: canvas.height - 55, rotation: -360}, 1500, createjs.Ease.bounceOut)
            .wait(1000)
            .to({x: canvas.width - 55, rotation: 360}, 2500, createjs.Ease.bounceOut)
            .wait(1000).call(handleComplete)
            .to({scaleX: 2, scaleY: 2, x: canvas.width - 110, y: canvas.height - 110}, 2500, createjs.Ease.bounceOut)
            .wait(1000)
            .to({scaleX: .5, scaleY: .5, x: 30, rotation: -360, y: canvas.height - 30}, 2500, createjs.Ease.bounceOut);

    stage.addChild(ball);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function() {
        stage.update();
    });
}

function handleComplete(tween) {
    var ball = tween._target;
}
