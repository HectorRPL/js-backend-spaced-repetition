const express = require('express');

const app = express();

// models

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

app.get('/todo/:busqueda', (req, res) => {

        const regex = new RegExp(req.params.busqueda, 'i'); // este regex es lo mismo que regex /busqueda, i/

        Promise.all([
            buscarHospitales(regex),
            buscarMedicos(regex),
            buscarUsuarios(regex)
        ]).then(respuestas => {

            res.status(200).json({
                hospitales: respuestas[0],
                medicos: respuestas[1],
                usuarios: respuestas[2]
            });

        });

    }
);

// PROMESAS para búsquedas

function buscarHospitales(regex) {

    return new Promise((resolve, reject) => {

        Hospital.find({nombre: regex})
            .populate('usuarioId', 'nombre email')
            .exec((err, hospitales) => {

                if (err) {

                    reject(err);

                } else {

                    resolve(hospitales);

                }

            });

    });

}

function buscarMedicos(regex) {

    return new Promise((resolve, reject) => {

        Medico.find({nombre: regex})
            .populate('usuarioId', 'nombre email')
            .populate('hospitalId')
            .exec((err, medicosEncontrados) => {

                if (err) {

                    reject(err);

                } else {

                    resolve(medicosEncontrados);

                }

            });

    });

}

function buscarUsuarios(regex) {
    /*
    *   Este método es algo especial porque tiene mas complejidad, por ejemplo que busca en dos propiedades
    *   y también vamos a restringir la entrega de resultados, es decir, no enviar el password por ejemplo
    */

    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombre email role')
            .or([
                {'nombre': regex}, // para buscar en mas de una propiedad del documento
                {'email': regex}
            ])
            .exec((err, usuariosEncontrados) => {

                if (err) {

                    reject('Error', err);

                } else {

                    resolve(usuariosEncontrados);

                }

            })

    });

}

module.exports = app;
