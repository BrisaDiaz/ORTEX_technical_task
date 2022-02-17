import React from "react";
import styles from "./index.module.css";

function Input({
  type,
  placeholder,
  icon,
  register,
  autoFocus,
  errors,
}: {
  type: "email" | "password" | "text";
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;
  register?: any;
  autoFocus?: boolean;
  errors?: string[];
}) {
  return (
    <div
      className={`${styles.inputWrapper} ${
        errors?.length ? styles.withError : ""
      }`}
    >
      <small role="alert" className={styles.errorMessage}>
        {errors && errors?.length ? errors[errors?.length - 1] : ""}
      </small>
      <div className={styles.inputIcon}>{icon}</div>
      <input
        autoFocus={autoFocus || false}
        type={type}
        {...register}
        placeholder={placeholder}
        onSubmit={(e) => console.log(e)}
      />
    </div>
  );
}
export default React.memo(Input);
