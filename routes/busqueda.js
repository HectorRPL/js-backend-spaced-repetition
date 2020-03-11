const express = require('express');

const app = express();

// models

const Hospital = require('../models/hospital');

app.get('/todo/:busqueda', (req, res,) => {

        Hospital.find(
            {
                nombre: new RegExp(req.params.busqueda, 'i') // este regex es lo mismo que regex /busqueda, i/
            },
            (err, hospitales) => {
                res.status(200).json(hospitales);
            }
        );
    }
);

module.exports = app;
