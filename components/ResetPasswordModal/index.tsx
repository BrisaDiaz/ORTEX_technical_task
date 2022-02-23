import React from "react";
import Image from "next/image";

import {EMAIL_PATTERN} from "@/utils/regex";
import useForm from "@/hooks/useForm";

import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";

import styles from "./index.module.css";

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
    <Modal aria-hidden={!isOpen} isOpen={isOpen} onClose={onClose}>
      <form className={styles.content} name="reset password" onSubmit={handleSubmit}>
        <h2>Reset Your Password</h2>
        <p>Enter your email address to get reset instructions sent to you.</p>

        <Input
          alertProps={{id: "email-address-error"}}
          errors={errors["emailAddress"]}
          icon={<Image alt="email" layout="fill" objectFit="contain" src="/icons/mail.svg" />}
          inputProps={{
            placeholder: "Email Address*",
            id: "emailAddress",
            type: "text",
            "aria-label": "email address",
            "aria-required": true,
            autoFocus: true,
            autoComplete: "emailAddress",
            "aria-invalid": errors["emailAddress"]?.length ? true : false,
            "aria-describedby": "email-address-error",
            ...register("emailAddress", {
              pattern: {
                value: EMAIL_PATTERN,
                message: "Please insert a valid email",
              },
              required: "Email is required",
            }),
          }}
        />
        <Button text="Submit" />
      </form>
    </Modal>
  );
}
