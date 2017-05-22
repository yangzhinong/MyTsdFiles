define(["require", "exports", "../src/add"], function (require, exports, tool) {
    "use strict";
    test("AnIntroductory", function () {
        // Fixture set
        var sut = 1;
        // Exercise system                
        var expectedNumber = sut;
        // Verify outcome
        equal(1, expectedNumber);
        equal(2, expectedNumber);
        var x = tool.Add(1, 2);
        equal(3, x);
        // Teardown        
    });
});
//# sourceMappingURL=Test.js.map