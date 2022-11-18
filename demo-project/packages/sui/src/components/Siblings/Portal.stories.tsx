import React from "react";
import styled from "styled-components";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Portal } from "./Portal";

export default {
  title: "Example/Siblings",
  component: Portal,
} as ComponentMeta<typeof Portal>;

const Template: ComponentStory<typeof Portal> = (args) => (
  <TemplateComponent {...args} />
);

export const TestSibling = Template.bind({});
TestSibling.args = { id: "test-sibling" };

const mockElHeight = 20;

function TemplateComponent(args: { id?: string }) {
  const [el, setEl] = React.useState<React.ReactNode[]>([]);
  const onClick = React.useCallback(() => {
    setEl((arr) => [
      ...arr,
      <Wrapper style={{ top: arr.length * mockElHeight }}>
        Thinking with portals {arr.length}
      </Wrapper>,
    ]);
  }, []);
  const onRemove = React.useCallback(() => {
    setEl((arr) => {
      if (!arr.length) return [];
      const newArr = [...arr];
      newArr.pop();
      return newArr;
    });
  }, []);
  return (
    <>
      <button onClick={onClick}>add fixed siblings</button>
      <button onClick={onRemove}>remove last sibling</button>
      <Portal {...args}>{el.map((v) => v)}</Portal>
    </>
  );
}

const Wrapper = styled.div`
  border: 1px solid red;
  position: fixed;
  right: 0;
  top: 0;
`;
