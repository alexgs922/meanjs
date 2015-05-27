"use strict";
var movimientosData = require('../data/movimientosData.js');

module.exports.routeMovimientos = function (app) {

	app.route('/api/priv/movimientos')
		.get(function (req, res, next) {
			//res.json(movimientosData.getMovimientos(req.usuario));
			movimientosData.gettingMovimientos(req.usuario)
				.then(function (result) {
					//console.log('OK: /api/priv/movimientos ->> ' + JSON.stringify(result));
					res.status(200).json(result);
				})
				.fail(function (err) {
					//console.error('ERR: /api/priv/movimientos ->> ' + JSON.stringify(err));
					res.status(500).send(err);
				});
		})
		.post(function (req, res, next) {
			var movimiento = req.body;
			movimiento.usuario = req.usuario;
			//movimientosData.postMovimiento(movimiento);
			//res.status(200).send();
			movimientosData.postingMovimiento(movimiento)
				.then(function (result) {
					res.status(200).send();
				})
				.fail(function (err) {
					res.status(500).send(err);
				});
		});

	app.get('/api/priv/movimientos/:id', function (req, res, next) {
		//res.json(movimientosData.getMovimiento(req.params.id, req.usuario));
		movimientosData.gettingMovimiento(req.params.id, req.usuario)
			.then(function (result) {
				res.json(result[0]);
			})
			.fail(function (err) {
				res.status(500).send(err);
			});
	});

	app.get('/api/priv/total', function (req, res, next) {
		//res.json(movimientosData.getTotalUsuario(req.usuario));
		movimientosData.gettingTotalUsuario(req.usuario)
			.then(function (result) {
				res.json(result);
			})
			.fail(function (err) {
				res.status(500).send(err);
			});
	});


}
