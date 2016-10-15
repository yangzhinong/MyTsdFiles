import * as cssTool from 'lib/loadcss';
import * as vb from 'lib/vbstring';

(function () {

    $('#test').text("hello world");

    cssTool.loadCss('/lib/css/5.css');
    console.log(vb.left('hello', 2));
} ());