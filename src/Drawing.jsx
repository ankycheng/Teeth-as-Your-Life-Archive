import React, { Component } from "react";
import { writeImageData, getDrawings } from "./db";
import "./Drawing.scss";

const moodList = [
  {
    mood: "Joy",
    img: "./assets/mood_joy.png",
    color: "#E868A2",
  },
  {
    mood: "Sad",
    img: "./assets/mood_sad.png",
    color: "#147EFB",
  },
  {
    mood: "Surprise",
    img: "./assets/mood_surprise.png",
    color: "#FECB2E",
  },
  {
    mood: "Fear",
    img: "./assets/mood_fear.png",
    color: "#9C2AA0",
  },
  {
    mood: "Stressed",
    img: "./assets/mood_stressed.png",
    color: "#53D769",
  },
  {
    mood: "Love",
    img: "./assets/mood_love.png",
    color: "#FC3D39",
  },
];
class Drawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "drawing", // drawing or mood or loading
      showLoading: false,
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
          <div id="drawing-info" className="mb-4">
            <h1 className={`mb-4`}>Share your experience!</h1>
            <p>
              Your story will be anonymous. However, please note that others
              will be able to access and read any information you include here.
            </p>
          </div>
          {/* <button id="btn-drawdone">Next</button> */}
          <iframe
            id="sketch-iframe"
            src="https://beryl-lilac-plot.glitch.me/"
          ></iframe>
        </div>
        <div
          id="drawing-mood"
          className={`${this.state.state === "drawing" ? "hide" : "show"}`}
        >
          <h1 className={`mb-4`}>
            {" "}
            What best describes your related feeling?{" "}
          </h1>
          <p>
            Based on the drawing or text you have created, please select from
            the options below the emotion that most accurately reflects how you
            felt during the shared experience.
          </p>
          <div id="moods" className={`flex flex-wrap mt-4`}>
            {moodList.map((mood, i) => {
              return (
                <div
                  key={i}
                  onClick={() => this.updateMood(i)}
                  className={`mood-card my-4 ${
                    this.state.selectedMood === i ? "selected" : ""
                  }`}
                > 
                  <div className="mood-img-holder flex align-center justify-center pt-4 pb-2"
                    style={{backgroundColor: mood.color}}
                  >
                    <img src={mood.img} alt="" />
                  </div>
                  <div
                    className="mood-card-tag flex align-center justify-center pt-2 pb-2"
                  >
                    {moodList[i].mood}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mood-actions flex justify-between">
            <button id="btn-redraw">Redraw</button>
            <button id="btn-submit" 
              onClick={
                () => {
                  this.writeImageData();
                  this.playArchivingVideo();
                }
              }
            >
              Finish
            </button>
          </div>
        </div>
        <div id="drawing-archiving" className={`flex flex-col justify-center items-center ${this.state.showLoading === true ? "archive-show": "archive-hide"}`}>
            <video>
              <source src="./assets/loading.mp4" type="video/mp4" />
            </video>
            <div id="drawing-archiving-content">
              <h3>Archiving</h3>
              <span>Information about only impactful experience will be recorded.</span>
            </div>
        </div>
      </div>
    );
  }

  writeImageData() {
    writeImageData(this.state.drawingData);
    console.log("data uploaded");
  }

  bindBtns() {
    let btnRedraw = document.getElementById("btn-redraw");
    // let btnDrawdone = document.getElementById("btn-drawdone");
    let btnFinsih = document.getElementById("btn-submit");

    // btnDrawdone.addEventListener("click", () => {
    //   this.updateDrawState();
    // });
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

  playArchivingVideo(){
    this.setState({
      showLoading: true
    })
    const videoEl = document.querySelector('#drawing-archiving video');
    videoEl.play();
    videoEl.addEventListener('ended', ()=>{
      console.log('end')
    })
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
    console.log("mood clicked");

    this.setState((prevState) => {
      return {
        drawingData: {
          ...prevState.drawingData,
          mood: moodList[moodId].mood,
        },
        selectedMood: moodId,
      };
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
