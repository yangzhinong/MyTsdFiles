$(document).ready(function () {
    ///验证码
    function initStatus() {
        var statuArray = "0:预订等待|1:接受预定|2:订单确认|3:预订取消|4:预订拒绝|5:超时作废|6:交易完成|7:申请退单|17:确认退单|27:拒绝退单|37:退单完成|8:申请变更|18:确认变更".split('|');
        var str = "";
        for (var i = 0; i < statuArray.length; i++) {
            var array = statuArray[i].split(':');
            if (parseInt(array[0]) == parseInt($("#os").html())) {
                str = array[1];
                break;
            }
        }
        return str;
    }
    $("#os").html(initStatus);
    var fRefreshButtons = function () {
        $('#buttons-area').empty().load("/SysOrders/_OrderOperationButtons/" + fOrderId(), function () {
            fBindButtonsClick();
        });
    };
    var fOrderId = function () {
        var id = $('#buttons-area').attr("data-order-id");
        return parseInt(id, 10);
    };
    var fAlert = function (data) {
        layer.alert(data.msg, ((data.code == 0) ? 8 : 9));
    };
    var fBindButtonsClick = function () {
        $('#order-op button:contains("拒绝预订")').click(function () {
            BootstrapDialog.confirm({
                title: '请输入拒绝原因',
                message: function (dlg) {
                    var $msg = $("<div></div>");
                    $msg.append("<textarea class='form-control' rows='8' maxlength='500'></textarea>");
                    return $msg;
                },
                callback: function (bConfirm) {
                    if (bConfirm) {
                        var $btn = this;
                        $btn.disable();
                        $btn.spin();
                        var val = $btn.dialog.$modalContent.find("textarea").val();
                        $.post("/SysOrders/CheckStatus", { orderid: fOrderId(), statu: 4, ShopRejectOrderReason: val }, function (data) {
                            $btn.stopSpin();
                            fAlert(data);
                            fRefreshButtons();
                            $btn.dialog.close();
                        });
                    }
                }
            });
        });
        $('#order-op button:contains("接受预订")').click(function () {
            layer.confirm("是否确认预订?", function () {
                layer.load("正在处理...", 3);
                $.post("/SysOrders/CheckStatus", { orderid: fOrderId(), statu: 1 }, function (data) {
                    layer.closeAll();
                    fAlert(data);
                    fRefreshButtons();
                });
            }, "预订确认");
        });
        $('#order-op button:contains("费用变更申请")').click(function () {
            var dlg = BootstrapDialog.confirm({
                title: '请填写费用变更单',
                message: function (dlg) {
                    var $msg = $("<div></div>");
                    $msg.load("/SysOrders/_OrderChangeAmount/" + fOrderId());
                    return $msg;
                },
                callback: function (bConfirm) {
                    if (bConfirm) {
                        var $btn = this;
                        $btn.disable();
                        $btn.spin();
                        var $frm = dlg.$modalContent.find("form");
                        if ($.html5Validate.isAllpass($frm)) {
                            var val = $btn.dialog.$modalContent.find("textarea").val();
                            $.post("/SysOrders/OrderChangeAmountApplySubmit", $frm.serialize(), function (data) {
                                $btn.stopSpin();
                                fAlert(data);
                                fRefreshButtons();
                                $btn.enable();
                                if (data.code)
                                    $btn.dialog.close();
                            }).error(function () {
                                layer.alert("出错了.");
                                $btn.enable();
                                $btn.stopSpin();
                            });
                        }
                        else {
                            $btn.enable();
                            $btn.stopSpin();
                        }
                        return false;
                    }
                    ;
                }
            });
        });
        $('#order-op button:contains("费用变更审核")').click(function () {
            var fCheck = function () {
                var frm = dlg.$modalBody.find("form");
                var id = frm.attr("data-id");
                var check = $('input[name=Status]:checked', frm).val();
                $.post('/SysOrders/OrderChangeAmountApplyCheckSubmit', { Id: id, check: check }, function (data) {
                    layer.closeAll();
                    if (data.code) {
                        layer.alert(data.msg, 9);
                        fRefreshButtons();
                        dlg.close();
                    }
                    else {
                        layer.alert(data.msg, 8);
                    }
                });
                return false;
            };
            var $btn = $(this);
            $btn.disabled = true;
            var dlg = new BootstrapDialog({
                title: '费用变更单审核',
                message: function (dlg) {
                    var $msg = $('<div></div>');
                    $msg.load("/SysOrders/_OrderChangeAmountCheck/" + fOrderId());
                    return $msg;
                },
                draggable: true,
                closeByBackdrop: false,
                buttons: [
                    {
                        label: '确定',
                        action: function () {
                            layer.load("正在处理...");
                            fCheck(); //状态2为同意
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
            setTimeout(function () {
                dlg.open();
                $btn.enabled = true;
            }, 300);
        });
        $('#order-op button:contains("退单申请")').click(function () {
            var dlg = BootstrapDialog.confirm({
                title: '请填写退单申请',
                message: function (dlg) {
                    var $msg = $("<div></div>");
                    $msg.load("/SysOrders/_OrderRefundMoney/" + fOrderId());
                    return $msg;
                },
                callback: function (bConfirm) {
                    if (bConfirm) {
                        var $btn = this;
                        $btn.disable();
                        $btn.spin();
                        var $frm = dlg.$modalContent.find("form");
                        if ($.html5Validate.isAllpass($frm)) {
                            $.post("/SysOrders/OrderRefundMoneyApplySubmit", $frm.serialize(), function (data) {
                                $btn.stopSpin();
                                fAlert(data);
                                fRefreshButtons();
                                $btn.enable();
                                if (data.code)
                                    $btn.dialog.close();
                            }).error(function () {
                                layer.alert("出错了.");
                                $btn.enable();
                                $btn.stopSpin();
                            });
                        }
                        else {
                            $btn.enable();
                            $btn.stopSpin();
                        }
                        return false;
                    }
                    ;
                }
            });
        });
        $('#order-op button:contains("退单审核")').click(function () {
            var fCheck = function () {
                var frm = dlg.$modalBody.find("form");
                var id = frm.attr("data-id");
                var check = $('input[name=Status]:checked', frm).val();
                $.post('/SysOrders/OrderRefundMoneyApplyCheckSubmit', { Id: id, check: check }, function (data) {
                    layer.closeAll();
                    if (data.code) {
                        layer.alert(data.msg, 9);
                        fRefreshButtons();
                        dlg.close();
                    }
                    else {
                        layer.alert(data.msg, 8);
                    }
                });
                return false;
            };
            var $btn = $(this);
            $btn.disabled = true;
            var dlg = new BootstrapDialog({
                title: '退单审核',
                message: function (dlg) {
                    var $msg = $('<div></div>');
                    $msg.load("/SysOrders/_OrderRefundMoneyApplyCheck/" + fOrderId());
                    return $msg;
                },
                draggable: true,
                closeByBackdrop: false,
                buttons: [
                    {
                        label: '确定',
                        action: function () {
                            layer.load("正在处理...");
                            fCheck(); //状态2为同意
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
            setTimeout(function () {
                dlg.open();
                $btn.enabled = true;
            }, 300);
        });
        $('#order-op button:contains("付款")').click(function () {
            var fPay = function () {
                var $frm = dlg.$modalBody.find('form');
                if ($.html5Validate.isAllpass($frm)) {
                    layer.load("正在处理...");
                    var OrderNo = $("input[name='OrderNo']", $frm).val(), Money = $("input[name='Money']", $frm).val(), GtzCardNumber = $("input[name='GtzCardNumber']", $frm).val(), MobileCode = $("input[name='MobileCode']", $frm).val();
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        url: "/sysorders/submitorderpay/",
                        data: "{'OrderNo':'" + OrderNo + "','Money':" + Money + ",'GtzCardNumber':'" + GtzCardNumber + "','MobileCode':'" + MobileCode + "'}",
                        dataType: 'json',
                        success: function (json) {
                            layer.closeAll();
                            if (json.state == 1) {
                                layer.msg(json.msg, 1, 9);
                                dlg.close();
                                fRefreshButtons();
                            }
                            else if (json.state == 2) {
                                //重复支付
                                layer.alert(json.msg, 8);
                                dlg.close();
                            }
                            else {
                                layer.msg(json.msg, 1, 8);
                            }
                        }
                    });
                }
            };
            var $btn = $(this);
            $btn.disabled = true;
            var dlg = new BootstrapDialog({
                title: '付款',
                message: function (dlg) {
                    var $msg = $('<div></div>');
                    $msg.load("/SysOrders/_OrderPayNew/" + fOrderId());
                    return $msg;
                },
                draggable: true,
                closeByBackdrop: false,
                buttons: [
                    {
                        label: '确定',
                        action: function () {
                            layer.load("正在处理...", 3);
                            fPay(); //状态2为同意
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
            setTimeout(function () {
                dlg.open();
                $btn.enabled = true;
            }, 300);
        });
        $('#order-op button:contains("验票")').click(function () {
            var fValidTicket = function ($def) {
                var $frm = dlg.$modalBody.find('form');
                var TicketCode = $('#TicketCode', $frm).val();
                var OrderNo = $frm.attr('data-order-no');
                $.post('/SysOrders/SubmitVaildOrder', { OrderNo: OrderNo, TicketCode: TicketCode }, function (data) {
                    $def.resolve();
                    layer.closeAll();
                    if (data.state == 1) {
                        layer.msg(data.msg, 1, 9);
                        dlg.close();
                    }
                    else {
                        layer.msg(data.msg, 1, 8);
                    }
                });
            };
            var $btn = $(this);
            var dlg = new BootstrapDialog({
                title: '验票',
                message: function (dlg) {
                    var $msg = $('<div></div>');
                    $msg.append($('#frm-vaild-ticket-template').render());
                    return $msg;
                },
                draggable: true,
                closeByBackdrop: false,
                buttons: [
                    {
                        label: '确定',
                        action: function () {
                            var $b = this;
                            $b.disable();
                            $b.spin();
                            var $def = $.Deferred();
                            $def.done(function () {
                                $b.enable();
                                $b.stopSpin();
                            });
                            layer.load("正在处理...", 3);
                            fValidTicket($def); //状态2为同意
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
            setTimeout(function () {
                dlg.open();
                $btn.enabled = true;
            }, 300);
        });
    };
    fBindButtonsClick();
    (function () {
        function forgetTime(down) {
            var _this = $("#getpaycode");
            if (down == 0) {
                $(_this).attr("disabled", false);
                $(_this).text("发送验证码");
                down = 60;
            }
            else {
                $(_this).attr("disabled", true);
                $(_this).text("重新发送(" + down + ")");
                //down = down - 1;
                if (down > 0) {
                    setTimeout(function () {
                        forgetTime(down - 1);
                    }, 1000);
                }
            }
        }
        $("#getpaycode").live('click', function () {
            var Money = $("#Money").val(), GtzCardNumber = $("input[name='GtzCardNumber']").val();
            if ($.html5Validate.isAllpass($("input[name='GtzCardNumber']"))) {
                var load = layer.load("提交中...", 10);
                forgetTime();
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "/sysorders/getpaycode2/",
                    data: "{'Money':" + Money + ",'GtzCardNumber':'" + GtzCardNumber + "'}",
                    dataType: 'json',
                    success: function (json) {
                        layer.close(load);
                        if (json.state) {
                            layer.msg(json.msg, 1, 9);
                            forgetTime(60);
                        }
                        else {
                            layer.msg(json.msg, 1, 8);
                        }
                    }
                });
            }
        });
    })();
});
//# sourceMappingURL=2.js.map