import React, { Component } from "react";
import { getDrawings } from "./db";
import "./ToothLayers.scss";
import {
  getPosData,
  selectLayer,
  buildLayerPageSC,
  layerSocket,
} from "./socket.js";

let imgIdx = 0

class ToothLayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedPath: null,
      layerShownNumber: 1
    };
  }

  componentDidMount() {
    // for (let i = 0; i < 15; i++) {
    //   this.addOnStrokeListener(i, "yellow");
    // }
    // this.addIndicatorListener()
    buildLayerPageSC();
    this.updatePosData();
    this.oneLayerAdded();
    layerSocket.on('addLayer', ()=>{
      console.log('add layer')
      this.oneLayerAdded();
    })
  }

  render() {
    return (
      <div id="layers" className="flex flex-col justify-center items-center">
        <div id="indicator"></div>
        <svg
          id="tooth-layer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 371"
        >
          <g id="layer-group">
            <rect x=".5" y=".5" width="636.77" height="367.74" />
            <path
              id="path_0"
              d="m96.63,11.15s59.03,74.19,68.39,156.94,6.77,112.42,24.19,112.42,15.7-23.26,27.74-112.42c10-74.03,45.93-140.48,100.12-140.48s94.39,46.94,101.49,141.29c5.89,78.34,5.16,86.45,19.35,87.1,0,0,14.19-1.29,20.52-28.6,13.38-57.78,43.03-156.24,82.39-216.24"
            />
            <path
              id="path_1"
              d="m69.53,11.15s67.11,93.17,79.35,173.23,13.19,120.32,40,120.32c30.32,0,25.16-24.19,44.84-120.32,22.06-107.78,45.12-138.39,85-138.39s67.7,19.6,84.03,132.01c9.03,62.18,4.42,107.81,27.74,110.25,21.61,2.26,31.29-17.74,43.87-62.26,18.03-63.79,53.23-169.03,92.58-214.84"
            />
            <path
              id="path_2"
              d="m41.4,11.15s74.52,117.14,88.39,175.83,20.71,143.53,53.94,145.14c34.16,1.66,42.84-4.84,71.55-154.35,0,0,19.45-114.35,61.8-114.35s57.54,38.02,66.91,129.68c8.77,85.81,19.1,131.94,40.71,135.16,23.85,3.56,41.61-9.68,59.29-79.35,23.85-94.02,73.23-192.58,112.58-237.74"
            />
            <path
              id="path_3"
              d="m16.23,11.15s78.06,130,93.87,186.13,19.35,164.19,70.32,164.19,56.45-25.81,92.58-175.16c0,0,12.9-108.06,47.42-108.06s40.32,89.68,40.32,89.68c1.04,14.52,14.59,191.61,60.32,193.55,0,0,52.65,13.23,75.56-97.74,24.23-117.38,121.29-252.58,121.29-252.58"
            />
            <path id="path_4" d="m126.95,11.15s43.17,74.23,52.58,145.16,2.26,90.32,10.97,90.32,7.42-14.52,9.35-49.03S219.21,11.15,318.89,11.15c91.94,0,114.84,95.48,115.81,148.06.83,44.86-2.26,57.1,5.48,57.1s8.06-4.16,20.65-58.69c12.58-54.53,58.71-146.47,58.71-146.47" />
          </g>
        </svg>
        {/* <svg version="1.1" id="tooth-layer" viewBox="0 0 640 371">
          <path
            id="path_12"
            d="m25.4,87.6l5.7,10.9,13.6,26.7,7.5,18,7.9,18.9,4.7,15.8,8,21.5,3.9,15.3,6.2,18.9,4.4,21,3.3,19.3.7,15.4,2.1,10.8,4.7,15.4,4.1,10.6,2,4.6c2.1,4.7,4.7,9.1,7.9,13.2l1,1.3,7.4,7.2,9.2,6.2,3.3,1.6c3.1,1.5,6.4,2.5,9.7,2.9l9.2,1.3,15.3-1.1,14.7-4,12.3-9.2,7.3-9.2,10.2-14.7,6.4-16.8,8.6-25.5,4.7-21.6,6.8-24.2,5.8-16.8,7.5-23.2,8.9-30,10.2-33.5,7.2-24.9,6.3-15.3c.6-1.4,1.3-2.7,2.1-3.9l1.8-2.7c2.3-3.3,5.4-5.9,9-7.5h0c1.9-.9,4-1.4,6.1-1.7l5-.6c1.8-.2,3.7-.2,5.5,0l9.9,1.3,4.5.5c3.5.3,6.8,1.5,9.7,3.5l.6.4c1.2.8,2.3,1.7,3.3,2.7l1,1c2.4,2.4,4.2,5.4,5.3,8.7l2.7,8.7c.3.9.5,1.7.7,2.6l3.9,21.3,10.6,52.6,13.7,62.8,10.2,39.2,8.5,28.7,5.8,15.1,4.2,11.5c.4,1,.8,1.9,1.2,2.8l2.7,5.3c1.4,2.7,3.2,5.2,5.4,7.2h0c1.9,1.8,4,3.3,6.4,4.4l7.4,3.6c3.4,1.7,7.1,2.6,10.8,2.7l14.7.4c1.4,0,2.9,0,4.3-.2l14.1-2c1.9-.3,3.7-.7,5.4-1.4l1.1-.4c4.2-1.6,8-4.2,10.9-7.6l1.3-1.5c1.2-1.4,2.2-2.9,3.1-4.5l7-12.9,5.1-18.1,13.6-40,16.8-45.1,14.3-32.1,14-31.1,16.8-32.1,10.6-21.3,11.7-18.5,7.4-11.5"
          />
          <path
            id="path_9"
            d="m39.9,78.2l21.1,44.2,13.2,32.4,8.9,26.8,15.5,48.5,6.6,30,1.9,29.6,6.1,21.6,10.8,20.3,2.9,2.9c4.6,4.6,10.1,8.1,16.2,10.2h0c2,.7,4,1,6.1.9l9.1-.3c2.2-.1,4.3-.5,6.4-1.4h0c6.6-2.8,12.5-7.1,17.3-12.5l4.5-5.1,12.6-18.3,10.3-31.5,11.8-47,46.2-137.8c.3-.9.7-1.8,1.1-2.7l6.6-13.9c1.7-3.6,4.3-6.7,7.5-9.1h0c4.5-3.4,10-5.1,15.6-4.9l30.6.9c2.6.1,5.2.6,7.7,1.5l8.4,3c4.1,1.5,7.7,4.1,10.5,7.4l3,3.6c2.6,3.2,4.4,7,5.2,11l10.9,55.9,26.6,118.6,13.6,47.1,5.3,16.8c.9,2.9,2.3,5.6,4,8l.8,1.2c2.4,3.3,5.4,6,8.9,8.1h0c3.9,2.3,8.4,3.6,12.9,3.8l7.7.4c3.7.2,7.3-.4,10.8-1.6l3.4-1.2c5.7-2,10.6-5.7,14-10.7l1.9-2.8c.9-1.2,1.6-2.5,2.3-3.9l11.7-24.3,26.8-79.9,21.1-55,49.4-93"
          />
          <path
            id="path_6"
            d="m54,70.6l24.3,51.5,11.8,33.2,14.2,42,11.8,37.8,4.7,26.7,2.4,26,5.3,19.6,5.8,9.8c1.2,2.1,2.8,4,4.7,5.5l1.9,1.6c1.5,1.3,3.5,2.1,5.5,2.2l3.8.2c1.7.1,3.4-.1,5-.7l3.3-1.1c4.4-1.5,8.3-4.4,11.1-8.2l2.2-3,11.3-18.3,10.6-36.1,14.2-41.4,19.6-63.9,14.8-46.2,12-35c.7-1.9,1.5-3.8,2.6-5.6l6.9-11.4c2.6-4.3,6.2-7.9,10.6-10.4h0c3.9-2.2,8.2-3.5,12.6-3.8l16.9-1.1c1.2-.1,2.4-.1,3.5,0l19.1,1c1.1.1,2.1.2,3.2.3l13.5,2.2c1.7.3,3.5.7,5.1,1.3l7.9,2.8c4.1,1.5,7.8,3.8,10.9,6.9l.8.8c2.6,2.6,4.8,5.8,6.2,9.2l3.6,8.4c.8,1.9,1.4,4,1.8,6l7.2,37.7,10,46.2,14.8,64.5,13.6,52.1,7.2,24.8,3.2,11.5c.6,2.2,1.7,4.2,3.1,6l1.3,1.6c2.3,3,5.6,5,9.3,5.9l1.5.4c3.1.8,6.4.6,9.4-.4h0c3.8-1.3,7.1-3.9,9.1-7.3l3.1-5.1c.5-.9,1-1.8,1.4-2.8l19-50,20-59.8,22.5-53.2,18.9-39.1,18.9-44.7"
          />
          <path
            id="path_3"
            d="m71.2,61.1l18.9,44,8.6,21.5,10.8,28.4,8.1,25,8.3,24.1,6.9,22,3.8,19.4,5.2,28.8,3.9,15.5,2.5,7.7c.4,1.1,1.2,2,2.3,2.5h0c2.1.9,4.5.5,6.2-1l2.3-2c1.2-1,2.1-2.4,2.7-3.8l7.2-17.9,19.4-60.7,34.9-110.8,15.4-44.5c1-2.8,2.2-5.6,3.7-8.1l2.5-4.4c4.4-7.5,10.8-13.7,18.6-17.7h0c5.2-2.7,11-4.4,16.9-5l21.5-2.1c2.7-.3,5.5-.3,8.3-.1l30.5,2.5c1.9.2,3.8.4,5.7.8l7.5,1.6c9.2,1.9,17.7,6.6,24.1,13.5l.3.4c3.7,3.9,6.7,8.4,8.9,13.4l5.5,12.5c1.1,2.4,1.9,5,2.6,7.6l16.3,67.3,29.8,130.5,6.4,25,2.2,6.9c2,7.5,7.8,7.6,10.5,1l14.9-48.3,34.9-91.8,30.6-71.5,15.9-36.6"
          />
          <path
            id="path_0"
            d="m86.9,54.1l14.7,34.9,19,44.7c0,.1.1.2.1.3l10.3,30.6,11.2,29.7c.1.2.1.4.2.6l6.3,28.3c0,.1,4.6,43.6,6.6,42.4l4.4-16c.9-.5,5.3-20.2,5.6-21.3l5.3-20.8,34.8-114.7q0-.1.1-.2l17.2-47.3c3-8.4,8.1-15.9,14.8-21.8l.3-.3c10.1-8.9,22.6-14.5,36-16,5.8-.7,11.7-1.3,16.3-1.9,5.3-.6,10.6-.8,15.9-.5l44.5,2.3c5.1.3,10.1,1.2,15,2.8l6.6,2.2c9.5,3.1,17.8,8.9,23.9,16.7l1.2,1.6c.2.3.4.6.5.9l13.3,29.2c.1.2.2.5.2.7l18,69,12.8,52.7,8.5,41.5c0,.1,0,.2.1.3,0,0,3.3,15.6,3.4,21.4.4,57.6,13.5-14.3,14.2-16.2,11.9-30,20.6-58.9,20.8-59.3l6.6-22.5c0-.1.1-.2.1-.2l29-70,11.7-26.6"
          />
        </svg> */}
        <button className="select-layer" onClick={()=>{layerSocket.emit('selectLayer', imgIdx); imgIdx+=1}}
        style={{transform: `translateY(100px)`}}
        >select layer</button>
      </div>
    );
  }

  oneLayerAdded(){
    let layers = document.querySelectorAll("path[id^='path_']");
    if(this.state.layerShownNumber > layers.length) return
    layers[this.state.layerShownNumber].style.display = 'initial';
    this.setState({
      layerShownNumber: this.state.layerShownNumber+=1
    })
  }

  addOnStrokeListener(layerId, color) {
    let svg = document.getElementById("tooth-layer");
    let p = document.getElementById(`path_${layerId}`);
    let svgRect = svg.getBoundingClientRect();
    // console.log(svg);
    // console.log(p);

    svg.addEventListener("mousemove", function (event) {
      let mouseX = event.clientX - svgRect.left;
      let mouseY = event.clientY - svgRect.top;

      // Create an SVGPoint in the user coordinate system
      // let s = svg.createSVGPoint();
      var s = document
        .createElementNS("http://www.w3.org/2000/svg", "svg")
        .createSVGPoint();

      // Then, set the x and y values of the returned SVGPoint object
      // (which is the variable `s`)
      s.x = mouseX;
      s.y = mouseY;

      // console.clear()
      // console.log(mouseX + " " + mouseY);
      if (p.isPointInStroke(s)) {
        console.log("Mouse is on stroke " + layerId);
        // p.style.stroke = color;
        // p.style.transform = "scale(1.005)";
        // p.style.filter = "drop-shadow(0 0 3px #fff)";
        p.style.filter = `drop-shadow(0 0 2px ${color})`;
      } else {
        // console.log('Mouse is not on stroke');
        // p.style.stroke = "#eadeda";
        // path.style.transform = "scale(1)";
        p.style.filter = `drop-shadow(0 0 0px ${color})`;
      }
    });
  }

  addIndicatorListener() {
    document.addEventListener("mousemove", (event) => {
      let indicator = document.getElementById("indicator");
      indicator.style.left = event.clientX + "px";
      indicator.style.top = event.clientY + "px";
    });
  }

  updatePosData = () => {
    let start = Date.now();
    // let football = document.querySelector("#indicator")
    // timestamp: time elapsed in milliseconds since the web page was loaded
    let svg = document.getElementById("tooth-layer");
    let svgRect = svg.getBoundingClientRect();
    let layers = document.querySelectorAll("path[id^='path_']");
    var s = document
      .createElementNS("http://www.w3.org/2000/svg", "svg")
      .createSVGPoint();
    // let timer = Date.now();
    let counter = 0;
    let moveIndicator = (timestamp) => {
      let interval = Date.now() - start;
      let pos = getPosData();

      if (pos.posYOnScreen) {
        // console.log(pos);
        let indicator = document.getElementById("indicator");
        indicator.style.left = pos.posXOnScreen - svgRect.left + "px";
        indicator.style.top = pos.posYOnScreen - svgRect.top + "px";

        let indX = pos.posXOnScreen + svgRect.left;
        let indY = pos.posYOnScreen + svgRect.top;
        s.x = indX;
        s.y = indY;

        layers.forEach((layerPath, index) => {
          if (layerPath.isPointInStroke(s)) {
            console.log("Mouse is on stroke " + layerPath.id);
            console.log(this.state.currentSelectedPath);

            if (this.state.currentSelectedPath !== layerPath.id) {
              this.setState({
                currentSelectedPath: layerPath.id,
              });
              counter = 0;
            } else {
              counter += 1;
            }
            layerPath.style.filter = `drop-shadow(0 0 5px ${color})`;
            if (counter > 70) {
              layerPath.style.stroke = "yellow";
              layerSocket.emit('selectLayer', index)
            }
            // selectLayer(layerSocket, layerPath.id);
          } else {
            // timer = Date.now();
            layerPath.style.stroke = "white";
          }
        });
      }

      requestAnimationFrame(moveIndicator); // queue request for next frame
    };

    requestAnimationFrame(moveIndicator);
  };
}

export default ToothLayers;
