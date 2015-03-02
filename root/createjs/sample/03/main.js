var canvas;
var stage;
var barPadding = 7;  // bar同士の余白
var barHeight;
var maxValue = 50;  // 最大値
var count;
var barValues = [];
var bars = [];


function init() {
    // create a new stage and point it at our canvas:
    canvas = document.getElementById("testCanvas");
    stage = new createjs.Stage(canvas);

    //4 から 10の値をランダム生成。 | 0（0でor演算している） は整数を求める
    var numBars = Math.random() * 6 + 4 | 0;
    var max = 0;
    for (var i = 0; i < numBars; i++) {
        // 1から50までの値をランダムに生成
        var val = Math.random() * maxValue + 1 | 0;
        if (val > max) {
            // 生成した値のうち、最大値をmaxとして保存する
            max = val;
        }
        barValues.push(val);
    }

    // barの横幅をCanvasサイズに合わせる（barの数とbarの余白を計算）
    var barWidth = (canvas.width - 150 - (numBars - 1) * barPadding) / numBars;
    // barの最大高さをCanvasサイズより超えないように
    barHeight = canvas.height - 150;

    // 背景レイヤーを定義してCanvasに追加（線は.graphicsで直接描画している）
    var bg = new createjs.Shape();
    stage.addChild(bg);

    // 背景レイヤーの一番下のライン（平行四辺形の形）の線を引く
    bg.graphics.beginStroke("#444850")
            .moveTo(40, canvas.height - 69.5)
            .lineTo(canvas.width - 70, canvas.height - 69.5)
            .endStroke()
            .beginFill("#22252B")
            .moveTo(canvas.width - 70, canvas.height - 70)
            .lineTo(canvas.width - 60, canvas.height - 80)
            .lineTo(50, canvas.height - 80)
            .lineTo(40, canvas.height - 70)
            .closePath();

    // 背景レイヤーに水平線を書く
    for (i = 0; i < 9; i++) {
        bg.graphics.beginStroke(i % 2 ? "#333840" : "#444850")
            .moveTo(50, (canvas.height - 80 - i / 8 * barHeight | 0) + 0.5)
            .lineTo(canvas.width - 60, (canvas.height - 80 - i / 8 * barHeight | 0) + 0.5);
    }

    // グラフタイトルを定義してステージに追加
    label = new createjs.Text("Quarterly Whatsits", "bold 24px Arial", "#FFF");
    label.textAlign = "center";
    label.x = canvas.width / 2;
    label.y = 20;
    stage.addChild(label);

    // varを描画していく
    for (i = 0; i < numBars; i++) {
        // canvasに読み込んだ複数画像をまとめて処理する
        // bar内に、内包されている各オブジェクトの値がまとめて変更できる（一つのbarグループのようなもの）
        var bar = new createjs.Container();

        // 各barの色を生成
        // hue, bar.hue に同じ値を代入している
        // 0から360までの間
        var hue = bar.hue = i / numBars * 360;

        // barの前面グラデーションレイヤーを描画
        var front = new createjs.Shape();
            // ここで描画しておいた方が速い
            // beginLinearGradientFill() の引数が多い
            front.graphics.beginLinearGradientFill(
                [createjs.Graphics.getHSL(hue, 100, 60, 0.9),
                 createjs.Graphics.getHSL(hue, 100, 20, 0.75)],
                [0, 1], 0, -100, barWidth, 0)
              //.drawRect(x座標, y座標, 横幅, 縦幅) 矩形の描画
              .drawRect(0, -100, barWidth + 1, 100);

        // barの上前レイヤーを描画
        var top = new createjs.Shape();
        // ここで描画しておいた方が速い
        top.graphics.beginFill(createjs.Graphics.getHSL(hue, 100, 70, 0.9))
                .moveTo(10, -10)
                .lineTo(10 + barWidth, -10)
                .lineTo(barWidth, 0)
                .lineTo(0, 0)
                .closePath();

        // 最大値のbarには★マークを追加
        if (barValues[i] == max) {
            // .drawPolyStar(x座標, y座標, 半径, 頂点数, 谷の深さ, 起点角)
            top.graphics.beginFill("rgba(0,0,0,0.75)").drawPolyStar(barWidth / 2, 31, 7, 5, 0.6, -90).closePath();
        }

        // 右面レイヤーの準備をしておく。drawBar()で動的に生成するため
        var right = new createjs.Shape();
        right.x = barWidth - 0.5;

        // barの下ラベルレイヤーの定義
        var label = new createjs.Text("Q" + i, "bold 16px Arial", "#FFF");
        label.textAlign = "center";
        label.x = barWidth / 2;
        label.maxWidth = barWidth;
        label.y = 12;
        label.alpha = 0.75;

        // barの下ラベル背景レイヤーの定義
        var tab = new createjs.Shape();
        tab.graphics.beginFill(createjs.Graphics.getHSL(hue, 100, 20))
                .drawRoundRectComplex(0, 1, barWidth, 38, 0, 0, 10, 10);

        // barの数値レイヤーの定義
        var value = new createjs.Text("foo", "bold 14px Arial", "#000");
        value.textAlign = "center";
        value.x = barWidth / 2;
        value.alpha = 0.75;

        // bar Containerに追加すべてのelementを追加
        bar.addChild(right, front, top, value, tab, label);

        // ステージに追加する各barの位置を設定
        bar.x = i * (barWidth + barPadding) + 60;
        bar.y = canvas.height - 70;

        // ステージにbar Containerを追加
        stage.addChild(bar);
        bars.push(bar);

        // barを動的に描画していく
        // 第2引数は最初の値（1からbarValueまで伸びていく）
        drawBar(bar, 1);
    }

    // set up the count for animation based on the number of bars:
    count = numBars * 10;
    // タイマー関数をイベント登録する
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    // 最後のアニメーションフレームが表示されたらタイマーイベントを削除する
    // countが一つづつ減っていく
    if (--count == 1) {
        createjs.Ticker.removeEventListener("tick", tick);
    }


    console.log(event.delta);

    // barのアニメーションするスピード
    // 1からcountまで加算していく
    var c = bars.length * 10 - count;
    var index = c / 10 | 0;
    var bar = bars[index];

    var val = (c % 10 + 1) / 10 * barValues[index];
    drawBar(bar, val);

    stage.update(event);
}

function drawBar(bar, value) {


    // barの高さを算出
    var h = value / maxValue * barHeight;

    // barの値を更新していく
    var val = bar.getChildAt(3);
    val.text = value | 0;
    val.visible = (h > 28);
    val.y = -h + 10;

    // barの前面レイヤーと上前レイヤーの大きさと位置を更新
    bar.getChildAt(1).scaleY = h / 100;
    bar.getChildAt(2).y = -h + 0.5; // the 0.5 eliminates gaps from numerical precision issues.

    // barの右側レイヤーを描画していく
    var right = bar.getChildAt(0);
    right.graphics.clear()
            .beginFill(createjs.Graphics.getHSL(bar.hue, 60, 15, 0.7))
            .moveTo(0, 0)
            .lineTo(0, -h)
            .lineTo(10, -h - 10)
            .lineTo(10, -10)
            .closePath();
}



