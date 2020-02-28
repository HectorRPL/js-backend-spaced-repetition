let express = require('express');

let app = express();

let Usuario = require('../models/usuario');

app.get('/', (req, res, next) => {

    Usuario.find(
        {},
        'role _id nombre email img', // tes para traer todos los campos menos el pass
    ).exec(
        (err, usuarios) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al intentar obtener el usuario.',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                usuarios: usuarios
            });

        }
    );

});

module.exports = app;
