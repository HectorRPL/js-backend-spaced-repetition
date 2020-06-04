const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        listId: {
            type: Schema.Types.ObjectId,
            ref: 'List',
            required: true
        },
        name: {
            type: String,
            required: [
                true,
                'El título es necesario'
            ]
        },
        description: {
            type: String
        },
        label: {
            type: [String],
            required: [
                true,
                'Al menos una etiqueta es requerida.'
            ] // TODO esta madre no funcina, no le mandaba nada y no manda error
        },
        created: {
            type: Date,
            default: new Date()
        },
        update: {
            type: Date,
            require: false
        }
    },
    {
        collection: 'subject' // mongoose crea las collections en prural, pero yo las voy a crear en singular.
    }
);


module.exports = mongoose.model('Subject', subjectSchema);
