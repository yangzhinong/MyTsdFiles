namespace GZDATE {
    export function InitSelectDate(id: string, sExcludeDate: string, cbChage: (sels: string) => void) {

        var $formGroup = $('#' + id).closest("div.form-group");
        var $divParent = $('#' + id).parent();
        var colParenWidth = Number($divParent.attr("class").match(/col-[a-z]{2}-([0-9]{1,2})/)[1]);
        var colLabeWidth = Number($divParent.prev().attr("class").match(/col-[a-z]{2}-([0-9]{1,2})/)[1]);
         $formGroup.append(`
<div class="col-sm-${colParenWidth} col-sm-offset-${colLabeWidth}">
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group" role="group" aria-label="First group">
            <button type="button" class="btn btn-xs btn-primary range">高级选择</button>
        </div>
        <div class="btn-group" role="group" aria-label="Second group">
            <button type="button" class="btn btn-xs btn-primary btn-clearall">清除选择</button>
        </div>
    </div>
</div>
`);
        var tmlDateStarEnd = `
<form class="form-horizontal" >
        <div class="form-group">
            <div class="input-group">
                <input type="text" class="form-control start " />
                <span class="input-group-addon">到</span>
                <input type="text" class="form-control end" />
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-3">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" checked value="1">周1
                    </label>
                </div>
            </div>
            <div class="col-xs-3">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" checked value="2">周2
                    </label>
                </div>
            </div>
            <div class="col-xs-3">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" checked value="3">周3
                    </label>
                </div>
            </div>
            <div class="col-xs-3">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" checked value="4">周4
                    </label>
                </div>
            </div>
            <div class="col-xs-3">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" checked value="5">周5
                    </label>
                </div>
            </div>
            <div class="col-xs-3">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" checked value="6">周6
                    </label>
                </div>
            </div>
            <div class="col-xs-3">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" checked value="0">周日
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <span class="col-xs-2 control-label">间隔天数</span>
            <div class="col-xs-10">
                <div class="input-group">
                    <input type="number" name="intervalDay" class="form-control" value="0" min="0" max="60" maxlength="5">
                    <span class="input-group-addon">
                        天
                    </span>
                </div>
            </div>
        </div>
    </form>
`;
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
        //window['yznK'] = k;
        function getSelectdMinDate() {
            var a = k.getSelectedAsText();
            if (a && a.length > 0) {
                return a[0];
            } else {
                return Kalendae.moment().add('day', 1).format('YYYY-MM-DD');
            }
        }
        function getSelectMaxDate() {
            var a = k.getSelectedAsText();
            if (a && a.length > 0) {
                return a[a.length - 1];
            } else {
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
                        cssClass:'btn btn-primary',
                        action: function () {
                            var d0 = dlg.$modalContent.find('input.start').val();
                            var d1 = dlg.$modalContent.find('input.end').val();
                            var $wks = dlg.$modalContent.find('input[type=checkbox]:checked');
                            var wks: number[] = [];
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
        function getAllDatesFromRang(d0: string, d1: string, weekdays: number[], intervalDay: number = 1) {
            let aRet: string[] = [];
            try {
                intervalDay = Math.floor(intervalDay) + 1;
            } catch (ex) { }
            if (intervalDay < 1) intervalDay = 1;
            if (d0 == '' || d1 == '') return aRet;
            try {
                var dd0: moment.Moment = Kalendae.moment(d0);
                var dd1: moment.Moment = Kalendae.moment(d1);
                var sToday: string= Kalendae.moment().format("YYYY-MM-DD");
                while (dd0.format("YYYYMMDD") <= dd1.format("YYYYMMDD")) {
                    var sdd0 = dd0.format('YYYY-MM-DD');
                    if (sdd0> sToday &&  !sExcludeDate.match(sdd0)) {
                        if ($.inArray(dd0.weekday(), weekdays) > -1) {
                            aRet.push(sdd0);
                        }
                    }
                    dd0.add('day', intervalDay)
                }
            } catch (ex) {
                return aRet;
            }
            return aRet;
        }
        $('button.btn-clearall', $toolsBar).click(function () {
            k.setSelected('');
        });
    }
}
 