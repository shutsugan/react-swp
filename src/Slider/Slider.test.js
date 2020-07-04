import React from "react";
import { render } from "@testing-library/react";
import Slider from "./Slider";

global.IntersectionObserver = jest.fn(function () {
  this.observe = jest.fn();
  this.unobserve = jest.fn();
  this.disconnect = jest.fn();
});

test("renders learn react link", () => {
  const { getByText } = render(
    <Slider>
      <div>1</div>
    </Slider>
  );
  const element = getByText(/1/i);

  expect(element).toBeInTheDocument();
});
