%{
    var tokens = [];
    var errores = [];

    function addToken(token,lexema,fila,columna){
        return {'token':token, 'lexema':lexema, 'fila':fila, 'columna':columna}
    }

    function addError(tipo,lexema,fila,columna){
        return {'tipo':tipo, 'lexema':lexema, 'fila':fila, 'columna':columna}
    }
%}

%lex

%options case-insensitive

%%

"//".*    { tokens.push(addToken('COMENTARIO', yytext, yylloc.first_line, yylloc.first_column)); };
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] { tokens.push(addToken('COMENTARIO', yytext, yylloc.first_line, yylloc.first_column)); };
\s+ ;

"{"                         { tokens.push(addToken('KEY_LEFT', yytext, yylloc.first_line, yylloc.first_column)); return 'KEY_LEFT'; }
"}"                         { tokens.push(addToken('KEY_RIGHT', yytext, yylloc.first_line, yylloc.first_column)); return 'KEY_RIGHT'; }
"("                         { tokens.push(addToken('PAR_LEFT', yytext, yylloc.first_line, yylloc.first_column)); return 'PAR_LEFT'; }
")"                         { tokens.push(addToken('PAR_RIGHT', yytext, yylloc.first_line, yylloc.first_column)); return 'PAR_RIGHT'; }
"["                         { tokens.push(addToken('COR_LEFT', yytext, yylloc.first_line, yylloc.first_column)); return 'COR_LEFT'; }
"]"                         { tokens.push(addToken('COR_RIGHT', yytext, yylloc.first_line, yylloc.first_column)); return 'COR_RIGHT'; }

"++"                        { tokens.push(addToken('INCREMENTO', yytext, yylloc.first_line, yylloc.first_column)); return 'INCREMENTO'; }
"+"                         { tokens.push(addToken('MAS', yytext, yylloc.first_line, yylloc.first_column)); return 'MAS'; }
"--"                        { tokens.push(addToken('DECREMENTO', yytext, yylloc.first_line, yylloc.first_column)); return 'DECREMENTO'; }
"-"                         { tokens.push(addToken('MENOS', yytext, yylloc.first_line, yylloc.first_column)); return 'MENOS'; }
"*"                         { tokens.push(addToken('POR', yytext, yylloc.first_line, yylloc.first_column)); return 'POR'; }
"/"                         { tokens.push(addToken('DIV', yytext, yylloc.first_line, yylloc.first_column)); return 'DIV'; }

"&&"                        { tokens.push(addToken('AND', yytext, yylloc.first_line, yylloc.first_column)); return 'AND'; }
"||"                        { tokens.push(addToken('OR', yytext, yylloc.first_line, yylloc.first_column)); return 'OR'; }
"!="                        { tokens.push(addToken('DIFERENTE', yytext, yylloc.first_line, yylloc.first_column)); return 'DIFERENTE'; }
"!"                         { tokens.push(addToken('NOT', yytext, yylloc.first_line, yylloc.first_column)); return 'NOT'; }
"^"                         { tokens.push(addToken('XOR', yytext, yylloc.first_line, yylloc.first_column)); return 'XOR'; }

">="                        { tokens.push(addToken('MAYOR_IGUAL', yytext, yylloc.first_line, yylloc.first_column)); return 'MAYOR_IGUAL'; }
">"                         { tokens.push(addToken('MAYOR', yytext, yylloc.first_line, yylloc.first_column)); return 'MAYOR'; }
"<="                        { tokens.push(addToken('MENOR_IGUAL', yytext, yylloc.first_line, yylloc.first_column)); return 'MENOR_IGUAL'; }
"<"                         { tokens.push(addToken('MENOR', yytext, yylloc.first_line, yylloc.first_column)); return 'MENOR'; }
"=="                        { tokens.push(addToken('IGUAL', yytext, yylloc.first_line, yylloc.first_column)); return 'IGUAL'; }
"="                         { tokens.push(addToken('ASIGNAR', yytext, yylloc.first_line, yylloc.first_column)); return 'ASIGNAR'; }

