import "../styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export function reportWebVitals(metric: NextWebVitalsMetric) {
  //// report web vitals
}
export default MyApp;
