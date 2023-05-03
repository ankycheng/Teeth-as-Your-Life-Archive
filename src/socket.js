import { io } from "socket.io-client";

let pos = {
    x:null,
    y:null
}

// const socket = io("https://984f-216-165-95-183.ngrok-free.app", {
//   reconnectionDelayMax: 10000
// });

const socket = io("http://10.18.213.78:3000", {
  reconnectionDelayMax: 10000
});

socket.io.on('connection', ()=>{
    console.log('connected to serever')
})

socket.on('data', (data)=>{
    // console.log(data);
    pos = data
})

export function selectLayer(id){
    socket.emit('selectLayer', id)
}

export function getPosData(){
    return pos
}