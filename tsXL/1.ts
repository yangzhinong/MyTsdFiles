$(document).ready(function () {
    let $btn = $('<button id="btn-yzn">Yzn button</button>');

    $btn.click(function () {
        layer.alert("Is OK?",LayerIcon.Help);
    });

    $('#div').append($btn);


});