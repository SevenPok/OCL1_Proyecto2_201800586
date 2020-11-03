const express = require('express');
const app = express();
var cors = require('cors');
var java = require('./Interpreter/java');
var python = require('./Python/python');

app.use(cors());
app.set('port', 3000);
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ data: 'funciona' });
});

app.post('/contenido', (req, res) => {
    var rj = java.analisis(req.body.contenido);
    var rp = python.analisis(req.body.contenido);
    var tj = java.traduccion(req.body.contenido);
    var tp = java.traduccion2(req.body.contenido);
    res.send({ Java: rj, Python: rp, traduccion: tj, tPython: tp });
});

app.post('/python/tokens', (req, res) => {
    var respuesta = python.analisis(req.body.contenido);
    res.send({ tokens: respuesta.tokens });
});

app.post('/js/error', (req, res) => {
    var respuesta = java.analisis(req.body.contenido);
    res.send({ errores: respuesta.errores });
});

app.post('/python/error', (req, res) => {
    var respuesta = python.analisis(req.body.contenido);
    res.send({ errores: respuesta.errores });
});

app.post('/js/arbol', (req, res) => {
    var respuesta = java.analisis(req.body.contenido);
    res.send({ dot: respuesta.dot });
});

app.post('/python/arbol', (req, res) => {
    res.send({ dot: 'Todabia no perro' });
});

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});