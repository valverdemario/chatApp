const express = require('express')
const path = require('path');
require('dotenv').config();

const { dbConnection } = require('./database/config');
dbConnection();

//App
const app = express();

//Lectura y parse de Body
app.use(express.json());

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));


//Rutas

app.use('/api/login', require('./routes/auth'));


server.listen(process.env.PORT, (err) => {
    if (err) throw Error(err)

    console.log('Servidor corriendo en puerto', process.env.PORT);
})