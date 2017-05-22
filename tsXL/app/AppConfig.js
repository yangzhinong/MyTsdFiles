//require.config({
//    baseUrl:'../'
//});
define(["require", "exports", "app/classes/Greeter"], function (require, exports, gt) {
    "use strict";
    var xx = new gt.Greeter(window.document.getElementById("dd"));
    xx.start();
});
