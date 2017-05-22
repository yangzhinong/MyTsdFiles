import {Greeter as gt}  from "app/classes/Greeter";
window.onload = () => {
    var el = document.getElementById("content");
    var greet = new gt(el);
    greet.start();

};