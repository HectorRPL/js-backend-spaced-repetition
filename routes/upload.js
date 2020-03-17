const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload({}));

app.put('/:tipo/:usuarioId', (req, res) => {

    const tipo = req.params.tipo;
    const usuarioId = req.params.usuarioId;

    // collecciones válidas

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) > 0) {
        return res.status(400).json({
            mensaje: 'Tipo de collection no válida.'
        });
    }

    if (!req.files) {

        return res.status(400).json({
            mensaje: 'Debes de seleccionar y enviar una imagen.'
        });

    }

    // get file name

    const archivo = req.files['']; // que raro que esté difernte a lo que está en el curso
    const nombreCortado = archivo.name.split('.');
    const expencionArchivo = nombreCortado[nombreCortado.length - 1];
    const extencionesPermitidas = ['png', 'jpg', 'gif', 'jpej'];

    if (extencionesPermitidas.indexOf(expencionArchivo) < 0) {
        return res.status(400).json({
            mensaje: 'Solo se permiten' + extencionesPermitidas.join(', ')
        });
    }

    // nombre de archivo personalizado

    const nombreArchivo = `${usuarioId}-${new Date().getMilliseconds()}.${expencionArchivo}`;
    console.log({nombreArchivo});

    // Mover el archivo del temporal a un path

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    archivo.mv(path, err => {

        if (err) {

            return res.status(500).json(err);

        }

        res.status(200).json({
            mensaje: 'Movido.'
        });

    });


});

module.exports = app;
