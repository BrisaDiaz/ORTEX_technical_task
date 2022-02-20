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
  alertProps: { [key: string]: any };
  inputProps: {
    [key: string]: any;
  };
}) {
  return (
    <div
      className={`${styles.inputWrapper} ${
        errors?.length ? styles.withError : ""
      }`}
    >
      <small className={styles.errorMessage} role="alert" {...alertProps}>
        {errors && errors?.length ? errors[errors?.length - 1] : ""}
      </small>
      <div className={styles.inputIcon}>{icon}</div>
      <input {...inputProps} onSubmit={(e) => console.log(e)} />
    </div>
  );
}
export default React.memo(Input);
