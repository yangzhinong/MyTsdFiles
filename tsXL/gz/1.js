var dlg = new BootstrapDialog({
    title: 'hello',
    message: 'afafa'
});
var opt;
opt.data = [
    { id: 5, name: 'yzn' }
];
dlg.open();
var x = $.map([{ id: 5, name: 'yzn' }, { id: 1, name: 'qq' }], function (e, i) {
    return e.id;
});
console.log(x);
$.makeArray;
