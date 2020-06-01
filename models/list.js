const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: [
                true,
                'El nombre es necesario'
            ]
        },
        description: {
            type: String
        },
        label: {
            type: [String]
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
        collection: 'list' // mongoose crea las collections en prural, pero yo las voy a crear en singular.
    }
);


module.exports = mongoose.model('List', listSchema);
