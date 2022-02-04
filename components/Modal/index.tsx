import styles from "./index.module.css";
import React from "react";
import useModalFocus from "@/hooks/useModalFocus";
import Image from "next/image";

export default function Modal({
  onClose,
  isOpen,
  children,
}: {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}) {
  const [isInteracting, setisInteracting] = React.useState<boolean>(false);

  const handleModalInteraction = () => {
    if (isInteracting) return;
    onClose();
  };
  const { tabIndex } = useModalFocus({
    isOpen,
    onEscape: onClose,
    Selector: '[aria-label="modal"]',
  });
  return (
    <aside
      tabIndex={tabIndex}
      aria-label="modal"
      role="complementary"
      className={`${styles.modal} ${isOpen ? styles.openModal : ""}`}
      onClick={() => handleModalInteraction()}
    >
      <article
        className={styles.contentWrapper}
        onMouseEnter={() => setisInteracting(true)}
        onTouchStart={() => setisInteracting(true)}
        onMouseLeave={() => setisInteracting(false)}
      >
        <div className={styles.modalHeader}>
          <div className={styles.closeBtn}>
            <button onClick={onClose} aria-label="close" />
            <Image
              layout="fill"
              src="/icons/close-x.svg"
              alt=""
              objectFit="contain"
            />
          </div>
        </div>
        {children}
      </article>
    </aside>
  );
}
