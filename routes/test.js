const express = require('express');
const app = express();
const Test = require('../models/test');
const SubjectQuestion = require('../models/subjectQuestion');
const Recordd = require('../models/record');
const mdAutenticacion = require('../middelwares/autenticacion');

// post
app.post(
    '',
    mdAutenticacion.verificaToken,
    async (req, res) => {

        try {

            const {userId, subjectId} = req.body; // usamos destructuración

            const test = new Test({
                userId: userId,
                subjectId: subjectId,
                created: new Date(),
                update: new Date(),
                start: new Date(),
                end: new Date()
            });

            const testCreated = await test.save(test);
            console.log({testCreated});
            const questions = await SubjectQuestion.find({subjectId: subjectId});
            console.log({questions});
            const recordds = await createEmptyRecordds(userId, testCreated._id, questions);
            return res.status(200).json(recordds);

        } catch (e) {

            console.log(new Date(), '[ERROR] ', e.message);
            res.status(500).json(e.message);

        }

    });

async function createEmptyRecordds(userId, testId, questions) {

    const recordds = [];

    for (const question of questions) {

        const recordd = new Recordd({
            userId: userId,
            testId: testId,
            questionId: question.questionId,
            catAnswerId: null,
            created: new Date(),
            update: new Date()
        });

        const recorddCreated = await recordd.save(recordd);

        recordds.push(recorddCreated)

    }

    return recordds;
}

module.exports = app; // NUNCA OLVIDAR EXPORTAR
