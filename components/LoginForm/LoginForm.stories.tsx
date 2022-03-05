import React from "react";
import "../../styles/globals.css";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {within, userEvent} from "@storybook/testing-library";

import LoginForm from "./index";
export default {
  title: "Template/Login Form",
  component: LoginForm,
  parameters: {
    layout: "full-screen",
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args: {
  onForgotPassword: () => void;
  onSubmit: (formData: {[key: string]: string | FileList | string[]}) => void;
}) => <LoginForm {...args} />;

export const ErrorForm = Template.bind({});
ErrorForm.args = {
  onSubmit: () => action("onSubmit")(),
  onForgotPassword: () => action("onForgotPassword")(),
};

ErrorForm.play = async ({canvasElement}: {canvasElement: HTMLElement}) => {
  const canvas = within(canvasElement);

  await userEvent.type(
    canvas.getByPlaceholderText("Email*"),
    "emailProvider.com",

    {
      delay: 100,
    },
  );
  await userEvent.type(canvas.getByPlaceholderText("Password*"), "insecurePassword", {
    delay: 100,
  });
  await userEvent.click(canvas.getByRole("button"));
};
export const SuccessForm = Template.bind({});
ErrorForm.args = {
  onSubmit: () => action("onSubmit")(),
  onForgotPassword: () => action("onForgotPassword")(),
};

SuccessForm.play = async ({canvasElement}: {canvasElement: HTMLElement}) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByPlaceholderText("Email*"), "email@provider.com", {
    delay: 100,
  });
  await userEvent.type(canvas.getByPlaceholderText("Password*"), "SecureP@pssword100", {
    delay: 100,
  });
  await userEvent.click(canvas.getByRole("button"));
};
