import React, { Component } from "react";
import { getDrawings } from "./db";
import "./ToothDisplay.scss";

class ToothDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archive: [{
        img: ''
      }],
      status: "display", // intro, display, playing animation?
    };
  }

  componentDidMount() {
    this.updateArchive();
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
        <div id="display-image-holder">
          <img src={this.state.archive[this.state.archive.length-1].img} alt="" />
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
    console.log(drawingList);
    this.setState({
      archive: drawingList,
    });
  }
}

export default ToothDisplay;
