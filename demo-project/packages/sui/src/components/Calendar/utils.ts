import moment from "moment";

export function getRangeMoments(
  start: moment.Moment,
  end: moment.Moment,
  unit: "month" | "year" | "d"
): moment.Moment[] {
  start = start.clone();
  const result: moment.Moment[] = [start.clone()];

  while (start.isBefore(end, unit)) {
    result.push(start.add(1, unit).clone());
  }
  return result;
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
