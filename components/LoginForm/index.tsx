import Image from "next/image";

import {EMAIL_PATTERN, PASSWORD_PATTERN} from "@/utils/regex";
import useForm from "@/hooks/useForm";

import Input from "../Input/index";
import Button from "../Button/index";

import styles from "./index.module.css";

export default function LoginForm({
  onForgotPassword,
  onSubmit,
}: {
  onForgotPassword: () => void;
  onSubmit: (formData: {[key: string]: string | FileList | string[]}) => void;
}) {
  const {register, handleSubmit, errors} = useForm({
    onSubmit,
  });

  return (
    <form className={styles.form} name="login" onSubmit={handleSubmit}>
      <div className={styles["form__logo"]}>
        <Image
          alt="ORTEX"
          blurDataURL="/ORTEX_logo.webp"
          layout="fill"
          loading="eager"
          placeholder="blur"
          src="/ORTEX_logo.webp"
        />
      </div>
      <section className={styles["form__content"]}>
        <Input
          alertProps={{id: "email-error"}}
          errors={errors["email"]}
          icon={
            <Image
              alt="email"
              layout="fill"
              loading="eager"
              objectFit="contain"
              src="/icons/mail.svg"
            />
          }
          inputProps={{
            placeholder: "Email*",
            id: "email",
            type: "text",
            "aria-label": "email",
            "aria-required": true,
            autoFocus: true,
            autoComplete: "email",
            "aria-invalid": errors["email"]?.length ? true : false,
            "aria-describedby": "email-error",
            ...register("email", {
              pattern: {
                value: EMAIL_PATTERN,
                message: "Please insert a valid email",
              },
              required: "Email is required",
            }),
          }}
        />
        <Input
          alertProps={{id: "password-error"}}
          errors={errors["password"]}
          icon={
            <Image
              alt="password"
              layout="fill"
              loading="eager"
              objectFit="contain"
              src="/icons/password.svg"
            />
          }
          inputProps={{
            placeholder: "Password*",
            id: "password",
            type: "password",

            "aria-label": "password",
            "aria-required": true,
            autoComplete: "password",
            "aria-invalid": errors["password"]?.length ? true : false,
            "aria-describedby": "password-error",
            ...register("password", {
              pattern: {
                value: PASSWORD_PATTERN,
                message: "Insecure password. Example: MyLongP@ssword8",
              },
              required: "Password is required",
            }),
          }}
        />
        <Button className={styles["form__button"]} text="Login" />
        <p
          aria-label="open reset password form"
          className={styles["form__text"]}
          tabIndex={0}
          onClick={onForgotPassword}
          onKeyDown={(e) => e.key === "Enter" && onForgotPassword()}
        >
          Forgot your password?
        </p>
      </section>
    </form>
  );
}
