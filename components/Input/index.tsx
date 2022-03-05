import React from "react";

function Input({
  icon,
  size,
  className,
  errors,
  inputProps,
  fullWidth,
}: {
  icon?: React.ReactNode;
  size?: "large" | "medium" | "small";
  errors?: string[];
  className?: string;
  fullWidth?: boolean;
  inputProps: {
    [key: string]: any;
  };
}) {
  return (
    <div className={` input-container ${fullWidth ? "input-container--full-width" : ""}`}>
      <small
        className={`${"input-container__message"} ${
          errors?.length ? "input-container__message--visible" : ""
        }`}
        id={`${inputProps.name}-error`}
        role="alert"
      >
        {errors && errors?.length ? errors[errors?.length - 1] : ""}
      </small>
      {icon && <div className={"input-container__icon-container"}>{icon}</div>}
      <input
        aria-describedby={`${inputProps.name}-error`}
        aria-invalid={errors && errors?.length > 0}
        className={`${"input-container__input"} ${
          errors?.length ? "input-container__input--invalid" : ""
        } ${icon ? "input-container__input--width-icon" : ""}
        ${
          size === "small"
            ? "input-container__input--small"
            : size === "large"
            ? "input-container__input--large"
            : ""
        }
        
        ${className || ""}
        `}
        {...inputProps}
      />
      <style>{`.input-container {
  position: relative;
  background: transparent;
      width: fit-content;
}

.input-container__input {
  -webkit-appearance: none !important;
  width: 100%;
  padding: 14px ;
  border-radius: var(--border-radius);
  border: 2px solid var(--primary);
  background: var(--text-color);
  box-shadow: var(--box-shadow--primary);
  color: var(--black-light);
  margin: 1rem 0;
}


.input-container__message {
  position: absolute;
  left: 2px;
  top: -8px;
  display: none;
  color: var(--secondary);
}

.input-container__input:focus {
  outline-color: var(--primary);
  outline-offset: 4px;
  outline-width: 1px;
}
.input-container__input--invalid {
  border: 2px solid var(--secondary);
}
.input-container__message--visible {
  display: block;
}

.input-container__icon-container {
  position: absolute;
  width: 20px;
  height: 20px;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  pointer-events: none;
  user-select: none;
}
.input-container__icon-container span {
  max-width: 20px;
}
.input-container__icon-container span img {
  pointer-events: none;
  user-select: none;
}
.input-container__input--small{
      padding: 10px;
}

.input-container__input--large {
    padding: 16px ;
    font-size:16px;
}
.input-container--full-width{
width:100%;
}
  .input-container__input--width-icon{
  padding-left: 45px;
}`}</style>
    </div>
  );
}
export default React.memo(Input);
