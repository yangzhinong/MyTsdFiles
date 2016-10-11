export class BtnSendVaildCode {
    private $id: JQuery;
    private waitSecond: number;
    private oldText: string;
    private bType: string = "btn";
    private fWaitText = function (n) {
        return "重新发送 ( " + n + " )";
    }
    private fWait = function (n) {
        var me = <BtnSendVaildCode>this;
        n--;
        console.log(n);
        if (n > 0) {
            console.log(this.$id);
            console.log(me.fWaitText(n));
            console.log(me.$id);
            if (me.bType== 'btn')
                me.$id.text(me.fWaitText(n));
            else 
                me.$id.val(me.fWaitText(n));
            setTimeout(function () { me.fWait(n) }, 1000)
        } else {
            me.$id.attr('disabled', false).text(me.oldText);
        }
    };
    constructor(jqSelector: string | JQuery, waitSecond: number, fnCallBack: Function, fnValid: ()=>boolean) {
        this.$id = $(jqSelector);
        this.waitSecond = waitSecond;
        this.oldText = this.$id.text();
        if (this.oldText == "") {
            this.oldText = this.$id.val();
            this.bType = "input";
        }
        var me = this;
        $(jqSelector).click(function () {
            if (fnValid()) {
                $(this).attr('disabled', true).val(me.fWaitText(waitSecond));
                setTimeout(function () { return me.fWait(me.waitSecond); }, 1000);
                fnCallBack();
            }
        });
    }
}
