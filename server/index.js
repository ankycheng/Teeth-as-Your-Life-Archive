const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
})

io.listen(server)

app.use(cors({ origin: "*" }));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

server.listen(3000, () => {
    console.log('listening on *:3000');
});

let layerPageId


io.on('connection', (socket) => {
    console.log()
    let count = 0;
    let dir = 1;

    if(socket.handshake.auth.token === 'layer') layerPageId = socket.id;

    socket.on('selectLayer',(data)=>{
        // console.log(data); 
        socket.broadcast.emit('displayLayer', data);
    })

    socket.on('updatePos',(data)=>{
        // console.log(data);
        // io.to(layerPageId).emit('data', data);
        io.emit('data',data)
    })

    socket.on('addLayer',(data)=>{
        // console.log(data);
        // io.to(layerPageId).emit('data', data);
        console.log('new layer added');
        io.emit('addLayer')
    })
    

    socket.on('disconnect', () => {
        count = 0;
        console.log('user disconnected');
    });

});

