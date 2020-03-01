let express = require('express');
let bcrypt = require('bcryptjs');
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

        res.status(200).json(usuario);

    });



});

module.exports = app;
