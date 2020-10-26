const express = require('express');
const app = express();
var java = require('./Interpreter/java');

app.set('port', 3000);
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Funciona');
});

app.post('/js', (req, res) => {
    var respuesta = java.analisis(req.body.contenido);
    res.send(respuesta);
});

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});