define(["require", "exports"], function (require, exports) {
    "use strict";
    function right(s, len) {
        if (len <= 0)
            return '';
        return s.substr(-len);
    }
    exports.right = right;
    function left(s, len) {
        if (len <= 0)
            return '';
        return s.substr(0, len);
    }
    exports.left = left;
    function mid(s, iPosStart, len) {
        if (iPosStart < 1)
            throw 'VB Mide iPosStart Must >0';
        if (len == undefined)
            return s.substring(iPosStart - 1);
        return s.substr(iPosStart - 1, len);
    }
    exports.mid = mid;
});
