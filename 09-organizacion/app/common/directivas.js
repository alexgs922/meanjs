(function () {

	//cambios en las rutas relativas de las plantillas

	angular.module('abDirectivas', [])
		.directive('abSeleccionado', seleccionado)
		.directive('input', seleccionado)
		.directive('abPlugin', plugin);


	function seleccionado() {
		return {
			link: function (scope, element, attrs) {
				element.bind('mouseenter', function () {
					element.css('background-color', 'yellow');
				});
				element.bind('mouseleave', function () {
					element.css('background-color', 'white');
				});
			}
		};
	}

	function plugin() {
		return {
			link: function (scope, element, attrs) {


				var init = scope.$eval(attrs.ngModel);
				var min = scope.$eval(attrs.abPlugInMin);
				var max = scope.$eval(attrs.abPlugInMax);

				element.pluginInitMethod({
					value: init,
					min: min,
					max: max,
					tooltip: 'hide'
				});

				scope.$watch(attrs.ngModel, function (valor) {
					element.pluginMethod('setValue', valor);
				});

				element.on('plugin_event', function (evento) {
					scope.$apply(function () {
						scope[attrs.ngModel] = evento.value;
					});
				});
			}
		}
	}


}());