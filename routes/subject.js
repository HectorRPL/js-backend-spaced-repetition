const express = require('express');

const app = express();

const Subject = require('../models/subject');

let mdAutenticacion = require('../middelwares/autenticacion');

// gel all
app.get('/', (req, res) => {
    Subject.find({})
        .skip(Number(req.query.desde) || 0) // apartir de aqui comienza a contar, si le mando un 10 entonces con el .limit() me trae los 15
        .limit(1000) // solo envia 5 registros por cada petición
        .exec((err, subjectes) => { // TODO: aunque no le ponga props las manda, como la fecha.

            if (err) {
                return res.status(500).json(err);
            }

            Subject.count({}, (err, count) => {
                res.status(200).json({
                        ok: true, // TODO: Aqui mejor ponemos la paginación
                        subjectes: subjectes,
                        rows: count
                    }
                );
            });

        });
});

// get one
app.get('/:id', (req, res) => {
        Subject.findById(req.params.id, (err, subjectFinded) => {
            if (!subjectFinded) {
                return res.status(404).json(err); // el usuario no existe
            }
            res.status(200).json(subjectFinded);
        });
    }
);

// post
app.post('', mdAutenticacion.verificaToken, (req, res) => {

    const subject = new Subject({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description
    });

    subject.save((err, subjectCreated) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(subjectCreated);
    });

});

// put
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
        Subject.findById(req.params.id, (err, subjectFinded) => {
            if (!subjectFinded) {
                return res.status(404).json(err); // el usuario no existe
            }
            const newSubject = {
                userId: subjectFinded.userId,
                title: req.body.title,
                description: req.body.description,
                created: subjectFinded.created,
                update: new Date()
            };
            subjectFinded.save((err, newSubject) => {
                if (err) {
                    return res.status(500).json(err);  // error cualquiera
                }
                const usuarioToken = req.usuario;
                res.status(200).json(newSubject);
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
