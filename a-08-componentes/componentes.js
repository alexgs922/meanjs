(function () {

	angular.module('abComponentes', [])
		.component('abContenido', {
			// las plantillas pueden tener directivas internas
			template: '<div class="container text-center" style="padding-top:60px;" ui-view></div>'
		})
		.component('abMenuNavegacion', {
			// En este caso la directiva tiene presentación y lógica
			// Asignamos el controlador a la vista desde la plantilla
			templateUrl: './tpl-menu-navegacion.html',
			controller: 'MenuCtrl as menu'
		})
		.component('abFilaMovimiento', {
			// Ahora el cambio más siginificatico son los bindings
			// Funciona como un API para la directiva y recibe la info vía atributos
			// Por otro lado en este caso hemos tenido que restringir el uso de la directiva
			// Los elementos tr dentro de un table requieren definirse explícitamente
			templateUrl: './tpl-fila-movimiento.html',
			bindings: {
				movimiento: '='
			}
		})
		.component('abContador', {
			// parámetros por valor
			// parámetros por referencia
			templateUrl: './tpl-contador.html',
			bindings: {
				texto: '@',
				valor: '='
			}
		})
}());
