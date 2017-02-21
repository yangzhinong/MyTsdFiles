
import * as fileTool from 'lib/fileUploadBeatutify';


$(document).ready(function () {

    //function getSumPeopleNumber() {
    //    //var CarTypeId = $("#CarTypeId").val();
    //    //var classify = $("#classify").val();
    //    //if (CarTypeId == classify) {
    //    //    var childPriceIds = $("input[name=childPriceId]:checked");
    //    //    return childPriceIds.length;
    //    //}
    //    //else {
    //    //    var childProducts = $("input[name=childBookingPeopleNumber]");
    //    //    var sumPeopleNum = 0;
    //    //    $.each(childProducts, function () {
    //    //        var currCount = Number($(this).val());//人数
    //    //        sumPeopleNum += currCount;
    //    //    });
    //    //    return sumPeopleNum;
    //    //}

    //   return $("#sumPeopleNum").html();
    //}

    $('#btn-import-excel').click(function (event) {
        event.stopPropagation();
        event.preventDefault();

        var dlg = new BootstrapDialog({
            title: '客人名单上传',
            message: function () {
                var $div = $('<div/>');
                $div.append($('#tpl-import-excel').html());
                fileTool.initFileBtn($div.find("input[type=file]"), '选择文件');
                dlg.open();
                return $div;
            },
            draggable: true,
            buttons: [
                {
                    label: '确定',
                    cssClass: 'btn btn-primary',
                    action: function () {
                        var $btn = <IBootstrapDialogButtonEx>this;
                        $btn.disable();
                        layer.load("正在处理...");
                        var $frm = dlg.$modalBody.find('form');
                        $.ajax({
                            url: $('#btn-import-excel').attr("data-url") + "?qty=" + $("#sumPeopleNum").html(),
                            type: 'POST',
                            cache: false,
                            data: new FormData(<HTMLFormElement>$frm[0]),
                            processData: false,
                            contentType: false
                        }).done(function (data: IJsonMsg) {
                            layer.closeAll();
                            $btn.enable();
                            if (data.code) {
                                var d = $.parseJSON(data.data);
                                var $trs = $('#VisitorTbody tr');
                                $.each(d, function (i, e) {
                                    if (i < $trs.length) {
                                        $("td input[name=VisitorName]", $trs[i]).val( e.Name);
                                        $("td select[name=VisitorSex]", $trs[i]).val( e.Sex);
                                        $("td select[name=VisitorCre_Type]", $trs[i]).val( e.Cre_Type);
                                        $("td input[name=VisitorCertificateNo]", $trs[i]).val( e.CertificateNo);
                                        $("td input[name=VisitorTel]", $trs[i]).val(e.Tel);
                                        $("td input[name=VisitorProvince]", $trs[i]).val(e.Province);
                                        $("td input[name=VisitorCity]", $trs[i]).val(e.City);
                                        $("td input[name=VisitorTown]", $trs[i]).val(e.Town);
                                        $("td input[name=VisitorBitth]", $trs[i]).val(e.Bitth);
                                    }
                                });
                                layer.alert("成功上传!", LayerIcon.SmillingFace);
                                dlg.close();
                            } else {
                                layer.alert(data.msg, LayerIcon.CryingFace);
                            }
                        });
                    }
                },
                {
                    label: '取消',
                    action: function () {
                        dlg.close();
                    }
                }
            ]
        });
        dlg.realize();
    });

   

});