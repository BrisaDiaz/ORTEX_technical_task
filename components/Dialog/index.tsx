import Modal from "../Modal";

import styles from "./index.module.css";
export default function PopNotification({
  title,
  message,
  isOpen,
  onClose,
}: {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  message?: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.content}>
        <h2>{title}</h2>
        {message && <p>{message}</p>}
      </div>
    </Modal>
  );
}
