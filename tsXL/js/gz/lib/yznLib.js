define(["require", "exports"], function (require, exports) {
    "use strict";
    var yznLib = (function () {
        function yznLib() {
        }
        yznLib.prototype.log = function (s) {
            console.log("Hello world: " + s);
            console.log('....');
        };
        return yznLib;
    }());
    exports.yznLib = yznLib;
});
