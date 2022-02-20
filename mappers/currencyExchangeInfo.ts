import getCurrencyName from "@/utils/getCurrencyName";
import { SocketCurrencyExchangeResponse } from "interfaces";

const mapCurrencyExchange = (data: SocketCurrencyExchangeResponse) => {
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
export default mapCurrencyExchange;
