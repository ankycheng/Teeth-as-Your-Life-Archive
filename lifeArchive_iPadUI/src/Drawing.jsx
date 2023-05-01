import React, { Component } from "react";
import { writeImageData, getDrawings } from "./db";
import "./Drawing.scss";

const moodList = [
  {
    mood: "Happy",
    img: ""
  },
  {
    mood: "Sad",
    img: ""
  },
  {
    mood: "Fear",
    img: ""
  },
  {
    mood: "Surprise",
    img: ""
  },
  {
    mood: "Worry",
    img: ""
  },
  {
    mood: "Painful",
    img: ""
  }
]

class Drawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "drawing", // drawing or mood
      selectedMood: null,
      drawingData: {
        img: null,
        mood: null,
      },
    };
    // this.componentDidMount();
  }
  componentDidMount() {
    this.bindBtns();
    this.listeningForImageData();
    getDrawings();
  }
  render() {
    return (
      <div id="drawing" className="flex flex-col justify-center items-center">
        <div
          id="drawing-draw"
          className={`"" ${this.state.state === "drawing" ? "show" : "hide"}`}
        >
          <div id="drawing-info" className="mb-8">
            <h1 className={`mb-4`}>Put down your experiences</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <button id="btn-drawdone">Next</button>
          <iframe
            id="sketch-iframe"
            src="https://beryl-lilac-plot.glitch.me/"
          ></iframe>
        </div>
        <div
          id="drawing-mood"
          className={`"" ${this.state.state === "drawing" ? "hide" : "show"}`}
        >
          <h1 className={`mb-4`}>
            {" "}
            What best describes your related feeling?{" "}
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div id="moods" className={`flex flex-wrap mt-4`}>
            {Array.from({ length: 6 }, (_, i) => {
              return (
                <div key={i} className={`mood-card my-4 ${this.state.selectedMood === i ? 'selected':''}`}>
                  <img src="" alt="" />
                  <div className="mood-card-tag p-4" 
                      onClick={()=>this.updateMood(i)}
                      
                  >  
                      {moodList[i].mood}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mood-actions flex justify-between">
            <button id="btn-redraw">Redraw</button>
            <button id="btn-submit">Finish</button>
          </div>
        </div>
      </div>
    );
  }

  bindBtns() {
    let btnRedraw = document.getElementById("btn-redraw");
    let btnDrawdone = document.getElementById("btn-drawdone");
    let btnFinsih = document.getElementById("btn-submit");

    btnDrawdone.addEventListener("click", () => {
      this.updateDrawState();
    });
    btnRedraw.addEventListener("click", () => {
      this.updateDrawState();
    });
    btnFinsih.addEventListener("click", () => {
      let ifm = document.getElementById("sketch-iframe");
      // ifm.contentWindow.submit();
      ifm.contentWindow.postMessage(
        /*any variable or object here*/ "a",
        "https://beryl-lilac-plot.glitch.me/"
      );
    });
  }

  listeningForImageData() {
    window.addEventListener("message", (event) => {
      // IMPORTANT: check the origin of the data!
      if (event.origin.includes("glitch")) {
        console.log("parent receives message");
        console.log(event);
        if (event.data.img) {
          this.updateDrawState();
          this.updateDrawingData(event.data.img);
        } else {
          console.error("wrong data type");
        }
      }
    });
  }

  updateDrawState() {
    this.setState({
      state: this.state.state === "drawing" ? "mood" : "drawing",
    });
  }

  updateDrawingData(imgBase64Data) {
    this.setState((prevState) => ({
      drawingData: {
        ...prevState.drawingData,
        img: imgBase64Data,
      },
    }));
  }

  updateMood(moodId) {
    // this.setState((prevState) => {
    //   selectedMood: moodList[moodId];
    // });
    console.log('mood clicked')

    this.setState((prevState) => {
      return {
        drawingData: {
          ...prevState.drawingData,
          mood: moodList[moodId].mood
        },
        selectedMood: moodId
      }
    });

    // this.setState((prevState) => ({
    //   drawingData: {
    //     ...prevState.drawingData,
    //     img: imgBase64Data,
    //   },
    // }));
  }
}

export default Drawing;
