const path = require('path'); //modulo de Js que nos ayuda a unir directorios para que no haya problema con las rutas y ponga la direccion como debe ser
const express = require('express'); //estan lineas empiezan express y nos permite utilizarlo
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//Conectando la base de datos
mongoose.connect('mongodb://localhost/crud-mongo', {useNewUrlParser: true,   useUnifiedTopology: true })
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log(err));

//Importacion de rutas
const indexRoutes = require('./routes/index'); //importamos las rutas

//Configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //path.join nos permite unir directorios para que funcione el cualwquier sistema operativo esta linea nos ayuda a especificar donde estan las vistas 'views'
app.set('view engine', 'ejs');

//Middlewares (el middleware es una funcion que se ejecuta antes de que lleguemos a las rutas)
app.use(morgan('dev')); //para ver mensajes en la consola antes de acceder a la ruta nos da informacion como: si fue exitosa o no la solicitud (mandando: 404, 200, etc)
app.use(express.urlencoded({extended: false})); //con esta linea indicamos que la informacio compartida sera de tipo JSON y el extended: false indica que dicha informacion es plana (texto) (no imagenes o videos)

//Rutas
app.use('/', indexRoutes); //hacemos uso de la rutas

//Iniciador de servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto ${app.get('port')} activo`);
});

