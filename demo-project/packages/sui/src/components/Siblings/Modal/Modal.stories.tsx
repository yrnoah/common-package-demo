import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Modal as RawModal } from "./Modal";

export default {
  title: "Example/Modal",
  component: RawModal,
} as ComponentMeta<typeof RawModal>;

const Template: ComponentStory<typeof RawModal> = (args) => {
  const [showModal, setShowModal] = useState(!!args.open);

  const showModalClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <button onClick={showModalClick}>show modal</button>
      <RawModal
        {...args}
        open={showModal}
        onBGClick={setShowModal.bind(null, false)}
      >
        <>
          111{" "}
          <span
            onClick={() => setShowModal(false)}
            style={{ position: "relative" }}
          >
            close
          </span>
        </>
      </RawModal>
    </>
  );
};

export const Modal = Template.bind({});
Modal.args = {
  disableBG: false,
  duration: 200,
  style: {},
  backgroundStyle: {},
};
