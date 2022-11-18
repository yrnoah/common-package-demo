import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RadioGroup from "./RadioGroup";

export default {
  title: "Example/Radios",
  component: RadioGroup,
  argTypes: {
    defaultChecked: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = (args) => (
  <RadioGroup {...args} />
);

export const DemoRadioGroup = Template.bind({});
enum BooleanSelectType {
  YES = "Yes",
  NO = "No",
}

const BooleanSelectOptions = [
  {
    key: BooleanSelectType.YES,
    text: BooleanSelectType.YES,
  },
  {
    key: BooleanSelectType.NO,
    text: BooleanSelectType.NO,
  },
];
DemoRadioGroup.args = {
  options: BooleanSelectOptions,
  canClear: false,
  // checked: BooleanSelectOptions[0].key,
};
