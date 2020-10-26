const token = {
    1: 'int',
    2: 'String',
    3: 'double',
    4: 'char',
    5: 'boolean',
    6: 'if',
    7: 'else',
    8: 'for',
    9: 'while',
    10: 'do',
    11: 'break',
    12: 'continue',
    13: 'return',
    14: 'class',
    15: 'public',
    16: 'interface',
    17: 'System',
    18: 'out',
    19: 'main',
    20: 'static',
    21: 'true',
    22: 'false',
    23: 'void',
    24: 'args',
    25: '{',
    26: '}',
    27: '(',
    28: ')',
    29: '[',
    30: ']',
    31: '++',
    32: '+',
    33: '--',
    34: '-',
    35: '*',
    36: '/',
    37: '&&',
    38: '||',
    39: '!=',
    40: '!',
    41: '^',
    42: '>=',
    43: '>',
    44: '<=',
    45: '<',
    46: '==',
    47: '=',
    48: '.',
    49: ':',
    50: ',',
    51: ';',
    52: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
    53: /^\'[^\']*\'$/,
    54: /^\"[^\"]*\"$/,
    55: /^[0-9]+\.[0-9]+$/,
    56: /^[0-9]+$/,
    57: /^[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]$/,
    58: /\/\/.*/,
    59: /^\s+$/,
    60: 'println',
    61: 'print'
}

var getToken = (function(tk) {
    switch (tk) {
        case token[1]:
            return 'INT';
        case token[2]:
            return 'STRING';
        case token[3]:
            return 'DOUBLE';
        case token[4]:
            return 'CHAR';
        case token[5]:
            return 'BOOLEAN';
        case token[6]:
            return 'IF';
        case token[7]:
            return 'ELSE';
        case token[8]:
            return 'FOR';
        case token[9]:
            return 'WHILE';
        case token[10]:
            return 'DO';
        case token[11]:
            return 'BREAK';
        case token[12]:
            return 'CONTINUE';
        case token[13]:
            return 'RETURN';
        case token[14]:
            return 'CLASS';
        case token[15]:
            return 'PUBLIC';
        case token[16]:
            return 'INTERFACE';
        case token[17]:
            return 'SYSTEM';
        case token[18]:
            return 'OUT';
        case token[19]:
            return 'MAIN';
        case token[20]:
            return 'STATIC';
        case token[21]:
            return 'TRUE';
        case token[22]:
            return 'FALSE';
        case token[23]:
            return 'VOID';
        case token[24]:
            return 'ARGS';
        case token[25]:
            return '{';
        case token[26]:
            return '}';
        case token[27]:
            return '(';
        case token[28]:
            return ')';
        case token[29]:
            return '[';
        case token[30]:
            return ']';
        case token[31]:
            return '++';
        case token[32]:
            return '+';
        case token[33]:
            return '--';
        case token[34]:
            return '-';
        case token[35]:
            return '*';
        case token[36]:
            return '/';
        case token[37]:
            return '&&';
        case token[38]:
            return '||';
        case token[39]:
            return '!=';
        case token[40]:
            return '!';
        case token[41]:
            return '^';
        case token[42]:
            return '>=';
        case token[43]:
            return '>';
        case token[44]:
            return '<=';
        case token[45]:
            return '<';
        case token[46]:
            return '==';
        case token[47]:
            return '=';
        case token[48]:
            return '.';
        case token[49]:
            return ':';
        case token[50]:
            return ',';
        case token[51]:
            return ';';
        case token[60]:
            return 'PRINT'
        case token[61]:
            return 'PRINT'
        default:
            if (token[52].test(tk)) {
                return 'ID';
            } else if (token[53].test(tk)) {
                return 'CARACTER';
            } else if (token[54].test(tk)) {
                return 'CADENA';
            } else if (token[55].test(tk)) {
                return 'DECIMAL';
            } else if (token[56].test(tk)) {
                return 'ENTERO';
            } else if (token[57].test(tk)) {
                return 'COMENTARIO';
            } else if (token[58].test(tk)) {
                return 'COMENTARIO';
            } else if (token[59].test(tk)) {
                return 'IGNORAR';
            } else {
                return 'ERROR';
            }
    }
});

const tipo = {
    int: 'INT',
    String: 'STRING',
    Double: 'DOUBLE',
    Char: 'CHAR',
    boolean: 'BOOLEAN',
    if: 'IF',
    else: 'ELSE',
    for: 'FOR',
    while: 'WHILE',
    do: 'DO',
    break: 'BREAK',
    continue: 'CONTINUE',
    return: 'RETURN',
    class: 'CLASS',
    public: 'PUBLIC',
    interface: 'INTERFACE',
    System: 'SYSTEM',
    out: 'OUT',
    main: 'MAIN',
    static: 'STATIC',
    true: 'TRUE',
    false: 'FALSE',
    void: 'VOID',
    args: 'ARGS',
    llave_izquierdo: '{',
    llave_derecha: '}',
    parentesis_izquierdo: '(',
    parentesis_derecho: ')',
    corchete_izquierdo: '[',
    corchete_derecho: ']',
    incremento: '++',
    suma: '+',
    decremento: '--',
    menos: '-',
    multiplicacion: '*',
    division: '/',
    And: '&&',
    Or: '||',
    diferente: '!=',
    Not: '!',
    Xor: '^',
    mayor_igual: '>=',
    mayor: '>',
    menor_igual: '<=',
    menor: '<',
    igual: '==',
    asignacion: '=',
    punto: '.',
    dos_puntos: ':',
    coma: ',',
    punto_coma: ';',
    identificador: 'ID',
    caracter: 'CARACTER',
    cadena: 'CADENA',
    decimal: 'DECIMAL',
    entero: 'ENTERO',
    comentario: 'COMENTARIO',
    print: 'PRINT',
    EOF: 'EOF'
}

exports.getToken = getToken;
exports.getTipo = tipo;