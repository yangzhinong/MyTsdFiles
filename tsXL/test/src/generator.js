var ThomasArdal;
(function (ThomasArdal) {
    var StringGenerator = (function () {
        function StringGenerator() {
        }
        StringGenerator.prototype.generate = function (input) {
            return input + ": Hello World";
        };
        return StringGenerator;
    }());
    ThomasArdal.StringGenerator = StringGenerator;
})(ThomasArdal || (ThomasArdal = {}));
