let express = require('express');

let bcrypt = require('bcryptjs');

let app = express();

let User = require('../models/user');

let mdAutenticacion = require('../middelwares/autenticacion');

// get all
app.get('/', (req, res, next) => { // TODO: de momento el next no lo usamos, pero debo saber que es.

        const desde = Number(req.query.desde) || 0;

        User.find(
            {}, // trae todos los user
            'role _id nombre email img') // tes para traer todos los campos menos el pass
            .skip(desde) // apartir de aqui comienza a contar, si le mando un 10 entonces con el .limit() me trae los 15
            .limit(5) // solo envia 5 registros por cada petición
            .exec( // TODO: sería importante conocer que es esto porque veo que se usa mucho en mongosse
                (err, user) => {

                    if (err) {
                        return res.status(500)
                            .json(
                                { // res = responde con un 500
                                    ok: false,
                                    mensaje: 'Error al intentar obtener el user.',
                                    errors: err
                                }
                            );
                    }

                    User.count({}, (err, conteo) => {
                        res.status(200) // responde con un 200
                            .json( // se declara que enviaráá un json
                                { // [ini] obj
                                    ok: true,
                                    user: user, // como prop el obj user en []
                                    rows: conteo
                                } // [end] obj
                            );
                    });
                }
            );

    }
);

// find one
app.get('/:id', mdAutenticacion.verificaToken, (req, res) => {

    User.findById(req.params.id, (err, userEncontrado) => {

        if (err) {
            return res.status(500).json(err);  // error cualquiera
        }

        if (!userEncontrado) {
            return res.status(404).json(false); // user no encontrado
        }

        res.status(200).json(userEncontrado);
    });
});

// post
app.post(
    '/',
    (req, res) => {

        let body = req.body;

        let user = new User({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10), // los passwors se tienen que encriptar
            role: body.role
        });

        user.save((err, userCreado) => {
            if (err) {

                return res.status(500).json(err);

            }

            res.status(200).json(userCreado);
        });

    });

// put
app.put(
    '/:id',
    mdAutenticacion.verificaToken, // se puede mandar un arreglo de diddlewares que queremos que se ejecuten
    (req, res) => {

        User.findById(req.params.id, (err, userEncontrado) => {

            if (err) {
                return res.status(500).json(err);  // error cualquiera
            }

            if (!userEncontrado) {
                return res.status(404).json(err); // el user no existe
            }

            userEncontrado.nombre = req.body.nombre;
            userEncontrado.email = req.body.email;
            userEncontrado.role = req.body.role;
            userEncontrado.update = new Date();

            userEncontrado.save((err, userActualizado) => {

                if (err) {
                    return res.status(500).json(err);  // error cualquiera
                }

                userActualizado.password = null; // no es buena idea enviar estps datos, se soluciona con microservices
                userActualizado.role = null; // no es buena idea enviar estps datos, se soluciona con microservices

                const userToken = req.user;
                // console.log({userToken});

                res.status(200).json(userActualizado);

            });
        });
    });

// delete
app.delete(
    '/:id',
    mdAutenticacion.verificaToken, // TODO ¿Por qué no se mandan los parámetros (req, res, next) de verificaToken()?
    (req, res) => {

        User.findOneAndRemove(req.body.id, (err, userBorrado) => {
            if (err) {
                return res.status(500).json(err);  // error cualquiera
            }
            res.status(200).json(userBorrado);
        });

    });

module.exports = app;
