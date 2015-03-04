var stage;
var queue;
var manifest;
var data = [];  // SpriteSheetをまとめる配列
var player;
var enemies = [];  // enemyを格納する配列
var score = 0;
var scoreText;

window.onload = init;

function init() {
    // keydown
    document.addEventListener('keydown', onKeyDown);

    var canvas = document.getElementById('canvas');
    stage = new createjs.Stage(canvas);
    queue = new createjs.LoadQueue(false);

    setManifest();
    queue.loadManifest(manifest, true);
    queue.addEventListener('complete', handleComplete);
}

function handleComplete() {
    // score
    scoreText = new createjs.Text('SCORE: ' + score, '36px Impact', '#ccc');
    scoreText.x = 0;
    scoreText.y = 0;
    stage.addChild(scoreText);

    setSpriteSheetData();

    // player
    var playerSpriteSheet = new createjs.SpriteSheet(data[0]);
    player = new createjs.BitmapAnimation(playerSpriteSheet);
    player.gotoAndPlay("run");
    player.x = 0;
    player.y = 0;
    player.speedX = 5;
    player.speedY = 5;

    stage.addChild(player);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);
}

function handleTick() {
    // update SCORE
    score++;
    scoreText = "SCORE : " + score;

    stage.update();
}


// manifestをまとめるための関数
function setManifest() {
    manifest = [
        {"id":"player", "src":"http://jsrun.it/assets/6/V/8/a/6V8aq.png"},
        {"id":"enemy", "src":"http://jsrun.it/assets/o/S/L/o/oSLod.png"}
    ];
}

// キーボードが押された時の処理
function onKeyDown(e) {

    // console.log(e.keyCode);

    switch (e.keyCode) {
        case 38:
            player.y -= player.speedY;
            break;
        case 40:
            player.y += player.speedY;
            break;
        case 37:
            player.x -= player.speedX;
            break;
        case 39:
            player.x += player.speedX;
            break;
        default:
            return false;
    }

}

// spriteSheetDataをまとめるための関数
function setSpriteSheetData() {
    var playerData = {
        images: ["http://jsrun.it/assets/6/V/8/a/6V8aq.png"],
        frames: {
            width : 32,
            height: 32
        },
        animations: {
            run: {
                frames   : [0, 1, 2, 3],
                next     : "run",
                frequency: 3 // tickイベントが何回繰り返されたらフレームを進めるか
            }
        }
    };

    var enemyData = {
        images: ["http://jsrun.it/assets/o/S/L/o/oSLod.png"],
        frames: {
            width : 32,
            height: 32
        },
        animation: {
            run: [0, 1, "run", 5]
        }
    };

    data.push(playerData);
    data.push(enemyData);
}


