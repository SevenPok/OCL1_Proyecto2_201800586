var parser = require('./gramatica');

var analisis = (function(contenido) {
    var contador = 1;
    var dot = 'digraph G{\n';
    var a = parser.parse(contenido);
    parser.errores = [];
    parser.tokens = [];


    imprimir(a[0]);
    dot += '}';
    return { 'dot': dot, 'tokens': a[1], 'errores': a[2] };

    function objeto(lista, padre) {
        Object.keys(lista).forEach((valor) => {
            if (Array.isArray(lista[valor])) {
                //console.log(padre + '->' + valor);
                var hijo = crearNodo(valor);
                dot += padre + '->' + hijo + '\n';
                arreglo(lista[valor], hijo);
            } else if (typeof lista[valor] === 'object') {
                var hijo = crearNodo(valor);
                dot += padre + '->' + hijo + '\n';
                //console.log(padre + '->' + valor);
                objeto(lista[valor], hijo);
            } else {
                var hijo = crearNodo(lista[valor]);
                dot += padre + '->' + hijo + ';\n';
                //console.log(padre + '->' + lista[valor]);
            }
        });

    }

    function arreglo(lista, padre) {
        lista.forEach((valor) => {
            if (typeof valor === 'object') {
                //console.log('Tu parde es: ' + padre)

                objeto(valor, padre);
            } else if (Array.isArray(valor)) {
                arreglo(valor, padre);
            }
        });
    }

    function imprimir(lista) {
        var padre = crearNodo('RAIZ');
        arreglo(lista, padre);
    }

    function crearNodo(nodo) {
        var nombrehijo = "n" + contador;
        dot += nombrehijo + "[label=\"" + String(nodo).replace(/"/gi, "\\\"") + "\"];\n";
        contador++;
        return nombrehijo;
    }

});

