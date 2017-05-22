const enum ViewType {
    Index=0,
    Create = 1,
    Edit=2
}

declare var shops: string;  //全局变量

class VirtualProduct {
    public  IndexInit() {
        $(document).ready(function () {
            function InitImgPopover() {
                $(".img-popover").each(function () {
                    $(this).attr("data-content", "<img style='max-width:800px;max-height:800px;' src='" + $(this).attr("value") + "' />");
                });
                $("[data-toggle='popover']").popover();
             }


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
                        setTimeout(function () {
                            $('#TourShopIds').selectpicker('val', shops.split(','));
                        }, 500);
                    }
                    break;
            }
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


export {VirtualProduct};


