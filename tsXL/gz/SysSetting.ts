$(document).ready(function () {

    $('#tablelist a.btn-setteing-edit').click(function () {
        var $me = $(this);
        var $tr = $me.closest("tr");
        var id = Number($me.attr("data-id"));
        var title = $tr.find("td.name").text() + ' -- 编辑';
        var oldEditValue = $me.attr("data-edit-value");
        var InputGroupAddon = $me.attr("data-input-group-addon")

        var dataType = $(this).attr("data-type");
        var dlg = new BootstrapDialog({
            draggable: true,
            closeByBackdrop: false,
            buttons: [{
                label: '提交',
                action: function () {
                    layer.load("正在处理...");
                    var $btn = <IBootstrapDialogButtonEx>this;
                    $btn.disable();
                    var newValue = dlg.$modalBody.find("#value").val();
                    $.post("/SysSetting/SaveNewValue",
                        {
                            id: id, value: newValue  },
                        function (data: IJsonMsg) {
                            if (data.code) {
                                layer.alert(data.msg,
                                    LayerIcon.SmillingFace,
                                    function () {
                                        $tr.find("td.value").text(newValue + InputGroupAddon);
                                        layer.closeAll();
                                        dlg.close();
                                    });
                            } else {

                                layer.alert(data.msg, LayerIcon.CryingFace);
                            }
                    });
                }
            }],
            message: function () {
                var $div = $('<div></div');
                var inputType = "text";
                if (dataType.substring(0, 3).toLowerCase() != "str") {
                    dlg.$modalDialog.addClass("dlg-number");
                    inputType = "number";
                } 

                $div.append($('#edit-template').render({
                    Type: inputType,
                    InputGroupAddon: InputGroupAddon,
                    value: oldEditValue
                }));

                
                dlg.open();
                return $div;
            },
            title: title

        });

        dlg.realize();


    });


});
