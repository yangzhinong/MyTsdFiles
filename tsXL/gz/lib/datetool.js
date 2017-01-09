define(["require", "exports"], function (require, exports) {
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
