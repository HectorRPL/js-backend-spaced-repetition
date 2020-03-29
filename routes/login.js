let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken
const SEED = require('../config/config');
// Otras formas de importar SEED
// const SEED = require('../config/config').SEDD;
// const {SEED} = require('../config/config'); // o por desestructuración

let app = express();
let Usuario = require('../models/usuario');

app.post('/', async (req, res) => {

    // ejemplo con ASYNC AWAIT

    try {

        const { email, password } = req.body;

        const usuarioEncontrado = await Usuario.findOne({email: email});

        if (!usuarioEncontrado) {
            throw new Error('El usuario no existe');
        }

        if (!bcrypt.compareSync(password, usuarioEncontrado.password)) {
            throw new Error('Pass no match');
        }

        const token = jwt.sign(
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

    } catch (e) {

        console.log(new Date(), '[ERROR] ', e.message );
        res.status(500).json(e.message);

    }


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

module.exports = app;
