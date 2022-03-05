import React from "react";
import "../../styles/globals.css";
import {ComponentStory, ComponentMeta} from "@storybook/react";

import Spinner from "./index";
export default {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      defaultValue: "medium",
    },
  },
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Medium = Template.bind({});

export const Small = Template.bind({});
Small.args = {
  size: "small",
};
export const Large = Template.bind({});
Large.args = {
  size: "large",
};
