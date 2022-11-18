import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StepStatus } from "./StepStatus";

export default {
  title: "Example/Steps",
  component: StepStatus,
} as ComponentMeta<typeof StepStatus>;

const Template: ComponentStory<typeof StepStatus> = (args) => (
  <StepStatus {...args} />
);

export const TestSteps = Template.bind({});
TestSteps.args = { active: 0, ds: [1, 2, 3] };
