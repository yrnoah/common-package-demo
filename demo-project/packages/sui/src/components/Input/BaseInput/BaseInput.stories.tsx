import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BaseInput as Input } from "./styles.input";

export default {
  title: "Example/Input/BaseInput",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const BaseInput = Template.bind({});
BaseInput.args = {
  error: false,
  disabled: false,
  readOnly: false,
  placeholder: "Please Input",
};
