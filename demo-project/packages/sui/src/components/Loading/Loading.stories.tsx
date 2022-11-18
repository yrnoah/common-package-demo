import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Loading from "./Loading";

export default {
  title: "Example/Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
);

export const DefaultLoading = Template.bind({});
DefaultLoading.args = {
  size: 20,
  color: "#F55523",
  isFull: false,
  loading: true,
};
