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

app.post(
 '/',
 appHelper(async (req, res) => {

   const {email, password} = req.body;

   // console.time('Login.findOne'); // quité los consoles, porque estaban tronando.
   const userFinded = await Login.findOne({email: email.toLowerCase()});
   // console.timeEnd('Login.findOne'); // quité los consoles, porque estaban tronando.

   if (!userFinded) {
     throw new Error('The user dont exist.');
   }

   if (!bcrypt.compareSync(password, userFinded.password)) {
     throw new Error('Incorrect pass.');
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
     name: userFinded.name,
     email: userFinded.email,
     password: null,
     role: null,
     created: null,
     update: null,
     token: token
   });

 }));

app.post(
 '/token',
 mdAuthentication.verificaToken,
 appHelper(async (req, res) => {

   console.log('PERRO: ', req.body);

   // Genera un nuevo token y evía datos del usuer
   const token = jwt.sign(
    {
      user: req.user
    },
    SEED,
    {
      expiresIn: 14400
    }
   );

   const userFinded = await Login.findOne({email: req.user.email.toLowerCase()});

   if (!userFinded) {
     throw new Error('The user no longer exist.');
   }


   //  TODO: tiene que ser con !bcrypt.compareSync(password, userFinded.password)
   if (req.user.password !== userFinded.password) {
     throw new Error('The pass has changed, please do Sign In.');
   }

   res.status(200).json({
     _id: userFinded._id,
     name: userFinded.name,
     email: userFinded.email,
     password: null,
     role: null,
     created: null,
     update: null,
     token: token
   });

 }));

module.exports = app;
