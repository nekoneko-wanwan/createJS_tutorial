var stage;
var file  = "../04/img/01.png";
var angle = 15;

function initialize() {
    var canvasElement = document.getElementById("myCanvas");
    var cWidth  = canvasElement.width;
    var cHeight = canvasElement.height;

    stage = new createjs.Stage(canvasElement);

    var myBitmap = new createjs.Bitmap(file);
    var loader   = new createjs.LoadQueue(false);

    loader.loadFile({src: file, data: myBitmap});
    loader.addEventListener("fileload", draw);

    myBitmap.addEventListener("mousedown", startRotation);
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

    // myBitmap.regX = myImage.width / 2;
    // myBitmap.regY = myImage.height / 2;
    myBitmap.x -= myImage.width / 2 ;
    myBitmap.y -= myImage.height / 2;

    stage.update();
}

function startRotation(e) {
    var instance = e.target;
    var mouseX   = e.stageX;
    var mouseY   = e.stageY;
    var mousePoint = instance.globalToLocal(mouseX, mouseY);

    instance.regX = mousePoint.x;
    instance.regY = mousePoint.y;

    instance.addEventListener('pressmove', rotate);
    instance.addEventListener('pressup', stopRotation);

    instance.dispatcher = e;
}



// インスタンスを回してからクリックした座標に合わせる場合
function rotate(e) {
    var instance   = e.target;
    var mouseX     = e.stageX;
    var mouseY     = e.stageY;

    instance.rotation += angle;  // 順番に注意
    instance.x = mouseX;
    instance.y = mouseY;

    stage.update();
}

function stopRotation(e) {
    var instance = e.target;
    instance.removeEventListener('pressmove', rotate);
    instance.removeEventListener('pressup', rotate);

    // instance.removeEventListener("pressmove", drag);
    // instance.removeEventListener("pressup", drag);
}