﻿/// <reference path="loadimg.ts" />


const enum ViewType {
    Index=0,
    Create = 1,
    Edit=2
}
declare var shops: string;  //全局变量


class VP {
    public  IndexInit() {
        $(document).ready(function () {
            function InitImgPopover() {
                $(".img-popover").each(function () {
                    $(this).attr("data-content", "<img style='max-width:800px;max-height:800px;' src='" + $(this).attr("value") + "' />");
                });
                $("[data-toggle='popover']").popover();
            }
            var $frmSearch = $('#search_form');

            $('#sortfield',$frmSearch).change(function () {
                $('#search_form').submit();
            });

            $('a.sorttype', $frmSearch).click(function () {
                console.log('sort click');
                var $sorticon = $('#sorticon');
                if ($sorticon.val() == 'fa-sort-alpha-asc') {
                    $(this).removeClass('fa-sort-alpha-asc').addClass('fa-sort-alpha-desc');
                    $sorticon.val('fa-sort-alpha-desc');
                    

                } else {
                    $(this).removeClass('fa-sort-alpha-desc').addClass('fa-sort-alpha-asc');
                    $sorticon.val("fa-sort-alpha-asc");

                }
                $frmSearch.submit();
            });
            
            InitImgPopover();
            $('#tablelist a.amount-shop').click(function () {
                layer.load("正在加载...");
                var $tr = $(this).closest('tr');
                var amount = $(this).text();
                var name = $tr.find(".name").text();
                var dlg = new BootstrapDialog({
                    draggable: true,
                    closeByBackdrop: false,
                    title: '套餐[' + name + ']-银币详情',
                    buttons: [{
                        label: '关闭',
                        action: function () {
                            dlg.close();
                        }
                    }],
                    message: function () {
                        var $div = $('<div></div>');
                        $.post('/SysVirtualProduct/GetTourShopDetails', { id: Number($tr.attr("data-id")) }, function (data) {
                            $div.html($('#dlg-amount-shop-template').render(data));
                            $('#amount', $div).text(amount);
                            layer.closeAll();
                            dlg.open();
                        });
                        return $div;
                    }
                });
                dlg.realize();
            });

            $('#tablelist a.del').click(function () {
                var $tr = $(this).closest('tr');
                layer.alert("你是否确认删除充值套餐配置 - " + $tr.find('.name').text(),
                    LayerIcon.Help,
                    "删除确认",
                    function () {
                        $.post("/SysVirtualProduct/Del", { id: Number($tr.attr("data-id")) },
                            function (data: IJsonMsg) {
                                if (data.code) {
                                    layer.msg(data.msg, 3, LayerIcon.SmillingFace);
                                    $tr.remove();
                                } else {
                                    layer.alert(data.msg, LayerIcon.CryingFace);
                                }

                        });

                    });

            });
        });
    }
    public EditInit() {
        this.DocCreateOrEditReady(ViewType.Edit);
    }
    public CreateInit() {
        this.DocCreateOrEditReady(ViewType.Create);
    }
    private DocCreateOrEditReady(vt:ViewType) {
        $(document).ready(function(){
            yznInitUploadImgs('virtualproduct', ['Logo']);
            var postUrl = "";
            switch (vt) {
                case ViewType.Create:
                    postUrl = "/SysVirtualProduct/CreateVP";
                    break;
                case ViewType.Edit:
                    postUrl = "/SysVirtualProduct/EditVP";
                    if (shops.length > 0) {
                            console.log(shops);
                            $('#TourShopIds').selectpicker({}).selectpicker('val', shops.split(','));
                    }
                    break;
            }

            $('select[name="IsExpiryDate"]').change(function () {
                if ($(this).val() == 1) {
                    $('#div-expiry-date').show();
                } else {
                    $('#div-expiry-date').hide();
                }
            });

            $('#AmountLimitTime').change(function () {
                var $me = $(this);
                var i =  Number($me.val());

                if (i > 0) {
                    layer.confirm("购买" + i.toFixed(0) + "小时内, 人民币金额不能进行旅游消费和转帐,但可进行民生消费, 是否确定?",
                        function () {
                            $me.val(i.toFixed(0));
                            layer.closeAll();

                        }, '人民币限制旅游消费和转账确认', function () {
                            $me.val(0);
                        })
                } else {
                    $me.val(0);
                }
            });
            $('#btn-ok').click(function () {
                var $frm = $(this).closest("form");
                if ($.html5Validate.isAllpass($frm)) {
                    layer.load("正在处理...");
                    console.log($frm.serialize());
                    $.post(postUrl,
                        $frm.serialize(),
                        function (data: IJsonMsg) {
                            layer.closeAll();
                            if (data.code)
                                window.location.href = "/SysVirtualProduct/Index";
                            else
                                layer.alert(data.msg, LayerIcon.CryingFace);
                        });
                }
            });
        });
    }
}