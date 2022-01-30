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
  const { register, handleSumbmit, formRef } = useForm({
    onFieldValidation: inputStylesController,
    onSubmit,
  });

  return (
    <form className={styles.form} onSubmit={handleSumbmit} ref={formRef}>
      <div className={styles.logo}>
        <Image src="/ORTEX_logo.png" layout="fill" alt="ORTEX" />
      </div>
      <section>
        <Input
          type="text"
          placeholder="Email"
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
              priority={true}
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
                message: "Insecure password. Example: Mylongp@asword8",
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
            />
          }
        />
        <Button text="Login" />
        <p onClick={onForgotPassword} tabIndex={0} onKeyDown={onForgotPassword}>
          Forgot your password?
        </p>
      </section>
    </form>
  );
}
