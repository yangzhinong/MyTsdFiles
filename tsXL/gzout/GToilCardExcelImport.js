define('lib/loadcss',["require", "exports"], function (require, exports) {
    "use strict";
    var head = document.getElementsByTagName('head')[0];
    function loadCss(url) {
        if (url.substr(-4).toLowerCase() != '.css') {
            url = url + '.css';
        }
        url = require.toUrl(url);
        //if (url.substr(0, 1) != '/') {
        //    var myBaseCssPath = "/js/gz/lib/css/";
        //    url = myBaseCssPath + url;
        //}
        if ($('link[href="' + url + '"]', $(head)).length == 0) {
            if (useImportLoad)
                importLoad(url, function () { });
            else
                linkLoad(url, function () { });
        }
    }
    exports.loadCss = loadCss;
    var engine = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/) || 0;
    // use <style> @import load method (IE < 9, Firefox < 18)
    var useImportLoad = false;
    // set to false for explicit <link> load checking when onload doesn't work perfectly (webkit)
    var useOnload = true;
    // trident / msie
    if (engine[1] || engine[7])
        useImportLoad = parseInt(engine[1]) < 6 || parseInt(engine[7]) <= 9;
    else if (engine[2] || engine[8])
        useOnload = false;
    else if (engine[4])
        useImportLoad = parseInt(engine[4]) < 18;
    // <style> @import load method
    var curStyle, curSheet;
    var createStyle = function () {
        curStyle = document.createElement('style');
        head.appendChild(curStyle);
        curSheet = curStyle.styleSheet || curStyle.sheet;
    };
    var ieCnt = 0;
    var ieLoads = [];
    var ieCurCallback;
    var createIeLoad = function (url) {
        curSheet.addImport(url);
        curStyle.onload = function () { processIeLoad(); };
        ieCnt++;
        if (ieCnt == 31) {
            createStyle();
            ieCnt = 0;
        }
    };
    var processIeLoad = function () {
        ieCurCallback();
        var nextLoad = ieLoads.shift();
        if (!nextLoad) {
            ieCurCallback = null;
            return;
        }
        ieCurCallback = nextLoad[1];
        createIeLoad(nextLoad[0]);
    };
    var importLoad = function (url, callback) {
        if (!curSheet || !curSheet.addImport)
            createStyle();
        if (curSheet && curSheet.addImport) {
            // old IE
            if (ieCurCallback) {
                ieLoads.push([url, callback]);
            }
            else {
                createIeLoad(url);
                ieCurCallback = callback;
            }
        }
        else {
            // old Firefox
            curStyle.textContent = '@import "' + url + '";';
            var loadInterval = setInterval(function () {
                try {
                    curStyle.sheet.cssRules;
                    clearInterval(loadInterval);
                    callback();
                }
                catch (e) { }
            }, 10);
        }
    };
    // <link> load method
    var linkLoad = function (url, callback) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        if (useOnload)
            link.onload = function () {
                link.onload = function () { };
                // for style dimensions queries, a short delay can still be necessary
                setTimeout(callback, 7);
            };
        else
            var loadInterval = setInterval(function () {
                for (var i = 0; i < document.styleSheets.length; i++) {
                    var sheet = document.styleSheets[i];
                    if (sheet.href == link.href) {
                        clearInterval(loadInterval);
                        return callback();
                    }
                }
            }, 10);
        link.href = url;
        head.appendChild(link);
    };
});

define('lib/fileUploadBeatutify',["require", "exports", 'lib/loadcss'], function (require, exports, cssTool) {
    "use strict";
    cssTool.loadCss('lib/css/fileUploadBeatutify.css');
    function initFileBtn($inputs, uploadBtnText) {
        //<input type="file" name="file6" id="file6"  data-multiple-caption="{count} files selected" multiple />
        var htmlLable = '<label for="file"><span></span><strong><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg> ' +
            uploadBtnText + '&hellip;</strong></label> "';
        $inputs.each(function (i, input) {
            var $input = $(input), $label = $(htmlLable), labelVal = $label.html();
            $label.attr("for", $input.attr("name"));
            $input.after($label);
            $input.parent().addClass("js");
            $input.addClass("inputfile").addClass("inputfile-6");
            $input.on('change', function (e) {
                var fileName = '';
                if (this.files && this.files.length > 1)
                    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                else if (e.target.value)
                    fileName = e.target.value.split('\\').pop();
                if (fileName)
                    $label.find('span').html(fileName);
                else
                    $label.html(labelVal);
            });
            // Firefox bug fix
            $input
                .on('focus', function () { $input.addClass('has-focus'); })
                .on('blur', function () { $input.removeClass('has-focus'); });
        });
    }
    exports.initFileBtn = initFileBtn;
});