"."                         { tokens.push(addToken('PUNTO', yytext, yylloc.first_line, yylloc.first_column)); return 'PUNTO'; }
":"                         { tokens.push(addToken('DOS_PUNTOS', yytext, yylloc.first_line, yylloc.first_column)); return 'DOS_PUNTOS'; }
","                         { tokens.push(addToken('COMA', yytext, yylloc.first_line, yylloc.first_column)); return 'COMA'; }
";"                         { tokens.push(addToken('PUNTO_COMA', yytext, yylloc.first_line, yylloc.first_column)); return 'PUNTO_COMA'; }

"public"                    { tokens.push(addToken('PUBLIC', yytext, yylloc.first_line, yylloc.first_column)); return 'PUBLIC'; }
"class"                     { tokens.push(addToken('CLASS', yytext, yylloc.first_line, yylloc.first_column)); return 'CLASS'; }
"interface"                 { tokens.push(addToken('INTERFACE', yytext, yylloc.first_line, yylloc.first_column)); return 'INTERFACE'; }
"static"                    { tokens.push(addToken('STATIC', yytext, yylloc.first_line, yylloc.first_column)); return 'STATIC'; }

"for"                       { tokens.push(addToken('FOR', yytext, yylloc.first_line, yylloc.first_column)); return 'FOR'; }
"while"                     { tokens.push(addToken('WHILE', yytext, yylloc.first_line, yylloc.first_column)); return 'WHILE'; }
"do"                        { tokens.push(addToken('DO', yytext, yylloc.first_line, yylloc.first_column)); return 'DO'; }    
"if"                        { tokens.push(addToken('IF', yytext, yylloc.first_line, yylloc.first_column)); return 'IF'; }
"else"                      { tokens.push(addToken('ELSE', yytext, yylloc.first_line, yylloc.first_column)); return 'ELSE'; }

"true"                      { tokens.push(addToken('TRUE', yytext, yylloc.first_line, yylloc.first_column)); return 'TRUE'; }
"false"                     { tokens.push(addToken('FALSE', yytext, yylloc.first_line, yylloc.first_column)); return 'FALSE'; }
"continue"                  { tokens.push(addToken('CONTINUE', yytext, yylloc.first_line, yylloc.first_column)); return 'CONTINUE'; }
"break"                     { tokens.push(addToken('BREAK', yytext, yylloc.first_line, yylloc.first_column)); return 'BREAK'; }
"return"                    { tokens.push(addToken('RETURN', yytext, yylloc.first_line, yylloc.first_column)); return 'RETURN'; }

"void"                      { tokens.push(addToken('VOID', yytext, yylloc.first_line, yylloc.first_column)); return 'VOID'; }
"int"                       { tokens.push(addToken('INT', yytext, yylloc.first_line, yylloc.first_column)); return 'INT'; }
"double"                    { tokens.push(addToken('DOUBLE', yytext, yylloc.first_line, yylloc.first_column)); return 'DOUBLE'; }
"String"                    { tokens.push(addToken('STRING', yytext, yylloc.first_line, yylloc.first_column)); return 'STRING'; }
"char"                      { tokens.push(addToken('CHAR', yytext, yylloc.first_line, yylloc.first_column)); return 'CHAR'; }
"boolean"                   { tokens.push(addToken('BOOLEAN', yytext, yylloc.first_line, yylloc.first_column)); return 'BOOLEAN'; }

"main"                      { tokens.push(addToken('MAIN', yytext, yylloc.first_line, yylloc.first_column)); return 'MAIN'; }
"args"                      { tokens.push(addToken('ARGS', yytext, yylloc.first_line, yylloc.first_column)); return 'ARGS'; }
"System.out.println"        { tokens.push(addToken('PRINT', yytext, yylloc.first_line, yylloc.first_column)); return 'PRINT'; }
"System.out.print"          { tokens.push(addToken('PRINT', yytext, yylloc.first_line, yylloc.first_column)); return 'PRINT'; }

