(function () {

	angular.module('cashFlow', ['terceros', 'componentes', 'estados']);
	angular.module('terceros', ['ngResource', 'ngCookies', 'ui.router']);
	angular.module('componentes', ['seguridad', 'abComponentes', 'abMenuNavegacion']);
	// dependencia al estado movimiento
	angular.module('estados', ['registro', 'lista', 'total', 'nuevo', 'editor']);

}());
