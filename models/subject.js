const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const subjectSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },
        name: {
            type: String,
            required: [
                true, 'El nombre es necesario'
            ]
        },
        description: {
            type: String
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
