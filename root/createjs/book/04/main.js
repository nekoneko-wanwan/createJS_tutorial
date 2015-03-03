var stage;
var files = ["01.png", "02.png", "03.png", "04.png", "05.png"];
var canvasWidth;
var canvasHeight;
var margin = 20;
var nextPosition = new createjs.Point(margin, margin);
var maxHeight = 0;

function initialize() {
    var canvasElement = document.getElementById("myCanvas");
    var numFiles = files.length;
    var manifest = [];
    var loader = new createjs.LoadQueue(false);

    stage = new createjs.Stage(canvasElement);

    loader.addEventListener("fileload", draw);

    // 複数の画像を読み込む
    for (var i = 0; i < numFiles; i++) {
        var file = "img/" + files[i];
        var myBitmap = new createjs.Bitmap(file);
        manifest[i] = { src : file, date: myBitmap };
        setAppearance(myBitmap, canvasElement.width / 2, canvasElement.height / 2);
    }
    loader.loadManifest(manifest);

    canvasWidth  = canvasElement.width;
    canvasHeight = canvasElement.height;

    createjs.Ticker.addEventListener("tick", tick);
}

function setAppearance(instance) {
    instance.alpha = 0;
    stage.addChild(instance);
}

function draw(e) {
    var myBitmap     = e.item.date;
    var myImage      = e.result;
    var imageWidth   = myImage.width;
    var imageHeight  = myImage.height;
    var targetPoint  = getPosition(imageWidth, imageHeight);

    // Tween時にCanvas中央から開始させる
    myBitmap.x = (canvasWidth  - imageWidth ) / 2;
    myBitmap.y = (canvasHeight - imageHeight) / 2;

    stage.update();
    setTween(myBitmap, targetPoint);
}

function setTween(target, position) {
    var myTween = new createjs.Tween(target);
    myTween.to({
        x: position.x,
        y: position.y,
        alpha: 1
    }, 1000, createjs.Ease.bounceOut);
}

function getPosition(imageWidth, imageHeight) {
    var returnPoint;
    // canvasの横幅を超えていた場合は改行する
    if (nextPosition.x + imageWidth > canvasWidth) {
        returnPoint = new createjs.Point(margin, nextPosition.y + maxHeight + margin);
        nextPosition = returnPoint.clone();
        maxHeight = imageHeight;
    } else {
        returnPoint = nextPosition.clone();
        if (maxHeight < imageHeight) {
            maxHeight = imageHeight;
        }
    }
    nextPosition.x += imageWidth + margin;
    return returnPoint;
}

function tick() {
    stage.update();
}
