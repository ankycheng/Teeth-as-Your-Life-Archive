import React, { Component } from "react";
import { displaySocket,buildDisplayPageSC } from "./socket.js";
import { getDrawings} from "./db";
import "./ToothDisplay.scss";

let timer;

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
      displayIndex: 0
    };
  }

  componentDidMount() {
    buildDisplayPageSC();
    this.updateArchive();
    displaySocket.on("displayLayer", (data) => {
      if(timer <30 && this.state.status === "display") return
      this.setState({
        status: "display",
        displayIndex: this.state.archive.length - 1 - data
      })
      timer = 0
    });
    setInterval(()=>{
      if(timer > 30){
        this.setState({
          status: "animation"
        })
        timer = 0
      }
      else if(this.state.status === "display"){
        timer += 1
      }
    },100)
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
    if (this.state.status === "display") {
      return (
        <div id="display-image-holder" className="px-8">
          <img
            src={this.state.archive[this.state.displayIndex].img}
            alt=""
          />
        </div>
      );
    }

    if (this.state.status === "animation") {
      return (
        <div id="display-animation">
          <video loop autoPlay>
            <source src="./assets/welcome.mp4" type="video/mp4" />
          </video>
        </div>
      );
    }
  }

  async updateArchive() {
    let drawings = await getDrawings();

    let drawingList = Object.entries(drawings).map((drawing) => {
      return {
        ts: drawing[0],
        img: "data:image/png;base64, " + drawing[1].img,
        mood: drawing[1].mood,
      };
    });
    // console.log(drawingList);
    this.setState({
      archive: drawingList,
    });
  }
}

export default ToothDisplay;
