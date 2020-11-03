var contador = 0;

function get_cont() {
    return contador++;
}

var vent_focus = "pestana1";

function get_vent() {
    return vent_focus;
}

function set_vent(vent) {
    vent_focus = vent;
}

var lista = new Array();

function linkedlist(pestana, nombre) {
    var obj = new Object();
    obj.pestana = pestana;
    obj.nombre = nombre;
    lista.push(obj);
}

function deletepes(pestana) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].pestana == pestana) {
            delete lista[i];
        }
    }
}

/*--------------------------------------Funcion Al Cambiar Ventana---------------------------------------*/
function index(pestanias, pestania) {
    var id = pestania.replace('pestana', '');
    set_vent('textarea' + id);

    var pestanna1 = document.getElementById(pestania);
    var listaPestannas = document.getElementById(pestanias);
    var cpestanna = document.getElementById('c' + pestania);
    var listacPestannas = document.getElementById('contenido' + pestanias);

    var i = 0;
    while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined') {
        $(document).ready(function() {
            $(listacPestannas.getElementsByTagName('div')[i]).css('display', 'none');
            $(listaPestannas.getElementsByTagName('li')[i]).css('background', '');
            $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom', '');
        });
        i += 1;
    }

    $(document).ready(function() {
        $(cpestanna).css('display', '');
        $(pestanna1).css('background', 'dimgray');
        $(pestanna1).css('padding-bottom', '2px');
    });

    try {
        var act = document.getElementById('cpestana' + id);
        var tact = document.getElementById('textarea' + id);

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor = CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "eclipse",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value = editor.getValue();
        });
    } catch (error) {}
}

/*---------------------------------------Funcion Agregar Pestania----------------------------------------*/
function agregar() {
    var x = get_cont();
    var lu = document.getElementById("lista");
    var li = document.createElement("li");
    li.setAttribute('id', 'pestana' + x);
    var a = document.createElement("a");
    a.setAttribute('id', 'a' + x);
    a.setAttribute('href', 'javascript:index("pestanas","pestana' + x + '")');
    a.text = 'Pagina ' + (x + 1);
    li.appendChild(a);
    lu.appendChild(li);
    index("pestanas", "pestana" + x);

    var contenido = document.getElementById("contenidopestanas");
    var divp = document.createElement("div");
    divp.setAttribute('id', 'cpestana' + x);
    var ta = document.createElement("textarea");
    ta.setAttribute('id', 'textarea' + x);
    ta.setAttribute('name', 'textarea' + x);
    ta.setAttribute('class', 'ta');
    ta.setAttribute('style', 'display:none');
    ta.cols = 123;
    ta.rows = 30;
    divp.appendChild(ta);
    contenido.appendChild(divp);

    var act = document.getElementById('cpestana' + x);
    var tact = document.getElementById('textarea' + x);

    var editor = CodeMirror(act, {
        lineNumbers: true,
        value: tact.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "eclipse",
        mode: "text/x-java"
    }).on('change', editor => {
        tact.value = editor.getValue();
    });
}

function quitar() {
    try {
        var lu = document.getElementById("lista");
        lu.removeChild(document.getElementById(get_vent().replace("textarea", "pestana")));
        var contenido = document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_vent().replace("textarea", "cpestana")));
        deletepes(get_vent());
    } catch (error) {}
}


/*-----------------------------------------------File---------------------------------------------------*/
function AbrirArchivo(files) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var act = document.getElementById(get_vent().replace("textarea", "cpestana"));
        var tact = document.getElementById(get_vent());
        tact.value = e.target.result;

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor = CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "eclipse",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value = editor.getValue();
        });
    };
    reader.readAsText(file);
    file.clear;

    var a = document.getElementById(get_vent().replace("textarea", "a"));
    a.text = file.name;
    linkedlist(get_vent(), file.name);

    var file_input = document.getElementById("fileInput");
    document.getElementById('fileInput').value = "";
}

