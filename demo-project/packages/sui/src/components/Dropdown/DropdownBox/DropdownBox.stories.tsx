// import { useCallback, useMemo, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DropdownBox as RawDropdown } from "./DropdownBox";
import type { TSuiDropdownBoxOption } from "./DropdownBox";
import { useCallback, useState } from "react";
import Loading from "../../Loading";
import { SearchBarHeight } from "../styles.dropdown";

const rawDS = require("../__MOCK__/data.json");
const MockSpaces: TMockOption[] = rawDS.map((v: any) => ({
  ...v,
  key: v.id,
}));

interface TMockOption extends TSuiDropdownBoxOption {
  extraValue?: string;
}
const MockData: TMockOption[] = [
  {
    key: "",
    name: "All",
    isTitle: false,
    extraValue: "test all",
  },
  {
    key: "KR-ICN",
    name: "Seoul",
    isTitle: false,
    extraValue: "test extra key",
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
  title: "Example/Dropdown/DropdownBox",
  component: RawDropdown,
  argTypes: {
    onChange: {
      table: {
        disable: true,
      },
    },
    onScroll: { control: "function" },
  },
} as ComponentMeta<typeof RawDropdown>;

const Template: ComponentStory<typeof RawDropdown> = (args) => {
  const [selected, setSelected] = useState(args.defaultValue || "");
  const onChange = useCallback((v: TMockOption) => {
    console.log(`${v.name}(${v.key})(${v.extraValue || "no extra"})`);
    setSelected(v.key);
  }, []);
  return (
    <>
      <RawDropdown {...args} onChange={onChange} selected={selected} />
      <div style={{ marginTop: 50, marginLeft: 50 }}>another controller</div>
      <select
        onChange={(v) => setSelected(v.target.value)}
        style={{ width: 300, marginLeft: 50 }}
        value={selected}
      >
        <option value={""}>clear data</option>
        {MockData.map((v) => (
          <option key={v.key} value={v.key}>
            {v.name}
          </option>
        ))}
      </select>
    </>
  );
};

export const DropdownBox = Template.bind({});

DropdownBox.args = {
  style: { marginLeft: 50, marginTop: 50 },
  overlayContainerStyle: {},
  disableAnimation: false,
  ds: MockData,
  defaultValue: "",
  defaultLabel: "Please select",
};

const SearchBarTemplate: ComponentStory<typeof RawDropdown> = (args) => {
  const [selected, setSelected] = useState(args.defaultValue || "");
  const [_ds, setDS] = useState(args.ds || []);
  const onChange = useCallback((v: TMockOption) => {
    console.log(`${v.name}(${v.key})(${v.extraValue || "no extra"})`);
    setSelected(v.key);
  }, []);
  const loadMore = (e: unknown) => {
    console.log(e);
    const start = Math.max(
      parseInt(`${Math.random() * 100}`, 10),
      MockSpaces.length - 20
    );
    const more = MockSpaces.slice(start, start + 20).map((v, i) => ({
      ...v,
      key: `${v.key}${start}${Date.now()}${i}`,
    }));
    setDS((v) => [...v, ...more]);
  };
  return (
    <>
      <RawDropdown
        {...args}
        onChange={onChange}
        selected={selected}
        ds={_ds}
        onScrollToBottom={loadMore}
      />
    </>
  );
};

export const DropdownWithSearch = SearchBarTemplate.bind({});
DropdownWithSearch.args = {
  style: { marginLeft: 50, marginTop: 50 },
  overlayContainerStyle: {},
  disableAnimation: false,
  ds: MockSpaces,
  defaultValue: "",
  defaultLabel: "Please select",
  canSearch: true,
  colType: "2-1",
  defaultKeyword: "",
  onScrollToBottom: (e) => console.log(e),
  scrollToBottomPlaceholder: (
    <Loading loading style={{ height: 30, minHeight: "unset" }} />
  ),
  searchBarCancelButtonStyles: {},
  searchInputStyles: {},
  shouldSearchIncludeTitle: false,
  optionsStyles: {},
  titleOptionsStyles: {
    position: "sticky",
    top: SearchBarHeight,
    zIndex: 2,
    height: 24,
    paddingTop: 0,
    paddingBottom: 0,
  },
};
