export default function simulateDatabaseConsult(
  task: () => void,
  milliseconds?: number
) {
  setTimeout(() => {
    return task();
  }, milliseconds || 5000);
}
