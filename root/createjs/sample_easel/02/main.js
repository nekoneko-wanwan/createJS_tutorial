/* グローバル変数一覧 */
var stage;
var isDrawing;
var drawingCanvas;
var oldPt;
var oldMidPt;
var displayCanvas;
var image;
var bitmap;
var maskFilter;
var cursor;
var text;
var blur;
/* ----------------- */


function init() {
    examples.showDistractor();

    // イメージの定義
    image = new Image();
    image.src = "../../_assets/art/flowers.jpg";

    // イメージレイヤーが読み込まれたら handleComplete()を実行
    image.onload = handleComplete;

    // ステージの作成
    stage = new createjs.Stage("testCanvas");

    // テキストレイヤーの定義
    text = new createjs.Text("Loading...", "20px Arial", "#FFF");
    text.set({x: stage.canvas.width / 2, y: stage.canvas.height - 40});
    text.textAlign = "center";
}

// メイン画像読み込み後に処理する関数
function handleComplete() {
    // Loadingを非表示に
    examples.hideDistractor();

    // スマホ、タブレットのタッチイベントに対応させる
    createjs.Touch.enable(stage);

    // マウスオーバー時に、イベントハンドラを呼び出す
    stage.enableMouseOver();

    // ステージに、各イベント時の実行関数を付与する
    // mousedown: click
    // mouseup: clickが離れた時
    // mousemove: マウスが動いている時
    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);
    stage.addEventListener("stagemousemove", handleMouseMove);

    // 筆で塗った軌跡レイヤーを定義
    drawingCanvas = new createjs.Shape();

    // イメージレイヤーを定義（bitmapクラスでcanvasに画像の描画を自由にする）
    bitmap = new createjs.Bitmap(image);

    // ぼかしレイヤーを定義（bitmapクラスでcanvasに画像を描画し、フィルターをかける）
    blur = new createjs.Bitmap(image);
        // BlurFilter(水平ぼかし, 垂直ぼかし, ぼかし品質)
        // ColorMatrixFilter ピクセルの色相や彩度明度を設定することができる
        blur.filters = [new createjs.BlurFilter(24, 24, 2), new createjs.ColorMatrixFilter(new createjs.ColorMatrix(60))];
        // cache()メソッド
        // インスタンスそれぞれに紐付いた別のCanvasに描画が行われ、ステージへの描画はその別Canvasから行われるようになる
        blur.cache(0, 0, 960, 400);  // 第3引数と第4引数は、画像のサイズを指定する

    text.text = "Click and Drag to Reveal the Image.";

    stage.addChild(blur, text, bitmap);

    // 構成要素は変わらないので、cacheは更新しない
    updateCacheImage(false);

    // 筆レイヤー（白丸）を定義
    cursor = new createjs.Shape(new createjs.Graphics().beginFill("#FFFFFF").drawCircle(0, 0, 25));
    cursor.cursor = "pointer";

    stage.addChild(cursor);
}

function handleMouseDown(event) {
    // Canvasからみてclickした座標位置を取得
    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    oldMidPt = oldPt;
    isDrawing = true;
}

function handleMouseMove(event) {

    // 筆レイヤーをマウスの動きに合わせて移動する
    cursor.x = stage.mouseX;
    cursor.y = stage.mouseY;

    // clickされている状態でなければ、ステージを再描画する
    if (!isDrawing) {
        stage.update();
        return;
    }

    // 現在いる座標位置
    var midPoint = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

    // 軌跡を描画する（graphicsインスタンスを使って、canvasに直に描画する）
    drawingCanvas.graphics.setStrokeStyle(40, "round", "round")
            .beginStroke("rgba(0,0,0,0.2)")
            .moveTo(midPoint.x, midPoint.y)
            .curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

    // 古い座標位置を更新
    oldPt.x = stage.mouseX;
    oldPt.y = stage.mouseY;

    oldMidPt.x = midPoint.x;
    oldMidPt.y = midPoint.y;

    updateCacheImage(true);
}

function handleMouseUp(event) {
    updateCacheImage(true);
    isDrawing = false;
}

// 構成要素の変化によりキャシュの更新を行ない、再描画する
function updateCacheImage(update) {
    if (update) {
        drawingCanvas.updateCache();
    } else {
        drawingCanvas.cache(0, 0, image.width, image.height);
    }

    maskFilter = new createjs.AlphaMaskFilter(drawingCanvas.cacheCanvas);

    bitmap.filters = [maskFilter];
    if (update) {
        bitmap.updateCache(0, 0, image.width, image.height);
    } else {
        bitmap.cache(0, 0, image.width, image.height);
    }

    stage.update();
}