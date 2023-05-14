import React, { Component } from "react";
import { writeImageData, getDrawings, deleteDrawing } from "./db";
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
    console.log(drawings)
    
    let drawingList = Object.entries(drawings).map((drawing) => {
        return {
          ts: drawing[0],
          img: "data:image/png;base64, " + drawing[1].img,
          mood: drawing[1].mood
        };
      })
      console.log(drawingList);
    this.setState({
      archive: drawingList
    });
  }

  render() {
    return (
      <div id="archive" className="flex flex-row justify-center items-center flex-wrap">
        {this.state.archive.map((archive, index) => {
          return (
            <div key={index} className="archive-card p-4 m-4">
              <img src={archive.img} alt="" />
              <h3>uid: {archive.ts}</h3>
              <h3>Mood: {archive.mood}</h3>
              <button onClick={()=>{deleteDrawing(archive.ts);this.updateArchive();}}>Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default DrawingList;
