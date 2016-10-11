function OP(srcTypeId, srcId, ToStau) {
    var btnOK = {};
    switch (ToStau) {
        case 3 /* Pause */:
            btnOK.label = '暂停产品';
            btnOK.action = function () {
            };
            break;
        case 2 /* Cancel */:
            btnOK.label = '取消产品';
            break;
        case 0 /* Resotre */:
            btnOK.label = '恢复产品';
            break;
        case -99 /* Edit */:
            btnOK.label = "编辑产品";
            break;
    }
    var dlg = new BootstrapDialog({
        title: '请选择进行操作的产品',
        draggable: true,
        closeByBackdrop: false,
        buttons: [{
                label: btnOK.label,
                action: function () {
                    var $btn = this;
                    $btn.disable();
                    layer.load('正在处理...');
                    var $table = $('#selectProduct', dlg.getModalBody());
                    var ids = [];
                    $.each($table.bootstrapTable('getSelections'), function (i, e) {
                        ids.push(Number(e.id));
                    });
                    if (ids.length == 0) {
                        layer.closeAll();
                        $btn.enable();
                        layer.alert('你必须至少选择一个出团日期的产品进行操作');
                        return false;
                    }
                    if (ToStau == -99 /* Edit */) {
                        window.location.href = ('/SysProduct/LineProductEdit/' + ids[0]);
                        return false;
                    }
                    $.post('/SysProduct/checkSaleStatusBat', {
                        ids: ids.join(","), status: ToStau
                    }, function (data) {
                        $btn.enable();
                        layer.closeAll();
                        if (data.code) {
                            layer.alert(data.msg, 9 /* SmillingFace */);
                            window.location.reload();
                        }
                        else {
                            layer.alert(data.msg, 8 /* CryingFace */);
                        }
                    });
                    console.log($table.bootstrapTable("getSelections"));
                    return false;
                }
            }
        ],
        message: function () {
            var $div = $('<div></div>');
            var iStat = 0;
            if (ToStau == 0 /* Resotre */)
                iStat = 3; //获取暂停的产品清单
            else
                iStat = 0; //获取所有销售的产品清单
            $.post('/SysProduct/ProuctsFromSourceId', { srcTypeId: srcTypeId, srcId: srcId, statu: iStat }, function (data) {
                $div.append($('#template-product-op').html());
                var $table = $('#selectProduct', $div);
                if (ToStau == -99 /* Edit */) {
                    $table.bootstrapTable({ data: data.msg, singleSelect: true });
                }
                else {
                    $table.bootstrapTable({ data: data.msg });
                }
                dlg.open();
            });
            return $div;
        },
        onshown: function () {
            var $table = $('#selectProduct', dlg.$modalBody);
            $table.bootstrapTable('resetView');
        }
    });
    dlg.realize();
}
//#region 修改产品状态
function checkSaleStatus(id, status, me) {
    if (status == 3 /* Pause */ ||
        status == 2 /* Cancel */ ||
        status == 0 /* Resotre */ ||
        status == -99 /* Edit */) {
        console.log("ok");
        var srcId = Number($(me).attr("data-src-id"));
        var srcTypeId = Number($(me).attr("data-srctype-id"));
        OP(srcTypeId, srcId, status);
        return;
    }
    var array = "0:销售中|1:已出团|2:已取消|3:已暂停|4:已过期".split('|');
    var msg = "";
    $.each(array, function (i, v) {
        var items = v.split(':');
        if (parseInt(items[0]) == status) {
            msg = "确定要将该产品状态修改为:" + items[1];
        }
    });
    layer.confirm(msg, function (b) {
        if (b) {
            $.post("/SysProduct/CheckSaleStatus", {
                id: id,
                status: status
            }, function (data) {
                layer.msg(data.msg, 1, 9);
                if (data.code) {
                    window.location.reload();
                }
            });
        }
    });
}
//#endregion 