[a-zA-Z_][a-zA-Z0-9_]*      { tokens.push(addToken('IDENTIFICADOR', yytext, yylloc.first_line, yylloc.first_column)); return 'IDENTIFICADOR'; }
\"[^\"]*\"	                { tokens.push(addToken('CADENA', yytext, yylloc.first_line, yylloc.first_column)); return 'CADENA'; }
\'[^\']*\'              	{ tokens.push(addToken('CARACTER', yytext, yylloc.first_line, yylloc.first_column)); return 'CARACTER'; }
[0-9]+"."[0-9]+             { tokens.push(addToken('DECIMAL', yytext, yylloc.first_line, yylloc.first_column)); return 'DECIMAL'; }
[0-9]+\b	                { tokens.push(addToken('ENTERO', yytext, yylloc.first_line, yylloc.first_column)); return 'ENTERO'; }
<<EOF>>                     { tokens.push(addToken('EOF', yytext, yylloc.first_line, yylloc.first_column)); return 'EOF'; }
.                           { errores.push(addError('Lexico', yytext, yylloc.first_line, yylloc.first_column)); }
/lex





%left 'OR'
%left 'AND'
%left 'IGUAL' 'DIFERENTE'
%left 'MAYOR' 'MENOR' 'MENOR_IGUAL' 'MAYOR_IGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIV'
%right 'UMENOS'

%start ini

%%

ini
    :   headers EOF    { var aux = tokens; var aux2 = errores; tokens = []; errores = []; return [$1,aux,aux2]; }
    |   EOF            { var aux = tokens; var aux2 = errores; tokens = []; errores = []; return [[],aux,aux2]; }
;

headers
    :   headers head    { $1.push($2); $$ = $1; }
    |   head         { $$ = [$1]; }
;

head
    :   clase       { $$ = {'CLASE':$1}; }
    |   interface   { $$ = {'INTERFACE':$1}; }
    |   error       { errores.push(addError('Sintactico', yytext ,this._$.first_line ,this._$.first_column)); }
;


bloque_instruccion
    :   KEY_LEFT instrucciones KEY_RIGHT { $$ = {'izquierda':$1, 'INSTRUCCIONES': $2, 'derecha':$3}; }
    |   KEY_LEFT KEY_RIGHT    { $$ = {'izquierda': $1, 'derecha': $2}; }
;

bloque_instruccion2
    :   KEY_LEFT instrucciones2 KEY_RIGHT { $$ = {'izquierda':$1, 'INSTRUCCIONES': $2, 'derecha':$3}; }
    |   KEY_LEFT KEY_RIGHT    { $$ = {'izquierda': $1, 'derecha': $2}; }
;

instrucciones
    :   instrucciones instruccion   { $1.push($2); $$ = $1; }
    |   instruccion                 { $$ = [$1]; }
;

instruccion
    :   declaracion PUNTO_COMA  { $$ = { 'DECLARACION':$1 }; }
    |   asignacion  PUNTO_COMA  { $$ = { 'ASIGNACION':$1 }; }
    |   main                    { $$ = { 'MAIN':$1 }; }
    |   metodo                  { $$ = { 'METODO':$1 }; }                
    |   error                   { errores.push(addError('Sintactico', yytext ,this._$.first_line ,this._$.first_column)); }
;

instrucciones2
    :   instrucciones2 instruccion2  { $1.push($2); $$ = $1; }
    |   instruccion2                 { $$ = [$1]; }
;

instruccion2
    :   metodo2 PUNTO_COMA      { $$ = { 'FUNCION':$1 }; }
    |   error                   { errores.push(addError('Sintactico', yytext ,this._$.first_line ,this._$.first_column)); }
;

