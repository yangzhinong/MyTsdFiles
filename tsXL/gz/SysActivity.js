var SysActivity = (function () {
    function SysActivity() {
    }
    SysActivity.prototype.Init = function (t) {
        switch (t) {
            case 1 /* Create */:
            case 2 /* Edit */:
                this.CreateOrEdit();
                break;
            case 0 /* Index */:
                this.fIndex();
        }
    };
    SysActivity.prototype.CreateOrEdit = function () {
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
                    $.post($frm.attr('action'), $frm.serialize(), function (data) {
                        layer.closeAll();
                        if (data.code) {
                            layer.msg(data.msg, 3, 9 /* SmillingFace */, function () {
                                window.location.href = "/SysActivity/index";
                            });
                        }
                        else {
                            layer.alert(data.msg, 8 /* CryingFace */);
                        }
                    });
                }
            });
        });
    };
    SysActivity.prototype.fIndex = function () {
        $(document).ready(function () {
            $('a.btn-del').click(function () {
                var $me = $(this);
                $me.enable(false);
                setTimeout(function () { $me.enable(true); }, 100);
                layer.confirm("是否删除该活动?", function () {
                    $.post('/SysActivity/del/' + $me.closest('tr').attr('data-id'), {}, function (data) {
                        layer.closeAll();
                        if (data.code) {
                            layer.msg(data.msg, 3, 9 /* SmillingFace */, function () {
                                $me.closest('tr').remove();
                            });
                        }
                        else {
                            layer.alert(data.msg, 8 /* CryingFace */);
                        }
                    });
                }, "删除活动确认");
            });
        });
    };
    return SysActivity;
}());
