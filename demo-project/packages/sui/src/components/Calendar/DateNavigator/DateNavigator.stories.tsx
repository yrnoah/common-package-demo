import React, { useState } from "react";
import moment from "moment";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RawDateNavigator from "./DateNavigator";

export default {
  title: "Example/Calendar/DateNavigator",
  component: RawDateNavigator,
  argTypes: {
    onClearDate: {
      control: "function",
    },
  },
} as ComponentMeta<typeof RawDateNavigator>;

const Template: ComponentStory<typeof RawDateNavigator> = (args) => {
  const [viewedDate, setViewedDate] = useState(() => moment());
  return (
    <div style={{ width: 300 }}>
      <RawDateNavigator
        {...args}
        title={viewedDate.format("MMM YYYY")}
        onPreviousClick={() => {
          // bug for moment.add(-1, "month")
          // https://github.com/storybookjs/storybook/issues/12208
          setViewedDate(viewedDate.clone().subtract(1, "month"));
        }}
        onNextClick={() => {
          setViewedDate(viewedDate.clone().subtract(-1, "month"));
        }}
        onClickResetToToday={() => setViewedDate(() => moment())}
      />
    </div>
  );
};

export const DateNavigator = Template.bind({});

DateNavigator.args = {
  title: "Sept 2021",
  hasTodayButton: true,
  previousDisabled: false,
  nextDisabled: false,
  isTodayDisabled: false,
  onClearDate: () => window.alert("clear date"),
};
