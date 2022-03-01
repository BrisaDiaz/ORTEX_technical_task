import React from "react";
import {expect} from "@jest/globals";
import {render, screen} from "@testing-library/react";

import Component from "./index";
const secondaryColor = "#ea4a48",
  primaryColor = "#33afaa";

it("render info with secondary color and to bottom triangle if exchange estate is low", () => {
  const data = {
    state: "down" as const,
    exchange: 1.13072,
    percentage: -0.16,
    from: {
      currency: "EUR",
      name: "Euro",
    },
    to: {
      currency: "USD",
      name: "United States Dollar",
    },
    lastUpdate: "21/2/2022 19:57:03",
  };

  render(<Component data={data} />);
  const currencyPrice = screen.getByText("1.13072 USD");

  expect(currencyPrice).toHaveStyle("color:", secondaryColor);
  expect(screen.getByAltText("down"));
});
it("render info with primary color and to top triangle if exchange estate is high", () => {
  const data = {
    state: "high" as const,
    exchange: 1.13334,
    percentage: 0.04,
    from: {
      currency: "EUR",
      name: "Euro",
    },
    to: {
      currency: "USD",
      name: "United States Dollar",
    },
    lastUpdate: "22/2/2022 21:52:24",
  };

  render(<Component data={data} />);
  const currencyPrice = screen.getByText("1.13334 USD");

  expect(currencyPrice).toHaveStyle("color:", primaryColor);
  expect(screen.getByAltText("high"));
});
it("renders anything if no data is provided", () => {
  const data = null;
  const {container} = render(<Component data={data} />);

  expect(container.childNodes.length).toBe(0);
});
