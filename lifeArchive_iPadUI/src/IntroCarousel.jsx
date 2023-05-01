import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./IntroCarousel.scss";

class IntroCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  infoList = [
    {
      title: "Background information",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "./assets/HumanMolar.png",
    },
    {
      title: "Title 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "./assets/HumanMolar.png",
    },
    {
      title: "Titile 3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "./assets/HumanMolar.png",
    },
    {
      title: "Enjoy the experience",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "./assets/HumanMolar.png",
    },
  ];
  render() {
    return (
      <Carousel
        showThumbs={false}
        showArrows={true}
        emulateTouch={true}
        showStatus={false}
        width={'90vw'}
      >
        {this.infoList.map((item, index) => {
          if (index < 3) {
            return (
              <div key={index} id="bg-info" className="my-8">
                {/* <img src={require(item.img)} alt="" /> */}
                <div className="img-holder flex flex-col justify-center items-center">
                  <img src={item.img} alt="" srcSet="" />
                </div>
                <div className="container flex flex-col justify-center items-start">
                  <h1 className="my-4 text-2xl font-bold">{item.title}</h1>
                  <p>{item.content}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} id="bg-info" className="my-8">
                {/* <div className="img-holder flex flex-col justify-center items-center">
                  <img src={item.img} alt="" srcSet="" />
                </div> */}

                <div className="flex flex-col justify-center items-start">
                  <h1 className="my-4 text-2xl font-bold">{item.title}</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div className="cards flex flex-row justify-center items-center">
                  <Link to="/draw" className="m-8">
                    <div
                      className="archive-exp m-4 p-4"
                      onClick={this.props.updateStep(1)}
                    >
                      <div className="img-holder flex flex-col justify-center items-center">
                        <img src={item.img} alt="" srcSet="" />
                      </div>
                      <h3>Archive My Experience</h3>
                      <div className="cards-desc flex flex-row items-end">
                        <span>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor
                        </span>
                        <img
                          className="cta"
                          src="./assets/Enter_Right.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </Link>
                  <Link className="m-8">
                    <div className="read-others m-4 p-4">
                      <div className="img-holder flex flex-col justify-center items-center">
                        <img src={item.img} alt="" srcSet="" />
                      </div>
                      <h3>Read Others</h3>
                      <div className="cards-desc flex flex-row items-end">
                        <span>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor
                        </span>
                        <img
                          className="cta"
                          src="./assets/Enter_Right.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          }
        })}
      </Carousel>
    );
  }
}

export default IntroCarousel;
