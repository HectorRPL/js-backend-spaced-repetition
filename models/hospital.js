const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{PATH} no permitido'
};

const hospitalSchema = new Schema({
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
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        created:  {
            type: Date,
            default: new Date()
        },
        update:  {
            type: Date,
            require: false
        }
    },
    {
        collection: 'hospitales' // si la collection no está creada mongosse la crea pero en inglés y plural: 'hospitals'
    }
);

hospitalSchema.plugin(uniqueValidator, {
    message: 'El {PATH} debe ser único'
});

module.exports = mongoose.model('hospital', hospitalSchema);
