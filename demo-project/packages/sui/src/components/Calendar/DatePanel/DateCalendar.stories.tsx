import { useState, useCallback } from "react";
import moment from "moment";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RawDateCalendar from "./DateCalendar";
import { useCurrent } from "../../../hooks";

export default {
  title: "Example/Calendar/DateCalendar",
  component: RawDateCalendar,
  argTypes: {
    onClearDate: {
      control: "function",
    },
  },
} as ComponentMeta<typeof RawDateCalendar>;

const defaultMomentStart = moment("2020-01-01 +0800", "YYYY-MM-DD Z");

const Template: ComponentStory<typeof RawDateCalendar> = (args) => {
  const [viewedDate, setViewedDate] = useState(() => moment());
  const [value, setValue] = useState<moment.Moment | undefined>();
  const onClear = useCallback(() => setValue(undefined), []);
  const todayRef = useCurrent(moment());
  const handleDayOrWeekChange = useCallback((date: moment.Moment) => {
    setValue(date.clone());
  }, []);
  const handleDisabledDate = useCallback((date: moment.Moment) => {
    return date.isBefore(defaultMomentStart, "d");
  }, []);
  const handleDisabledMonth = useCallback((date: moment.Moment) => {
    return date.isBefore(defaultMomentStart, "month");
  }, []);
  return (
    <div style={{ width: 304 }}>
      <RawDateCalendar
        {...args}
        disabledDate={handleDisabledDate}
        disabledMonth={handleDisabledMonth}
        value={value}
        onChange={handleDayOrWeekChange}
        today={todayRef.current}
        viewedMonth={viewedDate}
        onViewedMonthChange={setViewedDate}
        onClearDate={onClear}
      />
    </div>
  );
};

export const DateCalendar = Template.bind({});

DateCalendar.args = {
  hasTodayButton: true,
  isTodayDisabled: false,
};
