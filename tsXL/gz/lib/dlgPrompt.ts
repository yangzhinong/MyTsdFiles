export function Prompt(initValue: string, title:string, FnOK: (btn: IBootstrapDialogButtonEx, value:string)=>void) {
    var dlg= new BootstrapDialog({
        title: title,
        draggable: true,
        closeByBackdrop: false,
        message: function () {
            var $div = $('<div/>');
            $div.append('<textarea  style="height:100px;" id="x-val"></textarea>');
            $div.find('#x-val').val(initValue);
            return $div;
        },
        size:'size-small',
        buttons: [
            {
                label: '确定',
                cssClass:'btn btn-primary',
                action: function () {
                    var $btn = <IBootstrapDialogButtonEx>this;
                    $btn.enable(false);
                    FnOK($btn, dlg.$modalBody.find('#x-val').val());
                }
            },
            {
                label: '取消',
                action: function () {
                    var $btn = <IBootstrapDialogButtonEx>this;
                    $btn.dialog.close();
                }
            }
        ]
    });
    dlg.open();
}