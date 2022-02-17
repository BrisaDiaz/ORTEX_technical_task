import React from "react";
export interface InputValidations {
  required?: string;
  pattern?: { value: RegExp; message: string };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  min?: {
    value: number;
    message: string;
  };
  max?: {
    value: number;
    message: string;
  };
}
export interface FormState {
  values: { [key: string]: string | string[] | FileList };
  errors: { [key: string]: string[] };
  validations: { [key: string]: InputValidations };
}
export default function useForm({
  mode,
  onFieldValidation,
  onSubmit,
}: {
  mode?: "onChange" | "onBlur" | "onSubmit";
  onFieldValidation?: (field: string, errors: string[]) => void;
  onSubmit: (data: { [key: string]: any }) => void;
}) {
  const [attemptsCount, setAttemptsCount] = React.useState<number>(0);

  const [formState, setFormState] = React.useState<FormState>({
    values: {},
    validations: {},
    errors: {},
  });

  const setFieldValidations = (
    fieldName: string,
    validations?: InputValidations
  ) => {
    //// avoid re-render infinite loop.
    if (
      validations &&
      !Object.keys(formState.validations).includes(fieldName)
    ) {
      setFormState({
        ...formState,
        validations: { ...formState.validations, [fieldName]: validations },
      });
    }
  };

  const setErrors = (errors: { [key: string]: string[] }) => {
    setFormState({ ...formState, errors });
  };

  const setValue = (fieldName: string, value: string) => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [fieldName]: typeof value === "string" ? value.trim() : value,
      },
    });
  };
  const getValue = (fieldName?: string) => {
    if (!fieldName) return formState.values;
    if (formState.values && fieldName in formState.values)
      return formState.values[fieldName];
    return false;
  };

  const setError = (fieldName: string, message: string) => {
    if (formState.errors[fieldName]?.includes(message)) return;

    formState.errors[fieldName]
      ? formState.errors[fieldName].push(message)
      : (formState.errors = {
          ...formState.errors,
          [fieldName]: [message],
        });

    setErrors(formState.errors);
  };
  const clearError = (fieldName: string) => {
    if (!formState.errors[fieldName]) return;

    delete formState.errors[fieldName];

    setErrors(formState.errors);
  };
  const validate = (
    fieldName: string,
    value: string[] | string | FileList,
    validations: InputValidations
  ) => {
    const fieldErrors: string[] = [];

    if (!Boolean(getValue(fieldName)) && Boolean(validations.required)) {
      setError(fieldName, validations.required as string);
      fieldErrors.push(validations.required as string);
    } else if (
      validations.pattern &&
      typeof value === "string" &&
      !validations.pattern?.value.test(value)
    ) {
      setError(fieldName, validations.pattern?.message as string);
      fieldErrors.push(validations.pattern?.message as string);
    } else if (
      validations.min &&
      typeof value === "string" &&
      parseInt(value) < validations.min.value
    ) {
      setError(fieldName, validations.min.message as string);
      fieldErrors.push(validations.min?.message as string);
    } else if (
      validations.max &&
      typeof value === "string" &&
      parseInt(value) > validations.max.value
    ) {
      setError(fieldName, validations.max.message as string);
      fieldErrors.push(validations.max?.message as string);
    } else if (
      validations.minLength &&
      value.length > validations.minLength.value
    ) {
      setError(fieldName, validations.minLength.message as string);
      fieldErrors.push(validations.minLength?.message as string);
    } else if (
      validations.maxLength &&
      value.length < validations.maxLength.value
    ) {
      setError(fieldName, validations.maxLength.message as string);
      fieldErrors.push(validations.maxLength?.message as string);
    } else {
      clearError(fieldName);
    }
    return {
      errors: fieldErrors,
      isDirty: fieldErrors.length ? true : false,
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    let isFormDirty = false;
    const fields = Object.keys(formState.validations);

    fields.forEach((fieldName) => {
      if (formState.validations[fieldName]) {
        const { isDirty, errors } = validate(
          fieldName,
          formState.values[fieldName],
          formState.validations[fieldName]
        );
        onFieldValidation && onFieldValidation(fieldName, errors);
        if (isDirty) isFormDirty = true;
      }
    });
    setAttemptsCount(attemptsCount + 1);
    if (!isFormDirty) return onSubmit(formState.values);
  };

  function register(fieldName: string, validations?: InputValidations) {
    setFieldValidations(fieldName, validations);

    const props = {
      name: fieldName,

      onChange: function (e: React.ChangeEvent<HTMLInputElement>) {
        setValue(fieldName, e.target.value);

        if (validations && mode == "onChange") {
          const { errors } = validate(fieldName, e.target.value, validations);
          onFieldValidation && onFieldValidation(e.target.name, errors);
        }
      },
      onBlur: function (e: React.ChangeEvent<HTMLInputElement>) {
        if (validations && mode == "onBlur") {
          const { errors } = validate(fieldName, e.target.value, validations);

          onFieldValidation && onFieldValidation(e.target.name, errors);
        }
      },
    };
    return props;
  }
  return {
    setError,
    getValue,
    register,
    handleSubmit,

    attemptsCount,
    errors: formState.errors,
    values: formState.values,
  };
}
