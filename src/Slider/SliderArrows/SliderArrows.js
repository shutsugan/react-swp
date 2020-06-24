import React, { memo } from "react";
import PropTypes from "prop-types";

import chevron from "./chevron.svg";

import "./index.css";

const SliderArrows = memo(({ style = {}, visibility }) => {
  const { leftBoundaryInView, rightBoundaryInView } = visibility;

  const leftArrow = (
    <div className={leftBoundaryInView ? "hide-arrow" : "arrow"}>
      <img
        className="arrow-svg svg-left"
        style={style}
        src={chevron}
        alt="Left arrow"
      />
    </div>
  );

  const rightArrow = (
    <div className={rightBoundaryInView ? "hide-arrow" : "arrow"}>
      <img
        className="arrow-svg"
        style={style}
        src={chevron}
        alt="Right arrow"
      />
    </div>
  );

  return (
    <div className="slider-arrows">
      {leftArrow}
      {rightArrow}
    </div>
  );
});

SliderArrows.propTypes = {
  style: PropTypes.object,
  visibility: PropTypes.object.isRequired,
};

export default SliderArrows;
