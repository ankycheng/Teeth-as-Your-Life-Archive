import IntroCarousel from "./IntroCarousel";
import "./App.scss";

function App() {
  let list = [1, 2, 3];
  return (
    <div id="app" className="flex flex-col justify-center items-center">
      <IntroCarousel></IntroCarousel>
    </div>
  );
  
}

export default App;