sentencia
    :   declaracion PUNTO_COMA  { $$ = {'DECLARACION':$1} }
    |   asignacion  PUNTO_COMA  { $$ = {'ASIGNACION':$1} }
    |   call_metodo PUNTO_COMA  { $$ = {'METODO':$1} }
    |   if                      { $$ = {'IF':$1} }
    |   while                   { $$ = {'WHILE':$1} }
    |   do PUNTO_COMA           { $$ = {'DO':$1} }
    |   for                     { $$ = {'FOR':$1} }
    |   print PUNTO_COMA        { $$ = {'PRINT':$1} }
    |   return PUNTO_COMA       { $$ = {'RETURN':$1} }
    |   CONTINUE PUNTO_COMA     { $$ = {'CONTINUE':$1} }
    |   BREAK PUNTO_COMA        { $$ = {'BREAK':$1} }
    |   incremento PUNTO_COMA   { $$ = {'INCREMENTO':$1} }
    |   error                   { errores.push(addError('Sintactico', yytext ,this._$.first_line ,this._$.first_column)); }
;

sentencias
    :   sentencias sentencia    { $1.push($2); $$ = $1; }
    |   sentencia               { $$ = [$1]; }
;

clase
    :   PUBLIC CLASS IDENTIFICADOR bloque_instruccion     { $$ = {'visibilidad':$1, 'clase':$2, 'identificador':$3, 'BLOQUE INSTRUCCION':$4}; }
;

interface
    :   PUBLIC INTERFACE IDENTIFICADOR bloque_instruccion2 { $$ = {'visibilidad':$1, 'interface':$2, 'identificador':$3, 'BLOQUE INSTRUCCION':$4}; }
;


bloque_sentencia
    :   KEY_LEFT sentencias KEY_RIGHT    { $$ = {'izquierda': $1, 'SENTENCIAS': $2, 'derecha': $3}; }
    |   KEY_LEFT KEY_RIGHT    { $$ = {'izquierda': $1, 'derecha': $2}; }
;

declaracion
    :   tipo declaraciones    { $$ = {'tipo': $1, 'DECLARACIONES': $2}; }
;

declaraciones
    :   declaraciones COMA decla   { $1.push({'coma':$2, 'ASIGNACION':$3}); $$ = $1; }
    |   decla                      { $$ = [{'ASIGNACION':$1}]; }
;

decla
    :   IDENTIFICADOR ASIGNAR expresion { $$ = {'identificador':$1, 'operador':$2, 'EXPRESION':$3}; }
    |   IDENTIFICADOR                   { $$ = {'identificador':$1}; }
;

asignacion
    :   IDENTIFICADOR ASIGNAR expresion { $$ = {'identificador':$1, 'operador':$2, 'EXPRESION':$3}; }
;

if
    :   IF PAR_LEFT expresion PAR_RIGHT bloque_sentencia                          { $$ = {'if':$1, 'izquierda':$2, 'expresion':$3, 'derecha': $4, 'BLOQUE SENTENCIA':$5}; }
    |   IF PAR_LEFT expresion PAR_RIGHT bloque_sentencia ELSE bloque_sentencia    { $$ = {'if':$1, 'izquierda':$2, 'expresion':$3, 'derecha': $4, 'BLOQUE SENTENCIA':$5, 'else':$6, 'IF':$7}; }
    |   IF PAR_LEFT expresion PAR_RIGHT bloque_sentencia ELSE if                  { $$ = {'if':$1, 'izquierda':$2, 'expresion':$3, 'derecha': $4, 'BLOQUE SENTENCIA':$5, 'else':$6, 'IF': $7}; }
;

while
    :   WHILE PAR_LEFT expresion PAR_RIGHT bloque_sentencia     { $$ = {'while':$1, 'izquierda':$2, 'EXPRESION':$3, 'derecha':$4, 'BLOQUE SENTENCIA':$5}; }
;

