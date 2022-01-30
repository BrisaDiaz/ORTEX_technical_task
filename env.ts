export const env = {
  WEBSOCKET_URL:
    process.env.NODE_ENV === "production"
      ? "wss://stream.tradingeconomics.com/?client=guest:guest"
      : "ws://stream.tradingeconomics.com/?client=guest:guest",
};
