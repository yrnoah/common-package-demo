import { useState, useCallback } from "react";
import moment from "moment";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RawRangePanel from "./RangePanel";
import { useCurrent } from "../../../hooks";
import { EPickerTypes } from "../utils";
import type { IDateValue } from "../typings";

export default {
  title: "Example/Calendar/RangePanel",
  component: RawRangePanel,
} as ComponentMeta<typeof RawRangePanel>;

const Template: ComponentStory<typeof RawRangePanel> = (args) => {
  const [timeRange, setTimeRange] = useState<IDateValue | null>(null);
  const [value, setValue] =
    useState<[moment.Moment, moment.Moment | undefined]>();
  const [viewedDate, setViewedDate] = useState(
    () => timeRange?.start || moment()
  );
  const todayRef = useCurrent(moment());
  const handleRangeChange = useCallback(
    (value: [moment.Moment, moment.Moment | undefined]) => {
      if (value[1]) {
        console.log(
          new Date(value[0].valueOf()).toLocaleString(),
          new Date(value[1].valueOf()).toLocaleString()
        );
        setTimeRange({
          type: EPickerTypes.Range,
          start: value[0],
          end: value[1],
        });
        setValue([value[0], value[1]]);
      } else {
        setValue(value);
      }
    },
    []
  );
  const handleDisabledDate = useCallback((date: moment.Moment) => {
    return false;
  }, []);
  const handleDisabledMonth = useCallback((date: moment.Moment) => {
    return false;
  }, []);
  return (
    <div style={{ width: 304 }}>
      <RawRangePanel
        {...args}
        disabledDate={handleDisabledDate}
        disabledMonth={handleDisabledMonth}
        value={value}
        onChange={handleRangeChange}
        today={todayRef.current}
        viewedMonth={viewedDate}
        onViewedMonthChange={setViewedDate}
      />
    </div>
  );
};

export const RangePanel = Template.bind({});

RangePanel.args = {};
