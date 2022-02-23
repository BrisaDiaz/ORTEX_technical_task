/**
 * @jest-environment jsdom
 */
import { expect } from "@jest/globals";
import mapCurrencyExchange from "./mapCurrencyExchange";

describe("should return the correct format when needed data is provided ", () => {
  it("return low state when exchange rate has decrease", () => {
    const message = {
      ask: 1.13072,
      bid: 1.13072,
      dhigh: 1.13857,
      dlow: 1.13069,
      dt: 1645484223115,
      i: "EURUSD",
      nch: -0.00183,
      o: 1.13334,
      pch: -0.16,
      prev: 1.13255,
      price: 1.13072,
      s: "EURUSD:CUR",
      state: "open",
      topic: "EURUSD",
      type: "currency",
    };
    const expectResult = {
      state: "down",
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
    expect(mapCurrencyExchange(message)).toEqual(expectResult);
  });
  it("return hight state when exchange rate has increase", () => {
    const message = {
      s: "EURUSD:CUR",
      i: "EURUSD",
      pch: 0.04,
      nch: 0.00041,
      bid: 1.13334,
      ask: 1.13334,
      price: 1.13334,
      dt: 1645577544741,
      state: "open",
      type: "currency",
      dhigh: 1.13464,
      dlow: 1.13288,
      o: 1.13464,
      prev: 1.13293,
      topic: "EURUSD",
    };
    const expectResult = {
      state: "high",
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
    expect(mapCurrencyExchange(message)).toEqual(expectResult);
  });
});
it("should return null when provided data is uncompleted", () => {
  const message = {
    ask: 1.13072,
    bid: 1.13072,
    dhigh: 1.13857,
    dlow: 1.13069,
    dt: 1645484223115,
    i: "EURUSD",
    nch: -0.00183,
    o: 1.13334,
    pch: undefined,
    prev: 1.13255,
    price: undefined,
    s: "EURUSD:CUR",
    state: "open",
    topic: "EURUSD",
    type: "currency",
  };
  const expectResult = null;

  expect(mapCurrencyExchange(message)).toEqual(expectResult);
});
