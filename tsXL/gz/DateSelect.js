function InitSelectDate(id, sExcludeDate, cbChage) {
    $('#' + id).parent().after("\n<div class=\"col-sm-10 col-sm-offset-1\">\n    <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div class=\"btn-group\" role=\"group\" aria-label=\"First group\">\n            <button type=\"button\" class=\"btn btn-xs btn-primary range\">\u9AD8\u7EA7\u9009\u62E9</button>\n        </div>\n        <div class=\"btn-group\" role=\"group\" aria-label=\"Second group\">\n            <button type=\"button\" class=\"btn btn-xs btn-primary btn-clearall\">\u6E05\u9664\u9009\u62E9</button>\n        </div>\n    </div>\n</div>\n");
    var tmlDateStarEnd = "\n<form class=\"form-horizontal\" >\n        <div class=\"form-group\">\n            <div class=\"input-group\">\n                <input type=\"text\" class=\"form-control start \" />\n                <span class=\"input-group-addon\">\u5230</span>\n                <input type=\"text\" class=\"form-control end\" />\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <div class=\"col-xs-3\">\n                <div class=\"checkbox\">\n                    <label>\n                        <input type=\"checkbox\" checked value=\"1\">\u54681\n                    </label>\n                </div>\n\n            </div>\n            <div class=\"col-xs-3\">\n                <div class=\"checkbox\">\n                    <label>\n                        <input type=\"checkbox\" checked value=\"2\">\u54682\n                    </label>\n                </div>\n            </div>\n            <div class=\"col-xs-3\">\n                <div class=\"checkbox\">\n                    <label>\n                        <input type=\"checkbox\" checked value=\"3\">\u54683\n                    </label>\n                </div>\n            </div>\n            <div class=\"col-xs-3\">\n                <div class=\"checkbox\">\n                    <label>\n                        <input type=\"checkbox\" checked value=\"4\">\u54684\n                    </label>\n                </div>\n\n            </div>\n            <div class=\"col-xs-3\">\n                <div class=\"checkbox\">\n                    <label>\n                        <input type=\"checkbox\" checked value=\"5\">\u54685\n                    </label>\n                </div>\n            </div>\n            <div class=\"col-xs-3\">\n                <div class=\"checkbox\">\n                    <label>\n                        <input type=\"checkbox\" checked value=\"6\">\u54686\n                    </label>\n                </div>\n            </div>\n            <div class=\"col-xs-3\">\n                <div class=\"checkbox\">\n                    <label>\n                        <input type=\"checkbox\" checked value=\"0\">\u5468\u65E5\n                    </label>\n                </div>\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <span class=\"col-xs-2 control-label\">\u95F4\u9694\u5929\u6570</span>\n            <div class=\"col-xs-10\">\n                <div class=\"input-group\">\n                    <input type=\"number\" name=\"intervalDay\" class=\"form-control\" value=\"0\" min=\"0\" max=\"60\" maxlength=\"5\">\n                    <span class=\"input-group-addon\">\n                        \u5929\n                    </span>\n                </div>\n            </div>\n\n        </div>\n    </form>\n";
    //$('#tpl-date-range-sel').html();
    var $toolsBar = $('#' + id).parent().next();
    var k = new Kalendae(id, {
        subscribe: {
            'change': function (date) {
                //  $("#DepartureTime").val(this.getSelected())
                var sSelected = this.getSelected();
                cbChage(sSelected);
            }
        },
        months: 3,
        titleFormat: 'YYYY年MM月',
        blackout: sExcludeDate.split(','),
        dateClassMap: { '2016-09-22': 'yzndate' },
        direction: 'future',
        mode: "multiple"
    });
    window['yznK'] = k;
    function getSelectdMinDate() {
        var a = k.getSelectedAsText();
        if (a && a.length > 0) {
            return a[0];
        }
        else {
            return Kalendae.moment().add('day', 1).format('YYYY-MM-DD');
        }
    }
    function getSelectMaxDate() {
        var a = k.getSelectedAsText();
        if (a && a.length > 0) {
            return a[a.length - 1];
        }
        else {
            return Kalendae.moment().add('day', 1).format('YYYY-MM-DD');
        }
    }
    $('button.range', $toolsBar).click(function () {
        var dlg = new BootstrapDialog({
            title: '高级日期选择',
            draggable: true,
            closeByBackdrop: false,
            //size: 'size-small', 
            message: function () {
                var $div = $('<div/>');
                $div.append(tmlDateStarEnd);
                $('input.start', $div).val(getSelectdMinDate());
                $('input.end', $div).val(getSelectMaxDate());
                new Kalendae.Input($('input.start', $div)[0], {
                    direction: 'future'
                });
                new Kalendae.Input($('input.end', $div)[0], {
                    direction: 'future'
                });
                return $div;
            },
            buttons: [
                {
                    label: '确定',
                    action: function () {
                        var d0 = dlg.$modalContent.find('input.start').val();
                        var d1 = dlg.$modalContent.find('input.end').val();
                        var $wks = dlg.$modalContent.find('input[type=checkbox]:checked');
                        var wks = [];
                        $.each($wks, function (i, e) {
                            wks.push(Number($(e).val()));
                        });
                        var dRet = getAllDatesFromRang(d0, d1, wks, Number($('input[name=intervalDay]').val()));
                        k.setSelected('');
                        $.each(dRet, function (i, e) {
                            k.addSelected(e);
                        });
                        dlg.close();
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
        dlg.open();
    });
    function getAllDatesFromRang(d0, d1, weekdays, intervalDay) {
        if (intervalDay === void 0) { intervalDay = 1; }
        var aRet = [];
        try {
            intervalDay = Math.floor(intervalDay) + 1;
        }
        catch (ex) { }
        if (intervalDay < 1)
            intervalDay = 1;
        if (d0 == '' || d1 == '')
            return aRet;
        try {
            var dd0 = Kalendae.moment(d0);
            var dd1 = Kalendae.moment(d1);
            while (dd0.format("YYYYMMDD") <= dd1.format("YYYYMMDD")) {
                var sdd0 = dd0.format('YYYY-MM-DD');
                if (!sExcludeDate.match(sdd0)) {
                    if ($.inArray(dd0.weekday(), weekdays) > -1) {
                        aRet.push(sdd0);
                    }
                }
                dd0.add('day', intervalDay);
            }
        }
        catch (ex) {
            return aRet;
        }
        return aRet;
    }
    $('button.btn-clearall', $toolsBar).click(function () {
        k.setSelected('');
    });
}
