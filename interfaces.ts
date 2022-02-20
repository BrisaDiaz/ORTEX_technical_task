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
  lastUpdate: number;
}
