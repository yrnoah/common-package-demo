import { useState, useCallback } from "react";
import moment from "moment";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BaseYearPanel, { CalendarYearPanel as RawYearPanel } from "./YearPanel";
import { useCurrent } from "../../../hooks";

export default {
  title: "Example/Calendar/YearPanel",
  component: RawYearPanel,
} as ComponentMeta<typeof RawYearPanel>;

const defaultMomentStart = moment("2020-01-01 +0800", "YYYY-MM-DD Z");

const Template: ComponentStory<typeof RawYearPanel> = (args) => {
  const [viewedDate, setViewedDate] = useState(() => moment());
  const [value, setValue] = useState<moment.Moment | undefined>();
  const todayRef = useCurrent(moment());
  const handleChange = useCallback((date: moment.Moment) => {
    setValue(date.clone());
  }, []);
  const handleDisabledYear = useCallback((date: moment.Moment) => {
    return date.isBefore(defaultMomentStart, "year");
  }, []);
  return (
    <div style={{ width: 304 }}>
      <RawYearPanel
        {...args}
        value={value}
        onChange={handleChange}
        today={todayRef.current}
        viewedYear={viewedDate}
        onViewedYearChange={setViewedDate}
        disabledYear={handleDisabledYear}
      />
    </div>
  );
};

export const YearPanel = Template.bind({});

YearPanel.args = {};

const BaseYearPanelTemplate: ComponentStory<typeof BaseYearPanel> = (args) => {
  const [value, setValue] = useState<moment.Moment | undefined>();
  const todayRef = useCurrent(moment());
  const handleChange = useCallback((date: moment.Moment) => {
    setValue(date.clone());
  }, []);
  return (
    <div style={{ width: 304 }}>
      <BaseYearPanel
        {...args}
        value={value}
        startYear={defaultMomentStart}
        onChange={handleChange}
        today={todayRef.current}
      />
    </div>
  );
};

export const RangePickerYearPanel = BaseYearPanelTemplate.bind({});
RangePickerYearPanel.args = {};
