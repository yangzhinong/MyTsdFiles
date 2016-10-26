var dlg = new BootstrapDialog({
    title: '请输入邮寄信息',
    draggable: true,
    message: function () {
        var $div = $('<div/>');
        $div.append('<textarea  style="height:150px;" id="x-val"></textarea>');
        return $div;
    },
    buttons: [
        {
            label: '确定',
            action: function () {
                var $btn = this;
                $btn.enable(false);
            }
        },
        {
            label: '取消',
            action: function () {
                var $btn = this;
                $btn.dialog.close();
            }
        }
    ]
});
