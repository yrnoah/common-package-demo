import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Radio from "./Radio";

export default {
  title: "Example/Radios",
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const SingleRadio = Template.bind({});
SingleRadio.args = {
  text: "label text",
};
export const DisabledRadio = Template.bind({});
DisabledRadio.args = {
  disabled: true,
  text: <div style={{ color: "orange", marginLeft: 15 }}>label node</div>,
};
