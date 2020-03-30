let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken
const SEED = require('../config/config');
// Otras formas de importar SEED
// const SEED = require('../config/config').SEDD;
// const {SEED} = require('../config/config'); // o por desestructuración

let app = express();
let Usuario = require('../models/usuario');

function appHelper(callback) {
    return async (req, res) => {
        try {
            await callback(req, res); // Todo: súper imprtante no olvidar el await aqui.
        } catch (e) {
            console.log(new Date(), '[ERROR] ', e.message );
            res.status(500).json(e.message);
        }
    }
}

app.post('/', appHelper(async (req, res) => {

    const { email, password } = req.body;

    console.time('Usuario.findOne');
    const usuarioEncontrado = await Usuario.findOne({email: email});
    console.timeEnd('Usuario.findOne');

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

}));

module.exports = app;
