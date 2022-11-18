import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useMeasure } from "react-use";
import moment from "moment";
// components
import DatePanel from "../DatePanel";
import MonthPanel from "../MonthPanel";
import { CalendarYearPanel } from "../YearPanel";
// hooks & utils
import useCurrent from "../../../hooks/useCurrent";
import { EPickerTypes } from "../utils";
// styles
import * as S from "../styles.picker";

const momentStart = moment("2020-01-01 +0800", "YYYY-MM-DD Z");

interface IDatePickerProps {
  onChange?: (date?: number) => void;
  value?: number;
  startDate?: number;
  endDate?: number;
  extraDisabledRange?: Array<[number, number]>;
  readOnly?: boolean;
  onHeightUpdate?: (v: number) => void;
}

const DatePicker = React.memo(
  ({
    value,
    onChange,
    startDate,
    endDate,
    extraDisabledRange,
    readOnly,
    onHeightUpdate,
  }: IDatePickerProps) => {
    const datePickerForceUpdateRef = useRef<{ forceUpdate: () => void }>();
    const [activeDate, setActiveDate] = useState<moment.Moment | null>(
      value ? moment(value) : null
    );
    const onUpdateDate = useCallback(
      (v: moment.Moment) => {
        if (onChange) onChange(v.valueOf());
        setActiveDate(v);
      },
      [onChange]
    );
    const [customType, setCustomTypes] = useState<EPickerTypes>(
      EPickerTypes.Day
    );
    const updateEPickerTypes = useCallback((v) => setCustomTypes(v), []);
    const onApplyCustom = useCallback(() => {}, []);
    const onClearDate = useCallback(() => {
      setActiveDate(null);
      if (onChange) onChange(undefined);
    }, [onChange]);
    const extraDisabled = useMemo(
      () =>
        extraDisabledRange &&
        extraDisabledRange.map((i) => [moment(i[0]), moment(i[1])]),
      [extraDisabledRange]
    );
    return (
      <CalendarComponent
        onUpdate={updateEPickerTypes}
        curtype={customType}
        activeDate={activeDate}
        onUpdateValue={onUpdateDate}
        attachPickerPanel={datePickerForceUpdateRef}
        onApply={onApplyCustom}
        startDate={startDate ? moment(startDate) : undefined}
        endDate={endDate ? moment(endDate) : undefined}
        extraDisabledRange={extraDisabled}
        readOnly={readOnly}
        onHeightUpdate={onHeightUpdate}
        onClearDate={onClearDate}
      />
    );
  }
);

export default DatePicker;

interface CalendarComponentProps {
  curtype: EPickerTypes;
  startDate?: moment.Moment;
  endDate?: moment.Moment;
  extraDisabledRange?: moment.Moment[][];
  activeDate: moment.Moment | null;
  readOnly?: boolean;
  onUpdate: (v: EPickerTypes) => void;
  onUpdateValue: (v: moment.Moment) => void;
  onApply: () => void;
  onClearDate?: () => void;
  attachPickerPanel: React.MutableRefObject<
    { forceUpdate: () => void } | undefined
  >;
  onHeightUpdate?: (v: number) => void;
}

