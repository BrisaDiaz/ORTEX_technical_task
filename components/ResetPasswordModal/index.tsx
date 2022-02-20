import styles from "./index.module.css";
import React, { FormEvent, useEffect } from "react";
import Modal from "../Modal";
import Image from "next/image";
import Input from "../Input";
import Button from "../Button";
import { EMAIL_PATTERN } from "@/utils/regex";
import useForm from "@/hooks/useForm";
export default function ResetPasswordModal({
  onSubmit,
  isOpen,
  onClose,
}: {
  onClose: () => void;
  onSubmit: (formData: { [key: string]: any }) => void;
  isOpen: boolean;
}) {
  const { register, handleSubmit, errors } = useForm({
    onSubmit,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} aria-hidden={isOpen}>
      <form
        className={styles.content}
        onSubmit={handleSubmit}
        aria-label="reset password"
      >
        <h2>Reset Your Password</h2>
        <p>Enter your email address to get reset instructions sent to you.</p>

        <Input
          errors={errors["emailAddress"]}
          alertProps={{ id: "email-address-error" }}
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
          icon={
            <Image
              layout="fill"
              src="/icons/mail.svg"
              alt="email"
              objectFit="contain"
            />
          }
        />
        <Button text="Submit" />
      </form>
    </Modal>
  );
}
