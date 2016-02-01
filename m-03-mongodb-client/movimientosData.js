// Módulo de acceso a datos de movimientos
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID; // para tratar los identificadores autogenerados
var mongoUrl = "mongodb://localhost:27017/control_caja";
var collection = "movimientos";


module.exports.gettingMovimientos = function (usuario, cb) {
	MongoClient.connect(mongoUrl, function (err, db) {
		if (err) {
			cb(err, null);
		} else {
			db.collection(collection).find({
				usuario: usuario
			}).sort({fecha:0, importe:-1}).toArray(cb);
		}
	});
}

module.exports.gettingMovimiento = function (movId, usuario, cb) {
	MongoClient.connect(mongoUrl, function (err, db) {
		if (err) {
			cb(err, null);
		} else {
			// el _id no es un string, hay que trasnformarlo
			db.collection(collection).find({
				_id: new ObjectID(movId),
				usuario: usuario
			}).toArray(cb);
		}
	});
}

module.exports.postingMovimiento = function (movimiento, cb) {
	MongoClient.connect(mongoUrl, function (err, db) {
		if (err) {
			cb(err, null);
		} else {
			db.collection(collection).insert(movimiento, cb);
		}
	});
}

module.exports.puttingMovimiento = function (movimiento, cb) {
	MongoClient.connect(mongoUrl, function (err, db) {
		if (err) {
			cb(err, null);
		} else {
			// atención al cambio de tipo en el _id
			movimiento._id = new ObjectID(movimiento._id);
			db.collection(collection).replaceOne({
				_id: movimiento._id,
				usuario: movimiento.usuario
			}, movimiento, cb);
		}
	});
}

module.exports.gettingTotalUsuario = function (usuario, cb) {
	// Las consultas más complejas se resuelven con el framework de agregación
	var query = [
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
		];
	MongoClient.connect(mongoUrl, function (err, db) {
		if (err) {
			cb(err, null);
		} else {
			db.collection(collection).aggregate(query).toArray(cb);
		}
	});
}

// To Do: extraer lógica común a funciones reutilizables

module.exports.doingSomethingMovimiento = function (movimiento, cb) {
	MongoClient.connect(mongoUrl, function (err, db) {
		if (err) {
			cb(err, null);
		} else {
			db.collection(collection).doSomething(movimiento, cb);
		}
	});
}
