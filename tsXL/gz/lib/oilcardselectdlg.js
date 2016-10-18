define(["require", "exports"], function (require, exports) {
    "use strict";
    function SelectGtOilCardToOperate(opt) {
        var dlg = new BootstrapDialog({
            draggable: true,
            title: opt.DlgTitle,
            cssClass: 'recharge',
            message: function () {
                var $div = $('<div/>');
                $div.append(opt.DlgTemplate);
                var $table = $div.find('table');
                var fAddSels = function (newSels) {
                    var lst = dlg.getData('yzn') || [];
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
                var fDelSels = function (delSels) {
                    var lst = dlg.getData('yzn') || [];
                    $.each(delSels, function (i, e) {
                        var ix = $.inArray(e.cardno, lst);
                        if (ix > -1) {
                            lst.splice(ix, 1);
                        }
                    });
                    dlg.setData('yzn', lst);
                    $div.find('#lbl-cardnos').text(lst.length);
                    $div.find('#cardnos').text(lst.join(' , '));
                };
                $div.find('#btn-clearall').click(function () {
                    var lst = [];
                    dlg.setData('yzn', lst);
                    $div.find('#cardnos').text('');
                    $table.bootstrapTable('uncheckAll');
                });
                $div.find('#btn-ok').click(function () {
                    var $btn = $(this);
                    $btn.enable(false);
                    var $frm = $(this).closest('form');
                    if ($.html5Validate.isAllpass($frm)) {
                        var lst = dlg.getData('yzn') || [];
                        if (lst.length > 100) {
                            layer.alert("你选择了 " + lst.length.toString() + ' 张卡! 请减少申请卡数(最多只能选择100张)');
                            $btn.enable(true);
                            return;
                        }
                        layer.load('正在处理...');
                        $.post(opt.urlOperate, $frm.serialize(), function (data) {
                            $btn.enable(true);
                            layer.closeAll();
                            if (data.code) {
                                dlg.close();
                                layer.msg(data.msg, 3, 9 /* SmillingFace */, function () {
                                    location.href = opt.urlOpSucessRefresh;
                                });
                            }
                            else {
                                layer.alert(data.msg, 8 /* CryingFace */);
                            }
                        });
                    }
                    $btn.enable(true);
                });
                $table.bootstrapTable({
                    ajax: function (param) {
                        console.log(param.data);
                        $.post(opt.urlLoadCardPage, param.data, function (data) {
                            var lst = dlg.getData('yzn') || [];
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
                    }
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
    }
    exports.SelectGtOilCardToOperate = SelectGtOilCardToOperate;
});
