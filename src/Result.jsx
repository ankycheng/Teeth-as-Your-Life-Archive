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
          <div id="result-img-holder">
            <img src="./assets/mood_fear.png" alt="" />
          </div>
          <h3>Your experience is archived.</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <button
            className="mt-8 self-end"
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
            <img src="./assets/mood_fear.png" alt="" srcset="" />
          </div>
          <h3>Select one and read.</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
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
