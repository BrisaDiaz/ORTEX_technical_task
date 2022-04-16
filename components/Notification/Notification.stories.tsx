import React from "react";
import "../../styles/globals.css";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {action} from "@storybook/addon-actions";

import Notification from "./index";
export default {
  title: "Components/Notification",
  component: Notification,
  argTypes: {
    isOpen: {
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => <Notification {...args} />;

export const Modal = Template.bind({});

Modal.args = {
  title: "Notification Title",
  onClose: () => action("onClose")(),
  isOpen: true,
  message: "notification message",
};
