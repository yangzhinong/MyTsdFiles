import * as dlgTool from 'lib/dlgPrompt';
import * as dateTool from 'lib/datetool';


$(document).ready(function () {
    $('button.btn-send-mail').click(function () {
        var $me = $(this);
        var $tr = $me.closest('tr');
        var weLogNo = $me.attr("data-out-trade-no");

        $me.enable(false);
        setTimeout(function () { $me.enable(true); }, 100);
        var FnOK = function ($dlgOkBtn:IBootstrapDialogButtonEx, val:string) {
            $.post("/SysVirtualProduct/SendMail", { weLogNo: weLogNo, note: val }, function (data) {
                if (data.code) {
                    layer.msg(data.msg, 3, 9 /* SmillingFace */);
                    $me.remove();
                    var dnow = dateTool.Format(new Date(), 'yyyy.MM.dd HH:mm');
                    var dHtml = '<label class="label label-primary">已寄出</label><br/>' + dnow;
                    $tr.find('td.issendmail').html(dHtml);
                    $tr.find('td.mailremark').html(val);
                    $dlgOkBtn.dialog.close();
                }
                else {
                    layer.alert(data.msg, 8 /* CryingFace */);
                    $dlgOkBtn.enable(true);
                }
            });
        };

        dlgTool.Prompt('','请输入邮寄信息', FnOK);

       
    });
    

})