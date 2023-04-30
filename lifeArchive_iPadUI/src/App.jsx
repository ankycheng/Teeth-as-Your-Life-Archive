import React, { Component } from "react";
import IntroCarousel from "./IntroCarousel";
import Drawing from "./Drawing"
import "./App.scss";

class App extends Component{
  constructor(props){
    super(props);
    this.list = [1, 2, 3];
    this.state = {
      step: 1
    }
  }
  render(){
    return (
      <div id="app" className="flex flex-col justify-center items-center">
        {this.state.step === 0 ? <IntroCarousel ></IntroCarousel> : <Drawing></Drawing>}
      </div>
    );
  }
  
  // onConfirm={this.handleLanguage}
}

export default App;
