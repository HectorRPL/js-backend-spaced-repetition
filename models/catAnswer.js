const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema(
    {
        value: {
            type: String,
            required: [
                true, 'El value es requerido'
            ]
        },
        created: {
            type: Date,
            default: new Date(),
            required: true
        },
        update: {
            type: Date,
            default: new Date(),
            required: true
        }
    },
    {
        collection: 'catAnswer' // mongoose crea las collections en prural, pero yo las voy a crear en singular.
    }
);


module.exports = mongoose.model('CatAnswer', testSchema);
