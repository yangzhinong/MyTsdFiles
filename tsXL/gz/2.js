define(["require", "exports", 'lib/loadcss', 'lib/vbstring'], function (require, exports, cssTool, vb) {
    "use strict";
    (function () {
        $('#test').text("hello world");
        cssTool.loadCss('/lib/css/5.css');
        console.log(vb.left('hello', 2));
    }());
});
