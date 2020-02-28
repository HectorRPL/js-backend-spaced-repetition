// required

let express = require('express');
let mongoose = require('mongoose');

// incializar variables

let app = express(); // se define el servidor express

// conexión a mongodb (base de datos)

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, resp) => {

    if (err) throw err;

    console.log('\x1b[36m%s\x1b[0m', 'database: conected');

});

// rutas

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición relizada correctamente'
    });
});

// escuchar peticiones

app.listen(3000, () => {

    console.log('\x1b[36m%s\x1b[0m', 'server: conected');


}); // escuchar
