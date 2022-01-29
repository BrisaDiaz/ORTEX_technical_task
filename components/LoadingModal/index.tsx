import styles from "./index.module.css";
import Spinner from "../Spinner/index";

export default function LoadingModal({ isLoading }: { isLoading: boolean }) {
  return (
    <aside className={`${styles.modal} ${isLoading ? styles.openModal : ""}`}>
      <Spinner />
    </aside>
  );
}
