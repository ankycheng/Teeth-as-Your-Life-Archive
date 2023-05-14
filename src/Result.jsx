import React, { Component } from "react";
import "./Result.scss";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.getUrlParameter("type"), // archive or read
    };
  }
  render() {
    return (
      <div
        id="result"
        className="flex flex-col justify-center items-center p-8"
      >
        {this.getResult()}
      </div>
    );
  }
  getResult = () => {
    if (this.state.type === "archive") {
      return (
        <div
          id="result-archive"
          className="flex flex-col justify-center items-center flex-col"
        >
          {/* <div id="result-img-holder">
            <img src="./assets/archived.png" alt="" />
          </div> */}
          <h3>Your experience is archived.</h3>
          <p>
            Your story is safely archived as a layer. Enjoy to read others’
            stories on the tooth or restart to create another layer with a
            story.
          </p>
          <button
            className="mt-8"
            onClick={() => (window.location.href = "/")}
          >
            Restart
          </button>
        </div>
      );
    } else {
      return (
        <div
          id="result-archive"
          className="flex flex-col justify-center items-center flex-col"
        >
          <div id="result-img-holder">
            {/* <img src="./assets/mood_fear.png" alt="" srcset="" /> */}
            <video loop autoPlay>
              <source src="./assets/read.mp4" type="video/mp4" />
            </video>
          </div>
          <h3>Select one and read.</h3>
          <p>Select a layer to read a story.</p>
          <button
            className="mt-8 self-end"
            onClick={() => (window.location.href = "/")}
          >
            Restart
          </button>
        </div>
      );
    }
  };
  getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    let results = regex.exec(window.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };
}

export default Result;
