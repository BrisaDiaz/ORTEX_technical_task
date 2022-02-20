import getCurrencyName from "@/utils/getCurrencyName";
type Data = {
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
  price: number;
  s: string;
  state: string;
  topic: string;
  type: string;
};

export const formatCurrencyRate = (data: Data) => {
  if (!data.pch || !data.price || !data.dt) return null;

  const from = data.topic.slice(0, 3);
  const to = data.topic.slice(3);

  return {
    state: data?.pch >= 0 ? ("high" as const) : ("down" as const),
    exchange: data.price,
    percentage: data.pch,
    from: {
      currency: from,
      name: getCurrencyName(from),
    },
    to: {
      currency: getCurrencyName(to),
    },
    lastUpdate: data.dt,
  };
};
