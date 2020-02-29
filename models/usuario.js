let mongoose = require('mongoose');

let Squema = mongoose.Schema;

let usuarioSquema = new Squema({
    id:       {type: String, require: false                                    },
    nombre:   {type: String, require: [true, 'requerido']                      },
    email:    {type: String, require: [true, 'requerido'], unique: true        }, // unique = que es único
    password: {type: String, require: [true, 'requerido']                      },
    img:      {type: String, require: false                                    },
    role:     {type: String, require: true,                default: 'USER_ROLE'},
    created:  {type: Date,                                 default: new Date() }
});

module.exports = mongoose.model('Usuario', usuarioSquema);
