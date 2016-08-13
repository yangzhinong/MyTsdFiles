var dlg = new BootstrapDialog({
    title: '请打开文件',
    closeByBackdrop: false,
    draggable: true,
    message: function () {
        var $div = $("<div></div>");
        return $div;
    },
    buttons: [
        {
            label: '确定',
            action: function () {
                var $btn = this;
                $btn.disable();
                $btn.spin();
                $.post("", function (data) {
                    $btn.enable();
                    $btn.stopSpin();
                    layer.alert(data.msg, (data.code ? 9 : 8));
                    if (data.code)
                        $btn.dialog.close();
                });
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
dlg.setMessage("dfiadf");
dlg.realize();
setTimeout(function () {
    dlg.open();
}, 300);
var MakePoint;
var oo = MakePoint();
//# sourceMappingURL=1.js.map