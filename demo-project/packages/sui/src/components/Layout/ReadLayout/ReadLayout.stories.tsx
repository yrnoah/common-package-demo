import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useCallback, useState } from "react";
import { Layout } from "./Layout";

export default {
  title: "Example/Layout",
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => {
  const [rightEl, setRightEl] = useState(["right 1", "right 2", "right 3"]);
  const onAdd = useCallback(
    () =>
      setRightEl((v) => {
        const newEl = `right ${v.length + 1}`;
        return [...v, newEl];
      }),
    []
  );
  const onRemove = useCallback(
    () =>
      setRightEl((v) => {
        const newV = [...v];
        newV.pop();
        return newV;
      }),
    []
  );
  return (
    <Layout {...args}>
      <p>header</p>
      <div>left</div>
      <div style={{ position: "sticky", top: 0 }}>
        <button onClick={onAdd}>add right item</button>
        <button onClick={onRemove}>remove right item</button>
      </div>
      {rightEl.map((v) => (
        <div key={v}>{v}</div>
      ))}
    </Layout>
  );
};

export const ReadLayout = Template.bind({});
ReadLayout.args = {
  contentWrapperStyles: {
    outline: "1px solid red",
    maxHeight: 300,
    overflow: "hidden",
  },
  leftWrapperStyles: {
    outline: "1px solid green",
    overflow: "scroll",
  },
  rightWrapperStyles: {
    outline: "1px solid blue",
    overflow: "scroll",
    maxHeight: 300,
  },
};
