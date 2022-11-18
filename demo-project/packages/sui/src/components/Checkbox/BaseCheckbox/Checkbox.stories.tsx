import React, { useState, useCallback } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Checkbox from "./Checkbox";
import { CheckboxProps } from "../typing";

export default {
  title: "Example/Checkbox",
  component: Checkbox,
  argTypes: {
    defaultChecked: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.args = {
  checked: undefined,
  disabled: false,
  readOnly: false,
  indeterminate: false,
  style: {},
  size: undefined,
};
// DefaultCheckbox.parameters = {
//   controls: { include: Object.keys(DefaultCheckbox.args) },
// };

const TemplateControl: ComponentStory<typeof Checkbox> = (args) => (
  <ControlCheckedBox {...args} />
);

function ControlCheckedBox(props: CheckboxProps) {
  const [checked, setChecked] = useState(!!props.checked);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  }, []);
  const toggle = useCallback(() => setChecked((v) => !v), []);
  return (
    <>
      <Checkbox {...props} checked={checked} onChange={onChange} />
      <br />
      <button onClick={toggle}>toggle</button>
    </>
  );
}

export const ControlledCheckbox = TemplateControl.bind({});
ControlledCheckbox.args = {
  checked: true,
  disabled: false,
  readOnly: false,
  indeterminate: false,
  style: {},
  size: undefined,
};
ControlledCheckbox.parameters = {
  controls: { include: Object.keys(ControlledCheckbox.args) },
};
