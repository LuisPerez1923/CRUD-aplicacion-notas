const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');

//configuraciones
app.set('port', process.env.PORT || 3000); //configura el puerto seleccionara el configurado en el sistema operativo si este no lo esta, seleccionara el puerto 3000
app.set('views', path.join(__dirname, 'views')); //define las vistas que en este caso utilizan el motor ejs
app.set('view engine', 'ejs'); //la linea de arriba espefifica de donde tomar las vistas

//middlewares
app.use((req, res, next) => {
    console.log(`${req.url} -${req.method}`);
    next();
});

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({extended: false}));

//rutas
app.use(routes); //archivo donde se encontraran todas nuestras rutas

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public'))); //usar carpeta de archivos estaticos como por ejemplos hojas de estilo CSS o imagenes

//iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`localhost:${app.get('port')} activo`);
  })
  

