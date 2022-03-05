import React from "react";

import {EMAIL_PATTERN} from "../../utils/regex";
import useForm from "../../hooks/useForm";
import Modal from "../Dialog";
import Input from "../Input";
import Button from "../Button";
import EmailIcon from "../SVG/Email";

export default function ResetPasswordModal({
  onSubmit,
  isOpen,
  onClose,
}: {
  onClose: () => void;
  onSubmit: (formData: {[key: string]: string | FileList | string[]}) => void;
  isOpen: boolean;
}) {
  const {register, handleSubmit, errors} = useForm({
    onSubmit,
  });

  return (
    <Modal
      AriaLabel="reset password dialog"
      aria-hidden={!isOpen}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className={"content"} name="reset password" onSubmit={handleSubmit}>
        <h2 className={"content__title"}>Reset Your Password</h2>
        <p>Enter your email address to get reset instructions sent to you.</p>

        <Input
          errors={errors["emailAddress"]}
          fullWidth={true}
          icon={
            <EmailIcon
              color={errors["emailAddress"]?.length ? "var(--secondary)" : "var(--primary)"}
            />
          }
          inputProps={{
            placeholder: "Email Address*",
            id: "emailAddress",
            type: "text",
            "aria-label": "email address",
            "aria-required": true,
            autoFocus: true,
            autoComplete: "email",

            ...register("emailAddress", {
              pattern: {
                value: EMAIL_PATTERN,
                message: "Please insert a valid email",
              },
              required: "Email is required",
            }),
          }}
        />
        <Button
          className={"contact__button"}
          fullWidth={true}
          size="large"
          text="Submit"
          type="secondary"
        />
      </form>
      <style>
        ´
        {`
      .content {
  text-align: center;

  width: 100%;
  padding: 20px;
}
.content__title {
  margin-top: 0;
}
.content__button {
  margin: 10px auto;
}
@media (min-width: 700px) {
  .content {
    text-align: center;
    max-width: 500px;
    padding: 30px;
  }
}

      `}
      </style>
    </Modal>
  );
}
