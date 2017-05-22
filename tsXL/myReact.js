/// <reference path="typings/react/react-global.d.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer() {
            _super.apply(this, arguments);
        }
        Layer.prototype.render = function () {
            return (React.createElement("div", null));
        };
        return Layer;
    }(React.Component));
    exports.Layer = Layer;
    var app = document.getElementById("app");
    ReactDOM.render(React.createElement(Layer, null), app);
});
//# sourceMappingURL=myReact.js.map