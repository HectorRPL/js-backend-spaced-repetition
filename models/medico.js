const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const medicoSchema = new Schema({
        nombre: {
            type: String,
            required: [
                true, 'El	nombre	es	necesario'
            ]
        },
        img: {
            type: String,
            required: false
        },
        usuarioId: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },
        hospitalId: {
            type: Schema.Types.ObjectId,
            ref: 'Hospital',
            required: [
                true,
                'El	id	hospital	es un	campo	obligatorio'
            ]
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
        collection: 'medicos' // si la collection no está creada mongosse la crea pero en inglés y plural: 'hospitals'
    }
);


module.exports = mongoose.model('medico', medicoSchema);
