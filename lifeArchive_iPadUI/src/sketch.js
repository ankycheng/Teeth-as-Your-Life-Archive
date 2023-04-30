// Drawing program with undo/redo (OOP version)
// Press CTRL+Z to undo, CTRL+SHIFT+Z to redo

// We need these to know if CTRL/SHIFT are pressed
let controlDown = false;
let shiftDown = false;
let undo;
const maxUndoSteps = 30;

function setup() {
  createCanvas(500, 500);
  background(30);
  undo = new Undo(maxUndoSteps);
  strokeWeight(3);
  stroke("#fff");

  buttonUndo = createButton("Undo");
  buttonUndo.position(0, 75);
  buttonUndo.mousePressed(() => {
    undo.undo();
  });

  buttonRedo = createButton("Redo");
  buttonRedo.position(50, 75);
  buttonRedo.mousePressed(() => {
    undo.redo();
    console.log("redo");
  });

  buttonRedo = createButton("Clear");
  buttonRedo.position(100, 75);
  buttonRedo.mousePressed(() => {
    undo.reset();
    console.log("reset");
  });
}
function draw() {
  // Our two line drawing program
  if (mouseIsPressed && isMouseInCanvas()) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function isMouseInCanvas() {
  let res =
    mouseX > 0 && mouseX < width && mouseY > 100 && mouseY < 100 + height;
  return res;
}

function mouseReleased() {
  if (isMouseInCanvas()) {
    undo.takeSnapshot();
  }
  // Save each line we draw to our stack of UNDOs
}

function keyPressed() {
  // Remember if CTRL or SHIFT are pressed or not
  console.log(key);
  if (key === "Control" || key === "Shift") {
    if (key == "Control") {
      controlDown = true;
    }

    if (key == "Shift") {
      shiftDown = true;
    }
    console.log(controlDown);
    return;
  }
  // Check if we pressed CTRL+Z or CTRL+SHIFT+Z
  if (controlDown) {
    if (key === "Z" || key === "z") {
      if (shiftDown) undo.redo();
      else undo.undo();
    }
    return;
  }
  // Check if we pressed the S key
  if (key == "s") {
    // saveFrame("image####.png");
  }
}
function keyReleased() {
  // Remember if CTRL or SHIFT are pressed or not
  if (key === "Control" || key === "Shift") {
    if (key === "Control") controlDown = false;
    if (key === "Shift") shiftDown = false;
  }
}

class Undo {
  constructor(levels) {
    this.undoSteps = 0;
    this.redoSteps = 0;
    this.maxUndoSteps = levels;
    // CircImgCollection images;
    this.images = new CircImgCollection(levels);
  }
  // Number of currently available undo and redo snapshots

  takeSnapshot() {
    this.undoSteps = min(this.undoSteps + 1, this.images.amount - 1);
    // each time we draw we disable redo
    this.redoSteps = 0;
    this.images.next();
    this.images.capture();
  }
  undo() {
    if (this.undoSteps > 0) {
      this.undoSteps--;
      this.redoSteps++;
      this.images.prev();
      this.images.show();
    }
  }
  redo() {
    if (this.redoSteps > 0) {
      this.undoSteps++;
      this.redoSteps--;
      this.images.next();
      this.images.show();
    }
  }
  reset() {
    clear();
    background(30);
    this.undoSteps = 0;
    this.redoSteps = 0;
    // CircImgCollection images;
    this.images = new CircImgCollection(this.maxUndoSteps);
  }
}

class CircImgCollection {
  constructor(amountOfImages) {
    this.img = [];
    this.current = 0;
    this.amount = amountOfImages;

    // Initialize all images as copies of the current display
    // img = new image[this.amount];
    for (let i = 0; i < this.amount; i++) {
      this.img[i] = createImage(width, height);
      this.img[i] = get();
    }
  }
  next() {
    this.current = (this.current + 1) % this.amount;
  }
  prev() {
    this.current = (this.current - 1 + this.amount) % this.amount;
  }
  capture() {
    this.img[this.current] = get();
  }
  show() {
    image(this.img[this.current], 0, 0);
  }
  reset() {
    this.img = [];
    this.current = 0;
    this.amount = amountOfImages;

    // Initialize all images as copies of the current display
    // img = new image[this.amount];
    for (let i = 0; i < this.amount; i++) {
      this.img[i] = createImage(width, height);
      this.img[i] = get();
    }
  }
}

export default {setup}