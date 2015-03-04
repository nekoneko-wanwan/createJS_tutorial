var canvas;
var stage;


function init() {
    // MotionGuidePluginを使うことで、pathに沿って移動ができる
    createjs.MotionGuidePlugin.install(createjs.Tween);

    canvas = document.getElementById('testCanvas');
    stage  = new createjs.Stage(canvas);
    stage.autoClear = true;

    var ball = createBall();
    tween(ball);

    stage.addChild(ball);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function() {
        stage.update();
    });
}


function createBall() {
    var ball = new createjs.Shape();
    ball.graphics.setStrokeStyle(5, 'round', 'round');
    ball.graphics.beginStroke(('#000000'));
    ball.graphics.beginFill(('#ff0000')).drawCircle(0, 0, 50);
    ball.graphics.endStroke();
    ball.graphics.endFill();
    ball.graphics.setStrokeStyle(1, 'round', 'round');
    ball.graphics.beginStroke(('#000000'));
    ball.graphics.moveTo(0, 0);
    ball.graphics.lineTo(50, 0);
    ball.graphics.endStroke();
    ball.x = 0;
    ball.y = 400;

    return ball;
}


function tween(target) {
    var tw = createjs.Tween.get(target, {loop: true}, true);
    tw.to({x: 150, y: 150}, 3000)
                    .to({rotation: -45}, 1000)
                    .to({guide: {path: [100, 100, 800, 100, 800, 300], orient: true}}, 5000)
                    .to({x: 900, y: 300}, 2000)
                    .wait(2000)
                    .to({rotation: 360}, 2000)
                    .to({guide: {path: [100, 100, 800, 100, 800, 300], start: 1, end: 0}}, 5000)
                    .wait(2000)
                    .to({x: 200, y: 200}, 1000)
                    .to({rotation: -360, guide: {path: [100, 100, 800, 100, 800, 300]}}, 3000)
            ;
}


