import React from "react";
import Image from "next/image";

import styles from "./index.module.css";

import {CurrencyExchangeInfo} from "interfaces";

export default function FloatingCurrencyRate({data}: {data: CurrencyExchangeInfo | null}) {
  const [currentDate, setCurrentDate] = React.useState(0);
  const [currentData, setCurrentData] = React.useState(data);
  React.useEffect(() => {
    const dateInterval = setInterval(() => {
      setCurrentDate(Date.now());
    }, 1000);
    return () => {
      clearInterval(dateInterval);
    };
  }, []);
  React.useEffect(() => {
    setCurrentData(data);
  }, [data]);
  /// avoid client and server current date conflict be waiting until code is running on the client side
  if (!currentDate) return <div />;

  /// in case the data couldn't be retrieved a the component won't be shown
  if (!currentData) return <></>;
  /// component when the data has been retrieved successfully
  return (
    <article
      arial-label={`${data?.from?.name} to ${data?.to?.name} currency exchange value`}
      className={`${styles.floatingBox} ${currentData.state === "down" ? styles.down : ""}`}
    >
      <time>{new Date(currentData?.lastUpdate).toLocaleString()}</time>
      <div className={styles.percentageChange}>
        <div className={styles.stateIcon}>
          <Image
            alt={currentData?.state}
            aria-hidden={true}
            layout="fill"
            src={currentData.state === "high" ? "/icons/high.svg" : "/icons/down.svg"}
          />
        </div>
        <p>{currentData?.percentage}%</p>
      </div>

      <p
        aria-label={`1 ${data?.from?.name} equals ${data?.exchange}  ${data?.to?.name} `}
        title={`1 ${data?.from?.name} equals ${data?.exchange}  ${data?.to?.name} `}
      >
        {`1 ${data?.from?.currency}`}
        <b>=</b>
        <span className={currentData.state === "high" ? "primary" : "secondary"}>
          {`${data?.exchange} ${data?.to?.currency}`}
        </span>
      </p>
    </article>
  );
}
