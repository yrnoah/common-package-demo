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

export const Button = Template.bind({});
Button.args = {
  children: "Button",
  loading: false,
  disabled: false,
  prefixEl: undefined,
  suffixEl: undefined,
  defaultBgColor: undefined,
};
Button.parameters = {
  // controls: { include: ["children", "loading", "disabled"] },
  controls: { include: Object.keys(Button.args) },
};
export const ButtonWithIcons = Template.bind({});
ButtonWithIcons.args = {
  children: "Button",
  loading: false,
  disabled: false,
  prefixEl: <IconPlus width={16} height={16} />,
  suffixEl: <IconArrowDown width={16} height={16} />,
  defaultBgColor: "#FCF9F5",
};
ButtonWithIcons.parameters = {
  controls: { include: Object.keys(ButtonWithIcons.args) },
};