define('lib/oilcardselectdlg',["require", "exports"], function (require, exports) {
    "use strict";
    function SelectGtOilCardToOperate(opt) {
        var dlg = new BootstrapDialog({
            draggable: true,
            title: opt.DlgTitle,
            cssClass: 'recharge',
            message: function () {
                var $div = $('<div/>');
                $div.append(opt.DlgTemplate);
                var $table = $div.find('table');
                var fAddSels = function (newSels) {
                    var lst = dlg.getData('yzn') || [];
                    $.each(newSels, function (i, e) {
                        if ($.inArray(e.cardno, lst) < 0) {
                            lst.push(e.cardno);
                        }
                    });
                    dlg.setData('yzn', lst);
                    $div.find('#cardnos').text(lst.join(' , '));
                    $div.find('#lbl-cardnos').text(lst.length);
                    if (lst.length > 100) {
                        layer.alert("你选择了 " + lst.length.toString() + ' 张卡! (最多只能选择100张)');
                    }
                };
                var fDelSels = function (delSels) {
                    var lst = dlg.getData('yzn') || [];
                    $.each(delSels, function (i, e) {
                        var ix = $.inArray(e.cardno, lst);
                        if (ix > -1) {
                            lst.splice(ix, 1);
                        }
                    });
                    dlg.setData('yzn', lst);
                    $div.find('#lbl-cardnos').text(lst.length);
                    $div.find('#cardnos').text(lst.join(' , '));
                };
                $div.find('#btn-clearall').click(function () {
                    var lst = [];
                    dlg.setData('yzn', lst);
                    $div.find('#cardnos').text('');
                    $table.bootstrapTable('uncheckAll');
                });
                $div.find('#btn-ok').click(function () {
                    var $btn = $(this);
                    $btn.enable(false);
                    var $frm = $(this).closest('form');
                    if ($.html5Validate.isAllpass($frm)) {
                        var lst = dlg.getData('yzn') || [];
                        if (lst.length > 100) {
                            layer.alert("你选择了 " + lst.length.toString() + ' 张卡! 请减少申请卡数(最多只能选择100张)');
                            $btn.enable(true);
                            return;
                        }
                        layer.load('正在处理...');
                        $.post(opt.urlOperate, $frm.serialize(), function (data) {
                            $btn.enable(true);
                            layer.closeAll();
                            if (data.code) {
                                dlg.close();
                                layer.msg(data.msg, 3, 9 /* SmillingFace */, function () {
                                    location.href = opt.urlOpSucessRefresh;
                                });
                            }
                            else {
                                layer.alert(data.msg, 8 /* CryingFace */);
                            }
                        });
                    }
                    $btn.enable(true);
                });
                $table.bootstrapTable({
                    ajax: function (param) {
                        console.log(param.data);
                        $.post(opt.urlLoadCardPage, param.data, function (data) {
                            var lst = dlg.getData('yzn') || [];
                            if (lst.length > 0) {
                                $.each(data.rows, function (i, e) {
                                    if ($.inArray(e.cardno, lst) > -1) {
                                        e.state = true;
                                    }
                                });
                            }
                            param.success({
                                total: data.total,
                                rows: data.rows
                            });
                        });
                    },
                    onClickCell: function (field, value, row, $element) {
                    },
                    onCheck: function (row) {
                        console.log('onCheck');
                        fAddSels([row]);
                        console.log(row);
                    },
                    onUncheck: function (row) {
                        console.log('onUncheck');
                        fDelSels([row]);
                        console.log(row);
                    },
                    onCheckAll: function (rows) {
                        console.log('onCheckAll');
                        fAddSels(rows);
                        console.log(rows);
                    },
                    onUncheckAll: function (rows) {
                        fDelSels(rows);
                        console.log('onUncheckAll');
                        console.log(rows);
                    },
                    onLoadSuccess: function (data) {
                        console.log('onLoadSuccess');
                        console.log(data);
                    }
                });
                $div.find('#button').click(function () {
                    alert('getAllSelections: ' + JSON.stringify($table.bootstrapTable('getAllSelections')));
                });
                dlg.open();
                return $div;
            },
            onshown: function () {
                var $table = dlg.$modalBody.find('table');
                $table.bootstrapTable('resetView');
            }
        });
        dlg.realize();
    }
    exports.SelectGtOilCardToOperate = SelectGtOilCardToOperate;
});

