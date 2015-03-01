/**
 * Very minimal shared code for examples.
 */

(function() {
    if (document.body) {
        setupEmbed();
    } else {
        document.addEventListener("DOMContentLoaded", setupEmbed);
    }

    function setupEmbed() {
        if (window.top != window) {
            document.body.className += " embedded";
        }
    }

    var o = window.examples = {};

    // canvas要素の親divにloadingを付与
    o.showDistractor = function(id) {
        var div = id ? document.getElementById(id) : document.querySelector("div canvas").parentNode;
        div.className += " loading";
        console.log(div);
    };

    // .loading のついたdivのclassを置き換える
    o.hideDistractor = function() {
        var div = document.querySelector(".loading");
        div.className = div.className.replace(/\bloading\b/, 'replaced');
    };
})();