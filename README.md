# react-swp

react-swp is a lightweight swiper component for React with zero dependencies.
the component works seamlessly on desktop and mobile apps with touch and swiping.

## Live Demo

Sandbox code [Demo](https://codesandbox.io/s/elegant-fog-ntjjx?file=/src/index.js)

## Example

```shell
$ npm i react-swp
```

```javascript
const Slider = require("react-swp");

//ES2015 modules
import Slider from "react-swp";
```

### Default slider

Use the mouse to move left/right
and by default it will transition by the window size.

```javascript
import React from "react";
import Slider from "react-swp";

const SimpleSlider = () => (
  <Slider>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
    <div>Slide 4</div>
    ....
  </Slider>
);

export default SimpleSlider;
```

### Slider with navigation arrows

Display arrows using the `arrows` prop
and customize the arrows size and looks
by using the `arrowsStyle` and `arrowsIcon` props

> Arrows are not displayed in mobile view

```javascript
import React from "react";
import Slider from "react-swp";

import chevron from "./chevron.svg";

const arrowsStyle = {
  color: "#ddd",
  background: "#000",
};

const sliderWithArrows = () => (
  <Slider arrows arrowsStyle={arrowsStyle} arrowsIcon={chevron}>
    <div>Slide 1</div>
    <div>Slide 2</div>
    ....
  </Slider>
);

export default sliderWithArrows;
```

### Slider with customize moving size

Pass a specific pixel amount to `slideBy` prop to customize
the sliding size

```javascript
import React from "react";
import Slider from "react-swp";

const slideBy = 200;

const sliderWithCustomSlidingSize = () => (
  <Slider slideBy={slideBy}>
    <div>Slide 1</div>
    <div>Slide 2</div>
    ....
  </Slider>
);

export default sliderWithCustomSlidingSize;
```

## Component Props

| prop        | tyep    | value                         | example                                             |
| ----------- | ------- | ----------------------------- | --------------------------------------------------- |
| arrows      | Boolean | displays the arrows if truthy | `arrows={true}`                                     |
| arrowsStyle | Object  | Object of css key values      | `arrowsStyle={{color: "#000", background: "#fff"}}` |
| arrowsIcon  | File    | Image or Svg file             | `arrowsIcon={imported-file}`                        |
| slideBy     | Number  | Amount to move by             | `slideBy={200}`                                     |
