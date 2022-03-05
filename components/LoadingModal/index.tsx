import Spinner from "../Spinner/index";

export default function LoadingModal({isLoading}: {isLoading: boolean}) {
  return (
    <aside
      aria-busy={isLoading}
      aria-hidden={!isLoading}
      aria-label="loading"
      aria-live="assertive"
      className={`loading-modal ${isLoading ? "loading-modal--open" : ""}`}
      role="alert"
    >
      <Spinner />
      <style>{`
.loading-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.75);
  transform: scale(0);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.loading-modal--open {
  transform: scale(1);
  opacity: 1;
}
`}</style>
    </aside>
  );
}
