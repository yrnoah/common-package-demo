import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BaseButton from "./Button";
import { IconArrowDown } from "../../../icons";

export default {
  title: "Example/Buttons",
  component: BaseButton,
} as ComponentMeta<typeof BaseButton>;

const Template: ComponentStory<typeof BaseButton> = (args) => {
  return (
    <>
      {!!args.tooltip && <div style={{ height: 50 }} />}
      <BaseButton {...args} />
    </>
  );
};

export const IconButton = Template.bind({});
IconButton.args = {
  children: <IconArrowDown width={16} height={16} />,
  loading: false,
  disabled: false,
  tooltip: "",
};
IconButton.parameters = {
  controls: { include: Object.keys(IconButton.args) },
};
