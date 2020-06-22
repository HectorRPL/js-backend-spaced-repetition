const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Siempre los IDs deben estar referenciado a la collection que le pertenece
            required: true // Lo dejamos sin el arr porque esto lo procesa el back no el user
        },
        subjectId: {
            type: Schema.Types.ObjectId,
            ref: 'Subject', // Son como los helpers de Meteor.js
            required: true
        },
        start: {
            type: Date,
            default: null
        },
        end: {
            type: Date,
            default: null,

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
        collection: 'test' // mongoose crea las collections en prural, pero yo las voy a crear en singular.
    }
);


module.exports = mongoose.model('Test', testSchema);
