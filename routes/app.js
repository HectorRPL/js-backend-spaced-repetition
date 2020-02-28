let express = require('express');

let app = express();

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición relizada correctamente'
    });
});

module.exports = app;
