"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _chevron = require("./chevron.svg");

var _chevron2 = _interopRequireDefault(_chevron);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SliderArrows = (0, _react.memo)(function (_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      visibility = _ref.visibility,
      handleSlide = _ref.handleSlide;
  var leftBoundaryInView = visibility.leftBoundaryInView,
      rightBoundaryInView = visibility.rightBoundaryInView;
  var setOffsetAfterSlide = handleSlide.setOffsetAfterSlide,
      slideAmount = handleSlide.slideAmount,
      offset = handleSlide.offset;


  var handleSlideLeft = function handleSlideLeft() {
    var leftOffset = offset + slideAmount;
    var limitLeftOffset = Math.abs(leftOffset > 0 ? 0 : leftOffset);

    setOffsetAfterSlide(limitLeftOffset, leftOffset);
  };

  var handleSlideRight = function handleSlideRight() {
    var rightOffset = offset - slideAmount;
    var absRightOffset = Math.abs(rightOffset);

    setOffsetAfterSlide(absRightOffset, rightOffset);
  };

  var stopMouseDown = function stopMouseDown(event) {
    return event.stopPropagation();
  };

  var leftArrow = _react2.default.createElement(
    "div",
    {
      className: leftBoundaryInView ? "hide-arrow" : "arrow",
      onClick: handleSlideLeft,
      onMouseDown: stopMouseDown
    },
    _react2.default.createElement("img", {
      className: "arrow-svg svg-left",
      style: style,
      src: _chevron2.default,
      alt: "Left arrow"
    })
  );

  var rightArrow = _react2.default.createElement(
    "div",
    {
      className: rightBoundaryInView ? "hide-arrow" : "arrow",
      onClick: handleSlideRight,
      onMouseDown: stopMouseDown
    },
    _react2.default.createElement("img", {
      className: "arrow-svg",
      style: style,
      src: _chevron2.default,
      alt: "Right arrow"
    })
  );

  return _react2.default.createElement(
    "div",
    { className: "slider-arrows" },
    leftArrow,
    rightArrow
  );
});

SliderArrows.propTypes = {
  style: _propTypes2.default.object,
  visibility: _propTypes2.default.object.isRequired,
  handleSlide: _propTypes2.default.object.isRequired
};

exports.default = SliderArrows;