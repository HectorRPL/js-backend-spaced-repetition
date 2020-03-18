const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const usuario = require('../models/usuario');
const medico = require('../models/medico');
const hospital = require('../models/hospital');
const fileSistem = require('fs');

app.use(fileUpload({}));

app.put('/:tipo/:usuarioId', (req, res) => {

    const tipo = req.params.tipo;
    const usuarioId = req.params.usuarioId;

    // collecciones válidas

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
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

    // Mover el archivo del temporal a un path

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    archivo.mv(path, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        subirPorTipo(tipo, usuarioId, nombreArchivo, res);

    });


});

function subirPorTipo(tipo, usuarioId, nombreArchivo, res) {

    if (tipo === 'usuarios') {

        usuario.findById(usuarioId, (err, usuarioEncontrado) => {

            const pathViejo = './uploads/usuarios/' + usuarioEncontrado.img;

            // si existe elimina la imagen anterior
            // console.log({pathViejo});
            if (fileSistem.existsSync(pathViejo)) {

                fileSistem.unlink(pathViejo, (err, res) => {

                    if (err) {

                        return res.status(500).json(err);

                    }

                    // console.log({res});

                });

            }

            usuarioEncontrado.img = nombreArchivo;

            usuarioEncontrado.save((err, usuarioActualizado) => {

                if (err) {

                    return res.status(500).json(err)

                }

                return res.status(200).json(usuarioActualizado);

            });


        });

        return;
    }

    if (tipo === 'medicos') {

        medico.findById(usuarioId, (err, medico) => {
            const pathViejo = './uploads/medicos/' + medico.img;
        });

        return;
    }

    if (tipo === 'hospitales') {

        hospital.findById(usuarioId, (err, hospital) => {
            const pathViejo = './uploads/hospital/' + hospital.img;
        });

        return;
    }


}

module.exports = app;
