var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());
app.use(express.static(__dirname + '/client'));

// Modularidad en NodeJS mediante require/export
var movimientosData = require('./movimientosData.js');
// To Do: un módulo para el API demovimientos y otro para seguridad

console.log('ready');

var usuarios = [];
var sesiones = [];


app.use('/api/priv/', function (req, res, next) {
	var sessionId = req.get('sessionId');
	var sesion = getSesion(sessionId);
	if (sesion) {
		if (esSesionValida(sesion)) {
			sesion.timeStamp = new Date();
			req.usuario = sesion.email;
			next();
		} else {
			console.log('Sesión caducada:' + JSON.stringify(sesion));
			// Sintaxis mejorada de envío de códigos de estado http
			res.status(419).send('Sesión caducada');
		}
	} else {
		res.status(401).send('Credencial inválida');
	}

});





// API - REST
// SECURITY
app.route('/api/usuarios')
	.post(function (req, res, next) {
		var usuario = req.body;
		if (existeUsuario(usuario)) {
			console.log('email ya registrado:' + usuario.email);
			res.status(409).send('email ' + usuario.email + ' ya registrado');
		} else {
			console.log('registrado:' + usuario.email);
			usuarios.push(usuario);
			res.json(newSession(usuario.email));
		}
	});

// Gestión de sesiones: listado y login
app.route('/api/sesiones')
	.post(function (req, res, next) {
		var usuario = req.body;
		if (esUsuarioValido(usuario)) {
			console.log('aceptado:' + usuario.email);
			res.json(newSession(usuario.email));
		} else {
			console.log('Credencial inválida:' + usuario.email);
			res.status(401).send('Credencial inválida');
		}
	});

function existeUsuario(usuario) {
	return usuarios.some(function (u) {
		return u.email == usuario.email;
	});
}

function esUsuarioValido(usuario) {
	return usuarios.filter(function (u) {
		return u.email == usuario.email && u.password == usuario.password;
	})[0];
}

function getSesion(sessionId) {
	return sesiones.filter(function (s) {
		return s.sessionId == sessionId;
	})[0]
}

function esSesionValida(sesion) {
	return (new Date() - sesion.timeStamp) < 20 * 60 * 1000;
}

function newSession(email) {
	var sessionId = Math.random() * (88888) + 11111;
	var timeStamp = new Date();
	sesiones.push({
		sessionId: sessionId,
		email: email,
		timeStamp: timeStamp
	});
	return sessionId;
}


// BUSINESS
app.get('/api/pub/maestros', function (req, res, next) {
	var maestros = {
		categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
		categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
	};
	res.json(maestros);
});

app.route('/api/priv/movimientos')
	.get(function (req, res, next) {
		movimientosData.gettingMovimientos(req.usuario, function (err, result) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(result);
			}
		})
	})
	.post(function (req, res, next) {
		var movimiento = req.body;
		movimiento.usuario = req.usuario;
		movimientosData.postingMovimiento(movimiento, function (err, result) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(movimiento);
			}
		})
	});


app.route('/api/priv/movimientos/:id')
	.get(function (req, res, next) {
		var movId = req.params.id;
		movimientosData.gettingMovimiento(movId, req.usuario, function (err, result) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(result[0]);
			}
		})
	}).post(function (req, res, next) {
		var movId = req.params.id;
		var nuevoMovimiento = req.body;
		movimientosData.puttingMovimiento(nuevoMovimiento, function (err, result) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(nuevoMovimiento);
			}
		})
	});

app.get('/api/priv/total', function (req, res, next) {
	movimientosData.gettingTotalUsuario(req.usuario, function (err, result) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(result);
		}
	})
});



console.log('steady');
app.listen(3000);
console.log('go');

/*
To Do:
- usar Mongo para los datos de usuario
- update
*/
