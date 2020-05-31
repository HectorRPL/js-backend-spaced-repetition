const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectQuestionSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        subjectId: {
            type: Schema.Types.ObjectId,
            // ref: 'Subject', // TODO => creo que aqui me falta ponerle a los demas Subject
            required: true
        },
        questionId: {
            type: Schema.Types.ObjectId,
            ref: 'Question', // Se usa para poblar el questionId con los campos que se necesiten
            required: true
        },
        created: {
            type: Date,
            default: new Date()
        },
        update: {
            type: Date,
            required: true,
            default: new Date()
        }
    },
    {
        collection: 'subjectQuestion' // mongoose crea las collections en prural, pero yo las voy a crear en singular.
    }
);


module.exports = mongoose.model('SubjectQuestion', subjectQuestionSchema);
