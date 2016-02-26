"use strict";
var movimientosData = require('./data/movimientosData.js');
var usuariosData = require('./data/usuariosData.js');

var enrutar = function (app, ruta) {
    app.route(ruta)
        .get(function (peticion, respuesta) {
            movimientosData.findingByUsuario(peticion.usuario)
                .then(function (movimientosUsuario) {
                    if (movimientosUsuario && movimientosUsuario.length > 0)
                        respuesta.json(movimientosUsuario);
                    else
                        respuesta.status(204).send();
                })
                .fail(function (err) {
                    respuesta.status(500).send(err);
                });
        })
        .post(function (peticion, respuesta) {
            var movimiento = peticion.body;
			movimiento.usuario = peticion.usuario;
			movimientosData.inserting(movimiento)
				.then(function (data) {
					respuesta.status(201).json(movimiento);
				})
				.fail(function (err) {
					respuesta.status(500).send(err);
				});
        });

    // si la ruta es simple, se puede mantener el verbo original
    // Manteniendo la Precedencia
    app.get(ruta + '/totales', function (peticion, respuesta) {
        var totales = {
            ingresos: 0,
            gastos: 0,
            balance: 0
        };
        // To Do:
        
    });

    // otra a nivel de elemento
    app.route(ruta + '/:id')
        .get(function (peticion, respuesta) {
           movimientosData.findingByIdUsuario(peticion.params.id, peticion.usuario)
			.then(function (data) {
				if(data && data[0])
                   respuesta.json(data[0]);
                else
                   respuesta.status(404).send(0); 
			})
			.fail(function (err) {
				respuesta.status(500).send(err);
			});
        })

}

module.exports = enrutar;
