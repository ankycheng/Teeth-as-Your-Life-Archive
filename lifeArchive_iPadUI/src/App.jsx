//https://github.com/leandrowd/react-responsive-carousel

import { useState } from "react";
// import HumanMolar from './assets/HumanMolar.png';
import './App.scss'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container flex flex-col	justify-center items-center">
        <div id="bg-info">
        </div>
        <h1 className="my-4 text-4xl font-bold">Background information</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </>
  );
}

export default App;