define('lib/dlgPrompt',["require", "exports"], function (require, exports) {
    "use strict";
    function Prompt(initValue, title, FnOK) {
        var dlg = new BootstrapDialog({
            title: title,
            draggable: true,
            closeByBackdrop: false,
            message: function () {
                var $div = $('<div/>');
                $div.append('<textarea  style="height:100px;" id="x-val"></textarea>');
                $div.find('#x-val').val(initValue);
                return $div;
            },
            size: 'size-small',
            buttons: [
                {
                    label: '确定',
                    cssClass: 'btn btn-primary',
                    action: function () {
                        var $btn = this;
                        $btn.enable(false);
                        FnOK($btn, dlg.$modalBody.find('#x-val').val());
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
        dlg.open();
    }
    exports.Prompt = Prompt;
});

define('lib/datetool',["require", "exports"], function (require, exports) {
    "use strict";
    function aspDateToJsDate(s) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(s);
        var dt = new Date(parseFloat(results[1]));
        return dt;
    }
    exports.aspDateToJsDate = aspDateToJsDate;
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    // 例子： 
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
    function Format(d, fmt) {
        fmt = fmt.replace('HH', 'hh');
        //fmt = fmt.replace('DD', 'dd');
        var o = {
            "M+": d.getMonth() + 1,
            "d+": d.getDate(),
            "h+": d.getHours(),
            "m+": d.getMinutes(),
            "s+": d.getSeconds(),
            "q+": Math.floor((d.getMonth() + 3) / 3),
            "S": d.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    exports.Format = Format;
    function FormatToDate(d) {
        return Format(d, "yyyy-MM-dd");
    }
    exports.FormatToDate = FormatToDate;
    function FormatToDateDot(d) {
        return Format(d, "yyyy.MM.dd");
    }
    exports.FormatToDateDot = FormatToDateDot;
    function FormatToDateAndMinute(d) {
        return Format(d, "yyyy.MM.dd HH:mm");
    }
    exports.FormatToDateAndMinute = FormatToDateAndMinute;
    function FormatToMinute(d) {
        return Format(d, "HH:mm");
    }
    exports.FormatToMinute = FormatToMinute;
});

define('GtoilCardRechargeApply',["require", "exports", 'lib/dlgPrompt', 'lib/datetool'], function (require, exports, dlgtool, datetool) {
    "use strict";
    $(document).ready(function () {
        $('#btn-recharge-apply').click(function () {
            var dlg = new BootstrapDialog({
                draggable: true,
                title: '国通石油卡充值申请',
                cssClass: 'recharge',
                message: function () {
                    var $div = $('<div/>');
                    $div.append($('#tpl-recharge-apply').html());
                    var $table = $div.find('table');
                    var fAddSels = function (newSels) {
                        var lst = dlg.getData('yzn') || [];
                        $.each(newSels, function (i, e) {
                            if ($.inArray(e.cardno, lst) < 0) {
                                lst.push(e.cardno);
                            }
                        });
                        dlg.setData('yzn', lst);
                        $div.find('#cardnos').text(lst.join(' , '));
                        $div.find('#lbl-cardnos').text(lst.length);
                        if (lst.length > 100) {
                            layer.alert("你选择了 " + lst.length.toString() + ' 张卡! (最多只能选择100张)');
                        }
                    };
                    var fDelSels = function (delSels) {
                        var lst = dlg.getData('yzn') || [];
                        $.each(delSels, function (i, e) {
                            var ix = $.inArray(e.cardno, lst);
                            if (ix > -1) {
                                lst.splice(ix, 1);
                            }
                        });
                        dlg.setData('yzn', lst);
                        $div.find('#lbl-cardnos').text(lst.length);
                        $div.find('#cardnos').text(lst.join(' , '));
                    };
                    $div.find('#btn-clearall').click(function () {
                        var lst = [];
                        dlg.setData('yzn', lst);
                        $div.find('#cardnos').text('');
                        $table.bootstrapTable('uncheckAll');
                    });
                    $div.find('#btn-ok').click(function () {
                        var $btn = $(this);
                        $btn.enable(false);
                        var $frm = $(this).closest('form');
                        if ($.html5Validate.isAllpass($frm)) {
                            var lst = dlg.getData('yzn') || [];
                            if (lst.length > 100) {
                                layer.alert("你选择了 " + lst.length.toString() + ' 张卡! 请减少申请卡数(最多只能选择100张)');
                                $btn.enable(true);
                                return;
                            }
                            layer.load('正在处理...');
                            $.post('/GTOilCard/RechargeApply', $frm.serialize(), function (data) {
                                $btn.enable(true);
                                layer.closeAll();
                                if (data.code) {
                                    dlg.close();
                                    layer.msg('申请成功', 3, 9 /* SmillingFace */, function () {
                                        location.href = "/GTOilCard/RechargeApplyList";
                                    });
                                }
                                else {
                                    layer.alert(data.msg, 8 /* CryingFace */);
                                }
                            });
                        }
                        $btn.enable(true);
                    });
                    $table.bootstrapTable({
                        ajax: function (param) {
                            console.log(param.data);
                            $.post('/GTOilCard/CardListForAPage', param.data, function (data) {
                                var lst = dlg.getData('yzn') || [];
                                if (lst.length > 0) {
                                    $.each(data.rows, function (i, e) {
                                        if ($.inArray(e.cardno, lst) > -1) {
                                            e.state = true;
                                        }
                                    });
                                }
                                param.success({
                                    total: data.total,
                                    rows: data.rows
                                });
                            });
                        },
                        onClickCell: function (field, value, row, $element) {
                        },
                        onCheck: function (row) {
                            console.log('onCheck');
                            fAddSels([row]);
                            console.log(row);
                        },
                        onUncheck: function (row) {
                            console.log('onUncheck');
                            fDelSels([row]);
                            console.log(row);
                        },
                        onCheckAll: function (rows) {
                            console.log('onCheckAll');
                            fAddSels(rows);
                            console.log(rows);
                        },
                        onUncheckAll: function (rows) {
                            fDelSels(rows);
                            console.log('onUncheckAll');
                            console.log(rows);
                        },
                        onLoadSuccess: function (data) {
                            console.log('onLoadSuccess');
                            console.log(data);
                        }
                    });
                    $div.find('#button').click(function () {
                        alert('getAllSelections: ' + JSON.stringify($table.bootstrapTable('getAllSelections')));
                    });
                    dlg.open();
                    return $div;
                },
                onshown: function () {
                    var $table = dlg.$modalBody.find('table');
                    $table.bootstrapTable('resetView');
                }
            });
            dlg.realize();
        });
        $('a.apply-audit').click(function () {
            var $me = $(this);
            var applyId = $me.attr("data-apply-id");
            var $tr = $me.closest('tr');
            var applyData = {
                applynote: $tr.find('td.applynote').text(),
                price: $tr.find('td.price').text(),
                qty: $me.attr('data-apply-qty'),
                applytime: $tr.find('td.applaytime').text(),
                cardnos: $('td.qty', $tr).attr('data-cardnos')
            };
            var fbtnOk = function () {
                var $me = $(this);
                $me.enable(false);
                var $frm = $me.closest('form');
                if (!$.html5Validate.isAllpass($frm)) {
                    $me.enable(true);
                    return;
                }
                var postData = $frm.serialize() + '&applyid=' + applyId;
                console.log(postData);
                layer.load('正在处理...');
                $.post('/GTOilCard/RechargeAudit', postData, function (data) {
                    if (data.code) {
                        dlg.close();
                        layer.closeAll();
                        layer.msg(data.msg, 3, 9 /* SmillingFace */, function () {
                            window.location.reload();
                        });
                    }
                    else {
                        layer.closeAll();
                        layer.alert(data.msg, 8 /* CryingFace */);
                        $me.enable(true);
                    }
                });
            };
            var dlg = new BootstrapDialog({
                title: '充值申请审核',
                draggable: true,
                message: function () {
                    var $div = $('<div/>');
                    $div.append($('#tpl-recharge-audit').html());
                    $('#btn-cancel', $div).click(function () {
                        dlg.close();
                    });
                    $('#btn-ok', $div).click(fbtnOk);
                    $div.find("#applytime").text(applyData.applytime);
                    $div.find("#applynote").text(applyData.applynote);
                    $div.find('#price').val(applyData.price);
                    $div.find('#lbl-cardnos').text(applyData.qty);
                    $div.find('#cardnos').text(applyData.cardnos);
                    dlg.open();
                    return $div;
                }
            });
            dlg.realize();
        });
        $('button.btn-manual-recharge').click(function () {
            var $btn = $(this);
            $btn.enable(false);
            layer.load("正在处理");
            $.post("/GTOilCard/ManualRechargeForErrorRecordLog", { logId: $btn.closest('tr').attr("data-id") }, function (data) {
                layer.closeAll();
                if (data.code) {
                    layer.msg(data.msg, 3, 9 /* SmillingFace */, function () {
                        $btn.closest('tr').find('td.status').html('<label class="label label-primary">充值成功</label>');
                        $btn.remove();
                        // location.reload();
                    });
                }
                else {
                    layer.alert(data.msg, 8 /* CryingFace */);
                    $btn.enable(true);
                }
            });
        });
        $('button.btn-send-mail').click(function () {
            var $me = $(this);
            var $tr = $me.closest('tr');
            var weLogNo = $me.attr("data-out-trade-no");
            var gLogId = $tr.attr("data-id");
            $me.enable(false);
            setTimeout(function () { $me.enable(true); }, 100);
            dlgtool.Prompt('', '请输入邮寄信息', function ($dlgOkBtn, val) {
                $.post("/GTOilCard/SendMail", { weLogNo: weLogNo, gLogId: gLogId, note: val }, function (data) {
                    if (data.code) {
                        layer.msg(data.msg, 3, 9 /* SmillingFace */);
                        $me.remove();
                        var dnow = datetool.Format(new Date(), 'yyyy.MM.dd HH:mm');
                        var dHtml = "<label class=\"label label-primary\">\u5DF2\u5BC4\u51FA</label><br/>" + dnow;
                        $tr.find('td.issendmail').html(dHtml);
                        $tr.find('td.mailremark').html(val);
                    }
                    else {
                        layer.alert(data.msg, 8 /* CryingFace */);
                    }
                });
            });
        });
    });
    function Init() {
    }
    exports.Init = Init;
});

define('GToilCardExcelImport',["require", "exports", 'lib/fileUploadBeatutify', 'lib/oilcardselectdlg', 'GtoilCardRechargeApply'], function (require, exports, fileTool, cardSelTool, apply) {
    "use strict";
    apply.Init();
    $(document).ready(function () {
        $('#btn-import-excel').click(function () {
            var dlg = new BootstrapDialog({
                title: '导入石油卡 - Excel方式',
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
                            var $btn = this;
                            $btn.disable();
                            layer.load("正在处理...");
                            var $frm = dlg.$modalBody.find('form');
                            $.ajax({
                                url: '/GTOilCard/importExcel',
                                type: 'POST',
                                cache: false,
                                data: new FormData($frm[0]),
                                processData: false,
                                contentType: false
                            }).done(function (data) {
                                layer.closeAll();
                                $btn.enable();
                                if (data.code) {
                                    layer.alert("导入成功!", 9 /* SmillingFace */);
                                    window.location.reload();
                                }
                                else {
                                    layer.alert(data.msg, 8 /* CryingFace */);
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
        $('#btn-sale').click(function () {
            cardSelTool.SelectGtOilCardToOperate({
                urlOperate: '/GTOilCard/sale',
                urlOpSucessRefresh: '/GTOilCard/Index',
                urlLoadCardPage: '/GTOilCard/CardListForAPage?nosaled=true',
                DlgTemplate: $('#tpl-sale').html(),
                DlgTitle: '国通石油卡出售'
            });
        });
    });
});

