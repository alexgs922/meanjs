(function () {

	angular.module('total', ['ui.router', 'abFiltros', 'abComponentes', 'servicios'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('total', {
					url: '/',
					template: '<ab-total></ab-total>'
				})
		})
		.component('abTotal', {
			templateUrl: './estados/total/total.html',
			controller: function (movimientosService) {
				var vm = this;
				movimientosService.gettingTotal()
					.then(function (result) {
						vm.total = result.data;
					})
			}
		})

}());
