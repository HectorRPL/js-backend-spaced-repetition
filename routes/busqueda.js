const express = require('express');

const app = express();

// models

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

app.get('/todo/:busqueda', (req, res) => {

        const regex = new RegExp(req.params.busqueda, 'i'); // este regex es lo mismo que regex /busqueda, i/

        Promise.all([
            buscarHospitales(regex),
            buscarMedicos(regex)
        ]).then(respuestas => {

            res.status(200).json({
                hospitales: respuestas[0],
                medicos: respuestas[1]
            });

        });

    }
);

// PROMESAS para búsquedas

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

function buscarMedicos(regex) {

    return new Promise((resolve, reject) => {

        Medico.find(
            {
                nombre: regex
            },
            (err, medicosEncontrados) => {

                if (err) {

                    reject(err);

                } else {

                    resolve(medicosEncontrados);

                }

            }
        );

    });

}

module.exports = app;
