var token = require('./token');

const esLetra = /[a-zA-Z]/;
const esNumero = /[0-9]/;
const ignorar = /\s+/;

var arrayToken = (function(cadena) {
    cadena += '$';

    let estado = 0;
    let i = 0;
    let fila = 1;
    let columna = 1;
    let char = '';
    let lexema = '';

    let tokens = [];
    let errores = [];

    while (i < String(cadena).length) {
        char = cadena[i];
        switch (estado) {
            case 0:
                if (esLetra.test(char) || char == '_') {
                    lexema += char;
                    estado = 1;
                } else if (esNumero.test(char)) {
                    lexema += char;
                    estado = 2;
                } else if (char == '+') {
                    lexema += char;
                    estado = 4;
                } else if (char == '-') {
                    lexema += char;
                    estado = 5;
                } else if (char == '*') {
                    lexema += char;
                    add2();
                } else if (char == '/') {
                    lexema += char;
                    estado = 9;
                } else if (char == '^') {
                    lexema += char;
                    add2();
                } else if (char == '=' || char == '>' || char == '<' || char == '!') {
                    lexema += char;
                    estado = 6;
                } else if (char == '{' || char == '}' || char == '(' || char == ')' || char == '[' || char == ']') {
                    lexema += char;
                    add2();
                } else if (char == '&') {
                    lexema += char;
                    estado = 7;
                } else if (char == '|') {
                    lexema += char;
                    estado = 8;
                } else if (char == ';' || char == ',' || char == '.' || char == ':') {
                    lexema += char;
                    add2();
                } else if (char == '"') {
                    lexema += char;
                    estado = 13;
                } else if (char == '\'') {
                    lexema += char;
                    estado = 14;
                } else {
                    if (char == '$' && i == (String(cadena).length - 1)) {
                        break;
                    } else if (ignorar.test(char)) {
                        if (char == '\n') {
                            fila++;
                            columna = 0;
                        }
                    } else {
                        errores.push({ 'tipo': 'lexico', 'lexema': char, 'fila': fila, 'columna': columna });
                    }
                }
                break;
            case 1:
                if (esLetra.test(char) || char == '_' || esNumero.test(char)) {
                    lexema += char;
                } else {
                    add();
                }
                break;
            case 2:
                if (esNumero.test(char)) {
                    lexema += char;
                } else if (char == '.') {
                    lexema += char;
                    estado = 3;
                } else {
                    add();
                }
                break;
            case 3:
                if (esNumero.test(char)) {
                    lexema += char;
                } else {
                    add();
                }
                break;
            case 4:
                if (char == '+') {
                    lexema += char;
                    add2();
                } else { add(); }
                break;
            case 5:
                if (char == '-') {
                    lexema += char;
                    add2();
                } else {
                    add();
                }
                break;
            case 6:
                if (char == '=') {
                    lexema += char;
                    add2();
                } else {
                    add();
                }
                break;
            case 7:
                if (char == '&') {
                    lexema += char;
                    add2();
                } else {
                    add();
                }
                break;
            case 8:
                if (char == '|') {
                    lexema += char;
                    add2();
                } else {
                    add();
                }
                break;
            case 9:
                if (char == '/') {
                    lexema += char;
                    estado = 10;
                } else if (char == '*') {
                    lexema += char;
                    estado = 11;
                } else {
                    add();
                }
                break;
            case 10:
                if (char != '\n' && i != (String(cadena).length - 1)) {
                    lexema += char;
                } else {
                    add2();
                    if (char == '\n') {
                        fila++;
                        columna = 0;
                    }
                }
                break;
            case 11:
                if (char == '$' && i == (String(cadena).length - 1)) {
                    add2();
                } else if (char != '*') {
                    lexema += char;
                    if (char == '\n') {
                        fila++;
                        columna = 0;
                    }
                } else {
                    lexema += char;
                    estado = 12;
                }
                break;
            case 12:
                if (char == '$' && i == (String(cadena).length - 1)) {
                    add2();
                } else if (char == '*') {
                    lexema += char;
                } else if (char == '/') {
                    lexema += char;
                    add2();
                } else {
                    lexema += char;
                    estado = 11;
                    if (char == '\n') {
                        fila++;
                        columna = 0;
                    }
                }
                break;
            case 13:
                if (char == '$' && i == (String(cadena).length - 1)) {
                    add2();
                } else if (char == '"') {
                    lexema += char;
                    add2();
                } else {
                    lexema += char;
                }
                break;
            case 14:
                if (char == '$' && i == (String(cadena).length - 1)) {
                    add2();
                } else if (char == '\'') {
                    lexema += char;
                    add2();
                } else {
                    lexema += char;
                }
                break;
            default:
                break;
        }
        i++;
        columna++;
    }
    tokens.push({ 'lexema': '$', 'token': token.getTipo.EOF, 'fila': fila, 'columna': columna });
    return [tokens, errores];

    function add() {
        var tk_actual = token.getToken(lexema);
        columna--;
        var contenido = { 'lexema': lexema, 'token': tk_actual, 'fila': fila, 'columna': columna };
        if (tk_actual != 'ERROR') {
            tokens.push(contenido);
        } else {
            errores.push({ 'tipo': 'lexico', 'lexema': lexema, 'fila': fila, 'columna': columna });
        }
        estado = 0;
        lexema = '';
        i--;
    }

    function add2() {
        var tk_actual = token.getToken(lexema);
        var contenido = { 'lexema': lexema, 'token': tk_actual, 'fila': fila, 'columna': columna };
        if (tk_actual != 'ERROR') {
            tokens.push(contenido);
        } else {
            errores.push({ 'tipo': 'lexico', 'lexema': lexema, 'fila': fila, 'columna': columna });
        }
        estado = 0;
        lexema = '';
    }

});


//console.log(arrayToken("hola mundo soy yo de nuev@ /* asdasd"));

exports.tokens = arrayToken;