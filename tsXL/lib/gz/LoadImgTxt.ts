class UpLoadImgTxt {
    private $div = $('<div class="input-group"></div');
    private Id: string;
    private applicationPath;
    private imgPath: string;
    constructor(imgPath: string, $txt:JQuery ) {
        if ($txt.length == 0) return;
        if ($txt.length > 1) {
            $txt.each(function (i, e) {
                var oImg = new UpLoadImgTxt(imgPath, $(e));
            });
            return;
        }
        if ($txt.attr("id") == ""){
            $txt.attr("id", this.newGiud());
        }
        if ($txt.parent().hasClass("input-group")) return;  //防止重复加载
        $txt.addClass("form-control")
            .attr('type', 'text')
            .attr('readonly', 'readonly')
            .attr('required', 'required')
            .attr('data-placement', 'auto')
            .attr('data-toggle', 'popover')
            .attr('data-trigger', 'trigger')
            .attr('data-html', 'true')
            .attr("style", 'text-decoration: underline;color:blue;');
        $txt.before(this.$div);
        $txt.detach();
        this.$div.append($txt);
        $txt.after('<span class="input-group-addon">' +
            '< a id= "f-' + this.Id +
            '" style= "font- size:10px; " > 上传 </a>' +
            '</span > ');
        this.imgPath = imgPath;
        this.applicationPath = window.applicationPath === "" ? "" : window.applicationPath || "../../";
       this.BindUpLoadBtnEvent($txt)
    }
    private  BindUpLoadBtnEvent($txt:JQuery) {
    //webuploader 实例
        var imgPath = this.imgPath;
        var uploader = WebUploader.create({
            auto: true,
            disableGlobalDnd: true,
            swf: this.applicationPath + '/js/webuploader/uploader.swf',
            server: this.applicationPath + '/Home/UpLoadProcess?paths=' + imgPath,
            pick: '#f-' + this.Id,
            multiple: false,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });
        uploader.on('uploadSuccess', function (file, response) {
            $('#' + file.id).addClass('upload-state-done');
            $txt.attr("value", response.filePath);
            $txt.attr("data-content", "<img style='max-width:800px;max-height:800px;' src='/public/" + imgPath  + "/" + response.filePath + "' />");
        });
}
    public newGiud() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}