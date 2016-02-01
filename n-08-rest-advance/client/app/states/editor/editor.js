"use strict";
(function () {
	var componentName = "editor";
	angular
		.module(componentName, ['ui.router', 'ngResource', 'abDirectivas', 'abValoracion', 'abCabecera'])
		.config(stateConfig)
		.directive(componentName, directive)
		.service("servicio_" + componentName, service)

	function stateConfig($stateProvider) {
		$stateProvider
			.state(componentName, {
				url: '/' + componentName + "/:id",
				template: '<' + componentName + '></' + componentName + '>'
			});
	}

	function directive() {
		return {
			templateUrl: 'app/states/' + componentName + '/' + componentName + '.html',
			controller: controller,
			controllerAs: componentName,
			bindToController: true,
			scope: {}
		}
	}

	function controller(servicio_editor, $state, $stateParams) {
		var vm = this;

		var paramId = $stateParams.id;

		servicio_editor.Movimientos.get({
			id: paramId
		}).$promise.then(function (data) {
			var milliseconds = Date.parse(data.fecha)
			if (!isNaN(milliseconds)) {
				data.fecha = new Date(milliseconds);
			}
			vm.movimiento = data;
		});


		vm.actualizar = function () {
			console.log(JSON.stringify(vm.movimiento));
			vm.movimiento.$save()
				.then(function (result) {
					$state.go('lista');
				});
		};
	}

	function service($resource) {
		this.Movimientos =  $resource("/api/priv/movimientos/:id", {
			id: "@id"
		});
	}
})();
