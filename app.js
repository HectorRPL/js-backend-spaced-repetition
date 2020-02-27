// required

var express = require('express');

// incializar variables

var app = express(); // se define el servidor express

app.listen(3000, () => {console.log('express online, 3000 port')}); // escuchar peticiones
