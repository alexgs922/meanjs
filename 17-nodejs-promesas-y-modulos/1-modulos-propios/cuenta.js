// En este caso 'simulamos' una Clase instanciable mediante una función

// un módulo puede a su vez requerir de otros
var Mates = require('./mates.js');

var Cuenta = function (propietario) {
    console.log(Mates.obNum("4"));
	this.propietario = propietario;
	this.saldo = 0;
	// a una funcion se le pueden agregar más métodos y propiedades
	this.ingresar = function (dinero) {
		// aquí this apunta al módulo, no a la función interna
		this.saldo = Mates.sumar(this.saldo, dinero);
		console.log("ingresar: " + dinero + " a " + this.propietario + " tiene " + this.saldo + "€");
	}
	this.retirar = function (dinero) {
		this.saldo = Mates.restar(this.saldo, dinero);
		console.log("retirar: " + dinero + " a " + this.propietario + " tiene " + this.saldo + "€");
	}
}


module.exports = Cuenta;
