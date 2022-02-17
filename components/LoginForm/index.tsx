import React, { useEffect } from "react";
import styles from "./index.module.css";
import Input from "../Input/index";
import Image from "next/image";
import Button from "../Button/index";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "@/utils/regex";
import useForm from "@/hooks/useForm";
import inputStylesController from "@/utils/inputStylesController";
export default function LoginForm({
  onForgotPassword,
  onSubmit,
}: {
  onForgotPassword: () => void;
  onSubmit: (formData: { [key: string]: any }) => void;
}) {
  const { register, handleSubmit, formRef } = useForm({
    onFieldValidation: inputStylesController,
    onSubmit,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      <div className={styles.logo}>
        <Image
          src="/ORTEX_logo.png"
          layout="fill"
          alt="ORTEX"
          loading="eager"
          placeholder="blur"
          blurDataURL="/ORTEX_logo.png"
        />
      </div>
      <section>
        <Input
          type="text"
          placeholder="Email"
          autoFocus={true}
          register={{
            ...register("email", {
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
              loading="eager"
            />
          }
        />
        <Input
          type="password"
          placeholder="Password"
          register={{
            ...register("password", {
              pattern: {
                value: PASSWORD_PATTERN,
                message: "Insecure password. Example: MylongP@ssword8",
              },
              required: "Password is required",
            }),
          }}
          icon={
            <Image
              layout="fill"
              objectFit="contain"
              src="/icons/password.svg"
              alt="password"
              loading="eager"
            />
          }
        />
        <Button text="Login" />
        <p
          onClick={onForgotPassword}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onForgotPassword()}
          aria-label="open reset password form"
        >
          Forgot your password?
        </p>
      </section>
    </form>
  );
}
