import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroCarousel from "./IntroCarousel";
import Drawing from "./Drawing";
import DrawingList from "./DrawingList";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.list = [1, 2, 3];
    this.state = {
      step: 0,
    };
  }
  render() {
    return (
      <BrowserRouter>
        <div id="app" className="flex flex-col justify-center items-center">
          <Routes>
            <Route
              index
              path=""
              element={<IntroCarousel updateStep={() => this.updateStep} />}
            ></Route>
            <Route path="draw" element={<Drawing />}></Route>
            <Route path="archive" element={<DrawingList />}></Route>
            {/* {this.state.step === 0 ? (
              <IntroCarousel updateStep={() => this.updateStep}></IntroCarousel>
            ) : (
              <Drawing></Drawing>
            )} */}

            {/* </Route> */}
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
  updateStep = (i) => {
    this.setState(() => {
      return {
        step: (this.state.step += i),
      };
    });
  };

  // onConfirm={this.handleLanguage}
}

export default App;
