import React from "react";

import XIcon from "../SVG/X";
import useModalFocus from "../../hooks/useModalFocus";

export default function Modal({
  onClose,
  isOpen,
  children,
  role,
  fullScreen,
  AriaLabel,
}: {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  role?: string;
  fullScreen?: boolean;
  AriaLabel: string;
}) {
  const [isInteracting, setisInteracting] = React.useState<boolean>(false);
  const dialogRef: React.LegacyRef<HTMLDivElement> | undefined = React.useRef(null);
  const handleModalInteraction = () => {
    if (isInteracting) return;
    onClose();
  };
  const {tabIndex} = useModalFocus({
    isOpen,
    onEscape: onClose,
    ref: dialogRef,
  });

  return (
    <div
      ref={dialogRef}
      aria-hidden={!isOpen}
      aria-label={AriaLabel}
      className={`dialog  ${isOpen ? "" : "dialog--close"}`}
      role={role || "dialog"}
      tabIndex={tabIndex}
      onClick={() => handleModalInteraction()}
    >
      <article
        className={`dialog__inner ${fullScreen ? "" : "dialog--fit-content"}`}
        onMouseEnter={() => setisInteracting(true)}
        onMouseLeave={() => setisInteracting(false)}
        onTouchStart={() => setisInteracting(true)}
      >
        <div className={"dialog__header"}>
          <div className={"dialog__close-btn"}>
            <button aria-label="close" name="close" onClick={onClose} />
            <XIcon />
          </div>
        </div>
        {children}
      </article>
      <style>{`
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  background: transparent;
  opacity: 1;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.dialog--close {
  top: -100%;
  opacity: 0;
}


.dialog__header {
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  background-color: var(--bg-light);
  padding: 20px 15px;
}
.dialog__close-btn {
  position: relative;
  float: right;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: -10px;
  right: -5px;
  transition: all 0.3s ease-in-out;
}
.dialog__close-btn:focus-within,
.dialog__close-btn:hover {
  transform: scale(1.2);
}
.dialog__close-btn button {
  position: absolute;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  z-index: 10;
  cursor: pointer;
  background: transparent;
  border: transparent;
}

.dialog__close-btn button:focus {
  outline-offset: 3px;
  outline-color: var(--secondary-light);
}
.dialog__inner {
  width: 100%;
  height:100%;
  box-shadow: var(--box-shadow);
  position: absolute;
  background: var(--bg);
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.5s ease-in-out;
  border-radius: var(--border-radius);
}
.dialog--fit-content{
    top: 40%;
  right: 50%;
  transform: translate(50%, -50%);
    max-width: max-content;
  height: max-content;
}


      `}</style>
    </div>
  );
}
