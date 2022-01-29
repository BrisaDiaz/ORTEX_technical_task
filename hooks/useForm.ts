import React, { useEffect } from "react";

export default function useForm({
  validations,
}: {
  validations: {
    [key: string]: {
      regexp?: { value: RegExp; message: string };
      required?: string;
    };
  };
}) {
  const [attemptsCount, setAttemtsCount] = React.useState<number>(0);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [componets, setComponets] = React.useState<{
    [key: string]: HTMLInputElement;
  }>({});
  const [formState, setFormState] = React.useState<{
    values: { [key: string]: string };
  }>({
    values: {},
  });

  const register = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      values: { ...formState.values, [e.target.name]: e.target.value },
    });
    setComponets({ ...componets, [e.target.name]: e.target });
  };
  const getValue = (fieldName: string) => {
    if (formState.values && fieldName in formState.values)
      return formState.values[fieldName].trim();
    return false;
  };

  const setError = (fieldName: string, message: string) => {
    if (errors[fieldName] === message) return;

    if (!componets[fieldName]?.parentNode) return;
    const parentComponet = componets[fieldName].parentNode;
    const alert = parentComponet?.querySelector(
      '[role="alert"]'
    ) as HTMLParagraphElement;
    const input = parentComponet?.querySelector("input");
    if (!alert || !input) return;
    alert.textContent = message;
    alert.style.display = "block";
    input.style.border = "2px solid var(--var--secondary)";

    errors[fieldName] = message;
    setErrors(errors);
  };
  const clearError = (fieldName: string) => {
    if (!errors[fieldName]) return;

    if (!componets[fieldName]?.parentNode) return;
    const parentComponet = componets[fieldName].parentNode;
    const alert = parentComponet?.querySelector(
      '[role="alert"]'
    ) as HTMLParagraphElement;
    const input = parentComponet?.querySelector("input");

    if (!alert || !input) return;
    alert.textContent = "";
    alert.style.display = "none";
    input.style.border = "2px solid var(--var--primary)";

    delete errors[fieldName];

    setErrors(errors);
  };

  const handleSumbmit = (
    e: React.FormEvent<HTMLFormElement>,
    callback: (data: { [key: string]: string }) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    let isDirty = false;
    const fields = Object.keys(formState.values);

    fields.forEach((fieldName) => {
      if (validations[fieldName]) {
        if (
          !Boolean(getValue(fieldName)) &&
          Boolean(validations[fieldName].required)
        ) {
          setError(fieldName, validations[fieldName].required as string);
          isDirty = true;
        } else if (
          validations[fieldName].regexp &&
          !validations[fieldName].regexp?.value.test(
            formState.values[fieldName]
          )
        ) {
          setError(fieldName, validations[fieldName].regexp?.message as string);
          isDirty = true;
        } else {
          clearError(fieldName);
        }
      }
    });
    setAttemtsCount(attemptsCount + 1);
    if (!isDirty) return callback(formState.values);
  };

  return {
    setError,
    getValue,
    register,
    handleSumbmit,
  };
}
