var aBayApp = angular.module('aBay', ['firebase']);

aBayApp.controller('pujasCtrl', function ($scope, $firebase) {
    var dataRef = new Firebase("https://angularBay.firebaseio.com/data");
    $scope.data  =  $firebase(dataRef);
    
    $scope.data.pujas = [];
    $scope.guardar = function()
    {
        console.log("hola");
        $scope.data.pujas.push({email:$scope.email, puja:$scope.puja});
        $scope.data.$save();
    }
});