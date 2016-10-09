/*
 <div class="form-group">
       <label class="col-lg-2 control-label">代表图：</label>
       <div class="col-lg-10">
           <div id="fileList">
           </div>
           <div class="input-group">
               <input name="Logo" id="Logo" class="form-control" type="text" value="" readonly="readonly" required="required"
                       data-placement="auto"
                       data-toggle="popover"
                       data-trigger="hover"
                       data-html="true"
                       style="text-decoration: underline;color:blue;" />
               <span class="input-group-addon"><a id="filePickerLogo" style="font-size:10px;">上传</a></span>
           </div>
       </div>
</div>
*
*/
function yznInitUploadImgs(imgPath, initTextBoxIds) {
    var applicationPath = window.applicationPath === "" ? "" : window.applicationPath || "../../";
    var $ = jQuery;
    var arrList = initTextBoxIds; // ['Logo'];//需要上传ID
    $.each(arrList, function (n, v_id) {
        var _this = $("#" + v_id);
        if ($(_this).val() != '') {
            $(_this).attr("data-content", "<img style='max-width:800px;max-height:800px;' src='/public/" + imgPath + "/" + $(_this).val() + "' />");
        }
        load_upload(_this, v_id);
    });
    function load_upload(thisc, fp) {
        //webuploader 实例
        var uploader = WebUploader.create({
            auto: true,
            disableGlobalDnd: true,
            swf: applicationPath + '/js/webuploader/uploader.swf',
            server: applicationPath + '/Home/UpLoadProcess?paths=' + imgPath,
            pick: '#filePicker' + fp,
            multiple: false,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });
        uploader.on('uploadSuccess', function (file, response) {
            $('#' + file.id).addClass('upload-state-done');
            $(thisc).attr("value", response.filePath);
            $(thisc).attr("data-content", "<img style='max-width:800px;max-height:800px;' src='/public/" + imgPath + "/" + response.filePath + "' />");
        });
    }
}
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
                layer.alert("你是否确认删除充值套餐配置 - " + $tr.find('.name').text(), LayerIcon.Help, "删除确认", function () {
                    $.post("/SysVirtualProduct/Del", { id: Number($tr.attr("data-id")) }, function (data) {
                        if (data.code) {
                            layer.msg(data.msg, 3, LayerIcon.SmillingFace);
                            $tr.remove();
                        }
                        else {
                            layer.alert(data.msg, LayerIcon.CryingFace);
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
                    $.post(postUrl, $frm.serialize(), function (data) {
                        layer.closeAll();
                        if (data.code)
                            window.location.href = "/SysVirtualProduct/Index";
                        else
                            layer.alert(data.msg, LayerIcon.CryingFace);
                    });
                }
            });
        });
    };
    return VP;
}());
