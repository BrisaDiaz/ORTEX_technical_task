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
  onSubmit: (formData: { [key: string]: string }) => void;
  isOpen: boolean;
}) {
  const { register, handleSumbmit } = useForm({
    validations: {
      email: {
        regexp: {
          value: EMAIL_PATTERN,
          message: "Please insert a valid email",
        },
        required: "Email is required",
      },
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        className={styles.content}
        onSubmit={(e) => handleSumbmit(e, onSubmit)}
      >
        <h2>Reset Your Password</h2>
        <p>Enter your email address to get reset instructions sent to you.</p>

        <Input
          type="text"
          name="email"
          onChange={register}
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
