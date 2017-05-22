declare var WebUploader: any
export function InitUploadImgs(imgPath: string, initTextBoxIds: string[]) {
    var applicationPath = window.applicationPath === "" ? "" : window.applicationPath || "../../";

    var $ = jQuery;
    var txtIdList = initTextBoxIds; // ['Logo'];//需要上传ID



    $.each(txtIdList, function (n, v_id) {
        var _this = $("#" + v_id);
        if ($(_this).val() != '') { $(_this).attr("data-content", "<img style='max-width:800px;max-height:800px;' src='/public/" + imgPath + "/" + $(_this).val() + "' />"); }
        load_upload(_this, v_id)
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