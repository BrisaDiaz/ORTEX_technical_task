import styles from "./index.module.css";
export default function Button({text, className}: {text: string; className?: any}) {
  return <button className={`${styles.button} ${className || ""}`}>{text}</button>;
}
