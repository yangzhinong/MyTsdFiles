﻿

var head = document.getElementsByTagName('head')[0];

export function loadCss(url: string) {
    if (url.substr(-4).toLowerCase() != '.css') {
        url = url + '.css';
    }

     url= require.toUrl(url);
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


var engine = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/) || 0;

// use <style> @import load method (IE < 9, Firefox < 18)
var useImportLoad = false;

// set to false for explicit <link> load checking when onload doesn't work perfectly (webkit)
var useOnload = true;

// trident / msie
if (engine[1] || engine[7])
    useImportLoad = parseInt(engine[1]) < 6 || parseInt(engine[7]) <= 9;
// webkit
else if (engine[2] || engine[8])
    useOnload = false;
// gecko
else if (engine[4])
    useImportLoad = parseInt(engine[4]) < 18;


// <style> @import load method
var curStyle, curSheet;
var createStyle = function () {
    curStyle = document.createElement('style');
    head.appendChild(curStyle);
    curSheet = curStyle.styleSheet || curStyle.sheet;
}
var ieCnt = 0;
var ieLoads = [];
var ieCurCallback;

var createIeLoad = function (url) {
    curSheet.addImport(url);
    curStyle.onload = function () { processIeLoad() };

    ieCnt++;
    if (ieCnt == 31) {
        createStyle();
        ieCnt = 0;
    }
}
var processIeLoad = function () {
    ieCurCallback();

    var nextLoad = ieLoads.shift();

    if (!nextLoad) {
        ieCurCallback = null;
        return;
    }

    ieCurCallback = nextLoad[1];
    createIeLoad(nextLoad[0]);
}
var importLoad = function (url, callback?) {
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
            } catch (e) { }
        }, 10);
    }
}



// <link> load method
var linkLoad = function (url, callback?) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    if (useOnload)
        link.onload = function () {
            link.onload = function () { };
            // for style dimensions queries, a short delay can still be necessary
            setTimeout(callback, 7);
        }
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
}
