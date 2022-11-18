import React, { useState, useCallback } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormTextArea } from "./Area";

export default {
  title: "Example/Input/FormArea",
  component: FormTextArea,
} as ComponentMeta<typeof FormTextArea>;

const Template: ComponentStory<typeof FormTextArea> = (args) => {
  const [_value, setInnerValue] = useState(
    "默认文本默认文本默认文本默认文本默认文本默认文本默认文本默认本默认文本默认文本默认文本默认文本默认文本"
  );
  const _onChange = useCallback((event) => {
    console.log(
      "FormTextArea=回调返回输入的内容=====2=",
      event.target.value || ""
    );
    setInnerValue(event.target.value || "");
  }, []);

  return (
    <FormTextArea
      {...args}
      onChange={_onChange}
      value={_value}
      // style={{ width: 150 }}
      // placeholder="Input"
    />
  );
};

export const FormArea = Template.bind({});
FormArea.args = {
  style: { width: 450 },
  placeholder: "Input",
  colType: "2-1",
  wrapperStyle: { marginTop: 20 },
  readOnly: false,
  disabled: false,
  error: "",
  tipMsg: "Helper message.",
  label: "label",
  maxLength: 90,
  showTopTitle: true,
  showTopCount: true,
  showBottomTip: true,
  showBottomCount: false,
  textAreaDefaultHeight: 32,
  textAreaMaxHeight: 448,
  showReadOnlyTip: false,
};
FormArea.parameters = {
  controls: { include: Object.keys(FormArea.args) },
};
