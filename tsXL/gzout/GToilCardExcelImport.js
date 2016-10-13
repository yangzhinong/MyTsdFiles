define('lib/loadcss',["require", "exports"], function (require, exports) {
    "use strict";
    var head = document.getElementsByTagName('head')[0];
    function loadCss(url) {
        if (url.substr(-4).toLowerCase() != '.css') {
            url = url + '.css';
        }
        if (url.substr(0, 1) != '/') {
            var myBaseCssPath = "/js/gz/lib/css/";
            url = myBaseCssPath + url;
        }
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
    cssTool.loadCss('fileUploadBeatutify.css');
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

define('GToilCardExcelImport',["require", "exports", 'lib/fileUploadBeatutify'], function (require, exports, fileTool) {
    "use strict";
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
    });
});

