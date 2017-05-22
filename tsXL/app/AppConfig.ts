//require.config({
//    baseUrl:'../'
//});

//import {Greeter as gt}  from "app/classes/Greeter";

//require([], () => {
//    var el = document.getElementById("content");
//    var greet = new gt(el);
//    greet.start();
    
//});

import gt = require("app/classes/Greeter");

var xx = new gt.Greeter(window.document.getElementById("dd"));

xx.start();




