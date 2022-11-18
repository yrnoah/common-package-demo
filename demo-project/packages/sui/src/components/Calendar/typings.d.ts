import moment from "moment";

export interface IDateValue {
  type: EPickerTypes;
  start: moment.Moment;
  end: moment.Moment;
}

export interface IDatePickerPanelProps {
  value: IDateValue;
  onChange: (value: IDateValue) => void;
  attachPickerPanel: React.MutableRefObject<
    { forceUpdate: () => void } | undefined
  >;
}

export enum EPickerTypes {
  NONE = "None",
  Day = "Day",
  Week = "Week",
  Month = "Month",
  Year = "Year",
  Range = "Range",
  Since = "Since",
}
