import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./PrimaryButton";
import { IconPlus, IconArrowDown } from "../../../icons";

export default {
  title: "Example/Buttons",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: "Button",
  loading: false,
  disabled: false,
  prefixEl: undefined,
  suffixEl: undefined,
};
PrimaryButton.parameters = {
  controls: { include: Object.keys(PrimaryButton.args) },
};
export const PrimaryButtonWithIcons = Template.bind({});
PrimaryButtonWithIcons.args = {
  children: "Button",
  loading: false,
  disabled: false,
  prefixEl: <IconPlus width={16} height={16} />,
  suffixEl: <IconArrowDown width={16} height={16} />,
};
PrimaryButtonWithIcons.parameters = {
  controls: { include: Object.keys(PrimaryButtonWithIcons.args) },
};
