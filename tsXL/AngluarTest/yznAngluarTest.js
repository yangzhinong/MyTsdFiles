angular.module("myModule", [])
    .controller("myController", function ($scope) {
    $scope.message = "Hello Angluar";
    var employee = {
        firstName: 'Daviad',
        lastName: 'Hastings',
        gender: 'Males'
    };
    $scope.employee = employee;
    var country = {
        name: 'USA',
        capital: 'Washington, D.C.',
        flag: "./images/19.png"
    };
    $scope.country = country;
});
