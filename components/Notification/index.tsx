import Modal from "../Dialog";

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
    <Modal AriaLabel="notification" isOpen={isOpen} role="alert" onClose={onClose}>
      <div className="notification" test-id="notification">
        <h2 className={"notification__title"}>{title}</h2>
        {message && <p>{message}</p>}
      </div>
      <style>{`
      .notification {
  text-align: center;

  width: 100%;
  padding: 20px;
}
.notification__title {
  margin-top: 0;
}
@media (min-width: 700px) {
  .notification {
    text-align: center;
    max-width: 500px;
    padding: 30px;
  }
}
`}</style>
    </Modal>
  );
}
