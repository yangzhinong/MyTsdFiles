class SysActivity {
    public Init(t: ViewType) {
        switch (t) {
            case ViewType.Create:
            case ViewType.Edit:
                this.CreateOrEdit();
                break;
            case ViewType.Index:
                this.fIndex();
        }
    }
    CreateOrEdit () {
         $(document).ready(function () {
            $('#btn-ok').click(function () {
                var $me = $(this);
                $me.enable(false);
                setTimeout(function () {
                    $me.enable(true);
                }, 100);
                var $frm = $me.closest("form");
                if ($.html5Validate.isAllpass($frm)) {
                    layer.load("正在处理");
                    $.post($frm.attr('action'), $frm.serialize(), function (data: IJsonMsg) {
                        layer.closeAll();
                        if (data.code) {
                            layer.msg(data.msg, 3, LayerIcon.SmillingFace, function () {
                                window.location.href = "/SysActivity/index";
                            });
                        } else {
                            layer.alert(data.msg, LayerIcon.CryingFace);
                        }
                    });
                }
            });
        })
    }
    fIndex() {
        $(document).ready(function () {
            $('a.btn-del').click(function () {
                var $me = $(this);
                $me.enable(false);
                setTimeout(function () { $me.enable(true); }, 100);
                layer.confirm("是否删除该活动?", function () {
                    $.post('/SysActivity/del/' + $me.closest('tr').attr('data-id'), {}, function (data: IJsonMsg) {
                        layer.closeAll();
                        if (data.code) {
                            layer.msg(data.msg, 3, LayerIcon.SmillingFace, function () {
                                $me.closest('tr').remove();
                            });
                        }
                        else {
                            layer.alert(data.msg, LayerIcon.CryingFace);
                        }
                    });
                },
                    "删除活动确认"
                );
            });
        });
    }
}