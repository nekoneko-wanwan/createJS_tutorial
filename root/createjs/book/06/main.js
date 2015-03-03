var stage;
var file  = "../04/img/01.png";
var angle = 15;

function initialize() {
    var canvasElement = document.getElementById("myCanvas");
    var cWidth  = canvasElement.width;
    var cHeight = canvasElement.height;

    stage = new createjs.Stage(canvasElement);

    var myBitmap = new createjs.Bitmap(file);
    var loader = new createjs.LoadQueue(false);

    loader.loadFile({src: file, data: myBitmap});
    loader.addEventListener("fileload", draw);

    myBitmap.addEventListener("click", rotate);
    setAppearance(myBitmap, cWidth / 2, cHeight / 2);
}

function setAppearance(instance, nX, nY) {
    instance.x = nX;
    instance.y = nY;
    stage.addChild(instance);
}

function draw(e) {
    var myBitmap = e.item.data;
    var myImage  = e.result;

    myBitmap.regX = myImage.width / 2;
    myBitmap.regY = myImage.height / 2;
    stage.update();
}

function rotate(e) {
    var instance = e.target;
    instance.rotation += angle;
    stage.update();
}