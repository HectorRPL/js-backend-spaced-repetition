let express = require('express');

let app = express();

app.get(
    '/', // ejemplo en postman sería http://localhost:3000/ y el '/' coincide
    (
        req, // request
        res, // para la respuesta
        next // no usada
    ) => {
        res.status(200) // responde con un 200
            .json( // se declara que enviaráá un json
                {
                    ok: true,
                    mensaje: 'Petición relizada correctamente'
                }
            );
    }
);

module.exports = app;
