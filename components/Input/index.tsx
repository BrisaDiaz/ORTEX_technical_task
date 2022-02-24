import React from "react";

import styles from "./index.module.css";

function Input({
  icon,
  alertProps,
  errors,
  inputProps,
}: {
  icon: React.ReactNode;

  errors?: string[];
  alertProps: {[key: string]: any};
  inputProps: {
    [key: string]: any;
  };
}) {
  return (
    <div className={styles["input-container"]}>
      <small
        className={`${styles["input-container__message"]} ${
          errors?.length ? styles["input-container__message--visible"] : ""
        }`}
        role="alert"
        {...alertProps}
      >
        {errors && errors?.length ? errors[errors?.length - 1] : ""}
      </small>
      <div className={styles["input-container__icon-container"]}>{icon}</div>
      <input
        className={`${styles["input-container__input"]} ${
          errors?.length ? styles["input-container__input--invalid"] : ""
        }`}
        {...inputProps}
        onSubmit={(e) => console.log(e)}
      />
    </div>
  );
}
export default React.memo(Input);
