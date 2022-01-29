import styles from "./index.module.css";
import React, { ChangeEvent, forwardRef, useState } from "react";
export default function Input({
  type,
  name,
  placeholder,
  icon,
  required,
  onChange,
}: {
  type: "email" | "password" | "text";
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    setValue(e.target.value);
  };

  return (
    <div className={`${styles.inputWrapper}`}>
      <small role="alert" className={styles.errorMessage}></small>

      <div className={styles.inputIcone}>{icon}</div>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        required={required || false}
      />
    </div>
  );
}
