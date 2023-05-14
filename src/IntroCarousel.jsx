import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./IntroCarousel.scss";

const infoList = [
  {
    title: "Intro img",
    content: "",
    img: "./assets/welcome.png",
  },
  {
    title: `Teeth are similar to trees, but serves as archives of our life.`,
    content: `Supported by a studyfrom Dr. Paola Cerrito and fellow researcher from New York University School of Anthropology in 2021.`,
    img: "./assets/teeth_image.png",
  },
  {
    title: `Let’s build this teeth with our past experiences.`,
    content: ``,
    img: "",
  },
  {
    title: `Think about one experience in your memory.`,
    content: `Share impactful memories, as your teeth discreetly preserve them. `,
    img: "./assets/tooth_p3.png",
  },
  // {
  //   title: "Do you know?",
  //   content: `<p>Did you know that your teeth are a repository of your personal history? For this project, we collaborated with Dr. Paola Cerrito to explore her research on the evolutionary history of the genus Homo and menopause.</p> <br>
  //     <p>Dr. Cerrito's research demonstrates that by examining the layers in teeth, or "tooth rings," we can uncover evidence of an individual's medical history, biological history, and significant personal events. We began by integrating the fundamental concepts of her research, which propose that layering is a natural occurrence in many living organisms, revealing insights into their history through the accumulation of layers over time.</p>`,
  //   img: "./assets/intro_1.png",
  // },
  // {
  //   title: "Meet the teeth",
  //   content:
  //     "<p>In front of you is an interactive teeth that will be constructed from the stories of all of us!Considering a significant or memorable event in your life that you would like to share, and you can document it here to preserve your personal history permanently. Additionally, you are welcome to read the stories that others have shared. This is a collective project that belongs to all of us, and we are excited for you to contribute your story.</p>",
  //   img: "./assets/intro_2.png",
  // },
  // {
  //   title: "To archive your experience",
  //   content:
  //     "<p>Consider a memorable experience that significantly impacted you, whether it was a joyful or a painful memory. You can use the iPad to record the story you want to tell and preserve it on the tooth. Finally, choose an emotion that reflects the sentiment of your story, and a layer will be added to the tooth once you have finished. Please select your feelings based on the drawing or text you have created. </p>",
  //   img: "./assets/archive_story.png",
  // },
  // {
  //   title: "Read others experiences",
  //   content:
  //     "<p>Step closer, choose a layer to  read stories from other people. </p>",
  //   img: "./assets/icon_read.png",
  // },
  // {
  //   title: "Now, choose your preferred action.",
  //   content:
  //     "<p>You can choose to either archive your experience or read others stories.</p>",
  //   img: "./assets/HumanMolar.png",
  // },
];

class IntroCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  render() {
    return (
      <Carousel
        showThumbs={false}
        showArrows={true}
        emulateTouch={true}
        showStatus={false}
        width={"90vw"}
      >
        {infoList.map((item, index) => {
          if (index === 0) {
            return (
              <div key={index} id="bg-info" className="my-8 poster-holder">
                <img id="poster" src={item.img} alt="" srcSet="" />
              </div>
            );
          } else {
          // else if (index < infoList.length - 1) {
            return (
              <div key={index} id="bg-info" className="my-8 container flex flex-col justify-center align-center">
                <div className="container flex flex-col justify-center items-start">
                  <h1 className="my-4 text-2xl font-bold">{item.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
                <div className="img-holder flex flex-col justify-center items-center">
                  <img src={item.img} alt="" srcSet="" />
                </div>
                {index === infoList.length - 1 ? <button style={{width: 'fit-content', alignSelf: 'center'}} className="mt-8" onClick={() => (window.location.href = "/draw")}>Continue</button>: <div></div>}
                
              </div>
            );
          } 
          // else {
          //   return (
          //     <div key={index} id="bg-info" className="my-8">
          //       {/* <div className="img-holder flex flex-col justify-center items-center">
          //         <img src={item.img} alt="" srcSet="" />
          //       </div> */}

          //       <div className="flex flex-col justify-center items-start">
          //         <h1 className="my-4 text-2xl font-bold">{item.title}</h1>
          //         <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
          //       </div>
          //       <div className="cards flex flex-row justify-center items-center">
          //         <Link to="/draw" className="my-8 mx-2 flex-1">
          //           <div
          //             className="archive-exp m-4 p-4"
          //             onClick={this.props.updateStep(1)}
          //           >
          //             <div className="img-holder flex flex-col justify-center items-center">
          //               <img src="./assets/archive_story.png" alt="" srcSet="" />
          //             </div>
          //             <h3>Archive My Experience</h3>
          //             <div className="cards-desc flex flex-row items-end">
          //               <span>
          //                 Share your experience with teeth, let’s build one
          //                 teeth together.
          //               </span>
          //               <img
          //                 className="cta"
          //                 src="./assets/Enter_Right.svg"
          //                 alt=""
          //               />
          //             </div>
          //           </div>
          //         </Link>
          //         <Link className="my-8 mx-2 flex-1">
          //           <div
          //             className="read-others m-4 p-4"
          //             onClick={() => (window.location.href = "/result?type=read")}
          //           >
          //             <div className="img-holder flex flex-col justify-center items-center">
          //               <img src="./assets/icon_read.png" alt="" srcSet="" />
          //             </div>
          //             <h3>Read Others</h3>
          //             <div className="cards-desc flex flex-row items-end">
          //               <span>
          //                 Read story of others that shared with teeth.
          //               </span>
          //               <img
          //                 className="cta"
          //                 src="./assets/Enter_Right.svg"
          //                 alt=""
          //               />
          //             </div>
          //           </div>
          //         </Link>
          //       </div>
          //     </div>
          //   );
          // }
        })}
      </Carousel>
    );
  }
}

export default IntroCarousel;
