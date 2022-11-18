import { useState, useCallback } from "react";
import moment from "moment";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RawMonthPanel from "./MonthPanel";

export default {
  title: "Example/Calendar/MonthPanel",
  component: RawMonthPanel,
} as ComponentMeta<typeof RawMonthPanel>;

const defaultMomentStart = moment("2020-01-01 +0800", "YYYY-MM-DD Z");

const Template: ComponentStory<typeof RawMonthPanel> = (args) => {
  const [viewedDate, setViewedDate] = useState(() => moment());
  const [value, setValue] = useState<moment.Moment | undefined>();
  const handleMonthChange = useCallback((date: moment.Moment) => {
    setValue(date.clone());
  }, []);
  const handleDisabledYear = useCallback((date: moment.Moment) => {
    return date.isBefore(defaultMomentStart, "year");
  }, []);
  const handleDisabledMonth = useCallback((date: moment.Moment) => {
    return date.isBefore(defaultMomentStart, "month");
  }, []);
  return (
    <div style={{ width: 304 }}>
      <RawMonthPanel
        {...args}
        disabledYear={handleDisabledYear}
        disabledMonth={handleDisabledMonth}
        value={value}
        onChange={handleMonthChange}
        viewedYear={viewedDate}
        onViewedYearChange={setViewedDate}
      />
    </div>
  );
};

export const MonthPanel = Template.bind({});

MonthPanel.args = {
  wrapperStyle: { maxHeight: 245 },
};
