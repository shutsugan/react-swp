import React, { memo } from "react";
import PropTypes from "prop-types";

import chevron from "./chevron.svg";

import "./index.css";

const SliderArrows = memo(({ style = {} }) => {
  return (
    <div className="slider-arrows">
      <div className="arrow">
        <img className="arrow-svg svg-left" src={chevron} alt="Left arrow" />
      </div>
      <div className="arrow">
        <img className="arrow-svg" src={chevron} alt="Right arrow" />
      </div>
    </div>
  );
});

SliderArrows.propTypes = {
  style: PropTypes.object,
};

export default SliderArrows;
