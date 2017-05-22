define(["require", "exports", "app/classes/Greeter"], function (require, exports, Greeter_1) {
    "use strict";
    window.onload = function () {
        var el = document.getElementById("content");
        var greet = new Greeter_1.Greeter(el);
        greet.start();
    };
});
