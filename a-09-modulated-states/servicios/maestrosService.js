(function () {

	angular.module('servicios').service('maestros_service', maestrosService);

	function maestrosService() {
		this.categorias = {
			categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
			categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
		};
	}

}());
