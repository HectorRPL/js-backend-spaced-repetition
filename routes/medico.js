const express = require('express');


const app = express();

const Medico = require('../models/medico');

const mdAutenticacion = require('../middelwares/autenticacion');

// get all

app.get('/', (req, res) => {
    Medico.find({})
        .skip(Number(req.query.desde) || 0) // apartir de aqui comienza a contar, si le mando un 10 entonces con el .limit() me trae los 15
        .limit(1000) // solo envia 5 registros por cada petición
        .populate('usuarioId', 'nombre email')
        .populate('hospitalId')
        .exec((err, medicos) => {

            if (err) {
                return res.status(500).json(err);
            }

            Medico.count({}, (err, conteo) => {
                res.status(200).json({
                        ok: true, // TODO: Aqui mejor ponemos la paginación
                        medicos: medicos,
                        rows: conteo
                    }
                );
            });

        });
});

// post

app.post(
    '',
    mdAutenticacion.verificaToken,
    (req, res) => {
        const medico = new Medico({
            nombre: req.body.nombre,
            usuarioId: req.body.usuarioId,
            hospitalId: req.body.hospitalId
        });

        medico.save((err, medicoCreado) => {
            if (err) {

                return res.status(500).json(err);

            }

            res.status(200).json(medicoCreado);
        });
    });


// put

app.put(
    '/:id',
    mdAutenticacion.verificaToken,
    (req, res) => {

        Medico.findById(req.params.id, (err, medicoEncontrado) => {

            if (!medicoEncontrado) {
                return res.status(404).json(err); // el médico no existe
            }

            medicoEncontrado.nombre = req.body.nombre;
            medicoEncontrado.update = new Date();

            medicoEncontrado.save((err, medicoEncontrado) => {

                if (err) {
                    return res.status(500).json(err);  // error cualquiera
                }

                res.status(200).json(medicoEncontrado);

            });

        });

    }
);

app.delete(
    '/:id',
    mdAutenticacion.verificaToken,
    (req, res) => {

        Medico.findOneAndRemove(req.body.id, (err, medicoEliminado) => {

            if (err) {
                return res.status(500).json(err);  // error cualquiera
            }

            res.status(200).json(medicoEliminado);

        });

    }
);

module.exports = app; // NUNCA OLVIDAR EXPORTAR. Propongo el siguinete procedimeinto:








