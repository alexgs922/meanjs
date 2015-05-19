(function () {
	var states = function ($stateProvider, $locationProvider) {
		$stateProvider
			.state('eventos', {
				url: '/',
				controller: 'EventosCtrl as vm',
				templateUrl: 'eventos.html'
			})
			.state('not-found', {
				url: '*path',
				templateUrl: 'not-found.html'
			});
	}
	angular.module('logApp').config(states);
}());
