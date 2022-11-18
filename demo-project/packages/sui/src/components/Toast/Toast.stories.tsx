import Toast from "./Toast";
// set global import in sui/.storybook/preview.js
// import { ToastGlobalStyle } from "../../styles/toastGlobalStyle";
import type { ArgsProps, ConfigOptions } from "./Toast";

export default {
  title: "Example/Toast",
};

const Template = (args: ArgsProps & ConfigOptions) => (
  <TemplateComponent {...args} />
);

function TemplateComponent(args: ArgsProps & ConfigOptions) {
  if (args.top !== undefined) {
    Toast.config({
      top: args.top,
    });
  }
  if (args.maxCount !== undefined) {
    Toast.config({
      maxCount: args.maxCount,
    });
  }
  if (args.duration !== undefined) {
    Toast.config({
      duration: args.duration,
    });
  }
  const toast1 = () => {
    Toast.error({
      content: args.content,
      className: "hello",
    });
  };
  const toast2 = () => {
    Toast.success({
      content: args.content,
    });
  };
  const toast3 = () => {
    Toast.warn({
      content: args.content,
    });
  };

  const toast4 = () => {
    Toast.info({
      content: args.content,
    });
  };
  return (
    <>
      {/* <ToastGlobalStyle leftOffset={30} /> */}
      <button onClick={toast1}>error</button>
      <button onClick={toast2}>success</button>
      <button onClick={toast3}>warn</button>
      <button onClick={toast4}>info</button>
      <button onClick={() => Toast.destroy()}>destroy</button>
    </>
  );
}

export const TestToast = Template.bind({ id: "test-toast" });
(TestToast as any).args = {
  duration: 10,
  content: <div>323232</div>,
  top: 20,
  maxCount: 10,
};
