import React from "react";
import "../../styles/globals.css";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {action} from "@storybook/addon-actions";

import Dialog from "./index";
const DialogContent = () => (
  <div className="content">
    <h1>Dialog Content</h1>

    <style>{`.content{padding:20px 50px}`}</style>
  </div>
);

export default {
  title: "Components/Dialog",
  component: Dialog,
  argTypes: {
    onClose: {
      description: "function to execute when modal set to close",
      required: true,
      action: "onCloseed",
    },
    role: {
      defaultValue: "dialog",
    },
    fullScreen: {
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => (
  <Dialog {...args}>{args.isOpen && <DialogContent />}</Dialog>
);

export const FitContent = Template.bind({});

FitContent.args = {
  isOpen: true,
  onClose: () => action("onClose")(),
};
export const FullScreen = Template.bind({});

FullScreen.args = {
  ...FitContent.args,
  fullScreen: true,
};
