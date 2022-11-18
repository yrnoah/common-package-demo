import React, { useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BaseText from "./Text";

export default {
  title: "Example/Toggle",
  component: BaseText,
} as ComponentMeta<typeof BaseText>;

const Template: ComponentStory<typeof BaseText> = (args) => {
  const _ref = useRef<HTMLButtonElement>(null);

  return <BaseText {...args} ref={_ref} />;
};

export const Text = Template.bind({});
Text.args = {
  children: "Item 01",
  disabled: false,
};
Text.parameters = {
  controls: { include: Object.keys(Text.args) },
};
