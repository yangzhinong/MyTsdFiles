$(document).ready(function () {
    $("#btn-cash").click(function () {

        var dlg = new BootstrapDialog({
            title: '提现',
            message: function () {
                var $div = $('<div/>');
                $div.append($('#tx-template').html());
                var $frm = $div.find("form");
                $('#btn-ok', $frm).click(function () {
                    var $me = $(this);
                    if ($.html5Validate.isAllpass($frm)) {
                        $me.prop('disabled', true);
                        var load = layer.load("正在处理...");
                        var postData = $frm.serialize();
                        console.log(postData);
                        $.post('/Settle/SubmitCash', postData, function (data: IJsonMsg) {
                            if (data.code) {
                                layer.close(load);
                                layer.msg(data.msg, 2, LayerIcon.SmillingFace);
                                window.location.href = window.location.pathname;
                            } else {
                                $me.prop('disabled', false);
                                layer.close(load);
                                layer.msg(data.msg, 5, LayerIcon.CryingFace);

                            }

                        });
                    };

                });

                $("#getpaycode", $frm).click(function () {
                    var $me = $(this);
                    var forgetTime = (function ($d: JQuery, seconds: number) {

                        var countdown = seconds;
                        var oldText = $d.text();
                        function forgetTime() {
                            var _this = $d;
                            console.log(countdown);
                            if (countdown <= 0) {
                                $(_this).attr("disabled", false);
                                $(_this).text(oldText);
                                countdown = seconds;
                            } else {
                                $(_this).attr("disabled", true);
                                $(_this).text("重新发送(" + countdown + ")");
                                countdown = countdown - 1;
                                if (countdown >= 0) {
                                    console.log('call forgetTime: ' + countdown.toString());
                                    setTimeout(function () {
                                        forgetTime()
                                    }, 1000);
                                }
                            }
                        }
                        return forgetTime;
                    })($me, 60);

                    function sendVCode() {
                        var load = layer.load("提交中...", 3);
                        forgetTime();
                        $.ajax({
                            type: "POST",
                            contentType: "application/json",
                            url: "/Settle/GetGetCashVCode",
                            dataType: 'json',
                            success: function (json) {
                                layer.close(load);
                                if (json.code) {
                                    layer.msg(json.msg, 1, LayerIcon.SmillingFace);
                                } else {
                                    layer.msg(json.msg, 5, LayerIcon.CryingFace);
                                }
                            }
                        });

                    }
                    sendVCode();
                });


                dlg.open();
                return $div;
            }
        });

        dlg.realize();
   
});
});

