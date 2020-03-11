const express = require('express');

const app = express();

// models

const Hospital = require('../models/hospital');

app.get('/todo/:busqueda', (req, res) => {











// IMPLEMENTACIÓN DE PROMESA

        const regex = new RegExp(req.params.busqueda, 'i'); // este regex es lo mismo que regex /busqueda, i/

        buscarHospitales(regex).then(hospitales => {

            res.status(200).json(hospitales);

        });

    }
);

// PROMESAS

function buscarHospitales(regex) {

    return new Promise((resolve, reject) => {

        Hospital.find(
            {
                nombre: regex
            },
            (err, hospitales) => {

                if (err) {

                    reject(err);

                } else {

                    resolve(hospitales);

                }


            }
        );

    });

}

module.exports = app;
