import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BaseButton from "./Button";
import { IconPlus, IconArrowDown } from "../../../icons";

export default {
  title: "Example/Buttons",
  component: BaseButton,
} as ComponentMeta<typeof BaseButton>;

const Template: ComponentStory<typeof BaseButton> = (args) => (
  <BaseButton {...args} />
);

export const TextButton = Template.bind({});
TextButton.args = {
  children: "Button",
  loading: false,
  disabled: false,
};
TextButton.parameters = {
  controls: { include: Object.keys(TextButton.args) },
};
export const LinkButton = Template.bind({});
LinkButton.args = {
  children: "Button",
  loading: false,
  disabled: false,
  isLink: true,
};
LinkButton.parameters = {
  controls: { include: Object.keys(LinkButton.args) },
};
export const TextButtonWithIcons = Template.bind({});
TextButtonWithIcons.args = {
  children: "Button",
  loading: false,
  disabled: false,
  prefixEl: <IconPlus width={16} height={16} />,
  suffixEl: <IconArrowDown width={12} height={12} />,
  defaultBgColor: "#FCF9F5",
  isLink: false,
};
TextButtonWithIcons.parameters = {
  controls: { include: Object.keys(TextButtonWithIcons.args) },
};
