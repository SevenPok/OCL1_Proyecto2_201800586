var parser = require('./gramatica');


var analisis = (function(contenido) {
    var traduccion = [];
    var contador = 1;
    var isInterface = false;
    var dot = 'digraph G{\n';
    var a = parser.parse(contenido);

    imprimir(a[0]);
    dot += '}';
    return { 'dot': dot, 'tokens': a[1], 'errores': a[2], 'traduccion': traduccion };

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


console.log(analisis("public class persona{int a ;}"))

exports.analisis = analisis;