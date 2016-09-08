
const enum ENUMOP {
    Pause = 3,
    Cancel = 2,
    Resotre = 0,
    Edit=-99,
}

function OP(srcTypeId: number ,srcId: number, ToStau: ENUMOP) {

    var btnOK = <IBootstrapDialogButton> {} ;
    switch (ToStau) {
        case ENUMOP.Pause:
            btnOK.label = '暂停产品';
            btnOK.action = function () {
                
            }
            break;
        case ENUMOP.Cancel:
            btnOK.label = '取消产品';
            break;
        case ENUMOP.Resotre:
            btnOK.label = '恢复产品';
            break;
        case ENUMOP.Edit:
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
                    var $btn = <IBootstrapDialogButtonEx>this;
                    $btn.disable();
                    layer.load('正在处理...');
                    var $table = $('#selectProduct', dlg.getModalBody());
                    var ids: number[] = [];
                    $.each($table.bootstrapTable('getSelections'), function (i, e) {
                        ids.push(Number(e.id));
                    });
                    if (ids.length == 0) {
                        layer.closeAll();
                        $btn.enable();
                        layer.alert('你必须至少选择一个出团日期的产品进行操作');
                        return false;
                    }
                    if (ToStau == ENUMOP.Edit) {
                        window.location.href=('/SysProduct/LineProductEdit/' + ids[0]);
                        return false;
                    }

                    $.post('/SysProduct/checkSaleStatusBat',
                        {
                            ids: ids.join(","), status: ToStau
                        },
                        function (data: IJsonMsg) {
                            $btn.enable();
                            layer.closeAll();
                            if (data.code) {
                                layer.alert(data.msg, LayerIcon.SmillingFace);
                                window.location.reload();
                            }
                            else {
                                layer.alert(data.msg, LayerIcon.CryingFace);
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
            if (ToStau == ENUMOP.Resotre)
                iStat = 3;  //获取暂停的产品清单
            else
                iStat = 0; //获取所有销售的产品清单
            $.post('/SysProduct/ProuctsFromSourceId', { srcTypeId: srcTypeId, srcId: srcId, statu: iStat },
                function (data: any) {
                    $div.append($('#template-product-op').html());

                    var $table = $('#selectProduct', $div);
                    if (ToStau == ENUMOP.Edit) {
                        $table.bootstrapTable({ data: data.msg, singleSelect: true});
                    }
                    else {

                        $table.bootstrapTable({ data: data.msg});
                    }
                   
                    dlg.open();
                }
            );
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
function checkSaleStatus(id, status,me) {

    if (status == ENUMOP.Pause ||
        status == ENUMOP.Cancel ||
        status == ENUMOP.Resotre ||
        status == ENUMOP.Edit)
    {
        console.log("ok");
        var srcId = Number($(me).attr("data-src-id"));
        var srcTypeId = Number($(me).attr("data-srctype-id"));
        OP(srcTypeId,srcId, status);
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