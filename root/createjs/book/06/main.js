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

    // myBitmap.regX = myImage.width / 2;
    // myBitmap.regY = myImage.height / 2;
    myBitmap.x -= myImage.width / 2 ;
    myBitmap.y -= myImage.height / 2;

    stage.update();
}

// インスタンスを回してからクリックした座標に合わせる場合
function _rotate(e) {
    var instance   = e.target;
    var mouseX     = e.stageX;
    var mouseY     = e.stageY;
    var mousePoint = instance.globalToLocal(mouseX, mouseY);
    var offset;

    instance.rotation += angle;  // 順番に注意

    offset      = instance.localToGlobal(mousePoint.x, mousePoint.y);
    instance.x += mouseX - offset.x;
    instance.y += mouseY - offset.y;

    stage.update();
}

// クリック座標を基準点にして回したら位置合わせ
function rotate(e) {
    var instance   = e.target;
    var mouseX     = e.stageX;
    var mouseY     = e.stageY;
    var mousePoint = instance.globalToLocal(mouseX, mouseY);

    instance.regX = mousePoint.x;
    instance.regY = mousePoint.y;

    instance.rotation += angle;
    instance.x = mouseX;
    instance.y = mouseY;

    stage.update();
}

