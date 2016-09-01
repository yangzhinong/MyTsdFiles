$(document).ready(function () {

    yznInitUploadImgs('virtualproduct', ['Logo']);


    $('#btn-ok').click(function () {
        var $frm = $(this).closest("form");

        if ($.html5Validate.isAllpass($frm)) {
            $frm.submit();
        }


    });



});