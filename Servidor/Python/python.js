var lexer = require('./lexer');
var syntax = require('./syntax');
var token = require('./token');

var analisis = function(contenido) {
    var arrayTokens = lexer.tokens(contenido);
    var aux = [];
    arrayTokens[0].forEach((valor) => valor.token != token.getTipo.comentario ? aux.push(valor) : null);
    var errores = syntax.syntax(aux);
    for (let index = 0; index < errores.length; index++) {
        arrayTokens[1].push(errores[index]);
    }
    return { 'tokens': arrayTokens[0], 'errores': arrayTokens[1] };
};

exports.analisis = analisis;