import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import RawLabel from "./Label";

export default {
  title: "Example/Label",
  component: RawLabel,
} as ComponentMeta<typeof RawLabel>;

const Template: ComponentStory<typeof RawLabel> = (args) => (
  <RawLabel {...args} />
);

export const Label = Template.bind({});
Label.args = {
  label: "label text",
  name: "test name",
  value: "test value length",
  maxLength: 50,
  showCount: true,
  required: true,
  error: false,
  explanation: "test label tooltip text",
  explanationIconSize: 12,
  isMobile: false,
  isSubtitle: false,
  active: false,
  rightDes: "",
  style: { width: 200, marginTop: 20 },
};