do
    :   DO bloque_sentencia WHILE PAR_LEFT expresion PAR_RIGHT     { $$ = {'do':$1, 'BLOQUE SENTENCIA':$2 ,'while':$3, 'izquierda':$4, 'EXPRESION':$5, 'derecha':$6}; }
;

for
    :   FOR PAR_LEFT declaracion PUNTO_COMA expresion PUNTO_COMA expresion PAR_RIGHT bloque_sentencia    { $$ = {'for': $1, 'izquierda': $2, 'DECLARACION': $3, 'EXPRESION 1': $5, 'EXPRESION 2': $7, 'derecha': $8,'BLOQUE SENTENCIA': $9}; }
;

incremento 
        :   IDENTIFICADOR INCREMENTO   { $$ = {'identificador': $1, 'operador': $2}; }
        |   IDENTIFICADOR DECREMENTO   { $$ = {'identificador': $1, 'operador': $2}; }
;

print
    :   PRINT PAR_LEFT expresion PAR_RIGHT   { $$ = {'print': 'print', 'izquierda': $2, 'EXPRESION': $3,'derecha': $4}; }
;

main
    :   PUBLIC STATIC VOID MAIN PAR_LEFT STRING COR_LEFT COR_RIGHT ARGS PAR_RIGHT bloque_sentencia  { $$ = {'public':$1,'static':$2,'void':$3,'main': $4, 'izquierda': $5, 'args': $9, 'derecha' : $10, 'BLOQUE SENTENCIA': $11}; }
;

metodo
    :   PUBLIC VOID IDENTIFICADOR PAR_LEFT parametros PAR_RIGHT bloque_sentencia   { $$ = {'visibilidad': $1, 'tipo': $2, 'identificador': $3,'izquierda': $4, 'PARAMETROS': $5, 'derecha': $6, 'BLOQUE SENTENCIA': $7}; }
    |   PUBLIC tipo IDENTIFICADOR PAR_LEFT parametros PAR_RIGHT bloque_sentencia   { $$ = {'visibilidad': $1, 'tipo': $2, 'identificador': $3,'izquierda': $4, 'PARAMETROS': $5, 'derecha': $6, 'BLOQUE SENTENCIA': $7}; }
    |   PUBLIC VOID IDENTIFICADOR PAR_LEFT PAR_RIGHT bloque_sentencia              { $$ = {'visibilidad': $1, 'tipo': $2, 'identificador': $3,'izquierda': $4, 'derecha': $5, 'BLOQUE SENTENCIA': $6}; }
    |   PUBLIC tipo IDENTIFICADOR PAR_LEFT PAR_RIGHT bloque_sentencia              { $$ = {'visibilidad': $1, 'tipo': $2, 'identificador': $3,'izquierda': $4, 'derecha': $5, 'BLOQUE SENTENCIA': $6}; }
;

metodo2
    :   PUBLIC VOID IDENTIFICADOR PAR_LEFT parametros PAR_RIGHT         { $$ = {'visibilidad': $1, 'tipo': $2, 'identificador': $4,'izquierda': $4, 'PARAMETROS': $5, 'derecha': $6}; }  
    |   PUBLIC tipo IDENTIFICADOR PAR_LEFT parametros PAR_RIGHT         { $$ = {'visibilidad': $1, 'tipo': $2, 'identificador': $4,'izquierda': $4, 'PARAMETROS': $5, 'derecha': $6} ;}
    |   PUBLIC VOID IDENTIFICADOR PAR_LEFT PAR_RIGHT                    { $$ = {'visibilidad': $1, 'tipo': $2, 'identificador': $3, 'izquierda': $4, 'derecha': $5}; }  
    |   PUBLIC tipo IDENTIFICADOR PAR_LEFT PAR_RIGHT                    { $$ = {'visibilidad': $1, 'tipo': $2, 'identificador': $3, 'izquierda': $4, 'derecha': $5}; }
;

