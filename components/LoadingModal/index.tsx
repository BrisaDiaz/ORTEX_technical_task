import Spinner from "../Spinner/index";

import styles from "./index.module.css";

export default function LoadingModal({isLoading}: {isLoading: boolean}) {
  return (
    <aside
      aria-busy={isLoading}
      aria-hidden={isLoading}
      aria-label="loading"
      aria-live="assertive"
      className={`${styles.modal} ${isLoading ? styles.openModal : ""}`}
      role="alert"
    >
      <Spinner />
    </aside>
  );
}
