const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const hbs = require('hbs')
require('./hbs/helpers')

const data = require('./connection.js')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
 
// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales')
app.set('view engine', 'hbs');


//middleware
app.use(bodyParser.urlencoded({extended: false}))


data.obtenerProductos.then(productos => {
    app.get('/', (req, res) => {

        let cards = ''

        productos.forEach(producto => {
            cards += 
                    `<div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="/assets/img/${producto.imagen}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <a href="${encodeURI(producto.nombre)}" class="btn btn-primary">Ver información</a>
                        </div>
                    </div>`
        });

        res.render('home', {
            nombre: 'álvaro',
            productos: cards
        })
    
    })

    productos.forEach(producto => {
        app.get(`/${encodeURI(producto.nombre)}`, (req, res) => {
            
            res.render('about', {
                producto: producto.nombre,
                precio: producto.precio,
                categoria: producto.idcat,
                stock: producto.stock,
                imagen: producto.imagen
            })
        })
    })   
})

app.get('/login', (req, res) => {

    res.render('login')
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/agregar_producto', (req, res) => {
    console.log(req.body);
    const {nombre, precio, idcat, stock} = req.body
    data.agregarProductos(nombre, precio, idcat, stock, res)
})

app.post('/buscar', (req, res) => {
    console.log(req.body);
    let nombre = req.body.nombre
    data.buscarProductos(nombre)
})

app.listen(port, () => { 
    console.log(`Escuhando peticiones en el puerto ${port}`);
})

