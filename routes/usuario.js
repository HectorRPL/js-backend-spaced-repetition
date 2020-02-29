let express = require('express');

let app = express();

let Usuario = require('../models/usuario');

app.get('/', (req, res, next) => {

        Usuario.find(
            {}, // trae todos los usuarios
            'role _id nombre email img', // tes para traer todos los campos menos el pass
        ).exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500)
                        .json(
                            { // res = responde con un 500
                                ok: false,
                                mensaje: 'Error al intentar obtener el usuario.',
                                errors: err
                            }
                        );
                }

                res.status(200) // responde con un 200
                    .json( // se declara que enviaráá un json
                        { // [ini] obj
                            ok: true,
                            usuarios: usuarios // como prop el obj usuarios en []
                        } // [end] obj
                    );

            }
        );

    }
);

module.exports = app;
