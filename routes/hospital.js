const express = require('express');



const app = express();

const Hospital = require('../models/hospital');

let mdAutenticacion = require('../middelwares/autenticacion');

// gel all

app.get('/', (req, res) => {
    Hospital.find({}, 'nombre').exec((err, hospitales) => { // TODO: aunque no le ponga props las manda, como la fecha.

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json({
                ok: true, // TODO: Aqui mejor ponemos la paginación
                hospitales: hospitales
            }
        );

    });
});

// post

app.post(
    '',
    mdAutenticacion.verificaToken,
    (req, res) => {
    const hospital = new Hospital({
        nombre: req.body.nombre,
        usuario: req.body.usuario
    });

    hospital.save((err, hospitalCreado) => {
        if (err) {

            return res.status(500).json(err);

        }

        res.status(200).json(hospitalCreado);
    });
});


// put

app.put(
    '/:id',
    mdAutenticacion.verificaToken,
    (req, res) => {

        Hospital.findById(req.params.id, (err, hospitalEncontrado) => {

            if (!hospitalEncontrado) {
                return res.status(404).json(err); // el usuario no existe
            }

            hospitalEncontrado.nombre = req.body.nombre;
            hospitalEncontrado.update = new Date();

            hospitalEncontrado.save((err, hospitalEncontrado) => {

                if (err) {
                    return res.status(500).json(err);  // error cualquiera
                }

                const usuarioToken = req.usuario;
                // console.log({usuarioToken});

                res.status(200).json(hospitalEncontrado);

            });

        });

    }
);

module.exports = app; // NUNCA OLVIDAR EXPORTAR. Propongo el siguinete procedimeinto:

/*
1. creas el archivo js
2. creas el: const express = require('express');
3. creas el: const app = express();
4 INMEDIATAMENTE después el export: module.exports = app;
5. FIN DE LA PUTA DISCUSIÓN
*/