var traduccion = (function(contenido) {
    var a = parser.parse(contenido);
    parser.errores = [];
    parser.tokens = [];
    var cadena = "";
    var interface = false;
    imprimir(a[0]);
    return cadena;



    function objeto(lista, padre, tab) {
        if (padre == 'INSTRUCCIONES' || padre == 'SENTENCIAS') {
            tabular(tab++);
        }
        Object.keys(lista).forEach((valor) => {

            if (Array.isArray(lista[valor])) {
                arreglo(lista[valor], valor, tab);
                tabular(tab);
            } else if (typeof lista[valor] === 'object') {
                if (tabulaciones(valor) && padre != 'DECLARACIONES' && padre != 'FOR' && valor != padre) {
                    salto(';');
                } else if (padre == 'FOR' && (valor == 'EXPRESION 1' || valor == 'EXPRESION 2')) {
                    cadena += '; ';
                }

                if (padre == 'INSTRUCCIONES' || padre == 'SENTENCIAS') {
                    tabular(tab++);
                }

                if (valor == 'INTERFACE') {
                    interface = false;
                } else if (valor == 'CLASE') {
                    interface = true;
                }

                objeto(lista[valor], valor, tab);
            } else if (interface == true) {
                if (padre == 'CLASE') {
                    clase(valor, lista[valor]);
                } else if (padre == 'METODO') {
                    metodo(valor, lista[valor]);
                } else if (padre == 'PARAMETRO') {
                    parametro(valor, lista[valor]);
                } else if (padre == 'DECLARACION') {
                    declaraciones(valor, lista[valor]);
                } else if (padre == 'MAIN') {
                    main(valor, lista[valor]);
                } else if (padre == 'PRINT') {
                    print(padre, lista[valor]);
                } else {
                    salto(lista[valor]);

                    if (lista[valor] == '}') {
                        tabular(tab);
                    }
                    if (valor == 'CONTINUE' || valor == 'BREAK') {
                        cadena += '\n';
                        tabular(tab);
                    }
                    cadena += lista[valor] + ' ';
                    //salto(lista[valor]);
                }
            }
        });
    }

    function arreglo(lista, padre, tab) {
        lista.forEach((valor) => {
            if (typeof valor === 'object') {
                if (padre == 'RAIZ' && interface == false) {
                    cadena += '\n';
                }
                objeto(valor, padre, tab);
            } else if (Array.isArray(valor)) {
                arreglo(valor, padre, tab);
            }
        });
    }

    function imprimir(lista) {

        arreglo(lista, 'RAIZ', 0);
    }

    function clase(key, valor) {
        if (key != 'visibilidad') {
            cadena += valor + ' ';
        }
    }

    function print(key, valor) {
        if (valor == 'print') {
            cadena += 'console.log ';
        } else {
            cadena += valor + ' ';
        }
    }

    function metodo(key, valor) {
        if (key != 'visibilidad') {
            if (key == 'tipo') {
                cadena += 'function ';
            } else {
                cadena += valor + ' ';
            }

        }
    }

    function parametro(key, valor) {
        if (key != 'tipo') {
            cadena += valor + ' ';
        }
    }

    function declaraciones(key, valor) {
        if (key == 'tipo') {
            cadena += 'var ';
        } else {
            cadena += valor + ' ';
        }
    }

    function main(key, valor) {
        if (key == 'void') {
            cadena += 'function ';
        } else if (key == 'main') {
            cadena += valor + ' ( ) ';
        }
    }

    function salto(valor) {
        if (valor == '}' || valor == ';') {
            cadena += '\n';
        }
    }

    function tabular(tab) {
        for (let index = 0; index < tab; index++) {
            cadena += '  ';
        }
    }


    function tabulaciones(tk) {
        switch (tk) {
            case 'INSTRUCCIONES':
                return true;
            case 'DECLARACION':
                return true;
            case 'ASIGNACION':
                return true;
            case 'MAIN':
                return true;
            case 'METODO':
                return true;
            case 'FUNCION':
                return true;
            case 'IF':
                return true;
            case 'WHILE':
                return true;
            case 'DO':
                return true;
            case 'FOR':
                return true;
            case 'PRINT':
                return true;
            case 'RETURN':
                return true;
            case 'CONTINUE':
                return true;
            case 'BREAK':
                return true;
            case 'INCREMENTO':
                return true;
            default:
                return false;
        }
    }
});


