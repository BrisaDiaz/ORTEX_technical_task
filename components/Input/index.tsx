import styles from "./index.module.css";

export default function Input({
  type,
  placeholder,
  icon,
  register,
  autoFocus,
}: {
  type: "email" | "password" | "text";
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;
  register?: any;
  autoFocus?: boolean;
}) {
  return (
    <div className={`${styles.inputWrapper}`}>
      <small role="alert" className={styles.errorMessage}></small>

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
