const express = require('express');
const app = express();
const List = require('../models/list');
const mdAutenticacion = require('../middelwares/autenticacion');

// post
app.post(
    '',
    mdAutenticacion.verificaToken,
    (req, res) => {

    const list = new List({
        userId: req.body.userId,
        name: req.body.name,
        description: req.body.description,
        label: req.body.label
    });

    list.save((err, listCreated) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(listCreated);
    });

});

// gel all by user id
app.get(
    '/userId/:userId',
    (req, res) => {

    const QUERY = {
        userId: req.params.userId
    };

    List.find(QUERY)
        .skip(Number(req.query.desde) || 0) // apartir de aqui comienza a contar, si le mando un 10 entonces con el .limit() me trae los 15
        .limit(1000) // solo envia 5 registros por cada petición
        .exec((err, list) => { // TODO: aunque no le ponga props las manda, como la fecha.

            if (err) {
                return res.status(500).json(err);
            }

            List.count({}, (err, count) => {
                res.status(200).json({
                        ok: true, // TODO: Aqui mejor ponemos la paginación
                        list: list,
                        rows: count
                    }
                );
            });

        });
});

// get one
app.get(
    '/:listId',
    mdAutenticacion.verificaToken,
    (req, res) => {
        List.findById(req.params.listId, (err, listFinded) => {
            if (!listFinded) {
                return res.status(404).json(err); // el usuario no existe
            }
            res.status(200).json(listFinded);
        });
    }
);

// put
app.put(
    '/list/:listId',
    mdAutenticacion.verificaToken,
    (req, res) => {
        List.findById(req.params.id, (err, listFinded) => {
            if (!listFinded) {
                return res.status(404).json(err); // el usuario no existe
            }
            const newList = {
                userId: listFinded.userId,
                name: req.body.name,
                description: req.body.description,
                label: req.body.label,
                created: listFinded.created,
                update: new Date()
            };
            listFinded.save((err, newList) => {
                if (err) {
                    return res.status(500).json(err);  // error cualquiera
                }
                const usuarioToken = req.usuario;
                res.status(200).json(newList);
            });
        });
    }
);

module.exports = app; // NUNCA OLVIDAR EXPORTAR. Propongo el siguinete procedimeinto:

/*
1. creas el archivo js
2. creas el: const express = require('express');
3. creas el: const app = express();
4 INMEDIATAMENTE después el export: module.exports = app;
5. FIN DE LA PUTA DISCUSIÓN
*/
