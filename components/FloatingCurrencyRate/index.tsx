import React, { useEffect } from "react";
import styles from "./index.module.css";
import Image from "next/image";
interface CurrencyRateData {
  state: "high" | "down";
  exange: number;
  popchain: number;
  from: {
    currency: string;
    flag_src: string;
  };
  to: {
    currency: string;
    flag_src: string;
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
  /// avoid client and server current date confict be waiting until code is running on the client side
  if (!currentDate) return <div />;
  if (!currentData)
    return (
      <article className={styles.floatingBox}>
        <section>
          <div className={styles.flag}>
            <Image layout="fill" src="/flags/EUR.png" alt="EUR" />
          </div>
          <div className={styles.flag}>
            <Image layout="fill" src="/flags/USD.png" alt="USD" />
          </div>
        </section>
        <section>
          <small>{new Date(currentDate).toLocaleString()}</small>
          <div className={styles.percentageChange}>
            <div className={styles.stateIcon}></div>
            <p className={"primary"} style={{ fontSize: "14px" }}>
              Loading...
            </p>
          </div>

          <p>Loading... </p>
        </section>
      </article>
    );

  return (
    <article
      className={`${styles.floatingBox} ${
        currentData.state === "down" ? styles.down : ""
      }`}
    >
      <section>
        <div className={styles.flag}>
          <Image
            layout="fill"
            src={currentData?.from?.flag_src}
            alt={currentData?.to?.currency}
          />
        </div>
        <div className={styles.flag}>
          <Image
            layout="fill"
            src={currentData?.to?.flag_src}
            alt={currentData?.to?.currency}
          />
        </div>
      </section>
      <section>
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
            {currentData?.popchain}
          </p>
        </div>

        <p>{`1 ${data?.from?.currency} = ${data?.exange} ${data?.to?.currency}`}</p>
      </section>
    </article>
  );
}