call_metodo
    :   IDENTIFICADOR PAR_LEFT valores PAR_RIGHT    { $$ = {'identificador': $1, 'izquierdo': $2, 'PARAMETROS': $3, 'derecha': $4}; }
    |   IDENTIFICADOR PAR_LEFT PAR_RIGHT            { $$ = {'identificador': $1, 'izquierdo': $2, 'derecha': $3}; }
;

valores 
    :   valores COMA expresion  { $1.push({'coma':$2, 'EXPRESION':$3}); $$ = $1; }
    |   expresion               { $$ = [{'EXPRESION':$1}]; }
;

parametros
    :   parametros COMA parametro   { $1.push({'coma':$2, 'PARAMETRO':$3}); $$ = $1; }
    |   parametro                   { $$ = [{'PARAMETRO':$1}]; }
;

parametro
    :   tipo IDENTIFICADOR  { $$ = {'tipo': $1, 'identificador': $2}; }
;

return
    :   RETURN expresion  { $$ = {'return': $1, 'EXPRESION': $2}; }
    |   RETURN            { $$ = {'return': $1}; }
;

expresion
    :   expresion MAS expresion             { $$ = {'EXPRESION 1': $1, 'operador': $2, 'EXPRESION 2': $3}; }
    |   expresion MENOS expresion           { $$ = {'EXPRESION 1': $1, 'operador': $2, 'EXPRESION 2': $3}; }
    |   expresion POR expresion             { $$ = {'EXPRESION 1': $1, 'operador': $2, 'EXPRESION 2': $3}; }
    |   expresion DIV expresion             { $$ = {'EXPRESION 1': $1, 'operador': $2, 'EXPRESION 2': $3}; }
    |   MENOS expresion %prec UMENOS        { $$ = $1 + $2; }
    |   primitivo                           { $$ = $1; }
    |   expresion IGUAL expresion           { $$ = {'EXPRESION 1': $1, 'operador': $2, 'EXPRESION 2': $3}; }
    |   expresion DIFERENTE expresion       { $$ = {'EXPRESION 1': $1, 'operador': $2, 'EXPRESION 2': $3}; }
    |   expresion MAYOR expresion           { $$ = {'EXPRESION 1': $1, 'operador': $2, 'EXPRESION 2': $3}; }
    |   expresion MENOR expresion           { $$ = {'EXPRESION 1': $1, 'operador': $2, 'EXPRESION 2': $3}; }
    |   expresion MAYOR_IGUAL expresion     { $$ = {'EXPRESION 1': $1, 'operador': $2, 'EXPRESION 2': $3}; }
    |   expresion MENOR_IGUAL expresion     { $$ = {'EXPRESION 1': $1, 'operador': $2, 'EXPRESION 2': $3}; }
    |   expresion AND expresion             { $$ = {'EXPRESION 1': $1, 'operador': $2, 'EXPRESION 2': $3}; }
    |   expresion OR expresion              { $$ = {'EXPRESION 1': $1, 'operador': $2, 'EXPRESION 2': $3}; }
    |   NOT expresion %prec UMENOS          { $$ = {'negacion': $1, 'EXPRESION': $2}; }
    |   PAR_LEFT expresion PAR_RIGHT        { $$ = {'izquierda': $1, 'EXPRESION': $2, 'derecha': $3}; }
    |   incremento                          { $$ = $1; }
;

tipo 
    :   INT     { $$ = $1; }
    |   DOUBLE  { $$ = $1; } 
    |   STRING  { $$ = $1; }
    |   CHAR    { $$ = $1; }
    |   BOOLEAN { $$ = $1; }                 
;    

primitivo
    :   IDENTIFICADOR   { $$ = $1; }
    |   ENTERO          { $$ = $1; }
    |   DECIMAL         { $$ = $1; }
    |   CADENA          { $$ = $1; }
    |   CARACTER        { $$ = $1; }
    |   TRUE            { $$ = $1; }
    |   FALSE           { $$ = $1; }
;  
