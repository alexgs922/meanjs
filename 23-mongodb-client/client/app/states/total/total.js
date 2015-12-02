
"use strict";
(function () {
    var componentName = "total";
    angular
        .module(componentName, ['ui.router', 'ngResource', 'abCabecera'])
        .config(stateConfig)
        .directive(componentName, directive)
        .service("servicio_"+componentName, service)

    function stateConfig($stateProvider) {
        $stateProvider
            .state(componentName, {
                url: '/' + componentName,
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

    function controller(servicio_total) {
        var vm = this;
        vm.total = {
			ingresos: 0,
			gastos: 0
		};
        servicio_total.Total.query().$promise.then(function (result) {
            //var result = [{"_id":{"tipo":"Gasto"},"total":234},{"_id":{"tipo":"Ingreso"},"total":4322}];
            result.forEach(function(element) {
                if(element._id.tipo==="Ingreso"){
                    vm.total.ingresos = element.total;
                }
                else{
                    vm.total.gastos = element.total;
                }
            });
        });

        vm.balance = function () {
			return vm.total.ingresos - vm.total.gastos
		}
    }

    function service($resource) {
        this.Total = $resource("/api/priv/total/");
    }
})();
