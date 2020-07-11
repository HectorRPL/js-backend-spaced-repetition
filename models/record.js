const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        testId: {
            type: Schema.Types.ObjectId,
            ref: 'Test',
            required: true
        },
        questionId: {
            type: Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        },
        catAnswerId: {
            type: Schema.Types.ObjectId,
            ref: 'CatAnswer',
            default: null
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
        collection: 'record' // mongoose crea las collections en prural, pero yo las voy a crear en singular.
    }
);


module.exports = mongoose.model('Record', recordSchema);
