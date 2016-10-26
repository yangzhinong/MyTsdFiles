var hjs = History;
var x = ['', { dd: 5 }, 4];
_.filter(x, function (e, k) {
});
function tests() {
    if (!hjs.enabled)
        return false;
    hjs.Adapter.bind(window, 'staechange', function () {
        var state = hjs.getState();
        hjs.log(state.data, state.title, state.url);
    });
    hjs.pushState({ s: 1 }, '', "?state=1");
}
