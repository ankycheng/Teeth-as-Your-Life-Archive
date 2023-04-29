import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./IntroCarousel.scss";

class IntroCarousel extends Component {
  render() {
    let infoList = [
      {
        title: "Background information",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        img: './assets/HumanMolar.png'
      },
      {
        title: "Title 2",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          img: './assets/HumanMolar.png'
      },
      {
        title: "Titile 3",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          img: './assets/HumanMolar.png'
      },
    ];
    return (
      <Carousel showThumbs={false} showArrows={true} emulateTouch={true} showStatus={false}>
        {infoList.map((item, index) => (
          <div key={index} id="bg-info" className="my-8"> 
            {/* <img src={require(item.img)} alt="" /> */}
            <div className="img-holder flex flex-col justify-center items-center">
              <img src={item.img} alt="" srcSet="" />
            </div>
            <div
              className="container flex flex-col justify-center items-start"
            >
              <h1 className="my-4 text-2xl font-bold">{item.title}</h1>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </Carousel>
    );
  }
}

export default IntroCarousel;
