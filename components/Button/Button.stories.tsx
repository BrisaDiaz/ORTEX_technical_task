import React from "react";
import "../../styles/globals.css";
import {ComponentStory, ComponentMeta} from "@storybook/react";

import Button from "./index";

export default {
  title: "Components/Button",
  component: Button,
  a11y: {disable: false},
  argTypes: {
    type: {
      defaultValue: "primary",
    },
    style: {
      defaultValue: "filled",
    },
    size: {
      defaultValue: "medium",
    },
    fullWidth: {
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  type: "primary",
  text: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: "secondary",
  text: "Button",
};
export const Alert = Template.bind({});
Alert.args = {
  type: "alert",
  text: "Button",
};
export const Warning = Template.bind({});
Warning.args = {
  type: "warning",
  text: "Button",
};
export const Success = Template.bind({});
Success.args = {
  type: "success",
  text: "Button",
};
export const Info = Template.bind({});
Info.args = {
  type: "info",
  text: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  text: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  text: "Button",
};
export const Outlined = Template.bind({});
Outlined.args = {
  style: "outlined",
  text: "Button",
};
export const fullWidth = Template.bind({});
fullWidth.args = {
  fullWidth: true,
  text: "Button",
};
