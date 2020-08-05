let jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken
const SEED = require('../config/config');

// verificar token
// TODO: cambiar a inglés

exports.verificaToken = function (req, res, next) {

  // console.log('LLEGO UN TOKEN: '); // req.header('user-token')

  let token = req.header('user-token');

  jwt.verify(token, SEED, (err, decoded) => {

    console.log({'req.user': req.user});

    if (err) {

      return res.status(401).json(err);  // error usuario no autorizado (token incorrecto)

    }

    req.user = decoded.user;

    next(); // necesario el next porque si no aquí se apra y no continua con lo demás
    // return res.status(200).json(decoded);  // decoded es el usuario logueado

  });
};

