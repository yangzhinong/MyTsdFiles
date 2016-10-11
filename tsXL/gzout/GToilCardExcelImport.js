$(document).ready(function () {
    $('#btn-import-excel').click(function () {
        var dlg = new BootstrapDialog({
            title: '导入石油卡 - Excel方式',
            message: function () {
                var $div = $('<div/>');
                $div.append($('#tpl-import-excel').html());
                dlg.open();
                return $div;
            },
            draggable: true,
            buttons: [
                {
                    label: '确定',
                    action: function () {
                        var $btn = this;
                        $btn.disable();
                        layer.load("正在处理...");
                        var $frm = dlg.$modalBody.find('form');
                        $.ajax({
                            url: '/GTOilCard/importExcel',
                            type: 'POST',
                            cache: false,
                            data: new FormData($frm[0]),
                            processData: false,
                            contentType: false
                        }).done(function (data) {
                            layer.closeAll();
                            $btn.enable();
                            if (data.code) {
                                layer.alert("导入成功!", 9 /* SmillingFace */);
                                window.location.reload();
                            }
                            else {
                                layer.alert(data.msg, 8 /* CryingFace */);
                            }
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
});
