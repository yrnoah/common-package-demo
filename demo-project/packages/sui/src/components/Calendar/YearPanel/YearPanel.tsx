import React, { useMemo, useCallback, useState, useEffect } from "react";
import moment from "moment";

import DateNavigator from "../DateNavigator";
import { getRangeMoments } from "../utils";
import * as S from "../styles.picker";

const PageLength = 12;

interface IYearPanelProps {
  startYear: moment.Moment;
  today: moment.Moment;
  value: moment.Moment | undefined;
  onChange: (value: moment.Moment) => void;
}

function YearItem({
  text,
  year,
  active,
  disabled,
  onClick,
}: {
  text: number;
  year: moment.Moment;
  active: boolean;
  disabled?: boolean;
  onClick: (year: moment.Moment) => void;
}) {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick(year);
  }, [disabled, onClick, year]);
  const thisYear = useMemo(() => {
    return year.isSame(moment(), "y");
  }, [year]);
  return (
    <S.YPYearItem
      onClick={handleClick}
      $active={active}
      disabled={disabled}
      $isCur={!!thisYear}
    >
      {text}
    </S.YPYearItem>
  );
}

export default function YearPanel({
  startYear,
  today,
  value,
  onChange,
}: IYearPanelProps) {
  const yearMoments = useMemo(
    () => getRangeMoments(startYear, today, "year"),
    [startYear, today]
  );
  const years = useMemo(
    () =>
      yearMoments.map((year) => ({
        year,
        text: year.year(),
        active: value ? value.isSame(year, "year") : false,
      })),
    [value, yearMoments]
  );
  const totalPage = useMemo(
    () => Math.ceil(years.length / PageLength),
    [years]
  );
  const [page, setPage] = useState(1);
  const displayYears = useMemo(() => {
    const end = years.length - (page - 1) * PageLength;
    const start = Math.max(end - PageLength, 0);
    return [...years].slice(start, end);
  }, [years, page]);
  const calendarTitle = useMemo(() => {
    if (!displayYears.length) return "";
    if (displayYears.length === 1) return `${displayYears[0].text}`;
    return `${displayYears[0].text} - ${
      displayYears[displayYears.length - 1].text
    }`;
  }, [displayYears]);
  const handleNextClick = useCallback(() => {
    setPage((c) => c - 1);
  }, []);
  const handlePreClick = useCallback(() => {
    setPage((c) => c + 1);
  }, []);
  const disabledPreviousYear = useMemo(
    () => page >= totalPage,
    [page, totalPage]
  );
  const disabledNextYear = useMemo(() => page === 1, [page]);
  const handleYearClick = useCallback(
    (year: moment.Moment) => {
      onChange(year);
    },
    [onChange]
  );
  useEffect(() => {
    if (!value) return;
    const index = years.findIndex(
      (v) => v.year.clone().year() === value.clone().year()
    );
    const toPage = Math.max(totalPage - Math.ceil((index - 1) / PageLength), 1);
    setPage(toPage);
  }, [value, years, totalPage]);
  return (
    <>
      <DateNavigator
        title={calendarTitle}
        onNextClick={handleNextClick}
        onPreviousClick={handlePreClick}
        previousDisabled={disabledPreviousYear}
        nextDisabled={disabledNextYear}
      />
      <S.YPYearWrapper>
        {displayYears.map(({ year, text, active }) => (
          <YearItem
            key={text}
            year={year}
            text={text}
            active={active}
            onClick={handleYearClick}
          />
        ))}
      </S.YPYearWrapper>
    </>
  );
}

interface CalendarYearPanelProps {
  today: moment.Moment;
  value: moment.Moment | undefined;
  onChange: (value: moment.Moment) => void;
  viewedYear: moment.Moment;
  onViewedYearChange: (newViewedYear: moment.Moment) => void;
  disabledYear: (month: moment.Moment) => boolean;
}

export function CalendarYearPanel({
  value,
  onChange,
  viewedYear,
  onViewedYearChange,
  disabledYear,
}: CalendarYearPanelProps) {
  const yearMoments = useMemo(
    () =>
      getRangeMoments(viewedYear, viewedYear.clone().add(11, "year"), "year"),
    [viewedYear]
  );
  const years = useMemo(
    () =>
      yearMoments.map((year) => ({
        year,
        text: year.year(),
        active: value ? value.isSame(year, "year") : false,
        disabled: disabledYear(year),
      })),
    [disabledYear, value, yearMoments]
  );
  const calendarTitle = useMemo(() => {
    if (!years.length) return "";
    if (years.length === 1) return `${years[0].text}`;
    return `${years[0].text} - ${years[years.length - 1].text}`;
  }, [years]);
  const handleNextClick = useCallback(() => {
    onViewedYearChange(viewedYear.clone().add(12, "year"));
  }, [onViewedYearChange, viewedYear]);
  const handlePreClick = useCallback(() => {
    onViewedYearChange(viewedYear.clone().add(-12, "year"));
  }, [onViewedYearChange, viewedYear]);
  const disabledPreviousYear = useMemo(
    () => disabledYear(viewedYear.clone()),
    [disabledYear, viewedYear]
  );
  const disabledNextYear = useMemo(
    () => disabledYear(viewedYear.clone().add(12, "year")),
    [disabledYear, viewedYear]
  );
  const handleYearClick = useCallback(
    (year: moment.Moment) => {
      onChange(year);
    },
    [onChange]
  );
  return (
    <>
      <DateNavigator
        title={calendarTitle}
        onNextClick={handleNextClick}
        onPreviousClick={handlePreClick}
        previousDisabled={disabledPreviousYear}
        nextDisabled={disabledNextYear}
      />
      <S.YPYearWrapper>
        {years.map(({ year, text, active, disabled }) => (
          <YearItem
            key={text}
            year={year}
            text={text}
            active={active}
            disabled={disabled}
            onClick={handleYearClick}
          />
        ))}
      </S.YPYearWrapper>
    </>
  );
}
