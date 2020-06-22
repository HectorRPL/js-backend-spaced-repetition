const express = require('express');
const app = express();
const Question = require('../models/question');
const mdAutenticacion = require('../middelwares/autenticacion');

// post
app.post(
    'subjectId/:subjectId', // TODO: Checa esto, no se está usando el subjectId
    mdAutenticacion.verificaToken,
    (req, res) => {

        const question = new Question({
            userId: req.body.userId,
            question: req.body.question,
            answer: req.body.answer,
            update: new Date()
        });

        question.save((err, questionCreated) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(questionCreated);
        });

    });

// gel all
/*
Un get all podría funcionar para una consulta de todas las materias al azar, podría ser buena tecnica de estudio
O una especie de seleccion de temas, algo por estilo, aqui hay de donde cortar
*/

// get one
app.get('/:id', (req, res) => {
        Question.findById(req.params.id, (err, questionFinded) => {
            if (!questionFinded) {
                return res.status(404).json(err); // el usuario no existe
            }
            res.status(200).json(questionFinded);
        });
    }
);

// put
app.put(
    '/:id',
    /*mdAutenticacion.verificaToken,*/
    (req, res) => {

        Question.findById(req.params.id, (err, questionFinded) => {

            if (!questionFinded) {
                return res.status(404).json(err); // el usuario no existe
            }

                questionFinded.question = req.body.question;
                questionFinded.answer = req.body.answer;
                questionFinded.update = new Date();

            questionFinded.save((err, newQuestion) => {
                if (err) {
                    return res.status(500).json(err);  // error cualquiera
                }
                const usuarioToken = req.usuario;
                res.status(200).json(newQuestion);
            });
        });

    }
);

module.exports = app; // NUNCA OLVIDAR EXPORTAR
