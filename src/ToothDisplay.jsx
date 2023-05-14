import React, { Component } from "react";
import { displaySocket, buildDisplayPageSC } from "./socket.js";
import { getDrawings } from "./db";
import "./ToothDisplay.scss";


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

let timer;
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
class ToothDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archive: [
        {
          img: "",
        },
      ],
      status: "animation", // intro, display, playing animation?
      displayIndex: 0,
    };
  }

  componentDidMount() {
    buildDisplayPageSC();
    this.updateArchive();

    displaySocket.on("displayLatest", () => {
      if (timer < 30 && this.state.status === "display") return;
      this.updateArchive();
      setTimeout(() => {
        this.setState({
          status: "display",
          displayIndex: this.state.archive.length - 1,
        });
        timer = 0;
      }, 2000);
    });

    displaySocket.on("displayRandom", (data) => {
      if (timer < 30 && this.state.status === "display") return;
      this.updateArchive();
      let rdmIndex;
      
      setTimeout(() => {
        rdmIndex = getRandomInt(this.state.archive.length - 1);
        this.setState({
          status: "display",
          displayIndex: rdmIndex,
        });
        
        let color = moodList.find(m=>m.mood===this.state.archive[rdmIndex].mood).color;
        console.log(color)
        document.getElementById('display-image-holder').style.border = `${color}`
        timer = 0;
      }, 1000);
    });

    setInterval(() => {
      if (timer > 50) {
        this.setState({
          status: "animation",
        });
        timer = 0;
      } else if (this.state.status === "display") {
        timer += 1;
      }
    }, 100);
  }

  render() {
    return (
      <div
        id="tooth-display"
        className="flex flex-col justify-center items-center"
      >
        {this.getDisplayContent()}
      </div>
    );
  }

  getDisplayContent() {
    return (
      <div>
        <div id="display-image-holder" className={`px-8 ${this.state.status === "display" ? "show" : "hide"}`}>
          <img src={this.state.archive[this.state.displayIndex].img} alt="" />
        </div>
        <div id="display-animation" className={`px-8 ${this.state.status === "animation" ? "show" : "hide"}`}>
          <video loop autoPlay>
            <source src="./assets/welcome.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }

  async updateArchive() {
    let drawings = await getDrawings();

    let drawingList = Object.entries(drawings).map((drawing) => {
      return {
        ts: drawing[0],
        img: "data:image/png;base64, " + drawing[1].img,
        mood: drawing[1].mood,
        sharing: drawing[1].sharing,
      };
    });

    this.setState({
      archive: drawingList.filter((d) => d.sharing),
    });
  }
}

export default ToothDisplay;
