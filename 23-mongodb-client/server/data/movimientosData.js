"use strict";
var mongodb = require('./mongodb.js')
var mongoCol = "movimientos"

//module.exports.getMovimientos = function (usuario) {
//	var movimientosUsuario = movimientos.filter(function (m) {
//		return m.usuario = usuario;
//	});
//	return movimientosUsuario;
//}

module.exports.gettingMovimientos = function (usuario) {
	return mongodb.finding(mongoCol, {
		usuario: usuario
	});
}


//module.exports.getMovimiento = function (movId, usuario) {
//	var movimientoBuscado = movimientos.filter(function (movimiento) {
//		return movimiento.id == movId && movimiento.usuario == usuario;
//	})[0];
//	return movimientoBuscado;
//}

module.exports.gettingMovimiento = function (movId, usuario) {
	return mongodb.finding(mongoCol, {
		_id: movId,
		usuario: usuario
	});
}


//module.exports.getTotalUsuario = function (usuario) {
//	var totalUsuario = getTotalUsuario(usuario);
//	return totalUsuario;
//}

module.exports.gettingTotalUsuario = function (usuario) {
	return mongodb.aggregating(mongoCol, [
		{
			$match: {
				usuario: usuario
			}
			},
		{
			$group: {
				_id: {
					tipo: "$tipo"
				},
				total: {
					$sum: "$importe"
				}
			}
			}
		]);
}

//module.exports.postMovimiento = function (movimiento) {
//	maxId++;
//	movimiento.id = maxId;
//	movimientos.push(movimiento);
//	var totalUsuario = getTotalUsuario(movimiento.usuario);
//	if (movimiento.tipo == 'Ingreso')
//		totalUsuario.ingresos += movimiento.importe;
//	else
//		totalUsuario.gastos += movimiento.importe;
//	return getMovimientosUsuario(movimiento.usuario);
//}
module.exports.postingMovimiento = function (movimiento) {
	return mongodb.inserting(mongoCol,movimiento);
}
