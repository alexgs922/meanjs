(function () {

	angular.module('nuevo', ['ui.router', 'abFiltros', 'abComponentes', 'servicios'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('nuevo', {
					url: '/nuevo',
					template: '<abNuevo></ab-nuevo>'
				})
		})
		.component('abNuevo', {
			templateUrl: './estados/nuevo/nuevo.html',
			controller: function (movimientosService, maestros_service) {
				var vm = this;
				vm.maestros = maestros_service.categorias;
				vm.nuevoMovimiento = {
					esIngreso: 1,
					esGasto: 0,
					importe: 0,
					fecha: new Date()
				};
				vm.guardarMovimiento = function () {
					var auxCopyMov = angular.copy(vm.nuevoMovimiento);
					movimientosService.postMovimiento(auxCopyMov);
					vm.nuevoMovimiento.importe = 0;
				}
			}
		})

}());
