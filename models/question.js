const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        question: {
            type: String,
            required: [
                true,
                'Falta la pregunta.'
            ]
        },
        answer: {
            type: String,
            required: [
                true,
                'Falta la respuesta.'
            ]
        },
        created: {
            type: Date,
            default: new Date()
        },
        update: {
            type: Date,
            default: new Date()
        }
    },
    {
        collection: 'question' // mongoose crea las collections en prural, pero yo las voy a crear en singular.
    }
);


module.exports = mongoose.model('Question', questionSchema);
