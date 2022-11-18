import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tooltip from "./Tooltip";

export default {
  title: "Example/Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args} />
);

export const DefaultTooltip = Template.bind({});
DefaultTooltip.args = {
  text: "This is a default tooltip",
  wrapperStyle: { marginTop: 20 },
  direction: undefined,
  horizontalDirection: undefined,
  topOffset: undefined,
  leftOffset: undefined,
  size: undefined,
  defaultContentHeight: undefined,
  iconStyles: {},
  tooltipSize: undefined,
  persistShow: undefined,
  parentNodeId: undefined,
};
DefaultTooltip.parameters = {
  controls: { include: Object.keys(DefaultTooltip.args) },
};

export const TooltipWithNode = Template.bind({});
TooltipWithNode.args = {
  ...DefaultTooltip.args,
  children: <input placeholder="test node" />,
  wrapperStyle: { marginTop: 20, marginLeft: "auto", marginRight: "auto" },
  text: "This is a tooltip with node element",
  horizontalDirection: "right",
  direction: "bottom",
};
TooltipWithNode.parameters = {
  controls: { include: Object.keys(TooltipWithNode.args) },
};
