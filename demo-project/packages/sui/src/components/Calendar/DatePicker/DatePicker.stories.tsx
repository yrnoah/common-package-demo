import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { TimeUnit } from "../../../utils/date";
import RawDatePicker from "./DatePicker";

export default {
  title: "Example/Calendar/DatePicker",
  component: RawDatePicker,
} as ComponentMeta<typeof RawDatePicker>;

const Template: ComponentStory<typeof RawDatePicker> = (args) => {
  const [selected, setDate] = useState<number | undefined>(0);
  const [height, setHeight] = useState(0);
  return (
    <div style={{ width: 304 }}>
      <p>
        {selected ? new Date(selected).toLocaleString() : "please select date"}
      </p>
      <p>component's height: {height}</p>
      <RawDatePicker
        onChange={(v) => setDate(v)}
        onHeightUpdate={(v) => setHeight(v)}
        {...args}
      />
    </div>
  );
};

export const DatePicker = Template.bind({});
DatePicker.args = {
  startDate: Date.now() - TimeUnit.Day * 14,
  endDate: Date.now() + TimeUnit.Day * 24,
  value: Date.now() + TimeUnit.Day,
  extraDisabledRange: [
    [Date.now() - TimeUnit.Day * 2, Date.now() - TimeUnit.Day * 1],
    [Date.now() - TimeUnit.Day * 7, Date.now() - TimeUnit.Day * 5],
    [Date.now() + TimeUnit.Day * 7, Date.now() + TimeUnit.Day * 9],
  ],
};
