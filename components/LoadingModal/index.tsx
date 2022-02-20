import styles from "./index.module.css";
import Spinner from "../Spinner/index";

export default function LoadingModal({ isLoading }: { isLoading: boolean }) {
  return (
    <aside
      role="alert"
      aria-hidden={isLoading}
      aria-live="assertive"
      aria-label="loading"
      aria-busy={isLoading}
      className={`${styles.modal} ${isLoading ? styles.openModal : ""}`}
    >
      <Spinner />
    </aside>
  );
}
