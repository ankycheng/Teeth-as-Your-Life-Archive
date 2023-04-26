import "./style.css";
import parse from "parse-svg-path";
import getBounds from "svg-path-bounds";
import scale from "scale-svg-path";
import serialize from "serialize-svg-path";

const svgPath = `d="m118.15,1.79c-31.7,4.5-52.6,14-73.5,33.2C26.35,51.89,10.45,81.69,4.35,110.59c-8.6,40.4-2.7,83.2,16.7,122,5.4,10.8,9.4,17.3,23.3,37.7,8.6,12.7,18.7,33,22.8,46,4.1,12.9,7.5,29.9,11.7,58.5,5.7,38.1,10.9,61.1,18.5,82.6,12.1,33.6,28.4,52.2,48.2,54.5,31.4,3.7,53.9-40.3,66.3-129.6,2.8-20,4.4-27.5,7.7-36,9.3-24.1,20.3-24.1,29.6,0,3.2,8.3,4.9,16,7.2,32.5,8.1,59,20.2,98.7,35.9,118.1,21.4,26.4,52.1,17.5,71.1-20.5,11.4-22.9,19.2-52.9,26.5-101.6,4.2-28.6,7.6-45.6,11.7-58.5,4.1-13,14.2-33.3,22.8-46,13.8-20.2,17.9-26.9,23-37.1,9.3-18.4,14.7-34.8,18.7-56.9,2.1-11.8,2.4-43.8.4-55-8.8-50.3-33.5-87.4-70.6-106.3-25.4-12.9-63.2-17.8-95-12.2-21.1,3.7-47.2,13.4-62.7,23.1l-3.8,2.4-3.8-2.4c-15.4-9.7-41.4-19.3-62.7-23.1C155.25.49,130.25-.01,118.15,1.79Z"`;

const CLRSTRING = '820263-d90368-eadeda-2e294e-ffd400'
// const CLRSTRING = "eadeda-eadeda-eadeda-eadeda-eadeda";
const CLRS = CLRSTRING.split("-").map((c) => "#" + c);

const SVG_WIDTH = 406;
const SVG_HEIGHT = 443;

// const maxLayerCount = 20;
let layerCount = 0;
// addLayer(svgPath, 3);

function addLayer(svgPath, layerId) {
  // let scaleFactor = 0.3;
  let color = CLRS[layerId % CLRS.length]
  let scaleFactor = 0.2 + layerId * 0.05;
  
  // scale svg
  let scaledSVG = scale(parse(svgPath), scaleFactor);
  const serialedSclSVG = serialize(scaledSVG);

  // Get the width and hight of the scaled svg path
  const sclSVGBnd = getBounds(serialedSclSVG);
  const SCL_W = sclSVGBnd[2] - sclSVGBnd[0];
  const OFFSET_W = (SVG_WIDTH - SCL_W) / 2;
  const SCL_H = sclSVGBnd[3] - sclSVGBnd[1];
  const OFFSET_H = (SVG_HEIGHT - SCL_H) / 2;

  let tmp = [];

  scaledSVG.forEach((commandArr) => {
    let tmpCmd = [];
    // remove unused commands
    if (commandArr[0] == "l") return;

    commandArr.forEach((command, index) => {
      if (index == 0) {
        tmpCmd.push(command);
        return;
      }

      if (commandArr[0] == "m") {
        if (index == 1) command += OFFSET_W;
        if (index == 2) command += OFFSET_H;
      }

      // If it's capital command, it will set the absolute position
      if (commandArr[0] === "C") {
        if (index % 2 === 0) command += OFFSET_H;
        if (index % 2 !== 0) command += OFFSET_W;
      }
      tmpCmd.push(Math.round(command * 100) / 100);
    });
    tmp.push(tmpCmd);
  });

  // serialize translated svg path
  const serialedSclSVGTS = serialize(tmp);

  let svgsEl = document.getElementById("tooth_1");
  let pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathEl.id = `path_${layerId}`;
  // stroke-width="${20/scaleFactor}
  // svgEl.setAttribute("viewBox", "-10 -10 1000 1000");
  pathEl.setAttributeNS(null, "stroke-linecap", "round");
  pathEl.setAttributeNS(null, "class", "path");
  pathEl.setAttributeNS(null, "fill", "transparent");
  pathEl.setAttributeNS(null, "d", serialedSclSVGTS);
  pathEl.setAttributeNS(null, "stroke-width", 1);
  pathEl.setAttributeNS(null, "style", `animation: dash ${3 + layerId*0.5}s linear forwards; filter: drop-shadow(0 0 10px ${color})}`);
  // svgsEl.appendChild(pathEl);
  svgsEl.prepend(pathEl);
  addOnStrokeListener(layerId, color);
}

document.getElementById('btn_addLayer').addEventListener("click",()=>{
  addLayer(svgPath, layerCount);
  layerCount += 1;
})

function addOnStrokeListener(layerId, color) {
  let svg = document.getElementById("tooth_1");
  let p = document.getElementById(`path_${layerId}`);
  let svgRect = svg.getBoundingClientRect();
  // console.log(svg);
  // console.log(p);

  svg.addEventListener("mousemove", function (event) {
    let mouseX = event.clientX - svgRect.left;
    let mouseY = event.clientY - svgRect.top;

    // Create an SVGPoint in the user coordinate system
    let s = svg.createSVGPoint();

    // Then, set the x and y values of the returned SVGPoint object
    // (which is the variable `s`)
    s.x = mouseX;
    s.y = mouseY;

    // console.clear()
    // console.log(mouseX + " " + mouseY);
    if (p.isPointInStroke(s)) {
      console.log('Mouse is on stroke ' + layerId);
      p.style.stroke = color;
      // path.style.transform = "scale(1.005)";
      // p.style.filter = "drop-shadow(0 0 3px #fff)";
      p.style.filter = `drop-shadow(0 0 30px ${color})`;
    } else {
      // console.log('Mouse is not on stroke');
      p.style.stroke = '#eadeda';
      // path.style.transform = "scale(1)";
      p.style.filter = `drop-shadow(0 0 10px ${color})`;
    }
  });
}

export default addLayer;
