// import { useCallback, useMemo, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RegionDropdown as RawDropdown } from "./RegionDropdown";

const MockData = require("../__MOCK__/regions.json");

export default {
  title: "Example/Dropdown/RegionDropdown",
  component: RawDropdown,
  argTypes: {
    service: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof RawDropdown>;

const Template: ComponentStory<typeof RawDropdown> = (args) => {
  return <RawDropdown {...args} />;
};

export const RegionDropdown = Template.bind({});
RegionDropdown.args = {
  style: { marginLeft: "auto" },
  overlayContainerStyle: {},
  disableAnimation: false,
  ds: MockData.countryList,
  defaultValue: MockData.defaultRegion.code,
  triggerProps: { defaultBgColor: "#fff", loading: false, disabled: false },
};
