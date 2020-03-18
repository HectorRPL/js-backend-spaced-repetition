const express = require('express');
const app = express();

// libs
const fileUpload = require('express-fileupload');
app.use(fileUpload({}));
const fileSistem = require('fs');

// models
const usuario = require('../models/usuario');
const medico = require('../models/medico');
const hospital = require('../models/hospital');

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
    const extencionArchivo = nombreCortado[nombreCortado.length - 1];
    const extencionesPermitidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extencionesPermitidas.indexOf(extencionArchivo) < 0) {
        return res.status(400).json({
            mensaje: 'Solo se permiten' + extencionesPermitidas.join(', ')
        });
    }

    // nombre de archivo personalizado

    const nombreArchivo = `${usuarioId}-${new Date().getMilliseconds()}.${extencionArchivo}`;

    // Mover el archivo del temporal a un path

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    archivo.mv(path, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        subirPorTipo(tipo, usuarioId, nombreArchivo, res);

    });


});

function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'usuarios') {

        usuario.findById(id, (err, usuarioEncontrado) => {

            if (!usuarioEncontrado) {
                return res.status(400).json(err)
            }

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

        medico.findById(id, (err, medicoEncontrado) => {

            if (!medicoEncontrado) {
                return res.status(400).json(err)
            }

            const pathViejo = './uploads/medicos/' + medicoEncontrado.img;

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

            medicoEncontrado.img = nombreArchivo;

            medicoEncontrado.save((err, medicoActualizado) => {

                if (err) {

                    return res.status(500).json(err)

                }

                return res.status(200).json(medicoActualizado);

            });


        });

        return;
    }

    if (tipo === 'hospitales') {

        hospital.findById(id, (err, hospitalEncontrado) => {

            if (!hospitalEncontrado) {
                return res.status(400).json(err)
            }

            const pathViejo = './uploads/hospitales/' + hospitalEncontrado.img;

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

            hospitalEncontrado.img = nombreArchivo;

            hospitalEncontrado.save((err, hospitalActualizado) => {

                if (err) {

                    return res.status(500).json(err)

                }

                return res.status(200).json(hospitalActualizado);

            });


        });

        return;
    }


}

module.exports = app;
