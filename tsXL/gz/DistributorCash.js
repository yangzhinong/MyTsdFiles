var TableHelper = {};
//#region TableHelper
TableHelper.OrderFormatter =
    function (value, row) {
        return "<a href=\"/sysorders/detail/" + row.Id + "\" target=\"_blank\">" + value + "</a>";
    };
TableHelper.RatioFormatter =
    function (value, row) {
        return (value * 100).toFixed(2).toString() + '%';
    };
TableHelper.RatioFormatterA =
    function (value, row) {
        return "<a href=\"javascript:;\">" + value + "</a>";
    };
TableHelper.aspDateToJsDate =
    function (s) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(s);
        var dt = new Date(parseFloat(results[1]));
        return dt;
    };
TableHelper.FormatDate =
    function (d, fmt) {
        fmt = fmt.replace('HH', 'hh');
        //fmt = fmt.replace('DD', 'dd');
        var o = {
            "M+": d.getMonth() + 1,
            "d+": d.getDate(),
            "h+": d.getHours(),
            "m+": d.getMinutes(),
            "s+": d.getSeconds(),
            "q+": Math.floor((d.getMonth() + 3) / 3),
            "S": d.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
TableHelper.DateFormatter =
    function (value, row) {
        try {
            return value.substr(0, 10);
        }
        catch (ex) {
            return "";
        }
    };
//#endregion
$(document).ready(function () {
    (function () {
        var $sel = $("select[name=companyId]");
        $sel.selectpicker($sel.data());
    }());
    //#region 提取申请
    $('#btn-add-apply').click(function () {
        layer.load('正在加载', 1);
        var $btnMe = $(this);
        if ($btnMe.data("jClick"))
            return;
        $btnMe.data("jClick", true);
        setTimeout(function () {
            $btnMe.data("jClick", false);
        }, 1000);
        var dlg = new BootstrapDialog({
            draggable: true,
            title: '提现申请',
            cssClass: 'dlg-discash-apply',
            message: function () {
                var $div = $('<div/>');
                $div.append($('#tpl-apply').html());
                $('#btn-cancel', $div).click(function () {
                    dlg.close();
                });
                dlg.$modal.data("sels", []);
                $('#btn-ok', $div).click(function () {
                    var $table = $('table', dlg.$modalBody);
                    var rows = $table.bootstrapTable('getAllSelections');
                    if (rows.length == 0) {
                        layer.alert("你至少要选择一张订单,才能提交申请");
                        return;
                    }
                    if (Number($('input[name=Amount]', $div).val()) < 0.01) {
                        layer.alert("金额要>0,才能提交申请!");
                        return;
                    }
                    $.post('/DistributorCash/Create', {
                        orders: JSON.stringify(dlg.$modal.data('sels')),
                        Note: $('textarea[name=Note]', $div).val()
                    }, function (d) {
                        if (d.code) {
                            layer.msg(d.msg, 2, 9 /* SmillingFace */);
                            location.reload();
                        }
                        else {
                            layer.alert(d.msg, 8 /* CryingFace */);
                        }
                    });
                });
                $.post('/DistributorCash/GetMyAllowCashOrder', function (d) {
                    if (d.code) {
                        var $table = $('table', $div);
                        function refreshAllSels() {
                            var rows = $table.bootstrapTable("getAllSelections");
                            $('#lbl-orders', $div).text(rows.length);
                            var orders = [];
                            if (rows.length > 0) {
                                var sumAmount = 0;
                                for (var i = 0; i < rows.length; i++) {
                                    sumAmount = sumAmount + rows[i].Amount;
                                    orders.push(rows[i].Id);
                                }
                                dlg.$modal.data('sels', orders);
                                $('input[name=Amount]', $div).val(sumAmount);
                            }
                            else {
                                $('input[name=Amount]', $div).val(0);
                                dlg.$modal.data('sels', []);
                            }
                        }
                        $table.bootstrapTable({
                            data: $.parseJSON(d.msg),
                            onCheck: function (row) {
                                refreshAllSels();
                            },
                            onUncheck: function (row) {
                                refreshAllSels();
                                console.log('onUncheck');
                                console.log(row);
                            },
                            onCheckAll: function () {
                                refreshAllSels();
                                console.log('onUncheck');
                            },
                            onUncheckAll: function () {
                                refreshAllSels();
                                console.log('onUncheck');
                            },
                            onClickCell: function (field, value, row, $element) {
                                console.log(field);
                                switch (field) {
                                    case 'sCashRatio':
                                        var dlgCashRation = new BootstrapDialog({
                                            title: '该产品提现比率表',
                                            draggable: true,
                                            message: function () {
                                                var $div = $('<div/>');
                                                var regionId = row.ProductRegion;
                                                $.post('/DistributorCash/GetMyCashRule', { RegionId: regionId }, function (d) {
                                                    if (d.code) {
                                                        var oData = $.parseJSON(d.msg);
                                                        $div.append($('#tpl-cash-rule').html());
                                                        dlgCashRation.setTitle(oData.Region + ' 提现比率');
                                                        var $table = $('table', $div);
                                                        $table.bootstrapTable({
                                                            data: oData.lst
                                                        });
                                                        dlgCashRation.open();
                                                    }
                                                    else {
                                                        layer.alert("找不到该提现规则!可能是已到出团日期可全提.");
                                                        dlgCashRation.close();
                                                    }
                                                });
                                                return $div;
                                            },
                                            onshown: function () {
                                                var $table = dlgCashRation.$modalBody.find("table");
                                                $table.bootstrapTable('resetView');
                                            }
                                        });
                                        dlgCashRation.realize();
                                        break;
                                }
                            }
                        });
                        dlg.open();
                        layer.closeAll();
                    }
                    else {
                        layer.alert(d.msg, 8 /* CryingFace */);
                    }
                });
                return $div;
            },
            onshown: function () {
                var $table = $('table', dlg.$modalBody);
                $table.bootstrapTable('resetView');
            },
            onshow: function () {
                $(document.body).addClass('modal-open');
            }
        });
        dlg.realize();
    });
    //#endregion
    //#region 提现详情
    $('#tablelist a.apply-order-details').click(function () {
        layer.load("正在加载", 1);
        var $tr = $(this).closest('tr');
        $.post('/DistributorCash/GetApplyOrderDetails', { id: $tr.data("id") }, function (d) {
            layer.closeAll();
            if (d.code) {
                var shopName = $tr.find("td.shop-name").text();
                var applyTime = $tr.find("td.apply-time").text();
                var dlg = new BootstrapDialog({
                    title: "\u516C\u53F8:" + shopName + "[\u7533\u8BF7\u65F6\u95F4:" + applyTime + "]-\u8BE6\u60C5",
                    draggable: true,
                    message: function () {
                        var $div = $('<div/>');
                        $div.append($('#tpl-apply-order-details').html());
                        var $table = $div.find("table");
                        $table.bootstrapTable({
                            data: $.parseJSON(d.msg)
                        });
                        dlg.open();
                        return $div;
                    },
                    onshown: function () {
                        var $table = dlg.$modalBody.find("table");
                        $table.bootstrapTable("resetView");
                    }
                });
                dlg.realize();
            }
            else {
                layer.alert("找不到该申请!");
            }
        });
    });
    //#endregion
    //#region c审核
    $('#tablelist a.apply-audit').click(function () {
        layer.load("正在加载", 1);
        var $tr = $(this).closest('tr');
        $.post('/DistributorCash/GetApplyOrderDetails', { id: $tr.data("id") }, function (d) {
            layer.closeAll();
            if (d.code) {
                var shopName = $tr.find("td.shop-name").text();
                var applyTime = $tr.find("td.apply-time").text();
                var applyNote = $tr.find("td.apply-note").text();
                var amount = $tr.data("amount");
                var dlg = new BootstrapDialog({
                    title: "\u516C\u53F8:" + shopName + "-\u63D0\u73B0\u7533\u8BF7-\u7533\u6838",
                    draggable: true,
                    message: function () {
                        var $div = $('<div/>');
                        $div.append($('#tpl-audit').render({
                            applyNote: applyNote,
                            applyTime: applyTime,
                            amount: amount
                        }));
                        $div.append("<hr/>");
                        $div.append($('#tpl-apply-order-details').html());
                        var $table = $div.find("table");
                        $table.bootstrapTable({
                            data: $.parseJSON(d.msg)
                        });
                        $div.find("#btn-cancel").click(function () {
                            dlg.close();
                        });
                        $div.find("#btn-ok").click(function () {
                            var checkNote = $div.find('textarea[name=Note]').val();
                            var chekStatus = Number($div.find('#CheckStatus:checked').val());
                            var bCheckStatus = false;
                            var applyId = $tr.data("id");
                            if (chekStatus == 1) {
                                bCheckStatus = true;
                            }
                            console.log(bCheckStatus);
                            $.post('/DistributorCash/Audit', {
                                applyId: applyId, chekStatus: bCheckStatus, checkNote: checkNote
                            }, function (d) {
                                if (d.code) {
                                    layer.msg(d.msg, 1, 9 /* SmillingFace */);
                                    $tr.find("td.check-note").text(checkNote);
                                    $tr.find("td.check-time").text(TableHelper.FormatDate(new Date(), 'yyyy.MM.dd HH:mm'));
                                    $tr.find("td.check-user").text($('#tablelist').data("user"));
                                    if (bCheckStatus) {
                                        $tr.find("td.status").html('<span class="label label-success">审核通过</span>');
                                    }
                                    else {
                                        $tr.find("td.status").html('<span class="label label-danger">审核没通过</span>');
                                    }
                                    $tr.find("td:last").html("");
                                    dlg.close();
                                }
                                else {
                                    layer.alert(d.msg, 8 /* CryingFace */);
                                }
                            });
                        });
                        dlg.open();
                        return $div;
                    },
                    onshown: function () {
                        var $table = dlg.$modalBody.find("table");
                        $table.bootstrapTable("resetView");
                    }
                });
                dlg.realize();
            }
            else {
                layer.alert("找不到该申请!");
            }
        });
    });
    //endregion
});
