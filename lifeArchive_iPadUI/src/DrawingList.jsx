import React, { Component } from "react";
import { writeImageData, getDrawings } from "./db";
import "./DrawingList.scss";

class DrawingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archive: [],
    };
  }

  componentDidMount() {
    this.updateArchive();
  }

  async updateArchive() {
    let drawings = await getDrawings();
    
    let drawingList = Object.entries(drawings).map((drawing) => {
        return {
          ts: drawing[0],
          img: "data:image/png;base64, " + drawing[1].img,
        };
      })
      console.log(drawingList);
    this.setState({
      archive: drawingList
    });
  }

  render() {
    return (
      <div id="archive" className="flex flex-col justify-center items-center">
        {this.state.archive.map((archive, index) => {
          return (
            <div key={index} className="archive-card">
              <img src={archive.img} alt="" />
            </div>
          );
        })}
      </div>
    );
  }
}

export default DrawingList;
