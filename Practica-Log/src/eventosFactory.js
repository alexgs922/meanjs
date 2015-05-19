(function () {
    var eventosFactory = function ($http) {
        var factory  =   {};
		factory.gettingEventos =   function ()  {
            return $http.get('/Practica-Log/src/logs.json');
        };
		return factory;
    }
    angular.module('logApp').factory('eventosFactory',eventosFactory);
}());
