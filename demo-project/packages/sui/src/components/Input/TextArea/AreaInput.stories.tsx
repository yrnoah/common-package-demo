import React, { useState, useCallback } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { InputTextArea } from "./Input";

export default {
  title: "Example/Input/TextArea",
  component: InputTextArea,
} as ComponentMeta<typeof InputTextArea>;

const Template: ComponentStory<typeof InputTextArea> = (args) => {
  const [_value, setInnerValue] = useState("默认文本");
  const _onChange = useCallback((event) => {
    console.log("==回调返回输入的内容==", event.target.value || "");
    setInnerValue(event.target.value || "");
  }, []);

  return (
    <InputTextArea
      {...args}
      onChange={_onChange}
      value={_value}
      // style={{ width: 150 }}
      // placeholder="Input"
    />
  );
};

export const TextArea = Template.bind({});
TextArea.args = {
  // style: { width: 250},
  placeholder: "Input",
  readOnly: false,
  disabled: false,
  maxLength: 100,
  textAreaDefaultHeight: 32,
  textAreaMaxHeight: 120,
  defaultUI: true,
};
TextArea.parameters = {
  controls: { include: Object.keys(TextArea.args) },
};
