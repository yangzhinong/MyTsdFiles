$(document).ready(function () {
    $('#btn-import-excel').click(function () {
        var dlg = new BootstrapDialog({
            title: 'Excel导入卡号',
            message: function () {
                var $div = $('<div/>');
                $div.append($('#tpl-import-excel').html());
                dlg.open();
                return $div;
            },
            draggable:true,
            buttons: [
                {
                    label: '确定',
                    action: function () {
                        var $frm = dlg.$modalBody.find('form');
                        $.ajax({
                            url: '/GTOilCard/importExcel',
                            type: 'POST',
                            cache: false,
                            data: new FormData(<HTMLFormElement>$frm[0]),
                            processData: false,
                            contentType: false
                        }).done(function (data) {
                            alert(data.msg);
                        });
                    }
                },
                {
                    label: '取消',
                    action: function () {
                        dlg.close();
                    }
                }
            ]
        });
        dlg.realize();
    });

    $('#myform').on('submit', function (e) {
        e.preventDefault();
        $(this).ajaxSubmit({
            target:'#output'

        });
    });
});