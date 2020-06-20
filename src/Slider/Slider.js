import React, { useRef, useState, useEffect } from "react";

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

  const handleTouchStart = (event) => {
    if (touchStatus !== 0) return;

    const pageX = event.pageX || event.touches[0].pageX;

    setStartX(pageX);
    setTouchStatus(1);
  };

  const handleTouchMove = (event) => {
    if (!event.touches) event.preventDefault();

    const pageX = event.pageX || event.touches[0].pageX;
    setDelta(pageX - startX);

    if (touchStatus === 1 && delta) {
      setTouchStatus(2);
      setStartOffset(offset);
    }

    if (touchStatus === 2) moveTo(startOffset + delta);
  };

  const handleTouchEnd = () => {
    if (touchStatus !== 2) return;

    slideEnd();
    resetState();
    checkBoundaries();
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

    if (startOffset > offset) {
      const rightOffset = Math.round(offset - slideAmount - delta);

      slideTo(Math.abs(rightOffset));
      setOffset(rightOffset);
    } else {
      const leftOffset = Math.floor(offset + slideAmount - delta);

      slideTo(Math.abs(leftOffset > 0 ? 0 : leftOffset));
      setOffset(leftOffset);
    }
  };

  const checkBoundaries = () => {
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default Slider;
