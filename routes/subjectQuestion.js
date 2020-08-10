const express = require('express');
const app = express();
const SubjectQuestion = require('../models/subjectQuestion');
const Question = require('../models/question');
const mdAutenticacion = require('../middelwares/autenticacion');

// post
app.post(
    '/subject/:subjectId',
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

            const subjectQuestion = new SubjectQuestion({
                userId: req.body.userId,
                questionId: questionCreated._id,
                subjectId: req.params.subjectId,
                update: new Date()
            });

            subjectQuestion.save((err, subjectQuestionCreated) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(questionCreated);
            });

            // res.status(200).json(questionCreated);
        });

    });

// gel all
/*
Un get all podría funcionar para una consulta de todas las materias al azar, podría ser buena tecnica de estudio
O una especie de seleccion de temas, algo por estilo, aqui hay de donde cortar
*/

// gel all by subjectId
app.get('/:subjectId', (req, res) => {
        SubjectQuestion.find({
            subjectId: req.params.subjectId
        })
            .skip(Number(req.query.desde) || 0) // apartir de aqui comienza a contar, si le mando un 10 entonces con el .limit() me trae los 15
            .limit(1000) // solo envia 5 registros por cada petición
            .populate('questionId') //
            .exec((err, subjectQuestions) => { // TODO: aunque no le ponga props las manda, como la fecha.

                if (err) {
                    return res.status(500).json(err);
                }

                SubjectQuestion.count({}, (err, conteo) => {
                    res.status(200).json({
                            ok: true, // TODO: Aqui mejor ponemos la paginación
                            list: subjectQuestions,
                            rows: conteo
                        }
                    );
                });

            });
    }
);

// Public

// gel all by subjectId
app.get(
 '/public/:subjectId', (req, res) => {
   const {subjectId} = req.params;
   SubjectQuestion.find({
     subjectId: subjectId
   })
    .skip(Number(req.query.desde) || 0) // apartir de aqui comienza a contar, si le mando un 10 entonces con el .limit() me trae los 15
    .limit(1000) // solo envia 5 registros por cada petición
    .populate('questionId') //
    .exec((err, subjectQuestions) => { // TODO: aunque no le ponga props las manda, como la fecha.
       if (err) {
         return res.status(500).json(err);
       }
       SubjectQuestion.count({}, (err, conteo) => {
         res.status(200).json({
            ok: true, // TODO: Aqui mejor ponemos la paginación
            list: subjectQuestions,
            rows: conteo
          }
         );
       });
     }
    );
 }
);

module.exports = app; // NUNCA OLVIDAR EXPORTAR
