"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var useOnScreen = function useOnScreen(ref) {
  var rootMargin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "0px";

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      intersecting = _useState2[0],
      setIntersecting = _useState2[1];

  (0, _react.useEffect)(function () {
    var observerCallback = function observerCallback(_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          entry = _ref2[0];

      return setIntersecting(entry.isIntersecting);
    };
    var observer = new IntersectionObserver(observerCallback, { rootMargin: rootMargin });

    var current = ref.current;
    current && observer.observe(current);

    return function () {
      observer.unobserve(current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return intersecting;
};

exports.default = useOnScreen;