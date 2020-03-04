let jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken
const SEED = require('../config/config');

// verificar token

exports.verificaToken = function(req, res, next) {

    let token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {

            return res.status(401).json(err);  // error usuario no autorizado (token incorrecto)

        }

        req.usuario = decoded.usuario;

        next(); // necesario el next porque si no aquí se apra y no continua con lo demás
        // return res.status(200).json(decoded);  // decoded es el usuario logueado

    });
};
