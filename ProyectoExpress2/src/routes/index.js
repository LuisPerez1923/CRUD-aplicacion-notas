const express = require('express');
const router = express.Router();

const Task = require('../models/task'); //Importamos el modelo de la tarea, o el esquema que tiene la forma que vamos a ocupar con la informacion

router.get('/', async (req, res) => { //async marca que si tenemosmetodos asincronos se tendra que esperar para que funcione correctamente, esto nos facilita ya que no es necesario utilizar promesas 'then'
    const tasks = await Task.find(); //en metodos asincronos podemos poner await para esperar al proceso, se ve comunmente en operaciones que oncolucren la base de datos como guardar save() o encontrar find()
    res.render('index', {
        tasks //tasks: tasks
    });
});

router.post('/add', async (req, res) => {
    //console.log(new Task(req.body)); //crea un objeto que se puede almacenar dentro de la base de datos
    const task = new Task(req.body); //nuevo objeto de la "clase" Task (nuevo dato que queremos almacenar en la DB)
    await task.save(); //guarda la tarea (objeto) dentro de la base de datos (almacenar el dato)
    res.redirect('/');
});

router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task
    });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    //console.log(req.params); //req.params guarda los parametros de la ruta, o guarda los valores de la respuesta
    const { id } = req.params; //nos dice que id va a ser igual al id que viene de req.params
    await Task.remove({_id: id}); //_id es un valor que mongo db agrega a nuestro schema las operaciones de bases de datos son asincronas por lo que se usa await
    res.redirect('/');
});



module.exports = router;