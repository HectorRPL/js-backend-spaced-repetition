const express = require('express');
const app = express();
const Test = require('../models/test');
const SubjectQuestion = require('../models/subjectQuestion');
const Record = require('../models/record');
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
     const questions = await SubjectQuestion.find({subjectId: subjectId});
     const records = await createEmptyRecords(userId, testCreated._id, questions);

     return res.status(200).json(records);

   } catch (e) {

     console.log(new Date(), '[ERROR] ', e.message);
     res.status(500).json(e.message);

   }

 });

async function createEmptyRecords(userId, testId, questions) {

  const records = [];

  for (const question of questions) {

    const record = new Record({
      userId: userId,
      testId: testId,
      questionId: question.questionId,
      catAnswerId: null,
      created: new Date(),
      update: new Date()
    });

    const recordCreated = await record.save(record);

    records.push(recordCreated)

  }

  return records;
}

module.exports = app; // NUNCA OLVIDAR EXPORTAR
