define(["require", "exports", 'test/src/add', '../../gz/lib/datetool'], function (require, exports, tool, dTool) {
    "use strict";
    describe("A suite", function () {
        var f;
        beforeEach(function () {
            f = tool.Add;
        });
        it("contains spec with an expectation", function () {
            expect(true).toBe(true);
        });
        it('my test', function () {
            expect(3).toBe(f(1, 4));
        });
        afterEach(function () {
            f = null;
        });
    });
    describe("Date Tool", function () {
        var d = new Date();
        it('format To Date', function () {
            expect('2016-10-19').toBe(dTool.Format(d, "yyyy-MM-dd"));
        });
        it('format To Time', function () {
            expect('2016-10-19').toBe(dTool.Format(d, "HH:mm:ss"));
        });
    });
});
