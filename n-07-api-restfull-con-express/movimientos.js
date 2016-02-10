"use strict";
var movimientos = [];
var enrutar = function (app, ruta) {
	// Tendremos una ruta por recurso
	app.get(ruta, function (peticion, respuesta) {
		if (movimientos && movimientos.length > 0)
			respuesta.json(movimientos);
		else
			respuesta.status(204).send();
	});

	// Por supuesto se pueden usar parámetros
	app.get(ruta + '/:id', function (peticion, respuesta) {
		var movimiento = movimientos[peticion.params.id];
		if (movimiento)
			respuesta.json(movimientos[peticion.params.id]);
		else
			respuesta.status(404).send();
	});

	// Las inserciones se realizan respondiendo al verbo POST
	app.post(ruta, function (peticion, respuesta) {
		var nuevoMovimiento = peticion.body;
		nuevoMovimiento.id = movimientos.length;
		movimientos.push(nuevoMovimiento)
		respuesta.status(201).json(nuevoMovimiento);
	});

	// Las actualizaciones se realizan respondiendo al verbo PUT
	app.put(ruta + '/:id', function (peticion, respuesta) {
		var movimiento = movimientos[peticion.params.id];
		if (movimiento) {
			movimiento = peticion.body;
			respuesta.json(1);
		} else {
			respuesta.status(404).send(0);
		}
	});

	// Las eliminaciones se realizan respondiendo al verbo DELETE
	app.delete(ruta + '/:id', function (peticion, respuesta) {
		var movimiento = movimientos[peticion.params.id];
		if (movimiento) {
			movimientos.splice(peticion.params.id, 1)
			respuesta.status(204).send(1);
		} else {
			respuesta.status(404).send(0);
		}
	});

}

module.exports = enrutar;
