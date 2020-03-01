let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken

let app = express();
let Usuario = require('../models/usuario');

app.post('/', (req, res) => {

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
                usuario: usuario
            },
            'chester',
            {
                expiresIn: 14400 // en 4 horas vale verga el token
            }
        );

        res.status(200).json(token);

    });


});

module.exports = app;
