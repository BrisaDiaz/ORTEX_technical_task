import React from "react";
import "../../styles/globals.css";
import {ComponentStory, ComponentMeta} from "@storybook/react";

import LockedIcon from "../SVG/Locked";

import Input from "./index";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    size: {
      defaultValue: "medium",
    },
    fullWidth: {
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Input>;
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const WithError = Template.bind({});

WithError.args = {
  errors: ["Please insert a valid email"],
  inputProps: {
    placeholder: "Email*",
    id: "email",
    type: "email",
    "aria-label": "email",
    "aria-required": true,
    autoFocus: true,
    autoComplete: "email",

    name: "email",
  },
};
export const WithIcon = Template.bind({});

WithIcon.args = {
  errors: [],
  icon: <LockedIcon />,
  inputProps: {
    placeholder: "Password*",
    id: "password",
    type: "password",
    "aria-label": "password",
    "aria-required": true,
    autoFocus: true,
    autoComplete: "password",
    name: "password",
  },
};
export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {
  size: "small",
  inputProps: {
    placeholder: "Name*",
    id: "password",
    type: "text",
    "aria-label": "name",
    "aria-required": true,
    autoFocus: false,
    autoComplete: "name",
    name: "name",
  },
};
export const Large = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Large.args = {
  ...Small.args,
  size: "large",
};
export const fullWidth = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
fullWidth.args = {
  ...Small.args,
  size: "medium",
  fullWidth: true,
};
