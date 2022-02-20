import styles from "./index.module.css";
export default function Spinner() {
  return (
    <div className={styles["lds-spinner"]}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
