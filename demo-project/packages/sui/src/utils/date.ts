export const TimeUnit = {
  Second: 1000,
  Minute: 60 * 1000,
  Hour: 60 * 60000,
  Day: 24 * 3600000,
};

type DateValue = number | string;

// 2020-01-22T10:00:00Z  1579687200000
export function getTimeStr(date: DateValue, timeZone?: string) {
  if (timeZone) {
    const localUTC = new Date(date).getTime();
    const targetUTC = new Date(
      new Date(date).toLocaleString("en-US", { timeZone })
    ).getTime();
    const diff = targetUTC - localUTC;
    const resetUTC = localUTC - diff;
    return new Date(resetUTC).toISOString().split(".")[0] + "Z";
  }
  return new Date(date).toISOString().split(".")[0] + "Z";
}

export function formatTimezoneString(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone?: string
) {
  return getTimeStr(`${year}/${month}/${day} ${hour}:${minute}`, timeZone);
}

export function getDateInfo(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return { month, day, year, hours, minutes, seconds };
}

export function startOfWeek(date: Date) {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  const { year, month, day } = getDateInfo(new Date(date.setDate(diff)));
  return new Date(`${year}/${month}/${day} 0:0:0`).getTime();
}

export function endOfWeek(date: Date) {
  const weekEnd = new Date(
    date.setDate(date.getDate() - (date.getDay() - 1) + 6)
  );
  const { year, month, day } = getDateInfo(weekEnd);
  return new Date(`${year}/${month}/${day} 23:59:59`).getTime();
}

export function startOfMonth(year: number, month: number) {
  return new Date(`${year}/${month}/1 0:0:0`).getTime();
}

export function endOfMonth(year: number, month: number) {
  return new Date(year, month, 0, 23, 59, 59).getTime();
}

export function getDateRange(date: Date) {
  const { year, month, day } = getDateInfo(date);
  const dayBeforeInfo = getDateInfo(new Date(date.getTime() - 86400000));
  const todayStart = new Date(`${year}/${month}/${day} 0:0:0`).getTime();
  const todayEnd = new Date(`${year}/${month}/${day} 23:59:59`).getTime();
  const dayBeforeStart = new Date(
    `${dayBeforeInfo.year}/${dayBeforeInfo.month}/${dayBeforeInfo.day} 0:0:0`
  ).getTime();
  const dayBeforeEnd = new Date(
    `${dayBeforeInfo.year}/${dayBeforeInfo.month}/${dayBeforeInfo.day} 23:59:59`
  ).getTime();
  const yearStart = new Date(`${year}/1/1 0:0:0`).getTime();
  const yearEnd = new Date(`${year + 1}/1/1 0:0:0`).getTime();
  const weekStart = startOfWeek(date);
  const weekEnd = endOfWeek(date);
  const monthStart = startOfMonth(year, month);
  const monthEnd = endOfMonth(year, month);
  return {
    todayStart,
    todayEnd,
    dayBeforeStart,
    dayBeforeEnd,
    weekStart,
    weekEnd,
    monthStart,
    monthEnd,
    yearStart,
    yearEnd,
  };
}

export function formatFormDate(date?: number | string, isTwelve?: boolean) {
  // Sep 8, 2020, 13:14
  if (!date) return "";
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("en", { month: "short" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  let suffix = "am";
  if (isTwelve && hours >= 12) {
    suffix = "pm";
    // if (hours > 12) {
    //   // hours = hours - 12;
    //   suffix = "pm";
    // }
    // if (hours === 12 && minutes > 0) {
    //   suffix = "pm";
    // }
  }
  const result = `${month} ${day}, ${year}, ${formatNumWithBit(
    hours
  )}:${formatNumWithBit(minutes)}`;
  if (isTwelve) return `${result} ${suffix}`;
  return result;
}

export function formatColumnDate(
  date?: number | string,
  withoutHours?: boolean,
  type?: string
) {
  // Sep 8, 2020, 13:14:12
  if (!date) return "";
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("en", { month: "short" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  let hours = formatNumWithBit(dateObj.getHours());
  const minutes = formatNumWithBit(dateObj.getMinutes());
  const seconds = formatNumWithBit(dateObj.getSeconds());
  if (withoutHours) return `${month} ${day}, ${year}`;
  if (type === "withoutSeconds")
    return `${month} ${day}, ${year}, ${hours}:${minutes}`;
  const result = `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds}`;
  return result;
}

export function formatNumWithBit(value: number) {
  if (value >= 10) return value;
  return `0${Math.abs(value)}`;
}

export const formatSubmitDateStr = (time: number | string) => {
  const day = new Date(time);
  const m = day.getMonth() + 1;
  const d = day.getDate();
  return `${day.getFullYear()}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`;
};

export const formatDateStrWithTimezone = (
  time: number | string,
  timeZone: string
) => {
  return new Date(time).toLocaleString("en-US", {
    timeZone,
  });
};

export function formatCalendarSelectDate(date: Date) {
  const monthName = date.toLocaleString("en", { month: "short" });
  return `${date.getDate()} ${monthName} ${date.getFullYear()}`;
}

export function formatDateAndTimePickerDate(date: Date) {
  const monthName = date.toLocaleString("en", { month: "short" });
  const year = date.getFullYear();
  const day = date.getDate();
  const hours = formatNumWithBit(date.getHours());
  const minutes = formatNumWithBit(date.getMinutes());
  return `${monthName} ${day}, ${year} ${hours}:${minutes}`;
}
