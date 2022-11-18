import { useCallback, useMemo, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import styled from "styled-components";
import { Dropdown as RawDropdown } from "./Dropdown";
import Button from "../Buttons/Button";
import TextButton from "../Buttons/TextButton";

const Item = styled.div`
  height: 32px;
  width: 200px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid grey;
`;

export default {
  title: "Example/Dropdown/BaseDropdown",
  component: RawDropdown,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    overlay: {
      table: {
        disable: true,
      },
    },
    onVisibleChange: {
      table: {
        disable: true,
      },
    },
    visible: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof RawDropdown>;

const Template: ComponentStory<typeof RawDropdown> = (args) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState(3);
  const overlay = useMemo(
    () => (
      <>
        {Array.from({ length: options }).map((_, i) => (
          <Item key={i}>item {i + 1}</Item>
        ))}
      </>
    ),
    [options]
  );
  const increase = useCallback(() => setOptions((v) => v + 1), []);
  const decrease = useCallback(() => setOptions((v) => Math.max(v - 1, 0)), []);
  const onChange = useCallback((v) => setVisible(!!v), []);
  return (
    <div>
      <div style={{ position: "absolute", top: 0, right: 0 }}>
        <TextButton onClick={increase} style={{ marginRight: 8 }}>
          increase option
        </TextButton>
        <TextButton onClick={decrease}>decrease option</TextButton>
      </div>
      <RawDropdown
        overlay={overlay}
        visible={visible}
        {...args}
        onVisibleChange={onChange}
      >
        <Button onClick={setVisible.bind(null, !visible)} style={{ width: 72 }}>
          trigger
        </Button>
      </RawDropdown>
    </div>
  );
};

export const Dropdown = Template.bind({});
Dropdown.args = {
  style: { marginTop: "10vw", marginLeft: "20vw" },
  overlayContainerStyle: { outline: "1px solid grey" },
  disableAnimation: false,
};
