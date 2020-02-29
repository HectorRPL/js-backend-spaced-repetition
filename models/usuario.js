let mongoose = require('mongoose');

let Squema = mongoose.Schema;

let uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{PATH} no permitido'
};

let usuarioSquema = new Squema({
    id:       {type: String, require: false                                    },
    nombre:   {type: String, require: [true, 'requerido']                      },
    email:    {type: String, require: [true, 'requerido'], unique: true        }, // unique = que es único
    password: {type: String, require: [true, 'requerido']                      },
    img:      {type: String, require: false                                    },
    role:     {type: String, require: true,                default: 'USER_ROLE', enum: rolesValidos},
    created:  {type: Date,                                 default: new Date() }
});

usuarioSquema.plugin(uniqueValidator, {
    message: 'El {PATH} debe de ser único' // el {PATH} toma el key de la propiedad, así se puede ocupar en varios keys
});

module.exports = mongoose.model('Usuario', usuarioSquema);
