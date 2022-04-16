import React from "react";
import "../../styles/globals.css";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {within, userEvent} from "@storybook/testing-library";

import ResetPasswordModal from "./index";

export default {
  title: "Template/Reset Password Modal",
  component: ResetPasswordModal,
  argTypes: {
    isOpen: {
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof ResetPasswordModal>;

const Template: ComponentStory<typeof ResetPasswordModal> = (args) => (
  <ResetPasswordModal {...args} />
);

export const SuccessForm = Template.bind({});

SuccessForm.args = {
  onClose: () => action("onClose")(),
  isOpen: true,
  onSubmit: () => action("onSubmit")(),
};

SuccessForm.play = async ({canvasElement}) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByPlaceholderText("Email Address*"), "userEmail@emal.com");
  await userEvent.click(canvas.getByText("Submit"));
};
export const ErrorForm = Template.bind({});
ErrorForm.args = {
  ...SuccessForm.args,
};
ErrorForm.play = async ({canvasElement}) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByText("Submit"));
};
