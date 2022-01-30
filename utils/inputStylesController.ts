export default function inputStylesController(
  input: HTMLInputElement,
  errors: string[]
) {
  const isDirty = errors.length;
  const parentComponet = input.parentNode;
  const alert = parentComponet?.querySelector(
    '[role="alert"]'
  ) as HTMLParagraphElement;
  if (!alert || !input || !parentComponet) return;

  if (isDirty) {
    alert.textContent = errors[errors.length - 1];
    alert.style.display = "block";
    input.style.border = "2px solid var(--var--secondary)";
  } else {
    alert.textContent = "";
    alert.style.display = "none";
    input.style.border = "2px solid var(--var--primary)";
  }
}
