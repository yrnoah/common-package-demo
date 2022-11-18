import { ComponentStory, ComponentMeta } from "@storybook/react";
import FormDropdown, { TSuiFormDropdownOption } from "./FormDropdown";

const MockData: TSuiFormDropdownOption[] = [
  {
    key: "",
    name: "All",
    isTitle: false,
  },
  {
    key: "KR-ICN",
    name: "Seoul",
    isTitle: false,
  },
  {
    key: "AU-MEL",
    name: "Your Switch revenue report from the period of YYYY-MM-DD to YYYY-MM-DD is now available to download by logging in to your Space Partner Portal. Should you detect any discrepancies in the generated report, please highlight it to us within 7 days upon receipt of this email.",
    isTitle: false,
  },
  { key: "CN-PEK", name: "Beijing", isTitle: false },
  { key: "SG-SIN", name: "Singapore", isTitle: false },
];

export default {
  title: "Example/Dropdown/FormDropdown",
  component: FormDropdown,
} as ComponentMeta<typeof FormDropdown>;

const Template: ComponentStory<typeof FormDropdown> = (args) => {
  return (
    <>
      <FormDropdown {...args} />
    </>
  );
};

export const DemoFormDropdown = Template.bind({});

DemoFormDropdown.args = {
  wrapperStyle: { marginLeft: 0, marginTop: 0 },
  label: "Label",
  helpText: "Help text here.",
  ds: MockData,
};
