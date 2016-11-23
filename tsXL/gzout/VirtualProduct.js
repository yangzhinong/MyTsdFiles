/// <reference path="loadimg.ts" />
var VP = (function () {
    function VP() {
    }
    VP.prototype.IndexInit = function () {
        $(document).ready(function () {
            function InitImgPopover() {
                $(".img-popover").each(function () {
                    $(this).attr("data-content", "<img style='max-width:800px;max-height:800px;' src='" + $(this).attr("value") + "' />");
                });
                $("[data-toggle='popover']").popover();
            }
            var $frmSearch = $('#search_form');
            $('#sortfield', $frmSearch).change(function () {
                $('#search_form').submit();
            });
            $('a.sorttype', $frmSearch).click(function () {
                console.log('sort click');
                var $sorticon = $('#sorticon');
                if ($sorticon.val() == 'fa-sort-alpha-asc') {
                    $(this).removeClass('fa-sort-alpha-asc').addClass('fa-sort-alpha-desc');
                    $sorticon.val('fa-sort-alpha-desc');
                }
                else {
                    $(this).removeClass('fa-sort-alpha-desc').addClass('fa-sort-alpha-asc');
                    $sorticon.val("fa-sort-alpha-asc");
                }
                $frmSearch.submit();
            });
            InitImgPopover();
            //关联路线详情
            $('#tablelist a.btn-opendlg-lineids').click(function () {
                layer.load("正在加载...");
                var $tr = $(this).closest('tr');
                var name = $tr.find(".name").text();
                var dlg = new BootstrapDialog({
                    draggable: true,
                    closeByBackdrop: false,
                    title: '套餐[' + name + ']-关联线路详情',
                    buttons: [{
                            label: '关闭',
                            action: function () {
                                dlg.close();
                            }
                        }],
                    message: function () {
                        var $div = $('<div></div>');
                        $.post('/SysVirtualProduct/GetLineIdsDetails', { id: Number($tr.attr("data-id")) }, function (data) {
                            layer.closeAll();
                            if (data.code) {
                                $div.html($('#dlg-lineids-details').render({ titles: $.parseJSON(data.data) }));
                                dlg.open();
                            }
                            else {
                                dlg.close();
                                layer.msg('错误,请稍后再试!', 8 /* CryingFace */);
                            }
                        });
                        return $div;
                    }
                });
                dlg.realize();
            });
            //银币详情
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
                layer.alert("你是否确认删除充值套餐配置 - " + $tr.find('.name').text(), 4 /* Help */, "删除确认", function () {
                    $.post("/SysVirtualProduct/Del", { id: Number($tr.attr("data-id")) }, function (data) {
                        if (data.code) {
                            layer.msg(data.msg, 3, 9 /* SmillingFace */);
                            $tr.remove();
                        }
                        else {
                            layer.alert(data.msg, 8 /* CryingFace */);
                        }
                    });
                });
            });
        });
    };
    VP.prototype.EditInit = function () {
        this.DocCreateOrEditReady(2 /* Edit */);
    };
    VP.prototype.CreateInit = function () {
        this.DocCreateOrEditReady(1 /* Create */);
    };
    VP.prototype.DocCreateOrEditReady = function (vt) {
        $(document).ready(function () {
            yznInitUploadImgs('virtualproduct', ['Logo']);
            var postUrl = "";
            switch (vt) {
                case 1 /* Create */:
                    postUrl = "/SysVirtualProduct/CreateVP";
                    break;
                case 2 /* Edit */:
                    postUrl = "/SysVirtualProduct/EditVP";
                    if (shops.length > 0) {
                        console.log(shops);
                        $('#TourShopIds').selectpicker({}).selectpicker('val', shops.split(','));
                    }
                    $('input.amount').each(function (i, e) {
                        var amount = Number($(e).val());
                        var iType = $(e).attr('mtype');
                        var sel = "div.glimit[data-money-type=" + iType + "]";
                        if (amount > 0) {
                            $(sel).removeClass("hidden");
                        }
                        else {
                            $(sel).addClass("hidden");
                        }
                    });
                    break;
            }
            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green'
            });
            $('select[name="IsExpiryDate"]').change(function () {
                if ($(this).val() == 1) {
                    $('#div-expiry-date').show();
                }
                else {
                    $('#div-expiry-date').hide();
                }
            });
            $('select.sel-limit-mode').change(function () {
                var $me = $(this);
                var $frmGroup = $me.closest('.form-group');
                $frmGroup.find("div.limit-mode").addClass("hidden");
                if ($me.val() != "") {
                    $frmGroup.find("div." + $me.val()).removeClass("hidden");
                }
            });
            $('input[name="PerAmountLimitTime"]').change(function () {
                var $me = $(this);
                var i = Number($me.val());
                if (i > 0) {
                    layer.confirm("购买" + i.toFixed(0) + "小时内, 该币种金额不能进行旅游消费和转帐, 是否确定?", function () {
                        $me.val(i.toFixed(0));
                        layer.closeAll();
                    }, '限制旅游消费和转账确认', function () {
                        $me.val(0);
                    });
                }
                else {
                    $me.val(0);
                }
            });
            $('input[name="PerAmountLimitMSTime"]').change(function () {
                var $me = $(this);
                var i = Number($me.val());
                if (i > 0) {
                    layer.confirm("购买" + i.toFixed(0) + "小时内, 该币种金额不能进行民生消费, 是否确定?", function () {
                        $me.val(i.toFixed(0));
                        layer.closeAll();
                    }, '限制旅游民生消费确认', function () {
                        $me.val(0);
                    });
                }
                else {
                    $me.val(0);
                }
            });
            $('input.amount').change(function () {
                var amount = Number($(this).val());
                var iType = $(this).attr('mtype');
                var sel = "div.glimit[data-money-type=" + iType + "]";
                if (amount > 0) {
                    $(sel).removeClass("hidden");
                }
                else {
                    $(sel).addClass("hidden");
                }
            });
            //点关联线路
            $('#btn-sel-lines').click(function () {
                function InitSel($table) {
                    var oldSels = $('#lineIds').val();
                    if (oldSels != "") {
                        var iOldSels = $.map(oldSels.split(","), function (e) {
                            return Number(e);
                        });
                        $table.bootstrapTable('checkBy', {
                            field: 'Id', values: iOldSels
                        });
                    }
                }
                var oldDlg = $(this).data('dlg');
                var txt = $(this).closest('.input-group').find('input');
                if (!oldDlg) {
                    layer.load("正在加载");
                    var dlg = new BootstrapDialog({
                        autodestroy: false,
                        draggable: true,
                        closeByBackdrop: false,
                        title: '请选择关联的线路',
                        message: function () {
                            var $div = $('<div/>');
                            $.post('/SysVirtualProduct/GetLines', {}, function (data) {
                                if (data.code) {
                                    $div.append($('#tpl-sel-lines').html());
                                    var $table = $div.find('table');
                                    $table.bootstrapTable({
                                        data: $.parseJSON(data.data)
                                    });
                                    InitSel($table);
                                }
                            });
                            layer.closeAll();
                            dlg.open();
                            return $div;
                        },
                        onshown: function () {
                            var $table = dlg.$modalBody.find('table');
                            $table.bootstrapTable('resetView');
                        },
                        buttons: [{
                                label: '确定',
                                cssClass: 'btn btn-primary',
                                action: function () {
                                    var $table = dlg.$modalBody.find('table');
                                    var sels = $table.bootstrapTable('getAllSelections');
                                    console.log(sels);
                                    if (sels.length > 30) {
                                        layer.msg("最多只能选择30条线路,请减少选择数量!", 3, 8 /* CryingFace */);
                                        return;
                                    }
                                    $('#lineIds').val($.map(sels, function (e) { return e.Id; }).join(","));
                                    txt.val($.map(sels, function (e) {
                                        return e.Title;
                                    }).join(" , "));
                                    dlg.close();
                                }
                            },
                            {
                                label: '取消',
                                action: function () {
                                    var $table = dlg.$modalBody.find('table');
                                    $table.bootstrapTable('uncheckAll');
                                    InitSel($table);
                                    dlg.close();
                                }
                            }
                        ]
                    });
                    dlg.realize();
                    $(this).data('dlg', dlg);
                }
                else {
                    oldDlg.open();
                }
            });
            $('#btn-ok').click(function () {
                var $frm = $(this).closest("form");
                var frmAjaxOpt = {};
                if (!$.html5Validate.isAllpass($frm))
                    return;
                var $SaleChannelType = $('select[name="SaleChannelType"]', $frm);
                if ($SaleChannelType.val() < 0) {
                    $SaleChannelType.testRemind("请至少选择一个销售渠道类型!");
                    return;
                }
                layer.load('正在处理...');
                frmAjaxOpt.url = postUrl;
                frmAjaxOpt.beforeSubmit = function (frmData) {
                    var details = [];
                    var $glimits = $('div.form-group.glimit', $frm);
                    $.each($glimits, function (i, e) {
                        var $eachGroup = $(e);
                        if (!$eachGroup.hasClass("hidden")) {
                            var d = {};
                            var selLimitMode = $eachGroup.find("select.sel-limit-mode").val();
                            if (selLimitMode != "") {
                                d.MoneyType = Number($eachGroup.attr("data-money-type"));
                                d.IsValidDate = (selLimitMode == "period-of-validity-mode");
                                if (d.IsValidDate) {
                                    d.StartDate = $eachGroup.find('input[name="PerExpiryDateStart"]').val();
                                    d.EndDate = $eachGroup.find('input[name="PerExpiryDateEnd"]').val();
                                    details.push(d);
                                }
                                else {
                                    d.AmountLimitTime = Number($eachGroup.find('input[name="PerAmountLimitTime"]').val());
                                    d.AmountLimitMSTime = Number($eachGroup.find('input[name="PerAmountLimitMSTime"]').val());
                                    if (d.AmountLimitTime > 0 || d.AmountLimitMSTime > 0)
                                        details.push(d);
                                }
                            }
                        }
                    });
                    frmData.push({ 'name': 'details', value: JSON.stringify(details) });
                    return true;
                };
                frmAjaxOpt.success = function (data) {
                    layer.closeAll();
                    if (data.code)
                        window.location.href = "/SysVirtualProduct/Index";
                    else
                        layer.alert(data.msg, 8 /* CryingFace */);
                };
                $frm.ajaxSubmit(frmAjaxOpt);
            });
        });
    };
    return VP;
}());