function DescargarArchivo() {
    var ta = document.getElementById(get_vent());
    var contenido = ta.value; //texto de vent actual

    //formato para guardar el archivo
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();
    var HH = hoy.getHours();
    var MM = hoy.getMinutes();
    var formato = get_vent().replace("textarea", "") + "_" + dd + "_" + mm + "_" + yyyy + "_" + HH + "_" + MM;

    var nombre = "Archivo" + formato + ".java"; //nombre del archivo
    var file = new Blob([contenido], { type: 'text/plain' });

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, nombre);
    } else {
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function Analizar() {
    errorJava();
    errorPython();
}

function errorJava() {
    var contenido = document.getElementById(get_vent()).value;
    axios({
        method: 'POST',
        url: 'http://localhost:3000/js/error',
        data: { 'contenido': contenido }
    }).then(res => {
        //console.log(res.data.errores);
        var java = document.getElementById('java').value + "\n\n";
        for (let index = 0; index < res.data.errores.length; index++) {
            java += 'Tipo: ' + res.data.errores[index].tipo + ', Lexema: ' + res.data.errores[index].lexema + ', Fila: ' + res.data.errores[index].fila + ', Columna: ' + res.data.errores[index].columna + "\n";
        }
        java += "\n------------------------------------------------------------";
        document.getElementById('java').value = java;
    }).catch(err => console.log(err))

}

function errorPython() {
    var contenido = document.getElementById(get_vent()).value;
    axios({
        method: 'POST',
        url: 'http://localhost:3000/python/error',
        data: { 'contenido': contenido }
    }).then(res => {
        //console.log(res.data.errores);
        var java = document.getElementById('python').value + "\n\n";
        for (let index = 0; index < res.data.errores.length; index++) {
            java += 'Tipo: ' + res.data.errores[index].tipo + ', Lexema: ' + res.data.errores[index].lexema + ', Fila: ' + res.data.errores[index].fila + ', Columna: ' + res.data.errores[index].columna + "\n";
        }
        java += "\n------------------------------------------------------------";
        document.getElementById('python').value = java;
    }).catch(err => console.log(err))

}

function generarArbol() {
    arbolJava();
}



function arbolJava() {
    var contenido = document.getElementById(get_vent()).value;
    axios({
        method: 'POST',
        url: 'http://localhost:3000/js/arbol',
        data: { 'contenido': contenido }
    }).then(res => {
        var dot = res.data.dot;
        document.getElementById("graph").innerHTML = "";
        d3.select("#graph")
            .graphviz()
            .dot(dot)
            .render();

    }).catch(err => console.log(err))
}

function descargarJava() {
    var contenido = document.getElementById(get_vent()).value;
    axios({
        method: 'POST',
        url: 'http://localhost:3000/contenido',
        data: { 'contenido': contenido }
    }).then(res => {
        var doc = new jsPDF();
        var texto = String(res.data.traduccion).split('\n');
        doc.setFontSize(22);
        doc.text(20, 10, 'Traduccion JavaScript');
        pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(14);
        var y = 15;
        for (let index = 0; index < texto.length; index++) {
            const element = texto[index];
            if (y >= pageHeight - 10) {
                doc.addPage();
                y = 10; // Restart height position 
            }
            doc.text(20, y, element);
            y += 7;
        }
        doc.addPage();
        doc.setFontSize(22);
        doc.text(20, 10, 'Tokens JavaScript');
        let header = ["No.", "Token", "Lexema", "Fila", "Columna"];
        let headerConfig = header.map(key => ({
            'name': key,
            'prompt': key,
            'width': 50,
            'align': 'center',
            'padding': 0
        }));
        var data = [];
        for (let index = 0; index < res.data.Java.tokens.length; index++) {
            const element = res.data.Java.tokens[index];
            data.push({ 'No.': (index + 1), 'Token': element.token, 'Lexema': element.lexema, 'Fila': element.fila, 'Columna': element.columna })
        }
        doc.table(10, 20, data, headerConfig);

        doc.addPage();
        doc.setFontSize(22);
        doc.text(20, 10, 'Errores JavaScript');
        header = ["No.", "Tipo", "Lexema", "Fila", "Columna"];
        let headerConfig2 = header.map(key => ({
            'name': key,
            'prompt': key,
            'width': 50,
            'align': 'center',
            'padding': 0
        }));

        var data2 = [];
        for (let index = 0; index < res.data.Java.errores.length; index++) {
            const element = res.data.Java.errores[index];
            data2.push({ 'No.': (index + 1), 'Tipo': element.tipo, 'Lexema': element.lexema, 'Fila': element.fila, 'Columna': element.columna })
        }

        doc.table(10, 20, data2, headerConfig2);

        doc.save('Reporte.pdf');
    }).catch(err => console.log(err))
}

function descargarAmbos() {
    var contenido = document.getElementById(get_vent()).value;
    axios({
        method: 'POST',
        url: 'http://localhost:3000/contenido',
        data: { 'contenido': contenido }
    }).then(res => {
        var doc = new jsPDF();
        var texto = String(res.data.traduccion).split('\n');
        doc.setFontSize(22);
        doc.text(20, 10, 'Traduccion JavaScript');
        pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(14);
        var y = 15;
        for (let index = 0; index < texto.length; index++) {
            const element = texto[index];
            if (y >= pageHeight - 10) {
                doc.addPage();
                y = 10;
            }
            doc.text(20, y, element);
            y += 7;
        }
        doc.addPage();
        doc.setFontSize(22);
        doc.text(20, 10, 'Tokens JavaScript');
        let header = ["No.", "Token", "Lexema", "Fila", "Columna"];
        let headerConfig = header.map(key => ({
            'name': key,
            'prompt': key,
            'width': 50,
            'align': 'center',
            'padding': 0
        }));
        var data = [];
        for (let index = 0; index < res.data.Java.tokens.length; index++) {
            const element = res.data.Java.tokens[index];
            data.push({ 'No.': (index + 1), 'Token': element.token, 'Lexema': element.lexema, 'Fila': element.fila, 'Columna': element.columna })
        }
        doc.table(10, 20, data, headerConfig);
        doc.addPage();
        doc.setFontSize(22);
        doc.text(20, 10, 'Errores JavaScript');
        header = ["No.", "Tipo", "Lexema", "Fila", "Columna"];
        let headerConfig2 = header.map(key => ({
            'name': key,
            'prompt': key,
            'width': 50,
            'align': 'center',
            'padding': 0
        }));
        var data2 = [];
        for (let index = 0; index < res.data.Java.errores.length; index++) {
            const element = res.data.Java.errores[index];
            data2.push({ 'No.': (index + 1), 'Tipo': element.tipo, 'Lexema': element.lexema, 'Fila': element.fila, 'Columna': element.columna })
        }
        doc.table(10, 20, data2, headerConfig2);
        doc.addPage();


        texto = String(res.data.tPython).split('\n');
        //console.log(res.data.tPython);
        doc.setFontSize(22);
        doc.text(20, 10, 'Traduccion Python');
        pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(14);
        y = 15;
        for (let index = 0; index < texto.length; index++) {
            const element = texto[index];
            if (y >= pageHeight - 10) {
                doc.addPage();
                y = 10;
            }
            doc.text(20, y, element);
            y += 7;
        }
        doc.addPage();
        doc.setFontSize(22);
        doc.text(20, 10, 'Tokens Python');
        header = ["No.", "Token", "Lexema", "Fila", "Columna"];
        headerConfig = header.map(key => ({
            'name': key,
            'prompt': key,
            'width': 50,
            'align': 'center',
            'padding': 0
        }));
        data = [];
        for (let index = 0; index < res.data.Python.tokens.length; index++) {
            const element = res.data.Python.tokens[index];
            data.push({ 'No.': (index + 1), 'Token': element.token, 'Lexema': element.lexema, 'Fila': element.fila, 'Columna': element.columna })
        }
        doc.table(10, 20, data, headerConfig);

        doc.addPage();
        doc.setFontSize(22);
        doc.text(20, 10, 'Errores Python');
        header = ["No.", "Tipo", "Lexema", "Fila", "Columna"];
        headerConfig2 = header.map(key => ({
            'name': key,
            'prompt': key,
            'width': 50,
            'align': 'center',
            'padding': 0
        }));
        data2 = [];
        for (let index = 0; index < res.data.Python.errores.length; index++) {
            const element = res.data.Python.errores[index];
            data2.push({ 'No.': (index + 1), 'Tipo': element.tipo, 'Lexema': element.lexema, 'Fila': element.fila, 'Columna': element.columna })
        }
        doc.table(10, 20, data2, headerConfig2);




        doc.save('Java.pdf');
    }).catch(err => console.log(err))
}

function descargarPython() {
    var contenido = document.getElementById(get_vent()).value;
    axios({
        method: 'POST',
        url: 'http://localhost:3000/contenido',
        data: { 'contenido': contenido }
    }).then(res => {
        var doc = new jsPDF();
        var texto = String(res.data.tPython).split('\n');
        //console.log(res.data.tPython);
        doc.setFontSize(22);
        doc.text(20, 10, 'Traduccion Python');
        pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(14);
        var y = 15;
        for (let index = 0; index < texto.length; index++) {
            const element = texto[index];
            if (y >= pageHeight - 10) {
                doc.addPage();
                y = 10;
            }
            doc.text(20, y, element);
            y += 7;
        }
        doc.addPage();
        doc.setFontSize(22);
        doc.text(20, 10, 'Tokens Python');
        let header = ["No.", "Token", "Lexema", "Fila", "Columna"];
        let headerConfig = header.map(key => ({
            'name': key,
            'prompt': key,
            'width': 50,
            'align': 'center',
            'padding': 0
        }));
        var data = [];
        for (let index = 0; index < res.data.Python.tokens.length; index++) {
            const element = res.data.Python.tokens[index];
            data.push({ 'No.': (index + 1), 'Token': element.token, 'Lexema': element.lexema, 'Fila': element.fila, 'Columna': element.columna })
        }
        doc.table(10, 20, data, headerConfig);
        doc.addPage();
        doc.setFontSize(22);
        doc.text(20, 10, 'Errores Python');
        header = ["No.", "Tipo", "Lexema", "Fila", "Columna"];
        let headerConfig2 = header.map(key => ({
            'name': key,
            'prompt': key,
            'width': 50,
            'align': 'center',
            'padding': 0
        }));
        var data2 = [];
        for (let index = 0; index < res.data.Python.errores.length; index++) {
            const element = res.data.Python.errores[index];
            data2.push({ 'No.': (index + 1), 'Tipo': element.tipo, 'Lexema': element.lexema, 'Fila': element.fila, 'Columna': element.columna })
        }
        doc.table(10, 20, data2, headerConfig2);
        doc.save('Python.pdf');
    }).catch(err => console.log(err))
}