(function(win, doc, $, exports) {

/* MYAPP内で使用する共通変数 */
var canvas;
var stage;
var player = null;

var MYAPP = {
    /* 変数一覧 */


    /**
     * 初期化
     * 読み込みが全て完了したら、handleComplete()を実行する
     */
    initialize : function() {
        canvas = document.getElementById('myCanvas');
        stage  = new createjs.Stage(canvas);

        this.addEvent();
        this.handleComplete();
    },


    /**
     * 読み込み完了時に実行する
     */
    handleComplete : function() {
        this.setPlayer();
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", this.handleTick);
    },


    /**
     * playerレイヤーの定義
     */
    setPlayer : function() {
        player = new createjs.Text('ポコタ', '50px Arial');
        player.x = 0;
        player.y = 0;
        player.speedX = 10;
        player.speedY = 10;

        stage.addChild(player);
    },


    /**
     * キーを押された時の処理
     * @param {Number} keyCode キーコード
     * @Func  {Object} actions.top()    ↑が押された時の処理
     * @Func  {Object} actions.right()  →が押された時の処理
     * @Func  {Object} actions.bottom() ↓が押された時の処理
     * @Func  {Object} actions.left()   ←が押された時の処理
     */
    keyDown : function(keyCode) {
        var actions = {
            top    : function() {
                player.y -= player.speedY;
            },
            right  : function() {
                player.x += player.speedX;
            },
            bottom : function() {
                player.y += player.speedY;
            },
            left   : function() {
                player.x -= player.speedX;
            }
        };

        switch (keyCode) {
            case 38:
                actions.top();
                break;
            case 39:
                actions.right();
                break;
            case 40:
                actions.bottom();
                break;
            case 37:
                actions.left();
                break;
            default:
                break;
        }
    },


    /**
     * イベントリスナーの設定
     */
    addEvent : function (){
        var that = this;
        /* キー押下 */
        $(doc).on('keydown', function(evt) {
            that.keyDown(evt.keyCode);
        });
    },


    /* timer関数 */
    handleTick : function() {
        stage.update();
    }
};

/* グローバルへ追加 */
exports.MYAPP = MYAPP;


})(window, document, jQuery, window);


/* DOM loaded後に発動 */
$(function() {
    MYAPP.initialize();
});
