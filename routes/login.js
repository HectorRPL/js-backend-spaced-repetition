let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken
const mdAuthentication = require('../middelwares/autenticacion');
const SEED = require('../config/config');
// Otras formas de importar SEED
// const SEED = require('../config/config').SEDD;
// const {SEED} = require('../config/config'); // o por desestructuración

let app = express();
let Login = require('../models/user');

function appHelper(callback) {
    return async (req, res) => {
        try {
            await callback(req, res); // Todo: súper imprtante no olvidar el await aqui.
        } catch (e) {
            console.log(new Date(), '[ERROR] ', e.message);
            res.status(500).json(e.message);
        }
    }
}

app.post('/', appHelper(async (req, res) => {

    const {email, password} = req.body;

    console.time('Login.findOne');
    const userFinded = await Login.findOne({email: email.toLowerCase()});
    console.timeEnd('Login.findOne');

    if (!userFinded) {
        throw new Error('El user no existe');
    }

    if (!bcrypt.compareSync(password, userFinded.password)) {
        throw new Error('Pass no match');
    }

    const token = jwt.sign(
        {
            user: userFinded // payload: https://www.youtube.com/watch?v=-VLwG2A_F4o https://es.wikipedia.org/wiki/Carga_%C3%BAtil_(inform%C3%A1tica)
        },
        SEED,
        {
            expiresIn: (666 * 666) // tiempo que dura el token en segundos
        }
    );

    res.status(200).json({
        _id: userFinded._id,
        name: req.user.name,
        email: userFinded.email,
        password: null,
        role: null,
        created: null,
        update: null, // TODO => falta que al momento de crear se ponga la fecha de creación
        token: token // TODO => enviarlo en headers
    });

}));

app.get('/token', mdAuthentication.verificaToken, (req, res) => {

    // Genera un nuevo token y evía datos de usuer
    const token = jwt.sign(
        {
            usuer: req.user
        },
        SEED,
        {
            expiresIn: 14400
        }
    );

    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        password: null,
        role: null,
        created: null,
        update: null, // TODO => falta que al momento de crear se ponga la fecha de creación
        token: token // TODO => enviarlo en headers
    });

});

module.exports = app;
