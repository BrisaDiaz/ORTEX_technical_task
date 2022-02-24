import React from "react";
import Image from "next/image";

import useModalFocus from "@/hooks/useModalFocus";

import styles from "./index.module.css";

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
  const modalRef = React.useRef(null) as React.LegacyRef<HTMLElement> | undefined;
  const handleModalInteraction = () => {
    if (isInteracting) return;
    onClose();
  };
  const {tabIndex} = useModalFocus({
    isOpen,
    onEscape: onClose,
    ref: modalRef,
  });

  return (
    <aside
      ref={modalRef}
      aria-hidden={!isOpen}
      className={`${styles.modal} ${isOpen ? styles["modal--open"] : ""}`}
      role={role || "dialog"}
      tabIndex={tabIndex}
      onClick={() => handleModalInteraction()}
    >
      <article
        className={styles["modal__inner"]}
        onMouseEnter={() => setisInteracting(true)}
        onMouseLeave={() => setisInteracting(false)}
        onTouchStart={() => setisInteracting(true)}
      >
        <div className={styles["modal__header"]}>
          <div className={styles["modal__close-btn"]}>
            <button aria-label="close" name="close" onClick={onClose} />
            <Image alt="" layout="fill" objectFit="contain" src="/icons/close-x.svg" />
          </div>
        </div>
        {children}
      </article>
    </aside>
  );
}
