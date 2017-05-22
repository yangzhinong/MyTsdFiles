define(["require", "exports", "lib/sentvcodebutton"], function (require, exports, tool) {
    "use strict";
    $(document).ready(function () {
        //产品分类下拉框
        (function () {
            var bShown = false;
            var htmls = [];
            htmls.push('<div id="menuContent" class="menuContent" style= " position: absolute;background-color:#fff ;border:1px solid #0026ff;overflow: auto" >');
            htmls.push('<ul id="treeFR" class="ztree" style= "margin-top:0; width:200px; height: 500px;" />');
            htmls.push('</div>');
            $('body').append(htmls.join(''));
            $.fn.zTree.init($('#treeFR'), {
                check: {
                    enable: true,
                    chkStyle: "radio",
                    radioType: "all"
                },
                view: {
                    dblClickExpand: false
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: onClick,
                    onCheck: onCheck
                }
            }, $.parseJSON($('#tree-data').text()));
            var $input1 = $('#ProductRegionValue');
            var $input2 = $('#ProductRegion');
            function onClick(e, treeId, treeNode) {
                var zTree = $.fn.zTree.getZTreeObj("treeFR");
                zTree.checkNode(treeNode, !treeNode.checked, null, true);
                return false;
            }
            function onCheck(e, treeId, treeNode) {
                var zTree = $.fn.zTree.getZTreeObj("treeFR"), nodes = zTree.getCheckedNodes(true), v = "";
                if (nodes.length > 0) {
                    $input1.attr("value", treeNode.id);
                    $input2.val(treeNode.name);
                }
                else {
                    $input1.attr("value", "");
                    $input2.val('');
                }
            }
            function showMenu() {
                var cityOffset = $input2.offset();
                $("#menuContent").css({
                    left: cityOffset.left + "px", top: cityOffset.top + $input2.outerHeight() + "px"
                }).slideDown("fast");
                $("#menuContent").css({ overflow: 'auto' });
                $("body").bind("mousedown", onBodyDown);
                bShown = true;
            }
            function hideMenu() {
                $("#menuContent").fadeOut("fast");
                $("body").unbind("mousedown", onBodyDown);
                bShown = false;
            }
            function onBodyDown(event) {
                if (!(event.target.id == "btn-sel" || event.target.id == "ProductRegion" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
                    hideMenu();
                }
            }
            $('#btn-sel').click(function (e) {
                showMenu();
            });
            $input2.click(function (e) {
                showMenu();
            });
        })();
        var oVBtn = new tool.BtnSendVaildCode($('#getpaycode'), 30, function () {
            var Money = $("input[name='Money']").val(), GtzCardNumber = $("input[name='GtzCardNumber']").val(), cuMoney = Number($("input[name='cuMoney']").val());
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/sysorders/GetPayCodeForFaceToFace/",
                data: "{'Money':" + Money + ",'cuMoney':" + cuMoney + ",'GtzCardNumber':'" + GtzCardNumber + "'}",
                dataType: 'json',
                success: function (json) {
                    //layer.close(load);
                    if (json.state) {
                        layer.msg(json.msg, 1, 9);
                    }
                    else {
                        layer.msg(json.msg, 1, 8);
                    }
                }
            });
        }, function () {
            if ($.html5Validate.isAllpass($("input[name='Money'],input[name='cuMoney'],input[name='GtzCardNumber']")))
                return true;
            return false;
        });
        //#region 提交
        $("#btn_submit").click(function () {
            var ProductRegion = $("#ProductRegionValue").val(), OrderNote = $("textarea[name='OrderNote']").val(), Money = $("input[name='Money']").val(), GtzCardNumber = $("input[name='GtzCardNumber']").val(), MobileCode = $("input[name='MobileCode']").val(), cuMoney = Number($("input[name='cuMoney']").val());
            if (Number($("#ProductRegionValue").val()) < 1) {
                $('#ProductRegion').testRemind("请选择产品类别");
                return;
            }
            if ($.html5Validate.isAllpass($("input[name='Money'],input[name='cuMoney'],input[name='GtzCardNumber'],input[name='MobileCode']"))) {
                var load = layer.load("提交中...", 10);
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "/sysorders/facetofacesubmit/",
                    data: "{'ProductRegion':" + ProductRegion +
                        ",'OrderNote':'" + OrderNote +
                        "','Money':" + Money +
                        ",'GtzCardNumber':'" + GtzCardNumber +
                        "','MobileCode':'" + MobileCode + "'" +
                        ",'cuMoney':" + cuMoney +
                        "}",
                    dataType: 'json',
                    success: function (json) {
                        layer.close(load);
                        if (json.state == 1) {
                            layer.msg(json.msg, 1, 9);
                            window.location.href = "/sysorders/facetofaceindex";
                        }
                        else {
                            layer.msg(json.msg, 1, 8);
                        }
                    }
                });
            }
        });
        //#endregion
    });
});
