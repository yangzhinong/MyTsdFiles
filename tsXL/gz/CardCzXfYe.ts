$(document).ready(function () {

    $('a.a-cz-lnk').click(function () {
        //cardtype=-1&d0=2016-12-01&d1=2016-12-31&paytype=-1&xftype=-1&card1=&card2=
        var sParam = $('#search_form').serialize();

        var moneyType = $(this).attr("data-money-type");
        sParam = "moneyType=" + moneyType + '&' + sParam;
        layer.load("正在加载...");

        $.post("/Report/CardCzXfYeCZDetail", sParam, function (data: IJsonMsg) {
            layer.closeAll();
            if (data.code) {
                BootstrapDialog.alert({
                    title: '充值详情',
                    message: function () {
                        var $div = $('<div/>');
                        $div.append($('#tpl-detail').html());
                        var $table = $div.find('table');
                        $table.bootstrapTable({
                            data: $.parseJSON(data.data)

                        });
                        return $div;
                    }, 
                    draggable: true,
                    onshown: function (dlg) {
                        var $table = dlg.$modalBody.find('table');
                        $table.bootstrapTable('resetView');
                    }
                });
            }
            else {
                layer.alert(data.msg, LayerIcon.CryingFace);
            }
        });
    });

    $('a.a-xf-lnk').click(function () {
        //cardtype=-1&d0=2016-12-01&d1=2016-12-31&paytype=-1&xftype=-1&card1=&card2=
        var sParam = $('#search_form').serialize();

        var moneyType = $(this).attr("data-money-type");
        sParam = "moneyType=" + moneyType + '&' + sParam;
        layer.load("正在加载...");

        $.post("/Report/CardCzXfYeXfDetail", sParam, function (data: IJsonMsg) {
            layer.closeAll();
            if (data.code) {
                BootstrapDialog.alert({
                    title: '消费详情',
                    message: function () {
                        var $div = $('<div/>');
                        $div.append($('#tpl-detail').html());
                        var $table = $div.find('table');
                        $table.bootstrapTable({
                            data: $.parseJSON(data.data)

                        });
                        return $div;
                    },
                    draggable: true,
                    onshown: function (dlg) {
                        var $table = dlg.$modalBody.find('table');
                        $table.bootstrapTable('resetView');
                    }
                });
            }
            else {
                layer.alert(data.msg, LayerIcon.CryingFace);
            }
        });
    });


    $('td.cardno').live('click', function () {
        var cardno = $(this).text();
        if (cardno.length > 0) {
            var sParam = $('#search_form').serialize();
            sParam = "cardno=" + cardno + '&' + sParam;
            $.post('/Report/CardJournalAccount',sParam, function (data: IJsonMsg) {
                if (data.code) {
                    BootstrapDialog.alert({
                        title: '卡这段时间的交易流水 ( ' + cardno + ')',
                        message: function () {
                            var $div = $('<div/>');
                            $div.append($('#tpl-card-detail').html());
                            var $table = $div.find('table');
                            $table.bootstrapTable({
                                data: $.parseJSON(data.data)

                            });
                            return $div;
                        },
                        draggable: true,
                        onshown: function (dlg) {
                            var $table = dlg.$modalBody.find('table');
                            $table.bootstrapTable('resetView');
                        }

                    });
                } else {
                    layer.alert(data.msg, LayerIcon.CryingFace);
                }
            });
        }
    });
});
