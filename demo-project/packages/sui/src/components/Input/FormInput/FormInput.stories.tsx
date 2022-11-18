import { ComponentStory, ComponentMeta } from "@storybook/react";
import Input from "./Input";
import React, { useRef, useState, useCallback } from "react";

export default {
  title: "Example/Input/FormInput",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => {
  const ref = useRef(null);
  const [v, setV] = useState("");
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setV(e.target.value);
  }, []);
  return <Input {...args} ref={ref} value={v} onChange={onChange} />;
};

export const FormInput = Template.bind({});
FormInput.args = {
  label: "First Name",
  required: true,
  disabled: false,
  readOnly: false,
  placeholder: "Please Input",
  tipMsg: "",
  error: "",
  colType: "2-1",
  hideCount: false,
  maxLength: 10,
  explanation: "just a tooltip......",
  explanationIconSize: 12,
  explanationStyle: {},
  wrapperStyle: { marginTop: 20 },
  prefixEl: "$",
  suffixEl: "USD",
  canClear: true,
};
