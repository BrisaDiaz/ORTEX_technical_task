type MarketPlaceSubscription =
  | {
      ask: number;
      bid: number;
      dhigh: number;
      dlow: number;
      dt: number;
      i: string;
      nch: number;
      o: number;
      pch: number;
      prev: number;
      price: number;
      s: string;
      state: string;
      topic: string;
      type: string;
    }
  | {
      ask: undefined;
      bid: number;
      dhigh: number;
      dlow: number;
      dt: undefined;
      i: string;
      nch: number;
      o: number;
      pch: undefined;
      prev: number;
      price: number;
      s: string;
      state: string;
      topic: string;
      type: string;
    };

export const formatCurrencyRate = (data: MarketPlaceSubscription) => {
  if (!data.pch || !data.price || !data.dt) return null;
  const from = data.topic.slice(0, 3);
  const to = data.topic.slice(3);

  return {
    state: data?.pch >= 0 ? ("high" as const) : ("down" as const),
    exchange: data.price,
    percentage: data.pch,
    from: {
      currency: from,
    },
    to: {
      currency: to,
    },
    lastUpdate: data.dt,
  };
};
