var stage;
var myShape;
var nWidth;
var nHeight;
var nRadius = 40;

function initialize() {
    var canvasElement = document.getElementById("myCanvas");
    nWidth  = canvasElement.width;
    nHeight = canvasElement.height;
    stage   = new createjs.Stage(canvasElement);
    myShape = new createjs.Shape();
    stage.addChild(myShape);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);
    // createjs.Ticker.timingMode =  createjs.Ticker.RAF;

    setAppearance();
    setTween(myShape);
}

// 星の初期位置と色を計算する
function setAppearance() {
    myShape.x = nWidth * Math.random();
    myShape.y = -nRadius;
    draw(myShape.graphics);
}

function draw(myGraphics) {
    var randomNumber = Math.random() * 0xFFFFFF | 0;
    var randomColor  = createjs.Graphics.getRGB(randomNumber);
    myGraphics.beginStroke("blue");
    myGraphics.beginFill(randomColor);
    myGraphics.drawPolyStar(0, 0, nRadius, 5, 0.6, -90);

    stage.update();
}

function setTween(target) {
    // Tween.get()はTween()コンストラクタと同じ
    //createjs.Tween.get(target, {loop: true})
    var myTween = new createjs.Tween(target, {loop: true});
    myTween.to({
        y: nHeight - nRadius,
        rotation: 360
    }, 3000, createjs.Ease.bounceOut)
    .wait(100)
    .to({
        alpha: 0
    }, 1000, createjs.Ease.circIn)
    .call(setAppearance);
}

function tick() {
    stage.update();
}


