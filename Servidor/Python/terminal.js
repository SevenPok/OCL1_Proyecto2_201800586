var token = require('./token');

const primitivo = function(terminal) {
    switch (terminal) {
        case token.getTipo.identificador:
            return true;
        case token.getTipo.entero:
            return true;
        case token.getTipo.decimal:
            return true;
        case token.getTipo.cadena:
            return true;
        case token.getTipo.caracter:
            return true;
        case token.getTipo.true:
            return true;
        case token.getTipo.false:
            return true;
        default:
            return false;
    }
}

const tipo = function(terminal) {
    switch (terminal) {
        case token.getTipo.int:
            return true;
        case token.getTipo.Double:
            return true;
        case token.getTipo.String:
            return true;
        case token.getTipo.Char:
            return true;
        case token.getTipo.boolean:
            return true;
        default:
            return false;
    }
}

const incremento = function(terminal) {
    switch (terminal) {
        case token.getTipo.incremento:
            return true;
        case token.getTipo.decremento:
            return true;
        default:
            return false;
    }
}

const sentencia = function(terminal) {
    switch (terminal) {
        case token.getTipo.if:
            return true;
        case token.getTipo.while:
            return true;
        case token.getTipo.do:
            return true;
        case token.getTipo.for:
            return true;
        case token.getTipo.System:
            return true;
        case token.getTipo.return:
            return true;
        case token.getTipo.continue:
            return true;
        case token.getTipo.break:
            return true;
        case token.getTipo.identificador:
            return true;
        default:
            return tipo(terminal);
    }
}

const instruccion = function(terminal) {
    switch (terminal) {
        case token.getTipo.identificador:
            return true;
        case token.getTipo.public:
            return true;
        default:
            return tipo(terminal);
    }
}


module.exports = {
    primitivo,
    tipo,
    incremento,
    sentencia,
    instruccion
}