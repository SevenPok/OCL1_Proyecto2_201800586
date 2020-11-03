var token = require('./token');
var terminales = require('./terminal');

var syntax = (function(tk) {
    var i = 0;
    var preanalisis = tk[i];
    var errores = [];

    header();
    match(token.getTipo.EOF);
    return errores;

    function match(terminal) {

        if (preanalisis.token != terminal) {
            //console.log('Error sintactico con token: ' + preanalisis.token + ' se esperaba: ' + terminal);
            errores.push({ 'tipo': 'sintactico', 'lexema': preanalisis.lexema, 'fila': preanalisis.fila, 'columna': preanalisis.columna })
        }

        if (preanalisis.token != token.getTipo.EOF) {
            //console.log(preanalisis.token);
            i++;
            preanalisis = tk[i];
        }
    }

    function expresion() {
        bool_expr();
    }

    function bool_expr() {
        bool_fact();
        bool_term();
    }

    function bool_term() {
        switch (preanalisis.token) {
            case token.getTipo.And:
                match(token.getTipo.And);
                bool_fact();
                bool_term();
                break;
            case token.getTipo.Or:
                match(token.getTipo.Or);
                bool_fact();
                bool_term();
                break;
            case token.getTipo.Xor:
                match(token.getTipo.Xor);
                bool_fact();
                bool_term();
                break;
            case token.getTipo.igual:
                match(token.getTipo.igual);
                bool_fact();
                bool_term();
                break;
            case token.getTipo.diferente:
                match(token.getTipo.diferente);
                bool_fact();
                bool_term();
                break;
            default:
                break;
        }
    }

    function bool_fact() {
        switch (preanalisis.token) {
            case token.getTipo.Not:
                match(token.getTipo.Not);
                expresion();
                break;
            default:
                rela_expr();
        }
    }

    function rela_expr() {
        aritm_expr();
        rela_term();
    }

    function rela_term() {
        switch (preanalisis.token) {
            case token.getTipo.mayor:
                match(token.getTipo.mayor);
                aritm_expr();
                rela_term();
                break;
            case token.getTipo.menor:
                match(token.getTipo.menor);
                aritm_expr();
                rela_term();
                break;
            case token.getTipo.mayor_igual:
                match(token.getTipo.mayor_igual);
                aritm_expr();
                rela_term();
                break;
            case token.getTipo.menor_igual:
                match(token.getTipo.menor_igual);
                aritm_expr();
                rela_term();
                break;
            default:
                break;
        }
    }

    function aritm_expr() {
        aritm_term();
        sub_aritm_expr();
    }

    function sub_aritm_expr() {
        switch (preanalisis.token) {
            case token.getTipo.suma:
                match(token.getTipo.suma);
                aritm_term();
                sub_aritm_expr();
                break;
            case token.getTipo.menos:
                match(token.getTipo.menos);
                aritm_term();
                sub_aritm_expr();
                break;
            default:
                break;
        }
    }

    function aritm_term() {
        aritm_fact();
        sub_aritm_term();
    }

    function sub_aritm_term() {
        switch (preanalisis.token) {
            case token.getTipo.multiplicacion:
                match(token.getTipo.multiplicacion);
                aritm_fact();
                sub_aritm_term();
                break;
            case token.getTipo.division:
                match(token.getTipo.division);
                aritm_fact();
                sub_aritm_term();
                break;
            default:
                break;
        }
    }

    function aritm_fact() {
        switch (preanalisis.token) {
            case token.getTipo.parentesis_izquierdo:
                match(token.getTipo.parentesis_izquierdo);
                expresion();
                match(token.getTipo.parentesis_derecho);
                break;
            case token.getTipo.menos:
                match(token.getTipo.menos);
                aritm_fact();
                break;
            case token.getTipo.Not:
                expresion();
                break;
            default:
                primitivo();
                break;
        }
    }

    function primitivo() {
        switch (preanalisis.token) {
            case token.getTipo.entero:
                match(token.getTipo.entero);
                break;
            case token.getTipo.decimal:
                match(token.getTipo.decimal);
                break;
            case token.getTipo.caracter:
                match(token.getTipo.caracter);
                break;
            case token.getTipo.cadena:
                match(token.getTipo.cadena);
                break;
            case token.getTipo.true:
                match(token.getTipo.true);
                break;
            case token.getTipo.false:
                match(token.getTipo.false);
                break;
            default:
                try {
                    if (terminales.incremento(tk[i + 1].token)) {
                        incremento();
                    } else { match(token.getTipo.identificador); }
                } catch (error) {
                    match(token.getTipo.identificador);
                }
                break;
        }
    }

    function asignacion() {
        match(token.getTipo.identificador);
        if (preanalisis.token == token.getTipo.asignacion) {
            match(token.getTipo.asignacion);
            expresion();
        } else {
            //console.log('Error sintactico con token: ' + preanalisis.token + ' se esperaba: =');
            errores.push({ 'tipo': 'sintactico', 'lexema': preanalisis.lexema, 'fila': preanalisis.fila, 'columna': preanalisis.columna })
        }
    }

    function declaracion() {
        tipo();
        declaraciones();
    }

    function declaraciones() {
        decla();
        if (preanalisis.token == token.getTipo.coma) {
            match(token.getTipo.coma);
            declaraciones();
        }
    }

    function decla() {
        match(token.getTipo.identificador);
        if (preanalisis.token == token.getTipo.asignacion) {
            match(token.getTipo.asignacion);
            expresion();
        }
    }

    function tipo() {
        switch (preanalisis.token) {
            case token.getTipo.int:
                match(token.getTipo.int);
                break;
            case token.getTipo.Double:
                match(token.getTipo.Double);
                break;
            case token.getTipo.String:
                match(token.getTipo.String);
                break;
            case token.getTipo.Char:
                match(token.getTipo.Char);
                break;
            case token.getTipo.boolean:
                match(token.getTipo.boolean);
                break;
            default:
                match('TIPO');
                break;
        }
    }

    function incremento() {
        match(token.getTipo.identificador);
        if (preanalisis.token == token.getTipo.incremento) { match(token.getTipo.incremento); } else { match(token.getTipo.decremento); }
    }

    function sentencia() {
        if (terminales.tipo(preanalisis.token)) {
            declaracion();
            panico();
            match(token.getTipo.punto_coma);
        } else if (preanalisis.token == token.getTipo.identificador) {
            if (terminales.incremento(tk[i + 1].token)) {
                incremento();
            } else if (tk[i + 1].token == token.getTipo.parentesis_izquierdo) {
                callMetodo();
            } else {
                asignacion();
            }
            panico();
            match(token.getTipo.punto_coma);
        } else if (preanalisis.token == token.getTipo.if) {
            IF();
        } else if (preanalisis.token == token.getTipo.while) {
            WHILE();
        } else if (preanalisis.token == token.getTipo.for) {
            FOR();
        } else if (preanalisis.token == token.getTipo.return) {
            RETURN();
            panico();
            match(token.getTipo.punto_coma);
        } else if (preanalisis.token == token.getTipo.continue) {
            match(token.getTipo.continue);
            panico();
            match(token.getTipo.punto_coma);
        } else if (preanalisis.token == token.getTipo.break) {
            match(token.getTipo.break);
            panico();
            match(token.getTipo.punto_coma);
        } else if (preanalisis.token == token.getTipo.do) {
            DO();
            panico();
            match(token.getTipo.punto_coma);
        } else if (preanalisis.token == token.getTipo.System) {
            PRINT();
            panico();
            match(token.getTipo.punto_coma);
        } else if (preanalisis.token != token.getTipo.llave_derecha) {
            match('SENTENCIA');
        }
    }

    function bloqueSentencia() {
        match(token.getTipo.llave_izquierdo);
        sentencias();
        panico();
        match(token.getTipo.llave_derecha);
    }

    function IF() {
        match(token.getTipo.if);
        match(token.getTipo.parentesis_izquierdo);
        expresion();
        match(token.getTipo.parentesis_derecho);
        bloqueSentencia();
        if (preanalisis.token == token.getTipo.else) {
            match(token.getTipo.else);
            if (preanalisis.token == token.getTipo.if) {
                IF();
            } else { bloqueSentencia(); }
        }
    }

    function WHILE() {
        match(token.getTipo.while);
        match(token.getTipo.parentesis_izquierdo);
        expresion();
        match(token.getTipo.parentesis_derecho);
        bloqueSentencia();
    }

    function FOR() {
        match(token.getTipo.for);
        match(token.getTipo.parentesis_izquierdo);
        declaracion();
        match(token.getTipo.punto_coma);
        expresion();
        match(token.getTipo.punto_coma);
        expresion();
        match(token.getTipo.parentesis_derecho);
        bloqueSentencia();
    }

    function RETURN() {
        match(token.getTipo.return);
        if (terminales.primitivo(preanalisis.token) || preanalisis.token == token.getTipo.parentesis_izquierdo || preanalisis.tokens == token.getTipo.menos || preanalisis.token == token.getTipo.Not) {
            expresion();
        }
    }

    function DO() {
        match(token.getTipo.do);
        bloqueSentencia();
        match(token.getTipo.while);
        match(token.getTipo.parentesis_izquierdo);
        expresion();
        match(token.getTipo.parentesis_derecho);
    }

    function PRINT() {
        match(token.getTipo.System);
        match(token.getTipo.punto);
        match(token.getTipo.out);
        match(token.getTipo.punto);
        match(token.getTipo.print);
        match(token.getTipo.parentesis_izquierdo);
        expresion();
        match(token.getTipo.parentesis_derecho);
    }

    function sentencias() {
        sentencia();
        if (preanalisis.token != token.getTipo.EOF && preanalisis.token != token.getTipo.llave_derecha) {
            sentencias();
        }
    }

    function bloqueInstruccion() {
        match(token.getTipo.llave_izquierdo);
        instrucciones();
        panico();
        match(token.getTipo.llave_derecha);
    }

    function bloqueInstruccion2() {
        match(token.getTipo.llave_izquierdo);
        instrucciones2();
        panico();
        match(token.getTipo.llave_derecha);
    }

    function instrucciones2() {
        instruccion2();
        if (preanalisis.token != token.getTipo.EOF && preanalisis.token != token.getTipo.llave_derecha) {
            instrucciones2();
        }
    }

    function instruccion2() {
        if (preanalisis.token == token.getTipo.public) {
            metodo2();
            panico();
            match(token.getTipo.punto_coma);
        } else {
            match('INSTRUCCION');
        }
    }

    function instrucciones() {
        instruccion();
        if (preanalisis.token != token.getTipo.EOF && preanalisis.token != token.getTipo.llave_derecha) {
            instrucciones();
        }
    }

    function instruccion() {
        if (terminales.tipo(preanalisis.token)) {
            declaracion();
            panico();
            match(token.getTipo.punto_coma);
        } else if (preanalisis.token == token.getTipo.identificador) {
            asignacion();
            panico();
            match(token.getTipo.punto_coma);
        } else if (preanalisis.token == token.getTipo.public) {
            match(token.getTipo.public);
            if (preanalisis.token == token.getTipo.static) {
                MAIN();
            } else {
                metodo();
            }
        } else if (preanalisis.token != token.getTipo.llave_derecha) {
            match('INSTRUCCION');
        }
    }

    function MAIN() {
        match(token.getTipo.static);
        match(token.getTipo.void);
        match(token.getTipo.main);
        match(token.getTipo.parentesis_izquierdo);
        match(token.getTipo.String);
        match(token.getTipo.corchete_izquierdo);
        match(token.getTipo.corchete_derecho);
        match(token.getTipo.args);
        match(token.getTipo.parentesis_derecho);
        bloqueSentencia();
    }

    function metodo() {
        if (terminales.tipo(preanalisis.token) || preanalisis.token == token.getTipo.void) {
            if (preanalisis.token == token.getTipo.void) {
                match(token.getTipo.void);
            } else {
                tipo();
            }
            match(token.getTipo.identificador);
            match(token.getTipo.parentesis_izquierdo);
            parametros();
            match(token.getTipo.parentesis_derecho);
            bloqueSentencia();
        } else {
            tipo();
        }
    }

    function metodo2() {
        match(token.getTipo.public);
        if (terminales.tipo(preanalisis.token) || preanalisis.token == token.getTipo.void) {
            if (preanalisis.token == token.getTipo.void) {
                match(token.getTipo.void);
            } else {
                tipo();
            }
            match(token.getTipo.identificador);
            match(token.getTipo.parentesis_izquierdo);
            parametros();
            match(token.getTipo.parentesis_derecho);
        } else {
            tipo();
        }
    }

    function parametro() {
        tipo();
        match(token.getTipo.identificador);
    }

    function parametros() {
        if (preanalisis.token != token.getTipo.parentesis_derecho) {
            parametro();
            if (preanalisis.token == token.getTipo.coma) {
                match(token.getTipo.coma);
                parametros();
            }
        }
    }

    function callMetodo() {
        match(token.getTipo.identificador);
        match(token.getTipo.parentesis_izquierdo);
        valores();
        match(token.getTipo.parentesis_derecho);
    }

    function valores() {
        if (terminales.primitivo(preanalisis.token) || preanalisis.token == token.getTipo.parentesis_izquierdo || preanalisis.token == token.getTipo.menos || preanalisis.token == token.getTipo.Not) {
            expresion();
            if (preanalisis.token == token.getTipo.coma) {
                match(token.getTipo.coma);
                valores();
            }
        }
    }

    function clase() {
        match(token.getTipo.class);
        match(token.getTipo.identificador);
        bloqueInstruccion();
    }

    function interface() {
        match(token.getTipo.interface);
        match(token.getTipo.identificador);
        bloqueInstruccion2();
    }

    function head() {
        if (preanalisis.token == token.getTipo.public) {
            match(token.getTipo.public);
            if (preanalisis.token == token.getTipo.class) {
                clase();
            } else if (preanalisis.token == token.getTipo.interface) {
                interface();
            }
        } else {
            match('CLASE');
        }
    }

    function header() {
        head();
        if (preanalisis.token != token.getTipo.EOF) {
            header();
        }
    }

    function panico() {
        while (preanalisis.token != token.getTipo.EOF) {
            if (preanalisis.token == token.getTipo.punto_coma || preanalisis.token == token.getTipo.llave_derecha) {
                break;
            }
            //console.log('Me estoy recuperando con el token: ' + preanalisis.token);
            errores.push({ 'tipo': 'sintactico', 'lexema': preanalisis.lexema, 'fila': preanalisis.fila, 'columna': preanalisis.columna })
            i++;
            preanalisis = tk[i];
        }
    }
});


exports.syntax = syntax;