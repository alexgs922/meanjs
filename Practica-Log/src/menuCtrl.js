(function () {
    var menuCtrl = function ($state) {
        this.isActive = function (estado) {
			return $state.is(estado);
        }
    }
    angular.module('logApp').controller('MenuCtrl',menuCtrl);
}());
