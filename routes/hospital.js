const express = require('express');



const app = express();

const Hospital = require('../models/hospital');



// gel all

app.get('/', (req, res) => {
    Hospital.find({}, 'nombre, img, usuario').exec((err, hospitales) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json({
                ok: true, // TODO: Aqui mejor ponemos la paginación
                hospitales: hospitales
            }
        );

    });
});


module.exports = app; // NUNCA OLVIDAR EXPORTAR. Propongo el siguinete procedimeinto:

/*
1. creas el archivo js
2. creas el: const express = require('express');
3. creas el: const app = express();
4 INMEDIATAMENTE después el export: module.exports = app;
5. FIN DE LA PUTA DISCUSIÓN
*/






