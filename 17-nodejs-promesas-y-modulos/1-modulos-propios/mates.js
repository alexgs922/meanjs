// Otro caso muy común es disponer de una
// Biblioteca de funciones de ayuda

// la variable es privada
var matematicas = {
	sumar: function (a, b) {
		return obtenerNumero(a) + obtenerNumero(b);
	},
	restar: function (a, b) {
		return obtenerNumero(a) - obtenerNumero(b);
	},
    obNum: obtenerNumero
};

/** esta función es privada */
function obtenerNumero(texto) {
	return texto * 1;
}



// exportamos la variable que queramos
module.exports = matematicas;

// cuidado, al redefinir el mismo nombre se llama dos veces
module.exports.obNum = obtenerNumero;











