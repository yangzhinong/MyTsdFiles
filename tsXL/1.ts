$(document).ready(function () {

    yznInitUploadImgs('virtualproduct', ['Logo']);


    $('#btn-ok').click(function () {
        var $frm = $(this).closest("form");

        if ($.html5Validate.isAllpass($frm)) {
            $frm.submit();
        }


    });
    OBJREG['RMB'] = "tds";
    $.html5Validate.isAllpass($('#edit'));

    $('#f').html5Validate(function () {

    }, {
        validate: function () {


            return true;
        }
        });

    
    function SetLeftMenuStatus() {
        try {
            var sPath = location.pathname;
            var $active = $('#side-menu a.href["' + sPath + '"]');
            if ($active.length > 0) {
                $active.addClass("active");
                $active.parent("ul.nav").show();
                $active.parent("ur.nav").parent().addClass("active");

            }
          } catch (e) {
            console.log(e.message);
        }
    }

});