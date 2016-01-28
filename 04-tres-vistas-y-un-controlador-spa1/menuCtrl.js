(function () {
    var menuCtrl = function ($location) {
        this.soyLaRutaActiva = function (ruta) {
            return ruta === $location.path();
        }
    }
    angular.module('cashFlow').controller('MenuCtrl',menuCtrl);
}());
