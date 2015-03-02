
var stage, w, h, loader;
var sky, grant, ground, hill, hill2;


function init() {
    // canvasの親divにloading classを付与
    examples.showDistractor();
    stage = new createjs.Stage("testCanvas");

    // grab canvas width and height for later calculations:
    w = stage.canvas.width;
    h = stage.canvas.height;

    // preloadする画像
    // 後で呼び出せるように、idを付与
    manifest = [
        {src: "spritesheet_grant.png", id: "grant"},
        {src: "sky.png", id: "sky"},
        {src: "ground.png", id: "ground"},
        {src: "hill1.png", id: "hill"},
        {src: "hill2.png", id: "hill2"}
    ];

    // デフォルトだとXHRでリソースを取りに行く、falseでHTMLタグを使った方法に切り替わる
    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "../../_assets/art/");
}


// loader完了後に実行する関数
function handleComplete() {

    // canvasの親divからloading classを削除
    examples.hideDistractor();

    // 青空レイヤーの定義
        sky = new createjs.Shape();
        // 縦長の画像を横にrepeatしている（描画領域をビットマップイメージで塗りつぶし）
        sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w, h);

    // 土レイヤーの定義
        ground = new createjs.Shape();
        // 土pngの縦横サイズを取得できるようにするために
        var groundImg = loader.getResult("ground");  // 
        // 土画像を横に塗りつぶし
        // w + groundimg.widthとしているのは、横移動した時に土画像分が消えてしまうのを防ぐため
        ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
        // 土画像の縦の位置を指定
        ground.y = h - groundImg.height;
        // 後で使う用に、土画像の横幅を定義
        ground.tileW = groundImg.width;

    // 丘レイヤーの定義
        hill = new createjs.Bitmap(loader.getResult("hill"));

        // 丘画像は小さいので大きく引き延ばしている。ここでは4倍
        hill.setTransform(Math.random() * w, h - hill.image.height * 4 - groundImg.height, 4, 4);
        hill.alpha = 0.5;
        hill2 = new createjs.Bitmap(loader.getResult("hill2"));
        hill2.setTransform(Math.random() * w, h - hill2.image.height * 3 - groundImg.height, 3, 3);

    // スプライトレイヤーの定義
    var spriteSheet = new createjs.SpriteSheet({
        framerate: 30,
        "images": [loader.getResult("grant")],
        // regX, regY, 基準点の座標
        // "frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
        "frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},

        // 走る、ジャンプの2パターンアニメーションを定義
        "animations": {
            "run": [0, 25, "run", 1.5], // runをループしている, 1.5x speed
            "jump": [26, 63, "run"] // return to run
        }
    });
    grant = new createjs.Sprite(spriteSheet, "run");
    grant.y = 35;

    // 順番にレイヤーを描画していく
    stage.addChild(sky, hill, hill2, ground, grant);
    stage.addEventListener("stagemousedown", handleJumpStart);

    // setTimeoutを使うか、requestAnimationFrameを使うか
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    // tickイベントにリスナーを登録する
    createjs.Ticker.addEventListener("tick", handleTick);
}

// ジャンプ関数
function handleJumpStart() {
    grant.gotoAndPlay("jump");
}

// タイマー関数
function handleTick(event) {
    var deltaS = event.delta / 1000;
    var position = grant.x + 150 * deltaS;

    var grantW = grant.getBounds().width * grant.scaleX;
    grant.x = (position >= w + grantW) ? - grantW : position;

    ground.x = (ground.x - deltaS * 150) % ground.tileW;

    hill.x = (hill.x - deltaS * 30);
    // ループ用
    if (hill.x + hill.image.width * hill.scaleX <= 0) {
        hill.x = w;
    }

    hill2.x = (hill2.x - deltaS * 45);
    // ループ用
    if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
        hill2.x = w;
    }

    stage.update(event);
}