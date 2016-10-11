$(document).ready(function () {
    $("#btn-cash").click(function () {
        $.layer({
            title: '提现',
            type: 1 /* PageLayer */,
            area: ['600px', '300px'],
            maxmin: false,
            shadeClose: false,
            page: {
                html: $('#tx-template').html(),
            },
            shift: 'left',
            //fadeIn: 300,
            zIndex: 1000,
            success: function (d) {
                console.log('opened');
                console.log(d);
                $('#btn-ok', d).click(function () {
                    console.log('you press ok button');
                    var $me = $(this);
                    var $frm = $me.closest("form");
                    if ($.html5Validate.isAllpass($frm)) {
                        $me.prop('disabled', true);
                        var load = layer.load("正在处理...");
                        var postData = $frm.serialize();
                        console.log(postData);
                        $.post('/Settle/SubmitCash', postData, function (data) {
                            if (data.code) {
                                layer.close(load);
                                layer.msg(data.msg, 2, 9 /* SmillingFace */);
                                window.location.href = window.location.pathname;
                            }
                            else {
                                $me.prop('disabled', false);
                                layer.close(load);
                                layer.msg(data.msg, 5, 8 /* CryingFace */);
                            }
                        });
                    }
                    ;
                });
                $("#getpaycode", d).click(function () {
                    var $me = $(this);
                    var forgetTime = (function ($d, seconds) {
                        var countdown = seconds;
                        var oldText = $d.text();
                        function forgetTime() {
                            var _this = $d;
                            console.log(countdown);
                            if (countdown <= 0) {
                                $(_this).attr("disabled", false);
                                $(_this).text(oldText);
                                countdown = seconds;
                            }
                            else {
                                $(_this).attr("disabled", true);
                                $(_this).text("重新发送(" + countdown + ")");
                                countdown = countdown - 1;
                                if (countdown >= 0) {
                                    console.log('call forgetTime: ' + countdown.toString());
                                    setTimeout(function () {
                                        forgetTime();
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
                                    layer.msg(json.msg, 1, 9 /* SmillingFace */);
                                }
                                else {
                                    layer.msg(json.msg, 5, 8 /* CryingFace */);
                                }
                            }
                        });
                    }
                    sendVCode();
                });
            }
        });
        function old() {
            var bankmsg = "是否确认提现，银行卡信息：<br/>银行名称：@bank.BankTitle<br/>卡号：@bank.CardNumber<br/>户名：@bank.CardName";
            layer.confirm(bankmsg, function (b) {
                var GtzMoeny = $("input[name='GtzMoeny']").val();
                if (GtzMoeny == '' || parseFloat(GtzMoeny) <= 0) {
                    layer.msg("请输入正确的金额！", 1, 8);
                    return;
                }
                var load = layer.load("提交中...", 10);
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "/settle/submitcash/",
                    data: "{'GtzMoeny':" + GtzMoeny + "}",
                    dataType: 'json',
                    success: function (json) {
                        layer.close(load);
                        if (json.state == 1) {
                            layer.msg(json.msg, 1, 9);
                            window.location.href = window.location.pathname;
                        }
                        else {
                            layer.msg(json.msg, 1, 8);
                        }
                    }
                });
            });
        }
    });
});
