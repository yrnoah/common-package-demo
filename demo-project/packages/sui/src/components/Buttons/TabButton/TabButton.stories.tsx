import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TabButton as BaseButton } from "./Button";

export default {
  title: "Example/Buttons/TabButton",
  component: BaseButton,
} as ComponentMeta<typeof BaseButton>;

const Template: ComponentStory<typeof BaseButton> = (args) => (
  <BaseButton {...args} />
);

export const TabButton = Template.bind({});
TabButton.args = {
  children: "Button",
  disabled: false,
  active: false,
  tabType: "filled",
  style: { margin: 150 },
  tooltip: "",
};
TabButton.parameters = {
  controls: { include: Object.keys(TabButton.args) },
};

const arr = [
  "Booth",
  "Desk",
  "Meeting Room",
  "Private Office",
  "Events & Lifestyle",
];

const TabsTemplate: ComponentStory<typeof BaseButton> = (args) => {
  const [active, setActive] = useState(arr[0]);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {arr.map((v) => (
        <BaseButton
          {...args}
          active={active === v}
          onClick={setActive.bind(null, v)}
          key={v}
        >
          {v}
        </BaseButton>
      ))}
    </div>
  );
};

export const Tabs = TabsTemplate.bind({});
Tabs.args = {
  tabType: "filled",
};
Tabs.parameters = {
  controls: { include: Object.keys(Tabs.args) },
};
