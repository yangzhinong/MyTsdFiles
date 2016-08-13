$(document).ready(function () {
    $('.moneymove').click(function () {
        var cardno = $(this).attr('cardno');
        doAccountTransfer(cardno);
    });
    $('#btn-swap-card').live('click', function () {
        var fToggleDisable = function ($e) {
            if ($e.prop("disabled"))
                $e.removeAttr('disabled');
            else
                $e.attr('disabled', 'disabled');
        };
        var card1 = $('#Card1').val();
        var card2 = $('#Card2').val();
        $('#Card2').val(card1);
        $('#Card1').val(card2);
        fToggleDisable($('#Card1'));
        fToggleDisable($('#Card2'));
        var $tft = $('select[name=TransferType]', $(".modal-dialog")); //是银币类型
        if ($tft.val() == '2') {
            fLoadTourShopNoList();
        }
    });
    $('.modal-dialog #Card1').live('blur', function () {
        console.log('card1 blur event');
        if ($('.modal-dialog select[name=TransferType]').val() == '2') {
            fLoadTourShopNoList();
        }
    });
    $('select[name=TransferType]', $(".modal-dialog")).live('change', function () {
        if ($(this).val() == '2') {
            //银币
            fLoadTourShopNoList();
        }
        else {
            $('#fg-TourShopNo').hide();
        }
    });
    var fLoadTourShopNoList = function () {
        var $fg = $('#fg-TourShopNo');
        $fg.empty();
        $fg.append($('#fg-TourShopNo-template').html());
        $fg.show();
        var ops = {};
        ops.idField = "TourShopNo";
        ops.keyField = "TourShopNo";
        ops.effectiveFieldsAlias = { TourShopNo: "批次编号", Title: '名称', TourAmount: '金额', CompanyTitle: '公司' };
        ops.url = "/GztCard/ShoptourAmountListForDropDown/?cardno=" + $('#Card1').val();
        ops.showHeader = true;
        $('#SysAccountShopSelect', $fg).bsSuggest(ops);
    };
    function doAccountTransfer(cardno) {
        var dlg = new BootstrapDialog({
            closeByBackdrop: false,
            title: "资金转移",
            draggable: true,
            message: function () {
                var $msg = $('<div></div>');
                $msg.load("/GztCard/_AccountTransfer", { cardno: cardno }, function () {
                    console.log($msg.html());
                    dlg.open();
                });
                return $msg;
            },
            buttons: [
                {
                    cssClass: 'btn btn-primary',
                    label: "提交",
                    action: function () {
                        var $btn = this;
                        $btn.disable();
                        var $frm = dlg.$modalBody.find("form");
                        if (!$.html5Validate.isAllpass($frm)) {
                            $btn.enable();
                            return false;
                        }
                        $btn.spin();
                        layer.load("正在处理...");
                        var dInput = $frm.serialize();
                        var $cardDisable = $('input:disabled', $frm);
                        dInput += '&' + $cardDisable.attr('name') + '=' + $cardDisable.val();
                        $.ajax({
                            url: '/GztCard/AccountTransferSubmit',
                            type: "POST",
                            data: dInput,
                            success: function (data) {
                                layer.closeAll();
                                if (data.code) {
                                    layer.alert(data.msg, 9 /* SmillingFace */, function () {
                                        window.location.reload();
                                    });
                                }
                                else {
                                    layer.closeAll();
                                    layer.alert(data.msg, 8 /* CryingFace */);
                                }
                            },
                            error: function (data) {
                                console.log(data);
                                layer.alert(data.responseText, 8 /* CryingFace */);
                            },
                            complete: function () {
                                $btn.enable();
                                $btn.stopSpin();
                            }
                        });
                        return false;
                    }
                },
                {
                    label: "取消",
                    action: function () {
                        dlg.close();
                    }
                }
            ]
        });
        dlg.realize();
    }
});
//# sourceMappingURL=AccountTransfer.js.map