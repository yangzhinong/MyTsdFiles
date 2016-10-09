import * as tool from 'test/src/add';


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