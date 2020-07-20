import React, { useRef, useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

import SliderArrows from "./SliderArrows";
import useOnScreen from "./utils/useOnScreen";
import useWindowSize from "./utils/useWindowSize";

import "./index.css";

const Slider = memo(
  ({ slideBy, arrows, arrowsStyle, arrowsIcon, children }) => {
    const slider = useRef(null);
    const leftBoundary = useRef(null);
    const rightBoundary = useRef(null);

    const [touchStatus, setTouchStatus] = useState(0);
    const [startX, setStartX] = useState(0);
    const [startOffset, setStartOffset] = useState(0);
    const [offset, setOffset] = useState(0);
    const [delta, setDelta] = useState(0);
    const [startSwipe, setStartSwipe] = useState(0);
    const [slideAmount, setSlideAmount] = useState(0);

    const resetState = () => {
      setTouchStatus(0);
      setStartX(0);
      setDelta(0);
      setStartOffset(0);
      setStartSwipe(0);
    };

    const handleStart = (event) => {
      if (touchStatus !== 0) return;

      const clientX = event.clientX || event.touches[0].clientX;

      setStartX(clientX);
      setTouchStatus(1);
      setStartSwipe(performance.now());
    };

    const handleMove = (event) => {
      if (!event.touches) event.preventDefault();

      const clientX = event.clientX || event.touches[0].clientX;
      const currentDelta = clientX - startX;

      if (touchStatus === 1 && currentDelta) {
        setDelta(currentDelta);
        setTouchStatus(2);
        setStartOffset(offset);
      }

      if (touchStatus === 2) moveTo(startOffset + currentDelta);
    };

    const handleTouchEnd = () => {
      if (touchStatus === 2) swipe();

      resetState();
      checkOffsetBoundaries();
    };

    const swipe = () => {
      const endSwipe = performance.now();
      const swipeTimeDiff = Math.round(endSwipe - startSwipe);
      const swipeTime = 500;

      if (swipeTimeDiff < swipeTime) slideEnd();
    };

    const moveTo = (pixelOffset = 0) => {
      setOffset(pixelOffset);
      slider.current.scrollLeft = -pixelOffset;
    };

    const slideTo = (pixelOffset = 0) => {
      slider.current.scrollTo({
        left: pixelOffset,
        behavior: "smooth",
      });
    };

    const slideEnd = () => {
      if (startOffset > offset) slideRight(slideAmount);
      else slideLeft(slideAmount);
    };

    const setOffsetAfterSlide = (absOffset, currentOffset) => {
      slideTo(absOffset);
      setOffset(currentOffset);
    };

    const slideRight = (amount = 0) => {
      const rightOffset = offset - amount - delta;
      const absRightOffset = Math.abs(rightOffset);

      setOffsetAfterSlide(absRightOffset, rightOffset);
    };

    const slideLeft = (amount = 0) => {
      const leftOffset = offset + amount - delta;
      const limitLeftOffset = Math.abs(leftOffset > 0 ? 0 : leftOffset);

      setOffsetAfterSlide(limitLeftOffset, leftOffset);
    };

    const checkOffsetBoundaries = () => {
      const sliderOffset = slider.current.scrollLeft;
      const absRoundedOffset = Math.floor(Math.abs(offset));
      const absRoundedSliderOffset = Math.floor(Math.abs(sliderOffset));

      if (absRoundedOffset > absRoundedSliderOffset) setOffset(-sliderOffset);
      if (offset > 0) setOffset(0);
    };

    const leftBoundaryInView = useOnScreen(leftBoundary);
    const rightBoundaryInView = useOnScreen(rightBoundary);
    const windowSize = useWindowSize();

    const handleArrowSlide = { setOffsetAfterSlide, slideAmount, offset };
    const arrowVisibility = { leftBoundaryInView, rightBoundaryInView };

    useEffect(() => {
      setSlideAmount(slideBy ? slideBy : slider.current.clientWidth);
    }, [slideBy, windowSize]);

    return (
      <div ref={slider} className="slider">
        <div
          className="slider-belt"
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleTouchEnd}
        >
          <div ref={leftBoundary} />
          {children}
          <div ref={rightBoundary} className="slider-right-boundary" />
          {arrows && (
            <SliderArrows
              style={arrowsStyle}
              icon={arrowsIcon}
              handleSlide={handleArrowSlide}
              visibility={arrowVisibility}
            />
          )}
        </div>
      </div>
    );
  }
);

Slider.propTypes = {
  slideBy: PropTypes.number,
  arrows: PropTypes.bool,
  arrowsStyle: PropTypes.object,
  arrowsIcon: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Slider;
