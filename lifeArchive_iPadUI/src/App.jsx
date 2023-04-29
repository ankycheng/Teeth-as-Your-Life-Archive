import React, { Component } from "react";
import IntroCarousel from "./IntroCarousel";
import "./App.scss";

class App extends Component{
  constructor(props){
    super(props);
    this.list = [1, 2, 3];
    this.state = {
      
    }
  }
  render(){
    return (
      <div id="app" className="flex flex-col justify-center items-center">
        <IntroCarousel ></IntroCarousel>
      </div>
    );
  }
  
  // onConfirm={this.handleLanguage}
}

export default App;
