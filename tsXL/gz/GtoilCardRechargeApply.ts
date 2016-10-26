import * as dlgtool from 'lib/dlgPrompt';
import * as datetool from 'lib/datetool';
$(document).ready(function () {
    $('#btn-recharge-apply').click(function () {
        var dlg = new BootstrapDialog({
            draggable: true,
            title: '国通石油卡充值申请',
            cssClass: 'recharge',
            message: function () {
                var $div = $('<div/>');
                $div.append($('#tpl-recharge-apply').html());
                var $table = $div.find('table');
                var fAddSels = function (newSels: any[]) {
                    let lst: string[] = dlg.getData('yzn') || [];
                    $.each(newSels, function (i, e) {
                        if ($.inArray(e.cardno, lst) < 0) {
                            lst.push(e.cardno);
                        }
                    });
                    dlg.setData('yzn', lst);
                    $div.find('#cardnos').text(lst.join(' , '));
                    $div.find('#lbl-cardnos').text(lst.length);
                    if (lst.length > 100) {
                        layer.alert("你选择了 " + lst.length.toString() + ' 张卡! (最多只能选择100张)');
                    }
                };
                var fDelSels = function (delSels: any[]) {
                    let lst: string[] = dlg.getData('yzn') || [];
                    $.each(delSels, function (i, e) {
                        let ix = $.inArray(e.cardno, lst);
                        if (ix > -1) {
                            lst.splice(ix, 1);
                        }
                    });
                    dlg.setData('yzn', lst);
                    $div.find('#lbl-cardnos').text(lst.length);
                    $div.find('#cardnos').text(lst.join(' , '));
                };
                $div.find('#btn-clearall').click(function () {
                    let lst = [];
                    dlg.setData('yzn', lst);
                    $div.find('#cardnos').text('');
                    $table.bootstrapTable('uncheckAll');
                });
                $div.find('#btn-ok').click(function () {
                    var $btn = $(this);
                    $btn.enable(false);
                    var $frm = $(this).closest('form');
                    if ($.html5Validate.isAllpass($frm)) {
                        let lst: string[] = dlg.getData('yzn') || [];
                        if (lst.length > 100) {
                            layer.alert("你选择了 " + lst.length.toString() + ' 张卡! 请减少申请卡数(最多只能选择100张)');
                            $btn.enable(true);
                            return;
                        }
                        layer.load('正在处理...');
                        $.post('/GTOilCard/RechargeApply', $frm.serialize(), function (data: IJsonMsg) {
                            $btn.enable(true);
                            layer.closeAll();
                            if (data.code) {
                                dlg.close();
                                layer.msg('申请成功', 3, LayerIcon.SmillingFace, function () {
                                    location.href = "/GTOilCard/RechargeApplyList";
                                });
                            } else {
                                layer.alert(data.msg, LayerIcon.CryingFace);
                            }
                        });
                    }
                    $btn.enable(true);
                });
                $table.bootstrapTable({
                    ajax: function (param: BootStrapTable.IAjaxParams) {
                        console.log(param.data);
                        $.post('/GTOilCard/CardListForAPage', param.data, function (data) {
                            let lst: string[] = dlg.getData('yzn') || [];
                            if (lst.length > 0) {
                                $.each(data.rows, function (i, e) {
                                    if ($.inArray(e.cardno, lst) > -1) {
                                        e.state = true;
                                    }
                                });
                            }
                            param.success({
                                total: data.total,
                                rows: data.rows
                            });
                        });
                    },
                    onClickCell: function (field, value, row, $element) {
                    },
                    onCheck: function (row) {
                        console.log('onCheck');
                        fAddSels([row]);
                        console.log(row);
                    },
                    onUncheck: function (row) {
                        console.log('onUncheck');
                        fDelSels([row]);
                        console.log(row);
                    },
                    onCheckAll: function (rows) {
                        console.log('onCheckAll');
                        fAddSels(rows);
                        console.log(rows);
                    },
                    onUncheckAll: function (rows) {
                        fDelSels(rows);
                        console.log('onUncheckAll');
                        console.log(rows);
                    },
                    onLoadSuccess: function (data) {
                        console.log('onLoadSuccess');
                        console.log(data);
                    },
                });
                $div.find('#button').click(function () {
                    alert('getAllSelections: ' + JSON.stringify($table.bootstrapTable('getAllSelections')));
                });
                dlg.open();
                return $div;
            },
            onshown: function () {
                var $table = dlg.$modalBody.find('table');
                $table.bootstrapTable('resetView');
            }
        });
        dlg.realize();
    });
    $('a.apply-audit').click(function () {
        var $me = $(this);
        var applyId = $me.attr("data-apply-id");
        var $tr = $me.closest('tr');
        var applyData = {
            applynote: $tr.find('td.applynote').text(),
            price: $tr.find('td.price').text(),
            qty: $me.attr('data-apply-qty'),
            applytime: $tr.find('td.applaytime').text(),
            cardnos: $('td.qty',$tr).attr('data-cardnos')
        };
        var fbtnOk = function () {
            var $me = $(this);
            $me.enable(false);
            var $frm = $me.closest('form');
            if (!$.html5Validate.isAllpass($frm)) {
                $me.enable(true);
                return;
            }
            var postData = $frm.serialize() + '&applyid=' + applyId;
            console.log(postData);
            layer.load('正在处理...');
            $.post('/GTOilCard/RechargeAudit', postData, function (data: IJsonMsg) {
                if (data.code) {
                    dlg.close();
                    layer.closeAll();
                    layer.msg(data.msg, 3, LayerIcon.SmillingFace, function () {
                        window.location.reload();
                    });
                } else {
                    layer.closeAll();
                    layer.alert(data.msg, LayerIcon.CryingFace);
                    $me.enable(true);
                }
            });
        };
        var dlg = new BootstrapDialog({
            title: '充值申请审核',
            draggable: true,
            message: function () {
                var $div = $('<div/>');
                $div.append($('#tpl-recharge-audit').html());
                $('#btn-cancel', $div).click(function () {
                    dlg.close();
                });
                $('#btn-ok', $div).click(fbtnOk);
                $div.find("#applytime").text(applyData.applytime);
                $div.find("#applynote").text(applyData.applynote);
                $div.find('#price').val(applyData.price);
                $div.find('#lbl-cardnos').text(applyData.qty);
                $div.find('#cardnos').text(applyData.cardnos);
                dlg.open();
                return $div;
            }
        });
        dlg.realize();
    });
    $('button.btn-manual-recharge').click(function () {
        var $btn = $(this);
        $btn.enable(false);
        layer.load("正在处理");
        $.post("/GTOilCard/ManualRechargeForErrorRecordLog",
            { logId: $btn.closest('tr').attr("data-id") },
            function (data: IJsonMsg) {
                layer.closeAll();
                if (data.code) {
                    layer.msg(data.msg, 3, LayerIcon.SmillingFace, function () {
                        $btn.closest('tr').find('td.status').html('<label class="label label-primary">充值成功</label>');
                        $btn.remove();
                        // location.reload();
                    });
                } else {
                    layer.alert(data.msg, LayerIcon.CryingFace);
                    $btn.enable(true);
                }
            }
        );
    });
    $('button.btn-send-mail').click(function () {
        var $me = $(this);
        var $tr = $me.closest('tr');
        var weLogNo = $me.attr("data-out-trade-no");
        var gLogId = $tr.attr("data-id");
        $me.enable(false);
        setTimeout(function () { $me.enable(true); }, 100);
        dlgtool.Prompt('', '请输入邮寄信息', function ($dlgOkBtn: IBootstrapDialogButtonEx, val: string) {
            $.post("/GTOilCard/SendMail",
                { weLogNo: weLogNo, gLogId: gLogId, note: val },
                function (data: IJsonMsg) {
                    if (data.code) {
                        layer.msg(data.msg, 3, LayerIcon.SmillingFace);
                        $me.remove();
                        var dnow = datetool.Format (new Date(), 'yyyy.MM.dd HH:mm');
                        let dHtml = `<label class="label label-primary">已寄出</label><br/>${dnow}`
                        $tr.find('td.issendmail').html(dHtml);
                        $tr.find('td.mailremark').html(val);
                    } else {
                        layer.alert(data.msg, LayerIcon.CryingFace);
                    }
                });
        });
    });
});

export function Init() {

}