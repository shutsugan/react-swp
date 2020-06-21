import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./index.css";

const Slider = ({ slideBy, children }) => {
  const slider = useRef(null);
  const belt = useRef(null);

  const [touchStatus, setTouchStatus] = useState(0);
  const [startX, setStartX] = useState(0);
  const [delta, setDelta] = useState(0);
  const [startOffset, setStartOffset] = useState(0);
  const [offset, setOffset] = useState(0);

  const resetState = () => {
    setTouchStatus(0);
    setStartX(0);
    setDelta(0);
    setStartOffset(0);
  };

  const handleStart = (event) => {
    if (touchStatus !== 0) return;

    const clientX = event.clientX || event.touches[0].clientX;

    setStartX(clientX);
    setTouchStatus(1);
  };

  const handleMove = (event) => {
    if (!event.touches) event.preventDefault();

    const clientX = event.clientX || event.touches[0].clientX;
    const currentDelta = clientX - startX;

    setDelta(currentDelta);

    if (touchStatus === 1 && currentDelta) {
      setTouchStatus(2);
      setStartOffset(offset);
    }

    if (touchStatus === 2) moveTo(startOffset + currentDelta);
  };

  const handleTouchEnd = () => {
    if (touchStatus !== 2) return;

    slideEnd();
    resetState();
    checkOffsetBoundaries();
  };

  const handleSlideEnd = () => {
    resetState();
    checkOffsetBoundaries();
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
    const slideAmount = slideBy ? slideBy : slider.current.clientWidth;

    if (startOffset > offset) slideRight(slideAmount);
    else slideLeft(slideAmount);
  };

  const setOffsetAfterSlide = (absOffset, offset) => {
    slideTo(absOffset);
    setOffset(offset);
  };

  const slideRight = (slideAmount = 0) => {
    const rightOffset = offset - slideAmount - delta;
    const absRightOffset = Math.abs(rightOffset);

    setOffsetAfterSlide(absRightOffset, rightOffset);
  };

  const slideLeft = (slideAmount = 0) => {
    const leftOffset = offset + slideAmount - delta;
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

  useEffect(() => {}, []);

  return (
    <div ref={slider} className="slider">
      <div
        ref={belt}
        className="slider-belt"
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleSlideEnd}
      >
        {children}
      </div>
    </div>
  );
};

Slider.propTypes = {
  slideBy: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Slider;
