angular.module('cashFlow').config(function ($stateProvider) {
	$stateProvider
		.state('not-found', {
			url: '*path',
			templateUrl: 'not-found.html'
		});
});

// Seguridad
