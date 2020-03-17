const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload({}));

app.put('/', (req, res) => {

    if (!req.files) {

        return res.status(400).json({
            mensaje: 'Debes de seleccionar y enviar una imagen.'
        });

    }

    // get file name

    console.log({files: req.files});

    const archivo = req.files['']; // que raro que esté difernte a lo que está en el curso
    const nombreCortado = archivo.name.split('.');
    const expencionArchivo = nombreCortado[nombreCortado.length - 1];
    const extencionesPermitidas = ['png', 'jpg', 'gif', 'jpej'];

    if (extencionesPermitidas.indexOf(expencionArchivo) < 0) {
        return res.status(400).json({
            mensaje: 'Solo se permiten' + extencionesPermitidas.join(', ')
        });
    }

    return res.status(200).json({
        mensaje: 'Éxito.'
    });



});

module.exports = app;
