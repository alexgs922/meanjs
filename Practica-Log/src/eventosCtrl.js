(function () {
    var eventosCtrl = function (eventosFactory) {
		var vm = this;
        eventosFactory.gettingEventos()
			.success(function(response){
			vm.eventos=response;
		})
    }
    angular.module('logApp').controller('EventosCtrl',eventosCtrl);
}());
