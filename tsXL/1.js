$(document).ready(function () {
    $('a.order-change').click(function () {
        var dlg = new BootstrapDialog({
            title: "费用变量详情",
            closeByBackdrop: false,
            draggable: true,
            buttons: [
                {
                    label: '确定',
                    action: function () {
                        dlg.close();
                    }
                }
            ]
        });
        var orderId = $(this).attr('data-id');
        $.get("/SysOrders/ChangeAmountDetailList", { orderId: orderId }, function (data) {
            dlg.realize();
            var dHtml = $('#dlg-change-detail-line-template').render(data);
            $('#dlg-change-detail table>tbody').empty().append(dHtml);
            dlg.$modalBody.append($('#dlg-change-detail').html());
            dlg.open();
        });
    });
});
//# sourceMappingURL=1.js.map