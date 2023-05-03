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



io.on('connection', (socket) => {
    let count = 0;
    let dir = 1;
    let data = {
        x: 500, 
        y: 300
    }
    setInterval(() => {
        // data.x += 1;
        data.y += 1;
        io.to(socket.id).emit('data', data);
        count+=1;
        // if(count>100||count<0) {dir = dir* -1}
        console.log(data)
    }, 50)

    socket.on('selectLayer',(data)=>{
        console.log(data);
        socket.broadcast.emit('displayLayer', data);
    })

    socket.on('disconnect', () => {
        count = 0;
        data.x = 500;
        data.y = 300;
        console.log('user disconnected');
    });

});

