import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasePillButton from "./PillButton";

export default {
  title: "Example/Toggle",
  component: BasePillButton,
} as ComponentMeta<typeof BasePillButton>;

const Template: ComponentStory<typeof BasePillButton> = (args) => (
  <BasePillButton {...args} />
);

export const PillButton = Template.bind({});
PillButton.args = {
  children: "2 - 4 Attendees",
  selected: false,
  disabled: false,
};
PillButton.parameters = {
  controls: { include: Object.keys(PillButton.args) },
};
