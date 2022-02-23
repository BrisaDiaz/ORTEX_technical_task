export interface CurrencyExchangeInfo {
  state: "high" | "down";
  exchange: number;
  percentage: number;
  from: {
    currency: string;
    name: string;
  };
  to: {
    currency: string;
    name: string;
  };
  lastUpdate: string;
}

export interface CurrencyExchangeSubscriptionMessage {
  ask: undefined | number;
  bid: number;
  dhigh: number;
  dlow: number;
  dt: undefined | number;
  i: string;
  nch: number;
  o: number;
  pch: undefined | number;
  prev: number;
  price: undefined | number;
  s: string;
  state: string;
  topic: string;
  type: string;
}
