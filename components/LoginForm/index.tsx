import Image from "next/image";

import {EMAIL_PATTERN, PASSWORD_PATTERN} from "../../utils/regex";
import useForm from "../../hooks/useForm";
import EmailIcon from "../SVG/Email";
import LockedIcon from "../SVG/Locked";
import Input from "../Input/index";
import Button from "../Button/index";

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
    <form className={"form"} name="login" onSubmit={handleSubmit}>
      <div className={"form__logo"}>
        <Image
          alt="ORTEX"
          blurDataURL="/ORTEX_logo.webp"
          layout="fill"
          loading="eager"
          placeholder="blur"
          src="/ORTEX_logo.webp"
        />
      </div>
      <section className={"form__content"}>
        <Input
          errors={errors["email"]}
          fullWidth={true}
          icon={<EmailIcon color={errors["email"] ? "var(--secondary)" : "var(--primary)"} />}
          inputProps={{
            placeholder: "Email*",
            id: "email",
            type: "text",
            "aria-label": "email",
            "aria-required": true,
            autoFocus: true,
            autoComplete: "email",

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
          errors={errors["password"]}
          fullWidth={true}
          icon={<LockedIcon color={errors["password"] ? "var(--secondary)" : "var(--primary)"} />}
          inputProps={{
            placeholder: "Password*",
            id: "password",
            type: "password",

            "aria-label": "password",
            "aria-required": true,
            autoComplete: "current-password",

            ...register("password", {
              pattern: {
                value: PASSWORD_PATTERN,
                message: "Insecure password. Exp: MyLongP@ssword8",
              },
              required: "Password is required",
            }),
          }}
        />
        <Button
          className={"form__button"}
          fullWidth={true}
          size="large"
          text="Login"
          type="secondary"
        />
        <p
          aria-label="open reset password form"
          className={"form__text"}
          tabIndex={0}
          onClick={onForgotPassword}
          onKeyDown={(e) => e.key === "Enter" && onForgotPassword()}
        >
          Forgot your password?
        </p>
      </section>
      <style>{`
      .form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-light);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: var(--box-shadow);
  padding: 40px 24px 15px;

  position: relative;
  bottom: 0;
}
.form__content {
  width: 100%;

  max-width: 350px;
  margin: 0 auto;
  text-align: center;
}
.form__logo {
  position: relative;
  width: 100px;
  height: 66px;
  margin: 0 auto 40px;
}
.form__button {
  margin: 20px auto;
}
.form__text {
  font-family: Raleway;
  font-style: normal;
  text-orientation: none;
  font-weight: normal;
  line-height: 19px;
  text-decoration-line: underline;
  cursor: pointer;
}
@media (min-width: 700px) {
  .form {
    border-radius: 0;
    min-height: 100vh;
    justify-content: center;
  }
  .form__logo {
    width: 170px;
    height: 100px;
  }
}
`}</style>
    </form>
  );
}
