import { useCallback, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Dialogue as RawDialogue } from "./Dialogue";
import { useDialogue } from "./useDialogue";
import Toast from "../../Toast";

export default {
  title: "Example/Dialogue",
  component: RawDialogue,
  argTypes: {
    ref: { table: { disable: true } },
    key: { table: { disable: true } },
  },
} as ComponentMeta<typeof RawDialogue>;

const Template: ComponentStory<typeof RawDialogue> = (args) => {
  const [showDialogue, setShowDialogue] = useState(false);
  const { showDialogue: showGlobalDialogue } = useDialogue();

  const onCreateGlobalDialogue = () => {
    const { open, ...rest } = args;
    const onOk = (e: unknown, dismiss?: () => void) => {
      Toast.success({ content: "dismiss after 2s" });
      setTimeout(() => {
        if (dismiss) dismiss();
      }, 2000);
    };
    showGlobalDialogue({ ...rest, handleOk: onOk });
    showGlobalDialogue({ ...rest, handleOk: onOk });
  };

  // handleCancel
  const _onLeftBtnClick = useCallback((event) => {
    console.log(event);
    setShowDialogue(false);
  }, []);

  // handleOk
  const _onRightBtnClick = useCallback((event) => {
    console.log(event);
    Toast.success({ content: "Confirmed" });
    setShowDialogue(false);
  }, []);

  const showDialogueClick = () => {
    setShowDialogue(true);
  };

  return (
    <>
      <button onClick={showDialogueClick}>show dialogue</button>
      <button onClick={onCreateGlobalDialogue}>show 2 global dialogue</button>
      <RawDialogue
        {...args}
        open={showDialogue}
        handleCancel={_onLeftBtnClick}
        handleOk={_onRightBtnClick}
      />
    </>
  );
};

export const Dialogue = Template.bind({});
Dialogue.args = {
  title: (
    <h1
      style={{
        textAlign: "center",
        padding: "32px 24px 0",
        boxSizing: "border-box",
        margin: "0",
      }}
    >
      Title can be a react component
    </h1>
  ),
  subTitle: "This line is for dialogue description.",
  cancelText: "Cancel",
  okText: "Confirm",
  okLoading: false,
  style: {},
};