var traduccion2 = (function(contenido) {
    var a = parser.parse(contenido);
    parser.errores = [];
    parser.tokens = [];
    var cadena = "";
    var interface = false;
    imprimir(a[0]);
    return cadena;



    function objeto(lista, padre, tab) {
        if (padre == 'INSTRUCCIONES' || padre == 'SENTENCIAS') {
            tabular(tab++);
        }
        Object.keys(lista).forEach((valor) => {

            if (Array.isArray(lista[valor])) {
                arreglo(lista[valor], valor, tab);
                tabular(tab);
            } else if (typeof lista[valor] === 'object') {
                if (tabulaciones(valor) && padre != 'DECLARACIONES' && padre != 'FOR' && valor != padre) {
                    salto(';');
                } else if (padre == 'FOR' && (valor == 'EXPRESION 1' || valor == 'EXPRESION 2')) {
                    cadena += '; ';
                }

                if (padre == 'INSTRUCCIONES' || padre == 'SENTENCIAS') {
                    tabular(tab++);
                }

                if (valor == 'INTERFACE') {
                    interface = false;
                } else if (valor == 'CLASE') {
                    interface = true;
                }

                if (valor == 'MAIN' && padre != valor) {
                    cadena += '\n  if __name__ = “__main__”: \n     main()\n\n  '
                }

                objeto(lista[valor], valor, tab);
            } else if (interface == true) {
                if (padre == 'CLASE') {
                    clase(valor, lista[valor]);
                } else if (padre == 'METODO') {
                    metodo(valor, lista[valor]);
                } else if (padre == 'PARAMETRO') {
                    parametro(valor, lista[valor]);
                } else if (padre == 'DECLARACION') {
                    declaraciones(valor, lista[valor]);
                } else if (padre == 'MAIN') {
                    main(valor, lista[valor]);
                } else if (padre == 'PRINT') {
                    print(padre, lista[valor]);
                } else {
                    salto(lista[valor]);

                    if (lista[valor] == '}') {
                        tabular(tab);
                    }
                    if (valor == 'CONTINUE' || valor == 'BREAK') {
                        cadena += '\n';
                        tabular(tab);
                    }
                    if (lista[valor] == '{') {
                        cadena += ': ';
                    } else if (lista[valor] != '}') {
                        if (lista[valor] == 'true') {
                            cadena += 'True ';
                        } else if (lista[valor] == 'false') {
                            cadena += 'False ';
                        } else if (lista[valor] == '&&') {
                            cadena += 'and ';
                        } else if (lista[valor] == '||') {
                            cadena += 'or ';
                        } else if (lista[valor] == '!') {
                            cadena += 'not ';
                        } else if (lista[valor] == '^') {
                            cadena += 'xor ';
                        } else { cadena += lista[valor] + ' '; }
                    }

                }
            }
        });
    }

    function arreglo(lista, padre, tab) {
        lista.forEach((valor) => {
            if (typeof valor === 'object') {
                if (padre == 'RAIZ' && interface == false) {
                    cadena += '\n';
                }
                objeto(valor, padre, tab);
            } else if (Array.isArray(valor)) {
                arreglo(valor, padre, tab);
            }
        });
    }

    function imprimir(lista) {

        arreglo(lista, 'RAIZ', 0);
    }

    function clase(key, valor) {
        if (key != 'visibilidad') {
            cadena += valor + ' ';
        }
    }

    function print(key, valor) {
        if (valor == 'print') {
            cadena += 'print ';
        } else {
            cadena += valor + ' ';
        }
    }

    function metodo(key, valor) {
        if (key != 'visibilidad') {
            if (key == 'tipo') {
                cadena += 'def ';
            } else {
                cadena += valor + ' ';
            }

        }
    }

    function parametro(key, valor) {
        if (key != 'tipo') {
            cadena += valor + ' ';
        }
    }

    function declaraciones(key, valor) {
        if (key == 'tipo') {
            cadena += 'var ';
        } else {
            cadena += valor + ' ';
        }
    }

    function main(key, valor) {
        if (key == 'void') {
            cadena += 'def ';
        } else if (key == 'main') {
            cadena += valor + ' ( ) ';
        }
    }

    function salto(valor) {
        if (valor == '}' || valor == ';') {
            cadena += '\n';
        }
    }

    function tabular(tab) {
        for (let index = 0; index < tab; index++) {
            cadena += '  ';
        }
    }


    function tabulaciones(tk) {
        switch (tk) {
            case 'INSTRUCCIONES':
                return true;
            case 'DECLARACION':
                return true;
            case 'ASIGNACION':
                return true;
            case 'MAIN':
                return true;
            case 'METODO':
                return true;
            case 'FUNCION':
                return true;
            case 'IF':
                return true;
            case 'WHILE':
                return true;
            case 'DO':
                return true;
            case 'FOR':
                return true;
            case 'PRINT':
                return true;
            case 'RETURN':
                return true;
            case 'CONTINUE':
                return true;
            case 'BREAK':
                return true;
            case 'INCREMENTO':
                return true;
            default:
                return false;
        }
    }
});





//console.log(python("public class persona{ a= 358*f/(635); public static void main(String[]args){boolean a = true, b = false; get(a,b,true);} int a,b,c; public void set(int a){int a; if(a&&b){}}}"));
//console.log(python("public class persona{ String b = 85/(a*d+a)+true; }"));




exports.analisis = analisis;
exports.traduccion = traduccion;
exports.traduccion2 = traduccion2;