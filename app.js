
const PORT = process.env.PORT || 3000;

// required

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

// incializar variables

let app = express(); // se define el servidor express

// BODYPARRSER
// un mildqwaare es una petición que una vez que app se sejecute siempre va apasar por aqui
app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// importar rutas

let appRoutes = require('./routes/app');
let usuarioRoutes = require('./routes/usuario');
let medicoRoutes = require('./routes/medico');
let hospitalRoutes = require('./routes/hospital');
let loginRoutes = require('./routes/login');
let busquedaRoutes = require('./routes/busqueda');
let uploadRoutes = require('./routes/upload');
let getImg = require('./routes/img');

// conexión a mongodb (base de datos)

const urlMongoLocal = 'mongodb://localhost:27017/hospitalDB'; // Conectarse localmente, no olvidar invocar al demonio
const urlMongoMlab = 'mongodb://hectorvizuet:1234qwer@ds141178.mlab.com:41178/hospital'; // conectarse a mlab mucho mejor =)

mongoose.connection.openUri(urlMongoMlab, (err, resp) => {

    if (err) throw err;

    console.log('\x1b[36m%s\x1b[0m', 'database: conected');

});

// rutas

app.use('/usuario', usuarioRoutes);
app.use('/medico', medicoRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', getImg);

app.use('/', appRoutes);

// escuchar peticiones

app.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', 'server: conected');
}); // escuchar