const CalendarComponent = React.memo(
  ({
    curtype,
    onUpdate,
    onUpdateValue,
    activeDate,
    attachPickerPanel,
    startDate,
    endDate,
    extraDisabledRange,
    onHeightUpdate,
    onClearDate,
  }: CalendarComponentProps) => {
    const onChange = useCallback(
      (value: moment.Moment) => {
        onUpdateValue(value);
      },
      [onUpdateValue]
    );
    const [value, setValue] = useState<moment.Moment | undefined>();
    const [viewedDate, setViewedDate] = useState(() => activeDate || moment());
    const [ref, { height }] = useMeasure();
    const onHeightRef = useCurrent(onHeightUpdate);
    useEffect(() => {
      if (onHeightRef.current && height) onHeightRef.current(height + 24 + 16);
    }, [height, onHeightRef]);

    const todayRef = useCurrent(moment());

    const startDateRef = useCurrent(startDate?.clone());

    useEffect(() => {
      const v = startDateRef.current;
      if (v) setViewedDate(v);
    }, [startDateRef]);

    const handleDisabledDate = useCallback(
      (date: moment.Moment) => {
        if (extraDisabledRange) {
          for (const i of extraDisabledRange) {
            if (i.length === 2) {
              if (
                date.isBetween(i[0], i[1], "d") ||
                date.isSame(i[0], "d") ||
                date.isSame(i[1], "d")
              )
                return true;
            }
          }
        }
        if (startDate && endDate)
          return date.isBefore(startDate, "d") || date.isAfter(endDate, "d");
        if (startDate) return date.isBefore(startDate, "d");
        if (endDate)
          return date.isBefore(momentStart, "d") || date.isAfter(endDate, "d");
        return date.isBefore(momentStart, "d");
      },
      [endDate, startDate, extraDisabledRange]
    );

    const handleDisabledMonth = useCallback(
      (date: moment.Moment) => {
        if (startDate && endDate)
          return (
            date.isBefore(startDate, "month") || date.isAfter(endDate, "month")
          );
        if (startDate) return date.isBefore(startDate, "month");
        if (endDate)
          return (
            date.isBefore(momentStart, "month") ||
            date.isAfter(endDate, "month")
          );
        return date.isBefore(momentStart, "month");
      },
      [endDate, startDate]
    );

    const handleDisabledYear = useCallback(
      (date: moment.Moment) => {
        if (startDate && endDate)
          return (
            date.isBefore(startDate, "year") || date.isAfter(endDate, "year")
          );
        if (startDate) return date.isBefore(startDate, "year");
        if (endDate)
          return (
            date.isBefore(momentStart, "year") || date.isAfter(endDate, "year")
          );
        return date.isBefore(momentStart, "year");
      },
      [endDate, startDate]
    );

    const handleYearChange = useCallback(
      (year: moment.Moment) => {
        setViewedDate(year.clone());
        onUpdate(EPickerTypes.Month);
        // onChange(year);
      },
      [onUpdate]
    );

    const handleDayOrWeekChange = useCallback(
      (date: moment.Moment) => {
        setValue(date.clone());
        onChange(date.clone());
      },
      [onChange]
    );

    const handleMonthChange = useCallback(
      (v: moment.Moment) => {
        setViewedDate(v.clone());
        onUpdate(EPickerTypes.Day);
      },
      [onUpdate]
    );

    const setPickerAndValueFromProps = useCallback(() => {
      if (!activeDate) setValue(undefined);
      if (activeDate) {
        setValue(activeDate.clone());
        setViewedDate(activeDate.clone() || moment());
      }
    }, [activeDate]);

    useEffect(() => {
      setPickerAndValueFromProps();

      attachPickerPanel.current = {
        forceUpdate: setPickerAndValueFromProps,
      };
    }, [attachPickerPanel, setPickerAndValueFromProps]);

    const picker = useMemo(() => {
      switch (curtype) {
        default:
          return (
            <DatePanel
              disabledMonth={handleDisabledMonth}
              disabledDate={handleDisabledDate}
              value={value}
              onChange={handleDayOrWeekChange}
              today={todayRef.current}
              viewedMonth={viewedDate}
              onViewedMonthChange={setViewedDate}
              key={curtype}
              onTitleClick={onUpdate.bind(null, EPickerTypes.Year)}
              onClearDate={onClearDate}
            />
          );
        case EPickerTypes.Month:
          return (
            <MonthPanel
              disabledMonth={handleDisabledMonth}
              disabledYear={handleDisabledYear}
              value={value}
              onChange={handleMonthChange}
              viewedYear={viewedDate}
              onViewedYearChange={setViewedDate}
              onTitleClick={onUpdate.bind(null, EPickerTypes.Year)}
              wrapperStyle={{ maxHeight: 245 }}
            />
          );
        case EPickerTypes.Year:
          return (
            <CalendarYearPanel
              value={value}
              onChange={handleYearChange}
              today={todayRef.current}
              viewedYear={viewedDate}
              onViewedYearChange={setViewedDate}
              disabledYear={handleDisabledYear}
            />
          );
      }
    }, [
      curtype,
      handleDayOrWeekChange,
      handleDisabledDate,
      handleDisabledMonth,
      handleDisabledYear,
      handleMonthChange,
      handleYearChange,
      todayRef,
      value,
      viewedDate,
      onUpdate,
      onClearDate,
    ]);
    return (
      <S.CalendarWrapper
        style={{ border: "none" }}
        ref={(el) => {
          if (el) ref(el);
        }}
      >
        {picker}
      </S.CalendarWrapper>
    );
  }
);
