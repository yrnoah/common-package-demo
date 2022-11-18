import React, { useMemo, useState, useCallback } from "react";
import moment from "moment";
import useCurrent from "../../../hooks/useCurrent";

import DateNavigator from "../DateNavigator";
import { getRangeMoments } from "../utils";

import * as S from "../styles.picker";

export interface IRawDateCalendarProps<T> {
  disabledDate: (date: moment.Moment) => boolean;
  disabledMonth: (month: moment.Moment) => boolean;
  value: T | undefined;
  today: moment.Moment;
  viewedMonth: moment.Moment;
  itemClass?: string;

  isDateDisabled: (
    date: moment.Moment,
    month: moment.Moment,
    value: T | undefined
  ) => boolean;
  isDateHovered?: (date: moment.Moment, value: T | undefined) => boolean;
  isDateSelected: (date: moment.Moment, value: T | undefined) => boolean;
  isHighlightDate?: (date: moment.Moment, value: T | undefined) => string;
  onViewedMonthChange: (newViewedMonth: moment.Moment) => void;

  onDateClick: (date: moment.Moment) => void;
  onDateMouseEnter?: (date: moment.Moment) => void;
  onDateMouseLeave?: (date: moment.Moment) => void;
  onTitleClick?: () => void;
  hasTodayButton?: boolean;
  isTodayDisabled?: boolean;
  onClearDate?: () => void;
}

function getMonthDates(month: moment.Moment): moment.Moment[] {
  const startOfMonth = month.clone().startOf("month");
  const endOfMonth = month.clone().endOf("month");

  return getRangeMoments(
    startOfMonth.clone().subtract(startOfMonth.weekday(), "d"),
    endOfMonth.clone().add(6 - endOfMonth.weekday(), "d"),
    "d"
  );
}

function disabledOtherMonthDate(date: moment.Moment, month: moment.Moment) {
  return !date.isSame(month, "month");
}

interface IDateItemProps {
  disabled: boolean;
  selected: boolean;
  highlightClass: string;
  today: boolean;
  text: number;
  hovered: boolean;
  date: moment.Moment;
  itemClass?: string;
  onClick?: (date: moment.Moment) => void;
  onMouseEnter?: (date: moment.Moment) => void;
  onMouseLeave?: (date: moment.Moment) => void;
}

const DateItem = React.memo(
  ({
    disabled,
    selected,
    highlightClass,
    today,
    text,
    date,
    hovered,
    itemClass,
    onClick,
    onMouseEnter,
    onMouseLeave,
  }: IDateItemProps) => {
    const handleClick = useCallback(() => {
      onClick && onClick(date);
    }, [onClick, date]);
    const handleMouseEnter = useCallback(() => {
      onMouseEnter && onMouseEnter(date);
    }, [onMouseEnter, date]);
    const handleMouseLeave = useCallback(() => {
      onMouseLeave && onMouseLeave(date);
    }, [onMouseLeave, date]);
    const className = useMemo(() => {
      let result = "dc-date-item";
      if (itemClass) result = `${result} ${itemClass}`;
      if (disabled) result = `${result} dc-date-item-disabled`;
      if (selected) result = `${result} dc-date-item-selected`;
      if (highlightClass) result = `${result} ${highlightClass}`;
      if (today) result = `${result} dc-date-item-today`;
      if (hovered) result = `${result} dc-date-item-hovered`;
      return result;
    }, [hovered, disabled, selected, today, highlightClass, itemClass]);
    return (
      <S.DateItem
        className={className}
        onClick={onClick && handleClick}
        onMouseEnter={onMouseEnter && handleMouseEnter}
        onMouseLeave={onMouseLeave && handleMouseLeave}
      >
        {text}
      </S.DateItem>
    );
  }
);

