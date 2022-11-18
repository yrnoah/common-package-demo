import React, { useCallback } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BaseTextToggle from "./TextToggle";

export default {
  title: "Example/Toggle",
  component: BaseTextToggle,
  argTypes: {
    onChange: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof BaseTextToggle>;

const arr = ["Item 01", "Item 02", "Item 03"];

const Template: ComponentStory<typeof BaseTextToggle> = (args) => {
  const onChange = useCallback((item) => {
    // 这里是回调选择的项，用于测试是否返回了正确的数据
    // console.log(item.title);
  }, []);

  return <BaseTextToggle {...args} onChange={onChange} />;
};

export const TextToggle = Template.bind({});
const _options = arr.map((item) => {
  return {
    key: item,
    title: item,
  };
});
TextToggle.args = {
  options: _options,
  selectItem: _options[0],
};
