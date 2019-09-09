const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-02.cleardb.net',
  user     : 'ba2d1155d46b22',
  password : '9a5d3695',
  database : 'heroku_020e8151cd1cb07'
});

connection.connect();

const obtenerProductos = new Promise((resolve, reject) => {

    connection.query('SELECT * from productos', function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results);
        resolve(results)
    })

})

const obtenerUsuarios = new Promise((resolve, reject) => {

    connection.query('SELECT * from usuarios', function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results);
        resolve(results)
    })
    
})

const agregarProductos = (nombre, precio, idcat, stock, res) => {
    console.log(nombre, precio, idcat, stock);
    connection.query(`INSERT INTO productos (nombre, precio, idcat, stock) VALUES (
        '${nombre}', '${precio}', '${idcat}', '${stock}')`,    
    (err, result) => {
        if (err) throw err;
        console.log(result)
        res.redirect('/')
    })

}

const buscarProductos = (nombre) => {
    
    new Promise((resolve, reject) => {

        connection.query(`SELECT * from productos WHERE nombre = '${nombre}'`, function (error, results, fields) {
            if (error) {
                // resolve()    
                throw error
            }
            if(results == undefined) {
                resolve([])
            }
            // console.log('The solution is: ', results);
            resolve(results)
        })

    })
}

// connection.end()

module.exports = {
    obtenerProductos,
    obtenerUsuarios,
    agregarProductos,
    buscarProductos
}