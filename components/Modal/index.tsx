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
  const modalRef = React.useRef(null) as
    | React.LegacyRef<HTMLElement>
    | undefined;
  const handleModalInteraction = () => {
    if (isInteracting) return;
    onClose();
  };
  const { tabIndex } = useModalFocus({
    isOpen,
    onEscape: onClose,
    ref: modalRef,
  });
  return (
    <aside
      ref={modalRef}
      tabIndex={tabIndex}
      role="dialog"
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
