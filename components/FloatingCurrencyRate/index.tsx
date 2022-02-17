import React, { useEffect } from "react";
import styles from "./index.module.css";
import Image from "next/image";
interface CurrencyRateData {
  state: "high" | "down";
  exchange: number;
  percentage: number;
  from: {
    currency: string;
  };
  to: {
    currency: string;
  };
  lastUpdate: number;
}
export default function FloatingCurrencyRate({
  data,
}: {
  data: CurrencyRateData | null;
}) {
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

  /// in case the data couldn't be retrieved a loading state of  the component will be shown
  if (!currentData)
    return (
      <article className={styles.floatingBox}>
        <small>{new Date(currentDate).toLocaleString()}</small>
        <div className={styles.percentageChange}>
          <div className={styles.stateIcon}></div>
          <p className={"primary"} style={{ fontSize: "14px" }}>
            Loading...
          </p>
        </div>

        <p>Loading... </p>
      </article>
    );
  /// component when the data has been retrieved successfully
  return (
    <article
      className={`${styles.floatingBox} ${
        currentData.state === "down" ? styles.down : ""
      }`}
    >
      <small>{new Date(currentData?.lastUpdate).toLocaleString()}</small>
      <div className={styles.percentageChange}>
        <div className={styles.stateIcon}>
          <Image
            layout="fill"
            src={
              currentData.state === "high"
                ? "/icons/high.svg"
                : "/icons/down.svg"
            }
            alt={currentData?.state}
          />
        </div>
        <p className={currentData.state === "high" ? "primary" : "secondary"}>
          {currentData?.percentage}
        </p>
      </div>

      <p>{`1 ${data?.from?.currency} = ${data?.exchange} ${data?.to?.currency}`}</p>
    </article>
  );
}
