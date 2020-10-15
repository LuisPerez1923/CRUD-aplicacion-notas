const items = [
    {id: 1, name:'Producto1'},
    {id: 2, name:'Producto2'},
    {id: 3, name:'Producto3'}
];

const index = (req, res) => { //req y res objetos de JS con informacion req es de parte del navegador y es la informacion que el navegador envia, res es la informacion que el servidor le envia al navegador
    res.render('index', {
        title: 'Formulario GET y POST'
    }); //renderiza un archivo de la carpeta de vistas, solo se coloca el nombre ya que antes en index.js se configuro de donde se tomarian las vistas
}

const listOfProducts = (req, res, next) => {
    res.render('products', {
        title: 'Lista de productos',
        items: items
    });
}

const newProduct = (req, res, next) => {
    const { newItem } = req.body;
    items.push({
        id: items.length + 1,
        name: newItem
    });
    res.redirect('/products');
}

module.exports = {
    index,
    listOfProducts,
    newProduct,
}