/* easelJS 0.7よりmousemove, mouseup, dispatcherなどの概念が変わったので注意 */

var stage;
var nWidth;

function initialize() {
    var canvasElement = document.getElementById("myCanvas");
    var myShape;
    nWidth = canvasElement.width;

    stage = new createjs.Stage(canvasElement);
    for (var i = 0; i < 2; i++) {
        myShape = createCircle(50 * (i + 1), 50, 20);
        // クリックイベントリスナー
        // myShape.addEventListener("click", move);

        // マウスダウンイベントリスナー
        myShape.addEventListener("mousedown", startDrag);

        stage.addChild(myShape);
    }
    stage.update();
}

function createCircle(nX, nY, nRadius) {
    var myShape = new createjs.Shape();
    myShape.x = nX;
    myShape.y = nY;

    draw(myShape.graphics, nRadius);
    return myShape;
}

function draw(myGraphics, nRadius) {
    var randomNumber = Math.random() * 0xFFFFFF | 0;
    var randomColor  = createjs.Graphics.getRGB(randomNumber);
    myGraphics.beginStroke("blue");
    myGraphics.beginFill(randomColor);
    myGraphics.drawCircle(0, 0, nRadius);
}

// clickで動かす関数
// function move(e) {
//     var instance = e.target;
//     var nX = instance.x + 10;
//     // Canvasの右端は超えたら位置を左側へ戻す
//     if (nX > nWidth) {
//         nX -= nWidth;
//     }
//     instance.x = nX;
//     stage.update();
// }

// dragで処理する関数
function startDrag(e) {
    var instance = e.target;
    instance.addEventListener("pressmove", drag);
    instance.addEventListener("pressup", stopDrag);
    instance.offset = new createjs.Point(instance.x - e.stageX, instance.y - e.stageY);
}

// drag中の処理
function drag(e) {
    var instance = e.target;
    var offset   = instance.offset;
    instance.x   = e.stageX + offset.x;
    instance.y   = e.stageY + offset.y;
    stage.update();
}

function stopDrag(e) {
    var instance = e.target;
    instance.removeEventListener("pressmove", drag);
    instance.removeEventListener("pressup", drag);
}
