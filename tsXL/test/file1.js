var BtnSendVaildCode = (function () {
    function BtnSendVaildCode(jqSelector, waitSecond, fnCallBack) {
        this.fWaitText = function (n) {
            return "重新发送 ( " + n + " )";
        };
        this.fWait = function (n) {
            var me = this;
            // console.log(me);
            //console.log(this.waitSecond);
            n--;
            console.log(n);
            if (n > 0) {
                console.log(this.$id);
                me.$id.val(me.fWaitText(n));
                setTimeout(function () { me.fWait(n); }, 1000);
            }
            else {
                me.$id.attr('disabled', false).val(me.oldText);
            }
        };
        this.$id = $(jqSelector);
        this.waitSecond = waitSecond;
        this.oldText = this.$id.val();
        var me = this;
        $(jqSelector).click(function () {
            $(this).attr('disabled', true).val(me.fWaitText(waitSecond));
            setTimeout(function () { return me.fWait(me.waitSecond); }, 1000);
            fnCallBack();
        });
    }
    return BtnSendVaildCode;
}());
$(document).ready(function () {
    var oBtnSV = new BtnSendVaildCode('#btn-send-vcode', 30, function () {
        console.log("Call back Start...");
    });
});
