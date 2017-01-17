var TableHelper:any = {};

TableHelper.OrderFormatter =
    function (value, row) {
        return `<a href="/sysorders/detail/${row.Id}" target="_blank">${value}</a>`;
    };
TableHelper.RatioFormatter =
    function (value, row) {
        return (value * 100).toFixed(2).toString() + '%';
    };

TableHelper.RatioFormatterA =
    function (value, row) {
        return `<a href="javascript:;">${value}</a>`;
    };



$(document).ready(function () {
    (function () {
        var $sel = $("select[name=companyId]");
        $sel.selectpicker($sel.data());
    } ());

    //#region 提取申请
    $('#btn-add-apply').click(function () {
        layer.load('正在加载',1);
        var $btnMe = $(this);
        if ($btnMe.data("jClick")) return;
        $btnMe.data("jClick", true);
        setTimeout(function () {
            $btnMe.data("jClick", false);
        }, 1000);
        
        var dlg = new BootstrapDialog({
            draggable: true,
            title: '提现申请',
            cssClass:'dlg-discash-apply',
            message: function () {
                var $div = $('<div/>');
                $div.append($('#tpl-apply').html());
                $('#btn-cancel',$div).click(function () {
                    dlg.close();
                })

                dlg.$modal.data("sels", []);
                $('#btn-ok', $div).click(function () {
                    let $table = $('table', dlg.$modalBody);
                    var rows = $table.bootstrapTable('getAllSelections');

                    if (rows.length == 0) {
                        layer.alert("你至少要选择一张订单,才能提交申请");
                        return;
                    }

                    if (Number( $('input[name=Amount]', $div).val()) < 0.01) {
                        layer.alert("金额要>0,才能提交申请!");
                        return;
                    }


                    $.post('/DistributorCash/Create',
                        {
                            orders: JSON.stringify(dlg.$modal.data('sels')),
                            Note: $('input[name=Note]', $div).val()
                        },
                        function (d: IJsonMsg) {
                            if (d.code) {
                                layer.msg(d.msg, 2,LayerIcon.SmillingFace);
                                location.reload();
                            } else {
                                layer.alert(d.msg, LayerIcon.CryingFace);
                            }

                    });

                });
               
               $.post('/DistributorCash/GetMyAllowCashOrder', function (d:IJsonMsg) {
                    
                   if (d.code) {
                       var $table = $('table', $div);
                       function refreshAllSels() {

                           var rows = $table.bootstrapTable("getAllSelections");
                           $('#lbl-orders', $div).text(rows.length);
                           var orders:number[]= [];
                           if (rows.length > 0) {
                               var sumAmount = 0;
                               for (let i = 0; i < rows.length; i++) {
                                   sumAmount = sumAmount + rows[i].Amount;
                                   orders.push(rows[i].Id);
                               }
                               dlg.$modal.data('sels', orders);
                               $('input[name=Amount]',$div).val(sumAmount);

                           } else {
                               $('input[name=Amount]', $div).val(0);
                               dlg.$modal.data('sels',[]);
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
                            onClickCell: function (field: string, value, row: any, $element) {
                                console.log(field);
                                switch (field) {
                                    case 'sCashRatio':
                                        var dlgCashRation = new BootstrapDialog({
                                            title: '提取比率设置',
                                            draggable: true,
                                            message: function () {
                                                var $div = $('<div/>');
                                                var regionId = row.ProductRegion;
                                                $.post('/DistributorCash/GetMyCashRule', { RegionId: regionId }, function (d: IJsonMsg) {
                                                    if (d.code) {
                                                        $div.append($('#tpl-cash-rule').html());
                                                        var $table = $('table', $div);
                                                        $table.bootstrapTable({
                                                            data: $.parseJSON(d.msg),
                                                        });
                                                        dlgCashRation.open();
                                                    } else {
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
                    } else {
                        layer.alert(d.msg, LayerIcon.CryingFace);
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



});