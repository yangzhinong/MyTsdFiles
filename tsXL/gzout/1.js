$('#fileupload').fileupload({
    formData: { path: 'images' },
    dataType: 'json',
    singleFileUploads: false,
    //maxChunkSize:4096,
    done: function (e, data) {
        $(e.target).closest('.input-group-btn').prev().val($.map(data.result.files, function (e) {
            return e.name;
        }).join(","));
        // $(this).prop('disabled',false);
        $(this).prev().text("上传(" + data.result.files.length + ")");
        $.each(data.result.files, function (i, file) {
            console.log(e);
            console.log(e.relatedTarget);
            console.log($(this));
            $('<p/>').text(file.name).appendTo(document.body);
            console.log(file.thumbnailUrl);
        });
    },
    progressall: function (e, data) {
        //$('#fileupload').fileupload('disable');
        //$(this).prop('disabled', false);
        $(this).prev().text('正在上传');
    }
});
