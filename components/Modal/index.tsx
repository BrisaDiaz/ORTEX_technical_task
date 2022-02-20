import styles from "./index.module.css";
import React from "react";
import useModalFocus from "@/hooks/useModalFocus";
import Image from "next/image";

export default function Modal({
  onClose,
  isOpen,
  children,
  role,
}: {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  role?: string;
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
      aria-hidden={isOpen}
      ref={modalRef}
      tabIndex={tabIndex}
      className={`${styles.modal} ${isOpen ? styles.openModal : ""}`}
      onClick={() => handleModalInteraction()}
    >
      <article
        className={styles.contentWrapper}
        onMouseEnter={() => setisInteracting(true)}
        onTouchStart={() => setisInteracting(true)}
        onMouseLeave={() => setisInteracting(false)}
        role={role || "dialog"}
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
