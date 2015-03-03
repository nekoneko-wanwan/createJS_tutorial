var stage;
var file = "../../_assets/art/flowers.jpg";

function initialize() {
    var canvasElement = document.getElementById("myCanvas");
    stage = new createjs.Stage(canvasElement);

    var myBitmap = new createjs.Bitmap(file);
    var loader   = new createjs.LoadQueue(false);

    loader.addEventListener("fileload", draw);
    loader.loadFile({ src: file, data: myBitmap });

    setAppearance(myBitmap, canvasElement.width /2, canvasElement.height /2);
}

function setAppearance(instance, nX, nY) {
    instance.x = nX;
    instance.y = nY;
    stage.addChild(instance);
}

function draw(e) {
    var myBitmap = e.item.data;
    var myImage =  e.result;

    console.log(myBitmap);
    console.log(myImage);

    // DisplayObject.regX, regYプロパティでインスタンスの基準点を変える
    myBitmap.regX = myImage.width / 2;
    myBitmap.regY = myImage.height /2;
    stage.update();
}



