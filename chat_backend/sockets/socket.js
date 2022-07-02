const { io } = require('../index');

io.on('connection', client => {
    client.on('disconnect', () => {
        console.log("Desconectado");
    })


    client.on('mensaje', (payload) => {
        console.log(payload);
        io.emit('mensaje', { admin: "Hola" })
    })


});