const app = require('./server')

require('./routes/productos')(app) 

//Iniciar el servidor 

app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
})