function RawDateCalendar<T>({
  disabledDate,
  disabledMonth,
  value,
  today,
  viewedMonth,
  itemClass,
  isDateDisabled,
  isDateSelected,
  isHighlightDate,
  isDateHovered,
  onViewedMonthChange,
  onDateClick,
  onDateMouseEnter,
  onDateMouseLeave,
  onTitleClick,
  hasTodayButton,
  isTodayDisabled,
  onClearDate,
}: IRawDateCalendarProps<T>) {
  const weekdays = useMemo(() => {
    const weekdays = moment.weekdaysShort();
    const firstDayOfWeek = moment.localeData().firstDayOfWeek();

    return weekdays.map(
      (_value, index) => weekdays[(index + firstDayOfWeek) % 7]
    );
  }, []);
  const dateMoments = useMemo(() => getMonthDates(viewedMonth), [viewedMonth]);
  const dates = useMemo(
    () =>
      dateMoments.map((date) => {
        const selected = isDateSelected(date, value);
        const highlightClass =
          selected && isHighlightDate ? isHighlightDate(date, value) : "";
        const hovered = !isDateHovered
          ? false
          : !selected && isDateHovered(date, value);
        const disabled =
          isDateDisabled(date, viewedMonth, value) || disabledDate(date);

        return {
          text: date.date(),
          key: date.format("MM-DD"),
          date,
          disabled,
          highlightClass,
          selected,
          hovered,
          today: today.isSame(date, "d"),
        };
      }),
    [
      dateMoments,
      viewedMonth,
      value,
      disabledDate,
      today,
      isDateHovered,
      isDateDisabled,
      isDateSelected,
      isHighlightDate,
    ]
  );
  const calendarTitle = useMemo(
    () => viewedMonth.format("MMM YYYY"),
    [viewedMonth]
  );
  const disabledPreviousMonth = useMemo(
    () => disabledMonth(viewedMonth.clone().add(-1, "month")),
    [viewedMonth, disabledMonth]
  );
  const disabledNextMonth = useMemo(
    () => disabledMonth(viewedMonth.clone().add(1, "month")),
    [viewedMonth, disabledMonth]
  );

  const handlePreviousClick = useCallback(() => {
    onViewedMonthChange(viewedMonth.clone().add(-1, "month"));
  }, [onViewedMonthChange, viewedMonth]);

  const handleNextClick = useCallback(() => {
    onViewedMonthChange(viewedMonth.clone().add(1, "month"));
  }, [onViewedMonthChange, viewedMonth]);

  const onTodayClick = useCallback(() => {
    const today = moment();
    today.hours(0);
    today.minutes(0);
    today.seconds(0);
    today.milliseconds(0);
    onViewedMonthChange(today);
    onDateClick(today);
  }, [onDateClick, onViewedMonthChange]);
  return (
    <>
      <DateNavigator
        title={calendarTitle}
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
        previousDisabled={disabledPreviousMonth}
        nextDisabled={disabledNextMonth}
        onTitleClick={onTitleClick}
        hasTodayButton={hasTodayButton}
        isTodayDisabled={isTodayDisabled}
        onClickResetToToday={onTodayClick}
        onClearDate={onClearDate}
      />
      <S.DaysContainer>
        {weekdays.map((weekday) => (
          <S.WeekdayItem key={weekday}>{weekday}</S.WeekdayItem>
        ))}
        {dates.map(
          ({
            text,
            key,
            disabled,
            selected,
            today,
            hovered,
            date,
            highlightClass,
          }) => (
            <DateItem
              key={key}
              itemClass={itemClass}
              date={date}
              text={text}
              disabled={disabled}
              highlightClass={highlightClass}
              selected={selected}
              hovered={hovered}
              today={today}
              onClick={disabled ? undefined : onDateClick}
              onMouseEnter={disabled ? undefined : onDateMouseEnter}
              onMouseLeave={disabled ? undefined : onDateMouseLeave}
            />
          )
        )}
      </S.DaysContainer>
    </>
  );
}

function useHoveredDate() {
  const [hoveredDate, setHoveredDate] = useState<moment.Moment>();

  return {
    hoveredDate,
    setHoveredDate,
    clearHoveredDate: useCallback(() => {
      setHoveredDate(undefined);
    }, [setHoveredDate]),
  };
}

interface IWeekCalendarProps
  extends Omit<
    IRawDateCalendarProps<moment.Moment>,
    | "onDateClick"
    | "onDateMouseEnter"
    | "onDateMouseLeave"
    | "isDateSelected"
    | "isDateDisabled"
  > {
  onChange: (value: moment.Moment) => void;
}

function isSameWeek(date: moment.Moment, value: moment.Moment | undefined) {
  return !!value && date.isSame(value, "week");
}

function isWeekBeginOrEnd(
  date: moment.Moment,
  value: moment.Moment | undefined
) {
  if (!!value && date.isSame(value, "week")) {
    if (date.weekday() === 0) return "highlight-start";
    if (date.weekday() === 6) return "highlight-end";
  }
  return "";
}

