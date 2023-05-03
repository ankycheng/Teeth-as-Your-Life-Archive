import { io } from "socket.io-client";

let pos = {
  x: null,
  y: null,
};

const serverUrl = "http://10.18.213.78:3000";

// const socket = io("https://984f-216-165-95-183.ngrok-free.app", {
//   reconnectionDelayMax: 10000
// });

export let layerSocket;
export let drawingSocket;
export let displaySocket;

export function buildDisplayPageSC() {
  displaySocket = io(serverUrl, {
    reconnectionDelayMax: 10000,
    auth: {
      token: "display",
    },
  });

  displaySocket.on("connection", () => {
  });
}

export function buildDrawingPageSC() {
  drawingSocket = io(serverUrl, {
    reconnectionDelayMax: 10000,
    auth: {
      token: "layerDrawing",
    },
  });

  drawingSocket.on("connection", () => {
    console.log("connected to serever");
  });
  drawingSocket.on("data", (data) => {
    pos = data;
  });
}


export function buildLayerPageSC() {
  layerSocket = io(serverUrl, {
    reconnectionDelayMax: 10000,
    auth: {
      token: "layer",
    },
  });

  layerSocket.on("connection", () => {
    console.log("connected to serever");
  });
  layerSocket.on("data", (data) => {
    pos = data;
  });
}

export function selectLayer(layerSocket, id) {
  layerSocket.emit("selectLayer", id);
}

export function getPosData() {
  return pos;
}
