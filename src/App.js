import React from "react";

import Slider from "./Slider";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Slider arrows={true}>
        <div className="slider-item">1</div>
        <div className="slider-item">2</div>
        <div className="slider-item">3</div>
        <div className="slider-item">4</div>
        <div className="slider-item">5</div>
        <div className="slider-item">6</div>
      </Slider>
    </div>
  );
};

export default App;
