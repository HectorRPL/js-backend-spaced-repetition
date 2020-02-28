let mongoose = require('mongoose');

let Squema = mongoose.Schema;

let usuarioSquema = new Squema({
    // _id : {type: String, require: [true, '_id requerido']},
    nombre:      {type: String, require: [true, 'requerido']                        },
    email:       {type: String, require: [true, 'requerido'],   unique: true        },
    password:    {type: String, require: [true, 'requerido']                        },
    img:         {type: String, require: false                                      },
    role:        {type: String, require: true,                  default: 'USER_ROLE'}
});

module.exports = mongoose.model('Usuario', usuarioSquema);
