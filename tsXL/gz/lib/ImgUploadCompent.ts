//上传组件封装.
//yzn 2016/11/11
// 调用方法:
/*
 * <script src="~/js/gz/lib/ImgUploadCompent.js"></script>
 * 
 * $(document).ready(function () {  //一定要包装在document.read里,才正确!!!
 * 
        1. ImgUploadCompent($('#Logo'), 'public/line');
        
        2. ImgUploadCompent($('#Logo, #Logo1'), 'public/line');

        3. ImgUploadCompent($('.Logo'), 'public/line');


    });
 */

function ImgUploadCompent($ids:JQuery, paths: string, fcbReponse:()=>void) {
    var applicationPath = window.applicationPath === "" ? "" : window.applicationPath || "../../";
    var imgserver = 'http://img.gzgjly.com';
    var imgservice = 'http://img.gzgjly.com/UploadFiles.ashx';

    //var imgserver = 'http://localhost:17814';
    //var imgservice = 'http://localhost:17814/UploadFiles.ashx';

    $(function () {
        for (var i = 0; i < $ids.length; i++){
            var $id = $ids.eq(i);
            var fp: string;
            if ($id.attr('id')) {
                fp = '#filePicker' + $id.attr('id');
            }
            else {
                console.log("ERR:图像加载必须关联一个有id属性的控件!");
                fp= $id.parent().find("a.filePicker").attr("id");
                // fp = '.filePicker' + 
            }
            if ($id.val() != '') {
                $id.attr("data-content", "<img style='max-width:800px;max-height:800px;' src='" + imgserver + $id.val() + "' />");
            }
            initWebuploader($id, fp);
        }
       
    });

    //#region 上传图片
    function initWebuploader($id, fp) {

        var fcbReponse = fcbReponse ||
             (function (file, response: GZ.ImgUploadResponse) {
                var fileUrl = imgserver + response.files[0].filePath;
                $('#' + file.id).addClass('upload-state-done');
                $($id).attr("value", response.files[0].filePath);
                $($id).attr("data-content", "<img style='max-width:800px;max-height:800px;' src='" + fileUrl + "' />");
            });

        //webuploader 实例
        var uploader = WebUploader.create({
            auto: true,
            disableGlobalDnd: true,
            swf: applicationPath + '/js/webuploader/uploader.swf',
            server: imgservice + "?" + $.param({paths: paths }),
            pick: fp,
            multiple: false,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });

        uploader.on('uploadSuccess', function (file, response:GZ.ImgUploadResponse) {
            fcbReponse(file,response) ;
        });
    }
}

