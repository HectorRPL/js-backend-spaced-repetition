let express = require('express');

let bcrypt = require('bcryptjs');

let app = express();

let Usuario = require('../models/usuario');

// get all
app.get('/', (req, res, next) => { // TODO: de momento el next no lo usamos, pero debo saber que es.

        Usuario.find(
            {}, // trae todos los usuarios
            'role _id nombre email img', // tes para traer todos los campos menos el pass
        ).exec( // TODO: sería importante conocer que es esto porque veo que se usa mucho en mongosse
            (err, usuarios) => {

                if (err) {
                    return res.status(500)
                        .json(
                            { // res = responde con un 500
                                ok: false,
                                mensaje: 'Error al intentar obtener el usuario.',
                                errors: err
                            }
                        );
                }

                res.status(200) // responde con un 200
                    .json( // se declara que enviaráá un json
                        { // [ini] obj
                            ok: true,
                            usuarios: usuarios // como prop el obj usuarios en []
                        } // [end] obj
                    );

            }
        );

    }
);

// post
app.post('/', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), // los passwors se tienen que encriptar
        role: body.role
    });

    usuario.save((err, usuarioCreado) => {
        if (err) {

            return res.status(500).json(err);

        }

        res.status(200).json(usuarioCreado);
    });

});

// put
app.put('/:id', (req, res) => {

    Usuario.findById(req.params.id, (err, usuarioEncontrado) => {

        if (err) {
            return res.status(500).json(err);  // error cualquiera
        }

        if (!usuarioEncontrado) {
            return res.status(404).json(err); // el usuario no existe
        }

        usuarioEncontrado.nombre = req.body.nombre;
        usuarioEncontrado.email = req.body.email;
        usuarioEncontrado.role = req.body.role;
        usuarioEncontrado.update = new Date();

        usuarioEncontrado.save((err, usuarioActualizado) => {

            if (err) {
                return res.status(500).json(err);  // error cualquiera
            }

            usuarioActualizado.password = null; // no es buena idea enviar estps datos, se soluciona con microservices
            usuarioActualizado.role = null; // no es buena idea enviar estps datos, se soluciona con microservices

            res.status(200).json(usuarioActualizado);

        });
    });
});

module.exports = app;
