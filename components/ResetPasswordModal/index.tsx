import styles from "./index.module.css";
import React, { FormEvent, useEffect } from "react";
import Modal from "../Modal";
import Image from "next/image";
import Input from "../Input";
import Button from "../Button";
import { EMAIL_PATTERN } from "@/utils/regex";
import inputStylesController from "@/utils/inputStylesController";
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
  const { register, handleSubmit, formRef } = useForm({
    onFieldValidation: inputStylesController,
    onSubmit,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className={styles.content} onSubmit={handleSubmit} ref={formRef}>
        <h2>Reset Your Password</h2>
        <p>Enter your email address to get reset instructions sent to you.</p>

        <Input
          type="text"
          register={{
            ...register("email", {
              pattern: {
                value: EMAIL_PATTERN,
                message: "Please insert a valid email",
              },
              required: "Email is required",
            }),
          }}
          placeholder="Email"
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
