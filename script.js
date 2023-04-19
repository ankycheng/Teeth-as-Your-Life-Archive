console.clear();

const maxLayerCount = 20;

let counter = 0;
let currentSel = null;

// const CLRSTRING = '820263-d90368-eadeda-2e294e-ffd400'
const CLRSTRING = "eadeda-eadeda-eadeda-eadeda-eadeda";
const CLRS = CLRSTRING.split("-").map((c) => "#" + c);

const svgPath = `d="m118.15,1.79c-31.7,4.5-52.6,14-73.5,33.2C26.35,51.89,10.45,81.69,4.35,110.59c-8.6,40.4-2.7,83.2,16.7,122,5.4,10.8,9.4,17.3,23.3,37.7,8.6,12.7,18.7,33,22.8,46,4.1,12.9,7.5,29.9,11.7,58.5,5.7,38.1,10.9,61.1,18.5,82.6,12.1,33.6,28.4,52.2,48.2,54.5,31.4,3.7,53.9-40.3,66.3-129.6,2.8-20,4.4-27.5,7.7-36,9.3-24.1,20.3-24.1,29.6,0,3.2,8.3,4.9,16,7.2,32.5,8.1,59,20.2,98.7,35.9,118.1,21.4,26.4,52.1,17.5,71.1-20.5,11.4-22.9,19.2-52.9,26.5-101.6,4.2-28.6,7.6-45.6,11.7-58.5,4.1-13,14.2-33.3,22.8-46,13.8-20.2,17.9-26.9,23-37.1,9.3-18.4,14.7-34.8,18.7-56.9,2.1-11.8,2.4-43.8.4-55-8.8-50.3-33.5-87.4-70.6-106.3-25.4-12.9-63.2-17.8-95-12.2-21.1,3.7-47.2,13.4-62.7,23.1l-3.8,2.4-3.8-2.4c-15.4-9.7-41.4-19.3-62.7-23.1C155.25.49,130.25-.01,118.15,1.79Z"`;

function createSVG(id) {
  let scaleFactor = 0.5 + 0.05 * id;

  let xyOffset = (100 * (0.5 - 0.05 * id)) / 4;

  // 	let scaleFactor = 0.5;

  // 	let xyOffset = (0.05*100)/4;

  // let scaleFactor = 1 - 0.05*id;
  // let xyOffset = (0.05*100*id)/4;

  let svgsEl = document.getElementById("svgs");
  let svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.id = `tooth_${id}`;
  // stroke-width="${20/scaleFactor}
  svgEl.setAttribute("viewBox", "-10 -10 1000 1000");
  svgEl.innerHTML = `<path stroke-linecap="round" class="path" fill="transparent" stroke-width="${1}" stroke=${
    CLRS[id % CLRS.length]
  } style="transform: translate(${
    xyOffset + id * 0.1
  }%, ${xyOffset}%) scale(${scaleFactor}); animation: dash 10s linear forwards; }" ${svgPath} />`;
  svgsEl.appendChild(svgEl);
  // svgsEl.prepend(svgEl);

  svgEl.addEventListener("mouseover", (e) => {
    currentSel = id;
    console.log(id);
  });
}

function addLayer() {
  createSVG(counter);
  counter += 1;
}

function bindLayers() {
  let layerSVGs = document.querySelectorAll("#svgs>svg");
}

const svg = document.getElementById("tooth_1");
const path = document.getElementById("path_1");

const svgRect = svg.getBoundingClientRect();

svg.addEventListener("mousemove", function (event) {
  const mouseX = event.clientX - svgRect.left;
  const mouseY = event.clientY - svgRect.top;

  // Create an SVGPoint in the user coordinate system
  let s = svg.createSVGPoint();

  // Then, set the x and y values of the returned SVGPoint object
  // (which is the variable `s`)
  s.x = mouseX;
  s.y = mouseY;
  // console.log(s)

  // console.log(mouseX +' ' +mouseY)
  if (path.isPointInStroke(s)) {
    // console.log('Mouse is on stroke');
    // path.style.stroke = '#ff0011';
    // path.style.transform = 'scale(1.005)';
    path.style.filter = "drop-shadow(0 0 3px #fff)";
  } else {
    // console.log('Mouse is not on stroke');
    // path.style.stroke = '#eadeda';
    // path.style.transform = 'scale(1)';
    path.style.filter = "none";
  }
});
// const svgRect = svg.getBoundingClientRect();

/**
 * expected argument lengths
 * @type {Object}
 */

var length = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 };

/**
 * segment pattern
 * @type {RegExp}
 */

var segment = /([astvzqmhlc])([^astvzqmhlc]*)/gi;

/**
 * parse an svg path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * @param {String} path
 * @return {Array}
 */

function parse(path) {
  var data = [];
  path.replace(segment, function (_, command, args) {
    var type = command.toLowerCase();
    args = parseValues(args);

    // overloaded moveTo
    if (type == "m" && args.length > 2) {
      data.push([command].concat(args.splice(0, 2)));
      type = "l";
      command = command == "m" ? "l" : "L";
    }

    while (true) {
      if (args.length == length[type]) {
        args.unshift(command);
        return data.push(args);
      }
      if (args.length < length[type]) throw new Error("malformed path data");
      data.push([command].concat(args.splice(0, length[type])));
    }
  });
  return data;
}

var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;

function parseValues(args) {
  var numbers = args.match(number);
  return numbers ? numbers.map(Number) : [];
}
