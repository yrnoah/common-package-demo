import React, { useState, useCallback, useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SearchInput from "./SearchInput";

export default {
  title: "Example/Input/SearchInput",
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => {
  const _ref = useRef<HTMLInputElement>(null);
  const [v, setV] = useState("");
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setV(e.target.value);
  }, []);

  const onSearch = useCallback((v) => {
    window.alert(`search:${v}`);
  }, []);

  return (
    <>
      <SearchInput
        {...args}
        ref={_ref}
        value={v}
        onChange={onChange}
        onSearch={onSearch}
      />
      <div>state value: {v || "-"}</div>
    </>
  );
};

export const DemoSearchInput = Template.bind({});
DemoSearchInput.args = {
  placeholder: "Please Input",
  maxLength: 100,
  wrapperSize: "standard",
  autoFocus: true,
  disabled: false,
  delay: 600,
};
DemoSearchInput.parameters = {
  controls: { include: Object.keys(DemoSearchInput.args) },
};
