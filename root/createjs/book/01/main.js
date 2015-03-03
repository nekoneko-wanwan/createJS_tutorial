var stage;
var myShape;
var nWidth;
var nHeight;
var nRadius = 40;

function initialize() {
    var canvasObject = document.getElementById('myCanvas');
    nWidth  = canvasObject.width;
    nHeight = canvasObject.height;

    stage    = new createjs.Stage(canvasObject);
    myShape  = new createjs.Shape();
    stage.addChild(myShape);

    myShape.x = nWidth - (nWidth * Math.random());
    myShape.y = nHeight / 2;
    draw(myShape.graphics);

    // createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.setInterval(50);
    createjs.Ticker.addEventListener('tick', rotate);

}

function draw(myGraphics) {
    var randomNumber  = Math.random() * 0xFFFFFF | 0;
    var randomColor   = createjs.Graphics.getRGB(randomNumber);
    myGraphics.beginStroke("blue");
    myGraphics.beginFill(randomColor);
    myGraphics.drawPolyStar(0, 0, 40, 5, 0.6, -90);
    stage.update();
}

function rotate() {
    myShape.rotation += 5;
    stage.update();
}