export function WeekCalendar({ onChange, ...restProps }: IWeekCalendarProps) {
  const { setHoveredDate, clearHoveredDate, hoveredDate } = useHoveredDate();
  const handleDateClick = useCallback(
    (date: moment.Moment) => {
      onChange(date);
    },
    [onChange]
  );
  const isDateHovered = useCallback(
    (date: moment.Moment) => !!hoveredDate && date.isSame(hoveredDate, "week"),
    [hoveredDate]
  );

  return (
    <RawDateCalendar
      {...restProps}
      isDateDisabled={disabledOtherMonthDate}
      isDateSelected={isSameWeek}
      isHighlightDate={isWeekBeginOrEnd}
      isDateHovered={isDateHovered}
      onDateClick={handleDateClick}
      onDateMouseEnter={setHoveredDate}
      onDateMouseLeave={clearHoveredDate}
    />
  );
}

export interface IRangeCalendarProps
  extends Omit<
    IRawDateCalendarProps<[moment.Moment, moment.Moment | undefined]>,
    | "onDateClick"
    | "onDateMouseEnter"
    | "onDateMouseLeave"
    | "isDateSelected"
    | "isDateDisabled"
  > {
  onChange: (value: [moment.Moment, moment.Moment | undefined]) => void;
}

export function RangeCalendar({
  onChange,
  value,
  ...restProps
}: IRangeCalendarProps) {
  const { hoveredDate, setHoveredDate, clearHoveredDate } = useHoveredDate();
  const valueRef = useCurrent(value);

  const handleDateClick = useCallback(
    (date: moment.Moment) => {
      const value = valueRef.current;
      let newValue: [moment.Moment, moment.Moment | undefined] =
        !Array.isArray(value) || value[1] !== undefined
          ? [date.clone(), undefined]
          : [value[0], date.clone()];
      onChange(newValue);

      if (newValue[1] !== undefined) {
        clearHoveredDate();
      }
    },
    [onChange, valueRef, clearHoveredDate]
  );
  const isDateSelected = useCallback(
    (
      date: moment.Moment,
      value: [moment.Moment, moment.Moment | undefined] | undefined
    ) =>
      Array.isArray(value) &&
      (value[1]
        ? date.isBetween(value[0], value[1], "d", "[]")
        : date.isSame(value[0], "d")),
    []
  );

  const isHighlightDate = useCallback(
    (
      date: moment.Moment,
      value: [moment.Moment, moment.Moment | undefined] | undefined
    ) => {
      if (Array.isArray(value)) {
        if (date.isSame(value[0], "d")) return "highlight-start";
        if (date.isSame(value[value.length - 1], "d")) return "highlight-end";
      }
      return "";
    },
    []
  );

  const isDateDisabled = useCallback(
    (
      date: moment.Moment,
      month: moment.Moment,
      value: [moment.Moment, moment.Moment | undefined] | undefined
    ) =>
      disabledOtherMonthDate(date, month) ||
      (Array.isArray(value) &&
        value[1] === undefined &&
        date.isBefore(value[0], "d")),
    []
  );

  const isDateHovered = useCallback(
    (
      date: moment.Moment,
      value: [moment.Moment, moment.Moment | undefined] | undefined
    ) =>
      !!hoveredDate &&
      !!value &&
      value[1] === undefined &&
      date.isBetween(value[0], hoveredDate, "d"),
    [hoveredDate]
  );

  const shouldAttachEnterLeaveListener =
    Array.isArray(value) && value[1] === undefined;

  return (
    <RawDateCalendar
      {...restProps}
      value={value}
      onDateClick={handleDateClick}
      isDateDisabled={isDateDisabled}
      isDateSelected={isDateSelected}
      isHighlightDate={isHighlightDate}
      isDateHovered={isDateHovered}
      itemClass="range"
      onDateMouseEnter={
        shouldAttachEnterLeaveListener ? setHoveredDate : undefined
      }
      onDateMouseLeave={
        shouldAttachEnterLeaveListener ? clearHoveredDate : undefined
      }
    />
  );
}

interface IDateCalendarProps
  extends Omit<
    IRawDateCalendarProps<moment.Moment>,
    | "onDateClick"
    | "onDateMouseEnter"
    | "onDateMouseLeave"
    | "isDateSelected"
    | "isDateDisabled"
  > {
  onChange: (value: moment.Moment) => void;
  onTitleClick?: () => void;
  hasTodayButton?: boolean;
}

function isSameDate(date: moment.Moment, value: moment.Moment | undefined) {
  return !!value && date.isSame(value, "d");
}

export default function DateCalendar({
  onChange,
  ...restProps
}: IDateCalendarProps) {
  const handleDateClick = useCallback(
    (date: moment.Moment) => {
      onChange(date);
    },
    [onChange]
  );
  return (
    <RawDateCalendar
      {...restProps}
      onDateClick={handleDateClick}
      isDateDisabled={disabledOtherMonthDate}
      isDateSelected={isSameDate}
      itemClass="day"
    />
  );
}
