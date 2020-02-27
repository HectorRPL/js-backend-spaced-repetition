// required

var express = require('express');

// incializar variables

var app = express(); // se define el servidor express

// rutas

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición relizada correctamente'
    });
});

// escuchar peticiones

app.listen(3000, () => {console.log('express online, 3000 port')}); // escuchar
