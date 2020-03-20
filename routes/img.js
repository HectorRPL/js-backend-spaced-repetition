const express = require('express');
const app = express();
const path = require('path'); // no hay que hacer npm i porque ya viene con node
const fileSystem = require('fs'); // crear archivos, mover cosas, etc...

app.get('/:tipo/:img', (req, res) => {

        const tipo = req.params.tipo;
        const img = req.params.img;

        // ayuda a resolver para que path siempre sea correcto
        /*
        *
        hay que específicar toda la ruta de la img
        __dirname nos da toda la ruta de donde estemos en ese momento
        si yo estuviera en windos me entrega el c: ... y toda la dirección
        *
        */

        const pathImg = path.resolve(__dirname, `../uploads/${tipo}/${img}`);

        if (fileSystem.existsSync(pathImg)) { // Si el archivo existe entonces lo regresas

            res.sendFile(pathImg);

        } else { // como no existe entonces le mandes default-img.jpg

            const imgDefault = path.resolve(__dirname, `../assets/default-img.jpg`);

            res.sendFile(imgDefault);

        }

    }
);

module.exports = app;
