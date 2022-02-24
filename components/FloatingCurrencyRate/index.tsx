import React from "react";
import Image from "next/image";

import { CurrencyExchangeInfo } from "interfaces";

import styles from "./index.module.css";

export default function FloatingCurrencyRate({
  data,
}: {
  data: CurrencyExchangeInfo | null;
}) {
  /// in case the data couldn't be retrieved a the component won't be shown
  if (!data) return <></>;

  /// component when the data has been retrieved successfully
  return (
    <article
      arial-label={`${data?.from?.name} to ${data?.to?.name} currency exchange value`}
      className={`${styles["currency-box"]} ${
        data.state === "down" ? styles.down : ""
      }`}
    >
      <time className={styles["currency-box__time"]}>{data?.lastUpdate}</time>
      <div className={styles["currency-box__percentage-section"]}>
        <div className={styles["currency-box__icon"]}>
          <Image
            alt={data?.state}
            aria-hidden={true}
            layout="fill"
            src={data.state === "high" ? "/icons/high.svg" : "/icons/down.svg"}
          />
        </div>
        <p className={styles["currency-box__percentage"]}>
          {data?.percentage}%
        </p>
      </div>

      <p
        aria-label={`1 ${data?.from?.name} equals ${data?.exchange}  ${data?.to?.name} `}
        title={`1 ${data?.from?.name} equals ${data?.exchange}  ${data?.to?.name} `}
      >
        {`1 ${data?.from?.currency}`}
        <b className={styles["currency-box__equal"]}>=</b>
        <span className={data.state === "high" ? "primary" : "secondary"}>
          {`${data?.exchange} ${data?.to?.currency}`}
        </span>
      </p>
    </article>
  );
}
