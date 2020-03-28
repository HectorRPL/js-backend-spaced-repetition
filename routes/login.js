let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken
const SEED = require('../config/config');
// Otras formas de importar SEED
// const SEED = require('../config/config').SEDD;
// const {SEED} = require('../config/config'); // o por desestructuración

let app = express();
let Usuario = require('../models/usuario');

app.post('/', (req, res) => {

    // ejemplo con ASYNC AWAIT

    getUsuario(req.body.email).then(value => res.status(200).json(value)); // no quiero usar promesa

    // ejemplo con PROMISE

    /*
    Usuario.findOne({email: req.body.email})
        .then(usuarioEncontrado => {
            if (bcrypt.compareSync(req.body.password, usuarioEncontrado.password)) {
                return usuarioEncontrado;
            }
        })
        .then(usuarioEncontrado => {
            let token = jwt.sign(
                {
                    usuario: usuarioEncontrado // payload: https://www.youtube.com/watch?v=-VLwG2A_F4o https://es.wikipedia.org/wiki/Carga_%C3%BAtil_(inform%C3%A1tica)
                },
                SEED,
                {
                    expiresIn: (60 * 60) // tiempo que dura el token en segundos
                }
            );

            res.status(200).json({
                token: token,
                usuario: usuarioEncontrado // TODO: no mandes datos sensibles, aqui mandas hasta el pass
            });
        })
        .catch(reason => {res.status(404).json(reason)}); // aqui se pueden manejar puros errores 400, 500 etcv
    */

    // ejemplo con CALLBACK

    /*
    Usuario.findOne({email: req.body.email}, (err, usuario) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (!usuario) {
            return res.status(404).json(false);
        }

        if (!bcrypt.compareSync(req.body.password, usuario.password)) {
            return res.status(404).json(false);
        }

        // create token

        let token = jwt.sign(
            {
                usuario: usuario // payload: https://www.youtube.com/watch?v=-VLwG2A_F4o https://es.wikipedia.org/wiki/Carga_%C3%BAtil_(inform%C3%A1tica)
            },
            SEED,
            {
                expiresIn: (60 * 60) // tiempo que dura el token en segundos
            }
        );

        res.status(200).json({
            token: token,
            usuario: usuario // TODO: no mandes datos sensibles, aqui mandas hasta el pass
        });

    });
    */

});


async function getUsuario(email) {

    try {

        const usuarioEncontrado = await Usuario.findOne({email: email});
        const token = jwt.sign(
            {
                usuario: usuarioEncontrado // payload: https://www.youtube.com/watch?v=-VLwG2A_F4o https://es.wikipedia.org/wiki/Carga_%C3%BAtil_(inform%C3%A1tica)
            },
            SEED,
            {
                expiresIn: (60 * 60) // tiempo que dura el token en segundos
            }
        );
        return {
            token: token,
            usuario: usuarioEncontrado // TODO: no mandes datos sensibles, aqui mandas hasta el pass
        }

    } catch (e) {

        res.status(404).json(e);

    }

}

module.exports = app;
