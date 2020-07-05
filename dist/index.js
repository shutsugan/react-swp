"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SliderArrows = require("./SliderArrows");

var _SliderArrows2 = _interopRequireDefault(_SliderArrows);

var _useOnScreen = require("./utils/useOnScreen");

var _useOnScreen2 = _interopRequireDefault(_useOnScreen);

var _useWindowSize = require("./utils/useWindowSize");

var _useWindowSize2 = _interopRequireDefault(_useWindowSize);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Slider = (0, _react.memo)(function (_ref) {
  var slideBy = _ref.slideBy,
      arrows = _ref.arrows,
      arrowsStyle = _ref.arrowsStyle,
      children = _ref.children;

  var slider = (0, _react.useRef)(null);
  var leftBoundary = (0, _react.useRef)(null);
  var rightBoundary = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      touchStatus = _useState2[0],
      setTouchStatus = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      startX = _useState4[0],
      setStartX = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      startOffset = _useState6[0],
      setStartOffset = _useState6[1];

  var _useState7 = (0, _react.useState)(0),
      _useState8 = _slicedToArray(_useState7, 2),
      offset = _useState8[0],
      setOffset = _useState8[1];

  var _useState9 = (0, _react.useState)(0),
      _useState10 = _slicedToArray(_useState9, 2),
      delta = _useState10[0],
      setDelta = _useState10[1];

  var _useState11 = (0, _react.useState)(0),
      _useState12 = _slicedToArray(_useState11, 2),
      startSwipe = _useState12[0],
      setStartSwipe = _useState12[1];

  var _useState13 = (0, _react.useState)(0),
      _useState14 = _slicedToArray(_useState13, 2),
      slideAmount = _useState14[0],
      setSlideAmount = _useState14[1];

  var resetState = function resetState() {
    setTouchStatus(0);
    setStartX(0);
    setDelta(0);
    setStartOffset(0);
    setStartSwipe(0);
  };

  var handleStart = function handleStart(event) {
    if (touchStatus !== 0) return;

    var clientX = event.clientX || event.touches[0].clientX;

    setStartX(clientX);
    setTouchStatus(1);
    setStartSwipe(performance.now());
  };

  var handleMove = function handleMove(event) {
    if (!event.touches) event.preventDefault();

    var clientX = event.clientX || event.touches[0].clientX;
    var currentDelta = clientX - startX;

    setDelta(currentDelta);

    if (touchStatus === 1 && currentDelta) {
      setTouchStatus(2);
      setStartOffset(offset);
    }

    if (touchStatus === 2) moveTo(startOffset + currentDelta);
  };

  var handleTouchEnd = function handleTouchEnd() {
    if (touchStatus !== 2) return;

    swipe();
    resetState();
    checkOffsetBoundaries();
  };

  var swipe = function swipe() {
    var endSwipe = performance.now();
    var swipeTimeDiff = Math.round(endSwipe - startSwipe);
    var swipeTime = 500;

    if (swipeTimeDiff < swipeTime) slideEnd();
  };

  var moveTo = function moveTo() {
    var pixelOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    setOffset(pixelOffset);
    slider.current.scrollLeft = -pixelOffset;
  };

  var slideTo = function slideTo() {
    var pixelOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    slider.current.scrollTo({
      left: pixelOffset,
      behavior: "smooth"
    });
  };

  var slideEnd = function slideEnd() {
    if (startOffset > offset) slideRight(slideAmount);else slideLeft(slideAmount);
  };

  var setOffsetAfterSlide = function setOffsetAfterSlide(absOffset, currentOffset) {
    slideTo(absOffset);
    setOffset(currentOffset);
  };

  var slideRight = function slideRight() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var rightOffset = offset - amount - delta;
    var absRightOffset = Math.abs(rightOffset);

    setOffsetAfterSlide(absRightOffset, rightOffset);
  };

  var slideLeft = function slideLeft() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var leftOffset = offset + amount - delta;
    var limitLeftOffset = Math.abs(leftOffset > 0 ? 0 : leftOffset);

    setOffsetAfterSlide(limitLeftOffset, leftOffset);
  };

  var checkOffsetBoundaries = function checkOffsetBoundaries() {
    var sliderOffset = slider.current.scrollLeft;
    var absRoundedOffset = Math.floor(Math.abs(offset));
    var absRoundedSliderOffset = Math.floor(Math.abs(sliderOffset));

    if (absRoundedOffset > absRoundedSliderOffset) setOffset(-sliderOffset);
    if (offset > 0) setOffset(0);
  };

  var leftBoundaryInView = (0, _useOnScreen2.default)(leftBoundary);
  var rightBoundaryInView = (0, _useOnScreen2.default)(rightBoundary);
  var windowSize = (0, _useWindowSize2.default)();

  var handleArrowSlide = { setOffsetAfterSlide: setOffsetAfterSlide, slideAmount: slideAmount, offset: offset };
  var arrowVisibility = { leftBoundaryInView: leftBoundaryInView, rightBoundaryInView: rightBoundaryInView };

  (0, _react.useEffect)(function () {
    var slidingAmount = slideBy ? slideBy : slider.current.clientWidth;
    setSlideAmount(slidingAmount);
  }, [slideBy, windowSize]);

  return _react2.default.createElement(
    "div",
    { ref: slider, className: "slider" },
    _react2.default.createElement(
      "div",
      {
        className: "slider-belt",
        onTouchStart: handleStart,
        onTouchMove: handleMove,
        onTouchEnd: handleTouchEnd,
        onMouseDown: handleStart,
        onMouseMove: handleMove,
        onMouseUp: handleTouchEnd
      },
      _react2.default.createElement("div", { ref: leftBoundary }),
      children,
      _react2.default.createElement("div", { ref: rightBoundary, className: "slider-right-boundary" }),
      arrows && _react2.default.createElement(_SliderArrows2.default, {
        style: arrowsStyle,
        handleSlide: handleArrowSlide,
        visibility: arrowVisibility
      })
    )
  );
});

Slider.propTypes = {
  slideBy: _propTypes2.default.number,
  arrows: _propTypes2.default.bool,
  arrowsStyle: _propTypes2.default.object,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node])
};

exports.default = Slider;