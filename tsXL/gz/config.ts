require.config({
    ////appDir: "/js/gz/",
    // baseUrl: './',
    urlArgs: 'v=20161130',
    paths: {
        "bootstrap-dialog": "../bootstrap-dialog",
        jquery: '../jquery-1.8.2.min',
        bootstrap: '../bootstrap.min'
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        "bootstrap-dialog": {
            deps: ["jquery", "bootstrap"]
        },
        'plugins\chosen': {
            deps: ['jquery'],
            exports: 'jQuery.fn.chosen'
        }
    }
});
define('jquery', [], function () {
    return jQuery;
});
define('bootstrap', [], function () {
    return null;
});
